import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Clock, Heart, Star } from "lucide-react";
import dianFosseyTomb from "@/assets/dian-fossey-tomb.jpg";
import { BookingCalendar } from "@/components/BookingCalendar";

const DianFosseyHike = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dianFosseyTomb})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Volcanoes National Park</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Dian Fossey Tomb Hike</h1>
          <p className="text-2xl mb-8">Honor the Legacy of Gorilla Conservation's Greatest Hero</p>
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
            <h2 className="text-3xl font-bold mb-6 text-primary">A Pilgrimage to Conservation History</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                The hike to Dian Fossey's tomb and research center is more than a trek - it's a journey into the heart of one of conservation's most inspiring stories. This moderate hike takes you through the misty bamboo forests and mountain meadows where Dian Fossey lived, worked, and ultimately gave her life protecting mountain gorillas.
              </p>
              <p>
                Starting at 3,000 meters elevation, you'll trek through the same paths Fossey walked daily, following her footsteps to the Karisoke Research Center she founded in 1967. The trail passes through stunning volcanic landscape, offering glimpses of golden monkeys and forest elephants along the way.
              </p>
              <p>
                At the site, you'll visit Fossey's grave where she rests beside Digit, her beloved silverback gorilla, and see the ruins of her original cabin. The experience is deeply moving - a reminder of one woman's extraordinary dedication that helped save a species from extinction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Hike Packages</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-secondary shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-secondary">Half-Day Hike</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Park entrance & permit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Expert guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Walking stick</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Porter service</span>
                  </li>
                </ul>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Request Quote</Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">Full Experience</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Everything in Half-Day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Transport from Kigali</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Packed lunch</span>
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
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Hike Timeline</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">7:00 AM: Start</h3>
                <p className="text-foreground/80">
                  Begin at park headquarters. Brief orientation about Dian Fossey's life and the hike route.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">2-3 Hour Ascent</h3>
                <p className="text-foreground/80">
                  Trek through bamboo forest and volcanic terrain. Moderate difficulty with stunning views of the Virunga volcanoes. Possible wildlife sightings including golden monkeys.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">At the Site: 45 Minutes</h3>
                <p className="text-foreground/80">
                  Visit Dian Fossey's grave, the Karisoke Research Center ruins, her original cabin site, and the gorilla graveyard where Digit and others rest.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Return Trek</h3>
                <p className="text-foreground/80">
                  Descend back to park headquarters. Total hike: 4-6 hours round trip.
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
              <AccordionItem value="physical" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Physical Requirements
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Moderate fitness level required</p>
                  <p>• 3,000m elevation start point</p>
                  <p>• 2-3 hour ascent, similar descent</p>
                  <p>• Steep sections but manageable pace</p>
                  <p>• No minimum age requirement</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bring" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What to Bring
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Waterproof hiking boots</p>
                  <p>• Warm layers (can be cold at altitude)</p>
                  <p>• Rain jacket</p>
                  <p>• Gloves for gripping vegetation</p>
                  <p>• Water and snacks</p>
                  <p>• Camera</p>
                  <p>• Walking stick (provided)</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="best-time" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Best Time to Visit
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p><strong>Dry Season (June-September, December-February):</strong> Clearer views, easier trekking</p>
                  <p><strong>Rainy Season (March-May, October-November):</strong> Lush scenery, fewer tourists</p>
                  <p>Year-round destination - prepare for rain any time</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <BookingCalendar tourName="Dian Fossey Tomb Hike" />
        </div>
      </section>

      {/* Why This Experience */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why This Hike Matters</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Conservation Legacy</h3>
              <p className="text-white/90">
                Honor Dian Fossey's 18 years of dedication that saved mountain gorillas from extinction.
              </p>
            </div>

            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Historic Site</h3>
              <p className="text-white/90">
                Visit the actual location where groundbreaking gorilla research began in 1967.
              </p>
            </div>

            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Stunning Scenery</h3>
              <p className="text-white/90">
                Trek through pristine volcanic forests with panoramic Virunga volcano views.
              </p>
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
                  "Deeply moving experience. Standing at Dian Fossey's grave and seeing where she lived was profound. The hike itself is beautiful, and our guide shared fascinating stories about her work."
                </p>
                <p className="font-semibold">— Rachel K., USA</p>
                <p className="text-sm text-foreground/60">Dian Fossey Hike May 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Perfect complement to gorilla trekking. The hike gives context to why gorilla conservation matters so much. Beautiful scenery and emotional experience."
                </p>
                <p className="font-semibold">— Thomas B., Germany</p>
                <p className="text-sm text-foreground/60">Dian Fossey Hike July 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Honor Conservation History?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Trek to Dian Fossey's final resting place and experience the stunning beauty that inspired her life's work.
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

export default DianFosseyHike;