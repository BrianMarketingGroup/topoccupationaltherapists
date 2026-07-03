"use client";

import { useState, useRef, useEffect, useId } from "react";
import { getCitiesForState, allCities } from "@/content/usCities";
import { ChevronDown, X } from "lucide-react";

interface Props {
  state: string;
  value: string;
  onChange: (city: string) => void;
  /** Called when a city is picked while no state is selected — auto-fills the state. */
  onPickState?: (state: string) => void;
  /** "city|state" keys already chosen elsewhere — hidden from the list. */
  excludeKeys?: string[];
  error?: string;
}

interface Opt {
  city: string;
  state: string;
}

export default function CityCombobox({ state, value, onChange, onPickState, excludeKeys = [], error }: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // State selected → that state's cities; otherwise search across all cities.
  const options: Opt[] = state ? getCitiesForState(state).map((c) => ({ city: c, state })) : allCities;

  const q = query.trim().toLowerCase();
  const filtered = options
    .filter((o) => {
      const key = `${o.city}|${o.state}`;
      if (excludeKeys.includes(key) && !(o.city === value && o.state === state)) return false;
      if (!q) return true;
      return o.city.toLowerCase().startsWith(q);
    })
    .slice(0, 50);

  // Sync external value changes (e.g. reset / prefill).
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close on outside click; revert unconfirmed text.
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (query !== value) setQuery(value);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [query, value]);

  function select(o: Opt) {
    onChange(o.city);
    if (!state && onPickState) onPickState(o.state);
    setQuery(o.city);
    setOpen(false);
  }

  function clear() {
    onChange("");
    setQuery("");
    inputRef.current?.focus();
  }

  const label = (o: Opt) => (state ? o.city : `${o.city}, ${o.state}`);

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center rounded-lg border bg-white px-3 py-2 gap-2 transition-colors ${
          error ? "border-red-400 ring-1 ring-red-400" : open ? "border-teal ring-1 ring-teal" : "border-pearl-dark"
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={`${id}-listbox`}
          value={query}
          placeholder={state ? "Type to search…" : "Search any city…"}
          className="flex-1 bg-transparent text-sm text-navy placeholder:text-muted outline-none"
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(""); // clear confirmed value while typing
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              setQuery(value);
            }
            if (e.key === "Enter" && filtered.length > 0) {
              e.preventDefault();
              select(filtered[0]);
            }
          }}
        />
        {value && (
          <button type="button" onClick={clear} className="text-muted hover:text-navy transition-colors" tabIndex={-1}>
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <ChevronDown className={`h-4 w-4 text-muted flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && filtered.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-56 overflow-auto rounded-lg border border-pearl-dark bg-white shadow-lg py-1"
        >
          {filtered.map((o) => {
            const selected = o.city === value && o.state === state;
            return (
              <li
                key={`${o.city}|${o.state}`}
                role="option"
                aria-selected={selected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(o);
                }}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                  selected ? "bg-teal/10 text-navy font-medium" : "text-navy hover:bg-pearl"
                }`}
              >
                {label(o)}
              </li>
            );
          })}
        </ul>
      )}

      {open && filtered.length === 0 && q.length >= 1 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-pearl-dark bg-white shadow-lg py-3 px-3 text-sm text-muted">
          No cities found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
