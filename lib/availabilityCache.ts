const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  at: number;
  data: { state: string; city: string }[];
}

let cache: CacheEntry | null = null;

export function getCache(): CacheEntry | null {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache;
  return null;
}

export function setCache(data: CacheEntry["data"]) {
  cache = { at: Date.now(), data };
}

export function clearCache() {
  cache = null;
}
