import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Clock, Star, Binoculars, Video, Image as ImageIcon } from "lucide-react";
import akageraSafari from "@/assets/zebras-akagera.jpeg";
import akageraImg2 from "@/assets/akagera-safari.jpg";
import { BookingCalendar } from "@/components/BookingCalendar";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";

const AkageraSafari = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${akageraSafari})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Akagera National Park</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Akagera Safari</h1>
          <p className="text-2xl mb-8">Rwanda's Big Five Safari Experience</p>
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
            <h2 className="text-3xl font-bold mb-6 text-primary">Rwanda's Premier Savannah Safari</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Akagera National Park offers a completely different side of Rwanda - vast savannah plains, acacia woodlands, and shimmering lakes teeming with wildlife. This is Rwanda's Big Five destination, where you can spot lions, elephants, rhinos, buffalo, and if you're lucky, leopards.
              </p>
              <p>
                Spanning 1,122 square kilometers along Rwanda's eastern border with Tanzania, Akagera is one of Africa's greatest conservation success stories. Once decimated by poaching, the park has been spectacularly restored. Lions were reintroduced in 2015, black rhinos in 2017, and today the park thrives with abundant wildlife.
              </p>
              <p>
                Game drives reveal herds of elephants, giraffes browsing acacia trees, hippos wallowing in lakes, and countless antelope species. Boat safaris on Lake Ihema bring you close to massive crocodiles, hippos, and over 500 bird species. The park's dramatic landscapes - from wetlands to mountains - create a safari experience unlike anywhere else in Rwanda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Safari Packages</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">Day Safari</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Full-day game drive</span>
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
                    <span>Packed lunch</span>
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
                <h3 className="text-2xl font-bold mb-4 text-secondary">2-Day Safari</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Multiple game drives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Boat safari on Lake Ihema</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Lodge accommodation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>All meals included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Transport from Kigali</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">3-Day Safari</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Everything in 2-Day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Night game drive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Behind-the-scenes tour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Photography opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Premium accommodation</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Typical Safari Day</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">6:00 AM: Early Morning Game Drive</h3>
                <p className="text-foreground/80">
                  Best time for wildlife viewing. Predators are active, elephants are feeding, and the light is perfect for photography.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">9:00 AM: Breakfast at Lodge</h3>
                <p className="text-foreground/80">
                  Return to lodge for hearty breakfast with views over the park. Relax during the hot midday hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">3:00 PM: Boat Safari on Lake Ihema</h3>
                <p className="text-foreground/80">
                  Cruise the lake spotting hippos, crocodiles, elephants drinking, and hundreds of bird species.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">5:00 PM: Sunset Game Drive</h3>
                <p className="text-foreground/80">
                  Evening drive as animals become active again. Watch the sunset over the savannah with sundowners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">What You'll See</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary">The Big Five</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Lions (reintroduced 2015)</li>
                    <li>• Black rhinos (reintroduced 2017)</li>
                    <li>• Leopards (rare but present)</li>
                    <li>• Elephants (large herds)</li>
                    <li>• Buffalo (abundant)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary">Other Wildlife</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Giraffes, zebras, hippos</li>
                    <li>• Crocodiles (up to 5m long)</li>
                    <li>• 15+ antelope species</li>
                    <li>• Baboons, monkeys, warthogs</li>
                    <li>• 500+ bird species</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Information */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Essential Information</h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="bring" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What to Bring
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• Camera with zoom lens (wildlife photography)</p>
                  <p>• Binoculars</p>
                  <p>• Neutral-colored clothing (khaki, green, brown)</p>
                  <p>• Hat and sunscreen</p>
                  <p>• Insect repellent</p>
                  <p>• Light jacket for early morning drives</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="best-time" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Best Time to Visit
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p><strong>Dry Season (June-September, December-February):</strong> Best wildlife viewing, animals concentrate around water sources</p>
                  <p><strong>Rainy Season (March-May, October-November):</strong> Lush scenery, excellent birdwatching, fewer tourists</p>
                  <p>Year-round destination with unique highlights each season</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="getting-there" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Getting There
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 space-y-2">
                  <p>• 2.5-hour drive from Kigali (110km)</p>
                  <p>• Good sealed road throughout</p>
                  <p>• Can be combined with Kigali city tour</p>
                  <p>• Transport included in our packages</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <BookingCalendar tourName="Akagera Safari" />
        </div>
      </section>

      {/* Why Akagera */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Akagera Safari is Special</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Binoculars className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Big Five Safari</h3>
              <p className="text-white/90">
                Rwanda's only Big Five park. Reintroduced lions and rhinos make this a complete African safari.
              </p>
            </div>

            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Conservation Success</h3>
              <p className="text-white/90">
                Witness one of Africa's most successful park restorations. Wildlife populations are thriving.
              </p>
            </div>

            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Diverse Landscapes</h3>
              <p className="text-white/90">
                From savannah to lakes to mountains - varied ecosystems in one compact park.
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
              <h2 className="text-3xl font-bold text-primary">Safari Gallery</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Explore the breathtaking wildlife and landscapes of Akagera National Park.
            </p>
            <PhotoGallery
              images={[
                {
                  src: akageraSafari,
                  alt: "Zebras in Akagera National Park",
                  caption: "Zebras grazing on the savannah plains"
                },
                {
                  src: akageraImg2,
                  alt: "Akagera wildlife",
                  caption: "The diverse wildlife of Akagera"
                },
                {
                  src: akageraSafari,
                  alt: "Safari game drive",
                  caption: "Game drive through the park"
                },
                {
                  src: akageraImg2,
                  alt: "Akagera landscape",
                  caption: "Beautiful savannah and lake landscapes"
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
              <h2 className="text-3xl font-bold text-primary">Safari Experience</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Watch highlights from Big Five safaris in Akagera National Park.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Safari Preview</h3>
                <VideoEmbed 
                  url="https://www.youtube.com/watch?v=6n8FTIWlyXY"
                  title="Akagera Safari Preview"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Traveler Testimonial</h3>
                <VideoEmbed 
                  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  title="Akagera Safari Testimonial"
                />
                <p className="text-sm text-muted-foreground mt-3 italic">
                  "Four of the Big Five in two days - incredible!" - James & Emma L.
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
                  "We saw four of the Big Five in two days! Lions, rhinos, elephants, and buffalo. The boat safari was incredible - hippos everywhere. Perfect complement to gorilla trekking."
                </p>
                <p className="font-semibold">— James & Emma L., Australia</p>
                <p className="text-sm text-foreground/60">Akagera Safari September 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Exceeded expectations! The park is beautifully managed, wildlife is abundant, and our guide was fantastic. The sunrise game drive with elephants was magical."
                </p>
                <p className="font-semibold">— Patricia M., USA</p>
                <p className="text-sm text-foreground/60">Akagera Safari July 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Big Five Safari?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience Rwanda's incredible savannah wildlife in one of Africa's most successful conservation stories.
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

export default AkageraSafari;