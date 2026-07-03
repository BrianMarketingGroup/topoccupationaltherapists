"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin, Star, ChevronDown, AlignLeft,
  Phone, Globe, CheckCircle2, Award, Users, MessageSquare,
} from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import Container from "./Container";
import FadeIn from "./FadeIn";
import Logo from "./Logo";
import { previewBusinesses } from "@/content/previewBusinesses";
import { siteConfig } from "@/site.config";

const D = siteConfig.directory;

type View = "standard" | "spotlight" | "profile";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "xs" | "sm" }) {
  const cls = size === "xs" ? "h-2 w-2" : "h-2.5 w-2.5 sm:h-3 sm:w-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${cls} ${i <= Math.round(rating) ? "text-gold fill-gold" : "text-navy/15 fill-navy/15"}`} />
      ))}
    </div>
  );
}

function SiteNav() {
  return (
    <div className="bg-navy-dark text-pearl px-3 py-2 sm:px-4 flex items-center gap-4">
      <AlignLeft className="h-4 w-4 text-pearl md:hidden" />
      <Logo variant="onDark" className="text-[10px] flex-shrink-0" />
      <div className="hidden sm:flex items-center gap-1 flex-1 max-w-xs bg-white/10 rounded text-[10px] px-2 py-1">
        <MapPin className="h-2.5 w-2.5 text-teal-light flex-shrink-0" />
        <span className="text-pearl/80 truncate">{D.browse}</span>
      </div>
      <div className="hidden md:flex items-center gap-1 bg-white/10 rounded text-[10px] px-2 py-1">
        <span className="text-pearl/80">{D.filter}</span>
        <ChevronDown className="h-2.5 w-2.5 text-muted" />
      </div>
      <button className="ml-auto bg-teal text-navy-dark text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">
        {D.cta}
      </button>
    </div>
  );
}

function SpotlightCard() {
  const practice = previewBusinesses[0];
  return (
    <div className="mx-2 sm:mx-3 my-2.5 sm:my-3 relative">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold/30 via-gold-light/40 to-gold/30 opacity-50 blur-md pointer-events-none" />
      <div className="relative rounded-xl overflow-hidden border border-gold/40 border-l-2 border-l-gold bg-white shadow-sm">
        <div className="flex items-center justify-between bg-gold/10 border-b border-gold/25 px-2.5 sm:px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <Star className="h-3 w-3 text-gold fill-gold" />
            <span className="text-[9px] sm:text-[10px] font-bold text-gold-dark uppercase tracking-widest">
              {D.spotName}
            </span>
          </div>
          <span className="text-[7px] sm:text-[8px] font-bold text-gold-dark bg-gold/10 border border-gold/30 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
            Exclusive · {D.spotScope}
          </span>
        </div>
        <div className="flex gap-2.5 sm:gap-3 p-2.5 sm:p-3">
          <div className="relative h-[72px] w-[88px] sm:h-20 sm:w-24 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-gold/40 shadow-lg shadow-gold/10">
            <Image src={practice.imageUrl} alt={practice.name} fill className="object-cover object-top" sizes="96px" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[11px] sm:text-xs font-bold text-navy truncate">{practice.name}</h4>
            <p className="text-[8px] sm:text-[9px] text-navy/45 truncate mt-0.5">{practice.categories.slice(0, 2).join(" · ")}</p>
            <div className="flex items-center gap-1 mt-1">
              <StarRating rating={practice.rating} />
              <span className="text-[8px] text-navy/40">({practice.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="h-2 w-2 text-navy/30 flex-shrink-0" />
              <span className="text-[8px] text-navy/40 truncate">{practice.location}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0 space-y-1">
            <p className="text-[9px] sm:text-[10px] font-semibold text-gold-dark">{practice.phone}</p>
            <button className="block w-full text-[9px] sm:text-[10px] bg-gold text-navy-dark font-bold px-2 py-1 rounded shadow-sm shadow-gold/30">
              View Profile
            </button>
            <button className="block w-full text-[9px] sm:text-[10px] border border-gold/40 text-gold-dark px-2 py-1 rounded font-medium">
              Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectoryContent({ showSpotlight }: { showSpotlight: boolean }) {
  const listed = previewBusinesses.filter((b) => b.rank);
  return (
    <div className="bg-pearl h-full">
      <SiteNav />
      <div className="bg-navy px-4 py-3 text-center">
        <p className="text-pearl text-xs sm:text-sm font-semibold">{D.headline}</p>
        <p className="text-pearl/50 text-[9px] sm:text-[10px] mt-0.5">{D.browse} · {previewBusinesses.length} listed</p>
      </div>

      {showSpotlight ? (
        <SpotlightCard />
      ) : (
        <div className="m-2 sm:m-3 rounded-lg border border-dashed border-gold/35 bg-gold/5 p-3 flex items-center justify-center gap-2">
          <Star className="h-3 w-3 text-gold/50 flex-shrink-0" />
          <p className="text-[9px] sm:text-[10px] text-navy/50 text-center">
            {D.spotName} available — {D.spotScope} · <span className="text-gold-dark font-semibold">first-come</span>
          </p>
        </div>
      )}

      <div className="px-2 sm:px-3 pb-4 space-y-2">
        <p className="text-[9px] sm:text-[10px] font-semibold text-navy/55 px-1">{D.listHeading}</p>
        {listed.map((practice) => (
          <div key={practice.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-navy/10 bg-white hover:border-teal/40 transition-colors cursor-pointer">
            <span className="text-xs font-bold text-navy/40 w-4 text-center flex-shrink-0">{practice.rank}</span>
            <div className="relative h-10 w-14 rounded overflow-hidden flex-shrink-0">
              <Image src={practice.imageUrl} alt={practice.name} fill className="object-cover object-top" sizes="56px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-[11px] font-bold text-navy truncate">{practice.name}</p>
              <p className="text-[8px] sm:text-[9px] text-navy/45 truncate">{practice.categories.slice(0, 2).join(" · ")}</p>
              <div className="flex items-center gap-1 mt-0.5"><StarRating rating={practice.rating} /></div>
            </div>
            <button className="text-[9px] sm:text-[10px] bg-teal text-navy-dark font-semibold px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileContent() {
  const practice = previewBusinesses[1];
  return (
    <div className="bg-pearl h-full overflow-auto">
      <SiteNav />
      <div className="bg-navy px-3 py-4 sm:px-4">
        <div className="flex gap-3 items-start">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white/20">
            <Image src={practice.imageUrl} alt={practice.name} fill className="object-cover object-top" sizes="64px" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <h3 className="text-[11px] sm:text-xs font-bold text-pearl leading-tight">{practice.name}</h3>
              <span className="inline-flex items-center gap-0.5 bg-teal/20 border border-teal/40 text-teal-light text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                <CheckCircle2 className="h-2 w-2" /> Verified
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <StarRating rating={practice.rating} />
              <span className="text-[9px] text-pearl/60">{practice.rating} · {practice.reviewCount} reviews</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5 text-teal-light flex-shrink-0" />
              <span className="text-[9px] text-pearl/60 truncate">{practice.servingArea}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 flex items-center justify-center gap-1 bg-teal text-navy-dark text-[10px] font-bold py-1.5 rounded">
            <Phone className="h-2.5 w-2.5" /> Book Now
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 bg-white/10 border border-white/20 text-pearl text-[10px] font-semibold py-1.5 rounded">
            <Globe className="h-2.5 w-2.5" /> Website
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-0 p-2 sm:p-3">
        <div className="col-span-2 space-y-2 pr-2">
          <div className="bg-white rounded-lg border border-navy/10 p-2">
            <p className="text-[8px] font-bold text-navy/50 uppercase tracking-wider mb-1.5">{D.servicesLabel}</p>
            {practice.categories.map((cat) => (
              <div key={cat} className="flex items-center gap-1 mb-1">
                <CheckCircle2 className="h-2.5 w-2.5 text-teal flex-shrink-0" />
                <span className="text-[9px] text-navy/70 leading-tight">{cat}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-navy/10 p-2 space-y-1.5">
            <p className="text-[8px] font-bold text-navy/50 uppercase tracking-wider">Contact</p>
            <div className="flex items-center gap-1">
              <Phone className="h-2.5 w-2.5 text-teal flex-shrink-0" />
              <span className="text-[9px] text-navy/70 truncate">{practice.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5 text-teal flex-shrink-0" />
              <span className="text-[9px] text-navy/70 truncate">{practice.location}</span>
            </div>
          </div>

          <div className="bg-navy rounded-lg p-2 text-center">
            <Award className="h-4 w-4 text-gold mx-auto mb-1" />
            <p className="text-[8px] font-bold text-pearl leading-tight">{siteConfig.shortName}</p>
            <p className="text-[7px] text-gold-light/80">{D.recognition}</p>
          </div>
        </div>

        <div className="col-span-3 space-y-2">
          <div className="bg-white rounded-lg border border-navy/10 p-2">
            <p className="text-[8px] font-bold text-navy/50 uppercase tracking-wider mb-1.5">About</p>
            <p className="text-[9px] text-navy/70 leading-relaxed">{practice.name} is {practice.about}</p>
          </div>

          <div className="bg-white rounded-lg border border-navy/10 p-2">
            <div className="flex items-center gap-1 mb-1.5">
              <Users className="h-2.5 w-2.5 text-navy/40" />
              <p className="text-[8px] font-bold text-navy/50 uppercase tracking-wider">{D.teamLabel}</p>
            </div>
            {practice.team.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                <div className="h-5 w-5 rounded-full bg-teal/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[7px] font-bold text-teal">{p.name[0]}</span>
                </div>
                <div>
                  <p className="text-[8px] font-semibold text-navy/80 leading-none">{p.name}</p>
                  <p className="text-[7px] text-navy/45">{p.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-navy/10 p-2">
            <div className="flex items-center gap-1 mb-1.5">
              <MessageSquare className="h-2.5 w-2.5 text-navy/40" />
              <p className="text-[8px] font-bold text-navy/50 uppercase tracking-wider">Reviews</p>
            </div>
            <div className="space-y-1.5">
              {practice.reviews.map((r) => (
                <div key={r.author} className="border-l-2 border-teal/40 pl-1.5">
                  <StarRating rating={5} size="xs" />
                  <p className="text-[8px] text-navy/60 mt-0.5 leading-tight">&ldquo;{r.text}&rdquo;</p>
                  <p className="text-[7px] text-navy/45 mt-0.5">— {r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CALLOUTS: Record<View, { tone: "spot" | "navy"; icon: React.ReactNode; text: React.ReactNode }> = {
  standard: {
    tone: "navy",
    icon: <span className="text-pearl text-[10px] font-bold">✓</span>,
    text: <><span className="text-pearl font-semibold">Standard Listing</span> — Your {D.noun} appears in the ranked directory list. Patients and referring physicians can click through to your full practice profile.</>,
  },
  spotlight: {
    tone: "spot",
    icon: <Star className="h-4 w-4 text-gold fill-gold" />,
    text: <><span className="text-gold-light font-semibold">{D.spotName}</span> — Your {D.noun} is pinned as a highlighted banner above all ranked listings. Exclusive — {D.spotScope}, first come, first served.</>,
  },
  profile: {
    tone: "navy",
    icon: <span className="text-pearl text-[10px] font-bold">★</span>,
    text: <><span className="text-pearl font-semibold">Profile Page</span> — Every listing gets a dedicated profile with OT specialties, providers &amp; staff, {D.teamLabel.toLowerCase()}, patient reviews, contact details, and your {siteConfig.shortName} badge.</>,
  },
};

export default function DirectoryPreview() {
  const [view, setView] = useState<View>("spotlight");
  const callout = CALLOUTS[view];

  const browserUrl =
    view === "profile"
      ? `${siteConfig.domain}/${D.profileSlug}`
      : `${siteConfig.domain}/${D.directorySlug}`;

  return (
    <section className="bg-navy py-20 lg:py-24 overflow-hidden relative">
      <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
      <Container className="relative">
        <FadeIn variant="luxe">
          <div className="text-center mb-10 relative z-40">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold text-teal-light uppercase tracking-[0.3em] mb-4">
              <span className="h-2 w-2 rotate-45 bg-teal animate-glow-breathe" />
              Your Listing
            </p>
            <h2 className="race-head text-3xl sm:text-5xl font-light text-pearl mb-4">
              What your listing <span className="race-head--accent">looks like</span>
            </h2>
            <div className="h-px waterline w-24 mx-auto mb-5" />
            <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              {D.subtext}
            </p>
          </div>
        </FadeIn>

        <FadeIn variant="luxe" delay={0.05}>
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-1 gap-1">
              <button
                onClick={() => setView("spotlight")}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-tight transition-all duration-200 ${
                  view === "spotlight"
                    ? "bg-gold text-navy-dark shadow-md shadow-gold/30"
                    : "text-muted hover:text-pearl"
                }`}
              >
                <Star className={`h-3.5 w-3.5 ${view === "spotlight" ? "fill-navy-dark" : ""}`} />
                {D.toggles.spotlight}
              </button>
              <button
                onClick={() => setView("profile")}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold tracking-tight transition-all duration-200 ${
                  view === "profile" ? "bg-white/15 text-pearl" : "text-muted hover:text-pearl"
                }`}
              >
                {D.toggles.profile}
              </button>
              <button
                onClick={() => setView("standard")}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold tracking-tight transition-all duration-200 ${
                  view === "standard" ? "bg-white/15 text-pearl" : "text-muted hover:text-pearl"
                }`}
              >
                {D.toggles.directory}
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn variant="luxe" delay={0.07}>
          <div className="max-w-4xl mx-auto mb-4">
            <div className={`rounded-lg border px-4 py-3 flex items-start gap-3 ${callout.tone === "spot" ? "bg-gold/10 border-gold/30" : "bg-white/5 border-white/10"}`}>
              <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${callout.tone === "spot" ? "bg-gold/20" : "bg-white/10"}`}>
                {callout.icon}
              </div>
              <p className="text-xs text-pearl/65 leading-relaxed">{callout.text}</p>
            </div>
          </div>
        </FadeIn>

        <div className="relative max-w-4xl mx-auto pb-6 sm:pb-12">
          <div className="absolute -inset-8 carbon opacity-[0.06] pointer-events-none" />
          <FadeIn variant="luxe" delay={0.1}>
            <div className="relative rounded-xl overflow-hidden">
              <BrowserFrame url={browserUrl}>
                {view === "profile" ? (
                  <ProfileContent />
                ) : (
                  <DirectoryContent showSpotlight={view === "spotlight"} />
                )}
              </BrowserFrame>
            </div>
          </FadeIn>
        </div>

        <p className="text-center text-sm text-muted mt-8 relative z-40">
          Preview — {siteConfig.name} listings go live{" "}
          <span className="text-gold-light font-semibold">{D.launch}.</span>
        </p>
      </Container>
    </section>
  );
}
