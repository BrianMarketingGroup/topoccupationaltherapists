"use client";

import { useFormContext } from "react-hook-form";
import type { ApplyFormData } from "@/lib/schema";
import { locationKey } from "@/lib/pricing";

export function useFeaturedToggle() {
  const { watch, setValue } = useFormContext<ApplyFormData>();
  const featuredLocations = watch("featuredLocations") ?? [];
  function toggleFeatured(loc: { city: string; state: string }) {
    const k = locationKey(loc);
    setValue(
      "featuredLocations",
      featuredLocations.includes(k) ? featuredLocations.filter((x) => x !== k) : [...featuredLocations, k],
      { shouldDirty: true },
    );
  }
  return { featuredLocations, toggleFeatured };
}

export function useSpecialtyToggle() {
  const { watch, setValue } = useFormContext<ApplyFormData>();
  const specialties = watch("specialties") ?? [];
  function toggleSpecialty(s: string) {
    setValue(
      "specialties",
      specialties.includes(s) ? specialties.filter((x) => x !== s) : [...specialties, s],
      { shouldDirty: true },
    );
  }
  return { specialties, toggleSpecialty };
}

export function normKey(city: string, state: string): string {
  return `${city.trim()}|${state.trim()}`.toLowerCase();
}

/** Which of the given locations have their Featured spot already claimed. */
export function computeTakenCities(locations: { city: string; state: string }[], takenSet: string[]): string[] {
  return locations
    .filter((l) => l.city && l.state && takenSet.includes(normKey(l.city, l.state)))
    .map(locationKey);
}

export interface UploadedFile {
  filename: string;
  mimeType: string;
  base64: string;
}
