export const PRICING = {
  cityListing: 289,
  cityFeatured: 689,
  cityFeaturedAdditional: 345,
} as const;

export interface QuoteInput {
  locations: { city: string; state: string }[];
  featuredLocations: string[];
}

export interface QuoteLineItem {
  label: string;
  amount: number;
}

export interface Quote {
  lineItems: QuoteLineItem[];
  total: number;
}

export function locationKey(loc: { city: string; state: string }): string {
  return `${loc.city}|${loc.state}`;
}

export function calculateQuote({ locations, featuredLocations }: QuoteInput): Quote {
  if (locations.length === 0) return { lineItems: [], total: 0 };

  const lineItems: QuoteLineItem[] = [];
  const totalCities = locations.length;
  const featuredCount = featuredLocations.length;

  lineItems.push({
    label: `Basic Listing — ${totalCities} cit${totalCities > 1 ? "ies" : "y"}`,
    amount: totalCities * PRICING.cityListing,
  });

  if (featuredCount > 0) {
    lineItems.push({ label: "Featured Listing — first city", amount: PRICING.cityFeatured });
    if (featuredCount > 1) {
      lineItems.push({
        label: `Featured Listing — ${featuredCount - 1} additional cit${featuredCount > 2 ? "ies" : "y"} (50% off)`,
        amount: (featuredCount - 1) * PRICING.cityFeaturedAdditional,
      });
    }
  }

  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
  return { lineItems, total };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}
