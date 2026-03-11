import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, TrendingUp } from "lucide-react";
import heroGorilla from "@/assets/hero-gorilla.jpg";
import goldenMonkeys from "@/assets/golden-monkeys.jpg";
import chimpanzees from "@/assets/chimpanzees.jpg";
import colobusMonkeys from "@/assets/colobus-monkeys-nyungwe-super-troop.jpg";
import chimpanzeeFamily from "@/assets/chimpanzee-family.jpg";
import akageraSafari from "@/assets/akagera-safari.jpg";
import canopyWalkway from "@/assets/canopy-walkway.jpg";
import virungaMountains from "@/assets/virunga-mountains.jpg";
import kigaliCity from "@/assets/kigali-city-tours.jpg";
import { useMediaAssets } from "@/hooks/useMediaAssets";
import { useContentDoc } from "@/hooks/useContentDoc";
import { TourPageContent, DEFAULT_TOUR_PAGE_CONTENT } from "@/types/tourPageContent";

type TourPackage = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  difficulty: string;
  image_key:
    | "hero-gorilla"
    | "golden-monkeys"
    | "chimpanzees"
    | "colobus-monkeys"
    | "chimpanzee-family"
    | "akagera-safari"
    | "canopy-walkway"
    | "virunga-mountains"
    | "kigali-city";
  image_url: string | null;
  description: string;
  link: string;
  display_order: number;
  is_active: boolean;
};

const imageMap: Record<TourPackage["image_key"], string> = {
  "hero-gorilla": heroGorilla,
  "golden-monkeys": goldenMonkeys,
  chimpanzees,
  "colobus-monkeys": colobusMonkeys,
  "chimpanzee-family": chimpanzeeFamily,
  "akagera-safari": akageraSafari,
  "canopy-walkway": canopyWalkway,
  "virunga-mountains": virungaMountains,
  "kigali-city": kigaliCity,
};

const normalizeTour = (id: string, raw: Record<string, unknown>): TourPackage => ({
  id,
  title: String(raw.title || ""),
  subtitle: String(raw.subtitle || ""),
  location: String(raw.location || ""),
  duration: String(raw.duration || ""),
  difficulty: String(raw.difficulty || ""),
  image_key: (raw.image_key as TourPackage["image_key"]) || "hero-gorilla",
  image_url: raw.image_url ? String(raw.image_url) : null,
  description: String(raw.description || ""),
  link: String(raw.link || "/tours"),
  display_order: Number(raw.display_order || 0),
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
});

const Tours = () => {
  const { mediaMap } = useMediaAssets();
  const { data: pageContent } = useContentDoc<TourPageContent>("tour_page_content", "main", DEFAULT_TOUR_PAGE_CONTENT);
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const toursQuery = query(collection(db, "tour_packages"), where("is_active", "==", true));
        const snapshot = await getDocs(toursQuery);
        const data = snapshot.docs
          .map((docSnapshot) => normalizeTour(docSnapshot.id, docSnapshot.data() as Record<string, unknown>))
          .sort((a, b) => a.display_order - b.display_order);
        setTours(data);
      } catch (error) {
        console.error("Error fetching tour packages:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageContent.hero_title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {pageContent.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground/90 mb-6">
              {pageContent.introduction}
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Our Rwanda Safari Experiences</h2>
          
          {loading ? (
            <div className="text-center text-muted-foreground py-16">Loading tours...</div>
          ) : tours.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">No tour packages available yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tours.map((tour) => {
                const imageSrc = tour.image_url || mediaMap.get(tour.image_key) || imageMap[tour.image_key] || heroGorilla;
                return (
              <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={imageSrc}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{tour.title}</h3>
                    <p className="text-sm opacity-90">{tour.subtitle}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>{tour.difficulty}</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-6">
                    {tour.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Link to={tour.link} className="flex-1">
                      <Button className="w-full">Learn More</Button>
                    </Link>
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full">Request Quote</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Combo Experiences */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">{pageContent.combo_experiences_title}</h2>
            <p className="text-lg text-center text-foreground/80 mb-12">
              {pageContent.combo_experiences_description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {pageContent.combo_experiences.map((combo, index) => (
                <Card key={index} className="border-secondary/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-secondary">{combo.title}</h3>
                    <p className="text-foreground/80">{combo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/itineraries">
                <Button size="lg" className="mr-4">View Sample Itineraries</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Create Custom Package</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Comparison Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{pageContent.seasonal_guide_title}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {pageContent.seasonal_guide_description}
            </p>
            <Button asChild size="lg">
              <Link to={pageContent.seasonal_guide_link}>Compare Seasonal Experiences →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{pageContent.cta_title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {pageContent.cta_description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {pageContent.cta_buttons.map((button, index) => (
              <Button key={index} asChild size="lg" variant={button.variant as any}>
                <Link to={button.link}>{button.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
