"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  /** "luxe" adds a "surfacing from the deep" blur-in for the marine theme. */
  variant?: "default" | "luxe";
}

export default function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
  variant = "default",
}: FadeInProps) {
  const luxe = variant === "luxe";
  const y = direction === "up" ? 28 : 0;
  const x = direction === "left" ? -28 : direction === "right" ? 28 : 0;

  const initial = luxe
    ? { opacity: 0, y: 28, filter: "blur(12px)", scale: 0.985 }
    : { opacity: 0, y, x };
  const animate = luxe
    ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
    : { opacity: 1, y: 0, x: 0 };
  const transition = luxe
    ? { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const }
    : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: luxe ? "-80px" : "-60px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
