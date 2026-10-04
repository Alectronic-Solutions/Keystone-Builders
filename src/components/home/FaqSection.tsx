// FaqSection: common contractor questions answered, also generates FAQPage schema.
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";
import Button from "@/components/Button";
import { homeFaqs, faqSchema } from "@/lib/faqs";

export default function FaqSection() {
  return (
    <Section tone="linen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title="Common questions"
          intro="Straight answers to what homeowners ask us most before they reach out."
          align="center"
        />
        <div className="mt-12">
          <FaqList faqs={homeFaqs} />
        </div>
        <div className="mt-10 text-center">
          <Button href="/faq" variant="outline">
            See all questions
          </Button>
        </div>
      </div>
    </Section>
  );
}
