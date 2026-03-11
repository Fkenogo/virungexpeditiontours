import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Sun,
  CloudRain,
  TreePine,
  Camera,
  Utensils,
  TrendingUp,
  BarChart3,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

type SeasonalGuideContent = {
  title: string;
  subtitle: string;
  introduction: string;
  parks: Array<{
    id: string;
    name: string;
    description: string;
    image_url: string;
    location: string;
    best_seasons: string[];
    key_activities: string[];
  }>;
  seasons: Array<{
    id: string;
    name: string;
    months: string;
    weather: string;
    description: string;
    pros: string[];
    cons: string[];
    best_for: string[];
    travel_tips: string[];
  }>;
  activities: Array<{
    id: string;
    name: string;
    description: string;
    difficulty: "Easy" | "Moderate" | "Challenging" | "Expert";
    best_seasons: string[];
    duration: string;
    cost_range: string;
  }>;
  travel_tips: Array<{
    id: string;
    category: string;
    tips: string[];
  }>;
  comparison_chart: {
    chart_title: string;
    chart_description: string;
    metrics: Array<{
      id: string;
      name: string;
      description: string;
    }>;
    data_points: Array<{
      season: string;
      values: Record<string, number>;
    }>;
  };
};

const DEFAULT_SEASONAL_GUIDE: SeasonalGuideContent = {
  title: "Rwanda & Uganda Seasonal Guide",
  subtitle: "When to Visit for the Best Safari Experience",
  introduction: "Plan your perfect African safari with our comprehensive seasonal guide. Learn about the best times to visit Rwanda and Uganda for gorilla trekking, wildlife viewing, and cultural experiences.",
  parks: [],
  seasons: [],
  activities: [],
  travel_tips: [],
  comparison_chart: {
    chart_title: "Seasonal Comparison",
    chart_description: "Compare seasons across key metrics to plan your perfect safari",
    metrics: [],
    data_points: []
  }
};

export default function SeasonalGuide() {
  const [content, setContent] = useState<SeasonalGuideContent>(DEFAULT_SEASONAL_GUIDE);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "seasonal_guide", "main"));
        if (snap.exists()) {
          setContent({ ...DEFAULT_SEASONAL_GUIDE, ...(snap.data() as Partial<SeasonalGuideContent>) });
        }
      } catch (error) {
        console.error("Error loading seasonal guide:", error);
      }
    };

    load();
  }, []);

  const getSeasonColor = (seasonName: string) => {
    const colors = {
      "Dry Season": "bg-blue-100 text-blue-800",
      "Wet Season": "bg-green-100 text-green-800",
      "High Season": "bg-orange-100 text-orange-800",
      "Low Season": "bg-purple-100 text-purple-800"
    };
    return colors[seasonName as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getActivityColor = (difficulty: string) => {
    const colors = {
      "Easy": "bg-green-100 text-green-800",
      "Moderate": "bg-yellow-100 text-yellow-800", 
      "Challenging": "bg-orange-100 text-orange-800",
      "Expert": "bg-red-100 text-red-800"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getMetricIcon = (metricName: string) => {
    const icons = {
      "Weather": <CloudRain className="h-4 w-4" />,
      "Crowds": <Users className="h-4 w-4" />,
      "Prices": <DollarSign className="h-4 w-4" />,
      "Wildlife": <TreePine className="h-4 w-4" />,
      "Accessibility": <MapPin className="h-4 w-4" />
    };
    return icons[metricName as keyof typeof icons] || <Info className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
            <p className="text-lg text-white/80 max-w-4xl mx-auto">
              {content.introduction}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-6 gap-2 max-w-4xl mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="seasons" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Seasons
            </TabsTrigger>
            <TabsTrigger value="parks" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Parks
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Comparison
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Tips
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Sun className="h-6 w-6 text-yellow-600" />
                    Best Time to Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dry seasons offer the best conditions for wildlife viewing and trekking
                  </p>
                  <div className="space-y-2">
                    {content.seasons.slice(0, 2).map((season) => (
                      <div key={season.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">{season.name}</span>
                        <span className="text-sm text-muted-foreground">{season.months}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TreePine className="h-6 w-6 text-green-600" />
                    Wildlife Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Prime viewing opportunities for different species
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Mountain Gorillas</span>
                      <span className="text-sm text-green-600">Year-round</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Golden Monkeys</span>
                      <span className="text-sm text-green-600">Dry season</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                    Budget Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Seasonal variations in accommodation and tour prices
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">High Season</span>
                      <span className="text-sm text-red-600">+30-50%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Low Season</span>
                      <span className="text-sm text-green-600">-20-30%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Seasons Tab */}
          <TabsContent value="seasons" className="space-y-8">
            <div className="grid gap-6">
              {content.seasons.map((season) => (
                <Card key={season.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          <Calendar className="h-6 w-6" />
                          {season.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{season.months}</p>
                      </div>
                      <Badge className={getSeasonColor(season.name)}>
                        {season.weather}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground mb-4">{season.description}</p>
                      
                      <h4 className="font-semibold mb-2">Best For</h4>
                      <div className="flex flex-wrap gap-2">
                        {season.best_for.map((item) => (
                          <Badge key={item} variant="secondary">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                          <ul className="text-sm space-y-1">
                            {season.pros.map((pro) => (
                              <li key={pro} className="text-muted-foreground">✓ {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                          <ul className="text-sm space-y-1">
                            {season.cons.map((con) => (
                              <li key={con} className="text-muted-foreground">✗ {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold mb-2">Travel Tips</h4>
                      <ul className="text-sm space-y-1">
                        {season.travel_tips.map((tip) => (
                          <li key={tip} className="text-muted-foreground">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Parks Tab */}
          <TabsContent value="parks" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.parks.map((park) => (
                <Card key={park.id} className="overflow-hidden">
                  <img 
                    src={park.image_url} 
                    alt={park.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{park.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{park.location}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{park.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Best Seasons</h4>
                      <div className="flex flex-wrap gap-2">
                        {park.best_seasons.map((season) => (
                          <Badge key={season} variant="outline">{season}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {park.key_activities.map((activity) => (
                          <Badge key={activity} variant="secondary">{activity}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.activities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader>
                    <CardTitle>{activity.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge className={getActivityColor(activity.difficulty)}>
                        {activity.difficulty}
                      </Badge>
                      <span>• {activity.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{activity.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Best Seasons</h4>
                      <div className="flex flex-wrap gap-2">
                        {activity.best_seasons.map((season) => (
                          <Badge key={season} variant="outline">{season}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cost Range</span>
                      <Badge variant="secondary">{activity.cost_range}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  {content.comparison_chart.chart_title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{content.comparison_chart.chart_description}</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-gray-200 p-3 text-left">Season</th>
                        {content.comparison_chart.metrics.map((metric) => (
                          <th key={metric.id} className="border border-gray-200 p-3 text-left">
                            <div className="flex items-center gap-2">
                              {getMetricIcon(metric.name)}
                              <span>{metric.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{metric.description}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.comparison_chart.data_points.map((dataPoint) => (
                        <tr key={dataPoint.season} className="hover:bg-muted/50">
                          <td className="border border-gray-200 p-3 font-medium">{dataPoint.season}</td>
                          {content.comparison_chart.metrics.map((metric) => {
                            const value = dataPoint.values[metric.id];
                            const percentage = Math.round((value / 5) * 100);
                            
                            return (
                              <td key={metric.id} className="border border-gray-200 p-3">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={cn(
                                        "h-2 rounded-full transition-all duration-300",
                                        percentage > 80 ? "bg-green-500" :
                                        percentage > 60 ? "bg-yellow-500" :
                                        percentage > 40 ? "bg-orange-500" : "bg-red-500"
                                      )}
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium w-12">{value}/5</span>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-8">
            <div className="grid gap-6">
              {content.travel_tips.map((tipCategory) => (
                <Card key={tipCategory.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Utensils className="h-6 w-6" />
                      {tipCategory.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tipCategory.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}