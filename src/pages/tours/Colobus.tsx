import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Camera, Leaf, Star } from "lucide-react";
import { Link } from "react-router-dom";
import chimpanzeesImg from "@/assets/chimpanzees.jpg";

const Colobus = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Colobus Monkey Tracking</h1>
          <p className="text-2xl mb-8">Africa's Largest Primate Groups</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link to="/contact">Request Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
            <h2 className="text-3xl font-bold mb-6 text-primary">A Unique Primate Encounter</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Nyungwe Forest is home to one of Africa's most impressive primate phenomena: Angolan colobus monkey "super troops" containing up to 400 individuals. These large, black-and-white primates with magnificent flowing tails create an unforgettable spectacle as they move through the forest canopy.
              </p>
              <p>
                Colobus monkey tracking is easier and more affordable than chimpanzee or gorilla trekking, making it perfect for families, casual hikers, or anyone wanting to experience Nyungwe's incredible biodiversity without the physical demands of more intensive treks.
              </p>
              <p>
                Watch these striking monkeys leap gracefully between trees, feed on leaves and fruits, and interact socially in large groups. The experience is peaceful, accessible, and offers excellent photography opportunities as colobus monkeys are less shy than other primates.
              </p>
              <p>
                Nyungwe hosts over 500 colobus monkeys across multiple troops, ensuring high success rates. The forest setting adds to the magic - ancient trees, orchids, butterflies, and the sounds of 300+ bird species create an immersive natural experience.
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
                    <span>Colobus tracking permit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Park entrance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Expert guide</span>
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
                <h3 className="text-2xl font-bold mb-4 text-primary">Combo Package</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Colobus tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Canopy walkway</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Waterfall hike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>All transport included</span>
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
                <h3 className="text-xl font-semibold mb-2">Morning: Briefing & Trek</h3>
                <p className="text-foreground/80">
                  Meet at park headquarters for briefing. Trek typically 1-3 hours through beautiful montane forest. Easier terrain than chimp tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Encounter</h3>
                <p className="text-foreground/80">
                  Spend time observing colobus troops in the canopy. Watch them feed, leap between trees, and interact socially. Groups can be 50-400+ individuals!
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Photography Opportunities</h3>
                <p className="text-foreground/80">
                  Excellent photo opportunities. Black-and-white coloring creates striking images against green forest backdrop. Colobus are less shy than other primates.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Return & Optional Activities</h3>
                <p className="text-foreground/80">
                  Return to headquarters. Optional afternoon activities include canopy walkway, waterfall hikes, or birdwatching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Colobus Tracking */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Track Colobus Monkeys?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Easy & Accessible</h3>
              <p className="text-white/90">
                Easier terrain, shorter treks. Perfect for families and casual hikers.
              </p>
            </div>

            <div className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Super Troops</h3>
              <p className="text-white/90">
                See Africa's largest primate groups - up to 400 individuals!
              </p>
            </div>

            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Great Photos</h3>
              <p className="text-white/90">
                Stunning black-and-white primates. Less shy than other species.
              </p>
            </div>

            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Affordable</h3>
              <p className="text-white/90">
                Lower permit cost than gorillas or chimps. Excellent value.
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
                  "Perfect activity for our family! The kids (9 and 12) had no problem with the trek. Seeing 100+ colobus monkeys together was incredible. Great photos!"
                </p>
                <p className="font-semibold">— Thompson Family, USA</p>
                <p className="text-sm text-foreground/60">Colobus Trek July 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Loved this as an addition to chimp tracking. Easier trek, beautiful monkeys, and we combined it with the canopy walk. Perfect Nyungwe day!"
                </p>
                <p className="font-semibold">— Sophie L., France</p>
                <p className="text-sm text-foreground/60">Nyungwe Trek May 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Exceeded expectations! We saw a super troop of 200+ colobus. Their flowing tails and acrobatic leaps were mesmerizing. Highly recommend."
                </p>
                <p className="font-semibold">— James K., Australia</p>
                <p className="text-sm text-foreground/60">Colobus Trek September 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Track Colobus Monkeys?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience Africa's largest primate groups in the stunning Nyungwe Forest.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Request Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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

export default Colobus;
