"use client";

import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Star, Plus, ChevronDown } from "lucide-react";
import type { ApplyFormData } from "@/lib/schema";
import { formatCurrency } from "@/lib/pricing";
import { PRICING } from "@/lib/pricing";
import MarketPicker from "./MarketPicker";
import OrderSummary from "./OrderSummary";
import { useFeaturedToggle, computeTakenCities } from "./utils";

interface AddOnsStepProps {
  takenSet: string[];
}

/**
 * "Recommended Add-ons" (Screen 4). Only upsells with real pricing/data behind
 * them are offered — see content/checkoutConfig.ts availableUpsells. Both
 * add-ons are pure UI over Screen 1's locations/featuredLocations state, no
 * dedicated schema fields.
 */
export default function AddOnsStep({ takenSet }: AddOnsStepProps) {
  const { control, watch } = useFormContext<ApplyFormData>();
  const { append: appendLocation } = useFieldArray({ control, name: "locations" });
  const { featuredLocations, toggleFeatured } = useFeaturedToggle();
  const [showPicker, setShowPicker] = useState(false);

  const watchedLocations = watch("locations") ?? [];
  const validLocations = watchedLocations.filter((l) => l.city && l.state);
  const specialties = watch("specialties") ?? [];
  const existingKeys = validLocations.map((l) => `${l.city}|${l.state}`);
  const takenCities = computeTakenCities(validLocations, takenSet);

  const upgradeable = validLocations.filter((l) => {
    const key = `${l.city}|${l.state}`;
    return !takenCities.includes(key) && !featuredLocations.includes(key);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-navy mb-1 race-head">Recommended Add-ons</h2>
        <p className="text-sm text-muted">A few ways to get more visibility — entirely optional.</p>
      </div>

      <OrderSummary locations={validLocations} featuredLocations={featuredLocations} specialties={specialties} />

      {/* Add Another City */}
      <div className="rounded-xl border border-pearl-dark bg-white p-5">
        <button
          type="button"
          onClick={() => setShowPicker((v) => !v)}
          className="w-full flex items-center justify-between gap-3"
        >
          <div className="text-left">
            <h3 className="text-navy race-head text-lg flex items-center gap-2"><Plus className="h-4 w-4 text-teal" /> Add Another City</h3>
            <p className="text-sm text-muted mt-0.5">{formatCurrency(PRICING.cityListing)} / city / year — expand your reach to a new market.</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-muted transition-transform flex-shrink-0 ${showPicker ? "rotate-180" : ""}`} />
        </button>
        {showPicker && (
          <div className="mt-4 pt-4 border-t border-pearl-dark">
            <MarketPicker existingKeys={existingKeys} takenSet={takenSet} onAdd={(loc) => appendLocation(loc)} />
          </div>
        )}
      </div>

      {/* Upgrade to Featured */}
      {upgradeable.length > 0 && (
        <div className="rounded-xl border-2 border-gold/40 bg-white p-5">
          <h3 className="text-navy mb-1 flex items-center gap-2 race-head text-lg">
            <Star className="h-4 w-4 text-gold" /> Upgrade to Featured Listing
          </h3>
          <p className="text-sm text-muted mb-4">
            +{formatCurrency(PRICING.cityFeatured)} first city · +{formatCurrency(PRICING.cityFeaturedAdditional)} each additional (50% off)
          </p>
          <div className="space-y-2">
            {upgradeable.map((loc) => (
              <button
                key={`${loc.city}|${loc.state}`}
                type="button"
                onClick={() => toggleFeatured(loc)}
                className="w-full flex items-center gap-3 rounded-xl border border-pearl-dark bg-white px-4 py-3 text-sm hover:border-gold/40 hover:bg-gold/5 transition-all group"
              >
                <span className="flex-1 text-left font-semibold text-navy">{loc.city}, {loc.state}</span>
                <span className="text-xs text-muted group-hover:text-gold-dark transition-colors">+ Get Featured</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
