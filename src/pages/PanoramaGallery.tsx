import { useState } from 'react';
import { PanoramaViewer } from '@/components/PanoramaViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';
import virungaMountains from '@/assets/virunga-mountains.jpg';
import akageraSafari from '@/assets/akagera-safari.jpg';
import canopyWalkway from '@/assets/canopy-walkway.jpg';

const PanoramaGallery = () => {
  const [selectedPanorama, setSelectedPanorama] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  const panoramas = [
    {
      id: 'virunga',
      title: 'Virunga Mountains Vista',
      description: 'Breathtaking 360° view from the summit of Volcanoes National Park',
      image: virungaMountains,
      location: 'Volcanoes National Park',
      elevation: '3,470m',
    },
    {
      id: 'akagera',
      title: 'Akagera Savannah Landscape',
      description: 'Panoramic view across the rolling hills and savannah plains',
      image: akageraSafari,
      location: 'Akagera National Park',
      elevation: '1,350m',
    },
    {
      id: 'nyungwe',
      title: 'Nyungwe Canopy View',
      description: 'Immersive forest canopy experience from above the trees',
      image: canopyWalkway,
      location: 'Nyungwe Forest National Park',
      elevation: '2,100m',
    },
  ];

  const openPanorama = (imageUrl: string, title: string) => {
    setSelectedPanorama(imageUrl);
    setSelectedTitle(title);
  };

  const closePanorama = () => {
    setSelectedPanorama(null);
    setSelectedTitle('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={virungaMountains}
            alt="Panoramic views of Rwanda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            360° Panoramic Gallery
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Immerse yourself in Rwanda's stunning landscapes through interactive panoramic views
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Rwanda in 360°</h2>
            <p className="text-lg text-muted-foreground">
              Explore our collection of immersive panoramic views from Rwanda's most spectacular viewpoints. 
              Click and drag to look around, scroll or pinch to zoom, and discover the breathtaking beauty 
              of East Africa's mountain peaks, savannah plains, and ancient forests.
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen Panorama Viewer */}
      {selectedPanorama && (
        <div className="fixed inset-0 z-50 bg-black">
          <PanoramaViewer
            imageUrl={selectedPanorama}
            title={selectedTitle}
            onClose={closePanorama}
            className="w-full h-full rounded-none"
          />
        </div>
      )}

      {/* Panorama Grid */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {panoramas.map((panorama) => (
              <Card key={panorama.id} className="overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={panorama.image}
                    alt={panorama.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary">360° View</Badge>
                  <Button
                    size="icon"
                    className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
                    onClick={() => openPanorama(panorama.image, panorama.title)}
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle>{panorama.title}</CardTitle>
                  <CardDescription>{panorama.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      📍 {panorama.location}
                    </span>
                    <span className="flex items-center gap-1">
                      ⛰️ {panorama.elevation}
                    </span>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => openPanorama(panorama.image, panorama.title)}
                  >
                    View in 360° →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Try the Interactive Experience
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <PanoramaViewer
                  imageUrl={virungaMountains}
                  title="Virunga Mountains - Interactive Demo"
                  className="w-full h-[500px] rounded-none"
                />
              </CardContent>
            </Card>
            <p className="text-center text-muted-foreground mt-6">
              Click and drag to explore • Scroll or pinch to zoom • Works on all devices
            </p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How to Navigate</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🖱️ Desktop Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Look Around:</strong> Click and drag with your mouse</p>
                  <p><strong>Zoom:</strong> Scroll with your mouse wheel</p>
                  <p><strong>Reset View:</strong> Click the reset button (↻)</p>
                  <p><strong>Fullscreen:</strong> Click the maximize button (⛶)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📱 Mobile Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Look Around:</strong> Swipe in any direction</p>
                  <p><strong>Zoom:</strong> Pinch with two fingers</p>
                  <p><strong>Reset View:</strong> Tap the reset button (↻)</p>
                  <p><strong>Fullscreen:</strong> Tap the maximize button (⛶)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience These Views in Person</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            These panoramic views are just a glimpse of what awaits you on our Rwanda tours. 
            Join us to experience these breathtaking vistas firsthand.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link to="/tours">Browse All Tours</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanoramaGallery;
