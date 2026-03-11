import fs from "node:fs/promises";
import path from "node:path";
import {loadProjectEnv} from "./lib/env.mjs";

const ROOT = process.cwd();

const tourPackages = [
  {
    id: "gorilla-trekking",
    title: "Mountain Gorilla Trekking",
    subtitle: "The Ultimate Wildlife Encounter",
    location: "Volcanoes National Park",
    duration: "Full Day Experience",
    difficulty: "Moderate to Challenging",
    image_key: "hero-gorilla",
    image_url: null,
    description:
      "Stand face-to-face with endangered mountain gorillas in their natural habitat. This life-changing experience in Volcanoes National Park ranks among the world's greatest wildlife encounters.",
    link: "/tours/gorilla-trekking",
    display_order: 1,
    is_active: true,
  },
  {
    id: "golden-monkey",
    title: "Golden Monkey Tracking",
    subtitle: "Playful Bamboo Forest Primates",
    location: "Volcanoes National Park",
    duration: "Half Day",
    difficulty: "Easy to Moderate",
    image_key: "golden-monkeys",
    image_url: null,
    description:
      "Watch endangered golden monkeys leap through bamboo forests with incredible energy and playfulness. Their striking golden fur makes for stunning photography.",
    link: "/tours/golden-monkey",
    display_order: 2,
    is_active: true,
  },
  {
    id: "chimpanzee",
    title: "Chimpanzee Trekking",
    subtitle: "Meet Our Closest Relatives",
    location: "Nyungwe Forest National Park",
    duration: "Half to Full Day",
    difficulty: "Moderate to Challenging",
    image_key: "chimpanzees",
    image_url: null,
    description:
      "Trek through ancient rainforest to observe wild chimpanzees. Watch as they feed, play, and communicate with complex vocalizations in one of Africa's oldest forests.",
    link: "/tours/chimpanzee",
    display_order: 3,
    is_active: true,
  },
  {
    id: "colobus-monkey",
    title: "Colobus Monkey Tracking",
    subtitle: "Spectacular Super-Troops",
    location: "Nyungwe Forest National Park",
    duration: "Half Day",
    difficulty: "Easy",
    image_key: "colobus-monkeys",
    image_url: null,
    description:
      "Observe troops of 300+ black and white colobus monkeys in stunning rainforest settings. Perfect for families and those wanting easier primate experiences.",
    link: "/tours/colobus-monkey",
    display_order: 4,
    is_active: true,
  },
  {
    id: "lhoests-monkey",
    title: "L'Hoest's Monkey Tracking",
    subtitle: "The Shy Mountain Monkey",
    location: "Nyungwe Forest National Park",
    duration: "Half Day",
    difficulty: "Moderate",
    image_key: "chimpanzee-family",
    image_url: null,
    description:
      "Encounter one of Africa's least-known primates with distinctive white beards and chest bibs. A rare and rewarding experience for primate enthusiasts.",
    link: "/tours/lhoests-monkey",
    display_order: 5,
    is_active: true,
  },
  {
    id: "owl-faced-monkey",
    title: "Owl-Faced Monkey Tracking",
    subtitle: "The Forest's Most Distinctive Primate",
    location: "Nyungwe Forest National Park",
    duration: "Half to Full Day",
    difficulty: "Moderate to Challenging",
    image_key: "chimpanzees",
    image_url: null,
    description:
      "Track the mysterious Hamlyn's monkey with striking owl-like facial markings. An exceptionally rare sighting for serious wildlife watchers.",
    link: "/tours/owl-faced-monkey",
    display_order: 6,
    is_active: true,
  },
  {
    id: "canopy-walkway",
    title: "Canopy Walkway",
    subtitle: "Treetop Adventure",
    location: "Nyungwe Forest National Park",
    duration: "2-3 Hours",
    difficulty: "Easy",
    image_key: "canopy-walkway",
    image_url: null,
    description:
      "Walk 70 meters above the forest floor on East Africa's only canopy walkway. Experience the rainforest from a bird's eye view with stunning panoramic vistas.",
    link: "/tours/canopy-walkway",
    display_order: 7,
    is_active: true,
  },
  {
    id: "dian-fossey-hike",
    title: "Dian Fossey Tomb Hike",
    subtitle: "Conservation History",
    location: "Volcanoes National Park",
    duration: "Half Day",
    difficulty: "Moderate",
    image_key: "virunga-mountains",
    image_url: null,
    description:
      "Trek to the final resting place of legendary primatologist Dian Fossey. A moving tribute to the woman who saved mountain gorillas from extinction.",
    link: "/tours/dian-fossey-hike",
    display_order: 8,
    is_active: true,
  },
  {
    id: "akagera-safari",
    title: "Akagera National Park Safari",
    subtitle: "Rwanda's Big Five Experience",
    location: "Akagera National Park",
    duration: "1-3 Days",
    difficulty: "Easy",
    image_key: "akagera-safari",
    image_url: null,
    description:
      "Classic African safari with lions, elephants, rhinos, buffalo, leopards, giraffes, zebras, and more. Game drives and boat safaris on scenic Lake Ihema.",
    link: "/tours/akagera-safari",
    display_order: 9,
    is_active: true,
  },
  {
    id: "kigali-tour",
    title: "Kigali City Tour",
    subtitle: "Rwanda's Vibrant Capital",
    location: "Kigali",
    duration: "Half to Full Day",
    difficulty: "Easy",
    image_key: "kigali-city",
    image_url: null,
    description:
      "Explore Kigali's genocide memorial, vibrant markets, art centers, and modern development. Essential context for understanding Rwanda's inspiring story.",
    link: "/tours/kigali-city-tour",
    display_order: 10,
    is_active: true,
  },
];

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (Array.isArray(value)) return { arrayValue: { values: value.map((v) => toFirestoreValue(v)) } };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    if (Number.isInteger(value)) return { integerValue: String(value) };
    return { doubleValue: value };
  }
  return { stringValue: String(value) };
}

function buildFields(record) {
  const fields = {};
  for (const [key, value] of Object.entries(record)) {
    fields[key] = toFirestoreValue(value);
  }
  return { fields };
}

async function fetchJson(url, options = {}) {
  let res;
  try {
    res = await fetch(url, options);
  } catch (error) {
    throw new Error(`Network request failed for ${url}. Is the emulator running?`);
  }
  const body = await res.text();
  let json;
  try {
    json = body ? JSON.parse(body) : null;
  } catch {
    json = { raw: body };
  }
  if (!res.ok) {
    const message = json?.error?.message || json?.error || body || `HTTP ${res.status}`;
    throw new Error(message);
  }
  return json;
}

async function signInWithEmailPassword(apiKey, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  return fetchJson(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
}

async function verifyAdmin(firestoreBase, idToken, uid) {
  const url = `${firestoreBase}/user_roles/${uid}`;
  const doc = await fetchJson(url, { headers: { Authorization: `Bearer ${idToken}` } });
  const role = doc?.fields?.role?.stringValue;
  if (role !== "admin") throw new Error(`User ${uid} is not admin in user_roles`);
}

async function upsertTourPackage(firestoreBase, idToken, tourPackage) {
  const url = `${firestoreBase}/tour_packages/${tourPackage.id}`;
  const headers = {
    "Content-Type": "application/json",
  };
  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`;
  } else {
    // Firestore emulator supports "owner" token to bypass rules for local seeding.
    headers.Authorization = "Bearer owner";
  }

  return fetchJson(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(
      buildFields({
        ...tourPackage,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    ),
  });
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const dryRun = args.has("--dry-run");
  const useEmulator = args.has("--emulator");
  const env = await loadProjectEnv(ROOT);

  const apiKey = env.VITE_FIREBASE_API_KEY;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId) {
    throw new Error("Missing Firebase config in .env.local or .env.");
  }

  const firestoreBase = useEmulator
    ? `http://${process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8090"}/v1/projects/${projectId}/databases/(default)/documents`
    : `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

  console.log(`Prepared ${tourPackages.length} tour package records`);

  if (dryRun) {
    console.log("Dry run complete. No writes performed.");
    return;
  }

  let idToken = null;

  if (!useEmulator) {
    const email = process.env.FIREBASE_ADMIN_EMAIL;
    const password = process.env.FIREBASE_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("Set FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD to run migration.");
    }

    const auth = await signInWithEmailPassword(apiKey, email, password);
    idToken = auth.idToken;
    const uid = auth.localId;

    if (!idToken || !uid) throw new Error("Failed to authenticate");

    await verifyAdmin(firestoreBase, idToken, uid);
  }

  let writes = 0;
  for (const tourPackage of tourPackages) {
    await upsertTourPackage(firestoreBase, idToken, tourPackage);
    writes += 1;
  }

  console.log(`Migration complete: wrote ${writes} tour packages.`);
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
