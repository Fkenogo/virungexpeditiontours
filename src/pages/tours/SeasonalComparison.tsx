import { ImageComparison } from '@/components/ImageComparison';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import akageraWildlife from '@/assets/akagera-wildlife.jpeg';
import akageraSafari from '@/assets/akagera-safari.jpg';
import virungaMountains from '@/assets/virunga-mountains.jpg';
import gorillaHero from '@/assets/hero-gorilla.jpg';
import canopyWalkway from '@/assets/canopy-walkway.jpg';
import canopyWalkNyungwe from '@/assets/canopy-walk-nyungwe.jpg';

const SeasonalComparison = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={virungaMountains}
            alt="Seasonal changes in Rwanda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Seasonal Wildlife Comparisons
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Discover how Rwanda's parks transform throughout the year
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Rwanda Year-Round</h2>
            <p className="text-lg text-muted-foreground">
              Rwanda's climate creates distinct seasons that bring unique experiences to each national park. 
              Use the interactive sliders below to compare how landscapes and wildlife viewing change throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {/* Akagera Safari */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">Akagera National Park</CardTitle>
                <CardDescription>
                  Dry season (June-September) offers better wildlife viewing with animals gathering at water sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageComparison
                  beforeImage={{
                    src: akageraSafari,
                    alt: "Akagera during wet season",
                    label: "Wet Season"
                  }}
                  afterImage={{
                    src: akageraWildlife,
                    alt: "Akagera during dry season",
                    label: "Dry Season"
                  }}
                  defaultSliderPosition={50}
                />
                <div className="mt-6 flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/tours/akagera-safari">View Akagera Safari</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Volcanoes National Park */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">Volcanoes National Park</CardTitle>
                <CardDescription>
                  Mountain gorillas can be tracked year-round, though trails are easier during dry months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageComparison
                  beforeImage={{
                    src: virungaMountains,
                    alt: "Volcanoes Park in wet season",
                    label: "Wet Season"
                  }}
                  afterImage={{
                    src: gorillaHero,
                    alt: "Volcanoes Park in dry season",
                    label: "Dry Season"
                  }}
                  defaultSliderPosition={50}
                />
                <div className="mt-6 flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/tours/gorilla-trekking">View Gorilla Trekking</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/tours/golden-monkey">View Golden Monkey Tracking</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Nyungwe Forest */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">Nyungwe Forest National Park</CardTitle>
                <CardDescription>
                  The canopy walkway and primate tracking are stunning in all seasons, with lush greenery after rains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageComparison
                  beforeImage={{
                    src: canopyWalkNyungwe,
                    alt: "Nyungwe during wet season",
                    label: "Wet Season"
                  }}
                  afterImage={{
                    src: canopyWalkway,
                    alt: "Nyungwe during dry season",
                    label: "Dry Season"
                  }}
                  defaultSliderPosition={50}
                />
                <div className="mt-6 flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/tours/chimpanzee">View Chimpanzee Tracking</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/tours/canopy-walkway">View Canopy Walkway</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">When to Visit Rwanda</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Dry Season (June - September)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-semibold">Best for:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Wildlife viewing in Akagera</li>
                  <li>Easier trekking conditions</li>
                  <li>Clear mountain views</li>
                  <li>Photography opportunities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wet Season (March - May, October - November)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-semibold">Best for:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Lush green landscapes</li>
                  <li>Fewer tourists</li>
                  <li>Lower permit prices</li>
                  <li>Birdwatching season</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Safari?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you choose the perfect time for your Rwanda adventure based on your preferences
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/tours">Browse All Tours</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeasonalComparison;
