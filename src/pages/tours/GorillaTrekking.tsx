import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Clock, TrendingUp, Heart, Users, Shield, Leaf, Star } from "lucide-react";
import heroGorilla from "@/assets/hero-gorilla.jpg";

const GorillaTrekking = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroGorilla})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Volcanoes National Park</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Mountain Gorilla Trekking</h1>
          <p className="text-2xl mb-8">Experience the World's Most Profound Wildlife Encounter</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="secondary">
              <a href="/contact">Request Quote</a>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">The Ultimate Wildlife Encounter</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Standing meters away from a 200kg silverback gorilla in the misty forests of Rwanda's Virunga Mountains is a privilege few people experience - and fewer still forget. Mountain gorilla trekking in Volcanoes National Park ranks among the world's most extraordinary wildlife encounters, offering an intimate connection with our closest living relatives in their natural habitat.
              </p>
              <p>
                With fewer than 1,100 mountain gorillas remaining in the wild, and half of them living in Rwanda's Volcanoes National Park, this is not just a safari - it's a once-in-a-lifetime journey into one of conservation's greatest success stories.
              </p>
              <p>
                Led by expert trackers and guides, you'll trek through bamboo forests, cross mountain streams, and climb volcanic slopes until you reach a habituated gorilla family. Then, for one precious hour, you'll observe these magnificent creatures as they feed, play, groom, and interact - completely relaxed in your presence.
              </p>
              <p>
                The encounter is profound: watching a baby gorilla tumble playfully, seeing a massive silverback beat his chest, or catching the intelligent gaze of a mother cradling her infant. These moments connect you not just to gorillas, but to the delicate balance of nature and the importance of protecting these irreplaceable wild places.
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
                    <span>Gorilla permit booking</span>
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
                    <span>Porter service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Hotel pickup/drop-off</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">VIP Package</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Everything in Complete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Premium accommodation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Private vehicle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Photography assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Personalized service</span>
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
                <h3 className="text-xl font-semibold mb-2">6:00 - 7:00 AM: Arrival & Briefing</h3>
                <p className="text-foreground/80">
                  Arrive at park headquarters. Rangers brief you on gorilla behavior, safety protocols, and trekking guidelines. You're assigned to a gorilla family group.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">7:30 - 8:00 AM: Trek Begins</h3>
                <p className="text-foreground/80">
                  Set off with your guide, tracker, and small group. The trek can take 30 minutes to 6 hours depending on gorilla location. Navigate bamboo forests, volcanic terrain, and mountain slopes.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Encounter: 1 Hour</h3>
                <p className="text-foreground/80">
                  When you find the gorilla family, you'll spend one precious hour observing them. Watch them feed, play, groom, and interact. Maintain a 7-meter distance, but the gorillas often approach closer on their own terms.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Return Trek</h3>
                <p className="text-foreground/80">
                  Descend back to park headquarters. Receive your gorilla trekking certificate. Return to your lodge or continue with other activities.
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
                  <p>• Moderate to challenging fitness level required</p>
                  <p>• Minimum age: 15 years</p>
                  <p>• Trek can involve steep climbs at high altitude</p>
                  <p>• Duration: 1-6 hours depending on gorilla location</p>
                  <p>• Porters available to carry bags and assist if needed</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bring" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What to Bring
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Sturdy hiking boots (waterproof recommended)</p>
                  <p>• Long pants and long-sleeved shirt (protection from vegetation)</p>
                  <p>• Rain jacket (weather changes quickly)</p>
                  <p>• Gardening gloves (for gripping vegetation)</p>
                  <p>• Hat and sunscreen</p>
                  <p>• Camera (no flash photography)</p>
                  <p>• Water and snacks</p>
                  <p>• Daypack (porter can carry if needed)</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="health" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Health & Safety
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Not permitted if you have cold, flu, or any illness (gorillas vulnerable to human diseases)</p>
                  <p>• Maintain 7-meter distance from gorillas</p>
                  <p>• No eating, drinking, or smoking near gorillas</p>
                  <p>• Turn away if you need to cough or sneeze</p>
                  <p>• Follow guide's instructions at all times</p>
                  <p>• Armed rangers accompany for safety</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="best-time" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Best Time to Visit
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p><strong>Year-round destination!</strong></p>
                  <p><strong>Dry Season (June-September, December-February):</strong> Easier trekking conditions, clearer views, peak season</p>
                  <p><strong>Rainy Season (March-May, October-November):</strong> Lush scenery, gorillas at lower elevations, fewer tourists, lower rates</p>
                  <p>Book permits 2-3 months in advance for peak season</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Why This Experience */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Gorilla Trekking is Extraordinary</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Once-in-a-Lifetime</h3>
              <p className="text-white/90">
                Fewer than 1,100 mountain gorillas exist. This encounter is truly rare and unforgettable.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">98% DNA Match</h3>
              <p className="text-white/90">
                We share nearly identical genetics. The connection you feel is profound and real.
              </p>
            </div>

            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Conservation Success</h3>
              <p className="text-white/90">
                Your visit directly funds protection. Permits support rangers, anti-poaching, and habitat.
              </p>
            </div>

            <div className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Pristine Wilderness</h3>
              <p className="text-white/90">
                Trek through ancient forests in the stunning Virunga volcanic mountains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">What Our Travelers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "The gorilla trek was absolutely life-changing. Our guide from Virunga Expedition Tours was knowledgeable, patient, and made sure everything went smoothly. Standing meters from a silverback gorilla is something I'll never forget!"
                </p>
                <p className="font-semibold">— Jennifer M., Australia</p>
                <p className="text-sm text-foreground/60">Gorilla Trek March 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Incredible experience! The trek was challenging but so worth it. Watching a baby gorilla play while the mother kept a watchful eye was magical. Our guide's expertise made it even better."
                </p>
                <p className="font-semibold">— David & Sarah T., United Kingdom</p>
                <p className="text-sm text-foreground/60">Gorilla Trek August 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Best wildlife experience of my life! The organization was flawless, the guides were amazing, and being so close to these magnificent creatures was deeply moving. A must-do experience!"
                </p>
                <p className="font-semibold">— Marie L., Canada</p>
                <p className="text-sm text-foreground/60">Gorilla Trek June 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Meet the Mountain Gorillas?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Complete the form below to receive a personalized quote within 24 hours. Our team will help you secure permits and plan every detail.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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

export default GorillaTrekking;