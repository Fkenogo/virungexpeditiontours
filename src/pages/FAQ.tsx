import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from("faq_items")
        .select("*")
        .eq("is_active", true)
        .order("category")
        .order("display_order");

      if (error) throw error;

      setFaqs(data || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data?.map((faq) => faq.category) || []));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFAQsByCategory = (category: string) => {
    return faqs.filter((faq) => faq.category === category);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl">Everything you need to know about traveling with us</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Loading FAQs...</p>
                </CardContent>
              </Card>
            ) : categories.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No FAQs Available</CardTitle>
                  <CardDescription>
                    Check back soon for frequently asked questions, or contact us directly.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Tabs defaultValue={categories[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                  {categories.slice(0, 8).map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((category) => (
                  <TabsContent key={category} value={category}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">{category}</CardTitle>
                        <CardDescription>
                          Common questions about {category.toLowerCase()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {getFAQsByCategory(category).map((faq, index) => (
                            <AccordionItem key={faq.id} value={`item-${index}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground whitespace-pre-line">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            )}

            {/* Contact CTA */}
            <Card className="mt-8 bg-primary text-primary-foreground">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Our team is here to help you plan your perfect Rwanda adventure
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/250783959404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors font-semibold"
                  >
                    Contact via WhatsApp
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground rounded-md hover:bg-background/90 transition-colors font-semibold"
                  >
                    Request a Quote
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
