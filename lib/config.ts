/**
 * SiteConfig drives the checkout wizard (components/checkout/**) — every
 * screen reads behavior off this instead of hardcoding vertical-specific
 * logic, so the same wizard code can be reused across other BMG directory
 * sites.
 */

import { SPECIALTIES } from "@/lib/schema";

export type MarketType =
  | "city"
  | "zip"
  | "county"
  | "airport"
  | "specialty"
  | "practiceArea"
  | "state";

export type SearchMode =
  | "state+city"
  | "zip"
  | "county"
  | "airport"
  | "specialty"
  | "practiceArea";

export interface ListingTier {
  id: string;
  label: string;
  isPaid: boolean;
  basePrice: number;
}

export type UpsellKind = "extra-year" | "extra-city" | "statewide" | "nationwide" | "sister-site";

export interface UpsellOption {
  id: string;
  label: string;
  description: string;
  price: number;
  kind: UpsellKind;
}

export interface SpecialtyOption {
  id: string;
  label: string;
}

export interface SiteConfig {
  siteName: string;
  brandTagline: string;
  businessNoun: string;

  marketType: MarketType;
  marketLabel: string;
  searchMode: SearchMode;

  listingTier: ListingTier;
  featuredScope: "city" | "city_and_specialty" | "specialty_only";
  featuredUpgradePrice: number;
  upsells: UpsellOption[];

  specialty: {
    required: boolean;
    label: string;
    options: SpecialtyOption[];
    pricePerOption: number;
  } | null;

  shippingRequired: boolean;

  listingFields: {
    peopleLabel: string;
    bioMaxChars: number;
    fileUploadTypes: Array<"logo" | "profilePhoto" | "bannerImage">;
  };

  emailTemplates: {
    completeLaterChecklist: string;
    ccAddress: string;
  };

  multiMarketDiscount: {
    minMarkets: number;
    percentOff: number;
  };

  productionTimelineDays: number;
}

export const topOccupationalTherapistsConfig: SiteConfig = {
  siteName: "TopOccupationalTherapists.com",
  brandTagline: "Get Listed — TopOccupationalTherapists.com",
  businessNoun: "occupational therapy practice",

  marketType: "city",
  marketLabel: "City",
  searchMode: "state+city",

  listingTier: {
    id: "standard",
    label: "Standard Listing",
    isPaid: true,
    basePrice: 289,
  },
  // Featured Listing is sold per city, not per (city, specialty) pair.
  featuredScope: "city",
  featuredUpgradePrice: 689,

  upsells: [],

  specialty: {
    required: true,
    label: "Specialty",
    options: SPECIALTIES.map((s) => ({
      id: s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      label: s,
    })),
    // Selecting additional specialties never changes the price — only city
    // count and Featured Listing selection do (see lib/pricing.ts).
    pricePerOption: 0,
  },

  shippingRequired: true,

  listingFields: {
    peopleLabel: "Occupational Therapist(s) / Provider(s)",
    bioMaxChars: 1500,
    fileUploadTypes: ["logo", "profilePhoto", "bannerImage"],
  },

  emailTemplates: {
    completeLaterChecklist: "complete-later-checklist-v1",
    ccAddress: "support@digitalservicebrands.com",
  },

  multiMarketDiscount: {
    minMarkets: 999999,
    percentOff: 0,
  },

  productionTimelineDays: 10,
};
