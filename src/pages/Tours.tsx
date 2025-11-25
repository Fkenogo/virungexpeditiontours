import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, TrendingUp } from "lucide-react";
import heroGorilla from "@/assets/hero-gorilla.jpg";
import goldenMonkeys from "@/assets/golden-monkeys.jpg";
import chimpanzees from "@/assets/chimpanzees.jpg";
import akageraSafari from "@/assets/akagera-safari.jpg";
import canopyWalkway from "@/assets/canopy-walkway.jpg";
import virungaMountains from "@/assets/virunga-mountains.jpg";

const Tours = () => {
  const tours = [
    {
      id: "gorilla-trekking",
      title: "Mountain Gorilla Trekking",
      subtitle: "The Ultimate Wildlife Encounter",
      location: "Volcanoes National Park",
      duration: "Full Day Experience",
      difficulty: "Moderate to Challenging",
      image: heroGorilla,
      description: "Stand face-to-face with endangered mountain gorillas in their natural habitat. This life-changing experience in Volcanoes National Park ranks among the world's greatest wildlife encounters.",
      link: "/tours/gorilla-trekking"
    },
    {
      id: "golden-monkey",
      title: "Golden Monkey Tracking",
      subtitle: "Playful Bamboo Forest Primates",
      location: "Volcanoes National Park",
      duration: "Half Day",
      difficulty: "Easy to Moderate",
      image: goldenMonkeys,
      description: "Watch endangered golden monkeys leap through bamboo forests with incredible energy and playfulness. Their striking golden fur makes for stunning photography.",
      link: "/tours/golden-monkey"
    },
    {
      id: "chimpanzee",
      title: "Chimpanzee Trekking",
      subtitle: "Meet Our Closest Relatives",
      location: "Nyungwe Forest National Park",
      duration: "Half to Full Day",
      difficulty: "Moderate to Challenging",
      image: chimpanzees,
      description: "Trek through ancient rainforest to observe wild chimpanzees. Watch as they feed, play, and communicate with complex vocalizations in one of Africa's oldest forests.",
      link: "/tours/chimpanzee"
    },
    {
      id: "colobus-monkey",
      title: "Colobus Monkey Tracking",
      subtitle: "Spectacular Super-Troops",
      location: "Nyungwe Forest National Park",
      duration: "Half Day",
      difficulty: "Easy",
      image: chimpanzees,
      description: "Observe troops of 300+ black and white colobus monkeys in stunning rainforest settings. Perfect for families and those wanting easier primate experiences.",
      link: "/tours/colobus-monkey"
    },
    {
      id: "canopy-walkway",
      title: "Canopy Walkway",
      subtitle: "Treetop Adventure",
      location: "Nyungwe Forest National Park",
      duration: "2-3 Hours",
      difficulty: "Easy",
      image: canopyWalkway,
      description: "Walk 70 meters above the forest floor on East Africa's only canopy walkway. Experience the rainforest from a bird's eye view with stunning panoramic vistas.",
      link: "/tours/canopy-walkway"
    },
    {
      id: "dian-fossey-hike",
      title: "Dian Fossey Tomb Hike",
      subtitle: "Conservation History",
      location: "Volcanoes National Park",
      duration: "Half Day",
      difficulty: "Moderate",
      image: virungaMountains,
      description: "Trek to the final resting place of legendary primatologist Dian Fossey. A moving tribute to the woman who saved mountain gorillas from extinction.",
      link: "/tours/dian-fossey-hike"
    },
    {
      id: "akagera-safari",
      title: "Akagera National Park Safari",
      subtitle: "Rwanda's Big Five Experience",
      location: "Akagera National Park",
      duration: "1-3 Days",
      difficulty: "Easy",
      image: akageraSafari,
      description: "Classic African safari with lions, elephants, rhinos, buffalo, leopards, giraffes, zebras, and more. Game drives and boat safaris on scenic Lake Ihema.",
      link: "/tours/akagera-safari"
    },
    {
      id: "kigali-tour",
      title: "Kigali City Tour",
      subtitle: "Rwanda's Vibrant Capital",
      location: "Kigali",
      duration: "Half to Full Day",
      difficulty: "Easy",
      image: virungaMountains,
      description: "Explore Kigali's genocide memorial, vibrant markets, art centers, and modern development. Essential context for understanding Rwanda's inspiring story.",
      link: "/tours/kigali-city-tour"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rwanda Tours & Safari Experiences</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover Rwanda's Extraordinary Wildlife and Landscapes
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground/90 mb-6">
              Rwanda, the "Land of a Thousand Hills," offers some of Africa's most profound wildlife encounters. From endangered mountain gorillas in misty volcanic forests to chimpanzees in ancient rainforests and Big Five safaris in savannah landscapes, Rwanda delivers unforgettable moments at every turn.
            </p>
            <p className="text-lg text-foreground/90">
              Virunga Expedition Tours specializes in creating seamless, expertly-guided experiences across all of Rwanda's premier wildlife destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Our Rwanda Safari Experiences</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tours.map((tour) => (
              <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{tour.title}</h3>
                    <p className="text-sm opacity-90">{tour.subtitle}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>{tour.difficulty}</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-6">
                    {tour.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Link to={tour.link} className="flex-1">
                      <Button className="w-full">Learn More</Button>
                    </Link>
                    <Button variant="outline" className="flex-1">Request Quote</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Experiences */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Popular Tour Combinations</h2>
            <p className="text-lg text-center text-foreground/80 mb-12">
              Many travelers combine multiple experiences for a comprehensive Rwanda adventure:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-secondary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary">Gorillas & Golden Monkeys</h3>
                  <p className="text-foreground/80">Two-day Volcanoes Park experience combining both primate encounters</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary">Primates & Safari</h3>
                  <p className="text-foreground/80">Gorillas in Volcanoes Park plus Akagera game drives for complete wildlife experience</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary">Complete Rwanda</h3>
                  <p className="text-foreground/80">Gorillas, Chimps, and Safari across all major parks (7-10 days)</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary">Family Adventure</h3>
                  <p className="text-foreground/80">Golden monkeys, Akagera, and cultural experiences (no gorilla age restrictions)</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Link to="/itineraries">
                <Button size="lg" className="mr-4">View Sample Itineraries</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Create Custom Package</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Rwanda Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team will help you select the perfect combination of experiences based on your interests, timeframe, and budget.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90">
              Request Custom Quote
            </Button>
            <Button size="lg" variant="outlineLight">
              WhatsApp: +250 783 959 404
            </Button>
            <Button size="lg" variant="outlineLight">
              Call: +250 783 007 010
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;