import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickIsSubmitting, setQuickIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [quickPrivacyAccepted, setQuickPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate policy acceptance
    if (!privacyAccepted || !termsAccepted) {
      toast({
        title: "Policy Acceptance Required",
        description: "Please accept the Privacy Policy and Terms & Conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const tourInterests: string[] = [];
    
    formData.forEach((value, key) => {
      if (key.startsWith("interest-") && value === "on") {
        tourInterests.push(key.replace("interest-", ""));
      }
    });

    const quoteData = {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country_residence: formData.get("country") as string,
      nationality: formData.get("nationality") as string,
      preferred_travel_dates: formData.get("travelDates") as string,
      flexible_dates: formData.get("flexible") === "on",
      number_adults: parseInt(formData.get("adults") as string) || 1,
      number_children: parseInt(formData.get("children") as string) || 0,
      children_ages: formData.get("childAges") as string,
      tour_interests: tourInterests,
      trip_duration: formData.get("duration") as string,
      budget_range: formData.get("budget") as string,
      accommodation_preference: formData.get("accommodation") as string,
      special_requests: formData.get("specialRequests") as string,
      how_heard_about_us: formData.get("heardFrom") as string,
    };

    try {
      const { error: dbError } = await supabase
        .from("quote_requests")
        .insert([quoteData]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-quote-notification",
        { body: quoteData }
      );

      if (emailError) console.error("Email notification error:", emailError);

      setSubmitted(true);
      toast({
        title: "Thank you for your inquiry!",
        description: "We'll respond within 24 hours with your custom quote.",
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate policy acceptance
    if (!quickPrivacyAccepted) {
      toast({
        title: "Privacy Policy Acceptance Required",
        description: "Please accept the Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setQuickIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const inquiryData = {
      name: formData.get("qName") as string,
      email: formData.get("qEmail") as string,
      message: formData.get("qMessage") as string,
    };

    try {
      const { error: dbError } = await supabase
        .from("quick_inquiries")
        .insert([inquiryData]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-inquiry-notification",
        { body: inquiryData }
      );

      if (emailError) console.error("Email notification error:", emailError);

      e.currentTarget.reset();
      toast({
        title: "Message sent!",
        description: "We'll get back to you shortly.",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setQuickIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Virunga Expedition Tours</h1>
          <p className="text-xl">Let's Start Planning Your Rwanda Adventure</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Best Ways to Reach Us</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-secondary/30 hover:border-secondary transition-all">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">WhatsApp (Fastest)</h3>
                  <p className="text-foreground/80 mb-4">Click to chat instantly</p>
                  <div className="space-y-2 text-sm">
                    <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-secondary transition-colors block">+250 783 959 404 (Lorraine)</a>
                    <a href="https://wa.me/250783007010" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-secondary transition-colors block">+250 783 007 010 (Egide)</a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/30 hover:border-secondary transition-all">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Email</h3>
                  <p className="text-foreground/80 mb-4">For detailed inquiries</p>
                  <div className="space-y-2 text-sm">
                    <a href="mailto:info@virungaexpeditiontours.com" className="font-medium hover:text-secondary transition-colors block">info@virungaexpeditiontours.com</a>
                    <a href="mailto:egide@virungaexpeditiontours.com" className="font-medium hover:text-secondary transition-colors block">egide@virungaexpeditiontours.com</a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/30 hover:border-secondary transition-all">
                <CardContent className="p-6 text-center">
                  <Phone className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Phone</h3>
                  <p className="text-foreground/80 mb-4">Speak with our experts</p>
                  <div className="space-y-2 text-sm">
                    <a href="tel:+250783959404" className="font-medium hover:text-secondary transition-colors block">+250 783 959 404</a>
                    <a href="tel:+250783007010" className="font-medium hover:text-secondary transition-colors block">+250 783 007 010</a>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
                  <p className="text-foreground/80">Monday-Saturday: 8:00 AM - 6:00 PM CAT</p>
                  <p className="text-foreground/80">Sunday: Closed</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-foreground/80">Kigali, Rwanda</p>
                  <p className="text-sm text-foreground/60">(Exact address provided upon booking)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Quote Request Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!submitted ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl text-primary">Request Your Custom Quote</CardTitle>
                  <CardDescription className="text-lg">
                    Tell us about your travel plans and we'll create a personalized itinerary with detailed pricing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary">Your Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input id="fullName" name="fullName" required placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number (with country code) *</Label>
                          <Input id="phone" name="phone" type="tel" required placeholder="+1 234 567 8900" />
                        </div>
                        <div>
                          <Label htmlFor="country">Country of Residence *</Label>
                          <Select name="country" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="Germany">Germany</SelectItem>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Netherlands">Netherlands</SelectItem>
                              <SelectItem value="Belgium">Belgium</SelectItem>
                              <SelectItem value="South Africa">South Africa</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="nationality">Nationality * (Important for permit pricing)</Label>
                        <Select name="nationality" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Netherlands">Netherlands</SelectItem>
                            <SelectItem value="Belgium">Belgium</SelectItem>
                            <SelectItem value="South Africa">South Africa</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary">Your Trip</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="travelDates">Preferred Travel Dates *</Label>
                          <Input id="travelDates" name="travelDates" type="date" required />
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                          <Checkbox id="flexible" name="flexible" />
                          <Label htmlFor="flexible">Flexible with dates?</Label>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="adults">Adults (15+) *</Label>
                          <Input id="adults" name="adults" type="number" min="1" defaultValue="2" required />
                        </div>
                        <div>
                          <Label htmlFor="children">Children (under 15)</Label>
                          <Input id="children" name="children" type="number" min="0" defaultValue="0" />
                        </div>
                        <div>
                          <Label htmlFor="childAges">Ages of children</Label>
                          <Input id="childAges" name="childAges" placeholder="e.g., 8, 12" />
                        </div>
                      </div>
                    </div>

                    {/* Tour Interests */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-secondary">Tour Interests (Select all that apply)</h3>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Mountain Gorilla Trekking",
                          "Golden Monkey Tracking",
                          "Chimpanzee Trekking",
                          "Colobus Monkey Tracking",
                          "Canopy Walkway",
                          "Dian Fossey Tomb Hike",
                          "Akagera Safari (Big Five)",
                          "Kigali City Tour",
                          "Lake Kivu",
                          "Cultural Experiences",
                          "Volcano Hiking",
                          "Bird Watching"
                        ].map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox id={`interest-${interest}`} name={`interest-${interest}`} />
                            <Label htmlFor={`interest-${interest}`} className="font-normal">{interest}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trip Duration */}
                    <div>
                      <Label htmlFor="duration">Trip Duration</Label>
                      <Input id="duration" name="duration" required placeholder="e.g., 5-6 days" />
                    </div>

                    {/* Budget */}
                    <div>
                      <Label htmlFor="budget">Budget Range per Person (USD)</Label>
                      <Input id="budget" name="budget" required placeholder="e.g., $3,000 - $5,000" />
                    </div>

                    {/* Accommodation */}
                    <div>
                      <Label htmlFor="accommodation">Accommodation Preference</Label>
                      <Select name="accommodation" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select accommodation preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Budget">Budget</SelectItem>
                          <SelectItem value="Mid-Range">Mid-Range</SelectItem>
                          <SelectItem value="Luxury">Luxury</SelectItem>
                          <SelectItem value="Ultra-Luxury">Ultra-Luxury</SelectItem>
                          <SelectItem value="Mixed">Mixed (Combination)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <Label htmlFor="specialRequests">Special Requests/Questions</Label>
                      <Textarea 
                        id="specialRequests"
                        name="specialRequests"
                        rows={5}
                        placeholder="Tell us anything else we should know: dietary requirements, fitness levels, special occasions, specific interests, accessibility needs, etc."
                      />
                    </div>

                    {/* How did you hear */}
                    <div>
                      <Label htmlFor="heardFrom">How did you hear about us?</Label>
                      <Select name="heardFrom">
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Google Search">Google Search</SelectItem>
                          <SelectItem value="TripAdvisor">TripAdvisor</SelectItem>
                          <SelectItem value="Social Media">Social Media (Facebook, Instagram, etc.)</SelectItem>
                          <SelectItem value="Friend Referral">Friend or Family Referral</SelectItem>
                          <SelectItem value="Travel Agent">Travel Agent</SelectItem>
                          <SelectItem value="Previous Client">Previous Client</SelectItem>
                          <SelectItem value="Online Ad">Online Advertisement</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Policy Acceptance */}
                    <div className="space-y-4 border-t pt-6 mt-6">
                      <h3 className="text-lg font-semibold text-secondary">Policy Acceptance</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="privacyPolicy" 
                            checked={privacyAccepted}
                            onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="privacyPolicy" className="font-normal text-sm leading-relaxed cursor-pointer">
                            I have read and agree to the{" "}
                            <Link to="/privacy-policy" className="text-primary hover:underline font-semibold" target="_blank">
                              Privacy Policy
                            </Link>
                            {" "}and understand how my personal data will be processed. *
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="termsConditions" 
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="termsConditions" className="font-normal text-sm leading-relaxed cursor-pointer">
                            I accept the{" "}
                            <Link to="/terms-and-conditions" className="text-primary hover:underline font-semibold" target="_blank">
                              Terms & Conditions
                            </Link>
                            {" "}including the cancellation policy and gorilla permit terms. *
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox id="bookingTerms" className="mt-1" />
                          <Label htmlFor="bookingTerms" className="font-normal text-sm leading-relaxed cursor-pointer">
                            I have reviewed the{" "}
                            <Link to="/booking-terms" className="text-primary hover:underline font-semibold" target="_blank">
                              Booking Terms
                            </Link>
                            {" "}and understand the payment schedule and requirements. (Optional but recommended)
                          </Label>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg text-sm">
                        <p className="font-semibold mb-2">Important Notes:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Gorilla permits are non-refundable once booked ($1,500 per person)</li>
                          <li>• Comprehensive travel insurance is mandatory</li>
                          <li>• Cancellation fees apply based on notice period</li>
                          <li>• Final payment due 60 days before departure</li>
                        </ul>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full" 
                      disabled={isSubmitting || !privacyAccepted || !termsAccepted}
                    >
                      {isSubmitting ? "Submitting..." : "Get My Custom Quote"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-secondary">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-primary">Thank You!</h3>
                  <p className="text-lg mb-6">We've received your quote request and will respond within 24 hours with your personalized itinerary and pricing.</p>
                  <div className="space-y-2 text-foreground/80">
                    <p><strong>What happens next:</strong></p>
                    <p>✓ Our team reviews your request</p>
                    <p>✓ We prepare a custom proposal</p>
                    <p>✓ You receive detailed pricing and itinerary</p>
                    <p>✓ We refine based on your feedback</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Quick Inquiry Form */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Not Ready for Full Quote? Quick Question</CardTitle>
                <CardDescription>Send us a quick message and we'll get back to you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="qName">Name *</Label>
                    <Input id="qName" name="qName" required />
                  </div>
                  <div>
                    <Label htmlFor="qEmail">Email *</Label>
                    <Input id="qEmail" name="qEmail" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="qMessage">Question *</Label>
                    <Textarea id="qMessage" name="qMessage" rows={4} required />
                  </div>
                  
                  <div className="flex items-start space-x-3 pt-4 border-t">
                    <Checkbox 
                      id="quickPrivacy" 
                      checked={quickPrivacyAccepted}
                      onCheckedChange={(checked) => setQuickPrivacyAccepted(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="quickPrivacy" className="font-normal text-sm leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link to="/privacy-policy" className="text-primary hover:underline font-semibold" target="_blank">
                        Privacy Policy
                      </Link>
                      {" "}*
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={quickIsSubmitting || !quickPrivacyAccepted}
                  >
                    {quickIsSubmitting ? "Sending..." : "Send Quick Question"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Find Us in Kigali</h2>
            <div className="bg-muted/50 h-96 rounded-lg flex items-center justify-center">
              <MapPin className="w-16 h-16 text-primary" />
              <p className="ml-4 text-lg text-foreground/70">Map showing Kigali, Rwanda</p>
            </div>
            <p className="text-center mt-4 text-foreground/80">
              Based in Kigali, we operate throughout Rwanda and the Virunga region
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;