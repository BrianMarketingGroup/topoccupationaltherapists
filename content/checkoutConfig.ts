/**
 * Site-level knobs for the Universal Checkout Flow (MVP), per the client's
 * "System Requirements" section: Market Type, Listing Types, Pricing,
 * Featured Pricing, Available Upsells, Specialty Requirements, Shipping
 * Required, Listing Fields, Character Limits, File Upload Types.
 *
 * Scoped to this one site (TopOccupationalTherapists.com), not a cross-repo shared
 * engine — pricing itself lives in lib/pricing.ts and is referenced from here
 * rather than duplicated.
 */

export const checkoutConfig = {
  marketType: "city" as const,

  listingTypes: ["basic", "featured"] as const,

  // Specialty Selection (Screen 1 sub-step) — required for Medical-vertical sites.
  specialtyRequired: true,

  // Plaque Shipping Address (Screen 2) — applies to "Top" domains that ship a
  // physical recognition award.
  shippingRequired: true,

  // Recommended Add-ons (Screen 4) — only upsells with real pricing/data behind
  // them. "Add another year", "Statewide", "Nationwide", and "sister site"
  // listings have no defined pricing in the client brief, so they're
  // intentionally excluded rather than invented.
  availableUpsells: ["addAnotherCity", "upgradeToFeatured"] as const,

  // Listing Information (Screen 5)
  characterLimits: {
    bio: 1500,
  },
  fileUploadTypes: ["logo", "photo", "banner"] as const,
  fileSizeLimitBytes: 4 * 1024 * 1024, // 4MB/file, attached to the lead email

  businessHoursDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const,
} as const;

export type CheckoutConfig = typeof checkoutConfig;
