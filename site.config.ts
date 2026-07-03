export interface NavLink {
  href: string;
  label: string;
}

export const siteConfig = {
  // Identity
  name: "TopOccupationalTherapists.com",
  shortName: "TopOccupationalTherapists",
  legalEntity: "TopOccupationalTherapists.com",
  domain: "topoccupationaltherapists.com",
  url: "https://topoccupationaltherapists.com",
  launchYear: 2026,

  // Wordmark
  wordmark: { top: "TOP", bottom: "OCCUPATIONAL THERAPISTS", tld: ".com" },

  // SEO / social
  title: "TopOccupationalTherapists.com — Get Your Practice Listed",
  description:
    "TopOccupationalTherapists.com is a national directory connecting patients and caregivers with trusted occupational therapy practices. Claim an enhanced listing to reach patients actively searching for pediatric, hand, neurological, geriatric, and post-surgical rehabilitation care.",
  ogDescription:
    "Get an enhanced listing on TopOccupationalTherapists.com — help patients and caregivers find your practice when they're searching for pediatric therapy, hand therapy, neurological rehabilitation, geriatric care, home health, and post-surgical recovery.",

  // Contact
  phone: "(844) 795-2674",
  phoneHref: "tel:+18447952674",
  salesEmail: "info@topoccupationaltherapists.com",

  // Analytics
  gaMeasurementId: "G-XXXXXXXXXX",

  // Lead notification email
  notifications: {
    fromEmail: "listings@topoccupationaltherapists.com",
    fromName: "TopOccupationalTherapists.com",
    replyTo: "sbansal@brianmarketinggroup.com",
    testEmail: "sbansal@brianmarketinggroup.com",
    recipients: [
      "sbansal@brianmarketinggroup.com",
    ],
  },

  // Traffic-source attribution cookie name
  trafficCookie: "ot_source",

  // Directory preview config
  directory: {
    subtext:
      "Every listing includes a ranked directory placement, a dedicated practice profile, and an optional Featured Listing upgrade. Switch between the views below.",
    browse: "Denver, CO",
    filter: "All Specialties",
    cta: "List Your Practice",
    headline: "Find Top Occupational Therapists",
    listHeading: "Top Occupational Therapists — Denver, CO",
    spotName: "Featured Listing",
    spotScope: "1 per city",
    servicesLabel: "OT Specialties",
    teamLabel: "About the Practice",
    noun: "occupational therapy practice",
    recognition: "Listed 2026",
    launch: "September 2026",
    toggles: { spotlight: "Featured", profile: "Profile", directory: "Directory" },
    directorySlug: "denver-co",
    profileSlug: "denver-rehab-therapy-care",
  },

  // Navigation
  nav: [
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ] as NavLink[],

  footer: {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/contact", label: "Contact" },
    ] as NavLink[],
    forShops: [
      { href: "/apply", label: "List Your Practice" },
      { href: "/how-it-works", label: "Why Get Listed" },
      { href: "/#pricing", label: "Pricing" },
    ] as NavLink[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
