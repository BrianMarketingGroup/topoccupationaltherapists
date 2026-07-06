import CheckeredFlag from "./CheckeredFlag";
import Wordmark from "./Wordmark";

interface LogoProps {
  variant?: "onDark" | "onLight";
  className?: string;
}

/** Brand lockup — the brand mark + the stacked wordmark.
 *  Mark glints in gold (precious light); wordmark sits in pearl. */
export default function Logo({ variant = "onDark", className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-[0.5em] select-none ${className}`}>
      <CheckeredFlag className="h-[1.7em] w-[1.7em] flex-shrink-0 text-gold" />
      <Wordmark variant={variant} className="text-[1.5em]" />
    </div>
  );
}
