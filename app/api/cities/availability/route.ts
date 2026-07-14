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
