import { NextRequest, NextResponse } from "next/server";
import { applySchema, contactSchema } from "@/lib/schema";
import { sendLeadEmail, sendContactEmail, type UploadsPayload } from "@/lib/email";
import { sendApplyToBff, sendContactToBff } from "@/lib/bff";
import { appendLeadToSheet, appendContactToSheet } from "@/lib/sheets";
import { clearCache as clearAvailabilityCache } from "@/lib/availabilityCache";
import { getTakenCities, featuredCityKey } from "@/lib/availability";

const rateMap = new Map<string, { count: number; reset: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

function getMeta(req: NextRequest) {
  return {
    referer: req.headers.get("x-traffic-source") ?? req.headers.get("referer") ?? "Direct",
    landingPage: req.headers.get("x-landing-page") ?? "",
  };
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!checkRate(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const meta = getMeta(req);
  const raw = body as Record<string, unknown>;

  if (raw?.type === "contact") {
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
    }
    if (parsed.data._honeypot) return NextResponse.json({ ok: true });
    // The BFF owns persistence: it writes the contact to Postgres AND mirrors the
    // row to the platform's Google Sheet Contact tab (resolved from platform_id).
    // Awaited + fail-open so it reliably sends but never 500s the visitor.
    try {
      await sendContactToBff(parsed.data, meta);
    } catch (e) {
      console.error("[bff] contact submission failed:", e);
    }
    try {
      await appendContactToSheet(parsed.data, meta);
    } catch (e) {
      console.error("[sheets] contact write failed:", e);
    }
    sendContactEmail(parsed.data, meta).catch((e) => console.error("[email] contact notification failed:", e));
    return NextResponse.json({ ok: true });
  }

  const parsed = applySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }
  if (parsed.data._honeypot) return NextResponse.json({ ok: true });

  // Re-check Featured availability against fresh data (bypassing the 60s cache)
  // right before accepting the submission. The client's takenSet is fetched once
  // when the form opens, so another applicant may have claimed the same city's
  // single Featured slot in the meantime — reject rather than double-selling it.
  if (parsed.data.featuredLocations.length > 0) {
    const taken = await getTakenCities({ fresh: true });
    const takenKeys = new Set(taken.map((t) => featuredCityKey(t.city, t.state)));
    const conflicts = parsed.data.featuredLocations.filter((key) => {
      const [city, state] = key.split("|");
      return takenKeys.has(featuredCityKey(city ?? "", state ?? ""));
    });
    if (conflicts.length > 0) {
      return NextResponse.json(
        {
          error: `The Featured spot for ${conflicts.map((k) => k.replace("|", ", ")).join("; ")} was just claimed by another applicant. Please go back and remove it or choose a different city.`,
          featuredConflicts: conflicts,
        },
        { status: 409 },
      );
    }
  }

  // `uploads` (logo/photo/banner) travel alongside the validated form fields —
  // they're not part of applySchema (see lib/schema.ts), just passthrough data
  // for the lead email's attachments.
  const uploads = (raw?.uploads ?? undefined) as UploadsPayload | undefined;
  // The BFF owns persistence now: it writes the deal to Postgres AND mirrors the
  // row to the platform's Google Sheet (resolved from platform_id). Awaited +
  // fail-open so it reliably sends but never 500s the applicant.
  try {
    await sendApplyToBff(parsed.data, meta);
  } catch (e) {
    console.error("[bff] apply submission failed:", e);
  }
  try {
    await appendLeadToSheet(parsed.data, meta);
  } catch (e) {
    console.error("[sheets] lead write failed:", e);
  }
  sendLeadEmail(parsed.data, meta, uploads).catch((e) => console.error("[email] lead notification failed:", e));
  if (parsed.data.featuredLocations.length > 0) clearAvailabilityCache();
  return NextResponse.json({ ok: true });
}
