import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { VideoEmbed } from "@/components/VideoEmbed";
import { Play, Calendar, Eye } from "lucide-react";

interface TourVideo {
  id: string;
  tour_name: string;
  title: string;
  description: string | null;
  video_url: string;
  video_type: string;
  display_order: number;
  created_at: string;
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<TourVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<string>("all");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("tour_videos")
        .select("*")
        .eq("is_active", true)
        .order("tour_name")
        .order("display_order");

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const tourCategories = [
    "all",
    ...Array.from(new Set(videos.map((v) => v.tour_name))).sort(),
  ];

  const filteredVideos =
    selectedTour === "all"
      ? videos
      : videos.filter((v) => v.tour_name === selectedTour);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-secondary text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <Play className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Video Gallery</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Experience Rwanda's Adventures Through Our Traveler's Eyes
          </p>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filter Tabs */}
            <Tabs
              defaultValue="all"
              onValueChange={setSelectedTour}
              className="mb-12"
            >
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-muted/50">
                {tourCategories.map((tour) => (
                  <TabsTrigger key={tour} value={tour} className="capitalize">
                    {tour === "all" ? "All Tours" : tour}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading videos...</p>
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  No videos available yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-lg transition-all group"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <VideoEmbed
                          url={video.video_url}
                          title={video.title}
                        />
                        {video.video_type && (
                          <Badge
                            variant={video.video_type === "testimonial" ? "default" : "secondary"}
                            className="absolute top-3 right-3 z-10"
                          >
                            {video.video_type === "testimonial" ? "Testimonial" : "Tour Preview"}
                          </Badge>
                        )}
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="outline" className="text-xs">
                            {video.tour_name}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        {video.description && (
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {video.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1.5" />
                            {new Date(video.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Own Adventure?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Let us help you plan an unforgettable journey through Rwanda's stunning landscapes
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Request Custom Quote
            </a>
            <a
              href="https://wa.me/250783959404"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
