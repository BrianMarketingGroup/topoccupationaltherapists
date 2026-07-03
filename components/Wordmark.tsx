import { clsx } from "clsx";
import { siteConfig } from "@/site.config";

/**
 * Text wordmark — the domain set in the premium clinical style.
 * "TOP" rides in pearl, "OCCUPATIONAL THERAPISTS" in pearl with letter-spacing,
 * ".com" a muted gold tld. Size is driven by the parent font-size via
 * `className` (e.g. text-xl).
 */
export default function Wordmark({
  className,
  variant = "onDark",
}: {
  className?: string;
  variant?: "onDark" | "onLight";
}) {
  const { top, bottom, tld } = siteConfig.wordmark;
  const main = variant === "onDark" ? "text-pearl" : "text-navy";
  const sub = variant === "onDark" ? "text-pearl/85" : "text-navy/80";

  return (
    <span
      className={clsx(
        "flex flex-col leading-[0.98] select-none whitespace-nowrap",
        className,
      )}
      aria-label={siteConfig.name}
    >
      <span
        className={clsx(
          "font-sans font-semibold uppercase tracking-[0.22em] text-[0.5em]",
          main,
        )}
      >
        {top}
      </span>
      <span
        className={clsx(
          "font-sans font-semibold uppercase tracking-[0.18em] text-[0.78em]",
          sub,
        )}
      >
        {bottom}
        <span className="font-normal lowercase tracking-normal text-gold-light text-[0.55em]">
          {tld}
        </span>
      </span>
    </span>
  );
}
