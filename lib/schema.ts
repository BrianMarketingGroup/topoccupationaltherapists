import { z } from "zod";
import { checkoutConfig } from "@/content/checkoutConfig";

export const SPECIALTIES = [
  "Pediatric Therapy",
  "Sensory Integration",
  "Hand Therapy",
  "Neurological Rehabilitation",
  "Geriatric Care",
  "Home Health",
  "Post-Surgical & Orthopedic Rehab",
] as const;

const PHONE_RE = /^[\d\s\(\)\-\+\.]+$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;

export const applySchema = z
  .object({
    type: z.literal("apply").default("apply"),

    // Screen 1: Select Market (+ Specialty Selection)
    locations: z
      .array(
        z.object({
          city: z.string().min(1, "City is required"),
          state: z.string().length(2, "Select a state"),
        }),
      )
      .min(1, "Add at least one market"),
    featuredLocations: z.array(z.string()).default([]),
    specialties: z.array(z.string()).optional().default([]),

    // Screen 2: Contact Information
    companyName: z.string().min(2, "Company name is required"),
    contactFirstName: z.string().min(1, "First name is required"),
    contactLastName: z.string().min(1, "Last name is required"),
    contactTitle: z.string().optional(),
    email: z.string().email("Enter a valid email address"),
    contactPhone: z.string().min(10, "Enter a valid phone number").regex(PHONE_RE, "Enter a valid phone number"),
    notes: z.string().max(1000).optional(),
    // Plaque Shipping Address ("Top Domains Only") — this is a Top domain.
    plaqueShippingAddress: z.string().min(5, "Shipping address is required"),
    plaqueShippingCity: z.string().min(2, "City is required"),
    plaqueShippingState: z.string().length(2, "Select a state"),
    plaqueShippingZip: z.string().regex(ZIP_RE, "Enter a valid ZIP code"),

    // Screen 3: Payment — billing ZIP only, per the MVP spec (no street/city/state).
    cardName: z.string().min(2, "Name on card is required"),
    cardNumber: z.string().regex(/^[\d\s]{13,25}$/, "Enter a valid card number"),
    cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter expiry as MM/YY"),
    cardCvc: z.string().regex(/^\d{3,4}$/, "Enter 3 or 4 digit security code"),
    billingZip: z.string().regex(ZIP_RE, "Enter a valid ZIP code"),

    // Screen 4: Recommended Add-ons — no dedicated fields; this screen mutates
    // `locations` / `featuredLocations` above (add another city / upgrade to
    // Featured), reusing Screen 1's state.

    // Screen 5: Listing Information — required unless completeLater is set,
    // enforced below via superRefine so per-step trigger() validation keeps
    // working (STEP_FIELDS[5] includes `completeLater` + these field paths).
    completeLater: z.boolean().default(false),
    businessName: z.string().optional(),
    providers: z
      .array(
        z.object({
          name: z.string().min(1, "Name is required"),
          title: z.string().optional(),
          description: z.string().max(500, "Description too long").optional(),
        }),
      )
      .optional(),
    listingPhone: z.string().optional(),
    listingEmail: z.string().email("Enter a valid email address").optional().or(z.literal("")),
    listingWebsite: z.string().optional(),
    sameAsBilling: z.boolean().default(false), // "Use billing ZIP" — only the ZIP carries over, see below
    businessAddress: z.string().optional(),
    businessCity: z.string().optional(),
    businessState: z.string().optional(),
    businessZip: z.string().optional(),
    aboutBio: z.string().max(checkoutConfig.characterLimits.bio, "Bio is too long").optional(),
    businessHours: z
      .array(
        z.object({
          day: z.enum(checkoutConfig.businessHoursDays),
          closed: z.boolean().default(false),
          hours: z.string().optional(),
        }),
      )
      .optional(),
    // Website Asset Permission — single checkbox, checked by default, no
    // fallback path (follows the MVP spec literally, per user confirmation).
    assetPermission: z.boolean().default(true),

    consentToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms to continue" }),
    }),

    _honeypot: z.string().max(0, "Bot detected").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.completeLater) return;
    if (!data.businessName?.trim()) {
      ctx.addIssue({ path: ["businessName"], code: "custom", message: "Business name is required" });
    }
    if (!data.listingPhone?.trim()) {
      ctx.addIssue({ path: ["listingPhone"], code: "custom", message: "Listing phone is required" });
    }
    if (!data.listingEmail?.trim()) {
      ctx.addIssue({ path: ["listingEmail"], code: "custom", message: "Listing email is required" });
    }
    if (!data.businessAddress?.trim()) {
      ctx.addIssue({ path: ["businessAddress"], code: "custom", message: "Street address is required" });
    }
    if (!data.businessCity?.trim()) {
      ctx.addIssue({ path: ["businessCity"], code: "custom", message: "City is required" });
    }
    if (!data.businessState?.trim()) {
      ctx.addIssue({ path: ["businessState"], code: "custom", message: "State is required" });
    }
    if (!data.businessZip?.trim() || !ZIP_RE.test(data.businessZip)) {
      ctx.addIssue({ path: ["businessZip"], code: "custom", message: "Enter a valid ZIP code" });
    }
  });

export const contactSchema = z.object({
  type: z.literal("contact").default("contact"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number").regex(PHONE_RE, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consentToContact: z.literal(true, {
    errorMap: () => ({ message: "Please confirm your consent to continue" }),
  }),
  _honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ApplyFormData = z.infer<typeof applySchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
