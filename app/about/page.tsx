import {
  Activity, ShieldCheck, Star, MapPin, Award, Users, CheckCircle, Heart,
} from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: `About — ${siteConfig.name}`,
  description: `Learn how ${siteConfig.name} connects patients and referring physicians with trusted occupational therapy practices — and how a listing puts your practice in front of those actively searching for care.`,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.3em] uppercase text-teal-light mb-5">
      <span className="h-1.5 w-1.5 rotate-45 bg-teal-light shadow-[0_0_8px_2px_rgba(221,144,117,0.6)]" />
      {children}
    </p>
  );
}

const VALUES = [
  { icon: Activity, title: "Be Found at the Right Moment", body: "Patients search online before choosing an occupational therapy provider. A listing puts your practice in front of them exactly when they need you most." },
  { icon: ShieldCheck, title: "Built on Trust", body: "Choosing an occupational therapist is highly personal. A professional profile helps patients feel confident selecting your practice before they ever call." },
  { icon: Star, title: "Stand Out in Your City", body: "Showcase your specialties, treatment philosophy, clinical team, and patient-centered care — instead of blending into generic search results." },
];

const INCLUDED = [
  { icon: Activity, title: "Dedicated Practice Profile", body: "A polished page presenting your practice, specialties, providers, and contact details." },
  { icon: MapPin, title: "City Directory Placement", body: "Appear in the cities where patients are searching for occupational therapy care." },
  { icon: Award, title: "Featured Upgrade", body: "Claim the single Featured spot per city for premium, top-of-page placement." },
  { icon: Users, title: "Provider & Staff Spotlight", body: "Introduce your clinical team, credentials, and experience to build patient confidence." },
];

const SPECIALTY_TYPES = [
  "Pediatric Therapy",
  "Sensory Integration",
  "Hand Therapy",
  "Neurological Rehabilitation",
  "Geriatric Care",
  "Home Health",
  "Post-Surgical & Orthopedic Rehab",
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-dark text-pearl py-20 sm:py-28">
        <div className="absolute inset-0 carbon opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-teal/10 blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-10 w-[320px] h-[320px] rounded-full bg-gold/[0.06] blur-[90px] pointer-events-none" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="max-w-3xl mx-auto text-center">
              <Eyebrow>The Occupational Therapy Directory</Eyebrow>
              <h1 className="race-head text-4xl sm:text-5xl lg:text-6xl text-pearl mb-6 leading-[1.05] text-balance">
                The Trusted Place to Find <span className="race-head--accent">Independence & Recovery.</span>
              </h1>
              <p className="text-lg sm:text-xl text-pearl/70 leading-relaxed">
                {siteConfig.name} connects patients and referring physicians with trusted occupational therapy practices across the
                country — so patients can choose their care with confidence, and great practices get found.
              </p>
            </div>
          </FadeIn>
        </Container>
        <div className="absolute inset-x-0 bottom-0"><div className="h-px waterline" /></div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 carbon opacity-[0.35] pointer-events-none" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn variant="luxe">
              <Eyebrow>Our Mission</Eyebrow>
              <h2 className="race-head text-3xl sm:text-4xl text-pearl mb-4">Helping Patients Choose with Confidence</h2>
              <div className="h-px waterline w-24 mx-auto mb-8" />
            </FadeIn>
            <FadeIn variant="luxe" delay={0.1}>
              <div className="space-y-5 text-muted leading-relaxed text-lg text-left sm:text-center">
                <p>
                  Choosing an occupational therapist is a serious health decision — one that affects independence,
                  daily function, and long-term quality of life. Patients rarely go with the
                  first result they find; they compare credentials, specialties, treatment approaches, patient
                  education resources, and reputation.
                </p>
                <p>
                  We built {siteConfig.name} to make that decision easier on both sides. For patients,
                  it&apos;s a clear place to discover and compare occupational therapy practices in their area. For
                  practices, it&apos;s a refined platform to communicate exactly what makes your care exceptional —
                  and to be visible the moment someone is searching.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Why list ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0"><div className="h-px waterline" /></div>
        <div className="absolute inset-0 dot-grid opacity-[0.1] pointer-events-none" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <Eyebrow>Why Get Listed</Eyebrow>
              <h2 className="race-head text-3xl sm:text-4xl text-pearl mb-4">Occupational Therapy Is Built on Trust</h2>
              <p className="text-muted text-lg">
                Patients have more choices than ever. A listing keeps your practice part of the
                conversation at every stage of their search.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.08} variant="luxe">
                <div className="group glass rounded-2xl p-7 h-full hover:border-teal/40 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="h-12 w-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 animate-glow-breathe">
                    <Icon className="h-5 w-5 text-teal-light" />
                  </div>
                  <h3 className="race-head text-xl text-pearl mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What's included ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 carbon opacity-[0.35] pointer-events-none" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-14">
              <Eyebrow>What You Get</Eyebrow>
              <h2 className="race-head text-3xl sm:text-4xl text-pearl mb-4">Everything a Listing Includes</h2>
              <div className="h-px waterline w-24 mx-auto" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {INCLUDED.map(({ icon: Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.07} variant="luxe">
                <div className="flex gap-4 rounded-2xl glass p-6 h-full hover:border-teal/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-11 w-11 flex-shrink-0 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-teal-light" />
                  </div>
                  <div>
                    <h3 className="race-head text-lg text-pearl mb-1">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Specialty types ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0"><div className="h-px waterline" /></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/10 blur-3xl rounded-full pointer-events-none" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <Eyebrow>Every Specialty Welcome</Eyebrow>
              <h2 className="race-head text-3xl sm:text-4xl text-pearl mb-4">From Pediatric Therapy to Post-Surgical Rehab</h2>
              <p className="text-muted text-lg">
                Whatever your clinical specialty, your profile helps patients find the occupational therapy care they need.
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            {SPECIALTY_TYPES.map((s, i) => {
              const premium = s === "Pediatric Therapy";
              return (
                <FadeIn key={s} delay={i * 0.04} variant="luxe">
                  <span className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${premium ? "border border-gold/50 text-gold-light bg-gold/[0.06]" : "glass text-pearl/90"}`}>
                    <Heart className={`h-3.5 w-3.5 ${premium ? "text-gold" : "text-teal"}`} />
                    {s}
                  </span>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-dark relative overflow-hidden">
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-navy to-navy-dark text-center px-6 py-16 sm:py-20">
              <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-gold/15 blur-3xl rounded-full pointer-events-none" />
              <div className="relative">
                <Eyebrow>Directory Launch · {siteConfig.directory.launch}</Eyebrow>
                <h2 className="race-head text-3xl sm:text-4xl text-pearl mb-4">
                  Claim Your City Before the <span className="race-head--accent">{siteConfig.directory.launch}</span> Launch
                </h2>
                <p className="text-muted max-w-xl mx-auto mb-8 text-lg">
                  Reserve your listing now and reach patients and referring physicians actively searching for occupational therapy care in your city.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button href="/apply" variant="primary" size="lg">List Your Practice</Button>
                  <Button href="/how-it-works" variant="outline-light" size="lg">How It Works</Button>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
                  {["One-time annual fee", "Verified practices only", "Only 1 Featured per city"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal flex-shrink-0" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
