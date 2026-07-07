import type { Metadata } from "next";
import CheckoutWizard from "@/components/checkout/CheckoutWizard";
import { topOccupationalTherapistsConfig } from "@/lib/config";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: `List Your Practice — ${siteConfig.name}`,
  description: `Apply to list your occupational therapy practice on ${siteConfig.name} and reach patients searching for pediatric therapy, hand therapy, neurological rehabilitation, and more in your city.`,
};

export default function ApplyPage() {
  return <CheckoutWizard config={topOccupationalTherapistsConfig} />;
}
