import { Link } from "react-router-dom";
import { ArrowUp, Download, Check, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const BookingTerms = () => {
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
        {/* 1. How to Book */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">1. How to Book</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
              <h3 className="font-bold mb-3">Request a Quote</h3>
              <p className="text-sm mb-3">Contact us with:</p>
              <ul className="text-sm space-y-1">
                <li>• Desired travel dates</li>
                <li>• Number of travelers</li>
                <li>• Interests & preferences</li>
                <li>• Budget range</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
              <h3 className="font-bold mb-3">Review Proposal</h3>
              <p className="text-sm mb-3">We'll send a customized itinerary with:</p>
              <ul className="text-sm space-y-1">
                <li>• Day-by-day schedule</li>
                <li>• Accommodation details</li>
                <li>• Complete pricing</li>
                <li>• Booking terms</li>
              </ul>
              <p className="text-xs mt-3 italic">Quote valid: 7 days</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
              <h3 className="font-bold mb-3">Confirm Booking</h3>
              <p className="text-sm mb-3">To secure your safari:</p>
              <ul className="text-sm space-y-1">
                <li>• Accept quotation</li>
                <li>• Complete booking form</li>
                <li>• Pay deposit</li>
                <li>• Provide passport details</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">4</div>
              <h3 className="font-bold mb-3">Receive Confirmation</h3>
              <p className="text-sm mb-3">We'll send:</p>
              <ul className="text-sm space-y-1">
                <li>• Booking confirmation</li>
                <li>• Invoice & payment schedule</li>
                <li>• Pre-travel information</li>
                <li>• Packing list</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Payment Schedule */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2. Payment Schedule</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">Standard Bookings<br/>(60+ days out)</h3>
              <p className="text-2xl font-bold text-primary mb-2">40-60%</p>
              <p className="text-sm mb-3">Deposit within 7 days</p>
              <p className="text-xs">Includes full payment for gorilla permits</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">High Season<br/>(Jun-Sep, Dec-Feb)</h3>
              <p className="text-2xl font-bold text-primary mb-2">Up to 60%</p>
              <p className="text-sm mb-3">Book 6+ months ahead</p>
              <p className="text-xs">Higher deposit for peak season</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">Last-Minute<br/>(Within 60 days)</h3>
              <p className="text-2xl font-bold text-primary mb-2">100%</p>
              <p className="text-sm mb-3">Immediate payment</p>
              <p className="text-xs">Full amount due at booking</p>
            </div>
          </div>
          <div className="bg-accent/20 border-l-4 border-primary p-6 rounded">
            <p className="font-bold mb-2">Final Payment: 60 days before departure</p>
            <p className="text-sm">Late payment may result in booking cancellation and loss of deposit.</p>
          </div>

          <h3 className="font-bold text-xl mt-8 mb-4">Payment Methods</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border p-6 rounded-lg">
              <h4 className="font-bold mb-2">Bank Transfer (Recommended)</h4>
              <ul className="text-sm space-y-1">
                <li>✓ No additional fees</li>
                <li>✓ Full banking details in invoice</li>
                <li>• Allow 3-5 business days</li>
                <li>• Client bears all transfer charges</li>
              </ul>
            </div>
            <div className="border border-border p-6 rounded-lg">
              <h4 className="font-bold mb-2">Credit Card (Visa/Mastercard)</h4>
              <ul className="text-sm space-y-1">
                <li>• 3% processing fee applies</li>
                <li>✓ Secure payment gateway</li>
                <li>✓ Instant confirmation</li>
              </ul>
            </div>
          </div>
          <p className="text-sm mt-4 italic">
            <strong>Important:</strong> We must receive the FULL invoiced amount. Please ensure all transfer fees are covered by sender.
          </p>
        </section>

        {/* 3. What's Included */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">3. What's Included & Excluded</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-primary/30 p-6 rounded-lg bg-primary/5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Standard Inclusions
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Accommodations:</strong> As specified in itinerary</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Transport:</strong> 4x4 safari vehicle with driver-guide</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Activities:</strong> National park fees, ranger guides</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Permits:</strong> Gorilla/chimpanzee permits (when booked)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Meals:</strong> As specified (typically full board)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Beverages:</strong> Bottled water during safari</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Support:</strong> 24/7 emergency assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Transfers:</strong> Airport/hotel transfers</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-destructive/30 p-6 rounded-lg bg-destructive/5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <X className="h-5 w-5 text-destructive" />
                Standard Exclusions
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>Travel:</strong> International flights, visas, travel insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>Personal:</strong> Alcohol, soft drinks, laundry, souvenirs</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>Gratuities:</strong> Tips for guides, drivers, lodge staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>Optional Activities:</strong> Not specified in itinerary</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>Medical:</strong> Vaccinations, medical expenses</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>Other:</strong> Personal items, delay expenses</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Gorilla Permit Information */}
        <section className="mb-12 border-2 border-primary p-6 rounded-lg bg-primary/5">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">4. Gorilla Permit Information</h2>
              <p className="text-sm">Critical information about gorilla trekking permits</p>
            </div>
          </div>

          <h3 className="font-bold text-xl mb-4">4.1 Pricing (Rwanda - Volcanoes National Park)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Category</th>
                  <th className="border border-border p-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Foreign Non-Residents</td>
                  <td className="border border-border p-3 text-right font-bold">$1,500 USD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Foreign Residents (Rwanda/East Africa)</td>
                  <td className="border border-border p-3 text-right font-bold">$500 USD</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">East African Citizens</td>
                  <td className="border border-border p-3 text-right font-bold">$200 USD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Rwandan Citizens</td>
                  <td className="border border-border p-3 text-right font-bold">$200 USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold text-lg mb-3">4.2 Important Requirements</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <span><strong>Minimum Age:</strong> 15 years (strictly enforced by RDB)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <span><strong>Health:</strong> Must be free of colds, flu, or contagious illness</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <span><strong>Fitness:</strong> Moderate to high fitness level required</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <span><strong>Duration:</strong> 1 hour with gorillas (trek duration varies 2-6 hours)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <span><strong>Group Size:</strong> Maximum 8 people per gorilla family</span>
            </li>
          </ul>

          <h3 className="font-bold text-lg mb-3">4.3 Critical Information</h3>
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 space-y-2">
            <p className="flex items-start gap-2 font-bold">
              <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
              GORILLA PERMITS ARE NON-REFUNDABLE once booked and paid (RDB policy)
            </p>
            <p className="flex items-start gap-2 font-bold">
              <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
              Permits are NON-TRANSFERABLE to other dates without RDB approval and fees
            </p>
            <p className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              99% success rate in seeing gorillas, but sightings not guaranteed
            </p>
            <p className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              Book 6+ months ahead for high season (June-September)
            </p>
            <p className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              50% refund possible only if denied access by park authorities due to illness on trek day
            </p>
          </div>
        </section>

        {/* 5. Cancellation Policy */}
        <section className="mb-12 border-2 border-destructive p-6 rounded-lg bg-destructive/5">
          <h2 className="text-3xl font-bold mb-6">5. Cancellation Policy</h2>
          
          <h3 className="font-bold text-lg mb-3">5.1 How to Cancel</h3>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Submit written cancellation request via email</li>
            <li>Cancellation effective from date of our written acknowledgment</li>
            <li>Verbal cancellations not accepted</li>
          </ul>

          <h3 className="font-bold text-lg mb-4">5.2 Cancellation Fees</h3>
          <div className="overflow-x-auto mb-6">
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
                  <td className="border border-border p-3">30% of tour cost or deposit (whichever greater) + gorilla permits</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">60-89 days</td>
                  <td className="border border-border p-3">50% of tour cost + all non-refundable services</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">30-59 days</td>
                  <td className="border border-border p-3">75% of tour cost + all non-refundable services</td>
                </tr>
                <tr className="bg-destructive/20">
                  <td className="border border-border p-3 font-bold">Less than 30 days</td>
                  <td className="border border-border p-3 font-bold">100% of tour cost (NO REFUND)</td>
                </tr>
                <tr className="bg-destructive/20">
                  <td className="border border-border p-3 font-bold">No-show / After start</td>
                  <td className="border border-border p-3 font-bold">100% of tour cost (NO REFUND)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold text-lg mb-3">5.3 Non-Refundable Items</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <span><strong>Gorilla Permits:</strong> $1,500 per permit (non-refundable once booked)</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <span><strong>Chimpanzee Permits:</strong> Non-refundable once booked</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <span><strong>Accommodation Deposits:</strong> Already paid to lodges</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <span><strong>Flight Tickets:</strong> If booked through us</span>
            </li>
          </ul>
        </section>

        {/* 7. Travel Insurance */}
        <section className="mb-12 border-2 border-primary p-6 rounded-lg bg-primary/5">
          <h2 className="text-3xl font-bold mb-6">7. Travel Insurance (MANDATORY)</h2>
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-6">
            <p className="font-bold text-lg">✓ Required Coverage</p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Medical expenses & emergency evacuation</strong> (minimum $100,000)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Trip cancellation & interruption</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Personal accident & liability</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Lost or damaged baggage</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Adventure activities coverage</strong> (trekking, safaris)</span>
            </li>
          </ul>
          <div className="bg-muted p-4 rounded">
            <p className="font-bold mb-2">Highly Recommended:</p>
            <ul className="space-y-1 text-sm">
              <li>✓ "Cancel For Any Reason" coverage</li>
              <li>✓ Pre-existing medical conditions coverage</li>
            </ul>
          </div>
          <p className="mt-4 text-sm italic">
            <strong>Best Time to Purchase:</strong> Immediately after booking confirmation for maximum protection.
          </p>
        </section>

        {/* 10. Age Restrictions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">10. Age Restrictions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Activity</th>
                  <th className="border border-border p-3 text-left">Minimum Age</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Gorilla Trekking</td>
                  <td className="border border-border p-3 font-bold">15 years</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Golden Monkey Tracking</td>
                  <td className="border border-border p-3">12 years</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Chimpanzee Tracking</td>
                  <td className="border border-border p-3">12 years</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Volcano Hiking</td>
                  <td className="border border-border p-3">15 years (varies)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">General Safari</td>
                  <td className="border border-border p-3">No minimum</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-4 italic">Proof of age required (passport)</p>
        </section>

        {/* 13. Tipping Guidelines */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">13. Tipping Guidelines</h2>
          <p className="mb-4">Tipping is optional but appreciated. Suggested amounts:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Service</th>
                  <th className="border border-border p-3 text-left">Suggested Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Private Guide</td>
                  <td className="border border-border p-3">$10-20 USD per day</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Safari Driver</td>
                  <td className="border border-border p-3">$10-15 USD per day</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Gorilla Porter</td>
                  <td className="border border-border p-3">$20 USD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3">Ranger Guide</td>
                  <td className="border border-border p-3">$10 USD</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Lodge Staff</td>
                  <td className="border border-border p-3">$5-10 USD per day (at your discretion)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">14. Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">Before & During Booking</h3>
              <p className="text-sm mb-2"><strong>Email:</strong> <a href="mailto:info@virungaexpeditiontours.com" className="text-primary">info@virungaexpeditiontours.com</a></p>
              <p className="text-sm mb-2"><strong>Phone:</strong> <a href="tel:+250783959404" className="text-primary">+250 783 959 404</a> / <a href="tel:+250783007010" className="text-primary">+250 783 007 010</a></p>
              <p className="text-xs mt-3 italic">Office Hours: Mon-Fri, 8:00 AM - 6:00 PM (Rwanda Time)</p>
            </div>
            <div className="bg-primary text-primary-foreground p-6 rounded-lg">
              <h3 className="font-bold mb-3">During Your Trip</h3>
              <p className="text-sm mb-2"><strong>24/7 Emergency Line:</strong> <a href="tel:+250783959404" className="text-primary-foreground underline">+250 783 959 404</a></p>
              <p className="text-sm mb-2"><strong>WhatsApp:</strong> <a href="https://wa.me/250783959404" className="text-primary-foreground underline">+250 783 959 404</a> (Lorraine)</p>
              <p className="text-sm"><strong>WhatsApp:</strong> <a href="https://wa.me/250783007010" className="text-primary-foreground underline">+250 783 007 010</a> (Egide)</p>
            </div>
          </div>
          <div className="mt-6 bg-muted p-6 rounded-lg">
            <h3 className="font-bold mb-2">Office Location</h3>
            <p><strong>Virunga Expedition Tours</strong></p>
            <p>Kigali, Rwanda</p>
            <p className="mt-2 text-sm">RDB Licensed | RTTA Member</p>
          </div>
        </section>

        {/* Acceptance */}
        <section className="mb-12 border-2 border-primary p-6 rounded-lg bg-accent/20">
          <h2 className="text-3xl font-bold mb-6">15. Acceptance of Terms</h2>
          <p className="mb-4">By proceeding with your booking, you confirm that:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>You have read and understood these Booking Terms</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>You accept our complete Terms and Conditions</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>You agree to our Privacy Policy</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>You have authority to book for all travelers in your party</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>All information provided is accurate and complete</span>
            </li>
          </ul>
          <p className="mt-6 text-sm font-bold">
            IMPORTANT: Please read our full <Link to="/terms-and-conditions" className="text-primary underline">Terms and Conditions</Link> and{" "}
            <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link>. These documents contain important information 
            about your rights, responsibilities, and our liability limitations.
          </p>
        </section>

        {/* Compliance Notice */}
        <section className="bg-muted p-6 rounded-lg">
          <h3 className="font-bold mb-2">Compliance Notice</h3>
          <p className="text-sm mb-2">
            These Booking Terms comply with Rwanda Development Board tourism regulations and are governed by the laws of the 
            Republic of Rwanda.
          </p>
          <p className="text-sm"><strong>RDB License:</strong> RDB Licensed, RTTA Member</p>
          <p className="text-sm mt-2">Contact RDB: <a href="https://www.visitrwandabookings.rdb.rw" target="_blank" rel="noopener noreferrer" className="text-primary">www.visitrwandabookings.rdb.rw</a></p>
        </section>

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
