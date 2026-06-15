// Privacy Policy: required disclosure for form data collection.
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}. How we collect, use, and protect your information.`,
};

const sections = [
  {
    title: "Information we collect",
    body: `When you submit an estimate request through our contact form, we collect your name, phone number, email address, and the details you provide about your project. We do not collect any information through cookies, tracking scripts, or analytics tools.`,
  },
  {
    title: "How we use your information",
    body: `We use the information you submit solely to respond to your project inquiry, prepare an estimate, and communicate with you about your project. We do not use your information for marketing to third parties, and we do not sell, rent, or share your personal information with anyone outside of our company.`,
  },
  {
    title: "How we store your information",
    body: `Estimate request submissions are delivered to our team via email through a third-party form service (FormSubmit). We do not maintain a database of submitted contact forms. Any project records we keep are stored securely and accessible only to our staff.`,
  },
  {
    title: "Third-party services",
    body: `Our website uses Google Fonts to load typography (Playfair Display and Inter). Google may log a request to serve these fonts from your browser. Photography on this site is sourced from Pexels. No other third-party scripts, ad networks, or tracking services are loaded on this website.`,
  },
  {
    title: "Your rights",
    body: `You may request that we delete any personal information you have submitted to us by contacting us at the email address below. We will honor deletion requests within a reasonable timeframe.`,
  },
  {
    title: "Contact",
    body: `If you have questions about this policy or your personal information, contact us at ${site.email} or by phone at ${site.phoneDisplay}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`Effective date: January 1, ${new Date().getFullYear()}. This policy covers how ${site.legalName} handles information collected through this website.`}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-primary">
                  {section.title}
                </h2>
                <span className="mt-3 block h-0.5 w-10 rounded-full bg-accent" />
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-lg border border-primary/10 bg-white p-6">
            <p className="text-sm text-ink-soft">
              This is a demo website built by{" "}
              <span className="font-semibold text-primary">Alectronic Solutions</span>{" "}
              to showcase contractor web design. The business information, license numbers,
              phone numbers, and email addresses on this site are fictional and used for
              demonstration purposes only. No real data is collected or stored.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
