import Link from "next/link";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "outline-light" | "outline-gold";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-navy-dark font-semibold hover:bg-gold-light active:bg-gold-dark active:scale-[0.98] hover:scale-[1.04] hover:shadow-xl hover:shadow-gold/35 border border-gold hover:border-gold-light",
  secondary:
    "bg-navy text-white font-semibold hover:bg-navy-light active:bg-navy-dark active:scale-[0.98] hover:scale-[1.03] hover:shadow-lg hover:shadow-navy/30 border border-navy",
  "outline-light":
    "bg-transparent text-white font-semibold border border-white hover:bg-white/15 active:scale-[0.98] hover:scale-[1.03] hover:shadow-md hover:border-white/80",
  "outline-gold":
    "bg-transparent text-gold font-semibold border border-gold hover:bg-gold/10 active:scale-[0.98] hover:scale-[1.03] hover:shadow-md hover:shadow-gold/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "shine-hover inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
