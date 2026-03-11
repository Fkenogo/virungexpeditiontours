import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useContentDoc } from "@/hooks/useContentDoc";
import { LegalPageContent } from "@/types/legalPageContent";
import { DEFAULT_BOOKING_TERMS } from "@/types/legalPageContent";

const BookingTerms = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { data: content, loading } = useContentDoc<LegalPageContent>("legal", "booking-terms", DEFAULT_BOOKING_TERMS);

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
          <p className="mt-4 text-muted-foreground">Loading booking terms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Terms</h1>
          <p className="text-lg opacity-90">Quick Reference Guide</p>
          <p className="mt-4 max-w-3xl">
            Essential booking information for your Rwanda safari. For complete terms, please refer to our full Terms and Conditions.
          </p>
          <div className="flex gap-4 mt-6">
            <Button onClick={handleDownloadPDF} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Link to="/terms-and-conditions">
              <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Full Terms →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Render the dynamic content from Firestore */}
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.content_markdown}</ReactMarkdown>
        </div>

        {/* Related Links */}
        <div className="border-t pt-8 mt-12">
          <h3 className="font-bold text-lg mb-4">Related Documents</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms-and-conditions" className="text-primary hover:underline">
              Complete Terms & Conditions →
            </Link>
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy →
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

export default BookingTerms;
