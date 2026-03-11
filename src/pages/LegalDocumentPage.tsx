import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useContentDoc } from "@/hooks/useContentDoc";
import TermsConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import BookingTerms from "./BookingTerms";

type Props = {
  slug: "privacy-policy" | "terms-and-conditions" | "booking-terms";
};

type LegalDoc = {
  title: string;
  content_markdown: string;
  is_active: boolean;
};

const FALLBACKS: Record<Props["slug"], React.ReactNode> = {
  "privacy-policy": <PrivacyPolicy />,
  "terms-and-conditions": <TermsConditions />,
  "booking-terms": <BookingTerms />,
};

const TITLES: Record<Props["slug"], string> = {
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
  "booking-terms": "Booking Terms",
};

export default function LegalDocumentPage({ slug }: Props) {
  const { data } = useContentDoc<LegalDoc>("legal_documents", slug, {
    title: TITLES[slug],
    content_markdown: "",
    is_active: false,
  });

  const shouldUseDynamic = useMemo(
    () => Boolean(data.is_active && data.content_markdown && data.content_markdown.trim().length > 0),
    [data.content_markdown, data.is_active],
  );

  if (!shouldUseDynamic) return FALLBACKS[slug];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title || TITLES[slug]}</h1>
          <p className="text-lg opacity-90">Managed from Admin Content</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-slate max-w-none">
        <ReactMarkdown>{data.content_markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
