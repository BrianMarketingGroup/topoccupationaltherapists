import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description:
    `Get in touch with the ${siteConfig.name} team. Questions about listing your occupational therapy practice? Our team is ready to help you claim your city before the ${siteConfig.directory.launch} launch.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
        <Container className="relative">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold text-teal-light uppercase tracking-[0.3em] mb-4">
              <span className="h-2 w-2 rotate-45 bg-teal animate-glow-breathe glow-teal" />
              Get in Touch
            </p>
            <h1 className="race-head text-4xl sm:text-5xl font-light text-pearl mb-6 leading-tight">
              We&apos;re here to <span className="race-head--accent">help</span>
            </h1>
            <div className="h-px waterline w-24 mb-6" />
            <p className="text-muted text-xl leading-relaxed">
              Questions about listing your occupational therapy practice? Our team is ready
              to help you claim your city before launch.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-navy-dark py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Left: contact info */}
            <div>
              <h2 className="race-head text-2xl font-normal text-pearl mb-6">
                Reach Our Team
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-teal-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-pearl">Email</p>
                    <a
                      href={`mailto:${siteConfig.salesEmail}`}
                      className="text-gold hover:text-gold-light transition-colors"
                    >
                      {siteConfig.salesEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-teal-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-pearl">Phone</p>
                    <a
                      href={siteConfig.phoneHref}
                      className="text-gold hover:text-gold-light transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-teal-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-pearl">Response Time</p>
                    <p className="text-muted">We respond promptly.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl glass p-6">
                <p className="race-head text-lg font-normal text-pearl mb-2">
                  Ready to list your practice?
                </p>
                <p className="text-sm text-muted mb-4">
                  Skip the inbox — apply directly online and your practice goes
                  live at the {siteConfig.directory.launch} launch.
                </p>
                <a
                  href="/apply"
                  className="text-sm font-bold text-gold hover:text-gold-light transition-colors"
                >
                  List Your Practice &rarr;
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <h2 className="race-head text-2xl font-normal text-pearl mb-6">
                Send a Message
              </h2>
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/30 border border-white/10">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
