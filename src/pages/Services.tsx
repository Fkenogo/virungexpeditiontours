import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Calendar,
  Camera,
  CheckCircle,
  FileText,
  HeartHandshake,
  Hotel,
  MapPin,
  Plane,
  Shield,
  Users,
} from "lucide-react";
import { useContentDoc } from "@/hooks/useContentDoc";
import { useSiteSettings, toWhatsAppUrl } from "@/hooks/useSiteSettings";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

type ServicePackage = {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
};

type TermBlock = {
  title: string;
  points: string[];
};

type ServicesContent = {
  hero_title: string;
  hero_subtitle: string;
  offer_heading: string;
  offer_intro: string;
  packages_heading: string;
  packages_intro: string;
  cta_title: string;
  cta_body: string;
  services: ServiceItem[];
  packages: ServicePackage[];
  booking_terms: TermBlock[];
};

const DEFAULT_CONTENT: ServicesContent = {
  hero_title: "Our Services",
  hero_subtitle: "Everything You Need for an Unforgettable Rwanda Safari",
  offer_heading: "What We Offer",
  offer_intro: "From permit bookings to full safari management, we handle every detail so you can focus on the experience.",
  packages_heading: "Service Packages",
  packages_intro: "Choose the level of service that matches your travel style and budget.",
  cta_title: "Ready to Plan Your Rwanda Adventure?",
  cta_body: "Let's discuss your dream safari. We'll create a customized itinerary with transparent pricing.",
  services: [
    {
      icon: "users",
      title: "Gorilla Permit Booking",
      description:
        "We secure your coveted gorilla trekking permits in Rwanda, Uganda, and DRC. Permits sell out months in advance.",
    },
    {
      icon: "file-text",
      title: "Custom Itinerary Design",
      description:
        "Every traveler is unique. We craft personalized itineraries matching your interests, budget, fitness level, and travel style.",
    },
    {
      icon: "map-pin",
      title: "Expert Local Guides",
      description:
        "All our guides are licensed, experienced, and passionate about Rwanda's wildlife and culture.",
    },
  ],
  packages: [
    {
      name: "Basic Package",
      price: "Essential services for independent travelers",
      features: ["Gorilla permit booking", "Park entrance arrangements", "Basic transport coordination", "Email support"],
    },
    {
      name: "Standard Package",
      price: "Most popular for complete peace of mind",
      highlighted: true,
      features: ["Everything in Basic", "Private vehicle", "Accommodation booking", "Guide support"],
    },
  ],
  booking_terms: [
    {
      title: "Deposits & Payments",
      points: [
        "30% deposit required to secure bookings and permits",
        "Balance due 60 days before travel",
        "Gorilla permits are non-refundable once purchased",
      ],
    },
  ],
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  "file-text": FileText,
  "map-pin": MapPin,
  calendar: Calendar,
  shield: Shield,
  plane: Plane,
  hotel: Hotel,
  camera: Camera,
  "heart-handshake": HeartHandshake,
  "check-circle": CheckCircle,
};

const Services = () => {
  const { data } = useContentDoc<ServicesContent>("services_content", "main", DEFAULT_CONTENT);
  const { settings } = useSiteSettings();

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.hero_title}</h1>
          <p className="text-xl">{data.hero_subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-primary">{data.offer_heading}</h2>
            <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">{data.offer_intro}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.services.map((service, index) => {
                const Icon = ICONS[service.icon] || CheckCircle;
                return (
                  <Card key={`${service.title}-${index}`} className="hover:border-secondary transition-all">
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

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-primary">{data.packages_heading}</h2>
            <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">{data.packages_intro}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.packages.map((pkg, index) => (
                <Card key={`${pkg.name}-${index}`} className={pkg.highlighted ? "border-secondary shadow-lg" : ""}>
                  {pkg.highlighted && <div className="bg-secondary text-white text-center py-2 font-semibold">MOST POPULAR</div>}
                  <CardHeader>
                    <CardTitle className={pkg.highlighted ? "text-secondary" : ""}>{pkg.name}</CardTitle>
                    <CardDescription>{pkg.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={`${pkg.name}-${idx}`} className="flex items-start gap-2">
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

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Booking Terms Summary</h2>
            <div className="space-y-6">
              {data.booking_terms.map((block, idx) => (
                <Card key={`${block.title}-${idx}`}>
                  <CardHeader>
                    <CardTitle>{block.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-foreground/80">
                    {block.points.map((point, i) => (
                      <p key={`${block.title}-${i}`}>• {point}</p>
                    ))}
                  </CardContent>
                </Card>
              ))}
              <div className="text-center">
                <Button asChild variant="outline">
                  <Link to="/booking-terms">View Full Booking Terms</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{data.cta_title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{data.cta_body}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <a href={toWhatsAppUrl(settings.whatsapp_numbers?.[0] || settings.phones?.[0] || "")} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
