"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { siteConfig } from "@/site.config";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1920&q=80";

const HEADLINE = ["Be", "the", "therapist", "they"];
const ACCENT = "trust.";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};
const word = {
  hidden: { opacity: 0, y: 22, filter: "blur(16px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const SPARKS = [
  { top: "22%", left: "18%", d: "0s", s: "2px" },
  { top: "34%", left: "62%", d: "1.2s", s: "1px" },
  { top: "48%", left: "30%", d: "2.1s", s: "2px" },
  { top: "28%", left: "82%", d: "0.6s", s: "1px" },
  { top: "58%", left: "70%", d: "1.7s", s: "2px" },
  { top: "64%", left: "44%", d: "2.6s", s: "1px" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wake = wakeRef.current;
    if (!section || !wake) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      wake.style.animation = "moon-rake 14s ease-in-out infinite";
      return;
    }
    let target = section.clientWidth / 2;
    let cur = target;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target = e.clientX - rect.left;
    };
    const loop = () => {
      cur += (target - cur) * 0.08;
      wake.style.transform = `translateX(${cur}px)`;
      raf = requestAnimationFrame(loop);
    };
    section.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-navy-dark min-h-[94vh]"
    >
      {/* 1. Deep medical blue base gradient */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #04120f 0%, #0a2624 42%, #123f3d 66%, rgba(184,147,95,0.15) 86%, rgba(212,180,131,0.08) 100%)",
        }}
      />

      {/* 2. Background photo */}
      <Image
        src={HERO_IMAGE}
        alt="Occupational therapist helping a patient regain independence"
        fill
        priority
        sizes="100vw"
        className="object-cover object-right-bottom kenburns"
        style={{
          maskImage: "linear-gradient(to top left, black, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to top left, black, transparent 78%)",
          filter: "brightness(0.7) saturate(0.85)",
        }}
      />

      {/* 3. Caustic light + film grain + cursor wake (fade up after the type) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1, ease: "easeOut" }}
      >
        <div className="caustics absolute inset-0" />
        <div className="film-grain absolute inset-0" />
        {/* Cursor light column */}
        <div
          ref={wakeRef}
          className="absolute top-0 bottom-0 w-[24rem]"
          style={{
            left: "-12rem",
            background: "radial-gradient(ellipse at center, rgba(255,240,201,0.5), transparent 70%)",
            mixBlendMode: "screen",
            filter: "blur(28px)",
            opacity: 0.35,
          }}
        />
        {/* Ambient sparks */}
        {SPARKS.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-teal-light animate-glow-breathe"
            style={{
              top: p.top,
              left: p.left,
              width: p.s,
              height: p.s,
              animationDelay: p.d,
              boxShadow: "0 0 8px 2px rgba(221, 144, 117,0.8)",
            }}
          />
        ))}
      </motion.div>

      {/* 4. Bottom gradient fade into the stats band */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-navy pointer-events-none" />

      {/* 5. Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="py-24 lg:py-28">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.3em] uppercase text-teal-light mb-6"
            >
              <span className="h-1.5 w-1.5 rotate-45 bg-teal-light shadow-[0_0_8px_2px_rgba(221,144,117,0.7)]" />
              National Occupational Therapy Directory · {siteConfig.directory.launch}
            </motion.p>

            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="race-head text-pearl text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            >
              {HEADLINE.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block mr-[0.28em]">
                  {w}
                </motion.span>
              ))}
              <motion.span variants={word} className="inline-block race-head--accent">
                {ACCENT}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="text-lg sm:text-xl text-pearl/70 mb-9 max-w-xl leading-relaxed"
            >
              {siteConfig.name} connects patients, families, and referring physicians
              with top occupational therapy practices — and secures your city listing before the {siteConfig.directory.launch} launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button href="/apply" variant="primary" size="lg">Claim Your City</Button>
              <Button href="/#directory" variant="outline-light" size="lg">See the Directory</Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="mt-7 text-xs font-medium uppercase tracking-[0.22em] text-muted"
            >
              Only one Featured listing per city.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
