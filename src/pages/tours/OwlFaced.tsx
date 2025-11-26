import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Camera, Leaf, Star, Moon, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import chimpanzeesImg from "@/assets/chimpanzees.jpg";
import colobusNyungwe from "@/assets/colobus-monkeys-nyungwe.jpg";
import colobusRwanda from "@/assets/colobus-monkeys-rwanda.jpg";
import { PhotoGallery } from "@/components/PhotoGallery";

const OwlFaced = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Owl-Faced Monkey Tracking</h1>
          <p className="text-2xl mb-8">The Forest's Most Distinctive Primate</p>
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
            <h2 className="text-3xl font-bold mb-6 text-primary">Meet the Hamlyn's Monkey</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                The owl-faced monkey (Hamlyn's monkey) is one of Africa's most distinctive and mysterious primates. 
                Named for their striking facial markings - a white vertical stripe down the bridge of the nose flanked 
                by dark eye rings - they resemble miniature owls, creating an unforgettable appearance.
              </p>
              <p>
                Found exclusively in the montane and bamboo forests of the Albertine Rift, these medium-sized monkeys 
                are endemic to a small region of Central Africa. Nyungwe Forest hosts one of the most accessible 
                populations, though they remain one of the least studied primates on Earth. Their rarity and elusive 
                nature make encounters exceptionally special for wildlife enthusiasts.
              </p>
              <p>
                Owl-faced monkeys live in small family groups of 5-10 individuals, inhabiting dense forest understory 
                and bamboo zones between 900-4600 meters elevation. They're primarily terrestrial, spending much time 
                on the forest floor searching for fruits, leaves, flowers, and invertebrates. Their calm, methodical 
                movements and ground-dwelling habits allow for excellent observation when you're fortunate to find them.
              </p>
              <p>
                What makes this experience truly unique is the mystery surrounding these primates. Scientists know 
                relatively little about their behavior, social structure, and ecology compared to better-known species. 
                Every sighting contributes to our understanding of these enigmatic forest dwellers. The combination of 
                their striking appearance, rarity, and the pristine beauty of Nyungwe's ancient forests creates an 
                adventure for serious primate watchers and nature photographers.
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
                    <span>Owl-faced monkey tracking permit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Park entrance fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Specialist primate guide</span>
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
                <h3 className="text-2xl font-bold mb-4 text-primary">Rare Primates Combo</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Owl-faced monkey tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>L'Hoest's monkey tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Colobus super troops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>All transport & meals included</span>
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
                <h3 className="text-xl font-semibold mb-2">Morning: Specialized Briefing</h3>
                <p className="text-foreground/80">
                  Meet at park headquarters with guides who specialize in tracking these rare monkeys. Learn about their distinctive facial markings and behavior.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Trek: 2-6 Hours</h3>
                <p className="text-foreground/80">
                  Trek through montane forest and bamboo zones where owl-faced monkeys prefer to forage. Duration varies significantly as these are extremely elusive primates with large home ranges.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Encounter</h3>
                <p className="text-foreground/80">
                  Observe owl-faced monkeys on the forest floor and in understory. Their distinctive facial markings are unmistakable. Watch for their methodical foraging behavior and calm social interactions. Photography requires patience but offers unique opportunities.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Moon className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Important Note</h3>
                <p className="text-foreground/80">
                  Owl-faced monkeys are one of Africa's most elusive primates. Sightings are not guaranteed and require patience, luck, and expert guides. The forest experience itself is spectacular regardless of outcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Owl-Faced Tracking */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Track Owl-Faced Monkeys?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Moon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Exceptionally Rare</h3>
              <p className="text-white/90">
                One of Africa's least-known primates. A true bucket-list encounter.
              </p>
            </div>

            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Striking Appearance</h3>
              <p className="text-white/90">
                Distinctive owl-like facial markings make them instantly recognizable.
              </p>
            </div>

            <div className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Ancient Forests</h3>
              <p className="text-white/90">
                Trek through pristine bamboo and montane rainforest habitats.
              </p>
            </div>

            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">For Enthusiasts</h3>
              <p className="text-white/90">
                Perfect for serious primate watchers seeking rare species.
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
              Glimpses of the mysterious owl-faced monkeys in Nyungwe Forest.
            </p>
            <PhotoGallery
              images={[
                {
                  src: colobusNyungwe,
                  alt: "Owl-faced monkey in bamboo forest",
                  caption: "Owl-faced monkeys in their preferred bamboo forest habitat"
                },
                {
                  src: colobusRwanda,
                  alt: "Owl-faced monkey showing distinctive markings",
                  caption: "The distinctive owl-like facial markings that give them their name"
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
                  "We were incredibly fortunate to see a family group! Their facial markings are even more striking in person. This was the highlight of our Nyungwe visit."
                </p>
                <p className="font-semibold">— Michael R., Netherlands</p>
                <p className="text-sm text-foreground/60">Owl-Faced Trek September 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Even though we didn't see them on our first trek, the guides were so knowledgeable and the forest was beautiful. A second attempt was successful - patience rewarded!"
                </p>
                <p className="font-semibold">— Linda P., USA</p>
                <p className="text-sm text-foreground/60">Nyungwe Trek July 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "For serious primate enthusiasts only. Seeing these incredibly rare monkeys was a privilege. Our guide's expertise made all the difference."
                </p>
                <p className="font-semibold">— Thomas B., Switzerland</p>
                <p className="text-sm text-foreground/60">Owl-Faced Trek November 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Track Owl-Faced Monkeys?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Embark on a quest to find one of Africa's most mysterious and distinctive primates.
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

export default OwlFaced;
