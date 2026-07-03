import Image from "next/image";
import { Award, MapPin, Heart, BookOpen } from "lucide-react";
import Button from "./Button";
import Container from "./Container";
import FadeIn from "./FadeIn";
import { LaurelLeft, LaurelRight } from "./LaurelWreath";
import { siteConfig } from "@/site.config";

export default function AwardsDinner() {
  return (
    <section className="bg-navy-dark py-20 lg:py-28 overflow-hidden relative carbon">
      {/* faint warm light from the water — so the gold reads lit, not flat */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent pointer-events-none" />

      <Container>
        <FadeIn variant="luxe">
          <div className="text-center mb-14 lg:mb-16">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold-light mb-5">
              Recognition Awards · 2026
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-8">
              <LaurelLeft className="h-20 w-9 sm:h-28 sm:w-12 lg:h-36 lg:w-16 text-gold-light/50 flex-shrink-0" />
              <h2 className="race-head text-3xl sm:text-4xl lg:text-5xl font-light text-pearl leading-tight">
                A Mark of Distinction
                <br />
                <span className="race-head--accent">in Occupational Therapy</span>
              </h2>
              <LaurelRight className="h-20 w-9 sm:h-28 sm:w-12 lg:h-36 lg:w-16 text-gold-light/50 flex-shrink-0" />
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: the recognition award plaque */}
          <FadeIn variant="luxe">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-6 bg-gold/[0.12] rounded-full blur-3xl pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-2xl shadow-black/60">
                  <Image
                    src="/award-plaque.png"
                    alt="Top Occupational Therapists Recognition Award 2026"
                    width={1415}
                    height={1112}
                    sizes="(min-width: 1024px) 28rem, 100vw"
                    className="w-full h-auto"
                    priority
                  />
                </div>
                {/* caption badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 justify-center px-4 py-1.5 border border-gold/40 bg-navy-dark/90 backdrop-blur text-gold-light text-[10px] font-semibold tracking-[0.25em] uppercase rounded-full whitespace-nowrap shadow-lg shadow-black/40">
                  Recognition Awards · 2026
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: details */}
          <FadeIn variant="luxe" delay={0.15}>
            <p className="text-pearl/75 text-lg leading-relaxed mb-8">
              Every practice listed on {siteConfig.name} receives a custom crystal
              recognition award — a tangible mark of distinction to display in your clinic,
              waiting room, or office, where patients and referring physicians decide
              who will guide their occupational therapy care.
            </p>

            <div className="space-y-4 mb-10">
              {[
                {
                  icon: Award,
                  text: "Custom crystal recognition award, engraved with your practice name and city",
                },
                {
                  icon: Heart,
                  text: "Display in your clinic or waiting room — where patient trust is built every day",
                },
                {
                  icon: MapPin,
                  text: "Recognizes you as a Top Occupational Therapist in your city — only one Featured per city",
                },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mt-0.5">
                    <Icon className="h-4 w-4 text-gold-light" />
                  </div>
                  <p className="text-pearl/80 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Button href="/how-it-works" variant="outline-gold" size="lg">
                Learn More
              </Button>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-pearl/80 hover:text-gold-light hover:border-gold/50 hover:bg-gold/10 transition-colors"
              >
                <BookOpen className="h-4 w-4 text-gold-light" />
                {siteConfig.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
