import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useContentDoc } from "@/hooks/useContentDoc";
import { LegalPageContent } from "@/types/legalPageContent";
import { DEFAULT_PRIVACY_POLICY } from "@/types/legalPageContent";

const PrivacyPolicy = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { data: content, loading } = useContentDoc<LegalPageContent>("legal", "privacy-policy", DEFAULT_PRIVACY_POLICY);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading privacy policy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">Last Updated: November 2024</p>
          <p className="mt-4 max-w-3xl">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <Button onClick={handleDownloadPDF} variant="secondary" className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-muted/30 py-8 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Quick Navigation</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <a href="#introduction" className="hover:text-primary">1. Introduction</a>
            <a href="#who-we-are" className="hover:text-primary">2. Who We Are</a>
            <a href="#info-collect" className="hover:text-primary">3. Information We Collect</a>
            <a href="#how-use" className="hover:text-primary">4. How We Use Your Information</a>
            <a href="#legal-basis" className="hover:text-primary">5. Legal Basis for Processing</a>
            <a href="#sharing" className="hover:text-primary">6. How We Share Information</a>
            <a href="#international" className="hover:text-primary">7. International Data Transfers</a>
            <a href="#security" className="hover:text-primary">8. Data Security</a>
            <a href="#retention" className="hover:text-primary">9. Data Retention</a>
            <a href="#your-rights" className="hover:text-primary">10. Your Rights</a>
            <a href="#children" className="hover:text-primary">11. Children's Privacy</a>
            <a href="#third-party" className="hover:text-primary">12. Third-Party Websites</a>
            <a href="#changes" className="hover:text-primary">13. Policy Changes</a>
            <a href="#contact" className="hover:text-primary">14. Contact Us</a>
            <a href="#consent" className="hover:text-primary">15. Consent</a>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Render the dynamic content from Firestore */}
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.content_markdown}</ReactMarkdown>
        </div>

        {/* Related Links */}
        <div className="border-t pt-8 mt-12">
          <h3 className="font-bold text-lg mb-4">Related Policies</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms-and-conditions" className="text-primary hover:underline">
              Terms & Conditions →
            </Link>
            <Link to="/booking-terms" className="text-primary hover:underline">
              Booking Terms →
            </Link>
            <Link to="/contact" className="text-primary hover:underline">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full h-12 w-12 p-0 shadow-lg"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default PrivacyPolicy;
