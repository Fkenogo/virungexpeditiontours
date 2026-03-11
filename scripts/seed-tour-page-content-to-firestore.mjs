import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { configureAdminSdkEmulator, getFirebaseProjectId, loadProjectEnv } from "./lib/env.mjs";

const env = await loadProjectEnv();
const projectId = getFirebaseProjectId(env);

if (!projectId) {
  throw new Error("Missing FIREBASE_PROJECT_ID or VITE_FIREBASE_PROJECT_ID in .env.local or .env.");
}

// Initialize Firebase Admin SDK
const firebaseConfig = {
  projectId,
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
  configureAdminSdkEmulator(db);
  console.log('📡 Connected to Firestore Emulator on localhost:8090');
}

const tourPageContent = {
  hero_title: "Rwanda Tours & Safari Experiences",
  hero_subtitle: "Discover Rwanda's Extraordinary Wildlife and Landscapes",
  introduction: "Rwanda, the \"Land of a Thousand Hills,\" offers some of Africa's most profound wildlife encounters. From endangered mountain gorillas in misty volcanic forests to chimpanzees in ancient rainforests and Big Five safaris in savannah landscapes, Rwanda delivers unforgettable moments at every turn.\n\nVirunga Expedition Tours specializes in creating seamless, expertly-guided experiences across all of Rwanda's premier wildlife destinations.",
  combo_experiences_title: "Popular Tour Combinations",
  combo_experiences_description: "Many travelers combine multiple experiences for a comprehensive Rwanda adventure:",
  combo_experiences: [
    {
      title: "Gorillas & Golden Monkeys",
      description: "Two-day Volcanoes Park experience combining both primate encounters"
    },
    {
      title: "Primates & Safari",
      description: "Gorillas in Volcanoes Park plus Akagera game drives for complete wildlife experience"
    },
    {
      title: "Complete Rwanda",
      description: "Gorillas, Chimps, and Safari across all major parks (7-10 days)"
    },
    {
      title: "Family Adventure",
      description: "Golden monkeys, Akagera, and cultural experiences (no gorilla age restrictions)"
    }
  ],
  cta_title: "Ready to Book Your Rwanda Adventure?",
  cta_description: "Our team will help you select the perfect combination of experiences based on your interests, timeframe, and budget.",
  cta_buttons: [
    {
      label: "Request Custom Quote",
      link: "/contact",
      variant: "default"
    },
    {
      label: "Create Custom Package",
      link: "/contact",
      variant: "outline"
    }
  ],
  seasonal_guide_title: "Best Time to Visit?",
  seasonal_guide_description: "Rwanda offers incredible experiences year-round, but each season brings unique advantages. Use our interactive comparison tool to see how parks transform throughout the year.",
  seasonal_guide_link: "/tours/seasonal-comparison",
  is_active: true,
  updated_at: Timestamp.now(),
  created_at: Timestamp.now(),
};

async function seedTourPageContent() {
  try {
    console.log("🌿 Seeding Tour Page Content to Firestore...");
    
    // Add or update the tour page content document
    const docRef = db.collection("tour_page_content").doc("main");
    await docRef.set(tourPageContent, { merge: true });
    
    console.log("✅ Tour Page Content seeded successfully!");
    console.log("📍 Document path: tour_page_content/main");
    
  } catch (error) {
    console.error("❌ Error seeding tour page content:", error);
    process.exit(1);
  }
}

seedTourPageContent();
