import { CheckCircle, Shield, Star, Zap } from "lucide-react";
import Container from "@/components/Container";
import ApplyForm from "@/components/apply/ApplyForm";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: `List Your Practice — ${siteConfig.name}`,
  description: `Apply to list your occupational therapy practice on ${siteConfig.name} and reach patients searching for pediatric therapy, hand therapy, neurological rehabilitation, and more in your city.`,
};

const TRUST = [
  { icon: Star, text: "Only 1 Featured Listing per city" },
  { icon: Shield, text: "Verified practices only" },
  { icon: Zap, text: `Directory launches ${siteConfig.directory.launch}` },
];

const INCLUDED = [
  "Dedicated occupational therapy practice profile",
  "Specialties, services & credentials display",
  "City directory placement",
  "Provider & contact information",
  `${siteConfig.name} recognition badge`,
  "Annual Recognition Award",
];

export default function ApplyPage() {
  return (
    <>
      {/* Dark header */}
      <section className="bg-navy-dark text-pearl pt-8 pb-0 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #c1694f 0%, transparent 60%)" }}
        />
        <Container className="relative text-center">
          <h1 className="race-head text-3xl sm:text-4xl lg:text-5xl font-light mb-4 text-pearl">
            List Your <span className="race-head--accent">Occupational Therapy</span> Practice
          </h1>
          <p className="text-muted max-w-xl mx-auto text-lg">
            Secure your listing before the {siteConfig.directory.launch} launch and reach patients
            and referring physicians actively searching for occupational therapy care in your city.
          </p>
          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-5 text-sm text-muted">
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-teal" />
                {text}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + sidebar */}
      <section className="bg-navy-dark py-6 sm:py-12 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
              {/* What's included */}
              <div className="glass rounded-2xl p-6">
                <p className="text-[11px] font-semibold text-teal-light uppercase tracking-[0.3em] mb-4">What&apos;s Included</p>
                <ul className="space-y-2.5">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-pearl/80">
                      <CheckCircle className="h-4 w-4 text-teal flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="glass rounded-2xl p-6 text-pearl">
                <p className="text-[11px] font-semibold text-teal-light uppercase tracking-[0.3em] mb-4">Pricing</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted">Basic listing</span>
                    <span className="font-bold"><span className="text-muted/60 line-through font-normal mr-1.5">$578</span>$289 / city</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted">Featured listing</span>
                    <span className="font-bold text-gold"><span className="text-muted/60 line-through font-normal mr-1.5">+$1,378</span>+$689 / city</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted">Additional featured</span>
                    <span className="font-bold text-gold"><span className="text-muted/60 line-through font-normal mr-1.5">+$690</span>+$345 / city</span>
                  </div>
                  <div className="border-t border-border pt-3 text-xs text-muted leading-relaxed">
                    One-time annual fee. 12-month term from listing activation.
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-sm font-bold text-pearl mb-1">Need help?</p>
                <p className="text-xs text-muted mb-3">Our team is available to walk you through listing your occupational therapy practice.</p>
                <a href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-light hover:text-teal transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
            </aside>

            {/* Form card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 border border-white/10 overflow-hidden">
                {/* Card header */}
                <div className="bg-gradient-to-r from-navy to-navy-light px-8 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-pearl font-bold">Occupational Therapy Practice Application</p>
                    <p className="text-muted text-xs mt-0.5">All information is kept confidential</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-teal/20 border border-teal/30 rounded-full px-3 py-1.5">
                    <Shield className="h-3 w-3 text-teal" />
                    <span className="text-teal-light text-xs font-semibold">Secure</span>
                  </div>
                </div>
                {/* Form body */}
                <div className="p-6 sm:p-8">
                  <ApplyForm />
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
