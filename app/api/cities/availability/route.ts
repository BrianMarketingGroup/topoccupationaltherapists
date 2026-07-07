import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getCache, setCache } from "@/lib/availabilityCache";
import { getGoogleAuth } from "@/lib/google";

/*
 * GET /api/cities/availability                  -> { taken: [{ city, state }] }
 * GET /api/cities/availability?city=&state=     -> { featuredTaken: boolean, taken: [...] }
 *
 * Source of truth is the BFF featured_claims API (the directory's real claims).
 * Falls back to the legacy "Top-Spots" Google Sheet when BIG_SWING_BFF_URL is
 * unset or the BFF call fails. A city is "taken" when an active featured claim
 * exists for it.
 */

const TAB = "Featured-Placement-City";

/** Read taken spots from the BFF featured_claims API; null = unavailable (fall back). */
async function getTakenFromBff(): Promise<{ state: string; city: string }[] | null> {
  const base = process.env.BIG_SWING_BFF_URL;
  const platformId = process.env.BIG_SWING_PLATFORM_ID;
  if (!base || !platformId) return null;
  try {
    const res = await fetch(
      `${base.replace(/\/+$/, "")}/api/v1/featured-claims?platform_id=${Number(platformId)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.items ?? []).map((i: { city: string; state: string }) => ({
      state: (i.state ?? "").toString().trim(),
      city: (i.city ?? "").toString().trim(),
    }));
  } catch {
    return null;
  }
}

/** Read taken spots from the legacy "Top-Spots" sheet (fallback). */
async function getTakenFromSheet(): Promise<{ state: string; city: string }[]> {
  const auth = getGoogleAuth(["https://www.googleapis.com/auth/spreadsheets.readonly"]);
  const sheetId = process.env.LEADS_SHEET_ID;
  if (!auth || !sheetId) return [];

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client as never });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${TAB}!A2:C`,
  });

  const rows = res.data.values ?? [];
  // Columns: A=state, B=city, C=status
  return rows
    .filter((r) => r[2]?.toString().toLowerCase() === "active")
    .map((r) => ({
      state: (r[0] ?? "").toString().trim(),
      city: (r[1] ?? "").toString().trim(),
    }));
}

async function getTakenCities(): Promise<{ state: string; city: string }[]> {
  const cached = getCache();
  if (cached) return cached.data;

  const fromBff = await getTakenFromBff();
  const taken = fromBff ?? (await getTakenFromSheet());

  setCache(taken);
  return taken;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const citiesParam = searchParams.get("cities");

  // Checkout-wizard contract: GET ?cities=[{"city":"Austin","state":"TX"}]
  // -> { takenSlots: ["Austin|TX", ...] }
  if (citiesParam !== null) {
    let requestedCities: { city: string; state: string }[] = [];
    try {
      requestedCities = JSON.parse(citiesParam);
    } catch {
      requestedCities = [];
    }
    try {
      const taken = await getTakenCities();
      const takenSlots = requestedCities
        .filter((rc) =>
          taken.some(
            (t) =>
              t.state.toLowerCase() === rc.state.toLowerCase() &&
              t.city.toLowerCase() === rc.city.toLowerCase(),
          ),
        )
        .map((rc) => `${rc.city}|${rc.state}`);
      return NextResponse.json({ takenSlots });
    } catch (err) {
      console.error("[availability] read failed:", err);
      return NextResponse.json({ takenSlots: [] });
    }
  }

  const city = searchParams.get("city")?.trim() ?? "";
  const state = searchParams.get("state")?.trim() ?? "";

  try {
    const taken = await getTakenCities();
    if (!city || !state) {
      // Full list — legacy callers fetch this once on open.
      return NextResponse.json({ taken });
    }
    const featuredTaken = taken.some(
      (t) =>
        t.state.toLowerCase() === state.toLowerCase() &&
        t.city.toLowerCase() === city.toLowerCase(),
    );
    return NextResponse.json({ featuredTaken, taken });
  } catch (err) {
    console.error("[availability] read failed:", err);
    // Fail open — don't block the form if the source is unreachable
    return NextResponse.json({ featuredTaken: false, taken: [] });
  }
}
