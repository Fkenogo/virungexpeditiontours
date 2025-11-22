import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request submitted");
    setSubmitted(true);
    toast({
      title: "Thank you for your inquiry!",
      description: "We'll respond within 24 hours with your custom quote.",
    });
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quick question submitted");
    toast({
      title: "Message sent!",
      description: "We'll get back to you shortly.",
    });
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
                    <p className="font-medium">+250 783 959 404 (Lorraine)</p>
                    <p className="font-medium">+250 783 007 010 (Egide)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/30 hover:border-secondary transition-all">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Email</h3>
                  <p className="text-foreground/80 mb-4">For detailed inquiries</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">info@virungaexpeditiontours.com</p>
                    <p className="font-medium">egide@virungaexpeditiontours.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/30 hover:border-secondary transition-all">
                <CardContent className="p-6 text-center">
                  <Phone className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Phone</h3>
                  <p className="text-foreground/80 mb-4">Speak with our experts</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">+250 783 959 404</p>
                    <p className="font-medium">+250 783 007 010</p>
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
                          <Input id="fullName" required placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" required placeholder="john@example.com" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number (with country code) *</Label>
                          <Input id="phone" type="tel" required placeholder="+1 234 567 8900" />
                        </div>
                        <div>
                          <Label htmlFor="country">Country of Residence *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="nationality">Nationality * (Important for permit pricing)</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                          <Input id="travelDates" type="date" required />
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                          <Checkbox id="flexible" />
                          <Label htmlFor="flexible">Flexible with dates?</Label>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="adults">Adults (15+) *</Label>
                          <Input id="adults" type="number" min="1" defaultValue="2" required />
                        </div>
                        <div>
                          <Label htmlFor="children">Children (under 15)</Label>
                          <Input id="children" type="number" min="0" defaultValue="0" />
                        </div>
                        <div>
                          <Label htmlFor="childAges">Ages of children</Label>
                          <Input id="childAges" placeholder="e.g., 8, 12" />
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
                            <Checkbox id={interest} />
                            <Label htmlFor={interest} className="font-normal">{interest}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trip Duration */}
                    <div>
                      <Label>Trip Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-4">3-4 days</SelectItem>
                          <SelectItem value="5-6">5-6 days</SelectItem>
                          <SelectItem value="7-9">7-9 days</SelectItem>
                          <SelectItem value="10+">10+ days</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Budget */}
                    <div>
                      <Label>Budget Range per Person (USD)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1500">Under $1,500</SelectItem>
                          <SelectItem value="1500-3000">$1,500 - $3,000</SelectItem>
                          <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                          <SelectItem value="5000-8000">$5,000 - $8,000</SelectItem>
                          <SelectItem value="over-8000">Over $8,000</SelectItem>
                          <SelectItem value="guidance">Need Guidance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Accommodation */}
                    <div>
                      <Label>Accommodation Preference</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget</SelectItem>
                          <SelectItem value="mid-range">Mid-Range</SelectItem>
                          <SelectItem value="upscale">Upscale</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="mix">Mix of levels</SelectItem>
                          <SelectItem value="recommendations">Need Recommendations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <Label htmlFor="specialRequests">Special Requests/Questions</Label>
                      <Textarea 
                        id="specialRequests" 
                        rows={5}
                        placeholder="Tell us anything else we should know: dietary requirements, fitness levels, special occasions, specific interests, accessibility needs, etc."
                      />
                    </div>

                    {/* How did you hear */}
                    <div>
                      <Label>How did you hear about us?</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google search</SelectItem>
                          <SelectItem value="tripadvisor">TripAdvisor</SelectItem>
                          <SelectItem value="social">Social media</SelectItem>
                          <SelectItem value="referral">Friend/family recommendation</SelectItem>
                          <SelectItem value="blog">Travel blog/article</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Get My Custom Quote
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
                    <Input id="qName" required />
                  </div>
                  <div>
                    <Label htmlFor="qEmail">Email *</Label>
                    <Input id="qEmail" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="qMessage">Question *</Label>
                    <Textarea id="qMessage" rows={4} required />
                  </div>
                  <Button type="submit" className="w-full">Send Quick Question</Button>
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