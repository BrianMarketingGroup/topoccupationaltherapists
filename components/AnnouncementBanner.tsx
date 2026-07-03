import { Activity } from "lucide-react";
import Container from "./Container";
import { siteConfig } from "@/site.config";

const SPECIALTY_TYPES = [
  "Pediatric Therapy",
  "Sensory Integration",
  "Hand Therapy",
  "Neurological Rehabilitation",
  "Geriatric Care",
  "Home Health",
  "Post-Surgical & Orthopedic Rehab",
];

export default function AnnouncementBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-dark border-y border-gold/25 py-3">
      {/* faint dot texture */}
      <div className="absolute inset-0 carbon opacity-20" aria-hidden />

      <Container>
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center">
          <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Activity className="h-4 w-4 text-gold-light" />
          </span>

          <p className="text-sm sm:text-[15px] font-medium tracking-wide">
            <span className="text-foil-anim font-semibold">Public launch · {siteConfig.directory.launch}</span>
            <span className="text-muted"> — apply now to secure your city before the directory goes live</span>
          </p>
        </div>

        {/* drifting specialty bullets — living detail beneath the gold line */}
        <div className="relative mt-2.5 hidden md:block overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {[...SPECIALTY_TYPES, ...SPECIALTY_TYPES].map((type, i) => (
              <span
                key={i}
                className="flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-light/80"
              >
                {type}
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/60" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
