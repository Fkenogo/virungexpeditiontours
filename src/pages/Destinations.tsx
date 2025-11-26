import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Mountain, TreePine, Bird, Palmtree, Shield, AlertTriangle, Info, 
  Sunset, Coffee, Camera, Bike, Waves, Fish, Tent, Compass, Star, Clock,
  Users, Heart, Plane, Navigation
} from "lucide-react";
import virungaMountains from "@/assets/virunga-mountains.jpg";

const Destinations = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${virungaMountains})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Destinations</h1>
          <p className="text-xl max-w-3xl mx-auto">Discover the extraordinary landscapes and wildlife of Rwanda, Uganda, and Eastern DRC</p>
        </div>
      </section>

      {/* Quick Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('rwanda')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Rwanda
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('uganda')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Uganda
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('drc')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Eastern DRC
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="rwanda" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="rwanda" id="rwanda">Rwanda</TabsTrigger>
              <TabsTrigger value="uganda" id="uganda">Uganda</TabsTrigger>
              <TabsTrigger value="drc" id="drc">Eastern DRC</TabsTrigger>
            </TabsList>

            {/* RWANDA TAB */}
            <TabsContent value="rwanda" className="space-y-12">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-primary">Rwanda - Land of a Thousand Hills & The Adventure Frontier</h2>
                <p className="text-lg text-foreground/80">
                  Rwanda offers some of Africa's most accessible and well-protected wildlife experiences. From mountain gorillas in volcanic rainforests to Big Five safaris in savannah plains, Rwanda packs extraordinary diversity into a compact, incredibly safe destination.
                </p>
              </div>

              {/* Volcanoes National Park */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Mountain className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Volcanoes National Park (Parc National des Volcans)</CardTitle>
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <MapPin className="w-4 h-4" />
                    <span>2 hours from Kigali</span>
                    <Badge variant="secondary">160 sq km</Badge>
                    <Badge variant="secondary">~604 Gorillas</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Overview & Why Visit</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-foreground/80">
                        <p>
                          Nestled in northwestern Rwanda, Volcanoes National Park sits majestically on the steep slopes of the Virunga Mountains. Covering 160 square kilometers of pristine montane rainforest, the park encompasses five of the eight volcanic mountains: Mount Karisimbi (4,507m - highest), Mount Bisoke (3,711m), Mount Sabinyo (3,669m), Mount Gahinga (3,474m), and Mount Muhabura (4,127m).
                        </p>
                        <p>
                          Home to approximately 604 mountain gorillas with 12 fully habituated families available for tourist visits, this is one of the world's most accessible and well-managed gorilla trekking destinations.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="activities">
                      <AccordionTrigger>Key Activities & Experiences</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Users className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Mountain Gorilla Trekking</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                Track 12 habituated gorilla families (Susa, Igisha, Karisimbi, Sabyinyo, Amahoro, Agashya, Kwitonda, Umubano, Hirwa, Bwenge, Ugyenda, Muhoza). Trek duration: 30 minutes to 4+ hours. One hour with gorillas once located.
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge>$1,500 permit</Badge>
                                <Badge variant="outline">96 daily permits</Badge>
                                <Link to="/tours/gorilla-trekking">
                                  <Button size="sm" variant="link" className="h-auto p-0">Learn More →</Button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Star className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Golden Monkey Tracking</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                Track endangered golden monkeys in bamboo forests at 2,500-3,500m. These acrobatic primates live in troops up to 80 individuals. Generally less strenuous than gorilla trekking.
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge>$100 permit</Badge>
                                <Link to="/tours/golden-monkey">
                                  <Button size="sm" variant="link" className="h-auto p-0">Learn More →</Button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Heart className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Dian Fossey Tomb Hike</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                Pay homage to the legendary primatologist at 3,000m. 2-3 hour hike through montane forest to her grave and Karisoke Research Center ruins.
                              </p>
                              <Link to="/tours/dian-fossey-hike">
                                <Button size="sm" variant="link" className="h-auto p-0">Learn More →</Button>
                              </Link>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Mountain className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Volcano Hiking</h5>
                              <p className="text-sm text-foreground/80">
                                <strong>Mount Bisoke:</strong> 6-hour round trip, crater lake at summit<br/>
                                <strong>Mount Karisimbi:</strong> 2-day expedition, Rwanda's highest peak (4,507m)<br/>
                                <strong>Mount Sabyinyo:</strong> Tri-border point (Rwanda/Uganda/DRC)
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="practical">
                      <AccordionTrigger>Practical Information</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-secondary" />
                              Access
                            </h5>
                            <p className="text-sm text-foreground/80">2 hours from Kigali International Airport. Near Musanze town (20 minutes from park headquarters).</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-secondary" />
                              Best Time
                            </h5>
                            <p className="text-sm text-foreground/80">Year-round. Dry seasons: June-September, December-February (easier trekking). Rainy: March-May, October-November (lush, gorillas easier to find).</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Permit Pricing</h5>
                          <ul className="text-sm text-foreground/80 space-y-1">
                            <li>• Foreign Non-Resident: $1,500</li>
                            <li>• Foreign Resident: $500</li>
                            <li>• EAC/Rwandan Citizen: $200</li>
                            <li>• Minimum Age: 15 years</li>
                            <li>• Book 3-6 months in advance</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="itineraries">
                      <AccordionTrigger>Suggested Itineraries</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <Link to="/itineraries" className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-semibold">3-Day Rwanda Primate Safari</h5>
                                <p className="text-sm text-foreground/80">Gorillas + Golden Monkeys in Volcanoes NP</p>
                              </div>
                              <Badge variant="secondary">3 Days</Badge>
                            </div>
                          </Link>
                          <Link to="/itineraries" className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-semibold">5-Day Primates & Safari</h5>
                                <p className="text-sm text-foreground/80">Volcanoes + Akagera National Park</p>
                              </div>
                              <Badge variant="secondary">5 Days</Badge>
                            </div>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Nyungwe Forest National Park */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TreePine className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Nyungwe Forest National Park</CardTitle>
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <MapPin className="w-4 h-4" />
                    <span>5-6 hours from Kigali</span>
                    <Badge variant="secondary">1,019 sq km</Badge>
                    <Badge variant="secondary">UNESCO Site</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Overview & Why Visit</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-foreground/80">
                        <p>
                          One of Africa's most ancient and biodiverse montane rainforests, Nyungwe is a UNESCO World Heritage Site protecting one of the oldest rainforests in Africa - a forest that survived the Ice Age. Elevation ranges from 1,600m to 2,950m, creating diverse microclimates supporting over 1,068 plant species including 140 orchid species.
                        </p>
                        <p>
                          Home to over 500 chimpanzees and 13 primate species (one of Africa's highest primate diversity hotspots), plus 310+ bird species including 27 Albertine Rift endemics.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="activities">
                      <AccordionTrigger>Key Activities & Experiences</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Users className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Chimpanzee Trekking</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                Track 500+ chimpanzees in two habituated communities. Early start (5:00-5:30 AM), 2-5 hour trek, one hour with chimps. 90% success rate. These highly intelligent primates are incredibly active and vocal.
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge>$90 permit + $60 park fee</Badge>
                                <Link to="/tours/chimpanzee">
                                  <Button size="sm" variant="link" className="h-auto p-0">Learn More →</Button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Compass className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Canopy Walkway</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                East Africa's only canopy walkway - 160 meters long, suspended 70 meters above the forest floor. Walk at eye level with canopy inhabitants. 2-3 hour experience including Igishigishigi Trail.
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge>$60 included with park entry</Badge>
                                <Link to="/tours/canopy-walkway">
                                  <Button size="sm" variant="link" className="h-auto p-0">Learn More →</Button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Star className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Colobus Monkey Tracking</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                Track troops of 350+ Ruwenzori colobus monkeys - the largest arboreal primate troops in Africa. Less strenuous than chimp trekking, excellent photos.
                              </p>
                              <Link to="/tours/colobus-monkey">
                                <Button size="sm" variant="link" className="h-auto p-0">Learn More →</Button>
                              </Link>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Bird className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Birding & Hiking Trails</h5>
                              <p className="text-sm text-foreground/80">
                                310+ bird species, 130km of hiking trails (Umuyove, Umugote, Karamba, Isumo Waterfall, Kamiranzovu), tea plantation tours at Gisakura Estate.
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="practical">
                      <AccordionTrigger>Practical Information</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">13 Primate Species</h5>
                            <p className="text-sm text-foreground/80">Chimpanzees, Ruwenzori & Angola Colobus, L'Hoest's Monkeys, Blue Monkeys, Golden Monkeys, Grey-cheeked Mangabeys, Owl-faced Monkeys, and more.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Best Time</h5>
                            <p className="text-sm text-foreground/80">Dry: June-September, December-February. Rainy: March-May, September-November (chimps stay closer to trails).</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Accommodation</h5>
                          <p className="text-sm text-foreground/80">
                            <strong>Luxury:</strong> One&Only Nyungwe House, Nyungwe Forest Lodge<br/>
                            <strong>Mid-range:</strong> Nyungwe Top Hills Hotel, Gisakura Guest House
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="itineraries">
                      <AccordionTrigger>Suggested Itineraries</AccordionTrigger>
                      <AccordionContent>
                        <Link to="/itineraries" className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold">7-Day Best of Rwanda</h5>
                              <p className="text-sm text-foreground/80">Volcanoes + Nyungwe + Akagera</p>
                            </div>
                            <Badge variant="secondary">7 Days</Badge>
                          </div>
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Akagera National Park */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Palmtree className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Akagera National Park - Rwanda's Big Five Sanctuary</CardTitle>
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <MapPin className="w-4 h-4" />
                    <span>2.5 hours from Kigali</span>
                    <Badge variant="secondary">1,122 sq km</Badge>
                    <Badge variant="secondary">Big Five</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Overview & Conservation Success</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-foreground/80">
                        <p>
                          Rwanda's largest protected wetland and only savanna park, Akagera spans 1,122 sq km of expansive savanna plains, acacia woodlands, papyrus swamps, and picturesque lakes along the Tanzanian border.
                        </p>
                        <p>
                          Following a groundbreaking 2010 partnership between Rwanda Development Board and African Parks, Akagera represents one of Africa's greatest conservation success stories:
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Lions:</strong> Reintroduced 2015, now 20+ individuals</li>
                          <li>• <strong>Black Rhinos:</strong> 18 from South Africa (2017), 5 from Czech Republic (2019)</li>
                          <li>• <strong>White Rhinos:</strong> Introduced 2021</li>
                          <li>• <strong>Elephants:</strong> 100+ individuals</li>
                          <li>• <strong>Buffaloes:</strong> Massive herds numbering hundreds</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="activities">
                      <AccordionTrigger>Activities & Wildlife</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Compass className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Game Drives</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                <strong>Morning (6:00 AM):</strong> Predators and grazers most active<br/>
                                <strong>Afternoon (3:30 PM):</strong> Golden light photography<br/>
                                <strong>Night Drives (5:30-8:30 PM):</strong> Lions, leopards, hyenas, bush babies with armed rangers
                              </p>
                              <Link to="/tours/akagera-safari">
                                <Button size="sm" variant="link" className="h-auto p-0">Learn More →</Button>
                              </Link>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Waves className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Boat Safari on Lake Ihema</h5>
                              <p className="text-sm text-foreground/80 mb-2">
                                2-hour cruise: hippo pods (50+ individuals), Nile crocodiles, elephants bathing, 525+ bird species including African Fish Eagles, possibly Shoebill Stork.
                              </p>
                              <Badge>From $35 per person</Badge>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <Star className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-1">Beyond Big Five</h5>
                              <p className="text-sm text-foreground/80">
                                80+ Masai giraffes, zebras, topi, eland, roan antelope, waterbucks, spotted hyenas, 525+ bird species. Behind the Scenes tours, walking safaris, sport fishing.
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="practical">
                      <AccordionTrigger>Practical Information</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Best Time</h5>
                            <p className="text-sm text-foreground/80">
                              <strong>Dry (June-Sept, Dec-Feb):</strong> Animals at water sources, shorter vegetation<br/>
                              <strong>Rainy (Mar-May, Oct-Nov):</strong> Lush, migratory birds, baby animals
                            </p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Accommodation</h5>
                            <p className="text-sm text-foreground/80">
                              <strong>Luxury:</strong> Magashi Camp, Ruzizi Tented Lodge<br/>
                              <strong>Mid-range:</strong> Akagera Game Lodge, Karenge Bush Camp
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="itineraries">
                      <AccordionTrigger>Suggested Itineraries</AccordionTrigger>
                      <AccordionContent>
                        <Link to="/itineraries" className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold">5-Day Primates & Safari</h5>
                              <p className="text-sm text-foreground/80">Volcanoes NP + Akagera Big Five Safari</p>
                            </div>
                            <Badge variant="secondary">5 Days</Badge>
                          </div>
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Lake Kivu */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Waves className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Lake Kivu - Rwanda's Riviera</CardTitle>
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">Africa's 6th Largest Lake</Badge>
                    <Badge variant="secondary">90km Long</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Overview & Towns</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-foreground/80">
                        <p>
                          Stretching along Rwanda's western border with DRC, Lake Kivu sits at 1,460m elevation, creating a mild climate perfect for post-trek relaxation. Safe swimming (unique chemistry prevents hippos/crocodiles).
                        </p>
                        <div className="space-y-2">
                          <div>
                            <h5 className="font-semibold">Gisenyi (Rubavu)</h5>
                            <p className="text-sm">Premier beach resort: sandy beaches, water sports, hot springs, sunset views over Congolese mountains</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Kibuye (Karongi)</h5>
                            <p className="text-sm">Peaceful pine-lined shores, islands, genocide memorial, traditional fishing villages</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Cyangugu (Rusizi)</h5>
                            <p className="text-sm">Gateway between Nyungwe and lake, tea plantations, authentic local experience</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="activities">
                      <AccordionTrigger>Activities & Experiences</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <ul className="space-y-2 text-sm text-foreground/80">
                          <li className="flex items-start gap-2">
                            <Waves className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                            <span><strong>Water Sports:</strong> Kayaking, paddleboarding, swimming in clean safe waters</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Bike className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                            <span><strong>Congo Nile Trail:</strong> 227km hiking/cycling route through tea plantations and fishing villages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Navigation className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                            <span><strong>Island Exploration:</strong> Napoleon Island (fruit bat colony), Peace Island, Amahoro Island (coffee tours)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Coffee className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                            <span><strong>Coffee & Tea:</strong> Farm tours, tasting experiences, picking demonstrations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Sunset className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                            <span><strong>Sunset Cruises:</strong> Traditional fishing demonstrations, local music, fresh fish dinners</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="combinations">
                      <AccordionTrigger>Perfect Add-On</AccordionTrigger>
                      <AccordionContent className="text-sm text-foreground/80">
                        <p>
                          Lake Kivu serves as ideal post-trek relaxation, easily combined with:<br/>
                          • Volcanoes National Park (2-3 hours)<br/>
                          • Nyungwe Forest National Park (4 hours)<br/>
                          • As stopover between the two parks
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Kigali City */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Camera className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Kigali - Rwanda's Vibrant Capital</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    One of Africa's cleanest, safest, and most organized cities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="attractions">
                      <AccordionTrigger>Must-Visit Attractions</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <div className="space-y-2 text-sm text-foreground/80">
                          <div>
                            <h5 className="font-semibold">Kigali Genocide Memorial</h5>
                            <p>Most important site - honors victims with exhibitions, memorial gardens, survivor testimonies. Allow 2-3 hours.</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Inema Arts Center</h5>
                            <p>Rwanda's premier contemporary art gallery with artist studios and workshops</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Kimironko Market</h5>
                            <p>East Africa's largest market: fresh produce, traditional fabrics, handcrafts, cultural immersion</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Caplaki Craft Village</h5>
                            <p>Authentic Rwandan souvenirs: traditional baskets, wood carvings, jewelry, direct support to artisans</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Nyamirambo Women's Center</h5>
                            <p>Walking tours, cooking classes, traditional dance, handicraft workshops, empowerment programs</p>
                          </div>
                        </div>
                        <Link to="/tours/kigali-city-tour">
                          <Button size="sm" variant="secondary">Explore Kigali City Tour →</Button>
                        </Link>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="cuisine">
                      <AccordionTrigger>Cuisine & Restaurants</AccordionTrigger>
                      <AccordionContent className="space-y-2 text-sm text-foreground/80">
                        <p>
                          <strong>Traditional:</strong> Brochettes (skewered grilled meat), Isombe (cassava leaves with peanut sauce), Ugali (maize porridge), world-class Rwandan coffee
                        </p>
                        <p>
                          <strong>Notable Venues:</strong> Heaven Restaurant (rooftop with social mission), Repub Lounge, Question Coffee, Hotel des Mille Collines
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tours">
                      <AccordionTrigger>Tour Options</AccordionTrigger>
                      <AccordionContent className="space-y-2 text-sm text-foreground/80">
                        <p><strong>Half-Day:</strong> Genocide Memorial + one other attraction</p>
                        <p><strong>Full Day:</strong> Memorial + market + art center + cultural experience + restaurant</p>
                        <Link to="/tours/kigali-city-tour" className="inline-block mt-2">
                          <Button size="sm" variant="link" className="h-auto p-0">View City Tour Options →</Button>
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <div className="text-center mt-8 space-y-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <Link to="/tours">Explore Rwanda Tours</Link>
                </Button>
              </div>
            </TabsContent>

            {/* UGANDA TAB */}
            <TabsContent value="uganda" className="space-y-12">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-primary">Uganda - The Pearl of Africa</h2>
                <p className="text-lg text-foreground/80">
                  Uganda offers exceptional gorilla trekking opportunities with lower permit prices ($800 vs Rwanda's $1,500), diverse wildlife experiences across extensive national parks, and the unique Gorilla Habituation Experience.
                </p>
              </div>

              {/* Bwindi Impenetrable Forest */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TreePine className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Bwindi Impenetrable Forest National Park</CardTitle>
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <MapPin className="w-4 h-4" />
                    <span>4-5 hours from Kigali / 8-9 hours from Kampala</span>
                    <Badge variant="secondary">331 sq km</Badge>
                    <Badge variant="secondary">~459 Gorillas</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Overview & Why Visit</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-foreground/80">
                        <p>
                          Situated in southwestern Uganda along the rim of the Rift Valley, Bwindi Impenetrable National Park lives up to its name - 331 square kilometers of dense, mountainous rainforest cloaked in mist and mystery. This UNESCO World Heritage Site harbors approximately half of the world's remaining mountain gorilla population (around 459 individuals), making it the most important gorilla conservation area on Earth.
                        </p>
                        <p>
                          The name "Bwindi" derives from the local Runyakitara word "Mubwindi" meaning "place of darkness" - an apt description for this ancient forest where sunlight struggles to penetrate the dense canopy. Dating back over 25,000 years, Bwindi survived the Ice Age and now serves as one of Africa's most biodiverse forests.
                        </p>
                        <p>
                          With 19 habituated gorilla families (more than any other park), Bwindi offers exceptional trekking diversity across four distinct sectors, each offering unique gorilla experiences.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sectors">
                      <AccordionTrigger>Four Sectors - Choose Your Experience</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-1">Buhoma Sector (Northern)</h5>
                            <p className="text-sm text-foreground/80 mb-2">
                              <strong>4 families:</strong> Mubare, Habinyanja, Rushegura, Katwe<br/>
                              Most developed sector, best lodges, easiest access from Kigali (4-5 hours)
                            </p>
                            <Badge variant="secondary">Most Popular</Badge>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-1">Ruhija Sector (Eastern)</h5>
                            <p className="text-sm text-foreground/80 mb-2">
                              <strong>4 families:</strong> Bitukura, Oruzogo, Mukiza, Kyaguriro<br/>
                              Higher altitude (2,350m), excellent birding, more challenging terrain, fewer tourists
                            </p>
                            <Badge variant="secondary">Best for Birders</Badge>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-1">Rushaga Sector (Southern)</h5>
                            <p className="text-sm text-foreground/80 mb-2">
                              <strong>8 families:</strong> Nshongi, Mishaya, Kahungye, Busingye, Bweza, Bikyingi, Mucunguzi, + habituated group<br/>
                              Only sector offering Gorilla Habituation Experience, growing infrastructure
                            </p>
                            <Badge variant="secondary">Habituation Available</Badge>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-1">Nkuringo Sector (Southern)</h5>
                            <p className="text-sm text-foreground/80 mb-2">
                              <strong>3 families:</strong> Nkuringo, Christmas, Bushaho<br/>
                              Dramatic ridge location overlooking Virunga Volcanoes, steepest terrain, spectacular views
                            </p>
                            <Badge variant="secondary">Most Challenging</Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="habituation">
                      <AccordionTrigger>Gorilla Habituation Experience</AccordionTrigger>
                      <AccordionContent className="space-y-3 text-foreground/80">
                        <p>
                          Unique to Bwindi (currently only in Rushaga sector), this exceptional opportunity allows visitors to join researchers working with gorillas still undergoing habituation:
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>4 Hours</strong> with gorillas (vs standard 1 hour)</li>
                          <li>• <strong>Maximum 4 People</strong> per group (vs 8)</li>
                          <li>• Active participation: help track, record data, observe techniques</li>
                          <li>• Deeper understanding of gorilla behavior and conservation</li>
                          <li>• <strong>$1,500</strong> per person (same as Rwanda permit, but 4x longer)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="practical">
                      <AccordionTrigger>Practical Information</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                          <h5 className="font-semibold mb-2 text-green-900 dark:text-green-100">Significant Permit Savings</h5>
                          <p className="text-sm text-green-800 dark:text-green-200">
                            <strong>Standard Gorilla Trekking:</strong> $800 (vs Rwanda's $1,500)<br/>
                            <strong>Habituation Experience:</strong> $1,500 (4 hours vs 1 hour)<br/>
                            <strong>Minimum Age:</strong> 15 years<br/>
                            <strong>Daily Permits:</strong> 152 for regular + 4 for habituation<br/>
                            <strong>Booking:</strong> 3-6 months advance recommended
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Beyond Gorillas</h5>
                            <p className="text-sm text-foreground/80">11 other primate species, 350+ bird species (23 Albertine Rift endemics), Batwa cultural experience, forest trails</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Best Time</h5>
                            <p className="text-sm text-foreground/80">Dry: June-August, December-February. Rainy: March-May, September-November (lush, gorillas easier to find)</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Porter Services</h5>
                          <p className="text-sm text-foreground/80">Highly recommended ($15-20). Many are reformed poachers now protecting gorillas. They carry bags and assist on steep sections.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Mgahinga Gorilla National Park */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Mountain className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Mgahinga Gorilla National Park - Where Gold Meets Silver</CardTitle>
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">33.7 sq km</Badge>
                    <Badge variant="secondary">Uganda's Smallest NP</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Three Volcanoes & Overview</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-foreground/80">
                        <p>
                          Uganda's smallest national park (33.7 sq km) in extreme southwestern corner where Uganda, Rwanda, and DRC converge. Part of transboundary Virunga Conservation Area. Motto: "Where Gold Meets Silver" (golden monkeys + silver-backed gorillas).
                        </p>
                        <div className="space-y-2 text-sm">
                          <div>
                            <h5 className="font-semibold">Mount Muhabura (4,127m) - "The Guide"</h5>
                            <p>Highest peak, challenging 8-10 hour climb, crater lake at summit, panoramic views</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Mount Gahinga (3,474m) - "Pile of Stones"</h5>
                            <p>Gentlest climb (6 hours), swamp-filled crater, beautiful bamboo forest</p>
                          </div>
                          <div>
                            <h5 className="font-semibold">Mount Sabyinyo (3,669m) - "Old Man's Teeth"</h5>
                            <p>Most challenging (8 hours), three jagged peaks, tri-border summit (stand in Uganda/Rwanda/DRC simultaneously)</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="gorillas">
                      <AccordionTrigger>The Nyakagezi Gorilla Family</AccordionTrigger>
                      <AccordionContent className="space-y-3 text-foreground/80">
                        <p>
                          Mgahinga offers tracking of one habituated gorilla family - the Nyakagezi group, known for its remarkable history and character:
                        </p>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Family Composition</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>9 members</strong> including 4 silverbacks (rare to have so many)</li>
                            <li>• 2 adult females</li>
                            <li>• 1 juvenile</li>
                            <li>• 2 infants</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Unique History</h5>
                          <p className="text-sm mb-2">
                            The Nyakagezi family is notorious for its cross-border movements, having historically ranged between Uganda, Rwanda, and DRC. In recent years, rangers have successfully encouraged the family to remain primarily in Uganda, though they occasionally venture into neighboring countries. Uganda Wildlife Authority trackers monitor the family daily, ensuring location is known before trekkers set out.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Trek Characteristics</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• Generally <strong>shorter and less strenuous</strong> than Bwindi (2-4 hours typically)</li>
                            <li>• More open bamboo forest provides better visibility</li>
                            <li>• Higher success rate due to constant monitoring</li>
                            <li>• Maximum 8 people per day</li>
                            <li>• Often considered more intimate due to smaller trekker groups overall</li>
                            <li>• <strong>Permits: $800</strong> per person (same as Bwindi, cheaper than Rwanda)</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="golden">
                      <AccordionTrigger>Golden Monkey Tracking - Mgahinga's Special Treasure</AccordionTrigger>
                      <AccordionContent className="space-y-3 text-foreground/80">
                        <p>
                          Golden monkeys - endangered primates endemic to the Albertine Rift - are one of Mgahinga's greatest draws. These beautiful primates are characterized by:
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Distinctive Appearance:</strong> Golden-orange body, black limbs, tails, and face markings</li>
                          <li>• <strong>Large Troops:</strong> 60-80 individuals in habituated groups</li>
                          <li>• <strong>High Energy:</strong> Constantly moving, leaping, playing</li>
                          <li>• <strong>Bamboo Specialists:</strong> Feed primarily on bamboo shoots, leaves, and shoots</li>
                        </ul>
                        <div className="p-3 rounded-lg bg-muted/30 mt-3">
                          <h5 className="font-semibold mb-2">The Golden Monkey Experience</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Start Time:</strong> 7:00 AM at Ntebeko headquarters</li>
                            <li>• <strong>Duration:</strong> Usually 3-4 hours</li>
                            <li>• <strong>Altitude:</strong> 2,500-3,500m in bamboo zone</li>
                            <li>• <strong>Observation Time:</strong> 1 hour once located</li>
                            <li>• <strong>Difficulty:</strong> Moderate - easier than gorillas but requires agility to keep up with active monkeys</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30 mt-3">
                          <h5 className="font-semibold mb-2">Tracking Options</h5>
                          <p className="text-sm mb-2">
                            <strong>Standard Tracking Permit:</strong> $100 per person (includes park entry)
                          </p>
                          <p className="text-sm">
                            <strong>Golden Monkey Habituation:</strong> For those wanting more time, Mgahinga offers habituation experiences with up to 4 hours with monkeys, maximum 4 people, $100 per person. Work with researchers, learn habituation techniques.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="batwa">
                      <AccordionTrigger>Batwa Trail Cultural Experience</AccordionTrigger>
                      <AccordionContent className="space-y-3 text-sm text-foreground/80">
                        <p>
                          The Batwa (pygmy) people are the indigenous inhabitants of the Virunga Mountains, having lived as hunter-gatherers for millennia before parks were established. The Batwa Trail offers profound cultural insights:
                        </p>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">The Experience</h5>
                          <ul className="space-y-1">
                            <li>• <strong>Duration:</strong> 4-6 hours</li>
                            <li>• <strong>Route:</strong> Through forest to Garama Cave</li>
                            <li>• <strong>Activities:</strong>
                              <ul className="ml-4 mt-1 space-y-1">
                                <li>- Learn traditional hunting techniques (bow and arrow use)</li>
                                <li>- Fire-making without matches</li>
                                <li>- Wild honey gathering</li>
                                <li>- Traditional medicine and forest pharmacy</li>
                                <li>- Sacred sites and spiritual practices</li>
                              </ul>
                            </li>
                            <li>• <strong>Cultural Performances:</strong> Traditional music, dance, and storytelling</li>
                            <li>• <strong>Cave Visit:</strong> Garama Cave, ancient Batwa dwelling</li>
                          </ul>
                        </div>
                        <p className="italic">
                          This experience provides crucial income to the Batwa community while preserving their cultural heritage. Many guides are Batwa elders with intimate forest knowledge.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="practical">
                      <AccordionTrigger>Practical Information</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Getting to Mgahinga</h5>
                            <p className="text-sm text-foreground/80 mb-2">
                              <strong>From Kigali:</strong> 3-4 hours via Cyanika border - most convenient for international visitors
                            </p>
                            <p className="text-sm text-foreground/80 mb-2">
                              <strong>From Kampala:</strong> 8-9 hours - long but scenic drive
                            </p>
                            <p className="text-sm text-foreground/80 mb-2">
                              <strong>From Bwindi:</strong> 2-3 hours (combining both parks is popular)
                            </p>
                            <p className="text-sm text-foreground/80">
                              <strong>By Air:</strong> Kisoro airstrip (30 minutes from park) receives flights from Entebbe via Aerolink Uganda
                            </p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Birding in Mgahinga</h5>
                            <p className="text-sm text-foreground/80 mb-2">
                              Though small, Mgahinga protects 180 bird species including 15 Albertine Rift endemics:
                            </p>
                            <ul className="text-sm space-y-1">
                              <li>• Regal Sunbird</li>
                              <li>• Rwenzori Turaco</li>
                              <li>• Handsome Francolin</li>
                              <li>• Dusky Crimsonwing</li>
                              <li>• Scarlet-tufted Malachite Sunbird</li>
                            </ul>
                            <p className="text-sm mt-2">Best birding locations: Sabinyo Gorge between Mt. Gahinga and Mt. Sabyinyo, lower bamboo zones, forest trails.</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Best Time to Visit</h5>
                          <p className="text-sm text-foreground/80">
                            <strong>Dry Seasons (June-August, December-February):</strong> Optimal hiking conditions, clearer volcano views, less muddy trails<br/>
                            <strong>Rainy Seasons (March-May, September-November):</strong> Lush vegetation, excellent for photography, fewer tourists, lower accommodation rates, gorillas and monkeys don't move far (easier tracking)
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Accommodation</h5>
                          <p className="text-sm text-foreground/80">
                            <strong>Luxury:</strong> Mount Gahinga Lodge (eco-luxury with volcano views)<br/>
                            <strong>Mid-Range:</strong> Lake Mulehe Safari Lodge, Travelers Rest Hotel (historic - Dian Fossey stayed here)<br/>
                            <strong>Budget:</strong> Amajambere Iwacu Community Camp (community-owned), various guesthouses in Kisoro town
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Other Uganda Extensions */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Other Uganda Extensions</CardTitle>
                  <CardDescription className="text-base">
                    Extend your Uganda adventure with additional national parks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="murchison">
                      <AccordionTrigger>Murchison Falls National Park</AccordionTrigger>
                      <AccordionContent className="space-y-2 text-sm text-foreground/80">
                        <p>
                          Uganda's largest park (3,840 sq km) offering classic African safari:
                        </p>
                        <ul className="space-y-1">
                          <li>• <strong>The Falls:</strong> Thundering Nile waters compressed through 7-meter gap</li>
                          <li>• <strong>Big Game:</strong> Lions, leopards, elephants, buffaloes, giraffes, hippos, crocodiles</li>
                          <li>• <strong>Activities:</strong> Game drives, boat cruises to falls base, hiking to falls top</li>
                          <li>• <strong>Chimps:</strong> Budongo Forest offers excellent chimp trekking</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="queen">
                      <AccordionTrigger>Queen Elizabeth National Park</AccordionTrigger>
                      <AccordionContent className="space-y-2 text-sm text-foreground/80">
                        <p>
                          Uganda's most biodiverse park (1,978 sq km):
                        </p>
                        <ul className="space-y-1">
                          <li>• <strong>Tree-Climbing Lions:</strong> Famous Ishasha sector lions lounging in fig trees</li>
                          <li>• <strong>Wildlife:</strong> 95 mammal species, 10 primate species</li>
                          <li>• <strong>Kazinga Channel:</strong> Boat safaris with highest hippo concentration in Africa</li>
                          <li>• <strong>Chimps:</strong> Kyambura Gorge offers excellent encounters</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="lakes">
                      <AccordionTrigger>Lake Bunyonyi & Lake Mburo</AccordionTrigger>
                      <AccordionContent className="space-y-3 text-sm text-foreground/80">
                        <div>
                          <h5 className="font-semibold">Lake Bunyonyi</h5>
                          <p>Africa's 2nd deepest lake (900m): 29 islands, bilharzia-free swimming, canoeing, birdwatching (200+ species). Perfect stop between Bwindi/Mgahinga and Lake Victoria.</p>
                        </div>
                        <div>
                          <h5 className="font-semibold">Lake Mburo National Park</h5>
                          <p>Uganda's smallest savanna park: Large zebra herds, impalas (only location in Uganda), elands, horseback safaris, walking safaris, mountain biking. Convenient stop between Kampala and Bwindi.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="kibale">
                      <AccordionTrigger>Kibale Forest National Park</AccordionTrigger>
                      <AccordionContent className="space-y-2 text-sm text-foreground/80">
                        <p>
                          <strong>Primate Capital of the World:</strong>
                        </p>
                        <ul className="space-y-1">
                          <li>• <strong>Chimpanzees:</strong> 1,500 individuals, 13 habituated communities</li>
                          <li>• <strong>Success Rate:</strong> 90% chimp sightings</li>
                          <li>• <strong>Primates:</strong> 13 species total - highest primate density in Africa</li>
                          <li>• <strong>Chimp Habituation:</strong> Full-day experience available</li>
                          <li>• <strong>Birding:</strong> 375 species including African Grey Parrot</li>
                          <li>• <strong>Bigodi Wetland:</strong> Excellent for birds and primates</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Combining Bwindi & Mgahinga</h4>
                    <p className="text-blue-800 dark:text-blue-200 mb-3">
                      Many visitors combine both parks for diverse experiences: different terrain and atmosphere, compare gorilla families, add golden monkeys and volcano hiking. 5-7 day itineraries work well.
                    </p>
                    <Link to="/itineraries">
                      <Button size="sm" variant="secondary">View Uganda Itineraries →</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <Link to="/contact">Plan Uganda Extension</Link>
                </Button>
              </div>
            </TabsContent>

            {/* EASTERN DRC TAB */}
            <TabsContent value="drc" className="space-y-12">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-primary">Eastern Democratic Republic of Congo (DRC)</h2>
                <p className="text-lg text-foreground/80">
                  Virunga National Park - Africa's oldest national park - offers the world's most affordable gorilla permits ($400), the spectacular Mount Nyiragongo volcano with its massive lava lake, and the only park protecting three great ape taxa.
                </p>
              </div>

              {/* Safety Warning */}
              <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg border-l-4 border-amber-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">Important Safety Information</h4>
                    <p className="text-amber-800 dark:text-amber-200 mb-2">
                      Virunga National Park periodically closes to tourism due to security situations in eastern DRC. The park operates under strict security protocols with armed ranger escorts for all activities.
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 font-semibold">
                      Always check current status and book only through official Virunga Foundation channels (visitvirunga.org) before planning travel.
                    </p>
                  </div>
                </div>
              </div>

              {/* Virunga National Park */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Virunga National Park - Africa's Oldest National Park</CardTitle>
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <MapPin className="w-4 h-4" />
                    <span>3-4 hours from Kigali</span>
                    <Badge variant="secondary">7,800 sq km</Badge>
                    <Badge variant="secondary">UNESCO Site</Badge>
                    <Badge variant="secondary">Est. 1925</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Overview & Conservation Story - A Pioneer Park</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-foreground/80">
                        <p>
                          Established in 1925 by Belgian King Albert I as Albert National Park, Virunga holds the distinction of being Africa's first national park. Today, this UNESCO World Heritage Site spans 7,800 square kilometers (3,000 square miles) across eastern DRC, encompassing an extraordinary range of habitats: dense montane forests, bamboo thickets, savanna grasslands, lava plains, swamps, erosion valleys, active volcanoes, and the glaciated peaks of the Rwenzori Mountains.
                        </p>
                        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                          <h5 className="font-semibold mb-2 text-green-900 dark:text-green-100">World's Only Three Great Ape Sanctuary</h5>
                          <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                            Virunga is the only park on Earth protecting three taxa of great apes:
                          </p>
                          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                            <li>• <strong>Mountain Gorillas:</strong> Approximately 300-350 individuals (1/4 of world population)</li>
                            <li>• <strong>Eastern Lowland Grauer's Gorillas:</strong> In lower-altitude sectors</li>
                            <li>• <strong>Chimpanzees:</strong> Multiple communities throughout the park</li>
                          </ul>
                          <p className="text-sm text-green-800 dark:text-green-200 mt-2 font-semibold">
                            This unique distinction makes Virunga invaluable for primate conservation and research.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Conservation Challenges & Triumphs</h5>
                          <p className="text-sm mb-2">
                            Despite decades of conflict, poaching, and regional instability, Virunga has persevered through the dedicated efforts of park rangers (over 200 have died protecting it), the Congolese Institute for Nature Conservation (ICCN), and the Virunga Foundation. The park's resilience represents one of conservation's greatest stories.
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            Yet the park perseveres through: Dedicated Rangers (700+ risk their lives daily), Community Programs (hydroelectric projects providing power to 500,000+ people, fish farms, soap factories creating jobs), Tourism Revenue (supporting conservation when open for visits), Global Support (international organizations and donors funding protection), and the Documentary Impact ("Virunga" film raised global awareness).
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="gorillas">
                      <AccordionTrigger>Mountain Gorilla Trekking - The Virunga Way</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p className="text-sm text-foreground/80">
                          Virunga offers mountain gorilla trekking in its southern sector, with habituated families accessible from Bukima Tented Camp and surrounding areas. The Virunga gorilla experience differs from Uganda and Rwanda in several key ways:
                        </p>
                        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                          <h5 className="font-semibold mb-2 text-green-900 dark:text-green-100">The Virunga Advantage - Key Differences</h5>
                          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                            <li>• <strong>Cost:</strong> $400 per person - significantly less expensive than Uganda ($800) or Rwanda ($1,500)</li>
                            <li>• <strong>Terrain:</strong> Similar to Rwanda's Volcanoes Park - volcanic slopes with bamboo and montane forest</li>
                            <li>• <strong>Armed Escorts:</strong> Heavy ranger presence due to security concerns</li>
                            <li>• <strong>Fewer Tourists:</strong> Much quieter experience than neighboring parks</li>
                            <li>• <strong>Conservation Impact:</strong> Tourism revenue directly supports rangers and anti-poaching efforts</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">Habituated Families</h5>
                          <p className="text-sm text-foreground/80">
                            Multiple gorilla families available for tracking, carefully monitored by dedicated ranger teams who know each individual gorilla by name and character.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <h5 className="font-semibold mb-2">The Experience</h5>
                          <p className="text-sm text-foreground/80">
                            Similar to other parks - early morning briefing, trekking in small groups (maximum 8 people), one hour with gorillas once located. However, Virunga's challenging recent history and the rangers' extraordinary dedication add a deeper emotional dimension to the experience.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500">
                          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                            Important: Virunga's gorilla trekking is periodically closed due to security situations. Always check current status before planning travel.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="nyiragongo">
                      <AccordionTrigger>Mount Nyiragongo - The World's Largest Lava Lake</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p className="text-sm text-foreground/80 font-semibold">
                          If mountain gorilla trekking is Africa's most sought-after wildlife experience, summiting Mount Nyiragongo ranks among its most spectacular natural phenomena. This is not your average mountain hike - it's a journey to the edge of one of the world's most active and dramatic volcanoes.
                        </p>
                        
                        <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
                          <h5 className="font-semibold mb-2 text-orange-900 dark:text-orange-100 flex items-center gap-2">
                            <Mountain className="w-5 h-5" />
                            The Volcano
                          </h5>
                          <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
                            <li>• <strong>Height:</strong> 3,470m (11,384 feet)</li>
                            <li>• <strong>Type:</strong> Active stratovolcano</li>
                            <li>• <strong>Last Major Eruption:</strong> 2002, devastating Goma and causing massive displacement</li>
                            <li>• <strong>Ongoing Activity:</strong> Continuous lava lake at summit - world's largest</li>
                            <li>• <strong>Lava Lake Size:</strong> Approximately 700m diameter</li>
                            <li>• <strong>Crater Depth:</strong> Around 600m deep</li>
                          </ul>
                        </div>

                        <div className="space-y-3 text-sm text-foreground/80">
                          <div className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Day 1: The Climb</h5>
                            <ul className="space-y-1">
                              <li>• <strong>Start:</strong> Kibati Ranger Post at 1,989m (8:00 AM departure)</li>
                              <li>• <strong>Duration:</strong> 5-7 hours to summit depending on fitness</li>
                              <li>• <strong>Distance:</strong> 6 kilometers but gaining 1,500m in altitude</li>
                              <li>• <strong>Terrain:</strong> Starts through old lava fields, then into forest, finally across barren volcanic slopes</li>
                              <li>• <strong>Difficulty:</strong> Moderate to challenging - steep sections, high altitude, potentially hot and humid</li>
                              <li>• <strong>Porters:</strong> Strongly recommended ($25-30) to carry gear and provide assistance</li>
                            </ul>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Camping on the Crater Rim</h5>
                            <p className="mb-2">
                              At the summit, 12 basic cabins cling to the crater's edge. Each has:
                            </p>
                            <ul className="space-y-1">
                              <li>• Two single beds (bring sleeping bag)</li>
                              <li>• Stunning views across the crater</li>
                              <li>• Windows facing the lava lake for all-night viewing</li>
                              <li>• Shared facilities</li>
                            </ul>
                          </div>

                          <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-2 border-orange-300 dark:border-orange-700">
                            <h5 className="font-semibold mb-2 flex items-center gap-2 text-orange-900 dark:text-orange-100">
                              <Star className="w-5 h-5 text-orange-600" />
                              The Night - Why You Came
                            </h5>
                            <p className="text-orange-900 dark:text-orange-100">
                              This is why you came - standing at the crater's edge, watching Earth's molten heart churn and bubble just meters below. The lava lake glows brilliant orange-red, occasionally erupting in dramatic fountains. The roar of geological forces is constant, visceral, and utterly mesmerizing. Many visitors stay awake all night, hypnotized by nature's most primal spectacle.
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Day 2: Descent</h5>
                            <ul className="space-y-1">
                              <li>• <strong>Descent:</strong> 3-4 hours back to Kibati (leaves around 6:00 AM)</li>
                              <li>• <strong>Arrival:</strong> Usually by 10:00 AM</li>
                            </ul>
                          </div>

                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Essential Equipment</h5>
                            <ul className="space-y-1 text-sm">
                              <li>• Sleeping bag (temperatures near freezing at night)</li>
                              <li>• Warm layers (windproof jacket essential)</li>
                              <li>• Waterproof gear (weather changes rapidly)</li>
                              <li>• Sturdy hiking boots</li>
                              <li>• Gloves and hat</li>
                              <li>• Headlamp with extra batteries</li>
                              <li>• Food and plenty of water (2-3 liters)</li>
                              <li>• Camera with extra batteries (cold drains them)</li>
                            </ul>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <p className="text-sm font-semibold mb-1">Cost: Approximately $300-400 per person (includes permit, guide, rangers)</p>
                          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 font-semibold">
                            Safety Note: Only trek Nyiragongo when officially open and cleared by authorities. Volcanic activity is monitored but can change rapidly.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="other">
                      <AccordionTrigger>Other Experiences & Wildlife</AccordionTrigger>
                      <AccordionContent className="space-y-3 text-sm text-foreground/80">
                        <div>
                          <h5 className="font-semibold">Mount Nyamuragira</h5>
                          <p>Shield volcano (3,058m) with historical lava flows. Multi-day expedition through remote areas.</p>
                        </div>
                        <div>
                          <h5 className="font-semibold">Tchegera Island - Lake Kivu</h5>
                          <p>Private island luxury tented camp for post-gorilla/volcano relaxation. Kayaking, swimming, island walks, sunset cruises with Virunga volcano views.</p>
                        </div>
                        <div>
                          <h5 className="font-semibold">Savanna Sector</h5>
                          <p>Central/northern sectors offer classic African savanna (Lake Edward, elephants, hippos, lions, leopards) - rarely visited due to security challenges but could rival East Africa's great parks if stability achieved.</p>
                        </div>
                        <div>
                          <h5 className="font-semibold">Other Wildlife</h5>
                          <p>Okapi (endangered), forest & savanna elephants, hippos (Lake Edward has one of Africa's largest populations), Nile crocodiles, 700+ bird species including Albertine Rift endemics.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="access">
                      <AccordionTrigger>Access & Practical Information</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="space-y-3 text-sm text-foreground/80">
                          <div>
                            <h5 className="font-semibold mb-1">Via Kigali, Rwanda (Most Common)</h5>
                            <ul className="space-y-1">
                              <li>• <strong>Distance:</strong> 3-4 hours to Gisenyi/Goma border</li>
                              <li>• <strong>Process:</strong> Cross at Grande Barrier border post, meet Virunga vehicle</li>
                              <li>• <strong>Visa:</strong> DRC visa $105 on arrival or in advance from embassy</li>
                              <li>• <strong>Yellow Fever:</strong> Vaccination certificate mandatory</li>
                            </ul>
                          </div>

                          <div className="p-4 rounded-lg bg-muted/30">
                            <h5 className="font-semibold mb-2">Accommodation</h5>
                            <ul className="space-y-1">
                              <li>• <strong>Mikeno Lodge:</strong> Luxury eco-lodge at park HQ, stunning volcano views</li>
                              <li>• <strong>Kibumba Tented Camp:</strong> Comfortable tented camp, closer to gorilla families</li>
                              <li>• <strong>Bukima Tented Camp:</strong> Intimate camp near gorillas, authentic bush experience</li>
                              <li>• <strong>Nyiragongo Summit Shelters:</strong> Basic cabins on crater rim</li>
                            </ul>
                          </div>

                          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950">
                            <h5 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">Safety Considerations</h5>
                            <ul className="space-y-1 text-amber-800 dark:text-amber-200">
                              <li>• Always book through official Virunga Foundation (visitvirunga.org)</li>
                              <li>• Follow all security protocols and ranger instructions</li>
                              <li>• Armed ranger escorts accompany all activities</li>
                              <li>• Check current security status before booking (park sometimes closes)</li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-semibold mb-1">Best Time to Visit</h5>
                            <p>
                              <strong>Dry (June-Sept, Dec-Feb):</strong> Optimal trekking, clearer views<br/>
                              <strong>Rainy (Mar-May, Oct-Nov):</strong> Lush scenery, gorillas easier to locate, fewer tourists
                            </p>
                            <p className="mt-2 text-amber-600 dark:text-amber-400 font-semibold">
                              Important: Seasons matter less than security situation. Always check current status.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="conservation">
                      <AccordionTrigger>Conservation Impact - How Your Visit Helps</AccordionTrigger>
                      <AccordionContent className="space-y-3 text-sm text-foreground/80">
                        <p>
                          Every Virunga visit directly supports:
                        </p>
                        <ul className="space-y-1">
                          <li>• <strong>Ranger Salaries:</strong> Funding 700+ rangers who risk their lives daily (200+ have died protecting Virunga)</li>
                          <li>• <strong>Community Projects:</strong> Hydroelectric providing power to 500,000+ people, fish farms, soap factories creating jobs</li>
                          <li>• <strong>Anti-Poaching Operations:</strong> Equipment, training, patrols</li>
                          <li>• <strong>Habitat Protection:</strong> Fighting deforestation and encroachment</li>
                          <li>• <strong>Research & Monitoring:</strong> Understanding and protecting wildlife</li>
                        </ul>
                        <p className="font-semibold text-primary">
                          Tourism is literally keeping Virunga alive. When the park is open and safe, visiting makes a profound conservation difference.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <div className="text-center mt-8 space-y-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <Link to="/contact">Plan Congo Adventure</Link>
                </Button>
                <p className="text-sm text-muted-foreground">Always verify current security status before booking</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Permit Comparison Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Gorilla Permit Price Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-3 text-left">Country/Park</th>
                    <th className="p-3 text-center">Gorilla Permit</th>
                    <th className="p-3 text-center">Golden Monkey</th>
                    <th className="p-3 text-center">Chimpanzee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Rwanda (Volcanoes NP)</td>
                    <td className="p-3 text-center">$1,500</td>
                    <td className="p-3 text-center">$100</td>
                    <td className="p-3 text-center">$90 (Nyungwe)</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-semibold">Uganda (Bwindi/Mgahinga)</td>
                    <td className="p-3 text-center">$800</td>
                    <td className="p-3 text-center">$100</td>
                    <td className="p-3 text-center">$200 (Kibale)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">DRC (Virunga NP)</td>
                    <td className="p-3 text-center">$400</td>
                    <td className="p-3 text-center">N/A</td>
                    <td className="p-3 text-center">N/A</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="p-3 font-semibold">Uganda Habituation</td>
                    <td className="p-3 text-center">$1,500 (4 hours)</td>
                    <td className="p-3 text-center">$100 (4 hours)</td>
                    <td className="p-3 text-center">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Permit prices are set by national park authorities and subject to change. Contact us for current pricing.
            </p>
          </div>

          {/* Recommended Itineraries */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Recommended Itineraries</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/itineraries" className="block">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Classic Rwanda (7-8 Days)</span>
                      <Badge variant="secondary">7-8 Days</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Kigali city tour → Volcanoes NP (gorillas, golden monkeys) → Nyungwe Forest (chimps, canopy walk) → Akagera NP (Big Five safari)
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/itineraries" className="block">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Uganda Gorilla & Primate (8-10 Days)</span>
                      <Badge variant="secondary">8-10 Days</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Bwindi (gorillas) → Mgahinga (golden monkeys, volcanoes) → Lake Bunyonyi → Queen Elizabeth NP → Kibale Forest (chimps)
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/itineraries" className="block">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Congo Adventure (5 Days)</span>
                      <Badge variant="secondary">5 Days</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Arrive Kigali → Transfer to Virunga → Gorilla trekking → Nyiragongo volcano trek (2 days with overnight on crater) → Return Kigali
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/itineraries" className="block">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Ultimate Virunga Massive Experience (10-12 Days)</span>
                      <Badge variant="secondary">10-12 Days</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Gorilla trekking in all three countries (Rwanda, Uganda, DRC) + Golden monkeys + Nyiragongo volcano + Lake Kivu relaxation + Cultural experiences
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Adventure?</h3>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
              Contact us to create a customized itinerary combining gorilla trekking, wildlife safaris, cultural experiences, and unforgettable adventures across Rwanda, Uganda, and Eastern DRC.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                <Link to="/contact">Request Custom Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
                  <span className="mr-2">💬</span> WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
