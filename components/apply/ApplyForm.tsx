"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { applySchema, type ApplyFormData } from "@/lib/schema";
import { locationKey } from "@/lib/pricing";
import { checkoutConfig } from "@/content/checkoutConfig";
import { getTrafficSource } from "@/components/TrafficSourceTracker";
import Button from "@/components/Button";
import MarketSelectStep from "./MarketSelectStep";
import ContactStep from "./ContactStep";
import PaymentStep from "./PaymentStep";
import AddOnsStep from "./AddOnsStep";
import ListingInfoStep from "./ListingInfoStep";
import type { UploadedFile } from "./utils";

const STEPS = [
  { number: 1, label: "Market" },
  { number: 2, label: "Contact" },
  { number: 3, label: "Payment" },
  { number: 4, label: "Add-ons" },
  { number: 5, label: "Listing" },
] as const;

const STEP_FIELDS: Record<number, (keyof ApplyFormData)[]> = {
  1: ["locations"],
  2: ["companyName", "contactFirstName", "contactLastName", "email", "contactPhone", "plaqueShippingAddress", "plaqueShippingCity", "plaqueShippingState", "plaqueShippingZip"],
  3: ["cardName", "cardNumber", "cardExpiry", "cardCvc", "billingZip"],
  4: [],
  5: ["completeLater", "businessName", "listingPhone", "listingEmail", "businessAddress", "businessCity", "businessState", "businessZip"],
};

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = step.number < current;
        const active = step.number === current;
        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors
                ${done ? "bg-teal border-teal text-white" : active ? "bg-navy border-navy text-white" : "bg-navy-light/20 border-pearl-dark text-muted"}`}>
                {done ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <span className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap hidden sm:block
                ${active ? "text-navy" : done ? "text-teal" : "text-muted"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-14px] sm:mt-[-20px] transition-colors ${done ? "bg-teal" : "bg-pearl-dark"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ApplyForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploads, setUploads] = useState<Partial<Record<"logo" | "photo" | "banner", UploadedFile>>>({});

  const methods = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      type: "apply",
      locations: [],
      featuredLocations: [],
      specialties: [],
      providers: [],
      completeLater: false,
      sameAsBilling: false,
      businessHours: checkoutConfig.businessHoursDays.map((day) => ({ day, closed: false, hours: "" })),
      assetPermission: true,
    },
    mode: "onTouched",
  });

  const { handleSubmit, watch, setValue, clearErrors, trigger, formState: { isSubmitting } } = methods;

  const watchedLocations = watch("locations");
  const watchedFeatured = watch("featuredLocations") ?? [];
  const validLocations = (watchedLocations ?? []).filter((l) => l.city && l.state);

  // Fetch the taken Featured spots once when the form opens. Backed by the BFF
  // featured_claims API (with a Google-Sheets fallback) via /api/cities/availability.
  const [takenSet, setTakenSet] = useState<string[]>([]);
  const normKey = (city: string, state: string) => `${city.trim()}|${state.trim()}`.toLowerCase();
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/cities/availability");
        const data = await res.json();
        const taken: { city: string; state: string }[] = data.taken ?? [];
        if (active) setTakenSet(taken.map((t) => normKey(t.city, t.state)));
      } catch {
        // Fail open — never block the form on an availability check.
      }
    })();
    return () => { active = false; };
  }, []);

  const takenCities = validLocations.filter((loc) => takenSet.includes(normKey(loc.city, loc.state))).map(locationKey);
  const userDeselectedRef = useRef(new Set<string>());
  const locationsKey = validLocations.map(locationKey).join(",");

  // Auto-select Featured for newly-added cities unless the user explicitly deselected them.
  useEffect(() => {
    const validKeys = validLocations.map(locationKey);
    const filtered = watchedFeatured.filter((k) => validKeys.includes(k) && !takenCities.includes(k));
    if (filtered.length !== watchedFeatured.length) setValue("featuredLocations", filtered);
    const toAutoSelect = validKeys.filter((k) => !takenCities.includes(k) && !watchedFeatured.includes(k) && !userDeselectedRef.current.has(k));
    if (toAutoSelect.length > 0) setValue("featuredLocations", [...filtered, ...toAutoSelect]);
    const validKeySet = new Set(validKeys);
    userDeselectedRef.current = new Set([...userDeselectedRef.current].filter((k) => validKeySet.has(k)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationsKey, takenSet.join(","), setValue]);

  async function goNext() {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) {
      const next = step + 1;
      clearErrors(STEP_FIELDS[next] as (keyof ApplyFormData)[]);
      setStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => {
        const el = document.querySelector('[aria-invalid="true"]');
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  }

  function goBack() {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(data: ApplyFormData) {
    setServerError(null);
    try {
      const payload = {
        ...data,
        featuredLocations: data.featuredLocations.filter((k) => !takenCities.includes(k)),
        uploads,
      };
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-traffic-source": getTrafficSource(),
          "x-landing-page": window.location.pathname,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      router.push(data.completeLater ? "/apply/thanks?path=later" : "/apply/thanks");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        onKeyDown={(e) => {
          if (e.key === "Enter" && step < 5 && (e.target as HTMLElement).tagName !== "TEXTAREA") e.preventDefault();
        }}
      >
        <input type="text" aria-hidden tabIndex={-1} className="absolute opacity-0 h-0 w-0 pointer-events-none" {...methods.register("_honeypot")} />

        <StepIndicator current={step} />

        {step === 1 && <MarketSelectStep takenSet={takenSet} />}
        {step === 2 && <ContactStep />}
        {step === 3 && <PaymentStep />}
        {step === 4 && <AddOnsStep takenSet={takenSet} />}
        {step === 5 && (
          <ListingInfoStep
            uploads={uploads}
            onUploadChange={(key, file) => setUploads((prev) => ({ ...prev, [key]: file }))}
          />
        )}

        {step === 5 && (
          <div className="space-y-1 pt-6 mt-6 border-t border-pearl-dark">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" {...methods.register("consentToTerms")} className="mt-0.5 h-4 w-4 rounded accent-teal flex-shrink-0" />
              <span className="text-sm text-muted leading-snug">
                I consent to being contacted by the TopOccupationalTherapists.com team regarding my listing, and agree to receive marketing communications via email or SMS. Reply STOP to opt out at any time. I also agree to the{" "}
                <a href="/terms" target="_blank" className="text-gold-dark underline hover:text-navy">Terms of Service</a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" className="text-gold-dark underline hover:text-navy">Privacy Policy</a>.
              </span>
            </label>
            {methods.formState.errors.consentToTerms && (
              <p className="text-xs text-red-600 pl-7">{methods.formState.errors.consentToTerms.message}</p>
            )}
          </div>
        )}

        {serverError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
            {serverError}
          </div>
        )}

        <div className={`flex mt-8 pt-6 border-t border-pearl-dark ${step > 1 ? "justify-between" : "justify-end"}`}>
          {step > 1 && (
            <button type="button" onClick={goBack} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-navy transition-colors">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          )}

          {step < 5 ? (
            <button type="button" onClick={goNext} className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-navy hover:bg-teal-light transition-colors">
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
