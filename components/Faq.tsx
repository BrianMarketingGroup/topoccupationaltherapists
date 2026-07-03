"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import Container from "./Container";
import type { FaqItem } from "@/content/faq";

interface FaqProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  light?: boolean;
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  light?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* gilded waterline rule */}
      <div className="h-px waterline" />

      <button
        className="group w-full flex items-start gap-5 px-2 py-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className={clsx(
            "text-xs font-light tracking-[0.3em] tabular-nums mt-1 flex-shrink-0 w-7 transition-colors",
            isOpen ? "text-gold-light" : "text-muted group-hover:text-gold/70",
          )}
        >
          {num}
        </span>

        {/* Question */}
        <span
          className={clsx(
            "flex-1 font-medium text-base leading-snug transition-colors",
            isOpen ? "text-teal-light" : "text-pearl group-hover:text-pearl",
          )}
        >
          {item.question}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={clsx(
            "flex-shrink-0 h-5 w-5 mt-0.5 text-teal transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-7 pl-[3.25rem] text-sm leading-relaxed text-muted">
              {/* gold accent line */}
              <div className="relative">
                <span className="absolute -left-6 top-1 bottom-0 w-px bg-gold/40 rounded-full" />
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq({
  items,
  title = "Frequently Asked Questions",
  subtitle,
  light = true,
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <section className="py-20 lg:py-28 bg-navy-dark">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-3 text-teal-light">
            Your Questions, Answered
          </p>
          <h2 className="race-head text-3xl sm:text-4xl font-light mb-4 text-pearl">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
          {subtitle && (
            <p className="max-w-xl mx-auto text-lg leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Two-column grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 max-w-5xl mx-auto">
          <div>
            {left.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                light={light}
              />
            ))}
            {/* closing rule */}
            <div className="h-px waterline" />
          </div>
          <div>
            {right.map((item, i) => {
              const globalIndex = half + i;
              return (
                <FaqItem
                  key={globalIndex}
                  item={item}
                  index={globalIndex}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                  light={light}
                />
              );
            })}
            {/* closing rule */}
            <div className="h-px waterline" />
          </div>
        </div>
      </Container>
    </section>
  );
}
