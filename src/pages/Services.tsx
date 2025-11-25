import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, FileText, MapPin, Calendar, Shield, Plane, Hotel, Camera, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Gorilla Permit Booking",
      description: "We secure your coveted gorilla trekking permits in Rwanda, Uganda, and DRC. Permits sell out months in advance - we ensure you don't miss out."
    },
    {
      icon: FileText,
      title: "Custom Itinerary Design",
      description: "Every traveler is unique. We craft personalized itineraries matching your interests, budget, fitness level, and travel style."
    },
    {
      icon: MapPin,
      title: "Expert Local Guides",
      description: "All our guides are licensed, experienced, and passionate about Rwanda's wildlife and culture. They bring destinations to life with stories and insights."
    },
    {
      icon: Calendar,
      title: "Multi-Country Safaris",
      description: "Combine Rwanda with Uganda and Eastern DRC for comprehensive gorilla and primate experiences across the Virunga region."
    },
    {
      icon: Shield,
      title: "Safety & Logistics",
      description: "We handle all permits, park bookings, transport, and accommodation. Travel confidently knowing every detail is managed."
    },
    {
      icon: Plane,
      title: "Airport Transfers",
      description: "Seamless pickups and drop-offs from Kigali International Airport. Start your adventure stress-free the moment you land."
    },
    {
      icon: Hotel,
      title: "Accommodation Booking",
      description: "From budget-friendly lodges to luxury eco-resorts, we book accommodations that match your preferences and enhance your experience."
    },
    {
      icon: Camera,
      title: "Photography Support",
      description: "Special arrangements for photographers including private vehicles, optimal positioning, and extended viewing times when possible."
    },
    {
      icon: HeartHandshake,
      title: "Group & Family Tours",
      description: "Customized experiences for families, friends, and organized groups. Special attention to diverse needs and group dynamics."
    },
    {
      icon: CheckCircle,
      title: "24/7 Support",
      description: "Throughout your journey, we're available via phone and WhatsApp for any questions, concerns, or last-minute adjustments."
    }
  ];

  const packages = [
    {
      name: "Basic Package",
      price: "Essential services for independent travelers",
      features: [
        "Gorilla permit booking",
        "Park entrance arrangements",
        "Basic transport coordination",
        "Email support"
      ]
    },
    {
      name: "Standard Package",
      price: "Most popular for complete peace of mind",
      features: [
        "Everything in Basic",
        "Full transport (private vehicle)",
        "Accommodation booking",
        "Expert guide throughout",
        "All meals included",
        "WhatsApp support"
      ],
      highlighted: true
    },
    {
      name: "Complete Package",
      price: "Comprehensive Rwanda experience",
      features: [
        "Everything in Standard",
        "Multi-activity itinerary",
        "Kigali city tour",
        "Cultural experiences",
        "Porter services",
        "Photography assistance"
      ]
    },
    {
      name: "Luxury Package",
      price: "Premium, bespoke experiences",
      features: [
        "Everything in Complete",
        "5-star accommodations",
        "Private vehicles throughout",
        "Flexible scheduling",
        "Dedicated tour manager",
        "Personalized service",
        "24/7 concierge"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl">Everything You Need for an Unforgettable Rwanda Safari</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-primary">What We Offer</h2>
            <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
              From permit bookings to full safari management, we handle every detail so you can focus on the experience.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="hover:border-secondary transition-all">
                    <CardHeader>
                      <Icon className="w-10 h-10 text-secondary mb-3" />
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-primary">Service Packages</h2>
            <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
              Choose the level of service that matches your travel style and budget.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, index) => (
                <Card key={index} className={pkg.highlighted ? "border-secondary shadow-lg" : ""}>
                  {pkg.highlighted && (
                    <div className="bg-secondary text-white text-center py-2 font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className={pkg.highlighted ? "text-secondary" : ""}>{pkg.name}</CardTitle>
                    <CardDescription>{pkg.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Terms */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Booking Terms & Conditions</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deposits & Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground/80">
                  <p>• 30% deposit required to secure bookings and permits</p>
                  <p>• Balance due 60 days before travel</p>
                  <p>• Gorilla permits are non-refundable once purchased</p>
                  <p>• Payment by bank transfer, credit card, or PayPal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cancellation Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground/80">
                  <p>• More than 90 days: Full refund minus gorilla permit cost</p>
                  <p>• 60-90 days: 50% refund</p>
                  <p>• 30-60 days: 25% refund</p>
                  <p>• Less than 30 days: No refund</p>
                  <p>• Travel insurance strongly recommended</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What's Included vs. Excluded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-secondary">Typically Included:</h4>
                      <ul className="space-y-2 text-foreground/80">
                        <li>• Park permits and entrance fees</li>
                        <li>• Transport in private vehicle</li>
                        <li>• Accommodation</li>
                        <li>• Meals (as per itinerary)</li>
                        <li>• Professional guide</li>
                        <li>• Bottled water on drives</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Typically Excluded:</h4>
                      <ul className="space-y-2 text-foreground/80">
                        <li>• International flights</li>
                        <li>• Rwanda visa ($50)</li>
                        <li>• Travel insurance</li>
                        <li>• Personal expenses</li>
                        <li>• Alcoholic beverages</li>
                        <li>• Tips for guides/porters</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Book Directly With Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Shield className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Licensed & Certified</h3>
                <p className="text-white/90">
                  Official Rwanda Development Board license and RTTA membership
                </p>
              </div>
              <div>
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                <p className="text-white/90">
                  Based in Kigali with deep knowledge of Rwanda's parks and wildlife
                </p>
              </div>
              <div>
                <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Best Value</h3>
                <p className="text-white/90">
                  No middleman fees. Direct bookings mean better prices and service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Rwanda Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your dream safari. We'll create a customized itinerary with transparent pricing.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer">
                WhatsApp: +250 783 959 404
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;