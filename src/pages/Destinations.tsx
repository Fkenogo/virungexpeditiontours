import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { db } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import virungaMountains from "@/assets/virunga-mountains.jpg";
import heroGorilla from "@/assets/hero-gorilla.jpg";
import chimpanzees from "@/assets/chimpanzees.jpg";
import akageraSafari from "@/assets/akagera-safari.jpg";
import canopyWalkway from "@/assets/canopy-walkway.jpg";
import kigaliCity from "@/assets/kigali-city-tours.jpg";
import dianFosseyCenter from "@/assets/dian-fossey-center.png";
import { useMediaAssets } from "@/hooks/useMediaAssets";
import { useContentDoc } from "@/hooks/useContentDoc";

type DestinationPackage = {
  id: string;
  country: "rwanda" | "uganda" | "drc";
  title: string;
  subtitle: string;
  location: string;
  image_key: "virunga-mountains" | "gorilla" | "forest" | "safari" | "lake" | "city" | "volcano";
  image_url: string | null;
  description: string;
  highlights: string[];
  badges: string[];
  link: string;
  display_order: number;
  is_active: boolean;
};

type DestinationGuide = {
  id: string;
  country: "rwanda" | "uganda" | "drc";
  title: string;
  intro: string;
  content_markdown: string;
  key_points: string[];
  cta_label: string;
  cta_link: string;
  is_active: boolean;
  display_order: number;
};

type DestinationPageContent = {
  hero_title: string;
  hero_subtitle: string;
  featured_heading: string;
  guides_heading: string;
};

const DEFAULT_PAGE_CONTENT: DestinationPageContent = {
  hero_title: "Our Destinations",
  hero_subtitle: "Discover extraordinary landscapes and wildlife across Rwanda, Uganda, and Eastern DRC",
  featured_heading: "Featured Destination Packages",
  guides_heading: "Destination Guides",
};

const imageMap: Record<DestinationPackage["image_key"], string> = {
  "virunga-mountains": virungaMountains,
  gorilla: heroGorilla,
  forest: chimpanzees,
  safari: akageraSafari,
  lake: canopyWalkway,
  city: kigaliCity,
  volcano: dianFosseyCenter,
};

const normalizePackage = (id: string, raw: Record<string, unknown>): DestinationPackage => ({
  id,
  country: (raw.country as DestinationPackage["country"]) || "rwanda",
  title: String(raw.title || ""),
  subtitle: String(raw.subtitle || ""),
  location: String(raw.location || ""),
  image_key: (raw.image_key as DestinationPackage["image_key"]) || "virunga-mountains",
  image_url: raw.image_url ? String(raw.image_url) : null,
  description: String(raw.description || ""),
  highlights: Array.isArray(raw.highlights) ? raw.highlights.map((v) => String(v)) : [],
  badges: Array.isArray(raw.badges) ? raw.badges.map((v) => String(v)) : [],
  link: String(raw.link || "/destinations"),
  display_order: Number(raw.display_order || 0),
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
});

const normalizeGuide = (id: string, raw: Record<string, unknown>): DestinationGuide => ({
  id,
  country: (raw.country as DestinationGuide["country"]) || (id as DestinationGuide["country"]) || "rwanda",
  title: String(raw.title || ""),
  intro: String(raw.intro || ""),
  content_markdown: String(raw.content_markdown || ""),
  key_points: Array.isArray(raw.key_points) ? raw.key_points.map((v) => String(v)) : [],
  cta_label: String(raw.cta_label || "Explore Itineraries"),
  cta_link: String(raw.cta_link || "/itineraries"),
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
  display_order: Number(raw.display_order || 0),
});

const Destinations = () => {
  const { mediaMap } = useMediaAssets();
  const { data: pageContent } = useContentDoc<DestinationPageContent>("destination_content", "main", DEFAULT_PAGE_CONTENT);
  const [activeTab, setActiveTab] = useState("rwanda");
  const [destinationPackages, setDestinationPackages] = useState<DestinationPackage[]>([]);
  const [guides, setGuides] = useState<DestinationGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "").toLowerCase();
    if (hash === "rwanda" || hash === "uganda" || hash === "drc") {
      setActiveTab(hash);
    }
  }, [location.hash]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packageSnap, guidesSnap] = await Promise.all([
          getDocs(query(collection(db, "destination_packages"), where("is_active", "==", true))),
          getDocs(query(collection(db, "destination_guides"), where("is_active", "==", true))),
        ]);

        const packages = packageSnap.docs
          .map((d) => normalizePackage(d.id, d.data() as Record<string, unknown>))
          .sort((a, b) => a.display_order - b.display_order);

        const guideDocs = guidesSnap.docs
          .map((d) => normalizeGuide(d.id, d.data() as Record<string, unknown>))
          .sort((a, b) => a.display_order - b.display_order);

        setDestinationPackages(packages);
        setGuides(guideDocs);
      } catch (error) {
        console.error("Error fetching destination data:", error);
        setDestinationPackages([]);
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const guideMap = useMemo(() => {
    const map = new Map<string, DestinationGuide>();
    for (const guide of guides) map.set(guide.country, guide);
    return map;
  }, [guides]);

  const scrollToTab = (country: "rwanda" | "uganda" | "drc") => {
    setActiveTab(country);
    const el = document.getElementById(country);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${virungaMountains})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageContent.hero_title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{pageContent.hero_subtitle}</p>
        </div>
      </section>

      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="ghost" size="sm" onClick={() => scrollToTab("rwanda")}>Rwanda</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToTab("uganda")}>Uganda</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToTab("drc")}>Eastern DRC</Button>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">{pageContent.featured_heading}</h2>
            {loading ? (
              <div className="text-center text-muted-foreground py-8">Loading destination packages...</div>
            ) : destinationPackages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No destination packages available yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinationPackages
                  .filter((item) => item.country === activeTab)
                  .map((item) => {
                    const imageSrc = item.image_url || mediaMap.get(item.image_key) || imageMap[item.image_key] || virungaMountains;
                    return (
                      <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img src={imageSrc} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          {item.subtitle && <CardDescription>{item.subtitle}</CardDescription>}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </div>
                          <p className="text-sm text-foreground/80">{item.description}</p>
                          {item.badges.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.badges.slice(0, 3).map((badge, idx) => (
                                <Badge key={`${item.id}-badge-${idx}`} variant="secondary">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <Button asChild size="sm" className="w-full">
                            <Link to={item.link}>Explore</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center text-primary">{pageContent.guides_heading}</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="rwanda" id="rwanda">Rwanda</TabsTrigger>
              <TabsTrigger value="uganda" id="uganda">Uganda</TabsTrigger>
              <TabsTrigger value="drc" id="drc">Eastern DRC</TabsTrigger>
            </TabsList>

            {(["rwanda", "uganda", "drc"] as const).map((country) => {
              const guide = guideMap.get(country);
              return (
                <TabsContent value={country} key={country} className="space-y-6">
                  {guide ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">{guide.title}</CardTitle>
                        <CardDescription className="text-base">{guide.intro}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {guide.key_points.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-3">
                            {guide.key_points.map((point, idx) => (
                              <div key={`${country}-point-${idx}`} className="rounded-md bg-muted/40 p-3 text-sm">
                                • {point}
                              </div>
                            ))}
                          </div>
                        )}
                        {guide.content_markdown && (
                          <div className="prose max-w-none prose-headings:text-primary prose-strong:text-foreground">
                            <ReactMarkdown>{guide.content_markdown}</ReactMarkdown>
                          </div>
                        )}
                        <div>
                          <Button asChild>
                            <Link to={guide.cta_link || "/itineraries"}>{guide.cta_label || "Explore Itineraries"}</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center text-muted-foreground">No guide content available for this destination.</div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
