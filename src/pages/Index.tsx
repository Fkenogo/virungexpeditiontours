import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star, Users, Shield, Clock, Heart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroGorilla from "@/assets/hero-gorilla-family.jpg";
import goldenMonkeys from "@/assets/golden-monkeys-volcanoes-family.webp";
import akageraSafari from "@/assets/zebras-akagera.jpeg";
import chimpanzees from "@/assets/chimpanzee-family.jpg";
import canopyWalkway from "@/assets/canopy-walk-nyungwe.jpg";
import rwandaVirunga from "@/assets/rwanda-virunga-mountains.jpg";
import bwindiTrails from "@/assets/bwindi-gorilla-trails.jpg";
import virungaVolcanoes from "@/assets/virunga-volcanoes-national-park.jpeg";
import gorillaGroup from "@/assets/mountain-gorillas-group.jpg";
import goldenMonkeysVolcanoes from "@/assets/golden-monkeys-volcanoes.webp";
import akageraElephant from "@/assets/akagera-elephant.jpg";
import colobusMonkeys from "@/assets/colobus-monkeys-nyungwe.jpg";
import dianFosseyTomb from "@/assets/dian-fossey-tomb.jpg";
import kigaliCity from "@/assets/kigali-city.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroGorilla} 
            alt="Mountain gorillas in Virunga Mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Discover the Heart of Africa with<br />Virunga Expedition Tours
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Experience unforgettable gorilla trekking, wildlife safaris, and volcano adventures across Rwanda, Uganda, and Eastern DRC
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button asChild size="lg" variant="secondary">
              <Link to="/tours">Explore Rwanda Tours</Link>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span>Licensed by Rwanda Development Board</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span>Member of Rwanda Travel & Tourism Association</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span>500+ Happy Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span>Expert Local Guides</span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Carousel */}
      <section className="section-padding bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Rwanda's Wildlife & Landscapes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stunning moments captured from our tours across Rwanda's national parks
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/gorilla-trekking" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={gorillaGroup}
                      alt="Mountain gorillas in Volcanoes National Park"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Gorilla Trekking</h3>
                      <p className="text-sm text-white/90">Volcanoes National Park</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/golden-monkey" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={goldenMonkeysVolcanoes}
                      alt="Golden monkeys in bamboo forest"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Golden Monkey Tracking</h3>
                      <p className="text-sm text-white/90">Volcanoes National Park</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/akagera-safari" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={akageraElephant}
                      alt="Elephant in Akagera National Park"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Akagera Safari</h3>
                      <p className="text-sm text-white/90">Big Five Wildlife</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/chimpanzee" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={chimpanzees}
                      alt="Chimpanzees in Nyungwe Forest"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Chimpanzee Tracking</h3>
                      <p className="text-sm text-white/90">Nyungwe Forest</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/colobus" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={colobusMonkeys}
                      alt="Colobus monkeys in Nyungwe"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Colobus Monkey Tracking</h3>
                      <p className="text-sm text-white/90">Nyungwe Forest</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/dian-fossey-hike" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={dianFosseyTomb}
                      alt="Dian Fossey tomb site"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Dian Fossey Hike</h3>
                      <p className="text-sm text-white/90">Volcanoes National Park</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/kigali-city-tour" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={kigaliCity}
                      alt="Kigali city tour"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Kigali City Tour</h3>
                      <p className="text-sm text-white/90">Rwanda's Capital</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Link to="/tours/canopy-walkway" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={canopyWalkway}
                      alt="Canopy walkway in Nyungwe"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Canopy Walkway</h3>
                      <p className="text-sm text-white/90">Nyungwe Forest</p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome to Virunga Expedition Tours</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                We are your gateway to Rwanda's most extraordinary wildlife experiences. Based in Kigali and specializing in the spectacular Virunga Mountains region, we create unforgettable adventures that connect you with endangered mountain gorillas, rare primates, and Africa's most breathtaking landscapes.
              </p>
              <p>
                Whether you dream of tracking mountain gorillas in Volcanoes National Park, watching chimpanzees swing through ancient rainforests, or embarking on Big Five safaris in Akagera, we curate personalized journeys that exceed expectations.
              </p>
              <p>
                With deep local expertise, international standards, and a commitment to sustainable tourism, Virunga Expedition Tours transforms your African safari dreams into reality.
              </p>
            </div>
            <div className="flex gap-4 justify-center mt-8">
              <Button asChild variant="default" size="lg">
                <Link to="/about">Learn More About Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/tours">View Our Tours</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Rwanda Tours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <img src={heroGorilla} alt="Mountain Gorilla Family in Volcanoes National Park" className="w-full h-full object-cover" />
                <Badge className="absolute top-4 right-4 bg-secondary">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle>Mountain Gorilla Trekking</CardTitle>
                <CardDescription>The Experience of a Lifetime</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Come face-to-face with endangered mountain gorillas in their natural habitat. This once-in-a-lifetime encounter in Volcanoes National Park will leave you transformed.
                </p>
                <Button asChild className="w-full">
                  <Link to="/tours/gorilla-trekking">Explore Gorilla Trekking →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <img src={goldenMonkeys} alt="Golden Monkey Tracking" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Golden Monkey Tracking</CardTitle>
                <CardDescription>Playful Bamboo Forest Primates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Watch endangered golden monkeys leap through bamboo forests in a blur of amber fur and joyful energy. Perfect for families and photographers.
                </p>
                <Button asChild className="w-full">
                  <Link to="/tours/golden-monkey">Discover Golden Monkeys →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <img src={akageraSafari} alt="Akagera Safari" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Akagera Safari</CardTitle>
                <CardDescription>Rwanda's Big Five Experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Spot lions, elephants, rhinos, buffalo, and leopards on thrilling game drives and boat safaris in Rwanda's premier savannah park.
                </p>
                <Button asChild className="w-full">
                  <Link to="/tours/akagera-safari">Explore Akagera Safari →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 space-y-4">
            <Button asChild size="lg" variant="outline">
              <Link to="/tours">View All Rwanda Tours</Link>
            </Button>
            <div>
              <Button asChild size="lg" variant="secondary">
                <Link to="/tours/seasonal-comparison">Compare Seasonal Experiences →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Travel with Virunga Expedition Tours?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We combine local expertise with international standards to create exceptional safari experiences
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Local Guides</h3>
              <p className="text-muted-foreground">
                Our passionate, licensed guides bring deep knowledge of Rwanda's wildlife, culture, and conservation. Every journey becomes a rich learning experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Planning</h3>
              <p className="text-muted-foreground">
                From gorilla permit bookings to accommodation and transport, we handle every detail so you can focus on the adventure.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainable Tourism</h3>
              <p className="text-muted-foreground">
                Your journey supports gorilla conservation, local communities, and environmental protection across the Virunga region.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customized Itineraries</h3>
              <p className="text-muted-foreground">
                No cookie-cutter tours. We design personalized experiences matching your interests, budget, and travel style.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">RTTA Certified</h3>
              <p className="text-muted-foreground">
                As proud members of the Rwanda Travel & Tourism Association, we uphold the highest standards of professionalism and service.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hassle-Free Bookings</h3>
              <p className="text-muted-foreground">
                We secure gorilla permits, book accommodations, arrange transport, and provide 24/7 support throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Overview */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Explore Beyond Rwanda</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            While Rwanda is our home and specialty, Virunga Expedition Tours connects you to incredible experiences across the Virunga Massif region.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <div className="relative h-48">
                <img src={rwandaVirunga} alt="Rwanda - The Ultimate Gorilla Kingdom" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Rwanda: The Ultimate Gorilla Kingdom</CardTitle>
                <CardDescription className="text-sm">Africa's most accessible wild encounters</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Volcanoes National Park</li>
                  <li>• Nyungwe Forest</li>
                  <li>• Akagera National Park</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/destinations">Explore Rwanda →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <div className="relative h-48">
                <img src={bwindiTrails} alt="Western Uganda - The Impenetrable Wild" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Western Uganda: The Impenetrable Wild</CardTitle>
                <CardDescription className="text-sm">Extended expeditions through Africa's most biodiverse forests</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Bwindi Impenetrable Forest</li>
                  <li>• Mgahinga Gorilla Park</li>
                  <li>• Queen Elizabeth Park</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/destinations">Discover Uganda →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <div className="relative h-48">
                <img src={virungaVolcanoes} alt="Eastern DRC - Africa's Most Epic Adventure" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Eastern DRC: Africa's Most Epic Adventure in the Virunga</CardTitle>
                <CardDescription className="text-sm">The continent's oldest park</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Virunga National Park</li>
                  <li>• Nyiragongo Volcano</li>
                  <li>• Kahuzi-Biega</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/destinations">Explore Eastern DRC →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Travelers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <CardDescription>Jennifer M., Australia • March 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "The gorilla trek was absolutely life-changing. Our guide from Virunga Expedition Tours was knowledgeable, patient, and made sure everything went smoothly. Standing meters from a silverback gorilla is something I'll never forget!"
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <CardDescription>David & Sarah T., UK • August 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "We booked a 7-day Rwanda safari and it exceeded every expectation. From Akagera's game drives to Nyungwe's chimps to the incredible gorilla encounter - everything was perfectly organized. Highly recommend!"
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <CardDescription>Marie L., Canada • June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "As a solo traveler, I was nervous about logistics. Virunga Expedition Tours handled everything - permits, transport, accommodation. I just showed up and experienced magic. The golden monkeys were a bonus highlight!"
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Rwanda?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let us create your perfect African adventure. Whether it's gorillas, safaris, or cultural experiences, our team is ready to craft your dream itinerary.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
              <h3 className="font-bold mb-2">Request a Custom Quote</h3>
              <p className="text-sm opacity-90 mb-4">Tell us your travel dates, interests, and group size</p>
              <Button asChild className="bg-secondary hover:bg-secondary-light text-secondary-foreground w-full">
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
              <h3 className="font-bold mb-2">WhatsApp Us Now</h3>
              <p className="text-sm opacity-90 mb-4">Get instant answers to your questions</p>
              <Button asChild variant="whatsapp" className="w-full">
                <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer">Chat Now</a>
              </Button>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-sm opacity-90 mb-4">Speak with our travel experts</p>
              <Button asChild variant="outlineLight" className="w-full">
                <a href="tel:+250783007010">+250 783 007 010</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
