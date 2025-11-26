import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import heroGorilla from "@/assets/hero-gorilla.jpg";
import akageraSafari from "@/assets/akagera-safari.jpg";
import chimpanzees from "@/assets/chimpanzees.jpg";

const Itineraries = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const location = useLocation();

  const filters = [
    { id: "all", label: "All Itineraries" },
    { id: "3-day", label: "3 Day Tours" },
    { id: "5-day", label: "5 Day Tours" },
    { id: "7-day", label: "7 Day Tours" },
    { id: "10-day", label: "10+ Day Tours" },
    { id: "multi-country", label: "Multi-Country" },
    { id: "family", label: "Family-Friendly" },
  ];

  // Handle hash-based navigation to specific itinerary
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setExpandedId(hash);
        }
      }, 100);
    }
  }, [location.hash]);

  const itineraries = [
    {
      id: "3-day-primates",
      title: "3-Day Rwanda Primate Safari",
      duration: "3 Days / 2 Nights",
      destinations: "Kigali | Volcanoes National Park",
      image: heroGorilla,
      category: "3-day",
      popular: false,
      family: false,
      highlights: [
        "Mountain gorilla trekking",
        "Golden monkey tracking",
        "Twin Lakes visit",
        "Kigali Genocide Memorial",
        "Cultural experiences"
      ],
      summary: "Perfect introduction to Rwanda's primates in a short timeframe. Experience mountain gorillas and golden monkeys with Kigali cultural immersion.",
      days: [
        "Day 1: Arrive Kigali, city tour, transfer to Volcanoes NP",
        "Day 2: Gorilla trekking, afternoon Twin Lakes",
        "Day 3: Golden monkeys, return to Kigali for departure"
      ],
      idealFor: "Short visits • First-time Rwanda visitors • Primate enthusiasts • Time-constrained travelers"
    },
    {
      id: "5-day-primates-safari",
      title: "5-Day Primates & Safari",
      duration: "5 Days / 4 Nights",
      destinations: "Kigali | Akagera | Volcanoes",
      image: akageraSafari,
      category: "5-day",
      popular: true,
      family: true,
      highlights: [
        "Mountain gorilla trekking",
        "Golden monkey tracking",
        "Full-day Akagera game drives",
        "Boat safari on Lake Ihema",
        "Kigali city exploration",
        "Twin Lakes scenic visit"
      ],
      summary: "Our most popular package! Combines gorilla trekking, golden monkeys, and Big Five safari for a comprehensive Rwanda wildlife experience.",
      days: [
        "Day 1: Arrive Kigali, city tour, relax",
        "Day 2: Transfer to Akagera, afternoon game drive",
        "Day 3: Full-day Akagera (game drive + boat safari), transfer to Kigali",
        "Day 4: Transfer to Volcanoes NP, relax or cultural village",
        "Day 5: Gorilla trekking, afternoon Twin Lakes or golden monkeys"
      ],
      idealFor: "First-time Rwanda visitors • Balanced wildlife experience • Families (note: gorilla minimum age 15) • Most comprehensive short safari"
    },
    {
      id: "7-day-best-rwanda",
      title: "7-Day Best of Rwanda Safari",
      duration: "7 Days / 6 Nights",
      destinations: "All Major Parks",
      image: chimpanzees,
      category: "7-day",
      popular: true,
      family: false,
      highlights: [
        "Mountain gorilla trekking (Volcanoes NP)",
        "Chimpanzee trekking (Nyungwe Forest)",
        "Colobus monkey tracking",
        "Nyungwe canopy walkway",
        "Akagera Big Five safari",
        "Lake Kivu relaxation",
        "Kigali cultural sites",
        "Traditional village experience"
      ],
      summary: "Experience everything Rwanda offers: gorillas, chimpanzees, Big Five safari, canopy walks, and cultural encounters. Our most comprehensive Rwanda-only itinerary.",
      days: [
        "Day 1: Arrive Kigali, city tour (Genocide Memorial, markets)",
        "Day 2: Transfer to Akagera, afternoon game drive",
        "Day 3: Full day Akagera (game drives + boat safari on Lake Ihema)",
        "Day 4: Transfer to Nyungwe Forest, stop at King's Palace & Ethnographic Museum",
        "Day 5: Chimpanzee trekking, afternoon canopy walkway",
        "Day 6: Transfer to Lake Kivu, boat rides and relaxation",
        "Day 7: Transfer to Volcanoes NP, optional cultural village"
      ],
      idealFor: "First-time visitors wanting complete experience • Wildlife & primate enthusiasts • Photographers • Those with time to explore thoroughly"
    },
    {
      id: "3-day-highlights",
      title: "3-Day Rwanda Highlights",
      duration: "3 Days / 2 Nights",
      destinations: "Kigali | Akagera | Volcanoes",
      image: heroGorilla,
      category: "3-day",
      popular: false,
      family: false,
      highlights: [
        "Mountain gorilla trekking",
        "Akagera game drives",
        "Boat safari on Lake Ihema",
        "Kigali city tour"
      ],
      summary: "Experience both Rwanda's gorillas and Big Five safari in three action-packed days.",
      days: [
        "Day 1: Arrive Kigali, city tour, transfer to Volcanoes",
        "Day 2: Gorilla trekking",
        "Day 3: Transfer to Akagera, game drive & boat safari, return to Kigali"
      ],
      idealFor: "Wildlife enthusiasts wanting diverse experiences • Short but comprehensive Rwanda visit • Active travelers"
    },
    {
      id: "10-day-grand-safari",
      title: "10-Day Grand Rwanda Safari",
      duration: "10 Days / 9 Nights",
      destinations: "Complete Rwanda Experience",
      image: akageraSafari,
      category: "10-day",
      popular: false,
      family: false,
      highlights: [
        "Multiple gorilla treks",
        "Chimpanzee trekking",
        "Golden monkeys",
        "Extended Akagera safari",
        "Lake Kivu relaxation",
        "Cultural immersion",
        "All major parks"
      ],
      summary: "The ultimate Rwanda adventure combining all wildlife experiences with ample time in each destination. Perfect for photographers and wildlife enthusiasts.",
      days: [
        "Day 1-2: Kigali arrival and exploration",
        "Day 3-4: Akagera National Park safari",
        "Day 5-6: Nyungwe Forest - chimpanzees and canopy walk",
        "Day 7: Lake Kivu relaxation",
        "Day 8-9: Volcanoes NP - gorillas and golden monkeys",
        "Day 10: Return to Kigali for departure"
      ],
      idealFor: "Comprehensive wildlife experience • Photographers • Luxury travelers • Those wanting in-depth exploration"
    },
    {
      id: "5-day-lake-kivu",
      title: "5-Day Game Drives, Gorillas & Lake Kivu",
      duration: "5 Days / 4 Nights",
      destinations: "Complete Rwanda Circuit",
      image: heroGorilla,
      category: "5-day",
      popular: false,
      family: true,
      highlights: [
        "Akagera Big Five safari",
        "Mountain gorilla trekking",
        "Lake Kivu boat rides & relaxation",
        "Scenic drives through Rwanda's hills",
        "Cultural experiences"
      ],
      summary: "Wildlife adventures combined with lakeside relaxation at beautiful Lake Kivu.",
      days: [
        "Day 1: Kigali city tour, transfer to Akagera",
        "Day 2: Full day Akagera safari (game drives + boat)",
        "Day 3: Transfer to Volcanoes NP, stop at Lake Kivu",
        "Day 4: Gorilla trekking, afternoon relaxation",
        "Day 5: Transfer to Lake Kivu, boat rides, drive to Kigali"
      ],
      idealFor: "Those wanting relaxation + adventure • Photographers (diverse landscapes) • Honeymoons • Balanced pace travelers"
    },
    {
      id: "uganda-gorilla-primate",
      title: "8-10 Day Uganda Gorilla & Primate Experience",
      duration: "8-10 Days / 7-9 Nights",
      destinations: "Bwindi | Mgahinga | Lake Bunyonyi | Queen Elizabeth | Kibale",
      image: heroGorilla,
      category: "multi-country",
      popular: true,
      family: false,
      highlights: [
        "Mountain gorilla trekking in Bwindi ($800 permit)",
        "Gorilla Habituation Experience option (4 hours with gorillas)",
        "Golden monkey tracking in Mgahinga",
        "Volcano hiking (Mt. Muhabura, Gahinga, or Sabyinyo)",
        "Chimpanzee trekking in Kibale Forest",
        "Tree-climbing lions in Queen Elizabeth NP",
        "Lake Bunyonyi relaxation (Africa's 2nd deepest lake)",
        "Kazinga Channel boat safari",
        "Batwa cultural experiences"
      ],
      summary: "Experience Uganda's incredible primate diversity with lower-cost gorilla permits, the unique Gorilla Habituation Experience, and diverse wildlife across multiple ecosystems.",
      days: [
        "Day 1: Arrive Entebbe/Kigali, transfer to Bwindi Impenetrable Forest (4-5 hours from Kigali)",
        "Day 2: Mountain gorilla trekking in Bwindi - one of 19 habituated families across four sectors",
        "Day 3: Optional second gorilla trek OR transfer to Mgahinga Gorilla National Park",
        "Day 4: Golden monkey tracking and volcano hiking in Mgahinga, transfer to Lake Bunyonyi",
        "Day 5: Lake Bunyonyi relaxation - island hopping, canoeing, swimming in bilharzia-free waters",
        "Day 6: Transfer to Queen Elizabeth National Park, afternoon game drive",
        "Day 7: Full day Queen Elizabeth - morning Kazinga Channel boat safari, afternoon game drive in Ishasha sector for tree-climbing lions",
        "Day 8: Transfer to Kibale Forest National Park",
        "Day 9: Chimpanzee trekking in Kibale (90% success rate), optional Bigodi Wetland walk",
        "Day 10: Return to Entebbe/Kampala for departure or extend trip"
      ],
      idealFor: "Cost-conscious gorilla trekkers • Primate enthusiasts • Those wanting extended gorilla time via habituation • Adventurous travelers • Photographers seeking diverse landscapes"
    },
    {
      id: "congo-adventure",
      title: "5-Day Congo Adventure - Gorillas & Nyiragongo Volcano",
      duration: "5 Days / 4 Nights",
      destinations: "Kigali | Virunga National Park | Nyiragongo Volcano",
      image: akageraSafari,
      category: "5-day",
      popular: true,
      family: false,
      highlights: [
        "Mountain gorilla trekking in Virunga ($400 permit - lowest price)",
        "Nyiragongo volcano summit - world's largest lava lake",
        "Overnight camping on volcano crater rim",
        "Support Africa's most endangered park and heroic rangers",
        "Combine two of Africa's most dramatic experiences",
        "Armed ranger escorts throughout",
        "Dramatic volcanic landscapes"
      ],
      summary: "Combine affordable gorilla trekking with one of Earth's most spectacular natural phenomena - camping overnight on the rim of an active volcano with the world's largest lava lake churning below.",
      days: [
        "Day 1: Arrive Kigali, Rwanda. City tour including Genocide Memorial. Transfer to hotel near Gisenyi/Goma border. Safety briefing for DRC entry.",
        "Day 2: Cross Grande Barrier border into Goma, DRC. Met by Virunga Foundation team with armed ranger escorts. Transfer to Bukima or Mikeno Lodge. Afternoon relaxation and trek preparation briefing.",
        "Day 3: Mountain gorilla trekking in Virunga National Park. Early morning departure to track one of the habituated families. One hour with gorillas. Return to lodge, afternoon at leisure enjoying volcano views.",
        "Day 4: Transfer to Kibati Ranger Post (1,989m). Begin Nyiragongo volcano ascent at 8:00 AM. 5-7 hour climb gaining 1,500m through lava fields and forests to summit at 3,470m. Settle into crater rim cabin. Watch lava lake activity all night - nature's most hypnotic spectacle.",
        "Day 5: Sunrise over lava lake (weather permitting). Descend volcano (3-4 hours). Transfer back to Goma, cross to Rwanda. Drive to Kigali for evening departure OR extend with Lake Kivu relaxation."
      ],
      idealFor: "Adventure seekers • Volcano enthusiasts • Budget-conscious gorilla trekkers • Those wanting unique combinations • Fit travelers (volcano requires good fitness) • Conservation supporters"
    },
    {
      id: "ultimate-virunga",
      title: "10-12 Day Ultimate Virunga Massive Experience",
      duration: "10-12 Days / 9-11 Nights",
      destinations: "Rwanda | Uganda | DRC - Complete Virunga Conservation Area",
      image: chimpanzees,
      category: "multi-country",
      popular: false,
      family: false,
      highlights: [
        "Gorilla trekking in ALL THREE COUNTRIES (Rwanda, Uganda, DRC)",
        "Golden monkey tracking in Rwanda and Uganda",
        "Nyiragongo volcano summit with lava lake overnight",
        "Chimpanzee trekking in Nyungwe Forest",
        "Dian Fossey tomb hike in Rwanda",
        "Lake Kivu relaxation between adventures",
        "Batwa cultural experiences",
        "Support conservation across entire Virunga Massif",
        "Complete primate and volcanic experience"
      ],
      summary: "The ultimate Central African adventure - gorilla trekking in three countries, active volcano summit, chimpanzees, golden monkeys, and cultural immersion across the entire Virunga Massif ecosystem.",
      days: [
        "Day 1: Arrive Kigali, Rwanda. City tour including Genocide Memorial, craft markets, local lunch. Transfer to Musanze near Volcanoes National Park. Welcome dinner.",
        "Day 2: Mountain gorilla trekking in Volcanoes National Park, Rwanda ($1,500 permit). Afternoon visit Twin Lakes or Ellen DeGeneres Campus. Evening cultural village visit.",
        "Day 3: Golden monkey tracking in Volcanoes NP. Afternoon: Optional Dian Fossey tomb hike OR transfer to Lake Kivu for sunset.",
        "Day 4: Morning at Lake Kivu - boat rides, swimming, kayaking. Afternoon transfer south toward Uganda border.",
        "Day 5: Cross into Uganda at Cyanika border. Transfer to Bwindi Impenetrable Forest (4-5 hours total from Musanze). Choose sector: Buhoma, Ruhija, Rushaga, or Nkuringo.",
        "Day 6: Mountain gorilla trekking in Bwindi, Uganda ($800 permit). Trek one of 19 habituated families. Evening: Batwa cultural experience learning forest skills from original inhabitants.",
        "Day 7: Optional second Uganda gorilla trek OR Gorilla Habituation Experience (4 hours with gorillas, $1,500) OR transfer to Mgahinga Gorilla National Park.",
        "Day 8: If in Mgahinga: Golden monkey tracking and volcano hiking (summit Mt. Gahinga or Mt. Muhabura). Transfer toward DRC border. Stay at Lake Kivu or near Gisenyi.",
        "Day 9: Cross Grande Barrier into Goma, DRC. Met by Virunga Foundation team. Transfer to Kibati Ranger Post. Begin Nyiragongo volcano ascent (5-7 hours). Overnight in crater rim cabin watching world's largest lava lake.",
        "Day 10: Sunrise over lava lake. Descend volcano (3-4 hours). Option A: Mountain gorilla trekking in Virunga National Park, DRC ($400 permit). OR Option B: Rest and relaxation. Transfer to Mikeno Lodge or back to Rwanda.",
        "Day 11 (Optional): If gorilla trek not done Day 10, complete DRC gorilla experience this morning. Transfer back to Rwanda. Drive to Nyungwe Forest (5-6 hours) OR return to Kigali area.",
        "Day 12: If extended to Nyungwe: Chimpanzee trekking and canopy walkway. Return to Kigali for evening departure. OR: Depart Kigali from Day 11 location."
      ],
      idealFor: "Ultimate primate enthusiasts • Multi-country adventurers • Conservation supporters wanting to help all three countries • Photographers seeking comprehensive documentation • Those with time and budget for complete experience • Fit travelers (includes volcano climb)"
    }
  ];

  const filteredItineraries = activeFilter === "all" 
    ? itineraries 
    : itineraries.filter(item => {
        if (activeFilter === "family") return item.family;
        return item.category === activeFilter;
      });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Safari Itineraries</h1>
          <p className="text-xl md:text-2xl">Sample Tours & Travel Packages</p>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Explore our carefully crafted sample itineraries showcasing the best wildlife experiences across Rwanda, Uganda, and Eastern DRC. Every itinerary can be customized to match your interests, budget, and travel style.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="transition-all"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredItineraries.map((itinerary) => (
              <Card 
                key={itinerary.id} 
                id={itinerary.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {itinerary.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-secondary text-white">
                      <Star className="w-3 h-3 mr-1" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={itinerary.image} 
                    alt={itinerary.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{itinerary.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{itinerary.duration}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{itinerary.destinations}</span>
                  </div>
                  
                  <p className="text-foreground/80 mb-4">
                    {itinerary.summary}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-sm text-primary">Highlights:</h4>
                    <ul className="space-y-1">
                      {itinerary.highlights.slice(0, 4).map((highlight, idx) => (
                        <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                          <span className="text-secondary mt-0.5">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <Users className="w-4 h-4" />
                      <span>{itinerary.idealFor}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => setExpandedId(expandedId === itinerary.id ? null : itinerary.id)}
                    >
                      {expandedId === itinerary.id ? "Hide Details" : "View Full Itinerary"}
                    </Button>
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full">Request Quote</Button>
                    </Link>
                  </div>

                  {/* Expandable Full Itinerary Details */}
                  {expandedId === itinerary.id && (
                    <div className="mt-6 pt-6 border-t space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-primary">Complete Day-by-Day Itinerary</h4>
                        <ul className="space-y-3">
                          {itinerary.days.map((day, idx) => (
                            <li key={idx} className="text-sm text-foreground/80 flex gap-3">
                              <span className="font-semibold text-secondary shrink-0">
                                {day.split(':')[0]}:
                              </span>
                              <span>{day.split(':').slice(1).join(':').trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {itinerary.highlights.length > 4 && (
                        <div>
                          <h4 className="font-semibold text-sm text-primary mb-2">All Highlights:</h4>
                          <ul className="space-y-1">
                            {itinerary.highlights.map((highlight, idx) => (
                              <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                                <span className="text-secondary mt-0.5">✓</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-4 border-t">
                        <h4 className="font-semibold text-sm mb-2">Ideal For:</h4>
                        <p className="text-sm text-foreground/70">{itinerary.idealFor}</p>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Link to="/contact" className="flex-1">
                          <Button className="w-full bg-secondary hover:bg-secondary/90">
                            Request Detailed Quote
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setExpandedId(null)}
                        >
                          Close Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">Don't See What You're Looking For?</h2>
            <p className="text-lg text-foreground/80 mb-8">
              All our itineraries are completely customizable. We can adjust duration, accommodation level, activities, and pace to perfectly match your preferences and budget.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Flexible Duration</h3>
                  <p className="text-sm text-foreground/70">Adjust trip length to fit your schedule</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Choose Activities</h3>
                  <p className="text-sm text-foreground/70">Mix and match experiences you want</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Your Budget</h3>
                  <p className="text-sm text-foreground/70">From budget to luxury, we adapt</p>
                </CardContent>
              </Card>
            </div>
            
            <Link to="/contact">
              <Button size="lg">Create My Custom Itinerary</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Planning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss your perfect Rwanda adventure. We'll create a personalized itinerary and quote within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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

export default Itineraries;