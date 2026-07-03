import sgMail from "@sendgrid/mail";
import type { ApplyFormData, ContactFormData } from "./schema";
import { calculateQuote, formatCurrency } from "./pricing";
import { siteConfig } from "@/site.config";

const {
  fromEmail: FROM_EMAIL,
  fromName: FROM_NAME,
  replyTo: REPLY_TO,
  testEmail: TEST_EMAIL,
  recipients: NOTIFICATION_EMAILS,
} = siteConfig.notifications;

// CC address from the client's Universal Checkout Flow MVP spec for the
// "Email Me a Link to Complete Later" path.
const COMPLETE_LATER_CC = "Support@DigitalServiceBrands.com";

export interface UploadsPayload {
  logo?: { filename: string; mimeType: string; base64: string };
  photo?: { filename: string; mimeType: string; base64: string };
  banner?: { filename: string; mimeType: string; base64: string };
}

function recipients(submitterEmail: string): string[] {
  return submitterEmail.toLowerCase() === TEST_EMAIL.toLowerCase()
    ? [TEST_EMAIL]
    : [...NOTIFICATION_EMAILS];
}

function isConfigured(): boolean {
  return Boolean(process.env.SENDGRID_API_KEY);
}

function init() {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
}

function buildAttachments(uploads?: UploadsPayload) {
  if (!uploads) return undefined;
  const files = [uploads.logo, uploads.photo, uploads.banner].filter(
    (f): f is NonNullable<typeof f> => Boolean(f),
  );
  if (files.length === 0) return undefined;
  return files.map((f) => ({
    content: f.base64,
    filename: f.filename,
    type: f.mimeType,
    disposition: "attachment" as const,
  }));
}

function providersText(data: ApplyFormData): string {
  return (data.providers ?? []).length > 0
    ? (data.providers ?? [])
        .map((p) => `  • ${p.name}${p.title ? ` — ${p.title}` : ""}${p.description ? `\n    ${p.description}` : ""}`)
        .join("\n")
    : "  None provided";
}

function businessHoursText(data: ApplyFormData): string {
  return (data.businessHours ?? [])
    .map((h) => `  ${h.day}: ${h.closed ? "Closed" : h.hours || "—"}`)
    .join("\n") || "  Not provided";
}

export async function sendLeadEmail(
  data: ApplyFormData,
  meta: { referer: string; landingPage: string },
  uploads?: UploadsPayload,
): Promise<void> {
  if (data.completeLater) return sendCompleteLaterEmail(data, meta);

  if (!isConfigured()) {
    console.log("[email] Skipping — SendGrid not configured.", { companyName: data.companyName });
    return;
  }
  init();

  const quote = calculateQuote({ locations: data.locations, featuredLocations: data.featuredLocations });
  const divider = "─".repeat(52);

  const businessAddress = data.sameAsBilling
    ? `${data.businessAddress ?? ""}, ${data.businessCity ?? ""}, ${data.businessState ?? ""} ${data.businessZip ?? data.billingZip}`
    : `${data.businessAddress ?? ""}, ${data.businessCity ?? ""}, ${data.businessState ?? ""} ${data.businessZip ?? ""}`;

  const text = `
New listing application received on ${siteConfig.name}

SOURCE
Traffic Source:  ${meta.referer || "direct"}
Landing Page:    ${meta.landingPage || "/apply"}
Submitted:       ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET

PRACTICE
Company Name:    ${data.companyName}
Asset Permission: ${data.assetPermission ? "Granted — pull from website" : "Not granted"}

MARKET(S) (${data.locations.length})
${data.locations.map((l) => `  ${l.city}, ${l.state}`).join("\n")}

FEATURED LISTING (${data.featuredLocations.length} of ${data.locations.length} cities)
${data.featuredLocations.length > 0 ? data.featuredLocations.map((k) => `  ★ ${k.replace("|", ", ")}`).join("\n") : "  None selected"}

SPECIALTIES
${(data.specialties ?? []).length > 0 ? (data.specialties ?? []).map((s) => `  • ${s}`).join("\n") : "  None selected"}

CONTACT
Name:   ${data.contactFirstName} ${data.contactLastName}${data.contactTitle ? ` (${data.contactTitle})` : ""}
Email:  ${data.email}
Phone:  ${data.contactPhone}

AWARD SHIPPING
${data.plaqueShippingAddress}
${data.plaqueShippingCity}, ${data.plaqueShippingState} ${data.plaqueShippingZip}

NOTES
${data.notes || "—"}

LISTING INFORMATION
Business Name:   ${data.businessName || "—"}
Listing Phone:   ${data.listingPhone || "—"}
Listing Email:   ${data.listingEmail || "—"}
Website:         ${data.listingWebsite || "—"}
Business Address: ${businessAddress}
About / Bio:
${data.aboutBio || "—"}

PROVIDERS
${providersText(data)}

BUSINESS HOURS
${businessHoursText(data)}

ITEMIZED QUOTE — 12-month term, pay once
${divider}
${quote.lineItems.map((li) => `${li.label}: ${formatCurrency(li.amount)}`).join("\n")}
${divider}
TOTAL:  ${formatCurrency(quote.total)}
${divider}
`.trim();

  await sgMail.send({
    to: recipients(data.email),
    from: { email: FROM_EMAIL, name: FROM_NAME },
    replyTo: { email: REPLY_TO, name: FROM_NAME },
    subject: `New Application: ${data.businessName || data.companyName} — ${data.locations[0]?.city ?? "?"}, ${data.locations[0]?.state ?? "?"}`,
    text,
    attachments: buildAttachments(uploads),
  });
}

/** "Email Me a Link to Complete Later" path — checklist email, CC'd to support per the MVP spec. */
export async function sendCompleteLaterEmail(
  data: ApplyFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  if (!isConfigured()) {
    console.log("[email] Skipping — SendGrid not configured.", { companyName: data.companyName });
    return;
  }
  init();

  const quote = calculateQuote({ locations: data.locations, featuredLocations: data.featuredLocations });

  const text = `
New listing application received on ${siteConfig.name} — listing details to follow

SOURCE
Traffic Source:  ${meta.referer || "direct"}
Landing Page:    ${meta.landingPage || "/apply"}
Submitted:       ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET

PRACTICE
Company Name:  ${data.companyName}

MARKET(S) (${data.locations.length})
${data.locations.map((l) => `  ${l.city}, ${l.state}`).join("\n")}

CONTACT
Name:   ${data.contactFirstName} ${data.contactLastName}
Email:  ${data.email}
Phone:  ${data.contactPhone}

TOTAL DUE:  ${formatCurrency(quote.total)}

This applicant chose "Email Me a Link to Complete Later." Still needed to finish their listing:
  • Business name
  • Provider(s) / therapist bios
  • Listing phone, email, website
  • Business address
  • About / bio (up to 1,500 characters)
  • Business hours
  • Logo, photo, and/or banner image
  • Website asset permission confirmation

Follow up with a link to complete their listing.
`.trim();

  await sgMail.send({
    to: recipients(data.email),
    cc: COMPLETE_LATER_CC,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    replyTo: { email: REPLY_TO, name: FROM_NAME },
    subject: `Complete Your Listing: ${data.companyName}`,
    text,
  });
}

export async function sendContactEmail(
  data: ContactFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  if (!isConfigured()) {
    console.log("[email] Skipping — SendGrid not configured.", { email: data.email });
    return;
  }
  init();

  const text = `
New inquiry from ${siteConfig.name}

SOURCE
Traffic Source:  ${meta.referer || "direct"}
Landing Page:    ${meta.landingPage || "/contact"}
Submitted:       ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET

CONTACT
Name:    ${data.firstName} ${data.lastName}
Email:   ${data.email}
Phone:   ${data.phone || "—"}

Message:
${data.message}
`.trim();

  await sgMail.send({
    to: recipients(data.email),
    from: { email: FROM_EMAIL, name: FROM_NAME },
    replyTo: { email: REPLY_TO, name: FROM_NAME },
    subject: `Contact Inquiry: ${data.firstName} ${data.lastName}`,
    text,
  });
}
