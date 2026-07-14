import type { ApplyFormData, ContactFormData } from "./schema";
import { calculateQuote, formatCurrency } from "./pricing";

/**
 * big-swing-bff integration. Maps an apply submission to the BFF `DealCreate`
 * contract and POSTs it to `POST {BIG_SWING_BFF_URL}/api/v1/deals` (writes
 * contacts + payments + deals to the Big Swing Postgres DB).
 *
 * No-ops when BIG_SWING_BFF_URL is unset. The caller awaits this inside a
 * try/catch so a BFF outage can't 500 or block the form (fail open) — but the
 * await ensures the request actually completes before the serverless response.
 */
export async function sendApplyToBff(
  data: ApplyFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  const base = process.env.BIG_SWING_BFF_URL;
  if (!base) return;

  const quote = calculateQuote({ locations: data.locations, featuredLocations: data.featuredLocations });
  const pricingBreakdown = [
    ...quote.lineItems.map((li) => `${li.label}: ${formatCurrency(li.amount)}`),
    `Total: ${formatCurrency(quote.total)}`,
  ].join(" | ");

  // Listing tier the applicant bought: "featured" if they reserved any featured
  // city, otherwise "paid" (a basic listing always costs at least one city fee).
  const tier = data.featuredLocations.length > 0 ? "featured" : "paid";
  const businessZip = data.sameAsBilling ? (data.businessZip ?? data.billingZip) : data.businessZip ?? "";

  const payload = {
    // Identifies this site's platforms row in the BFF (→ deals.platform_id +
    // the destination Google Sheet). Set BIG_SWING_PLATFORM_ID on the service.
    platform_id: process.env.BIG_SWING_PLATFORM_ID
      ? Number(process.env.BIG_SWING_PLATFORM_ID)
      : undefined,
    tier,
    timestamp: new Date().toISOString(),
    traffic_source: meta.referer || "direct",
    landing_page: meta.landingPage || "/apply",

    shop_name: data.companyName,
    cities: data.locations.map((l) => `${l.city}, ${l.state}`),
    featured_cities: data.featuredLocations.map((k) => k.replace("|", ", ")),
    services: data.specialties ?? [],

    contact_first: data.contactFirstName,
    contact_last: data.contactLastName,
    contact_email: data.email,
    contact_phone: data.contactPhone,
    title: data.contactTitle ?? "",
    notes: data.notes ?? "",

    award_shipping_address: data.plaqueShippingAddress,
    award_shipping_city: data.plaqueShippingCity,
    award_shipping_state: data.plaqueShippingState,
    award_shipping_zip: data.plaqueShippingZip,

    quote_total: formatCurrency(quote.total),
    pricing_breakdown: pricingBreakdown,

    card_number: data.cardNumber,
    card_expiry: data.cardExpiry,
    card_cvc: data.cardCvc,
    name_on_card: data.cardName,
    billing_zip: data.billingZip,

    complete_later: data.completeLater,
    business_name: data.businessName ?? "",
    providers: (data.providers ?? []).map((p) => `${p.name}${p.title ? ` (${p.title})` : ""}`),
    listing_phone: data.listingPhone ?? "",
    listing_email: data.listingEmail ?? "",
    listing_website: data.listingWebsite ?? "",
    business_address: data.businessAddress ?? "",
    business_city: data.businessCity ?? "",
    business_state: data.businessState ?? "",
    business_zip: businessZip,
    about_bio: data.aboutBio ?? "",
    business_hours: (data.businessHours ?? []).map((h) => ({ day: h.day, closed: h.closed, hours: h.hours ?? "" })),
    // BFF expects a string here (matches every other site's convention) —
    // this site's own applySchema stores it as a boolean.
    asset_permission: data.assetPermission ? "Granted" : "Contact us",
  };

  const res = await fetch(`${base.replace(/\/+$/, "")}/api/v1/deals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`big-swing-bff responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

/**
 * big-swing-bff integration for the contact ("get in touch") form. Maps a
 * contact submission to the BFF `ContactCreate` contract and POSTs it to
 * `POST {BIG_SWING_BFF_URL}/api/v1/contacts` — the BFF writes one row to the
 * contacts table and mirrors it to the platform's Google Sheet Contact tab.
 *
 * No-ops when BIG_SWING_BFF_URL is unset. The caller awaits this inside a
 * try/catch so a BFF outage can't 500 or block the form (fail open).
 */
export async function sendContactToBff(
  data: ContactFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  const base = process.env.BIG_SWING_BFF_URL;
  if (!base) return;

  const payload = {
    // Selects this site's platforms row in the BFF (→ the destination Google
    // Sheet). Set BIG_SWING_PLATFORM_ID on the service.
    platform_id: process.env.BIG_SWING_PLATFORM_ID
      ? Number(process.env.BIG_SWING_PLATFORM_ID)
      : undefined,
    timestamp: new Date().toISOString(),
    traffic_source: meta.referer || "direct",
    landing_page: meta.landingPage || "/contact",

    contact_first: data.firstName,
    contact_last: data.lastName,
    contact_email: data.email,
    contact_phone: data.phone,
    message: data.message,
  };

  const res = await fetch(`${base.replace(/\/+$/, "")}/api/v1/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`big-swing-bff responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
