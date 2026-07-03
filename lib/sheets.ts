import { google } from "googleapis";
import type { ApplyFormData, ContactFormData } from "./schema";
import { calculateQuote, formatCurrency } from "./pricing";
import { getGoogleAuth } from "./google";

const APPLICATIONS_TAB = "Applications";
const CONTACT_TAB = "Contact";
const FEATURED_CLAIMS_TAB = "Featured-Placement-City";

async function appendRows(tab: string, rows: (string | number)[][]): Promise<void> {
  if (rows.length === 0) return;
  const sheetId = process.env.LEADS_SHEET_ID;
  const auth = getGoogleAuth(["https://www.googleapis.com/auth/spreadsheets"]);
  if (!sheetId || !auth) return;

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client as never });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tab}!A:A`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: rows },
  });
}

async function appendRow(tab: string, row: (string | number)[]): Promise<void> {
  await appendRows(tab, [row]);
}

/**
 * Claims each Featured city the applicant bought by appending an "active" row
 * to Featured-Placement-City — the same tab app/api/cities/availability/route.ts
 * reads to decide whether a city's Featured slot is taken. Without this, the
 * site never actually records a claim and multiple applicants could all be
 * confirmed for the same city's single Featured slot.
 */
async function claimFeaturedCities(featuredLocations: string[]): Promise<void> {
  const rows = featuredLocations.map((key) => {
    const [city, state] = key.split("|");
    return [state ?? "", city ?? "", "active"];
  });
  await appendRows(FEATURED_CLAIMS_TAB, rows);
}

export async function appendLeadToSheet(
  data: ApplyFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  const quote = calculateQuote({ locations: data.locations, featuredLocations: data.featuredLocations });
  const cardLast4 = data.cardNumber.replace(/\s/g, "").slice(-4);
  const businessZip = data.sameAsBilling ? (data.businessZip ?? data.billingZip) : data.businessZip ?? "";

  const row = [
    "application",
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    data.companyName,
    data.locations.map((l) => `${l.city}, ${l.state}`).join("; "),
    data.featuredLocations.map((k) => k.replace("|", ", ")).join("; ") || "None",
    (data.specialties ?? []).join(", ") || "None",
    `${data.contactFirstName} ${data.contactLastName}`,
    data.email,
    data.contactPhone,
    data.contactTitle ?? "",
    `${data.plaqueShippingAddress}, ${data.plaqueShippingCity}, ${data.plaqueShippingState} ${data.plaqueShippingZip}`,
    `****${cardLast4}`,
    data.cardExpiry,
    data.cardName,
    data.billingZip,
    formatCurrency(quote.total),
    meta.referer || "direct",
    meta.landingPage || "/apply",
    data.notes ?? "",
    data.completeLater ? "Yes" : "No",
    data.businessName ?? "",
    (data.providers ?? []).map((p) => `${p.name}${p.title ? ` (${p.title})` : ""}`).join("; ") || "None",
    data.listingPhone ?? "",
    data.listingEmail ?? "",
    data.listingWebsite ?? "",
    `${data.businessAddress ?? ""}, ${data.businessCity ?? ""}, ${data.businessState ?? ""} ${businessZip}`,
    data.aboutBio ?? "",
    (data.businessHours ?? []).map((h) => `${h.day}: ${h.closed ? "Closed" : h.hours || "—"}`).join("; "),
    data.assetPermission ? "Yes" : "No",
  ];

  await appendRow(APPLICATIONS_TAB, row);
  await claimFeaturedCities(data.featuredLocations);
}

export async function appendContactToSheet(
  data: ContactFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  const row = [
    "contact",
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    data.firstName,
    data.lastName,
    data.email,
    data.phone ?? "",
    data.message,
    meta.referer || "direct",
    meta.landingPage || "/contact",
  ];

  await appendRow(CONTACT_TAB, row);
}
