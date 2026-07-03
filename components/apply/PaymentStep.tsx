"use client";

import { useFormContext } from "react-hook-form";
import type { ApplyFormData } from "@/lib/schema";
import { FormField, Input } from "@/components/FormField";
import OrderSummary from "./OrderSummary";

const formatCC = (val: string) => val.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
const formatExpiry = (val: string) => {
  const d = val.replace(/\D/g, "");
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2, 4)}` : d;
};

export default function PaymentStep() {
  const { register, watch, formState: { errors } } = useFormContext<ApplyFormData>();
  const locations = (watch("locations") ?? []).filter((l) => l.city && l.state);
  const featuredLocations = watch("featuredLocations") ?? [];
  const specialties = watch("specialties") ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-navy mb-1 race-head">Payment</h2>
        <p className="text-sm text-muted">Securely provide your payment information to complete your application.</p>
      </div>

      {/* Order Summary — always visible on the payment page per spec */}
      <OrderSummary locations={locations} featuredLocations={featuredLocations} specialties={specialties} />

      <div className="space-y-5">
        <FormField label="Cardholder Name" required error={errors.cardName?.message}>
          <Input {...register("cardName")} placeholder="Jane Smith" autoComplete="cc-name" error={errors.cardName?.message} />
        </FormField>

        <FormField label="Credit Card Number" required error={errors.cardNumber?.message}>
          <Input
            {...register("cardNumber")}
            placeholder="1234 5678 9012 3456"
            maxLength={25}
            inputMode="numeric"
            autoComplete="cc-number"
            error={errors.cardNumber?.message}
            onChange={(e) => { e.target.value = formatCC(e.target.value); register("cardNumber").onChange(e); }}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-5">
          <FormField label="Expiration Date" required error={errors.cardExpiry?.message} hint="MM/YY">
            <Input
              {...register("cardExpiry")}
              placeholder="MM/YY"
              maxLength={5}
              inputMode="numeric"
              autoComplete="cc-exp"
              error={errors.cardExpiry?.message}
              onChange={(e) => { e.target.value = formatExpiry(e.target.value); register("cardExpiry").onChange(e); }}
            />
          </FormField>

          <FormField label="CVV" required error={errors.cardCvc?.message} hint="Security code">
            <Input
              {...register("cardCvc")}
              placeholder="•••"
              maxLength={4}
              inputMode="numeric"
              autoComplete="cc-csc"
              error={errors.cardCvc?.message}
            />
          </FormField>
        </div>

        <FormField label="Billing ZIP Code" required error={errors.billingZip?.message}>
          <Input
            {...register("billingZip")}
            placeholder="80202"
            maxLength={10}
            inputMode="numeric"
            autoComplete="billing postal-code"
            error={errors.billingZip?.message}
          />
        </FormField>
      </div>

      <p className="text-xs text-muted text-center">
        Your payment will appear on your card or bank statement as{" "}
        <span className="font-medium text-navy">Digital Service Brands</span>.
      </p>
    </div>
  );
}
