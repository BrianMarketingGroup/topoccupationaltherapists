import type { ApplyFormData } from "@/lib/schema";
import type { SiteConfig } from "@/lib/config";
import type { SelectedMarket } from "@/lib/checkoutMarkets";
import { locationKey } from "@/lib/pricing";
import type {
  ContactInfo,
  PlaqueShippingAddress,
  PaymentInfo,
  ListingInfo,
  BusinessHours,
} from "@/lib/store/checkoutStore";

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const DAY_CODE: Record<(typeof DAY_ORDER)[number], "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

function toBusinessHours(hours: BusinessHours) {
  return DAY_ORDER.map((key) => {
    const d = hours[key];
    return {
      day: DAY_CODE[key],
      closed: !d.open,
      hours: d.open ? `${d.from} - ${d.to}` : "",
    };
  });
}

/**
 * Maps the checkout wizard's store state into topaudiologists' existing
 * ApplyFormData shape, so it can be POSTed straight to the existing
 * /api/apply route (which already validates against applySchema and calls
 * the BFF via lib/bff.ts — this function does not talk to the BFF directly).
 */
export function buildApplyPayload(params: {
  config: SiteConfig;
  selectedMarkets: SelectedMarket[];
  specialtyIds: string[];
  contact: ContactInfo;
  plaqueShipping: PlaqueShippingAddress | null;
  payment: PaymentInfo;
  listingChoice: "now" | "later";
  listingInfo: ListingInfo | null;
}): ApplyFormData {
  const specialtyOptions = params.config.specialty?.options ?? [];
  const specialtyLabels = specialtyOptions
    .filter((o) => params.specialtyIds.includes(o.id))
    .map((o) => o.label);

  const featuredLocations = params.selectedMarkets
    .filter((m) => m.featured)
    .map((m) => locationKey(m));

  // topaudiologists' applySchema requires businessAddress/City/State/Zip
  // unconditionally on the "now" path (no sameAsBilling exemption in its
  // superRefine) — and this site has no billing address to copy from in the
  // first place (Step 3 collects only billingZip). So when the wizard's
  // "same as billing" toggle is on, fall back to the plaque shipping
  // address (the only other full address collected) rather than leaving
  // these blank and failing validation.
  const info = params.listingInfo;
  const useShipping = info?.sameAsBilling && !info?.businessAddress;
  const businessAddress = useShipping
    ? params.plaqueShipping?.street ?? ""
    : info?.businessAddress?.street ?? "";
  const businessCity = useShipping
    ? params.plaqueShipping?.city ?? ""
    : info?.businessAddress?.city ?? "";
  const businessState = useShipping
    ? params.plaqueShipping?.state ?? ""
    : info?.businessAddress?.state ?? "";
  const businessZip = useShipping
    ? params.plaqueShipping?.zip ?? ""
    : info?.businessAddress?.zip ?? "";

  return {
    type: "apply",
    locations: params.selectedMarkets.map((m) => ({ city: m.city, state: m.state })),
    featuredLocations,
    specialties: specialtyLabels,

    companyName: info?.businessName || params.contact.company,
    contactFirstName: params.contact.firstName,
    contactLastName: params.contact.lastName,
    contactTitle: params.contact.title,
    email: params.contact.email,
    contactPhone: params.contact.phone,
    notes: params.contact.notes,

    plaqueShippingAddress: params.plaqueShipping?.street ?? "",
    plaqueShippingCity: params.plaqueShipping?.city ?? "",
    plaqueShippingState: params.plaqueShipping?.state ?? "",
    plaqueShippingZip: params.plaqueShipping?.zip ?? "",

    cardName: params.payment.cardholderName,
    cardNumber: params.payment.cardNumber,
    cardExpiry: params.payment.expiry,
    cardCvc: params.payment.cvv,
    billingZip: params.payment.billingZip,

    completeLater: params.listingChoice === "later",
    businessName: info?.businessName ?? "",
    providers: info?.people
      ? info.people.split(",").map((name) => ({ name: name.trim(), title: "", description: "" }))
      : [],
    listingPhone: info?.listingPhone ?? "",
    listingEmail: info?.listingEmail ?? "",
    listingWebsite: info?.website ?? "",
    sameAsBilling: info?.sameAsBilling ?? true,
    businessAddress,
    businessCity,
    businessState,
    businessZip,
    aboutBio: info?.bio ?? "",
    businessHours: info ? toBusinessHours(info.hours) : [],
    assetPermission: info?.assetPermission ?? true,

    consentToTerms: true,
  };
}
