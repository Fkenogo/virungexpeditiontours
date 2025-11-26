import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Camera, Leaf, Star, Video, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import chimpanzeesImg from "@/assets/chimpanzees.jpg";
import colobusNyungwe from "@/assets/colobus-monkeys-nyungwe.jpg";
import colobusRwanda from "@/assets/colobus-monkeys-rwanda.jpg";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";

const LHoests = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">L'Hoest's Monkey Tracking</h1>
          <p className="text-2xl mb-8">The Shy Mountain Monkey</p>
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
            <h2 className="text-3xl font-bold mb-6 text-primary">A Rare Primate Encounter</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                L'Hoest's monkeys are among Africa's least-known primates, making sightings a truly special experience. 
                These beautiful terrestrial monkeys are characterized by their dark brown to black fur, distinctive white 
                chest bibs, and reddish-brown back saddles. Males sport impressive white beards, creating a striking appearance.
              </p>
              <p>
                Found exclusively in the montane forests of Central Africa's Albertine Rift, Nyungwe Forest hosts one 
                of the largest populations of L'Hoest's monkeys. Unlike many primates that spend most time in trees, 
                these monkeys are semi-terrestrial, often foraging on the forest floor for fruits, leaves, flowers, and insects.
              </p>
              <p>
                L'Hoest's monkeys are notoriously shy and elusive, living in small groups of 10-17 individuals. This 
                makes encounters particularly rewarding for wildlife enthusiasts seeking rare primate experiences. Their 
                terrestrial nature and relatively calm demeanor allow for excellent ground-level observation and photography 
                when you're fortunate enough to spot them.
              </p>
              <p>
                The trek takes you through Nyungwe's pristine montane rainforest, combining the thrill of tracking 
                these rare primates with the beauty of one of Africa's oldest and most biodiverse forests. Even if 
                sightings aren't guaranteed due to their elusive nature, the forest experience itself is magical - 
                ancient trees, colorful birds, butterflies, and the possibility of encountering other primates along the way.
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
                    <span>L'Hoest's monkey tracking permit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Park entrance fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Expert primate guide</span>
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
                <h3 className="text-2xl font-bold mb-4 text-primary">Primate Combo</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>L'Hoest's monkey tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Colobus or chimpanzee tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Canopy walkway</span>
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
                <h3 className="text-xl font-semibold mb-2">Morning: Park Briefing</h3>
                <p className="text-foreground/80">
                  Meet at Nyungwe park headquarters for briefing on L'Hoest's monkeys, their behavior, and forest etiquette.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Trek: 2-5 Hours</h3>
                <p className="text-foreground/80">
                  Trek through montane forest following guides who track the monkeys. Duration varies as L'Hoest's are elusive and range widely across the forest.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Encounter</h3>
                <p className="text-foreground/80">
                  Observe L'Hoest's monkeys foraging on the forest floor and in lower branches. Watch for their distinctive white beards and chest bibs. Photography can be challenging in forest light but very rewarding.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Return & Forest Experience</h3>
                <p className="text-foreground/80">
                  Return trek offers chances to spot other primates, birds, and butterflies. The ancient forest itself is a highlight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose L'Hoest's Tracking */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Track L'Hoest's Monkeys?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Rare Sighting</h3>
              <p className="text-white/90">
                One of Africa's least-known primates. A true privilege to encounter.
              </p>
            </div>

            <div className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Pristine Forest</h3>
              <p className="text-white/90">
                Trek through one of Africa's oldest montane rainforests.
              </p>
            </div>

            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Unique Behavior</h3>
              <p className="text-white/90">
                Semi-terrestrial habits allow close ground-level observation.
              </p>
            </div>

            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Perfect Addition</h3>
              <p className="text-white/90">
                Combines well with chimp or colobus tracking in Nyungwe.
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
              Experience the beauty of L'Hoest's monkeys and their forest habitat.
            </p>
            <PhotoGallery
              images={[
                {
                  src: colobusNyungwe,
                  alt: "L'Hoest's monkey in Nyungwe Forest",
                  caption: "L'Hoest's monkeys in their natural montane forest habitat"
                },
                {
                  src: colobusRwanda,
                  alt: "L'Hoest's monkey foraging",
                  caption: "Semi-terrestrial behavior - foraging on the forest floor"
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Traveler Experiences</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Finding L'Hoest's monkeys felt like discovering a secret. Our guide was incredible at tracking them. Seeing their distinctive white beards was magical!"
                </p>
                <p className="font-semibold">— Rachel M., UK</p>
                <p className="text-sm text-foreground/60">L'Hoest's Trek August 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "A highlight of our Nyungwe visit. These shy primates are so different from the more common colobus. Worth the trek!"
                </p>
                <p className="font-semibold">— David S., Germany</p>
                <p className="text-sm text-foreground/60">Nyungwe Trek June 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Perfect for primate enthusiasts. The forest is stunning and seeing L'Hoest's monkeys was a privilege. Our guide's knowledge was exceptional."
                </p>
                <p className="font-semibold">— Emma L., Australia</p>
                <p className="text-sm text-foreground/60">L'Hoest's Trek October 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Track L'Hoest's Monkeys?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience one of Africa's rarest primate encounters in Nyungwe Forest.
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

export default LHoests;
