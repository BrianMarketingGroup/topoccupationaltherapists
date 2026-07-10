import { NextRequest, NextResponse } from "next/server";
import { getTakenCities } from "@/lib/availability";

/*
 * GET /api/cities/availability                  -> { taken: [{ city, state }] }
 * GET /api/cities/availability?city=&state=     -> { featuredTaken: boolean, taken: [...] }
 *
 * See lib/availability.ts for the source of truth (BFF, falling back to Sheets).
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city")?.trim() ?? "";
  const state = searchParams.get("state")?.trim() ?? "";

  try {
    const taken = await getTakenCities();
    if (!city || !state) {
      // Full list — the apply form fetches this once on open.
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
