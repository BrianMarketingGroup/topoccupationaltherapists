"use client";

import { calculateQuote, formatCurrency } from "@/lib/pricing";

interface OrderSummaryProps {
  locations: { city: string; state: string }[];
  featuredLocations: string[];
  specialties?: string[];
}

/**
 * "Order Summary — always visible on payment page": Market(s), Listing Type,
 * Specialty, Quantity, Price, Discounts, Grand Total (MVP Screen 3 spec).
 * Also reused on the Market and Add-ons screens as a live-updating sidebar.
 */
export default function OrderSummary({ locations, featuredLocations, specialties = [] }: OrderSummaryProps) {
  const validLocations = locations.filter((l) => l.city && l.state);
  const quote = calculateQuote({ locations: validLocations, featuredLocations });

  if (validLocations.length === 0) {
    return (
      <div className="rounded-xl border border-pearl-dark bg-pearl p-5 text-sm text-muted">
        Add a market to see your order summary.
      </div>
    );
  }

  const featuredCount = featuredLocations.length;

  return (
    <div className="rounded-xl border border-gold/30 bg-navy-dark p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light mb-3">
        Order Summary
      </p>

      <dl className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-pearl/60">Market(s)</dt>
          <dd className="text-pearl text-right">{validLocations.map((l) => `${l.city}, ${l.state}`).join("; ")}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-pearl/60">Listing Type</dt>
          <dd className="text-pearl text-right">
            {featuredCount > 0 ? `Basic + Featured (${featuredCount})` : "Basic"}
          </dd>
        </div>
        {specialties.length > 0 && (
          <div className="flex justify-between gap-4">
            <dt className="text-pearl/60">Specialty</dt>
            <dd className="text-pearl text-right">{specialties.join(", ")}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt className="text-pearl/60">Quantity</dt>
          <dd className="text-pearl text-right">{validLocations.length} {validLocations.length > 1 ? "cities" : "city"}</dd>
        </div>
      </dl>

      <div className="h-px waterline" />

      <ul className="space-y-1.5 my-3">
        {quote.lineItems.map((li) => (
          <li key={li.label} className="flex justify-between text-sm text-pearl/90">
            <span>{li.label}</span>
            <span className="font-semibold tabular-nums text-teal-light">{formatCurrency(li.amount)}</span>
          </li>
        ))}
      </ul>

      <div className="h-px waterline" />
      <div className="pt-3 flex justify-between items-baseline">
        <span className="text-sm font-semibold text-pearl">Grand Total</span>
        <span className="race-head text-2xl font-light tabular-nums text-gold-light">
          {formatCurrency(quote.total)}
        </span>
      </div>
      <p className="text-xs text-pearl/65 mt-2">
        One-time annual fee — pay once. 12-month term from listing activation.
      </p>
    </div>
  );
}
