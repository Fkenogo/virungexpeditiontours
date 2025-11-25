import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const PrivacyPolicy = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
        {/* Introduction */}
        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Virunga Expedition Tours ("we," "us," or "our") is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website, 
              make inquiries, or book safari experiences with us.
            </p>
            <p className="mb-4">
              We are registered with the Rwanda Development Board (RDB) and operate in full compliance with the Law No. 058/2021 
              of 13/10/2021 relating to the protection of personal data and privacy in Rwanda, as well as international data protection standards.
            </p>
            <div className="bg-muted p-6 rounded-lg mt-6">
              <h3 className="font-bold text-lg mb-2">Contact Information</h3>
              <p><strong>Company:</strong> Virunga Expedition Tours</p>
              <p><strong>Location:</strong> Kigali, Rwanda</p>
              <p><strong>Email:</strong> <a href="mailto:info@virungaexpeditiontours.com" className="text-primary">info@virungaexpeditiontours.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+250783959404" className="text-primary">+250 783 959 404</a> / <a href="tel:+250783007010" className="text-primary">+250 783 007 010</a></p>
              <p><strong>License:</strong> RDB Licensed, RTTA Member</p>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section id="who-we-are" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2. Who We Are</h2>
          <p className="mb-4">
            We are a licensed tour operator based in Rwanda, specializing in gorilla trekking, wildlife safaris, and adventure tourism 
            across Rwanda's national parks including Volcanoes National Park, Akagera National Park, and Nyungwe Forest National Park.
          </p>
          <p>
            For the purposes of Rwanda's Data Protection Law, we act as a "data controller" for the personal information you provide to us.
          </p>
        </section>

        {/* Information We Collect */}
        <section id="info-collect" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">3. Information We Collect</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="personal-info">
              <AccordionTrigger className="text-lg font-semibold">3.1 Personal Information You Provide</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">We collect personal information that you voluntarily provide when you:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Request a quote or make inquiries</li>
                  <li>Book a safari or tour</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for customer support</li>
                  <li>Participate in surveys or promotional activities</li>
                </ul>
                <p className="mb-4 font-semibold">This information may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Contact Details:</strong> Full name, email address, phone number, physical address</li>
                  <li><strong>Travel Details:</strong> Passport information, arrival/departure dates, travel preferences</li>
                  <li><strong>Booking Information:</strong> Tour selections, accommodation preferences, dietary requirements, special requests</li>
                  <li><strong>Payment Information:</strong> Payment method details (processed securely through our payment providers)</li>
                  <li><strong>Health Information:</strong> Medical conditions, mobility requirements (collected only when necessary for your safety)</li>
                  <li><strong>Emergency Contact:</strong> Next of kin details</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="automatic-info">
              <AccordionTrigger className="text-lg font-semibold">3.2 Information Collected Automatically</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">When you visit our website, we may automatically collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Location data (with your consent)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cookies">
              <AccordionTrigger className="text-lg font-semibold">3.3 Cookies and Tracking Technologies</AccordionTrigger>
              <AccordionContent>
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings 
                  through your browser preferences. For more information, see our Cookie Policy.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* How We Use Your Information */}
        <section id="how-use" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">4. How We Use Your Information</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="primary">
              <AccordionTrigger className="text-lg font-semibold">4.1 Primary Purposes</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Booking and Service Delivery:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Processing and confirming your safari bookings</li>
                      <li>Arranging gorilla permits through RDB</li>
                      <li>Coordinating with lodges, hotels, transport providers, and guides</li>
                      <li>Managing your itinerary and travel arrangements</li>
                      <li>Providing customer support throughout your trip</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Communication:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Responding to your inquiries</li>
                      <li>Sending booking confirmations and updates</li>
                      <li>Providing pre-travel information and safety briefings</li>
                      <li>Communicating important changes or emergency information</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Payment Processing:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Processing payments and issuing invoices</li>
                      <li>Managing deposits and final payments</li>
                      <li>Processing refunds (where applicable)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Legal Compliance:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Complying with RDB regulations and permit requirements</li>
                      <li>Meeting accounting and tax obligations</li>
                      <li>Fulfilling insurance and liability requirements</li>
                      <li>Responding to legal requests from authorities</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="secondary">
              <AccordionTrigger className="text-lg font-semibold">4.2 Secondary Purposes (With Your Consent)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Marketing Communications:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Sending newsletters, special offers, and safari updates</li>
                      <li>Sharing travel inspiration and seasonal itineraries</li>
                      <li>Providing information about new destinations and services</li>
                    </ul>
                    <p className="mt-2 text-sm italic">You can opt out of marketing communications at any time.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Service Improvement:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Analyzing website usage to improve functionality</li>
                      <li>Understanding customer preferences to enhance our offerings</li>
                      <li>Conducting satisfaction surveys</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Legal Basis */}
        <section id="legal-basis" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">5. Legal Basis for Processing</h2>
          <p className="mb-4">Under Rwanda's Data Protection Law, we process your personal data based on:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">1. Contract Performance</p>
              <p className="text-sm">Processing necessary to fulfill your booking and deliver services</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">2. Legal Obligation</p>
              <p className="text-sm">Compliance with RDB regulations, tax laws, and other legal requirements</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">3. Legitimate Interest</p>
              <p className="text-sm">Improving our services, preventing fraud, and ensuring business operations</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">4. Consent</p>
              <p className="text-sm">Marketing communications and optional data processing (which you can withdraw at any time)</p>
            </div>
          </div>
        </section>

        {/* Sharing Information */}
        <section id="sharing" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">6. How We Share Your Information</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="service-providers">
              <AccordionTrigger className="text-lg font-semibold">6.1 Service Providers</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">We share your information only with trusted partners necessary to deliver your safari experience:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Rwanda Development Board (RDB):</strong> For gorilla permit applications and national park bookings</li>
                  <li><strong>Accommodations:</strong> Lodges, hotels, and camps (names, dates, dietary needs, special requests)</li>
                  <li><strong>Transport Providers:</strong> Ground transportation and transfer services</li>
                  <li><strong>Tour Guides:</strong> Licensed guides for your safari activities</li>
                  <li><strong>Airlines:</strong> Flight bookings (when arranged through us)</li>
                  <li><strong>Insurance Providers:</strong> Emergency evacuation coverage (when applicable)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger className="text-lg font-semibold">6.2 Payment Processors</AccordionTrigger>
              <AccordionContent>
                <p>
                  Payment information is processed securely by PCI DSS-compliant payment providers. We do not store complete credit card 
                  details on our systems.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legal">
              <AccordionTrigger className="text-lg font-semibold">6.3 Legal Requirements</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">We may disclose your information when required by:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Rwanda law enforcement authorities</li>
                  <li>RDB or other regulatory bodies</li>
                  <li>Court orders or legal processes</li>
                  <li>Emergency situations affecting your safety</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="business">
              <AccordionTrigger className="text-lg font-semibold">6.4 Business Transfers</AccordionTrigger>
              <AccordionContent>
                <p>
                  In the event of a merger, acquisition, or business transfer, your personal information may be transferred to the 
                  successor entity, subject to the same privacy protections.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="bg-accent/20 border-l-4 border-primary p-4 mt-6">
            <p className="font-semibold">We never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </div>
        </section>

        {/* International Transfers */}
        <section id="international" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">7. International Data Transfers</h2>
          <p className="mb-4">
            As a tourism operator, we work with international clients and occasionally share data with service providers outside Rwanda. 
            When transferring data internationally, we ensure:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>GDPR-compliant safeguards (for European clients)</li>
            <li>Secure transfer protocols and encryption</li>
            <li>Contracts with data protection clauses</li>
            <li>Transfers only to countries with adequate data protection or under approved mechanisms</li>
          </ul>
        </section>

        {/* Data Security */}
        <section id="security" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">8. Data Security</h2>
          <p className="mb-4">We implement robust technical and organizational measures to protect your personal information:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3">Technical Measures:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for website communications</li>
                <li>Secure servers with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Encrypted storage of sensitive data</li>
                <li>Secure payment processing systems</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Organizational Measures:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Staff training on data protection</li>
                <li>Access limited to authorized personnel only</li>
                <li>Confidentiality agreements with all staff and partners</li>
                <li>Regular review of security procedures</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm italic">
            While we strive to protect your personal information, no method of transmission over the internet is 100% secure. 
            We cannot guarantee absolute security but maintain industry-standard protections.
          </p>
        </section>

        {/* Data Retention */}
        <section id="retention" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">9. Data Retention</h2>
          <p className="mb-4">We retain your personal information only as long as necessary:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Data Type</th>
                  <th className="border border-border p-3 text-left">Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Active Bookings</td>
                  <td className="border border-border p-3">Duration of your trip plus 6 months for customer support</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Financial Records</td>
                  <td className="border border-border p-3">7 years (as required by Rwanda tax law)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Marketing Consents</td>
                  <td className="border border-border p-3">Until you unsubscribe or withdraw consent</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Legal Requirements</td>
                  <td className="border border-border p-3">As mandated by applicable laws</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">After retention periods expire, we securely delete or anonymize your personal data.</p>
        </section>

        {/* Your Rights */}
        <section id="your-rights" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">10. Your Rights</h2>
          <p className="mb-4">Under Rwanda's Data Protection Law No. 058/2021, you have the following rights:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.1 Right to Access</h3>
              <p className="text-sm">Request copies of your personal data we hold</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.2 Right to Rectification</h3>
              <p className="text-sm">Correct inaccurate or incomplete information</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.3 Right to Erasure</h3>
              <p className="text-sm">Request deletion of your personal data (subject to legal obligations)</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.4 Right to Restriction</h3>
              <p className="text-sm">Limit how we process your data</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.5 Right to Object</h3>
              <p className="text-sm">Object to processing based on legitimate interests</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.6 Right to Data Portability</h3>
              <p className="text-sm">Receive your data in a structured, commonly used format</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.7 Right to Withdraw Consent</h3>
              <p className="text-sm">Withdraw consent for marketing or optional processing at any time</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">10.8 Right to Complain</h3>
              <p className="text-sm">Lodge a complaint with the Data Protection and Privacy Office of Rwanda</p>
            </div>
          </div>
          <div className="bg-accent/20 border-l-4 border-primary p-4 mt-6">
            <p className="font-semibold mb-2">To exercise any of these rights, contact us at:</p>
            <p>Email: <a href="mailto:info@virungaexpeditiontours.com" className="text-primary">info@virungaexpeditiontours.com</a></p>
            <p>Phone: <a href="tel:+250783959404" className="text-primary">+250 783 959 404</a> / <a href="tel:+250783007010" className="text-primary">+250 783 007 010</a></p>
            <p className="mt-2 text-sm">We will respond to your request within 30 days.</p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section id="children" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">11. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18 years of age. However, we collect information about minors (15+) 
            traveling with responsible adults for gorilla trekking bookings, as required by RDB regulations. We only collect this 
            information from the parent or legal guardian making the booking.
          </p>
        </section>

        {/* Third-Party Websites */}
        <section id="third-party" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">12. Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites (lodges, attractions, partners). We are not responsible for the 
            privacy practices of these external sites. We encourage you to review their privacy policies before providing personal information.
          </p>
        </section>

        {/* Changes */}
        <section id="changes" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">13. Changes to This Privacy Policy</h2>
          <p className="mb-4">We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Post the updated policy on our website</li>
            <li>Update the "Last Updated" date at the top</li>
            <li>Notify you of significant changes via email (if you are a customer or subscriber)</li>
          </ul>
          <p className="mt-4">
            Continued use of our services after changes indicates acceptance of the updated Privacy Policy.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">14. Contact Us</h2>
          <p className="mb-4">For questions, concerns, or requests regarding this Privacy Policy or your personal data:</p>
          <div className="bg-muted p-6 rounded-lg">
            <p className="font-bold text-lg mb-4">Virunga Expedition Tours</p>
            <p className="mb-2"><strong>Location:</strong> Kigali, Rwanda</p>
            <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@virungaexpeditiontours.com" className="text-primary">info@virungaexpeditiontours.com</a></p>
            <p className="mb-2"><strong>Phone:</strong> <a href="tel:+250783959404" className="text-primary">+250 783 959 404</a> / <a href="tel:+250783007010" className="text-primary">+250 783 007 010</a></p>
            <p className="mb-4"><strong>Website:</strong> virungaexpeditiontours.com</p>
            <div className="border-t pt-4 mt-4">
              <p className="font-semibold mb-2">Supervisory Authority:</p>
              <p>Data Protection and Privacy Office</p>
              <p>Rwanda Information Society Authority (RISA)</p>
              <p>Website: <a href="https://dpo.gov.rw" target="_blank" rel="noopener noreferrer" className="text-primary">https://dpo.gov.rw</a></p>
            </div>
          </div>
        </section>

        {/* Consent */}
        <section id="consent" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">15. Consent</h2>
          <div className="bg-accent/20 border-l-4 border-primary p-6">
            <p className="mb-4">
              By using our website, making inquiries, or booking services with us, you acknowledge that you have read, understood, 
              and agree to this Privacy Policy.
            </p>
            <p className="mb-4">
              For marketing communications, we will request your explicit consent, which you can withdraw at any time.
            </p>
            <p className="font-semibold">
              This Privacy Policy complies with the Law No. 058/2021 of 13/10/2021 relating to the protection of personal data 
              and privacy in Rwanda.
            </p>
          </div>
        </section>

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
