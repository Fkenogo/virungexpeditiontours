import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mountain, TreePine, Bird, Palmtree, Shield, AlertTriangle, Info } from "lucide-react";
import virungaMountains from "@/assets/virunga-mountains.jpg";

const Destinations = () => {
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

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="rwanda" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="rwanda">Rwanda</TabsTrigger>
              <TabsTrigger value="uganda">Uganda</TabsTrigger>
              <TabsTrigger value="drc">Eastern DRC</TabsTrigger>
            </TabsList>

            {/* Rwanda Tab */}
            <TabsContent value="rwanda" className="space-y-12">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-primary">Rwanda - Land of a Thousand Hills</h2>
                <p className="text-lg text-foreground/80">
                  Rwanda offers some of Africa's most accessible and well-protected wildlife experiences. From mountain gorillas in volcanic rainforests to Big Five safaris in savannah plains, Rwanda packs extraordinary diversity into a compact, incredibly safe destination.
                </p>
              </div>

              {/* Volcanoes National Park */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Mountain className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Volcanoes National Park</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Home to endangered mountain gorillas and the legendary Dian Fossey research center
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Key Highlights:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Mountain Gorilla Trekking:</strong> Track habituated gorilla families through bamboo forests (1-6 hour hikes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Golden Monkey Tracking:</strong> Observe rare endemic golden monkeys in their natural habitat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Dian Fossey Tomb Hike:</strong> Visit the grave of the legendary primatologist and her gorilla research center</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Volcano Hiking:</strong> Summit Mount Bisoke or Mount Karisimbi for spectacular views</span>
                      </li>
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary mb-1">Location:</p>
                      <p className="text-foreground/80">2-3 hours drive from Kigali</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Best Time:</p>
                      <p className="text-foreground/80">Year-round, drier months June-Sept & Dec-Feb</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nyungwe Forest */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TreePine className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Nyungwe Forest National Park</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Ancient montane rainforest with chimpanzees, colobus monkeys, and incredible biodiversity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Key Highlights:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Chimpanzee Trekking:</strong> Track wild chimpanzees through ancient rainforest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Canopy Walkway:</strong> Walk 50m above the forest floor on East Africa's only canopy walkway (160m long)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Colobus Monkey Tracking:</strong> See troops of 400+ Angolan colobus monkeys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Bird Watching:</strong> 310+ bird species including 29 Albertine Rift endemics</span>
                      </li>
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary mb-1">Location:</p>
                      <p className="text-foreground/80">5 hours drive from Kigali</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Best Time:</p>
                      <p className="text-foreground/80">June-Sept, Dec-Feb (drier), March-May (bird breeding)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Akagera National Park */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Palmtree className="w-8 h-8 text-secondary" />
                    <CardTitle className="text-2xl">Akagera National Park</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Rwanda's only Big Five safari destination with lions, elephants, rhinos, leopards, and buffalo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Key Highlights:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Big Five Safaris:</strong> Game drives to spot lions, elephants, rhinos, leopards, and buffalo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Boat Safaris:</strong> Cruise Lake Ihema to see hippos, crocodiles, and waterbirds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Diverse Wildlife:</strong> Zebras, giraffes, antelope, and 500+ bird species</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Scenic Landscapes:</strong> Mix of savannah, woodland, wetlands, and lakes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary mb-1">Location:</p>
                      <p className="text-foreground/80">2.5 hours drive from Kigali</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Best Time:</p>
                      <p className="text-foreground/80">June-Sept (dry season), Dec-Feb</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lake Kivu */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Lake Kivu</CardTitle>
                  <CardDescription className="text-base">
                    One of Africa's Great Lakes offering beach relaxation, island exploration, and water activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Perfect for post-trek relaxation with beach resorts, kayaking, island hopping, coffee plantation tours, and stunning sunset views.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary mb-1">Towns:</p>
                      <p className="text-foreground/80">Gisenyi, Kibuye, Cyangugu</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Activities:</p>
                      <p className="text-foreground/80">Kayaking, boat trips, coffee tours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kigali City */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Kigali City</CardTitle>
                  <CardDescription className="text-base">
                    One of Africa's cleanest and safest capitals with powerful history and vibrant culture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Visit the Genocide Memorial, local markets, craft centers, restaurants, and experience the remarkable transformation of Rwanda's capital.
                  </p>
                </CardContent>
              </Card>

              <div className="text-center mt-8">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <Link to="/tours">Explore Rwanda Tours</Link>
                </Button>
              </div>
            </TabsContent>

            {/* Uganda Tab */}
            <TabsContent value="uganda" className="space-y-12">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-primary">Uganda - The Pearl of Africa</h2>
                <p className="text-lg text-foreground/80">
                  Uganda offers exceptional gorilla trekking opportunities in Bwindi Impenetrable Forest and Mgahinga, along with diverse wildlife experiences across its extensive national parks system.
                </p>
              </div>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Bwindi Impenetrable Forest</CardTitle>
                  <CardDescription className="text-base">
                    Home to nearly half the world's mountain gorillas across multiple sectors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span>Multiple gorilla families available for trekking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span>Gorilla Habituation Experience (4-hour encounters available)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span>Lower permit prices compared to Rwanda ($800 vs $1,500)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Mgahinga Gorilla National Park</CardTitle>
                  <CardDescription className="text-base">
                    Part of the Virunga volcanic chain, bordering Rwanda and DRC
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span>Gorilla trekking with the Nyakagezi group</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span>Golden monkey trekking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span>Volcano climbing opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Other Uganda Extensions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span><strong>Queen Elizabeth National Park:</strong> Tree-climbing lions and boat cruises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span><strong>Murchison Falls:</strong> Powerful waterfall and Big Five safaris</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span><strong>Kibale Forest:</strong> Best chimpanzee tracking in East Africa</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Uganda Gorilla Permit Pricing</h4>
                    <p className="text-blue-800 dark:text-blue-200">
                      Uganda permits are $800 (vs Rwanda's $1,500), making it an excellent option for budget-conscious travelers. However, Uganda is further from Kigali (5-6 hour drive to Bwindi) compared to Rwanda's Volcanoes Park (2-3 hours).
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <Link to="/contact">Plan Uganda Extension</Link>
                </Button>
              </div>
            </TabsContent>

            {/* DRC Tab */}
            <TabsContent value="drc" className="space-y-12">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-primary">Eastern DRC - The Adventure Frontier</h2>
                <p className="text-lg text-foreground/80">
                  For adventurous travelers, Eastern DRC's Virunga National Park offers Africa's most dramatic gorilla trekking experience with active volcanoes as backdrop.
                </p>
              </div>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Virunga National Park (DRC)</CardTitle>
                  <CardDescription className="text-base">
                    Africa's oldest national park and one of the most biodiverse protected areas on Earth
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Key Highlights:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Mountain Gorilla Trekking:</strong> Lower cost permits ($400) with dramatic volcanic scenery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Nyiragongo Volcano:</strong> Overnight hike to the world's largest lava lake</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Grauer's Gorillas:</strong> Lowland gorilla trekking in pristine rainforest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-1">✓</span>
                        <span><strong>Chimpanzee Trekking:</strong> Habituated chimps on Tchegera Island</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary mb-1">Access:</p>
                      <p className="text-foreground/80">Via Goma (border crossing from Gisenyi, Rwanda)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Permit Cost:</p>
                      <p className="text-foreground/80">$400 (mountain gorillas)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-900 dark:text-orange-100">Important Safety Information</h4>
                    <p className="text-orange-800 dark:text-orange-200 mb-3">
                      Eastern DRC requires careful planning and updated security information. While Virunga National Park maintains high safety standards within the park, the region can be politically sensitive.
                    </p>
                    <p className="text-orange-800 dark:text-orange-200">
                      We only operate DRC trips when security conditions permit and always provide updated safety briefings. This is best suited for adventurous, flexible travelers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900 dark:text-green-100">Why Visit Virunga (DRC)?</h4>
                    <ul className="space-y-1 text-green-800 dark:text-green-200">
                      <li>• Most affordable gorilla permits in the region ($400)</li>
                      <li>• Unique combination of gorillas + active volcano</li>
                      <li>• Access to both mountain and lowland gorillas</li>
                      <li>• Supporting one of conservation's most heroic projects</li>
                      <li>• Fewer tourists = more intimate experience</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <Link to="/contact">Inquire About DRC Trips</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us create a custom itinerary combining the best destinations for your interests, budget, and timeframe.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
