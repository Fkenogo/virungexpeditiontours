import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Camera, Heart, Star, Video, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import canopyWalkwayImg from "@/assets/canopy-walk-nyungwe.jpg";
import canopyWalkImg2 from "@/assets/canopy-walkway.jpg";
import { BookingCalendar } from "@/components/BookingCalendar";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";

const CanopyWalkway = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${canopyWalkwayImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Nyungwe Forest National Park</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Canopy Walkway Experience</h1>
          <p className="text-2xl mb-8">Walk Above the Ancient Rainforest</p>
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
            <h2 className="text-3xl font-bold mb-6 text-primary">East Africa's Only Canopy Walkway</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Suspended 60 meters above the forest floor, Nyungwe's canopy walkway offers a breathtaking perspective of one of Africa's most ancient rainforests. This 160-meter-long suspended bridge is the only one of its kind in East Africa, providing an unforgettable bird's-eye view of the forest ecosystem.
              </p>
              <p>
                Walk high above the treetops and experience the forest from a completely different angle. Watch birds, butterflies, and even primates at canopy level. The surrounding views of Nyungwe's rolling green hills and mist-covered valleys are spectacular, especially in the early morning light.
              </p>
              <p>
                The canopy walkway is accessible for most visitors and doesn't require the physical demands of primate trekking. It's perfect for families, photographers, nature lovers, and anyone wanting to experience Nyungwe's magic without strenuous hiking.
              </p>
              <p>
                The experience includes a pleasant hike through the forest to reach the walkway, offering opportunities to spot primates, birds, and unique flora along the trail. The round-trip experience typically takes 2-3 hours and can easily be combined with other Nyungwe activities.
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
                    <span>Canopy walkway fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Park entrance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Guide services</span>
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
                <h3 className="text-2xl font-bold mb-4 text-primary">Nyungwe Explorer</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Canopy walkway</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Colobus tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Waterfall hike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>All transport & meals</span>
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
                <h3 className="text-xl font-semibold mb-2">Trail to the Walkway</h3>
                <p className="text-foreground/80">
                  2km hike (45 minutes) through beautiful forest. Relatively flat and easy. Spot birds, butterflies, and possibly primates along the way.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">The Canopy Walk</h3>
                <p className="text-foreground/80">
                  160-meter suspended bridge, 60 meters above ground. Walk at your own pace. Take photos, observe canopy-level wildlife, enjoy panoramic views. The bridge gently sways - perfectly safe but thrilling!
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Wildlife & Views</h3>
                <p className="text-foreground/80">
                  Spot birds at eye level, see the forest from above, capture stunning landscape photos. Early morning visits offer best light and wildlife activity.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Return Trek</h3>
                <p className="text-foreground/80">
                  Return via the same trail. Total experience: 2-3 hours. Can be combined with afternoon activities like colobus tracking or waterfall hikes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <BookingCalendar tourName="Canopy Walkway Experience" />
        </div>
      </section>

      {/* Why Choose Canopy Walk */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Experience the Canopy Walk?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Unique in East Africa</h3>
              <p className="text-white/90">
                The only canopy walkway in the region. Truly one-of-a-kind experience.
              </p>
            </div>

            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Photography Paradise</h3>
              <p className="text-white/90">
                Spectacular views and unique perspectives. Sunrise/early morning is magical.
              </p>
            </div>

            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Accessible for Most</h3>
              <p className="text-white/90">
                No intense hiking required. Suitable for families and all ages.
              </p>
            </div>

            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Half-Day Activity</h3>
              <p className="text-white/90">
                Perfect to combine with other Nyungwe adventures in one day.
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
              Experience the breathtaking views from the canopy walkway.
            </p>
            <PhotoGallery
              images={[
                {
                  src: canopyWalkwayImg,
                  alt: "Canopy walkway in Nyungwe Forest",
                  caption: "Walking 60 meters above the rainforest floor"
                },
                {
                  src: canopyWalkImg2,
                  alt: "Canopy walk views",
                  caption: "Spectacular panoramic views of the forest"
                },
                {
                  src: canopyWalkwayImg,
                  alt: "Canopy walkway experience",
                  caption: "An unforgettable aerial adventure"
                },
                {
                  src: canopyWalkImg2,
                  alt: "Forest canopy",
                  caption: "Bird's-eye view of ancient rainforest"
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
              <h2 className="text-3xl font-bold text-primary">Experience the Walk</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Watch the canopy walkway experience and hear from our travelers.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Tour Preview</h3>
                <VideoEmbed 
                  url="https://youtube.com/shorts/aJ35GcK_cgY?si=hUkBSjCG0-7aU2-i"
                  title="Canopy Walkway Preview"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Traveler Testimonial</h3>
                <VideoEmbed 
                  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  title="Canopy Walk Testimonial"
                />
                <p className="text-sm text-muted-foreground mt-3 italic">
                  "Absolutely breathtaking experience!" - Amanda R.
                </p>
              </div>
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
                  "Absolutely breathtaking! Walking 60 meters above the rainforest canopy was surreal. The views were incredible and we spotted several bird species. Don't miss this!"
                </p>
                <p className="font-semibold">— Amanda R., Canada</p>
                <p className="text-sm text-foreground/60">Canopy Walk June 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "Perfect family activity! Our kids (8 and 11) loved it. A bit of a thrill but completely safe. Combined it with colobus tracking - great Nyungwe day!"
                </p>
                <p className="font-semibold">— Peterson Family, Sweden</p>
                <p className="text-sm text-foreground/60">Family Adventure July 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "The sunrise canopy walk was magical. Early morning mist, birds singing, forest stretching endlessly. Photos came out stunning. Highly recommend going early!"
                </p>
                <p className="font-semibold">— Michael O., Ireland</p>
                <p className="text-sm text-foreground/60">Canopy Walk April 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Walk Above the Rainforest?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience East Africa's only canopy walkway and see Nyungwe Forest from a spectacular new perspective.
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

export default CanopyWalkway;
