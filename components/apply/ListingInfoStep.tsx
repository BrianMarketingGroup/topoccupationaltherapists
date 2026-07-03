"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Plus, Trash2, Mail, CheckCircle2 } from "lucide-react";
import type { ApplyFormData } from "@/lib/schema";
import { FormField, Input, Textarea, Select } from "@/components/FormField";
import BrowserFrame from "@/components/BrowserFrame";
import { US_STATES } from "@/content/states";
import { checkoutConfig } from "@/content/checkoutConfig";
import type { UploadedFile } from "./utils";

type UploadKey = "logo" | "photo" | "banner";

interface ListingInfoStepProps {
  uploads: Partial<Record<UploadKey, UploadedFile>>;
  onUploadChange: (key: UploadKey, file: UploadedFile | undefined) => void;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ListingInfoStep({ uploads, onUploadChange }: ListingInfoStepProps) {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<ApplyFormData>();
  const { fields: providerFields, append: appendProvider, remove: removeProvider } = useFieldArray({ control, name: "providers" });
  const { fields: hoursFields } = useFieldArray({ control, name: "businessHours" });

  const completeLater = watch("completeLater");
  const businessName = watch("businessName");
  const aboutBio = watch("aboutBio") ?? "";
  const sameAsBilling = watch("sameAsBilling");
  const billingZip = watch("billingZip");
  const locations = (watch("locations") ?? []).filter((l) => l.city && l.state);
  const specialties = watch("specialties") ?? [];

  async function handleUpload(key: UploadKey, fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return onUploadChange(key, undefined);
    if (file.size > checkoutConfig.fileSizeLimitBytes) {
      alert(`${file.name} is larger than ${checkoutConfig.fileSizeLimitBytes / (1024 * 1024)}MB — please choose a smaller file.`);
      return;
    }
    const base64 = await fileToBase64(file);
    onUploadChange(key, { filename: file.name, mimeType: file.type, base64 });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-navy mb-1 race-head">Listing Information</h2>
        <p className="text-sm text-muted">This is what patients will see on your practice profile.</p>
      </div>

      {/* Complete Now vs Email Me a Link to Complete Later */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setValue("completeLater", false)}
          className={`p-4 rounded-xl border text-left transition-colors ${!completeLater ? "border-teal bg-teal/5" : "border-pearl-dark bg-white hover:border-teal/40"}`}
        >
          <p className="font-semibold text-navy text-sm">Complete Listing Now</p>
          <p className="text-xs text-muted mt-0.5">Fill out your listing details below.</p>
        </button>
        <button
          type="button"
          onClick={() => setValue("completeLater", true)}
          className={`p-4 rounded-xl border text-left transition-colors ${completeLater ? "border-teal bg-teal/5" : "border-pearl-dark bg-white hover:border-teal/40"}`}
        >
          <p className="font-semibold text-navy text-sm flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email Me a Link to Complete Later</p>
          <p className="text-xs text-muted mt-0.5">We&apos;ll email you a checklist and a link to finish your listing.</p>
        </button>
      </div>

      {completeLater ? (
        <div className="rounded-xl border border-teal/30 bg-teal/5 p-5 text-sm text-navy">
          No problem — after you submit, we&apos;ll email you a checklist of everything needed to finish your listing, with a link to complete it whenever you&apos;re ready.
        </div>
      ) : (
        <>
          {/* Preview mockup */}
          <BrowserFrame>
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-dark mb-1">Listing Preview</p>
              <h3 className="race-head text-xl text-navy-dark mb-1">{businessName || "Your Practice Name"}</h3>
              <p className="text-xs text-muted mb-2">{locations.map((l) => `${l.city}, ${l.state}`).join(" · ") || "Your city, state"}</p>
              {specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {specialties.map((s) => (
                    <span key={s} className="text-[10px] bg-teal/10 text-teal border border-teal/20 rounded-full px-2 py-0.5">{s}</span>
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-500 line-clamp-2">{aboutBio || "Your practice bio will appear here…"}</p>
            </div>
          </BrowserFrame>

          <FormField label="Business Name" required error={errors.businessName?.message}>
            <Input {...register("businessName")} error={errors.businessName?.message} placeholder="e.g. Denver Rehab & Therapy Care" />
          </FormField>

          {/* Occupational Therapists / Providers */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-navy">Occupational Therapist(s) / Provider(s)</p>
              <p className="text-sm text-muted">Optional. Highlight the providers behind your practice.</p>
            </div>
            {providerFields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-xl border border-pearl-dark bg-pearl relative">
                <button type="button" onClick={() => removeProvider(index)} className="absolute top-4 right-4 text-muted hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-8">
                  <FormField label="Name" required error={errors.providers?.[index]?.name?.message}>
                    <Input {...register(`providers.${index}.name` as const)} placeholder="e.g. Maria Chen, OTR/L" error={errors.providers?.[index]?.name?.message} />
                  </FormField>
                  <FormField label="Title / Role" hint="Optional">
                    <Input {...register(`providers.${index}.title` as const)} placeholder="e.g. Lead Occupational Therapist, Clinical Director" />
                  </FormField>
                </div>
                <FormField label="Bio / Credentials" hint="Optional">
                  <Textarea {...register(`providers.${index}.description` as const)} placeholder="OTR/L, 15+ years in pediatric and neurological rehabilitation…" rows={2} />
                </FormField>
              </div>
            ))}
            <button type="button" onClick={() => appendProvider({ name: "", title: "", description: "" })} className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-navy transition-colors">
              <Plus className="h-4 w-4" /> Add Provider
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Listing Phone" required error={errors.listingPhone?.message}>
              <Input {...register("listingPhone")} type="tel" placeholder="(555) 000-0000" error={errors.listingPhone?.message} />
            </FormField>
            <FormField label="Listing Email" required error={errors.listingEmail?.message}>
              <Input {...register("listingEmail")} type="email" placeholder="hello@yourpractice.com" error={errors.listingEmail?.message} />
            </FormField>
            <FormField label="Website" hint="Optional" className="sm:col-span-2">
              <Input {...register("listingWebsite")} type="url" placeholder="https://yourpractice.com" />
            </FormField>
          </div>

          {/* Business Address */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
              <input
                type="checkbox"
                checked={sameAsBilling}
                onChange={(e) => {
                  setValue("sameAsBilling", e.target.checked);
                  if (e.target.checked) setValue("businessZip", billingZip ?? "");
                }}
                className="h-4 w-4 rounded accent-teal"
              />
              Use billing ZIP ({billingZip || "—"})
            </label>
            <p className="text-xs text-muted -mt-1">Only the ZIP carries over from Payment — street, city, and state are entered here.</p>
            <FormField label="Street Address" required error={errors.businessAddress?.message}>
              <Input {...register("businessAddress")} error={errors.businessAddress?.message} placeholder="123 Main St" />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FormField label="City" required error={errors.businessCity?.message}>
                <Input {...register("businessCity")} error={errors.businessCity?.message} placeholder="Denver" />
              </FormField>
              <FormField label="State" required error={errors.businessState?.message}>
                <Select {...register("businessState")} error={errors.businessState?.message}>
                  <option value="">State</option>
                  {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.abbr}</option>)}
                </Select>
              </FormField>
              <FormField label="ZIP Code" required error={errors.businessZip?.message}>
                <Input {...register("businessZip")} error={errors.businessZip?.message} placeholder="80202" maxLength={10} inputMode="numeric" />
              </FormField>
            </div>
          </div>

          {/* About / Bio */}
          <FormField label="About / Bio" hint={`${aboutBio.length} / ${checkoutConfig.characterLimits.bio}`} error={errors.aboutBio?.message}>
            <Textarea
              {...register("aboutBio")}
              maxLength={checkoutConfig.characterLimits.bio}
              rows={4}
              placeholder="Tell patients about your practice, approach to care, and what makes you different…"
            />
          </FormField>

          {/* Business Hours */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-navy">Business Hours</p>
            <div className="space-y-2">
              {hoursFields.map((field, i) => {
                const closed = watch(`businessHours.${i}.closed`);
                return (
                  <div key={field.id} className="flex items-center gap-3">
                    <span className="w-10 text-sm font-medium text-navy">{checkoutConfig.businessHoursDays[i]}</span>
                    <label className="flex items-center gap-1.5 text-xs text-muted">
                      <input type="checkbox" {...register(`businessHours.${i}.closed` as const)} className="h-3.5 w-3.5 rounded accent-teal" />
                      Closed
                    </label>
                    {!closed && (
                      <Input {...register(`businessHours.${i}.hours` as const)} placeholder="9:00 AM – 5:00 PM" className="flex-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uploads */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-navy">Logo, Photo &amp; Banner</p>
            <p className="text-xs text-muted -mt-1">Optional. Up to {checkoutConfig.fileSizeLimitBytes / (1024 * 1024)}MB each — attached to your application email.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["logo", "photo", "banner"] as UploadKey[]).map((key) => (
                <div key={key} className="p-3 rounded-xl border border-pearl-dark bg-pearl">
                  <p className="text-xs font-semibold text-navy capitalize mb-2">{key}</p>
                  <input type="file" accept="image/*" onChange={(e) => handleUpload(key, e.target.files)} className="text-xs w-full" />
                  {uploads[key] && (
                    <p className="text-[11px] text-teal mt-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {uploads[key]!.filename}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Website Asset Permission — single checkbox, checked by default */}
          <Controller
            name="assetPermission"
            control={control}
            render={({ field }) => (
              <label className="flex items-start gap-3 p-4 rounded-xl border border-pearl-dark bg-pearl cursor-pointer">
                <input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-teal" />
                <span className="text-sm text-navy">Yes, you may use content and images from our website to help build our listing.</span>
              </label>
            )}
          />
        </>
      )}
    </div>
  );
}
