import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useContentDoc } from "@/hooks/useContentDoc";
import { LegalPageContent } from "@/types/legalPageContent";
import { DEFAULT_TERMS_CONDITIONS } from "@/types/legalPageContent";

const TermsConditions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { data: content, loading } = useContentDoc<LegalPageContent>("legal", "terms-and-conditions", DEFAULT_TERMS_CONDITIONS);

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
          <p className="mt-4 text-muted-foreground">Loading terms and conditions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-lg opacity-90">Last Updated: November 2024</p>
          <p className="mt-4 max-w-3xl">
            Please read these terms carefully before booking. By making a booking with us, you agree to be bound by these conditions.
          </p>
          <Button onClick={handleDownloadPDF} variant="secondary" className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-destructive/10 border-l-4 border-destructive py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Important Information</h3>
              <p className="text-sm">
                These Terms and Conditions form a legally binding contract. Gorilla permits are non-refundable once booked. 
                Comprehensive travel insurance is mandatory. Please ensure you understand all terms before making a booking.
              </p>
            </div>
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
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy →
            </Link>
            <Link to="/booking-terms" className="text-primary hover:underline">
              Booking Terms (Quick Reference) →
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

export default TermsConditions;
