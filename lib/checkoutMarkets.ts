import { citiesByState } from "@/content/usCities";
import { US_STATES } from "@/content/states";

export interface Market {
  id: string;
  city: string;
  state: string;
}

export interface SelectedMarket {
  marketId: string;
  city: string;
  state: string;
  featured: boolean;
}

export const ALL_MARKETS: Market[] = Object.entries(citiesByState).flatMap(([state, cities]) =>
  cities.map((city) => ({ id: `${state}::${city}`, city, state })),
);

export function getMarketById(id: string): Market | undefined {
  return ALL_MARKETS.find((m) => m.id === id);
}

export function getPopularMarkets(): Market[] {
  return [];
}

export function getNearbyMarkets(_market: Market): Market[] {
  return [];
}

export function searchMarkets(query: string): Market[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_MARKETS.filter(
    (m) => m.city.toLowerCase().includes(q) || `${m.city}, ${m.state}`.toLowerCase().includes(q),
  ).slice(0, 30);
}

export const ALL_STATES: string[] = Array.from(new Set(US_STATES.map((s) => s.abbr))).sort();
