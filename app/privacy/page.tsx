import type { Metadata } from "next";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <section className="bg-navy-dark py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 carbon opacity-20 pointer-events-none" />
      <Container className="relative">
        <FadeIn variant="luxe" className="max-w-3xl mx-auto">
          <h1 className="race-head text-4xl lg:text-5xl font-light text-pearl mb-2">
            Privacy <span className="race-head--accent">Policy</span>
          </h1>
          <p className="text-sm text-muted mb-6">Last updated: June 1, 2026</p>
          <div className="h-px waterline mb-10" />

          <Section title="1. Who We Are">
            <p>{siteConfig.name} is an online directory dedicated to connecting patients and referring physicians with trusted occupational therapy practices across the United States.</p>
            <p>This site is intended for business use by occupational therapy practices and is not directed to consumers.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of information:</p>
            <ul>
              <li><strong className="text-pearl">Practice Information:</strong> practice name, website, phone number, OT specialties, city, and state</li>
              <li><strong className="text-pearl">Contact Information:</strong> name, email address, phone number, and job title</li>
              <li><strong className="text-pearl">Payment Information:</strong> billing details necessary to process listing fees. Payment information is processed securely. We do not store full credit card numbers or card security codes (CVV) on our servers.</li>
              <li><strong className="text-pearl">Usage Data:</strong> pages visited, referral source, and session data collected through tools such as Google Analytics</li>
              <li><strong className="text-pearl">Communications:</strong> information submitted through contact forms or direct correspondence</li>
            </ul>
          </Section>

          <Section title="3. How We Use Information">
            <p>We use collected information to:</p>
            <ul>
              <li>Process and review listing applications</li>
              <li>Communicate regarding applications, listing status, and related services</li>
              <li>Send marketing communications (you may opt out at any time)</li>
              <li>Improve and operate our website and services</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </Section>

          <Section title="4. Sharing of Information">
            <p>We do not sell or rent your personal information.</p>
            <p>We may share information only as necessary with:</p>
            <ul>
              <li>Our internal team</li>
              <li>Trusted service providers (such as hosting, analytics, email delivery, and payment processing providers)</li>
              <li>Law enforcement, regulators, or legal authorities when required by law</li>
            </ul>
          </Section>

          <Section title="5. Email and Phone Communications">
            <p>By submitting a contact or application form and providing consent, you agree to be contacted by our team via email and phone regarding your application and related services.</p>
            <p>You may opt out of marketing communications at any time by following the unsubscribe instructions in our emails.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain information for as long as necessary to provide our services, fulfill the purposes outlined in this Policy, and comply with legal, accounting, or regulatory requirements.</p>
            <p>In general, we retain information for the duration of an active listing and for up to three (3) years thereafter, unless a longer retention period is required or permitted by law.</p>
          </Section>

          <Section title="7. Data Security">
            <p>We implement reasonable administrative, technical, and physical safeguards designed to protect your information from unauthorized access, use, or disclosure. However, no method of transmission or storage is completely secure.</p>
          </Section>

          <Section title="8. Your Rights">
            <p>You may request access to, correction of, or deletion of your personal information by contacting us at the email address below.</p>
            <p>Residents of certain states may have additional rights under applicable privacy laws. We will honor such requests as required by law.</p>
          </Section>

          <Section title="9. Cookies and Tracking Technologies">
            <p>We use cookies and similar technologies to understand how visitors interact with our site and to improve functionality.</p>
            <p>These may include analytics cookies and other tracking technologies provided by third-party services.</p>
            <p>You may disable cookies through your browser settings; however, some features of the site may not function properly as a result.</p>
          </Section>

          <Section title="10. U.S. Data Processing">
            <p>All information is processed and stored in the United States. By using our site, you consent to the transfer and processing of your information in the United States.</p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the site constitutes acceptance of the updated Policy.</p>
          </Section>

          <Section title="12. Contact">
            <p>
              <a href={`mailto:${siteConfig.salesEmail}`} className="text-teal-light hover:text-teal transition-colors">{siteConfig.salesEmail}</a>
              <br />
              <a href={siteConfig.phoneHref} className="text-teal-light hover:text-teal transition-colors">{siteConfig.phone}</a>
            </p>
          </Section>
        </FadeIn>
      </Container>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-normal text-pearl mb-3 race-head">{title}</h2>
      <div className="text-muted leading-relaxed space-y-3 text-[15px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">{children}</div>
    </div>
  );
}
