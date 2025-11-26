import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CloudRain, Sun, Leaf, Users, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-gorilla-family.jpg";

const SeasonalGuide = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Seasonal Travel Guide" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Seasonal Travel Guide
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Plan your perfect visit: weather patterns, wildlife viewing, and permit availability throughout the year
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Year-Round Wildlife Encounters</h2>
            <p className="text-lg text-muted-foreground">
              Rwanda, Uganda, and Eastern DRC offer incredible wildlife experiences throughout the year. 
              Each season brings unique advantages for different activities and destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Seasons Overview */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Sun className="h-8 w-8 text-secondary" />
                  <CardTitle className="text-2xl">Dry Season (Peak)</CardTitle>
                </div>
                <Badge className="w-fit">June - September & December - February</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Weather Conditions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Minimal rainfall, clear skies</li>
                    <li>• Daytime: 20-25°C (68-77°F)</li>
                    <li>• Cooler mornings in highlands</li>
                    <li>• Excellent visibility for photography</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-secondary">Best For</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span><strong>Gorilla Trekking:</strong> Easier hiking conditions, drier trails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span><strong>Akagera Safari:</strong> Animals gather at water sources, easier spotting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span><strong>Chimpanzee Tracking:</strong> Clearer forest paths, better viewing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span><strong>Canopy Walkway:</strong> Stunning views, comfortable conditions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Permit Availability</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-destructive">High Demand:</strong> Book 3-6 months in advance. 
                    Peak season prices apply. Limited last-minute availability.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <CloudRain className="h-8 w-8 text-accent" />
                  <CardTitle className="text-2xl">Wet Season (Green)</CardTitle>
                </div>
                <Badge variant="outline" className="w-fit">March - May & October - November</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Weather Conditions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Afternoon rain showers (1-2 hours)</li>
                    <li>• Daytime: 18-23°C (64-73°F)</li>
                    <li>• Lush green landscapes</li>
                    <li>• Muddy trails in highland parks</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-accent">Advantages</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Lower Prices:</strong> Discounted permits and accommodation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Fewer Crowds:</strong> More intimate wildlife encounters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Lush Scenery:</strong> Spectacular green landscapes, waterfalls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Bird Watching:</strong> Migratory species, active breeding</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Permit Availability</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Better Availability:</strong> Easier booking, 
                    last-minute permits possible. Some operators offer rainy season discounts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Destination-Specific Guide */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Best Times by Destination</h2>
          
          <div className="space-y-8">
            {/* Rwanda - Volcanoes National Park */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Rwanda: Volcanoes National Park</CardTitle>
                    <p className="text-muted-foreground">Gorilla & Golden Monkey Trekking</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">Year-Round Destination</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Sun className="h-5 w-5 text-secondary" />
                      Peak Season (Jun-Sep, Dec-Feb)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Easier trekking conditions</li>
                      <li>✓ Clear mountain views</li>
                      <li>✓ Best for photography</li>
                      <li>⚠️ Book permits 4-6 months ahead</li>
                      <li>⚠️ More trekkers on trails</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-accent" />
                      Green Season (Mar-May, Oct-Nov)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ 20% cheaper permits possible</li>
                      <li>✓ Smaller trekking groups</li>
                      <li>✓ Lush bamboo forests</li>
                      <li>⚠️ Muddy, slippery trails</li>
                      <li>⚠️ Afternoon rain likely</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>June-September</strong> for first-time visitors. 
                      <strong> April-May</strong> for budget-conscious travelers seeking 
                      solitude and willing to trek in rain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rwanda - Nyungwe Forest */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Rwanda: Nyungwe Forest</CardTitle>
                    <p className="text-muted-foreground">Chimpanzees, Colobus Monkeys & Canopy Walk</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">Year-Round Destination</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Sun className="h-5 w-5 text-secondary" />
                      Peak Season (Jun-Sep, Dec-Feb)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Drier forest trails</li>
                      <li>✓ Easier chimp tracking</li>
                      <li>✓ Clear canopy walkway views</li>
                      <li>✓ Less leeches and mud</li>
                      <li>⚠️ Chimps may be higher in trees</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-accent" />
                      Green Season (Mar-May, Oct-Nov)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Chimps feed on lower branches</li>
                      <li>✓ Better primate encounters</li>
                      <li>✓ Spectacular waterfalls</li>
                      <li>✓ Vibrant bird activity</li>
                      <li>⚠️ Wet, slippery forest paths</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>July-August</strong> for canopy walks and hiking. 
                      <strong> March-April</strong> for best chimpanzee viewing 
                      (they're closer to ground level).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rwanda - Akagera National Park */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Rwanda: Akagera National Park</CardTitle>
                    <p className="text-muted-foreground">Big Five Safaris & Boat Tours</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">Best: June-September</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Sun className="h-5 w-5 text-secondary" />
                      Peak Season (Jun-Sep, Dec-Feb)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Animals at water holes</li>
                      <li>✓ Easier wildlife spotting</li>
                      <li>✓ Dry roads for game drives</li>
                      <li>✓ Prime lion sightings</li>
                      <li>✓ Excellent photography</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-accent" />
                      Green Season (Mar-May, Oct-Nov)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Lush landscapes, baby animals</li>
                      <li>✓ Migratory bird species</li>
                      <li>✓ Lower accommodation rates</li>
                      <li>⚠️ Animals dispersed (water everywhere)</li>
                      <li>⚠️ Some tracks may be muddy</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>June-September</strong> for guaranteed Big Five sightings. 
                      Combine with gorilla trekking for the ultimate Rwanda experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uganda - Bwindi */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Uganda: Bwindi Impenetrable Forest</CardTitle>
                    <p className="text-muted-foreground">Gorilla Trekking in Uganda's Wilderness</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">Year-Round Destination</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Sun className="h-5 w-5 text-secondary" />
                      Peak Season (Jun-Sep, Dec-Feb)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Better hiking conditions</li>
                      <li>✓ Less rain during treks</li>
                      <li>✓ Clearer forest paths</li>
                      <li>⚠️ More trekkers present</li>
                      <li>⚠️ Higher accommodation costs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-accent" />
                      Green Season (Mar-May, Oct-Nov)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Cheaper Uganda permits (USD $400 vs $700)</li>
                      <li>✓ Fewer tourists, more solitude</li>
                      <li>✓ Gorillas easier to find (eating low)</li>
                      <li>⚠️ Very challenging terrain</li>
                      <li>⚠️ Heavy afternoon rains</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>June-August</strong> for easier trekking. 
                      <strong> April-May</strong> to save $300 on permits if you don't mind rain and mud.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eastern DRC - Virunga */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Eastern DRC: Virunga National Park</CardTitle>
                    <p className="text-muted-foreground">Gorillas & Nyiragongo Volcano</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">Best: June-September</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Sun className="h-5 w-5 text-secondary" />
                      Peak Season (Jun-Sep, Dec-Feb)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Best for volcano treks</li>
                      <li>✓ Clear lava lake views</li>
                      <li>✓ Safer hiking conditions</li>
                      <li>✓ Optimal gorilla trekking</li>
                      <li>⚠️ Limited permit availability</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-accent" />
                      Green Season (Mar-May, Oct-Nov)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Fewer adventurers, exclusivity</li>
                      <li>✓ Dramatic storm backdrops</li>
                      <li>⚠️ Volcano treks may be closed</li>
                      <li>⚠️ Challenging, muddy trails</li>
                      <li>⚠️ Security considerations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>June-September</strong> only. Virunga requires optimal 
                      conditions. We closely monitor security and only operate during safe periods.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Permit Booking Timeline */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Permit Booking Timeline</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold">
                        6+
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">6+ Months in Advance</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Peak Season (Dec-Feb, Jun-Sep):</strong> Rwanda gorilla permits, 
                        Uganda peak season permits, Virunga DRC permits. Essential for large groups and specific dates.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                        3-4
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">3-4 Months in Advance</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Shoulder Season:</strong> Good availability for most parks. 
                        Rwanda permits still recommended, Uganda more flexible. Akagera and Nyungwe usually available.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                        1-2
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">1-2 Months in Advance</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Green Season (Mar-May, Oct-Nov):</strong> Last-minute permits often 
                        available. Good for flexible travelers. Chimpanzee and golden monkey tracking readily available.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Pro Tip:</strong> We monitor permit availability daily and can secure 
                      last-minute permits when possible. Contact us immediately if you need urgent bookings—we 
                      have direct relationships with park authorities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Packing Guide by Season */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What to Pack by Season</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-6 w-6 text-secondary" />
                  Dry Season Packing List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Light, breathable hiking clothes</li>
                  <li>✓ Sturdy waterproof hiking boots</li>
                  <li>✓ Light rain jacket (brief showers possible)</li>
                  <li>✓ Sun hat and sunglasses</li>
                  <li>✓ Sunscreen (SPF 50+)</li>
                  <li>✓ Insect repellent</li>
                  <li>✓ Warm fleece for early mornings</li>
                  <li>✓ Camera with dust protection</li>
                  <li>✓ Binoculars for wildlife</li>
                  <li>✓ Daypack (20-30L)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="h-6 w-6 text-accent" />
                  Wet Season Packing List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ High-quality rain jacket (waterproof)</li>
                  <li>✓ Rain pants or gaiters</li>
                  <li>✓ Extra pair of hiking boots (backup)</li>
                  <li>✓ Quick-dry clothing (multiple layers)</li>
                  <li>✓ Waterproof backpack cover</li>
                  <li>✓ Dry bags for electronics</li>
                  <li>✓ Gardening gloves (muddy trails)</li>
                  <li>✓ Extra socks (you'll need them!)</li>
                  <li>✓ Camera rain cover</li>
                  <li>✓ Zip-lock bags for phone/camera</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Perfect Visit?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let our experts help you choose the ideal time for your African adventure. We'll secure permits, 
            recommend the best season for your priorities, and handle every detail.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <Link to="/tours">Browse Our Tours</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href="https://wa.me/250783959404" target="_blank" rel="noopener noreferrer">
                WhatsApp for Advice
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeasonalGuide;
