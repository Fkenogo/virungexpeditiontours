import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Clock, Camera, Users, Star, Video, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import goldenMonkeysImg from "@/assets/golden-monkeys-feeding.jpeg";
import goldenMonkeysCloseup from "@/assets/golden-monkeys-closeup.jpg";
import goldenMonkeysRwanda from "@/assets/golden-monkeys-rwanda.jpg";
import goldenMonkeysFamily from "@/assets/golden-monkeys-family.webp";
import { BookingCalendar } from "@/components/BookingCalendar";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";

const GoldenMonkey = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${goldenMonkeysImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Volcanoes National Park</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Golden Monkey Tracking</h1>
          <p className="text-2xl mb-8">Playful Primates of the Bamboo Forest</p>
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
            <h2 className="text-3xl font-bold mb-6 text-primary">A Joyful Wildlife Encounter</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Golden monkeys are among the world's most endangered primates, with only around 4,000 individuals remaining in the Virunga Mountains. These stunning creatures, with their amber-gold fur and playful personalities, offer a delightful contrast to the intensity of gorilla trekking.
              </p>
              <p>
                Found exclusively in the bamboo forests of Volcanoes National Park, golden monkeys are incredibly energetic and entertaining. Watch them leap acrobatically through bamboo stands, play-fight with each other, and feed on bamboo shoots - all while photographers capture incredible shots of their distinctive golden coats.
              </p>
              <p>
                Unlike gorilla trekking, golden monkey tracking is generally easier, with shorter hiking distances and less steep terrain. This makes it perfect for families, older travelers, or anyone looking for a more accessible primate encounter. The monkeys are habituated to human presence, allowing for close observation and excellent photography opportunities.
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
                <h3 className="text-2xl font-bold mb-4 text-primary">Basic Package</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Golden monkey permit</span>
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
                <h3 className="text-2xl font-bold mb-4 text-secondary">Complete Package</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Everything in Basic</span>
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
                    <span>Golden monkey tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Gorilla trekking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>All transport included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Accommodation</span>
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
                <h3 className="text-xl font-semibold mb-2">7:00 AM: Park Headquarters</h3>
                <p className="text-foreground/80">
                  Meet at Volcanoes National Park headquarters. Brief orientation on golden monkeys, safety, and photography tips.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">7:30 AM: Trek Begins</h3>
                <p className="text-foreground/80">
                  Start hiking into bamboo forest. Trek is generally 30 minutes to 2 hours, much shorter and easier than gorilla trekking.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Encounter: 1 Hour</h3>
                <p className="text-foreground/80">
                  Spend one hour with golden monkeys. Unlike gorillas, they're incredibly active - jumping, feeding, playing. Excellent photo opportunities.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Return</h3>
                <p className="text-foreground/80">
                  Trek back to headquarters. Receive your certificate. Total experience typically 3-4 hours.
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
                  <p>• Easy to moderate fitness level</p>
                  <p>• Minimum age: 12 years</p>
                  <p>• Much easier than gorilla trekking</p>
                  <p>• Shorter distances, less steep terrain</p>
                  <p>• Great for families and older travelers</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bring" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What to Bring
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Hiking boots or sturdy shoes</p>
                  <p>• Long pants (protection from stinging nettles)</p>
                  <p>• Rain jacket</p>
                  <p>• Camera with fast shutter speed (monkeys move quickly!)</p>
                  <p>• Binoculars (optional)</p>
                  <p>• Water and snacks</p>
                  <p>• Sun protection</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="photography" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Photography Tips
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Use fast shutter speed (monkeys are very active)</p>
                  <p>• Bring telephoto lens (70-300mm ideal)</p>
                  <p>• Flash photography permitted (unlike gorillas)</p>
                  <p>• Morning light is best</p>
                  <p>• Bamboo forests create beautiful backdrops</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="best-time" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Best Time to Visit
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>Year-round activity with excellent success rates</p>
                  <p><strong>Dry Season (June-September, December-February):</strong> Easier trekking, peak season</p>
                  <p><strong>Rainy Season (March-May, October-November):</strong> Lush bamboo forests, fewer tourists</p>
                  <p>Permits available with shorter booking notice than gorillas</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <BookingCalendar tourName="Golden Monkey Tracking" />
        </div>
      </section>

      {/* Why Choose Golden Monkeys */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Track Golden Monkeys?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Photography Paradise</h3>
              <p className="text-white/90">
                Active, playful behavior creates amazing photo opportunities. Flash permitted!
              </p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Family-Friendly</h3>
              <p className="text-white/90">
                Easier trek suitable for children 12+ and older travelers.
              </p>
            </div>

            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Endangered Species</h3>
              <p className="text-white/90">
                Only 4,000 remain. Your visit supports conservation efforts.
              </p>
            </div>

            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Half-Day Activity</h3>
              <p className="text-white/90">
                Perfect to combine with other activities on the same day.
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
              Browse stunning images from golden monkey tracking experiences in Volcanoes National Park.
            </p>
            <PhotoGallery
              images={[
                {
                  src: goldenMonkeysImg,
                  alt: "Golden monkeys feeding in bamboo forest",
                  caption: "Golden monkeys enjoying bamboo shoots in their natural habitat"
                },
                {
                  src: goldenMonkeysCloseup,
                  alt: "Golden monkey close-up portrait",
                  caption: "Striking close-up showing distinctive facial features and amber eyes"
                },
                {
                  src: goldenMonkeysRwanda,
                  alt: "Golden monkey in Rwanda",
                  caption: "Golden monkey showcasing its beautiful orange-gold coat"
                },
                {
                  src: goldenMonkeysFamily,
                  alt: "Golden monkey family group",
                  caption: "Family group displaying playful social behavior"
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
              <h2 className="text-3xl font-bold text-primary">Experience the Adventure</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Watch our golden monkey tracking experiences.
            </p>
            <div className="max-w-2xl mx-auto">
              <VideoEmbed 
                url="https://youtube.com/shorts/pDhqYRD3_co?si=IdonldUlxTBO8JfL"
                title="Golden Monkey Tracking Preview"
              />
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
                  "Golden monkey tracking was the perfect complement to our gorilla trek. So much fun watching them leap through the bamboo! Great for photos."
                </p>
                <p className="font-semibold">— Lisa K., USA</p>
                <p className="text-sm text-foreground/60">Golden Monkey Trek July 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Brought my 13-year-old daughter and she loved it! Much easier than gorilla trekking but equally memorable. The monkeys are incredibly playful."
                </p>
                <p className="font-semibold">— Mark D., Netherlands</p>
                <p className="text-sm text-foreground/60">Family Trek May 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "As a photographer, this was incredible. Fast shutter speed required but the shots are stunning. Golden fur against green bamboo is magical."
                </p>
                <p className="font-semibold">— Rachel T., South Africa</p>
                <p className="text-sm text-foreground/60">Photography Trek September 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Track Golden Monkeys?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your golden monkey encounter today and witness these playful primates in their bamboo forest home.
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

export default GoldenMonkey;
