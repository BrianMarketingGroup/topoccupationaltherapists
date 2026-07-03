"use client";

import { useState } from "react";
import { MapPin, Plus, Star, CheckCircle2 } from "lucide-react";
import { FormField, Select } from "@/components/FormField";
import CityCombobox from "@/components/CityCombobox";
import { US_STATES } from "@/content/states";
import { getPopularMarkets, getNearbyMarkets, getMarket } from "@/content/marketData";

interface Loc {
  city: string;
  state: string;
}

interface MarketPickerProps {
  existingKeys: string[]; // "city|state" already selected elsewhere
  takenSet: string[]; // normalized "city|state" lowercase — Featured already claimed
  onAdd: (loc: Loc) => void;
}

const key = (l: Loc) => `${l.city}|${l.state}`;
const normKey = (city: string, state: string) => `${city.trim()}|${state.trim()}`.toLowerCase();

function marketStatus(loc: Loc, takenSet: string[]): { label: string; tone: "available" | "featured" | "sold" } {
  const featuredTaken = takenSet.includes(normKey(loc.city, loc.state));
  return featuredTaken
    ? { label: "Featured Sold Out", tone: "sold" }
    : { label: "Featured Available", tone: "featured" };
}

function StatusBadge({ status }: { status: { label: string; tone: "available" | "featured" | "sold" } }) {
  const cls =
    status.tone === "sold"
      ? "bg-slate-100 text-muted border-pearl-dark"
      : "bg-teal/10 text-teal border-teal/30";
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cls}`}>
      {status.label}
    </span>
  );
}

export default function MarketPicker({ existingKeys, takenSet, onAdd }: MarketPickerProps) {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [lastAdded, setLastAdded] = useState<Loc | null>(null);

  const popular = getPopularMarkets(9);
  const nearby = lastAdded ? getNearbyMarkets(lastAdded.city, lastAdded.state, 3) : [];

  function add(loc: Loc) {
    if (!loc.city || !loc.state) return;
    if (existingKeys.includes(key(loc))) return;
    onAdd(loc);
    setLastAdded(loc);
    setCity("");
  }

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr_auto] gap-3 items-end">
        <FormField label="State">
          <Select value={state} onChange={(e) => { setState(e.target.value); setCity(""); }}>
            <option value="">Any state</option>
            {US_STATES.map((s) => (
              <option key={s.abbr} value={s.abbr}>{s.name}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="City">
          <CityCombobox
            state={state}
            value={city}
            onChange={setCity}
            onPickState={setState}
            excludeKeys={existingKeys}
          />
        </FormField>
        <button
          type="button"
          disabled={!city || !state}
          onClick={() => add({ city, state })}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-4 py-3 text-sm font-semibold text-navy hover:bg-teal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {/* Nearby recommended markets, shown after adding one with geo data */}
      {nearby.length > 0 && (
        <div className="rounded-xl border border-teal/30 bg-teal/5 p-4">
          <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-teal" /> Nearby Recommended Markets
          </p>
          <div className="flex flex-wrap gap-2">
            {nearby.map((m) => {
              const loc = { city: m.city, state: m.state };
              const already = existingKeys.includes(key(loc));
              return (
                <button
                  key={key(loc)}
                  type="button"
                  disabled={already}
                  onClick={() => add(loc)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-teal hover:bg-teal/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {already ? <CheckCircle2 className="h-3 w-3 text-teal" /> : <Plus className="h-3 w-3" />}
                  {m.city}, {m.state}
                  <span className="text-muted">· pop. {m.population.toLocaleString()}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular markets — a mix of Available and Featured Sold Out, shown before any search */}
      <div>
        <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">Popular Markets</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {popular.map((m) => {
            const loc = { city: m.city, state: m.state };
            const already = existingKeys.includes(key(loc));
            const status = marketStatus(loc, takenSet);
            return (
              <button
                key={key(loc)}
                type="button"
                disabled={already}
                onClick={() => add(loc)}
                className="text-left p-3 rounded-xl border border-pearl-dark bg-white hover:border-teal/50 hover:bg-teal/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-navy text-sm">{m.city}, {m.state}</span>
                  {already && <CheckCircle2 className="h-3.5 w-3.5 text-teal flex-shrink-0" />}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted">Pop. {m.population.toLocaleString()}</span>
                  <StatusBadge status={status} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected-market detail card, shown for the most recently added market */}
      {lastAdded && getMarket(lastAdded.city, lastAdded.state) && (
        <div className="rounded-xl border border-gold/40 bg-amber-50/50 p-4 flex items-center gap-3">
          <Star className="h-4 w-4 text-gold flex-shrink-0" />
          <p className="text-sm text-navy">
            <span className="font-semibold">{lastAdded.city}, {lastAdded.state}</span> added — population{" "}
            {getMarket(lastAdded.city, lastAdded.state)?.population.toLocaleString()}.
          </p>
        </div>
      )}
    </div>
  );
}
