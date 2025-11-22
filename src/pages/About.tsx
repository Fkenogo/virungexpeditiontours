import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Users, Leaf, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Virunga Expedition Tours</h1>
          <p className="text-xl md:text-2xl">Your Trusted Partner for Rwanda Safari Adventures</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
            <div className="space-y-4 text-lg text-foreground/90">
              <p>
                Founded with a passion for Rwanda's extraordinary natural beauty and wildlife, Virunga Expedition Tours has grown into one of the region's most trusted safari operators. Based in Kigali, we specialize in creating authentic, life-changing experiences across the Virunga Mountains region - spanning Rwanda, western Uganda, and eastern DRC.
              </p>
              <p>
                Our journey began with a simple belief: that connecting people with endangered mountain gorillas and Africa's incredible wildlife creates not just memories, but champions for conservation. Today, we're proud to have facilitated hundreds of gorilla encounters, wildlife safaris, and cultural experiences that contribute to both conservation and community development.
              </p>
              <p>
                What sets us apart is our deep local knowledge combined with international service standards. Our team knows every trail in Volcanoes National Park, every game drive route in Akagera, and every hidden gem in Nyungwe Forest. We don't just organize tours - we share our home with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Our Mission & Values</h2>
            
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-secondary">Our Mission</h3>
              <p className="text-lg text-foreground/90">
                To provide exceptional, sustainable safari experiences that connect travelers with Rwanda's wildlife while supporting conservation and local communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <Leaf className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Conservation First</h3>
                  <p className="text-foreground/80">
                    Every tour we operate contributes to wildlife protection and habitat conservation. Your adventure helps protect endangered species.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Community Partnership</h3>
                  <p className="text-foreground/80">
                    We work with local communities, employ local guides and porters, and ensure tourism benefits the people who protect these wild places.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Authentic Experiences</h3>
                  <p className="text-foreground/80">
                    No cookie-cutter tours. We create genuine, personalized adventures that reflect your interests and Rwanda's authentic character.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Professional Excellence</h3>
                  <p className="text-foreground/80">
                    From first inquiry to final farewell, we deliver service that exceeds international standards while maintaining our warm Rwandan hospitality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <Leaf className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Sustainable Tourism</h3>
                  <p className="text-foreground/80">
                    We follow responsible tourism practices that minimize environmental impact and maximize positive contributions to conservation and communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Safety & Quality</h3>
                  <p className="text-foreground/80">
                    Your safety and satisfaction are paramount. We maintain the highest standards in equipment, guides, and operational procedures.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Why Travel with Virunga Expedition Tours</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Licensed & Certified</h3>
                <p className="text-foreground/80">
                  Officially licensed by the Rwanda Development Board and proud members of the Rwanda Travel & Tourism Association (RTTA). Your safety and satisfaction are guaranteed by our professional credentials.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Local Guides</h3>
                <p className="text-foreground/80">
                  Our guides are passionate professionals with deep knowledge of Rwanda's wildlife, ecosystems, and culture. Many have years of experience tracking gorillas and leading safaris.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Seamless Logistics</h3>
                <p className="text-foreground/80">
                  We handle everything: gorilla permit bookings, accommodation reservations, ground transport, park entries, and 24/7 support throughout your journey.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Heart className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible & Personalized</h3>
                <p className="text-foreground/80">
                  Whether you're a solo traveler, couple, family, or group, we customize itineraries to match your interests, fitness level, budget, and travel style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Lorraine</h3>
                <p className="text-secondary font-medium mb-3">Operations Manager</p>
                <p className="text-foreground/80">
                  With over 8 years in Rwanda tourism, Lorraine ensures every detail of your journey runs smoothly. She specializes in custom itinerary design and permit coordination.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Egide</h3>
                <p className="text-secondary font-medium mb-3">Lead Guide & Founder</p>
                <p className="text-foreground/80">
                  Egide's passion for Rwanda's wildlife and deep knowledge of the Virunga region make him an exceptional guide. He has personally led over 200 gorilla treks and countless safaris.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">Our Field Guides</h3>
                <p className="text-foreground/80 text-lg">
                  Our team of licensed, experienced guides are the heart of Virunga Expedition Tours. Each brings expertise in wildlife tracking, natural history, and creating memorable experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Our Credentials</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">RTTA Member</h3>
                <p className="text-sm text-foreground/70">Rwanda Travel & Tourism Association</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Licensed Operator</h3>
                <p className="text-sm text-foreground/70">Rwanda Development Board</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Gorilla Permit Partner</h3>
                <p className="text-sm text-foreground/70">Authorized permit booking</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Leaf className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Sustainable Tourism</h3>
                <p className="text-sm text-foreground/70">Responsible practices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Tourism That Makes a Difference</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Leaf className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Conservation Support</h3>
              <p className="text-white/90">
                15% of gorilla permit fees fund conservation efforts. Your trek helps protect mountain gorillas and their habitat.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Employment</h3>
              <p className="text-white/90">
                We employ local guides, porters, and drivers, providing sustainable income for communities around protected areas.
              </p>
            </div>

            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Education Programs</h3>
              <p className="text-white/90">
                We support conservation education initiatives in communities bordering Rwanda's national parks.
              </p>
            </div>

            <div className="text-center">
              <Heart className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Environmental Responsibility</h3>
              <p className="text-white/90">
                We follow Leave No Trace principles and support reforestation and habitat protection programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Rwanda Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you have questions about gorilla trekking, need help planning your itinerary, or want a custom quote, our team is here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90">
              Request Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              WhatsApp: +250 783 959 404
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;