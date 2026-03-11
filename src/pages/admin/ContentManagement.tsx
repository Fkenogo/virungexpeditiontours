import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";
import { TourPageContent, DEFAULT_TOUR_PAGE_CONTENT } from "@/types/tourPageContent";
import { SeasonalGuideContent, DEFAULT_SEASONAL_GUIDE } from "@/types/seasonalGuideContent";

type HomeContent = {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  intro_heading: string;
  intro_body_1: string;
  intro_body_2: string;
};

type AboutContent = {
  hero_title: string;
  hero_subtitle: string;
  story_intro: string;
  mission_statement: string;
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
  services: Array<{ icon: string; title: string; description: string }>;
  packages: Array<{ name: string; price: string; highlighted?: boolean; features: string[] }>;
  booking_terms: Array<{ title: string; points: string[] }>;
};

type DestinationPageContent = {
  hero_title: string;
  hero_subtitle: string;
  featured_heading: string;
  guides_heading: string;
};

type DestinationGuide = {
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

type FormConfig = {
  countries: string[];
  nationalities: string[];
  tour_interests: string[];
  accommodation_options: string[];
  heard_from_options: string[];
};

type LegalDoc = {
  title: string;
  content_markdown: string;
  is_active: boolean;
};

const DEFAULT_HOME: HomeContent = {
  hero_title: "Discover the Heart of Africa with Virunga Expedition Tours",
  hero_subtitle: "Experience unforgettable gorilla trekking, wildlife safaris, and volcano adventures across Rwanda, Uganda, and Eastern DRC",
  hero_cta_primary: "Explore Rwanda Tours",
  hero_cta_secondary: "Request Custom Quote",
  intro_heading: "Welcome to Virunga Expedition Tours",
  intro_body_1: "We are your gateway to Rwanda's most extraordinary wildlife experiences.",
  intro_body_2: "With deep local expertise and international standards, we transform safari dreams into reality.",
};

const DEFAULT_ABOUT: AboutContent = {
  hero_title: "About Virunga Expedition Tours",
  hero_subtitle: "Your Trusted Partner for Rwanda Safari Adventures",
  story_intro: "Founded with a passion for Rwanda's extraordinary natural beauty and wildlife...",
  mission_statement:
    "To provide exceptional, sustainable safari experiences that connect travelers with Rwanda's wildlife while supporting conservation and local communities.",
};

const DEFAULT_SERVICES: ServicesContent = {
  hero_title: "Our Services",
  hero_subtitle: "Everything You Need for an Unforgettable Rwanda Safari",
  offer_heading: "What We Offer",
  offer_intro: "From permit bookings to full safari management, we handle every detail so you can focus on the experience.",
  packages_heading: "Service Packages",
  packages_intro: "Choose the level of service that matches your travel style and budget.",
  cta_title: "Ready to Plan Your Rwanda Adventure?",
  cta_body: "Let's discuss your dream safari.",
  services: [],
  packages: [],
  booking_terms: [],
};

const DEFAULT_DESTINATION_PAGE: DestinationPageContent = {
  hero_title: "Our Destinations",
  hero_subtitle: "Discover extraordinary landscapes and wildlife across Rwanda, Uganda, and Eastern DRC",
  featured_heading: "Featured Destination Packages",
  guides_heading: "Destination Guides",
};

const DEFAULT_FORM: FormConfig = {
  countries: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Netherlands", "Belgium", "South Africa", "Other"],
  nationalities: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Netherlands", "Belgium", "South Africa", "Other"],
  tour_interests: [
    "Mountain Gorilla Trekking",
    "Golden Monkey Tracking",
    "Chimpanzee Trekking",
    "Colobus Monkey Tracking",
    "Canopy Walkway",
    "Dian Fossey Tomb Hike",
    "Akagera Safari (Big Five)",
    "Kigali City Tour",
  ],
  accommodation_options: ["Budget", "Mid-Range", "Luxury", "Ultra-Luxury", "Mixed (Combination)"],
  heard_from_options: ["Google Search", "TripAdvisor", "Social Media", "Friend Referral", "Travel Agent", "Previous Client", "Online Ad", "Other"],
};

const DEFAULT_GUIDE = (country: DestinationGuide["country"], order: number): DestinationGuide => ({
  country,
  title: country === "drc" ? "Eastern DRC" : country === "uganda" ? "Uganda" : "Rwanda",
  intro: "",
  content_markdown: "",
  key_points: [],
  cta_label: "Explore Itineraries",
  cta_link: "/itineraries",
  is_active: true,
  display_order: order,
});

const parseJsonField = <T,>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export default function ContentManagement() {
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME);
  const [about, setAbout] = useState<AboutContent>(DEFAULT_ABOUT);
  const [services, setServices] = useState<ServicesContent>(DEFAULT_SERVICES);
  const [destinationPage, setDestinationPage] = useState<DestinationPageContent>(DEFAULT_DESTINATION_PAGE);
  const [guideRwanda, setGuideRwanda] = useState<DestinationGuide>(DEFAULT_GUIDE("rwanda", 1));
  const [guideUganda, setGuideUganda] = useState<DestinationGuide>(DEFAULT_GUIDE("uganda", 2));
  const [guideDrc, setGuideDrc] = useState<DestinationGuide>(DEFAULT_GUIDE("drc", 3));
  const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_FORM);
  const [privacyDoc, setPrivacyDoc] = useState<LegalDoc>({ title: "Privacy Policy", content_markdown: "", is_active: false });
  const [termsDoc, setTermsDoc] = useState<LegalDoc>({ title: "Terms & Conditions", content_markdown: "", is_active: false });
  const [bookingDoc, setBookingDoc] = useState<LegalDoc>({ title: "Booking Terms", content_markdown: "", is_active: false });
  const [tourPageContent, setTourPageContent] = useState<TourPageContent>(DEFAULT_TOUR_PAGE_CONTENT);
  const [seasonalGuideContent, setSeasonalGuideContent] = useState<SeasonalGuideContent>(DEFAULT_SEASONAL_GUIDE);

  const [servicesJson, setServicesJson] = useState("[]");
  const [packagesJson, setPackagesJson] = useState("[]");
  const [bookingTermsJson, setBookingTermsJson] = useState("[]");

  useEffect(() => {
    const load = async () => {
      try {
        const [
          homeSnap,
          aboutSnap,
          servicesSnap,
          destinationPageSnap,
          rwandaSnap,
          ugandaSnap,
          drcSnap,
          formSnap,
          privacySnap,
          termsSnap,
          bookingSnap,
          seasonalSnap,
          tourPageSnap,
        ] = await Promise.all([
          getDoc(doc(db, "home_content", "main")),
          getDoc(doc(db, "about_content", "main")),
          getDoc(doc(db, "services_content", "main")),
          getDoc(doc(db, "destination_content", "main")),
          getDoc(doc(db, "destination_guides", "rwanda")),
          getDoc(doc(db, "destination_guides", "uganda")),
          getDoc(doc(db, "destination_guides", "drc")),
          getDoc(doc(db, "form_configs", "contact_quote")),
          getDoc(doc(db, "legal_documents", "privacy-policy")),
          getDoc(doc(db, "legal_documents", "terms-and-conditions")),
          getDoc(doc(db, "legal_documents", "booking-terms")),
          getDoc(doc(db, "seasonal_guide", "main")),
          getDoc(doc(db, "tour_page_content", "main")),
        ]);

        if (homeSnap.exists()) setHome({ ...DEFAULT_HOME, ...(homeSnap.data() as Partial<HomeContent>) });
        if (aboutSnap.exists()) setAbout({ ...DEFAULT_ABOUT, ...(aboutSnap.data() as Partial<AboutContent>) });

        if (servicesSnap.exists()) {
          const data = { ...DEFAULT_SERVICES, ...(servicesSnap.data() as Partial<ServicesContent>) };
          setServices(data);
          setServicesJson(JSON.stringify(data.services || [], null, 2));
          setPackagesJson(JSON.stringify(data.packages || [], null, 2));
          setBookingTermsJson(JSON.stringify(data.booking_terms || [], null, 2));
        }

        if (destinationPageSnap.exists()) {
          setDestinationPage({ ...DEFAULT_DESTINATION_PAGE, ...(destinationPageSnap.data() as Partial<DestinationPageContent>) });
        }

        if (rwandaSnap.exists()) setGuideRwanda({ ...DEFAULT_GUIDE("rwanda", 1), ...(rwandaSnap.data() as Partial<DestinationGuide>) });
        if (ugandaSnap.exists()) setGuideUganda({ ...DEFAULT_GUIDE("uganda", 2), ...(ugandaSnap.data() as Partial<DestinationGuide>) });
        if (drcSnap.exists()) setGuideDrc({ ...DEFAULT_GUIDE("drc", 3), ...(drcSnap.data() as Partial<DestinationGuide>) });

        if (formSnap.exists()) {
          const data = formSnap.data() as Partial<FormConfig>;
          setFormConfig({
            countries: Array.isArray(data.countries) ? data.countries : DEFAULT_FORM.countries,
            nationalities: Array.isArray(data.nationalities) ? data.nationalities : DEFAULT_FORM.nationalities,
            tour_interests: Array.isArray(data.tour_interests) ? data.tour_interests : DEFAULT_FORM.tour_interests,
            accommodation_options: Array.isArray(data.accommodation_options) ? data.accommodation_options : DEFAULT_FORM.accommodation_options,
            heard_from_options: Array.isArray(data.heard_from_options) ? data.heard_from_options : DEFAULT_FORM.heard_from_options,
          });
        }

        if (privacySnap.exists()) setPrivacyDoc(privacySnap.data() as LegalDoc);
        if (termsSnap.exists()) setTermsDoc(termsSnap.data() as LegalDoc);
        if (bookingSnap.exists()) setBookingDoc(bookingSnap.data() as LegalDoc);
        if (seasonalSnap.exists()) {
          const data = seasonalSnap.data() as Partial<SeasonalGuideContent>;
          setSeasonalGuideContent({
            ...DEFAULT_SEASONAL_GUIDE,
            ...data,
            id: data.id || "main",
            updated_at: data.updated_at || new Date().toISOString(),
            created_at: data.created_at || new Date().toISOString()
          });
        }

        if (tourPageSnap.exists()) {
          setTourPageContent({ ...DEFAULT_TOUR_PAGE_CONTENT, ...(tourPageSnap.data() as Partial<TourPageContent>) });
        }
      } catch (error) {
        console.error("Error loading content docs:", error);
        toast.error("Failed loading content docs");
      }
    };

    load();
  }, []);

  const saveAll = async () => {
    const parsedServices = parseJsonField(servicesJson, services.services);
    const parsedPackages = parseJsonField(packagesJson, services.packages);
    const parsedTerms = parseJsonField(bookingTermsJson, services.booking_terms);

    try {
      await Promise.all([
        setDoc(doc(db, "home_content", "main"), { ...home, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "about_content", "main"), { ...about, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(
          doc(db, "services_content", "main"),
          {
            ...services,
            services: parsedServices,
            packages: parsedPackages,
            booking_terms: parsedTerms,
            updated_at: new Date().toISOString(),
          },
          { merge: true },
        ),
        setDoc(doc(db, "destination_content", "main"), { ...destinationPage, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "destination_guides", "rwanda"), { ...guideRwanda, key_points: guideRwanda.key_points, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "destination_guides", "uganda"), { ...guideUganda, key_points: guideUganda.key_points, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "destination_guides", "drc"), { ...guideDrc, key_points: guideDrc.key_points, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(
          doc(db, "form_configs", "contact_quote"),
          {
            countries: formConfig.countries,
            nationalities: formConfig.nationalities,
            tour_interests: formConfig.tour_interests,
            accommodation_options: formConfig.accommodation_options,
            heard_from_options: formConfig.heard_from_options,
            updated_at: new Date().toISOString(),
          },
          { merge: true },
        ),
        setDoc(doc(db, "legal_documents", "privacy-policy"), { ...privacyDoc, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "legal_documents", "terms-and-conditions"), { ...termsDoc, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "legal_documents", "booking-terms"), { ...bookingDoc, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "tour_page_content", "main"), { ...tourPageContent, updated_at: new Date().toISOString() }, { merge: true }),
        setDoc(doc(db, "seasonal_guide", "main"), { ...seasonalGuideContent, updated_at: new Date().toISOString() }, { merge: true }),
      ]);
      toast.success("Content settings saved");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    }
  };

  const setList = (value: string) => value.split("\n").map((v) => v.trim()).filter(Boolean);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">Manage homepage, services, destinations, forms, and legal documents</p>
        </div>
        <Button onClick={saveAll}>
          <Save className="w-4 h-4 mr-2" />
          Save All
        </Button>
      </div>

      <Tabs defaultValue="home">
        <TabsList className="grid grid-cols-8 max-w-6xl">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <Card>
            <CardHeader><CardTitle>Homepage Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Hero Title</Label><Input value={home.hero_title} onChange={(e) => setHome((p) => ({ ...p, hero_title: e.target.value }))} /></div>
              <div><Label>Hero Subtitle</Label><Textarea rows={3} value={home.hero_subtitle} onChange={(e) => setHome((p) => ({ ...p, hero_subtitle: e.target.value }))} /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Primary CTA Text</Label><Input value={home.hero_cta_primary} onChange={(e) => setHome((p) => ({ ...p, hero_cta_primary: e.target.value }))} /></div>
                <div><Label>Secondary CTA Text</Label><Input value={home.hero_cta_secondary} onChange={(e) => setHome((p) => ({ ...p, hero_cta_secondary: e.target.value }))} /></div>
              </div>
              <div><Label>Intro Heading</Label><Input value={home.intro_heading} onChange={(e) => setHome((p) => ({ ...p, intro_heading: e.target.value }))} /></div>
              <div><Label>Intro Paragraph 1</Label><Textarea rows={3} value={home.intro_body_1} onChange={(e) => setHome((p) => ({ ...p, intro_body_1: e.target.value }))} /></div>
              <div><Label>Intro Paragraph 2</Label><Textarea rows={3} value={home.intro_body_2} onChange={(e) => setHome((p) => ({ ...p, intro_body_2: e.target.value }))} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader><CardTitle>About Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Hero Title</Label><Input value={about.hero_title} onChange={(e) => setAbout((p) => ({ ...p, hero_title: e.target.value }))} /></div>
              <div><Label>Hero Subtitle</Label><Input value={about.hero_subtitle} onChange={(e) => setAbout((p) => ({ ...p, hero_subtitle: e.target.value }))} /></div>
              <div><Label>Story Intro</Label><Textarea rows={5} value={about.story_intro} onChange={(e) => setAbout((p) => ({ ...p, story_intro: e.target.value }))} /></div>
              <div><Label>Mission Statement</Label><Textarea rows={4} value={about.mission_statement} onChange={(e) => setAbout((p) => ({ ...p, mission_statement: e.target.value }))} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader><CardTitle>Services Page Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Hero Title</Label><Input value={services.hero_title} onChange={(e) => setServices((p) => ({ ...p, hero_title: e.target.value }))} /></div>
              <div><Label>Hero Subtitle</Label><Input value={services.hero_subtitle} onChange={(e) => setServices((p) => ({ ...p, hero_subtitle: e.target.value }))} /></div>
              <div><Label>Offer Heading</Label><Input value={services.offer_heading} onChange={(e) => setServices((p) => ({ ...p, offer_heading: e.target.value }))} /></div>
              <div><Label>Offer Intro</Label><Textarea rows={3} value={services.offer_intro} onChange={(e) => setServices((p) => ({ ...p, offer_intro: e.target.value }))} /></div>
              <div><Label>Packages Heading</Label><Input value={services.packages_heading} onChange={(e) => setServices((p) => ({ ...p, packages_heading: e.target.value }))} /></div>
              <div><Label>Packages Intro</Label><Textarea rows={3} value={services.packages_intro} onChange={(e) => setServices((p) => ({ ...p, packages_intro: e.target.value }))} /></div>
              <div><Label>CTA Title</Label><Input value={services.cta_title} onChange={(e) => setServices((p) => ({ ...p, cta_title: e.target.value }))} /></div>
              <div><Label>CTA Body</Label><Textarea rows={3} value={services.cta_body} onChange={(e) => setServices((p) => ({ ...p, cta_body: e.target.value }))} /></div>

              <div>
                <Label>Services JSON (array of {`{ icon, title, description }`})</Label>
                <Textarea rows={10} value={servicesJson} onChange={(e) => setServicesJson(e.target.value)} />
              </div>
              <div>
                <Label>Packages JSON (array of {`{ name, price, features[], highlighted }`})</Label>
                <Textarea rows={10} value={packagesJson} onChange={(e) => setPackagesJson(e.target.value)} />
              </div>
              <div>
                <Label>Booking Terms JSON (array of {`{ title, points[] }`})</Label>
                <Textarea rows={10} value={bookingTermsJson} onChange={(e) => setBookingTermsJson(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours">
          <Card>
            <CardHeader><CardTitle>Tours Page Content</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Hero Title</Label><Input value={tourPageContent.hero_title} onChange={(e) => setTourPageContent((p) => ({ ...p, hero_title: e.target.value }))} /></div>
                <div><Label>Hero Subtitle</Label><Input value={tourPageContent.hero_subtitle} onChange={(e) => setTourPageContent((p) => ({ ...p, hero_subtitle: e.target.value }))} /></div>
              </div>
              <div><Label>Introduction</Label><Textarea rows={6} value={tourPageContent.introduction} onChange={(e) => setTourPageContent((p) => ({ ...p, introduction: e.target.value }))} /></div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Combo Experiences</h3>
                <div><Label>Title</Label><Input value={tourPageContent.combo_experiences_title} onChange={(e) => setTourPageContent((p) => ({ ...p, combo_experiences_title: e.target.value }))} /></div>
                <div><Label>Description</Label><Textarea rows={3} value={tourPageContent.combo_experiences_description} onChange={(e) => setTourPageContent((p) => ({ ...p, combo_experiences_description: e.target.value }))} /></div>
                
                <div className="space-y-2">
                  <Label>Combo Experiences (JSON array of {`{ title, description }`})</Label>
                  <Textarea 
                    rows={10} 
                    value={JSON.stringify(tourPageContent.combo_experiences, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setTourPageContent((p) => ({ ...p, combo_experiences: parsed }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">CTA Section</h3>
                <div><Label>Title</Label><Input value={tourPageContent.cta_title} onChange={(e) => setTourPageContent((p) => ({ ...p, cta_title: e.target.value }))} /></div>
                <div><Label>Description</Label><Textarea rows={3} value={tourPageContent.cta_description} onChange={(e) => setTourPageContent((p) => ({ ...p, cta_description: e.target.value }))} /></div>
                
                <div className="space-y-2">
                  <Label>CTA Buttons (JSON array of {`{ label, link, variant }`})</Label>
                  <Textarea 
                    rows={8} 
                    value={JSON.stringify(tourPageContent.cta_buttons, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setTourPageContent((p) => ({ ...p, cta_buttons: parsed }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Seasonal Guide</h3>
                <div><Label>Title</Label><Input value={tourPageContent.seasonal_guide_title} onChange={(e) => setTourPageContent((p) => ({ ...p, seasonal_guide_title: e.target.value }))} /></div>
                <div><Label>Description</Label><Textarea rows={3} value={tourPageContent.seasonal_guide_description} onChange={(e) => setTourPageContent((p) => ({ ...p, seasonal_guide_description: e.target.value }))} /></div>
                <div><Label>Link</Label><Input value={tourPageContent.seasonal_guide_link} onChange={(e) => setTourPageContent((p) => ({ ...p, seasonal_guide_link: e.target.value }))} /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="destinations">
          <Card>
            <CardHeader><CardTitle>Destination Guide Content</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Hero Title</Label><Input value={destinationPage.hero_title} onChange={(e) => setDestinationPage((p) => ({ ...p, hero_title: e.target.value }))} /></div>
                <div><Label>Hero Subtitle</Label><Input value={destinationPage.hero_subtitle} onChange={(e) => setDestinationPage((p) => ({ ...p, hero_subtitle: e.target.value }))} /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Featured Heading</Label><Input value={destinationPage.featured_heading} onChange={(e) => setDestinationPage((p) => ({ ...p, featured_heading: e.target.value }))} /></div>
                <div><Label>Guides Heading</Label><Input value={destinationPage.guides_heading} onChange={(e) => setDestinationPage((p) => ({ ...p, guides_heading: e.target.value }))} /></div>
              </div>

              {[guideRwanda, guideUganda, guideDrc].map((guide, idx) => {
                const setGuide = idx === 0 ? setGuideRwanda : idx === 1 ? setGuideUganda : setGuideDrc;
                return (
                  <div key={guide.country} className="border rounded-md p-4 space-y-3">
                    <h3 className="text-lg font-semibold capitalize">{guide.country} Guide</h3>
                    <div><Label>Title</Label><Input value={guide.title} onChange={(e) => setGuide((p) => ({ ...p, title: e.target.value }))} /></div>
                    <div><Label>Intro</Label><Textarea rows={3} value={guide.intro} onChange={(e) => setGuide((p) => ({ ...p, intro: e.target.value }))} /></div>
                    <div><Label>Key Points (one per line)</Label><Textarea rows={4} value={guide.key_points.join("\n")} onChange={(e) => setGuide((p) => ({ ...p, key_points: setList(e.target.value) }))} /></div>
                    <div><Label>Content Markdown</Label><Textarea rows={10} value={guide.content_markdown} onChange={(e) => setGuide((p) => ({ ...p, content_markdown: e.target.value }))} /></div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><Label>CTA Label</Label><Input value={guide.cta_label} onChange={(e) => setGuide((p) => ({ ...p, cta_label: e.target.value }))} /></div>
                      <div><Label>CTA Link</Label><Input value={guide.cta_link} onChange={(e) => setGuide((p) => ({ ...p, cta_link: e.target.value }))} /></div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal">
          <Card>
            <CardHeader><CardTitle>Seasonal Guide Content</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Title</Label><Input value={seasonalGuideContent.title} onChange={(e) => setSeasonalGuideContent((p) => ({ ...p, title: e.target.value }))} /></div>
                <div><Label>Subtitle</Label><Input value={seasonalGuideContent.subtitle} onChange={(e) => setSeasonalGuideContent((p) => ({ ...p, subtitle: e.target.value }))} /></div>
              </div>
              <div><Label>Introduction</Label><Textarea rows={6} value={seasonalGuideContent.introduction} onChange={(e) => setSeasonalGuideContent((p) => ({ ...p, introduction: e.target.value }))} /></div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Parks</h3>
                <div className="space-y-2">
                  <Label>Parks JSON (array of park objects)</Label>
                  <Textarea 
                    rows={15} 
                    value={JSON.stringify(seasonalGuideContent.parks, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setSeasonalGuideContent((p) => ({ ...p, parks: parsed }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Seasons</h3>
                <div className="space-y-2">
                  <Label>Seasons JSON (array of season objects)</Label>
                  <Textarea 
                    rows={12} 
                    value={JSON.stringify(seasonalGuideContent.seasons, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setSeasonalGuideContent((p) => ({ ...p, seasons: parsed }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Activities</h3>
                <div className="space-y-2">
                  <Label>Activities JSON (array of activity objects)</Label>
                  <Textarea 
                    rows={12} 
                    value={JSON.stringify(seasonalGuideContent.activities, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setSeasonalGuideContent((p) => ({ ...p, activities: parsed }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Travel Tips</h3>
                <div className="space-y-2">
                  <Label>Travel Tips JSON (array of tip objects)</Label>
                  <Textarea 
                    rows={10} 
                    value={JSON.stringify(seasonalGuideContent.travel_tips, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setSeasonalGuideContent((p) => ({ ...p, travel_tips: parsed }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Comparison Chart</h3>
                <div className="space-y-2">
                  <Label>Chart Title</Label>
                  <Input value={seasonalGuideContent.comparison_chart.chart_title} onChange={(e) => setSeasonalGuideContent((p) => ({ ...p, comparison_chart: { ...p.comparison_chart, chart_title: e.target.value } }))} />
                </div>
                <div className="space-y-2">
                  <Label>Chart Description</Label>
                  <Textarea rows={3} value={seasonalGuideContent.comparison_chart.chart_description} onChange={(e) => setSeasonalGuideContent((p) => ({ ...p, comparison_chart: { ...p.comparison_chart, chart_description: e.target.value } }))} />
                </div>
                <div className="space-y-2">
                  <Label>Metrics JSON (array of metric objects)</Label>
                  <Textarea 
                    rows={8} 
                    value={JSON.stringify(seasonalGuideContent.comparison_chart.metrics, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setSeasonalGuideContent((p) => ({ ...p, comparison_chart: { ...p.comparison_chart, metrics: parsed } }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data Points JSON (array of data point objects)</Label>
                  <Textarea 
                    rows={10} 
                    value={JSON.stringify(seasonalGuideContent.comparison_chart.data_points, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setSeasonalGuideContent((p) => ({ ...p, comparison_chart: { ...p.comparison_chart, data_points: parsed } }));
                        }
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms">
          <Card>
            <CardHeader><CardTitle>Contact Form Options</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Countries (one per line)</Label><Textarea rows={6} value={formConfig.countries.join("\n")} onChange={(e) => setFormConfig((p) => ({ ...p, countries: setList(e.target.value) }))} /></div>
              <div><Label>Nationalities (one per line)</Label><Textarea rows={6} value={formConfig.nationalities.join("\n")} onChange={(e) => setFormConfig((p) => ({ ...p, nationalities: setList(e.target.value) }))} /></div>
              <div><Label>Tour Interests (one per line)</Label><Textarea rows={8} value={formConfig.tour_interests.join("\n")} onChange={(e) => setFormConfig((p) => ({ ...p, tour_interests: setList(e.target.value) }))} /></div>
              <div><Label>Accommodation Options (one per line)</Label><Textarea rows={5} value={formConfig.accommodation_options.join("\n")} onChange={(e) => setFormConfig((p) => ({ ...p, accommodation_options: setList(e.target.value) }))} /></div>
              <div><Label>How Heard About Us Options (one per line)</Label><Textarea rows={5} value={formConfig.heard_from_options.join("\n")} onChange={(e) => setFormConfig((p) => ({ ...p, heard_from_options: setList(e.target.value) }))} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Legal Markdown Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Privacy Policy Markdown</Label>
                <Textarea rows={10} value={privacyDoc.content_markdown || ""} onChange={(e) => setPrivacyDoc((p) => ({ ...p, content_markdown: e.target.value, is_active: true, title: p.title || "Privacy Policy" }))} />
              </div>
              <div className="space-y-2">
                <Label>Terms & Conditions Markdown</Label>
                <Textarea rows={10} value={termsDoc.content_markdown || ""} onChange={(e) => setTermsDoc((p) => ({ ...p, content_markdown: e.target.value, is_active: true, title: p.title || "Terms & Conditions" }))} />
              </div>
              <div className="space-y-2">
                <Label>Booking Terms Markdown</Label>
                <Textarea rows={10} value={bookingDoc.content_markdown || ""} onChange={(e) => setBookingDoc((p) => ({ ...p, content_markdown: e.target.value, is_active: true, title: p.title || "Booking Terms" }))} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}