"use client";

import { useFormContext } from "react-hook-form";
import type { ApplyFormData } from "@/lib/schema";
import { FormField, Input, Textarea, Select } from "@/components/FormField";
import { US_STATES } from "@/content/states";
import { checkoutConfig } from "@/content/checkoutConfig";

const formatPhone = (val: string) => {
  const digits = val.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

export default function ContactStep() {
  const { register, formState: { errors } } = useFormContext<ApplyFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-navy mb-1 race-head">Contact Information</h2>
        <p className="text-sm text-muted">Who should we reach out to about this listing?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Company" required error={errors.companyName?.message} className="sm:col-span-2">
          <Input {...register("companyName")} error={errors.companyName?.message} placeholder="e.g. Denver Hearing & Balance Care" />
        </FormField>

        <FormField label="First Name" required error={errors.contactFirstName?.message}>
          <Input {...register("contactFirstName")} error={errors.contactFirstName?.message} placeholder="Jane" />
        </FormField>

        <FormField label="Last Name" required error={errors.contactLastName?.message}>
          <Input {...register("contactLastName")} error={errors.contactLastName?.message} placeholder="Smith" />
        </FormField>

        <FormField label="Title / Role" hint="Optional">
          <Input {...register("contactTitle")} placeholder="e.g. Owner, Au.D., Office Manager" />
        </FormField>

        <FormField label="Email Address" required error={errors.email?.message}>
          <Input {...register("email")} type="email" error={errors.email?.message} placeholder="jane@yourpractice.com" />
        </FormField>

        <FormField label="Phone" required error={errors.contactPhone?.message} className="sm:col-span-2">
          <Input
            {...register("contactPhone")}
            type="tel"
            placeholder="(555) 000-0000"
            error={errors.contactPhone?.message}
            onChange={(e) => { e.target.value = formatPhone(e.target.value); register("contactPhone").onChange(e); }}
          />
        </FormField>
      </div>

      <FormField label="Notes" hint="Optional">
        <Textarea {...register("notes")} placeholder="Any questions, special requests, or context for our team…" rows={3} />
      </FormField>

      {checkoutConfig.shippingRequired && (
        <div className="pt-4 border-t border-pearl-dark">
          <h3 className="text-sm font-semibold text-navy mb-1">Complimentary Award Delivery</h3>
          <p className="text-xs text-muted mb-4">Where should we ship your complimentary recognition award?</p>
          <div className="space-y-5">
            <FormField label="Street Address" required error={errors.plaqueShippingAddress?.message}>
              <Input {...register("plaqueShippingAddress")} error={errors.plaqueShippingAddress?.message} placeholder="1420 Industrial Blvd, Suite 100" autoComplete="street-address" />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FormField label="City" required error={errors.plaqueShippingCity?.message}>
                <Input {...register("plaqueShippingCity")} error={errors.plaqueShippingCity?.message} placeholder="Denver" autoComplete="address-level2" />
              </FormField>
              <FormField label="State" required error={errors.plaqueShippingState?.message}>
                <Select {...register("plaqueShippingState")} error={errors.plaqueShippingState?.message} autoComplete="address-level1">
                  <option value="">State</option>
                  {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.abbr}</option>)}
                </Select>
              </FormField>
              <FormField label="ZIP Code" required error={errors.plaqueShippingZip?.message}>
                <Input {...register("plaqueShippingZip")} error={errors.plaqueShippingZip?.message} placeholder="80202" maxLength={10} inputMode="numeric" autoComplete="postal-code" />
              </FormField>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
