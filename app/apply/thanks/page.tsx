"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Mail } from "lucide-react";
import Container from "@/components/Container";
import { siteConfig } from "@/site.config";

function ThanksContent() {
  const searchParams = useSearchParams();
  const later = searchParams.get("path") === "later";

  return (
    <section className="py-24 bg-navy-dark min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-teal/10 blur-3xl rounded-full pointer-events-none" />
      <Container className="relative">
        <div className="max-w-lg mx-auto text-center">
          <div className="h-16 w-16 bg-gold/15 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-breathe glow-gold">
            {later ? <Mail className="h-8 w-8 text-gold-light" /> : <CheckCircle className="h-8 w-8 text-gold-light" />}
          </div>
          <h1 className="race-head text-3xl sm:text-4xl font-light text-pearl mb-4">
            {later ? <>Check your <span className="race-head--accent">inbox</span></> : <>Application <span className="race-head--accent">received</span></>}
          </h1>
          {later ? (
            <p className="text-muted mb-3 leading-relaxed">
              Thank you for applying to list your practice on {siteConfig.name}. We&apos;ve emailed
              you a checklist and a link to finish your listing whenever you&apos;re ready. Your
              listing goes live with the {siteConfig.directory.launch} directory launch once it&apos;s complete.
            </p>
          ) : (
            <p className="text-muted mb-3 leading-relaxed">
              Thank you for applying to list your practice on {siteConfig.name}. Your
              listing goes live with the {siteConfig.directory.launch} directory launch. If we have any
              questions while building your profile, we&apos;ll reach out — otherwise
              there&apos;s nothing more you need to do.
            </p>
          )}
          <p className="text-xs text-muted/70 mb-8">
            Your payment will appear on your card or bank statement as{" "}
            <span className="font-medium text-pearl/80">Digital Service Brands</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="shine-hover inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy-dark text-sm font-bold hover:bg-gold-light hover:scale-[1.03] transition-all duration-200">
              Return Home
            </Link>
            <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-teal/30 text-sm font-semibold text-pearl hover:bg-teal/10 hover:border-teal/50 transition-colors">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={null}>
      <ThanksContent />
    </Suspense>
  );
}
