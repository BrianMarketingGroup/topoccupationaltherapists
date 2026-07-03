"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/site.config";

const COOKIE_NAME = siteConfig.trafficCookie;
const COOKIE_MAX_AGE = 60 * 30; // 30 minutes

function formatSource(params: URLSearchParams): string | null {
  const campaign = params.get("email-campaign");
  if (campaign) return `Email Campaign (${campaign})`;
  return null;
}

function setCookie(value: string) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

export function getTrafficSource(): string {
  if (typeof document === "undefined") return "Direct";
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return "Direct";
  return decodeURIComponent(match.split("=").slice(1).join("=")) || "Direct";
}

export default function TrafficSourceTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = formatSource(searchParams);
    if (source) {
      setCookie(source);
    }
  }, [searchParams]);

  return null;
}
