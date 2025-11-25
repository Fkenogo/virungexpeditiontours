import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Clock, Leaf, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import chimpanzeesImg from "@/assets/chimpanzee-family.jpg";

const Chimpanzee = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${chimpanzeesImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Nyungwe Forest National Park</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Chimpanzee Trekking</h1>
          <p className="text-2xl mb-8">Encounter Our Closest Living Relatives</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Request Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">The Chimp Experience</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Nyungwe Forest National Park, one of Africa's oldest and most biodiverse rainforests, is home to around 500 chimpanzees. Trekking to find these incredible primates in their natural habitat offers an intimate look at creatures with whom we share 98.7% of our DNA.
              </p>
              <p>
                Unlike the quiet, gentle gorillas, chimpanzees are vocal, energetic, and highly social. Listen for their distinctive "pant-hoot" calls echoing through the forest canopy, watch them swing through trees with remarkable agility, and observe complex social dynamics including grooming, playing, and even using tools.
              </p>
              <p>
                Nyungwe Forest itself is spectacular - a pristine montane rainforest with over 13 primate species, 300+ bird species, and unique flora including ancient trees and orchids. The trek takes you through this enchanting wilderness, crossing streams, climbing forested slopes, and immersing yourself in one of Africa's most important biodiversity hotspots.
              </p>
              <p>
                Chimp tracking success rates are around 90%, and when you do encounter them, the experience is electric. Watch infants play-fight, see mothers nurture babies, and witness the intelligence and emotional depth of these remarkable primates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Package Options</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">Essential Package</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Chimp tracking permit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Park entrance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Expert guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Certificate</span>
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
                <h3 className="text-2xl font-bold mb-4 text-secondary">Complete Experience</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Everything in Essential</span>
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
                    <span>Canopy walk optional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Hotel pickup/drop-off</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">Nyungwe Explorer</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Everything in Complete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>2-day Nyungwe exploration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Canopy walkway included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Colobus monkey tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Accommodation included</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">What to Expect</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">5:00 AM: Early Start</h3>
                <p className="text-foreground/80">
                  Depart Kigali early (or stay near park). Chimps are most active in early morning. 4-5 hour drive from Kigali through beautiful Rwandan countryside.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Morning: Briefing & Trek</h3>
                <p className="text-foreground/80">
                  Arrive at park headquarters for briefing. Trek begins through montane rainforest. Duration varies from 2-6 hours depending on chimp location.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Encounter: 1 Hour</h3>
                <p className="text-foreground/80">
                  Spend one hour with chimpanzee community. Watch them feed, play, groom, and interact. Listen to their vocalizations. Observe their remarkable intelligence and social behavior.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Afternoon Options</h3>
                <p className="text-foreground/80">
                  Optional canopy walkway experience, waterfall hikes, or colobus monkey tracking. Return to Kigali or stay overnight in Nyungwe.
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
                  <p>• Moderate to challenging fitness level</p>
                  <p>• Minimum age: 15 years</p>
                  <p>• Trek can be steep and muddy</p>
                  <p>• High altitude (1,600-2,950m)</p>
                  <p>• Duration: 2-6 hours depending on location</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bring" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What to Bring
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Waterproof hiking boots (essential!)</p>
                  <p>• Long pants and long-sleeved shirt</p>
                  <p>• Rain jacket (Nyungwe is very wet)</p>
                  <p>• Gardening gloves</p>
                  <p>• Camera (no flash)</p>
                  <p>• Plenty of water</p>
                  <p>• Insect repellent</p>
                  <p>• Walking stick (available at park)</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="chimps-vs-gorillas" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Chimps vs. Gorillas: What's Different?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Chimps are more active and vocal</p>
                  <p>• Often high in trees (vs. gorillas on ground)</p>
                  <p>• More challenging to photograph</p>
                  <p>• Rainforest setting (vs. mountain slopes)</p>
                  <p>• Lower permit cost ($90 vs. $1,500)</p>
                  <p>• 90% success rate (vs. 99% for gorillas)</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="best-time" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Best Time to Visit
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>Nyungwe is wet year-round - come prepared!</p>
                  <p><strong>Dry Season (June-September, December-February):</strong> Easier trekking but still expect rain</p>
                  <p><strong>Rainy Season (March-May, October-November):</strong> Very wet, lush forest, fewer tourists</p>
                  <p>Book permits at least 1 month in advance</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Why Chimp Trekking */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Track Chimpanzees?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">98.7% DNA Match</h3>
              <p className="text-white/90">
                Our closest living relatives. Observe remarkable intelligence and emotions.
              </p>
            </div>

            <div className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Ancient Rainforest</h3>
              <p className="text-white/90">
                Trek through one of Africa's oldest forests - 13 primate species.
              </p>
            </div>

            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Accessible Adventure</h3>
              <p className="text-white/90">
                Lower permit cost than gorillas, great alternative experience.
              </p>
            </div>

            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Multi-Activity Park</h3>
              <p className="text-white/90">
                Combine with canopy walk, colobus tracking, and birdwatching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Traveler Experiences</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Hearing chimpanzees call through Nyungwe's forest was magical. When we found them, they were incredibly active - swinging, playing, vocalizing. Such intelligent creatures!"
                </p>
                <p className="font-semibold">— Emma W., UK</p>
                <p className="text-sm text-foreground/60">Chimp Trek June 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Different from gorilla trekking but equally amazing. The rainforest itself is stunning, and chimps' energy is contagious. Don't skip the canopy walk!"
                </p>
                <p className="font-semibold">— Carlos M., Spain</p>
                <p className="text-sm text-foreground/60">Nyungwe Trek April 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "The trek was challenging but so worth it. Watching a mother chimp groom her baby while others played nearby was incredibly moving. Highly recommend staying overnight."
                </p>
                <p className="font-semibold">— Priya S., India</p>
                <p className="text-sm text-foreground/60">Chimp Trek August 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Track Chimpanzees?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the energy and intelligence of our closest relatives in Nyungwe's ancient rainforest.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Request Quote</Link>
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

export default Chimpanzee;
