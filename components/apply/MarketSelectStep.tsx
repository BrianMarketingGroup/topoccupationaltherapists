"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Trash2, Star, Check } from "lucide-react";
import type { ApplyFormData } from "@/lib/schema";
import { SPECIALTIES } from "@/lib/schema";
import { locationKey } from "@/lib/pricing";
import { checkoutConfig } from "@/content/checkoutConfig";
import MarketPicker from "./MarketPicker";
import { useFeaturedToggle, useSpecialtyToggle, computeTakenCities } from "./utils";

interface MarketSelectStepProps {
  takenSet: string[];
}

export default function MarketSelectStep({ takenSet }: MarketSelectStepProps) {
  const { control, watch, formState: { errors } } = useFormContext<ApplyFormData>();
  const { fields: locationFields, append: appendLocation, remove: removeLocation } = useFieldArray({ control, name: "locations" });
  const { featuredLocations, toggleFeatured } = useFeaturedToggle();
  const { specialties, toggleSpecialty } = useSpecialtyToggle();

  const watchedLocations = watch("locations") ?? [];
  const validLocations = watchedLocations.filter((l) => l.city && l.state);
  const existingKeys = validLocations.map((l) => `${l.city}|${l.state}`);
  const takenCities = computeTakenCities(validLocations, takenSet);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-navy mb-1 race-head">Select Your Market</h2>
        <p className="text-sm text-muted">Search or browse markets, then add every city where you want your practice listed.</p>
      </div>

      <MarketPicker
        existingKeys={existingKeys}
        takenSet={takenSet}
        onAdd={(loc) => appendLocation(loc)}
      />

      {(errors.locations as { message?: string } | undefined)?.message && (
        <p className="text-xs text-red-600">{(errors.locations as { message?: string }).message}</p>
      )}

      {/* Selected markets */}
      {locationFields.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-navy">Selected Markets ({validLocations.length})</p>
          <div className="space-y-2">
            {locationFields.map((field, i) => {
              const loc = watchedLocations[i];
              if (!loc?.city || !loc?.state) return null;
              const key = locationKey(loc);
              const taken = takenCities.includes(key);
              const active = !taken && featuredLocations.includes(key);
              return (
                <div key={field.id} className="flex items-center gap-3 rounded-xl border border-pearl-dark bg-pearl px-4 py-3">
                  <span className="flex-1 font-semibold text-navy text-sm">{loc.city}, {loc.state}</span>
                  {taken ? (
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wide">Featured Sold Out</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleFeatured(loc)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                        active ? "bg-gold/15 border-gold text-gold-dark" : "bg-white border-pearl-dark text-muted hover:border-gold/50"
                      }`}
                    >
                      <Star className={`h-3 w-3 ${active ? "fill-gold text-gold" : ""}`} />
                      {active ? "Featured" : "Get Featured"}
                    </button>
                  )}
                  <button type="button" onClick={() => removeLocation(i)} className="text-muted hover:text-red-500 transition-colors" aria-label="Remove market">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Specialty Selection — conditional per checkoutConfig, applicable to Medical vertical */}
      {checkoutConfig.specialtyRequired && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-navy">Specialties <span className="text-muted font-normal">(optional)</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SPECIALTIES.map((s) => {
              const checked = specialties.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSpecialty(s)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                    checked ? "bg-teal/10 border-teal text-navy" : "bg-white border-pearl-dark text-muted hover:border-teal/40"
                  }`}
                >
                  <span className={`h-4 w-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${checked ? "bg-teal border-teal" : "border-pearl-dark"}`}>
                    {checked && <Check className="h-2.5 w-2.5 text-white" />}
                  </span>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
