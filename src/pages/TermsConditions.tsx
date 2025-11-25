import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowUp, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const TermsConditions = () => {
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
        {/* 1. Introduction */}
        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">1. Introduction and Acceptance</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="agreement">
              <AccordionTrigger>1.1 Agreement</AccordionTrigger>
              <AccordionContent>
                <p>
                  These Terms and Conditions ("Terms") constitute a binding contract between you ("Client," "you," or "your") 
                  and Virunga Expedition Tours ("Company," "we," "us," or "our") for safari and tourism services in Rwanda and East Africa.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="scope">
              <AccordionTrigger>1.2 Scope</AccordionTrigger>
              <AccordionContent>
                <p>
                  By making an inquiry, requesting a quote, or booking any service with us, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms and Conditions.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="authority">
              <AccordionTrigger>1.3 Authority</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">If you are booking on behalf of others (family, friends, colleagues), you confirm that:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You have the authority to accept these Terms on their behalf</li>
                  <li>You are responsible for ensuring all travelers in your party understand and agree to these Terms</li>
                  <li>All information provided is accurate and complete</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="company-info">
              <AccordionTrigger>1.4 Company Information</AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted p-4 rounded-lg">
                  <p><strong>Company:</strong> Virunga Expedition Tours</p>
                  <p><strong>Registered in:</strong> Rwanda</p>
                  <p><strong>RDB Tourism License:</strong> RDB Licensed, RTTA Member</p>
                  <p><strong>Location:</strong> Kigali, Rwanda</p>
                  <p><strong>Email:</strong> <a href="mailto:info@virungaexpeditiontours.com" className="text-primary">info@virungaexpeditiontours.com</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+250783959404" className="text-primary">+250 783 959 404</a> / <a href="tel:+250783007010" className="text-primary">+250 783 007 010</a></p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 2. Definitions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2. Definitions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Booking</p>
              <p className="text-sm">A confirmed reservation for safari services after deposit payment</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Client</p>
              <p className="text-sm">The person(s) making the booking and all travelers in the party</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">RDB</p>
              <p className="text-sm">Rwanda Development Board, the regulatory authority for tourism</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Gorilla Permit</p>
              <p className="text-sm">Official permit issued by RDB for gorilla trekking</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Safari Package</p>
              <p className="text-sm">Complete itinerary including accommodations, activities, transport, and services</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Force Majeure</p>
              <p className="text-sm">Events beyond our reasonable control (detailed in Section 14)</p>
            </div>
          </div>
        </section>

        {/* 3. Applicable Law */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">3. Applicable Law and Jurisdiction</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">3.1 Governing Law</h3>
              <p className="mb-2">These Terms are governed by the laws of the Republic of Rwanda. All services are provided in accordance with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Rwanda Development Board tourism regulations</li>
                <li>Rwanda national parks management policies</li>
                <li>Rwanda consumer protection laws</li>
                <li>International travel industry standards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">3.2 Jurisdiction</h3>
              <p>Any disputes arising from these Terms or your booking shall be subject to the exclusive jurisdiction of the courts of Rwanda.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">3.3 Standards of Service</h3>
              <p>
                Tourism conditions in Rwanda and East Africa may differ from developed countries. Standards of service, infrastructure, 
                medical facilities, and safety protocols may vary, particularly in remote areas and national parks.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Booking Process - Extensive section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">4. Booking Process</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="inquiry">
              <AccordionTrigger>4.1 Inquiry and Quotation</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You submit an inquiry specifying your travel dates, preferences, and requirements</li>
                  <li>We provide a detailed quotation including itinerary, pricing, and terms</li>
                  <li>Quotations are valid for 7 days unless otherwise stated</li>
                  <li>Prices are subject to availability and may change until booking is confirmed</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="confirmation">
              <AccordionTrigger>4.2 Confirmation of Booking</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">A binding contract is formed when:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>You accept our quotation in writing</li>
                  <li>You pay the required deposit</li>
                  <li>We issue written confirmation of your booking</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="required-info">
              <AccordionTrigger>4.3 Required Information</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">To complete your booking, you must provide:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full names as they appear in passports</li>
                  <li>Passport numbers, nationalities, and expiration dates</li>
                  <li>Date of birth (for age-restricted activities)</li>
                  <li>Emergency contact information</li>
                  <li>Dietary requirements and special needs</li>
                  <li>Any medical conditions relevant to activities</li>
                  <li>Travel insurance details</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="changes">
              <AccordionTrigger>4.4 Booking Changes</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">
                  Before final payment, you may request changes to your booking. We will accommodate changes where possible, subject to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Availability of new dates/services</li>
                  <li>Any additional costs incurred (accommodations, permits, flights)</li>
                  <li>Change request fees (if applicable)</li>
                  <li>RDB policies on permit modifications</li>
                </ul>
                <p className="mt-3 text-sm italic">Note: Changes within 60 days of departure may not be possible due to permit and accommodation policies.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 5. Pricing and Payment */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">5. Pricing and Payment Terms</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="pricing">
              <AccordionTrigger>5.1 Pricing</AccordionTrigger>
              <AccordionContent>
                <p>All prices are quoted in US Dollars (USD) unless otherwise specified and include items as detailed in your specific itinerary. Prices are subject to change until booking is confirmed with deposit payment.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="deposit">
              <AccordionTrigger>5.2 Deposit Payment</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Standard Bookings:</p>
                    <ul className="list-disc pl-6 text-sm">
                      <li>40-60% of total tour price due within 7 days of quotation acceptance</li>
                      <li>Includes full payment for gorilla permits and other non-refundable services</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">High Season Bookings (June-September, December-February):</p>
                    <ul className="list-disc pl-6 text-sm">
                      <li>Up to 60% deposit may be required</li>
                      <li>Early booking essential for permit availability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Last-Minute Bookings (within 60 days):</p>
                    <ul className="list-disc pl-6 text-sm">
                      <li>Full payment required immediately upon confirmation</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="final-payment">
              <AccordionTrigger>5.3 Final Payment</AccordionTrigger>
              <AccordionContent>
                <p>Balance due 60 days before tour departure. For bookings made within 60 days of departure: full payment due immediately.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment-methods">
              <AccordionTrigger>5.4 Payment Methods</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>We accept payment via:</p>
                  <ul className="list-disc pl-6">
                    <li><strong>Bank transfer</strong> (preferred - full details provided with invoice)</li>
                    <li><strong>Credit card</strong> (Visa/Mastercard - 3% processing fee applies)</li>
                    <li><strong>Online payment platforms</strong> (as specified in invoice)</li>
                  </ul>
                  <p className="text-sm mt-3 italic">
                    <strong>Important:</strong> Client bears all bank charges and transfer fees. We must receive the full invoiced amount.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 7. Gorilla Permits - CRITICAL Section */}
        <section className="mb-12 border-2 border-primary/30 p-6 rounded-lg bg-primary/5">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-primary" />
            7. Gorilla Permits and National Park Regulations
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="permit-pricing">
              <AccordionTrigger>7.1 Gorilla Permits (Rwanda - Volcanoes National Park)</AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">Category</th>
                        <th className="border border-border p-3 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">Foreign Non-Residents</td>
                        <td className="border border-border p-3 font-bold">$1,500 USD per permit</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="border border-border p-3">Foreign Residents in Rwanda</td>
                        <td className="border border-border p-3 font-bold">$500 USD per permit</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">East African Citizens</td>
                        <td className="border border-border p-3 font-bold">$200 USD per permit</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="border border-border p-3">Rwandan Citizens</td>
                        <td className="border border-border p-3 font-bold">$200 USD per permit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-destructive/10 border-l-4 border-destructive p-4">
                  <p className="font-bold mb-2">Important Conditions:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Permits are issued by RDB and subject to their terms</li>
                    <li>Minimum age: 15 years (strictly enforced)</li>
                    <li>Maximum group size: 8 people per gorilla family</li>
                    <li>Viewing time: 1 hour with gorillas</li>
                    <li><strong>Permits are NON-REFUNDABLE once booked and paid</strong></li>
                    <li><strong>Permits are NON-TRANSFERABLE to other dates without RDB approval and fees</strong></li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="availability">
              <AccordionTrigger>7.2 Permit Availability</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>High season (June-September): Book 6+ months in advance</li>
                  <li>Low season (March-May, November): Book 3+ months in advance</li>
                  <li>Last-minute availability cannot be guaranteed</li>
                  <li>We cannot be held liable for unavailable permits if bookings are made late</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="health-requirements">
              <AccordionTrigger>7.3 Health Requirements for Gorilla Trekking</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">You may be denied access if you show signs of illness:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Cold, flu, or respiratory infections</li>
                  <li>Contagious diseases</li>
                  <li>Any health condition deemed a risk to gorillas</li>
                </ul>
                <div className="bg-muted p-4 rounded">
                  <p className="font-semibold mb-2">Refund Policy (RDB):</p>
                  <ul className="list-disc pl-6 text-sm space-y-1">
                    <li>50% refund if declared unfit by park authorities on trek day</li>
                    <li>No refund for no-shows, late arrivals, or voluntary cancellation</li>
                    <li>No refund for inability to locate gorillas (rare - 99% success rate)</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="guidelines">
              <AccordionTrigger>7.4 Gorilla Trekking Guidelines (RDB Regulations)</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">All trekkers must follow these mandatory rules:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Maintain 7 meters (22 feet) distance from gorillas</li>
                  <li>Maximum viewing time: 1 hour</li>
                  <li>No eating or drinking near gorillas</li>
                  <li>No flash photography</li>
                  <li>Speak in low voices</li>
                  <li>No littering</li>
                  <li>Cover coughs (turn away from gorillas)</li>
                  <li>No spitting in the park</li>
                  <li>Follow guide instructions at all times</li>
                  <li>Physical fitness required (treks can be strenuous)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 9. Cancellation Policy */}
        <section className="mb-12 border-2 border-destructive/30 p-6 rounded-lg bg-destructive/5">
          <h2 className="text-3xl font-bold mb-6">9. Cancellation and Refund Policy</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="client-cancel">
              <AccordionTrigger>9.1 Cancellation by Client</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3 font-semibold">Notification:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>All cancellations must be submitted in writing via email</li>
                  <li>Cancellation is effective from the date we acknowledge receipt</li>
                  <li>Verbal cancellations are not accepted</li>
                </ul>
                <p className="mb-3 font-semibold">Cancellation Fees:</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">Notice Period</th>
                        <th className="border border-border p-3 text-left">Cancellation Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">90+ days before departure</td>
                        <td className="border border-border p-3">30% of total tour cost or deposit (whichever greater) + gorilla permits</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="border border-border p-3">60-90 days</td>
                        <td className="border border-border p-3">50% of total tour cost + gorilla permits</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">30-59 days</td>
                        <td className="border border-border p-3">75% of total tour cost</td>
                      </tr>
                      <tr className="bg-destructive/10">
                        <td className="border border-border p-3">Less than 30 days</td>
                        <td className="border border-border p-3 font-bold">100% of total tour cost (NO REFUND)</td>
                      </tr>
                      <tr className="bg-destructive/10">
                        <td className="border border-border p-3">No-show / After start</td>
                        <td className="border border-border p-3 font-bold">100% of total tour cost (NO REFUND)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="permit-cancel">
              <AccordionTrigger>9.2 Gorilla Permit Cancellations</AccordionTrigger>
              <AccordionContent>
                <div className="bg-destructive/10 border-l-4 border-destructive p-4">
                  <ul className="space-y-2">
                    <li>⚠ Gorilla permits are <strong>NON-REFUNDABLE once booked and paid</strong></li>
                    <li>⚠ This is RDB policy, not our company policy</li>
                    <li>⚠ 50% refund possible only if denied trekking by park authorities due to illness on trek day</li>
                    <li>⚠ No refund for late arrival, flight delays, or voluntary cancellation</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="refund-processing">
              <AccordionTrigger>9.5 Refund Processing</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Refunds processed within 30 days of cancellation confirmation</li>
                  <li>Refunds made to original payment method</li>
                  <li>Bank fees deducted from refund amount</li>
                  <li>Gorilla permit refunds (if applicable) processed after RDB approval</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 11. Travel Insurance - MANDATORY */}
        <section className="mb-12 border-2 border-primary/30 p-6 rounded-lg bg-primary/5">
          <h2 className="text-3xl font-bold mb-6">11. Travel Insurance (MANDATORY)</h2>
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-6">
            <p className="font-bold">Comprehensive travel insurance is MANDATORY for all clients. You must arrange insurance at the time of booking.</p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">11.2 Minimum Coverage Required</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Medical expenses and emergency evacuation: Minimum $100,000 USD</li>
                <li>Trip cancellation and interruption</li>
                <li>Personal accident and liability</li>
                <li>Lost, damaged, or delayed baggage</li>
                <li>Coverage for adventure activities (trekking, safaris, water activities)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">11.3 Recommended Additional Coverage</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>"Cancel For Any Reason" coverage (highly recommended)</li>
                <li>Pre-existing medical conditions coverage</li>
                <li>Extended coverage for valuables</li>
                <li>Political evacuation coverage</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Liability Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">12. Liability and Responsibilities</h2>
          <p className="mb-4">
            Our maximum liability for any claim is limited to the total amount you paid for your tour, except for death or 
            personal injury caused by our proven negligence, or fraud.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-semibold mb-2">We are NOT LIABLE for:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Actions or omissions of third-party service providers</li>
              <li>Force Majeure events beyond our control</li>
              <li>Wildlife behavior and sightings (not guaranteed)</li>
              <li>Travel disruptions (flight delays, cancellations)</li>
              <li>Loss or damage to personal belongings</li>
              <li>Injuries due to your own actions or negligence</li>
            </ul>
          </div>
        </section>

        {/* Contact and Acceptance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">23. Acceptance Confirmation</h2>
          <div className="bg-accent/20 border-l-4 border-primary p-6">
            <p className="mb-4">By making a booking with Virunga Expedition Tours, you confirm that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You have read and understood these Terms and Conditions</li>
              <li>You agree to be bound by these Terms</li>
              <li>You have authority to bind all travelers in your booking</li>
              <li>All information provided is accurate and complete</li>
              <li>You accept the limitations of liability outlined herein</li>
            </ul>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">24. Contact Information</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="font-bold text-lg mb-4">Virunga Expedition Tours</p>
            <p className="mb-2"><strong>Location:</strong> Kigali, Rwanda</p>
            <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@virungaexpeditiontours.com" className="text-primary">info@virungaexpeditiontours.com</a></p>
            <p className="mb-2"><strong>Phone:</strong> <a href="tel:+250783959404" className="text-primary">+250 783 959 404</a> / <a href="tel:+250783007010" className="text-primary">+250 783 007 010</a></p>
            <p className="mb-2"><strong>24/7 Emergency Line:</strong> <a href="tel:+250783959404" className="text-primary">+250 783 959 404</a></p>
            <p className="mb-4"><strong>WhatsApp:</strong> <a href="https://wa.me/250783959404" className="text-primary">+250 783 959 404</a> (Lorraine) / <a href="https://wa.me/250783007010" className="text-primary">+250 783 007 010</a> (Egide)</p>
            <p className="text-sm mt-4 italic">
              These Terms and Conditions are governed by the laws of the Republic of Rwanda and comply with Rwanda Development Board tourism regulations.
            </p>
          </div>
        </section>

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
