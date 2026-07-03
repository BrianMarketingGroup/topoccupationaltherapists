import {
  CheckCircle, Star, TrendingUp, ShieldCheck, Users, Zap, Globe,
  Activity, GraduationCap, MessageSquare, BookOpen, MapPin, DollarSign, ThumbsUp, Heart,
} from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import Hero from "@/components/Hero";
import DirectoryPreview from "@/components/DirectoryPreview";
import AwardsDinner from "@/components/AwardsDinner";
import Faq from "@/components/Faq";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FinalCta from "@/components/FinalCta";
import { faqItems } from "@/content/faq";
import { siteConfig } from "@/site.config";

const BENEFITS = [
  { icon: TrendingUp, title: "Increase Your Visibility", body: "Help patients and caregivers searching for occupational therapy services discover your practice." },
  { icon: ShieldCheck, title: "Build Trust & Credibility", body: "A professional profile highlights your credentials, experience, and treatment philosophy." },
  { icon: Star, title: "Differentiate Your Practice", body: "Highlight your specialties, treatment philosophy, certifications, and patient populations served." },
  { icon: Users, title: "Reach Patients at Every Stage", body: "Patients often compare providers before selecting an occupational therapist for pediatric, adult, neurological, or orthopedic rehabilitation." },
  { icon: Zap, title: "Highlight Your Expertise", body: "Whether you specialize in pediatrics, sensory integration, hand therapy, neurological rehabilitation, geriatric care, home health, or post-surgical recovery, your profile helps communicate your expertise." },
  { icon: Globe, title: "Strengthen Your Online Presence", body: "An enhanced listing provides another channel through which prospective patients can discover and evaluate your practice." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Submit Your Application", body: "Complete our simple application with your practice details, OT specialties, and the cities where you want to be listed." },
  { step: "02", title: "Your Profile Goes Live", body: "We build and publish your professional practice profile, optimized to appear when patients search for occupational therapy care in your city." },
  { step: "03", title: "Patients Find Your Practice", body: "Patients discover your listing, review your credentials and specialties, and reach out to schedule an evaluation." },
];

const SPECIALTY_TYPES = [
  "Pediatric Therapy", "Sensory Integration", "Hand Therapy",
  "Neurological Rehabilitation", "Geriatric Care", "Home Health", "Post-Surgical & Orthopedic Rehab",
];

const EVAL_CRITERIA = [
  { icon: GraduationCap, label: "Credentials" },
  { icon: Activity, label: "Clinical Experience" },
  { icon: Heart, label: "Specialties" },
  { icon: MessageSquare, label: "Patient Reviews" },
  { icon: BookOpen, label: "Patient Education" },
  { icon: Zap, label: "Treatment Technology" },
  { icon: MapPin, label: "Location & Hours" },
  { icon: DollarSign, label: "Insurance Accepted" },
  { icon: ThumbsUp, label: "Overall Care" },
];

function EyebrowDark({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "gold" }) {
  return (
    <p className={`inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 ${tone === "gold" ? "text-gold-light" : "text-teal-light"}`}>
      <span className={`h-1.5 w-1.5 rotate-45 ${tone === "gold" ? "bg-gold-light" : "bg-teal-light shadow-[0_0_8px_2px_rgba(221,144,117,0.6)]"}`} />
      {children}
    </p>
  );
}

function EyebrowLight({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "gold" }) {
  return (
    <p className={`inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 ${tone === "gold" ? "text-gold-dark" : "text-teal"}`}>
      <span className={`h-1.5 w-1.5 rotate-45 ${tone === "gold" ? "bg-gold" : "bg-teal shadow-[0_0_8px_2px_rgba(193,105,79,0.4)]"}`} />
      {children}
    </p>
  );
}

function DividerLine() {
  return <div className="h-px waterline" />;
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Stats strip — deep navy blue band ────────────────────────── */}
      <section className="bg-navy py-14 relative overflow-hidden">
        <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
        <div className="absolute inset-x-0 top-0"><DividerLine /></div>
        <Container className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { node: <>1</>, label: "Featured Spot / City" },
              { node: <><CountUp to={100} />%</>, label: "Verified Practices" },
              { node: <>12</>, label: "Month Listing Term" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} variant="luxe">
                <div className="text-center">
                  <div className="race-head text-5xl sm:text-6xl font-light text-gold-light leading-none mb-2 tabular-nums">{s.node}</div>
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-pearl/60">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
        <div className="absolute inset-x-0 bottom-0"><DividerLine /></div>
      </section>

      {/* ── Why list / Benefits — WHITE section ──────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-teal/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 bg-gold/[0.04] blur-3xl rounded-full pointer-events-none" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <EyebrowLight>Why Get Listed</EyebrowLight>
              <h2 className="race-head text-3xl sm:text-5xl text-navy-dark mb-5 leading-tight">
                Why Your Practice<br className="hidden sm:block" /> Belongs <span className="race-head--accent">Here</span>
              </h2>
              <p className="text-slate-500 text-lg">
                Patients compare credentials, specialties, treatment approaches, and experience before choosing an occupational therapist.
                A listing on {siteConfig.name} helps ensure your practice is part of that evaluation.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.07} variant="luxe">
                <div className="group bg-white border border-slate-200 rounded-2xl p-7 h-full hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/8 transition-all duration-300 cursor-default">
                  <div className="h-12 w-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5 border border-teal/20 group-hover:scale-110 group-hover:bg-teal/15 transition-all duration-300">
                    <Icon className="h-5 w-5 text-teal" />
                  </div>
                  <h3 className="race-head text-navy-dark text-xl mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                  <div className="mt-5 h-px w-0 bg-gradient-to-r from-teal to-gold group-hover:w-full transition-all duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Directory preview ─────────────────────────────────────────── */}
      <div id="directory">
        <DirectoryPreview />
      </div>

      {/* ── How it works — light slate section ───────────────────────── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-16">
              <EyebrowLight>Simple Process</EyebrowLight>
              <h2 className="race-head text-3xl sm:text-5xl text-navy-dark mb-4">Three Steps to <span className="race-head--accent">Get Listed</span></h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-9 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
            {HOW_IT_WORKS.map(({ step, title, body }, i) => (
              <FadeIn key={step} delay={i * 0.12} direction="up" variant="luxe">
                <div className="text-center relative group">
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 rounded-full bg-teal/15 blur-md group-hover:bg-teal/25 transition-all duration-300" />
                    <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal/40 bg-white text-teal race-head text-2xl font-light shadow-lg shadow-teal/10 group-hover:scale-105 group-hover:border-teal transition-all duration-300">
                      {step}
                    </div>
                  </div>
                  <h3 className="race-head text-xl mb-3 text-navy-dark">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How patients choose — dark navy accent section ────────────── */}
      <section className="py-16 sm:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-x-0 top-0"><DividerLine /></div>
        <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
              <EyebrowDark>The Decision Process</EyebrowDark>
              <h2 className="race-head text-3xl sm:text-5xl text-pearl mb-4">How Patients Choose an Occupational Therapist</h2>
              <p className="text-pearl/60 text-base sm:text-lg">
                Patients rarely choose the first provider they find. They weigh the factors below
                before committing to an occupational therapy practice.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {EVAL_CRITERIA.map(({ icon: Icon, label }, i) => (
              <FadeIn key={label} delay={i * 0.05} variant="luxe">
                <div className="group shine-hover flex items-center gap-3 rounded-xl glass p-4 hover:border-teal/40 hover:-translate-y-1 transition-all duration-300 h-full">
                  <span className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 rounded-lg bg-teal/10 border border-teal/25 flex items-center justify-center group-hover:bg-teal/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-teal-light" />
                  </span>
                  <span className="font-semibold text-pearl text-sm leading-tight">{label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Highlighted Services — WHITE section ──────────────────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/5 blur-3xl rounded-full pointer-events-none" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <EyebrowLight>Specialties & Services</EyebrowLight>
              <h2 className="race-head text-3xl sm:text-5xl text-navy-dark mb-4">
                Showcase What Makes Your <span className="race-head--accent">Practice</span> Unique
              </h2>
            </div>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {SPECIALTY_TYPES.map((s, i) => {
              const premium = s === "Pediatric Therapy";
              return (
                <FadeIn key={s} delay={i * 0.04} variant="luxe">
                  <span className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-default hover:-translate-y-0.5
                    ${premium
                      ? "border-2 border-gold/60 text-gold-dark bg-amber-50 hover:bg-amber-100"
                      : "bg-slate-100 border border-slate-200 text-slate-700 hover:border-teal/50 hover:bg-teal/5 hover:text-teal"}`}>
                    <Activity className={`h-3.5 w-3.5 flex-shrink-0 ${premium ? "text-gold" : "text-teal"}`} />
                    {s}
                  </span>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn delay={0.3} variant="luxe">
            <div className="text-center">
              <Button href="/apply" variant="primary" size="lg">Get Listed Now</Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Pricing — light gray section ──────────────────────────────── */}
      <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <Container className="relative">
          <FadeIn variant="luxe">
            <div className="text-center mb-14">
              <EyebrowLight tone="gold">Transparent Pricing</EyebrowLight>
              <h2 className="race-head text-3xl sm:text-5xl text-navy-dark mb-4">One-Time Annual Fee</h2>
              <p className="text-slate-500 max-w-xl mx-auto">No subscriptions. No per-click fees. Pay once and your listing runs a full 12-month term.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-start">
            {/* Basic */}
            <FadeIn delay={0.15} variant="luxe">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-teal/8 transition-all duration-300 h-full">
                <h3 className="race-head text-2xl mb-1 text-navy-dark">Basic Listing</h3>
                <p className="text-slate-500 text-sm mb-6">Standard directory placement</p>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl text-slate-400 line-through tabular-nums">$578</span>
                    <span className="text-[11px] font-bold text-gold-dark bg-amber-50 border border-gold/30 rounded px-2 py-0.5 uppercase tracking-wide">50% Off</span>
                  </div>
                  <span className="race-head text-5xl font-light text-navy-dark tabular-nums">$289</span>
                  <span className="text-slate-500 ml-2 text-sm">/ city / year</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  {["Dedicated practice profile page", "OT specialties & services", "City directory placement", "Provider credentials & contact info", "Treatment philosophy & description"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Button href="/apply" variant="outline-light" size="md" className="w-full">Get Basic Listing</Button>
              </div>
            </FadeIn>

            {/* Featured */}
            <FadeIn delay={0.25} variant="luxe">
              <div className="rounded-2xl glow-gold mt-6 md:mt-0 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                  <span className="bg-gold text-navy-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-gold/30">
                    Most Visible — 1 Per City
                  </span>
                </div>
                <div className="bg-navy-dark rounded-2xl p-8 relative overflow-hidden border border-gold/40">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-2xl rounded-full pointer-events-none" />
                  <h3 className="race-head text-2xl mb-1 text-pearl flex items-center gap-2">
                    <Star className="h-5 w-5 fill-gold text-gold" /> Featured Listing
                  </h3>
                  <p className="text-pearl/50 text-sm mb-6">Premium placement + spotlight badge</p>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl text-pearl/40 line-through tabular-nums">+$1,378</span>
                      <span className="text-[11px] font-bold text-gold bg-gold/15 border border-gold/30 rounded px-2 py-0.5 uppercase tracking-wide">50% Off</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-pearl/50 text-lg font-semibold">+</span>
                      <span className="race-head text-5xl font-light text-foil tabular-nums">$689</span>
                      <span className="text-pearl/50 ml-1 text-sm">/ city</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-pearl/85 mb-8 relative">
                    {["Everything in Basic", "Featured badge + top placement", "Highlighted in search results", "Only 1 available per city"].map((f) => (
                      <li key={f} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <Button href="/apply" variant="primary" size="md" className="w-full">Get Featured Listing</Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Awards & Recognition ─────────────────────────────────────── */}
      <AwardsDinner />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <Faq
        items={faqItems}
        title="Frequently Asked Questions"
        subtitle={`Everything you need to know about getting listed on ${siteConfig.name}.`}
        light={false}
      />

      {/* ── Announcement banner ──────────────────────────────────────── */}
      <AnnouncementBanner />

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <FinalCta />
    </>
  );
}
