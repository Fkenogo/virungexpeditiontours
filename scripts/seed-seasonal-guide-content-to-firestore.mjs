#!/usr/bin/env node

import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
// Import the default seasonal guide content directly
const DEFAULT_SEASONAL_GUIDE = {
  title: "Rwanda Seasonal Guide",
  subtitle: "Plan Your Perfect Safari Adventure",
  introduction: "Rwanda offers incredible wildlife experiences year-round, but each season has its unique advantages. This guide helps you choose the best time for your safari based on weather, wildlife activity, and travel preferences.",
  parks: [
    {
      id: "volcanoes-national-park",
      name: "Volcanoes National Park",
      slug: "volcanoes-national-park",
      description: "Home to the majestic mountain gorillas and golden monkeys, this park offers some of the world's most incredible wildlife encounters.",
      image_url: "/images/blog/virunga-mountains.jpg",
      best_seasons: ["june-september", "december-february"],
      wildlife_highlights: [
        "Mountain Gorillas",
        "Golden Monkeys", 
        "Blue Monkeys",
        "Forest Birds"
      ],
      weather_patterns: [
        {
          season_id: "june-september",
          temperature_range: "15-22°C",
          rainfall_mm: 20,
          humidity_range: "60-70%",
          daylight_hours: 12,
          visibility_notes: "Excellent visibility for trekking"
        },
        {
          season_id: "march-may",
          temperature_range: "12-18°C", 
          rainfall_mm: 150,
          humidity_range: "80-90%",
          daylight_hours: 12,
          visibility_notes: "Lush vegetation, some rain"
        },
        {
          season_id: "june-september",
          temperature_range: "15-22°C",
          rainfall_mm: 20,
          humidity_range: "60-70%",
          daylight_hours: 12,
          visibility_notes: "Excellent visibility for trekking"
        },
        {
          season_id: "october-november",
          temperature_range: "14-20°C",
          rainfall_mm: 120,
          humidity_range: "75-85%",
          daylight_hours: 12,
          visibility_notes: "Green landscapes, moderate rain"
        },
        {
          season_id: "december-february",
          temperature_range: "16-24°C",
          rainfall_mm: 40,
          humidity_range: "55-65%",
          daylight_hours: 12,
          visibility_notes: "Warm and dry, perfect conditions"
        }
      ]
    },
    {
      id: "akagera-national-park",
      name: "Akagera National Park",
      slug: "akagera-national-park",
      description: "Rwanda's only savanna park, home to the Big Five and incredible birdlife along Lake Ihema.",
      image_url: "/images/blog/akagera-lions.jpg",
      best_seasons: ["june-september", "december-february"],
      wildlife_highlights: [
        "Big Five (Lion, Leopard, Elephant, Buffalo, Rhino)",
        "Hippos and Crocodiles",
        "Over 500 Bird Species",
        "Zebra and Giraffe"
      ],
      weather_patterns: [
        {
          season_id: "june-september",
          temperature_range: "20-30°C",
          rainfall_mm: 10,
          humidity_range: "40-50%",
          daylight_hours: 12,
          visibility_notes: "Dry season, excellent wildlife viewing"
        },
        {
          season_id: "march-may",
          temperature_range: "18-28°C",
          rainfall_mm: 100,
          humidity_range: "70-80%",
          daylight_hours: 12,
          visibility_notes: "Green season, lush landscapes"
        },
        {
          season_id: "june-september",
          temperature_range: "20-30°C",
          rainfall_mm: 10,
          humidity_range: "40-50%",
          daylight_hours: 12,
          visibility_notes: "Dry season, excellent wildlife viewing"
        },
        {
          season_id: "october-november",
          temperature_range: "19-29°C",
          rainfall_mm: 80,
          humidity_range: "65-75%",
          daylight_hours: 12,
          visibility_notes: "Shoulder season, good conditions"
        },
        {
          season_id: "december-february",
          temperature_range: "22-32°C",
          rainfall_mm: 15,
          humidity_range: "35-45%",
          daylight_hours: 12,
          visibility_notes: "Hot and dry, peak season"
        }
      ]
    },
    {
      id: "nyungwe-national-park",
      name: "Nyungwe National Park",
      slug: "nyungwe-national-park",
      description: "Ancient rainforest with canopy walks, chimpanzees, and incredible biodiversity.",
      image_url: "/images/blog/canopy-walkway.jpg",
      best_seasons: ["june-september", "december-february"],
      wildlife_highlights: [
        "Chimpanzees",
        "13 Primate Species",
        "Canopy Walk",
        "200+ Bird Species"
      ],
      weather_patterns: [
        {
          season_id: "june-september",
          temperature_range: "14-20°C",
          rainfall_mm: 30,
          humidity_range: "70-80%",
          daylight_hours: 12,
          visibility_notes: "Cool and dry, best trekking conditions"
        },
        {
          season_id: "march-may",
          temperature_range: "12-18°C",
          rainfall_mm: 200,
          humidity_range: "85-95%",
          daylight_hours: 12,
          visibility_notes: "Wet season, lush but slippery trails"
        },
        {
          season_id: "june-september",
          temperature_range: "14-20°C",
          rainfall_mm: 30,
          humidity_range: "70-80%",
          daylight_hours: 12,
          visibility_notes: "Cool and dry, best trekking conditions"
        },
        {
          season_id: "october-november",
          temperature_range: "13-19°C",
          rainfall_mm: 150,
          humidity_range: "80-90%",
          daylight_hours: 12,
          visibility_notes: "Moderate rain, good visibility"
        },
        {
          season_id: "december-february",
          temperature_range: "15-22°C",
          rainfall_mm: 40,
          humidity_range: "65-75%",
          daylight_hours: 12,
          visibility_notes: "Warm and dry, excellent conditions"
        }
      ]
    }
  ],
  seasons: [
    {
      id: "march-may",
      name: "Long Rainy Season",
      months: ["March", "April", "May"],
      slug: "march-may",
      description: "The long rainy season brings lush greenery and fewer crowds. Perfect for photography and birdwatching.",
      weather_summary: "Warm temperatures with frequent afternoon showers",
      travel_rating: 3,
      crowd_level: "low",
      price_level: "low",
      best_for: ["Photography", "Birdwatching", "Lush Landscapes", "Budget Travel"]
    },
    {
      id: "june-september",
      name: "Long Dry Season",
      months: ["June", "July", "August", "September"],
      slug: "june-september",
      description: "Peak season with excellent wildlife viewing and dry conditions. Ideal for gorilla trekking and safaris.",
      weather_summary: "Cool to warm temperatures, minimal rainfall",
      travel_rating: 5,
      crowd_level: "high",
      price_level: "high",
      best_for: ["Gorilla Trekking", "Safaris", "Wildlife Viewing", "Photography"]
    },
    {
      id: "october-november",
      name: "Short Rainy Season",
      months: ["October", "November"],
      slug: "october-november",
      description: "Shoulder season with moderate rain and improving conditions. Great for budget-conscious travelers.",
      weather_summary: "Warm temperatures with occasional showers",
      travel_rating: 4,
      crowd_level: "medium",
      price_level: "medium",
      best_for: ["Budget Travel", "Photography", "Birdwatching", "Fewer Crowds"]
    },
    {
      id: "december-february",
      name: "Short Dry Season",
      months: ["December", "January", "February"],
      slug: "december-february",
      description: "Warm dry season with excellent conditions. Perfect for families and first-time visitors.",
      weather_summary: "Warm temperatures, minimal rainfall",
      travel_rating: 5,
      crowd_level: "high",
      price_level: "high",
      best_for: ["Families", "First-time Visitors", "Gorilla Trekking", "Safaris"]
    }
  ],
  activities: [
    {
      id: "gorilla-trekking",
      name: "Gorilla Trekking",
      description: "The ultimate wildlife experience - tracking mountain gorillas in their natural habitat.",
      best_seasons: ["june-september", "december-february"],
      difficulty_level: "challenging",
      duration_hours: 6,
      seasonal_variations: [
        {
          season_id: "march-may",
          description: "Challenging due to muddy trails and dense vegetation",
          duration_adjustment: 2,
          difficulty_adjustment: 1,
          special_notes: "Bring waterproof gear and extra layers"
        },
        {
          season_id: "june-september",
          description: "Optimal conditions with clear trails and good visibility",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Bring warm layers for early morning starts"
        },
        {
          season_id: "october-november",
          description: "Good conditions with some rain expected",
          duration_adjustment: 1,
          difficulty_adjustment: 0.5,
          special_notes: "Pack rain gear and waterproof footwear"
        },
        {
          season_id: "december-february",
          description: "Excellent conditions with warm weather",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Stay hydrated in warmer temperatures"
        }
      ]
    },
    {
      id: "chimpanzee-tracking",
      name: "Chimpanzee Tracking",
      description: "Track chimpanzees through the ancient rainforest of Nyungwe National Park.",
      best_seasons: ["june-september", "december-february"],
      difficulty_level: "moderate",
      duration_hours: 4,
      seasonal_variations: [
        {
          season_id: "march-may",
          description: "Slippery trails but excellent bird activity",
          duration_adjustment: 1,
          difficulty_adjustment: 1,
          special_notes: "Use trekking poles and waterproof gear"
        },
        {
          season_id: "june-september",
          description: "Best conditions with dry trails and good visibility",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Bring layers for cool forest temperatures"
        },
        {
          season_id: "october-november",
          description: "Moderate conditions with some rain",
          duration_adjustment: 0.5,
          difficulty_adjustment: 0.5,
          special_notes: "Pack rain protection and warm layers"
        },
        {
          season_id: "december-february",
          description: "Warm and dry, excellent tracking conditions",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Stay hydrated and use sun protection"
        }
      ]
    },
    {
      id: "akagera-safari",
      name: "Akagera Safari",
      description: "Game drives through savanna landscapes to see the Big Five and incredible birdlife.",
      best_seasons: ["june-september", "december-february"],
      difficulty_level: "easy",
      duration_hours: 3,
      seasonal_variations: [
        {
          season_id: "march-may",
          description: "Lush landscapes but some roads may be challenging",
          duration_adjustment: 1,
          difficulty_adjustment: 0.5,
          special_notes: "Early morning game drives recommended"
        },
        {
          season_id: "june-september",
          description: "Prime safari season with excellent wildlife viewing",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Bring sun protection and binoculars"
        },
        {
          season_id: "october-november",
          description: "Good conditions with fewer crowds",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Pack layers for early morning chills"
        },
        {
          season_id: "december-february",
          description: "Peak season with excellent wildlife concentrations",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Stay hydrated in warm temperatures"
        }
      ]
    },
    {
      id: "canopy-walk",
      name: "Canopy Walk",
      description: "Walk among the treetops in Nyungwe Forest's famous canopy walkway.",
      best_seasons: ["june-september", "december-february"],
      difficulty_level: "easy",
      duration_hours: 2,
      seasonal_variations: [
        {
          season_id: "march-may",
          description: "Lush surroundings but may be slippery",
          duration_adjustment: 0.5,
          difficulty_adjustment: 0.5,
          special_notes: "Check weather conditions before booking"
        },
        {
          season_id: "june-september",
          description: "Best conditions with clear views and dry walkway",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Bring a camera for panoramic views"
        },
        {
          season_id: "october-november",
          description: "Good conditions with some rain possible",
          duration_adjustment: 0.5,
          difficulty_adjustment: 0.5,
          special_notes: "Dress in layers for changing conditions"
        },
        {
          season_id: "december-february",
          description: "Excellent conditions with warm weather",
          duration_adjustment: 0,
          difficulty_adjustment: 0,
          special_notes: "Perfect for photography"
        }
      ]
    }
  ],
  travel_tips: [
    {
      id: "weather-tips",
      category: "weather",
      title: "Dress in Layers",
      content: "Rwanda's weather can change quickly, especially in the mountains. Mornings are cool, afternoons warm, and evenings cool again. Pack layers that you can add or remove as needed.",
      seasons: ["march-may", "june-september", "october-november", "december-february"],
      priority: "high"
    },
    {
      id: "wildlife-tips",
      category: "wildlife",
      title: "Book Permits Early",
      content: "Gorilla and chimpanzee permits are limited and sell out quickly, especially during peak season. Book at least 3-6 months in advance for the best availability.",
      seasons: ["june-september", "december-february"],
      priority: "high"
    },
    {
      id: "travel-tips",
      category: "travel",
      title: "Stay Hydrated",
      content: "The altitude and physical activity can be dehydrating. Carry water with you at all times and drink regularly, even if you don't feel thirsty.",
      seasons: ["march-may", "june-september", "october-november", "december-february"],
      priority: "medium"
    },
    {
      id: "packing-tips",
      category: "packing",
      title: "Pack Smart",
      content: "Bring waterproof hiking boots, gaiters for gorilla trekking, quick-dry clothing, and a good rain jacket. Pack light as you'll be carrying your daypack during activities.",
      seasons: ["march-may", "june-september", "october-november", "december-february"],
      priority: "medium"
    },
    {
      id: "health-tips",
      category: "health",
      title: "Health Precautions",
      content: "Ensure you're up to date on routine vaccines. Consider malaria prophylaxis for Akagera National Park. Bring any prescription medications and basic first aid supplies.",
      seasons: ["march-may", "june-september", "october-november", "december-february"],
      priority: "high"
    }
  ],
  comparison_chart: {
    chart_title: "Rwanda Safari Seasons Comparison",
    chart_description: "Compare the best times to visit Rwanda's national parks based on weather, wildlife activity, and travel preferences.",
    metrics: [
      {
        id: "wildlife-viewing",
        name: "Wildlife Viewing",
        description: "Quality of wildlife sightings and animal activity",
        unit: "Rating",
        higher_is_better: true
      },
      {
        id: "weather-conditions",
        name: "Weather Conditions",
        description: "Overall weather quality for outdoor activities",
        unit: "Rating",
        higher_is_better: true
      },
      {
        id: "crowd-level",
        name: "Crowd Level",
        description: "Number of tourists and permit availability",
        unit: "Rating",
        higher_is_better: false
      },
      {
        id: "travel-cost",
        name: "Travel Cost",
        description: "Overall cost of travel and accommodations",
        unit: "Rating",
        higher_is_better: false
      },
      {
        id: "photography-conditions",
        name: "Photography Conditions",
        description: "Lighting, visibility, and landscape quality",
        unit: "Rating",
        higher_is_better: true
      }
    ],
    data_points: [
      // Volcanoes National Park data
      { season_id: "march-may", park_id: "volcanoes-national-park", metric_id: "wildlife-viewing", value: 4, notes: "Good activity, lush vegetation" },
      { season_id: "march-may", park_id: "volcanoes-national-park", metric_id: "weather-conditions", value: 3, notes: "Frequent rain, cool temperatures" },
      { season_id: "march-may", park_id: "volcanoes-national-park", metric_id: "crowd-level", value: 2, notes: "Fewer tourists, easier permits" },
      { season_id: "march-may", park_id: "volcanoes-national-park", metric_id: "travel-cost", value: 2, notes: "Lower prices, budget-friendly" },
      { season_id: "march-may", park_id: "volcanoes-national-park", metric_id: "photography-conditions", value: 4, notes: "Lush landscapes, dramatic clouds" },
      
      { season_id: "june-september", park_id: "volcanoes-national-park", metric_id: "wildlife-viewing", value: 5, notes: "Excellent visibility, active animals" },
      { season_id: "june-september", park_id: "volcanoes-national-park", metric_id: "weather-conditions", value: 5, notes: "Dry, clear conditions" },
      { season_id: "june-september", park_id: "volcanoes-national-park", metric_id: "crowd-level", value: 5, notes: "Peak season, book early" },
      { season_id: "june-september", park_id: "volcanoes-national-park", metric_id: "travel-cost", value: 5, notes: "Highest prices, premium season" },
      { season_id: "june-september", park_id: "volcanoes-national-park", metric_id: "photography-conditions", value: 5, notes: "Clear views, excellent lighting" },
      
      // Akagera National Park data
      { season_id: "march-may", park_id: "akagera-national-park", metric_id: "wildlife-viewing", value: 3, notes: "Good activity, lush vegetation" },
      { season_id: "march-may", park_id: "akagera-national-park", metric_id: "weather-conditions", value: 3, notes: "Warm with afternoon showers" },
      { season_id: "march-may", park_id: "akagera-national-park", metric_id: "crowd-level", value: 2, notes: "Fewer visitors, peaceful" },
      { season_id: "march-may", park_id: "akagera-national-park", metric_id: "travel-cost", value: 2, notes: "Budget-friendly season" },
      { season_id: "march-may", park_id: "akagera-national-park", metric_id: "photography-conditions", value: 4, notes: "Green landscapes, dramatic skies" },
      
      { season_id: "june-september", park_id: "akagera-national-park", metric_id: "wildlife-viewing", value: 5, notes: "Excellent concentrations, dry season" },
      { season_id: "june-september", park_id: "akagera-national-park", metric_id: "weather-conditions", value: 5, notes: "Dry, warm, perfect for safaris" },
      { season_id: "june-september", park_id: "akagera-national-park", metric_id: "crowd-level", value: 5, notes: "Peak season, popular time" },
      { season_id: "june-september", park_id: "akagera-national-park", metric_id: "travel-cost", value: 5, notes: "Highest prices, premium season" },
      { season_id: "june-september", park_id: "akagera-national-park", metric_id: "photography-conditions", value: 5, notes: "Clear views, golden light" }
    ]
  },
  is_active: true
};

// Initialize Firebase Admin SDK
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || "virungexpeditiontours",
};

try {
  initializeApp(firebaseConfig);
  console.log("✅ Firebase Admin SDK initialized successfully");
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin SDK:", error);
  process.exit(1);
}

const db = getFirestore();

// Use emulator if running with --emulator flag
if (process.argv.includes('--emulator')) {
  console.log('🔧 Using Firebase Emulator');
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FUNCTIONS_EMULATOR_HOST = 'localhost:5001';
  
  // Configure Firestore to use emulator
  db.settings({
    host: 'localhost:8090',
    ssl: false
  });
  console.log('📡 Connected to Firestore Emulator on localhost:8090');
}

async function seedSeasonalGuideContent() {
  try {
    console.log("🌿 Seeding Seasonal Guide Content to Firestore...");
    
    const now = new Date();
    const seasonalGuideData = {
      ...DEFAULT_SEASONAL_GUIDE,
      id: "seasonal-guide",
      updated_at: Timestamp.fromDate(now),
      created_at: Timestamp.fromDate(now)
    };

    // Add or update the seasonal guide document
    const docRef = db.collection("seasonal_guide").doc("main");
    await docRef.set(seasonalGuideData, { merge: true });
    
    console.log("✅ Seasonal Guide Content seeded successfully!");
    console.log("📍 Document path: seasonal_guide/main");
    console.log("📊 Content includes:");
    console.log(`   - ${seasonalGuideData.parks.length} National Parks`);
    console.log(`   - ${seasonalGuideData.seasons.length} Seasons`);
    console.log(`   - ${seasonalGuideData.activities.length} Activities`);
    console.log(`   - ${seasonalGuideData.travel_tips.length} Travel Tips`);
    console.log(`   - ${seasonalGuideData.comparison_chart.metrics.length} Comparison Metrics`);
    console.log(`   - ${seasonalGuideData.comparison_chart.data_points.length} Data Points`);
    
  } catch (error) {
    console.error("❌ Error seeding seasonal guide content:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedSeasonalGuideContent();