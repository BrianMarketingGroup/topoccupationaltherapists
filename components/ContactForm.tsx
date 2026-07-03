"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schema";
import { FormField, Input, Textarea } from "./FormField";
import Button from "./Button";
import { getTrafficSource } from "./TrafficSourceTracker";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "contact", consentToContact: true },
  });

  async function onSubmit(data: ContactFormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-traffic-source": getTrafficSource(),
          "x-landing-page": window.location.pathname,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle className="h-12 w-12 text-teal" />
        <h3 className="race-head text-2xl text-pearl">Message Received</h3>
        <p className="text-muted">
          Thank you for reaching out to the TopOccupationalTherapists.com team. A member of our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input type="text" aria-hidden tabIndex={-1} className="absolute opacity-0 h-0 w-0 pointer-events-none" {...register("_honeypot")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="First Name" required error={errors.firstName?.message}>
          <Input {...register("firstName")} error={errors.firstName?.message} placeholder="Jane" />
        </FormField>

        <FormField label="Last Name" required error={errors.lastName?.message}>
          <Input {...register("lastName")} error={errors.lastName?.message} placeholder="Doe" />
        </FormField>
      </div>

      <FormField label="Email Address" required error={errors.email?.message}>
        <Input {...register("email")} error={errors.email?.message} type="email" placeholder="you@yourbusiness.com" />
      </FormField>

      <FormField label="Phone" required error={errors.phone?.message}>
        <Input {...register("phone")} error={errors.phone?.message} type="tel" placeholder="(555) 000-0000" />
      </FormField>

      <FormField label="Message" required error={errors.message?.message}>
        <Textarea {...register("message")} error={errors.message?.message} placeholder="Tell us about your occupational therapy practice, your specialties, and the cities you&apos;d like to be listed in…" />
      </FormField>

      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("consentToContact")}
            className="mt-0.5 h-4 w-4 rounded accent-teal flex-shrink-0"
          />
          <span className="text-sm text-muted leading-snug">
            I consent to being contacted by the TopOccupationalTherapists.com team regarding my inquiry, and agree to receive marketing communications via email or SMS. Reply STOP to opt out at any time.
          </span>
        </label>
        {errors.consentToContact && (
          <p className="text-xs text-red-600 pl-7">{errors.consentToContact.message}</p>
        )}
      </div>

      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {serverError}
        </div>
      )}

      <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
