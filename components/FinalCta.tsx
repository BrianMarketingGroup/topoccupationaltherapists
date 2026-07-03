import { ArrowRight, Phone } from "lucide-react";
import Button from "./Button";
import Container from "./Container";
import FadeIn from "./FadeIn";
import { siteConfig } from "@/site.config";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      {/* ambient glow base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 120%, rgba(193,105,79,0.16), transparent 60%)",
        }}
        aria-hidden
      />
      {/* faint ambient light overlay */}
      <div className="absolute inset-0 caustics opacity-50 pointer-events-none" aria-hidden />

      <Container>
        <div className="relative text-center max-w-3xl mx-auto">
          <FadeIn variant="luxe">
            <p className="mb-5 text-[11px] font-semibold tracking-[0.3em] uppercase text-teal-light">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-teal-light align-middle mr-3 glow-teal" aria-hidden />
              Directory Launch · {siteConfig.directory.launch}
            </p>

            <h2 className="race-head text-4xl sm:text-5xl lg:text-6xl font-light text-pearl leading-[1.05] mb-7">
              Claim your city before the{" "}
              <span className="race-head--accent">{siteConfig.directory.launch}</span> launch
            </h2>

            <div className="h-px waterline mx-auto w-24 mb-8" />

            <p className="text-muted text-lg sm:text-xl leading-relaxed mb-10">
              Only one Featured listing per city — and once it&apos;s claimed, it&apos;s gone.
              Secure your place now and be among the first occupational therapy practices in your city.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/apply" variant="primary" size="lg">
                Claim Your City
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href={siteConfig.phoneHref} variant="outline-light" size="lg">
                <Phone className="h-5 w-5 text-teal-light" />
                {siteConfig.phone}
              </Button>
            </div>

            <p className="text-muted/70 text-xs mt-6">
              Prefer to talk it through? Our team is here to help you get listed.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
