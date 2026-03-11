import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toWhatsAppUrl, useSiteSettings } from '@/hooks/useSiteSettings';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import heroGorilla from '@/assets/hero-gorilla.jpg';
import akageraSafari from '@/assets/akagera-safari.jpg';
import chimpanzees from '@/assets/chimpanzees.jpg';
import { useMediaAssets } from '@/hooks/useMediaAssets';

type Itinerary = {
  id: string;
  title: string;
  duration: string;
  destinations: string;
  image_key: 'hero-gorilla' | 'akagera-safari' | 'chimpanzees';
  image_url: string | null;
  category: string;
  popular: boolean;
  family: boolean;
  highlights: string[];
  summary: string;
  days: string[];
  idealFor: string;
  display_order: number;
  is_active: boolean;
};

const imageMap: Record<Itinerary['image_key'], string> = {
  'hero-gorilla': heroGorilla,
  'akagera-safari': akageraSafari,
  chimpanzees,
};

const filters = [
  { id: 'all', label: 'All Itineraries' },
  { id: '3-day', label: '3 Day Tours' },
  { id: '5-day', label: '5 Day Tours' },
  { id: '7-day', label: '7 Day Tours' },
  { id: '10-day', label: '10+ Day Tours' },
  { id: 'multi-country', label: 'Multi-Country' },
  { id: 'family', label: 'Family-Friendly' },
];

const normalizeItinerary = (id: string, raw: Record<string, unknown>): Itinerary => ({
  id,
  title: String(raw.title || ''),
  duration: String(raw.duration || ''),
  destinations: String(raw.destinations || ''),
  image_key: (raw.image_key as Itinerary['image_key']) || 'hero-gorilla',
  image_url: raw.image_url ? String(raw.image_url) : null,
  category: String(raw.category || '3-day'),
  popular: Boolean(raw.popular),
  family: Boolean(raw.family),
  highlights: Array.isArray(raw.highlights) ? raw.highlights.map((item) => String(item)) : [],
  summary: String(raw.summary || ''),
  days: Array.isArray(raw.days) ? raw.days.map((item) => String(item)) : [],
  idealFor: String(raw.idealFor || ''),
  display_order: Number(raw.display_order || 0),
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
});

const Itineraries = () => {
  const { mediaMap } = useMediaAssets();
  const { settings } = useSiteSettings();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const itineraryQuery = query(collection(db, 'itineraries'), where('is_active', '==', true));
      const snapshot = await getDocs(itineraryQuery);
      const data = snapshot.docs
        .map((docSnapshot) => normalizeItinerary(docSnapshot.id, docSnapshot.data() as Record<string, unknown>))
        .sort((a, b) => a.display_order - b.display_order);
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItineraries = useMemo(() => {
    if (activeFilter === 'all') return itineraries;
    if (activeFilter === 'family') return itineraries.filter((item) => item.family);
    return itineraries.filter((item) => item.category === activeFilter);
  }, [activeFilter, itineraries]);

  return (
    <div className="min-h-screen">
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

      <section className="py-8 bg-muted/30 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter.id)}
                className="transition-all"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-muted-foreground py-16">Loading itineraries...</div>
          ) : filteredItineraries.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">No itineraries available yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredItineraries.map((itinerary) => {
                const imageSrc = itinerary.image_url || mediaMap.get(itinerary.image_key) || imageMap[itinerary.image_key] || heroGorilla;
                return (
                  <Card key={itinerary.id} id={itinerary.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                        src={imageSrc}
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

                      <p className="text-foreground/80 mb-4">{itinerary.summary}</p>

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
                        <Button className="flex-1" onClick={() => setExpandedId(expandedId === itinerary.id ? null : itinerary.id)}>
                          {expandedId === itinerary.id ? 'Hide Details' : 'View Full Itinerary'}
                        </Button>
                        <Link to="/contact" className="flex-1">
                          <Button variant="outline" className="w-full">Request Quote</Button>
                        </Link>
                      </div>

                      {expandedId === itinerary.id && (
                        <div className="mt-6 pt-6 border-t space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div>
                            <h4 className="font-semibold text-lg mb-3 text-primary">Complete Day-by-Day Itinerary</h4>
                            <ul className="space-y-3">
                              {itinerary.days.map((day, idx) => (
                                <li key={idx} className="text-sm text-foreground/80 flex gap-3">
                                  <span className="font-semibold text-secondary shrink-0">{day.split(':')[0]}:</span>
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
                              <Button className="w-full bg-secondary hover:bg-secondary/90">Request Detailed Quote</Button>
                            </Link>
                            <Button variant="outline" className="flex-1" onClick={() => setExpandedId(null)}>
                              Close Details
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

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

      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Planning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss your perfect Rwanda adventure. We'll create a personalized itinerary and quote within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90">
                Request Custom Quote
              </Button>
            </Link>
            <a href={toWhatsAppUrl(settings.whatsapp_numbers[0])} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outlineLight">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Itineraries;
