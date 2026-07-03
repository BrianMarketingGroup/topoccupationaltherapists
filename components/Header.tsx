"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import Logo from "./Logo";
import { siteConfig } from "@/site.config";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-dark backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo className="text-base md:text-lg lg:text-xl" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-7 flex-shrink min-w-0" aria-label="Main navigation">
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-pearl/80 hover:text-teal-light transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <a
              href={siteConfig.phoneHref}
              className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-pearl/80 hover:text-teal-light transition-colors whitespace-nowrap"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
            <Button href="/apply" variant="primary" size="sm" className="whitespace-nowrap">
              Claim Your City
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-pearl hover:text-teal-light transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy-dark backdrop-blur-xl">
          <Container>
            <nav className="py-4 flex flex-col gap-3" aria-label="Mobile navigation">
              {siteConfig.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-pearl/80 hover:text-teal-light transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 text-base font-medium text-pearl/80 hover:text-teal-light transition-colors py-1"
                >
                  <Phone className="h-5 w-5" />
                  {siteConfig.phone}
                </a>
                <Button
                  href="/apply"
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Claim Your City
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
