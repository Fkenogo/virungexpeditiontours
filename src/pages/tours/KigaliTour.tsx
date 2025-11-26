import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Clock, Star, Building, Video, Image as ImageIcon } from "lucide-react";
import kigaliCity from "@/assets/kigali-city.jpg";
import { BookingCalendar } from "@/components/BookingCalendar";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";

const KigaliTour = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${kigaliCity})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Kigali City</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Kigali City Tour</h1>
          <p className="text-2xl mb-8">Discover Africa's Cleanest, Most Organized Capital</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary">
              Request Quote
            </Button>
            <Button size="lg" variant="outlineLight">
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">Experience the Heart of Modern Rwanda</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Kigali defies every stereotype about African cities. Remarkably clean, safe, and organized, Rwanda's capital is a testament to the nation's extraordinary transformation. From a city devastated by the 1994 genocide to one of Africa's most progressive urban centers, Kigali's journey is as inspiring as it is fascinating.
              </p>
              <p>
                Our city tours blend history, culture, and contemporary life. Visit the sobering Kigali Genocide Memorial to understand Rwanda's past, explore vibrant local markets bursting with crafts and fresh produce, and discover innovative neighborhoods where tech startups and artisan cooperatives thrive side by side.
              </p>
              <p>
                Built across rolling hills with stunning panoramic views, Kigali offers tree-lined boulevards, excellent restaurants, contemporary art galleries, and warm hospitality. Whether you're arriving for your safari or extending your stay, a Kigali city tour provides essential context for understanding this remarkable country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Tour Options</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">Half-Day Tour</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Genocide Memorial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Local market visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>City viewpoints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Hotel pickup/drop-off</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-secondary shadow-lg scale-105 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-secondary">Full-Day Tour</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Everything in Half-Day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Presidential Palace Museum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Arts & crafts centers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Local lunch included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Neighborhood walking tour</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">Custom Experience</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Tailored itinerary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Restaurant recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Shopping assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Cultural experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Photography tours</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Tour Highlights</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4 items-start">
              <Building className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Kigali Genocide Memorial</h3>
                <p className="text-foreground/80">
                  A powerful, essential visit. Learn about the 1994 genocide, honor victims, and understand Rwanda's remarkable journey of reconciliation and rebuilding.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Building className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Kimironko Market</h3>
                <p className="text-foreground/80">
                  Bustling local market where Kigalians shop. Browse fresh produce, traditional fabrics, handmade crafts, and experience authentic daily life.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Building className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Inema Arts Center</h3>
                <p className="text-foreground/80">
                  Vibrant hub of contemporary Rwandan art. Meet artists, browse paintings and sculptures, and see creativity flourishing in modern Rwanda.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Building className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">City Viewpoints</h3>
                <p className="text-foreground/80">
                  Kigali's hilltop geography offers stunning panoramic views. Visit strategic viewpoints for photos and orientation to the city's layout.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Building className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Caplaki Craft Village</h3>
                <p className="text-foreground/80">
                  Artisan cooperative showcasing traditional Rwandan crafts. Shop for baskets, jewelry, carvings, and textiles while supporting local makers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Information */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Essential Information</h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="duration" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Tour Duration & Timing
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Half-Day: 4 hours (morning or afternoon)</p>
                  <p>• Full-Day: 7-8 hours (9 AM - 5 PM typical)</p>
                  <p>• Flexible start times available</p>
                  <p>• Can be combined with airport transfers</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bring" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What to Bring
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Comfortable walking shoes</p>
                  <p>• Camera (photography allowed most places)</p>
                  <p>• Hat and sunscreen</p>
                  <p>• Small cash for shopping/tips</p>
                  <p>• Respectful attire (covering shoulders/knees)</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="good-to-know" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Good to Know
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Plastic bags are banned in Rwanda</p>
                  <p>• Kigali is very safe - day and night</p>
                  <p>• Tipping not required but appreciated</p>
                  <p>• Most people speak English and French</p>
                  <p>• Card payment widely accepted</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <BookingCalendar tourName="Kigali City Tour" />
        </div>
      </section>

      {/* Why Kigali Tour */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Visit Kigali?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Building className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Essential Context</h3>
              <p className="text-white/90">
                Understand Rwanda's past, present, and inspiring future before heading to national parks.
              </p>
            </div>

            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Africa's Safest Capital</h3>
              <p className="text-white/90">
                Remarkably clean, organized, and safe. Experience a side of Africa that surprises many visitors.
              </p>
            </div>

            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cultural Immersion</h3>
              <p className="text-white/90">
                Markets, art centers, local restaurants - experience authentic Rwandan urban life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Photo Gallery</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Explore the vibrant city of Kigali through stunning photographs.
            </p>
            <PhotoGallery
              images={[
                {
                  src: kigaliCity,
                  alt: "Kigali cityscape",
                  caption: "The clean and modern capital of Rwanda"
                },
                {
                  src: kigaliCity,
                  alt: "Kigali landmarks",
                  caption: "Iconic Kigali landmarks and architecture"
                },
                {
                  src: kigaliCity,
                  alt: "Kigali markets",
                  caption: "Vibrant local markets and culture"
                },
                {
                  src: kigaliCity,
                  alt: "Kigali views",
                  caption: "Panoramic views of the city on 1000 hills"
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Discover Kigali</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Watch our city tour highlights and hear from travelers who explored Kigali.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">City Tour Preview</h3>
                <VideoEmbed 
                  url="https://youtube.com/shorts/oqO3__FUCfE?si=BVmsHoqyIFN9fe0V"
                  title="Kigali City Tour Preview"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Traveler Testimonial</h3>
                <VideoEmbed 
                  url="https://youtu.be/JSYmePYB53k?si=IQN30vy9gSW0T36F"
                  title="Kigali Tour Testimonial"
                />
                <p className="text-sm text-muted-foreground mt-3 italic">
                  "Kigali exceeded all expectations!" - Michael & Sarah T.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">What Our Travelers Say</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Kigali surprised us completely! So clean, modern, and organized. The Genocide Memorial was emotional but essential. Great way to understand Rwanda before the safari."
                </p>
                <p className="font-semibold">— Michael & Lisa D., Canada</p>
                <p className="text-sm text-foreground/60">Kigali City Tour June 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Our guide was fantastic - so knowledgeable about Rwanda's history and culture. The market visit was a highlight. We felt completely safe walking around the city."
                </p>
                <p className="font-semibold">— Sophie M., France</p>
                <p className="text-sm text-foreground/60">Kigali City Tour April 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Discover Kigali's Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience one of Africa's most progressive, clean, and safe capital cities. Perfect for arrival or departure day.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90">
              Request Custom Quote
            </Button>
            <Button size="lg" variant="outlineLight">
              WhatsApp: +250 783 959 404
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KigaliTour;