import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { siteConfig } from "@/site.config";

export default function Footer() {
  return (
    <footer className="relative bg-navy-dark text-muted overflow-hidden">
      {/* Gilded waterline divider */}
      <div className="h-px waterline" />

      <Container>
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start gap-5">
            <Link href="/">
              <Logo className="text-lg" />
            </Link>
            <p className="text-sm leading-relaxed text-muted max-w-xs">
              The national directory connecting patients and referring physicians with trusted{" "}
              <span className="text-teal-light">occupational therapy practices</span> — pediatric therapy, hand therapy, neurological rehabilitation, and more.
            </p>
            <div className="flex flex-col gap-3 pt-1">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold-light shine-hover hover:border-gold/60 transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.salesEmail}`}
                className="inline-flex items-center gap-2.5 text-sm text-muted hover:text-teal-light transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.salesEmail}
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal-light mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footer.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-teal-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Practices */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal-light mb-5">
              For Practices
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footer.forShops.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-teal-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Listed */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold-light mb-5">
              Get Listed
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Claim your city before we launch in{" "}
              <span className="text-gold-light">September 2026</span>. Only one Featured listing per
              city.
            </p>
            <Link
              href="/apply"
              className="mt-4 inline-flex text-sm font-semibold text-foil"
            >
              List Your Practice &rarr;
            </Link>
          </div>
        </div>

        {/* Gilded waterline divider */}
        <div className="h-px waterline" />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>
            &copy; {siteConfig.launchYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-teal-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
