import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ENV_FILE = path.join(ROOT, ".env");

const destinationPackages = [
  {
    id: "rwanda-volcanoes",
    country: "rwanda",
    title: "Volcanoes National Park",
    subtitle: "Mountain gorillas and golden monkeys",
    location: "Northwestern Rwanda",
    image_key: "gorilla",
    image_url: null,
    description: "Rwanda's flagship wildlife destination for gorilla trekking, golden monkeys, and volcano hikes.",
    highlights: ["Mountain Gorilla Trekking", "Golden Monkey Tracking", "Dian Fossey Tomb Hike"],
    badges: ["2 hours from Kigali", "$1,500 Gorilla Permit", "12 Habituated Gorilla Families"],
    link: "/tours/gorilla-trekking",
    display_order: 1,
    is_active: true,
  },
  {
    id: "rwanda-nyungwe",
    country: "rwanda",
    title: "Nyungwe Forest National Park",
    subtitle: "Ancient rainforest and primate hotspot",
    location: "Southwestern Rwanda",
    image_key: "forest",
    image_url: null,
    description: "UNESCO-listed montane rainforest with chimpanzees, canopy walkway, and exceptional biodiversity.",
    highlights: ["Chimpanzee Trekking", "Canopy Walkway", "Colobus Monkey Tracking"],
    badges: ["UNESCO Site", "13 Primate Species", "310+ Bird Species"],
    link: "/tours/chimpanzee",
    display_order: 2,
    is_active: true,
  },
  {
    id: "rwanda-akagera",
    country: "rwanda",
    title: "Akagera National Park",
    subtitle: "Rwanda's Big Five safari park",
    location: "Eastern Rwanda",
    image_key: "safari",
    image_url: null,
    description: "Classic savannah safari destination with game drives, boat safaris, and major conservation success.",
    highlights: ["Big Five Game Drives", "Lake Ihema Boat Safari", "Night Game Drives"],
    badges: ["1,122 sq km", "Big Five", "2.5 hours from Kigali"],
    link: "/tours/akagera-safari",
    display_order: 3,
    is_active: true,
  },
  {
    id: "rwanda-lake-kivu",
    country: "rwanda",
    title: "Lake Kivu",
    subtitle: "Relaxation and lakeside adventure",
    location: "Western Rwanda",
    image_key: "lake",
    image_url: null,
    description: "Rwanda's Riviera with scenic towns, island exploration, water sports, and Congo Nile Trail access.",
    highlights: ["Sunset Cruises", "Kayaking & Paddleboarding", "Island Tours"],
    badges: ["Africa's 6th Largest Lake", "Safe Swimming", "Great Post-Trek Add-On"],
    link: "/itineraries",
    display_order: 4,
    is_active: true,
  },
  {
    id: "rwanda-kigali",
    country: "rwanda",
    title: "Kigali City",
    subtitle: "Cultural and historical gateway",
    location: "Kigali",
    image_key: "city",
    image_url: null,
    description: "Modern, clean capital city with powerful history, vibrant arts, markets, and culinary experiences.",
    highlights: ["Kigali Genocide Memorial", "Inema Arts Center", "Kimironko Market"],
    badges: ["Safest African Capitals", "Ideal Arrival/Departure Base", "Half/Full Day Tours"],
    link: "/tours/kigali-city-tour",
    display_order: 5,
    is_active: true,
  },
  {
    id: "uganda-bwindi",
    country: "uganda",
    title: "Bwindi Impenetrable Forest",
    subtitle: "Half of world's mountain gorillas",
    location: "Southwestern Uganda",
    image_key: "gorilla",
    image_url: null,
    description: "UNESCO-protected rainforest and the most important gorilla conservation area in the world.",
    highlights: ["Gorilla Trekking", "Gorilla Habituation Experience", "Batwa Cultural Visits"],
    badges: ["19 Habituated Families", "$800 Gorilla Permit", "4 Trekking Sectors"],
    link: "/itineraries",
    display_order: 6,
    is_active: true,
  },
  {
    id: "uganda-queen-elizabeth",
    country: "uganda",
    title: "Queen Elizabeth National Park",
    subtitle: "Savannah wildlife and tree-climbing lions",
    location: "Western Uganda",
    image_key: "safari",
    image_url: null,
    description: "Diverse ecosystems with classic safaris, Kazinga Channel boat trips, and Ishasha lion sightings.",
    highlights: ["Kazinga Channel Boat Safari", "Tree-Climbing Lions", "Savannah Game Drives"],
    badges: ["Uganda's Most Visited Park", "Birding Paradise", "Excellent Multi-Day Circuits"],
    link: "/itineraries",
    display_order: 7,
    is_active: true,
  },
  {
    id: "uganda-kibale",
    country: "uganda",
    title: "Kibale Forest National Park",
    subtitle: "Primate capital of East Africa",
    location: "Western Uganda",
    image_key: "forest",
    image_url: null,
    description: "One of Africa's best chimpanzee destinations with rich primate diversity and guided forest experiences.",
    highlights: ["Chimpanzee Trekking", "Bigodi Wetland Walk", "Primate Viewing"],
    badges: ["High Chimp Sighting Rate", "13 Primate Species", "Great Combo with Queen Elizabeth"],
    link: "/itineraries",
    display_order: 8,
    is_active: true,
  },
  {
    id: "drc-virunga",
    country: "drc",
    title: "Virunga National Park",
    subtitle: "Africa's oldest national park",
    location: "Eastern DRC",
    image_key: "virunga-mountains",
    image_url: null,
    description: "Dramatic landscapes, gorilla trekking, and deep conservation significance in a unique adventure setting.",
    highlights: ["Mountain Gorilla Trekking", "Virunga Conservation Experience", "Scenic Volcanic Terrain"],
    badges: ["UNESCO World Heritage", "$400 Gorilla Permit", "Armed Ranger Support"],
    link: "/itineraries",
    display_order: 9,
    is_active: true,
  },
  {
    id: "drc-nyiragongo",
    country: "drc",
    title: "Mount Nyiragongo",
    subtitle: "Overnight lava lake summit",
    location: "Eastern DRC",
    image_key: "volcano",
    image_url: null,
    description: "One of the world's most dramatic active volcano experiences with overnight cabins on the crater rim.",
    highlights: ["Volcano Hike", "Lava Lake Views", "Crater-Rim Overnight"],
    badges: ["Active Volcano", "High-Adventure", "Unique East Africa Experience"],
    link: "/itineraries",
    display_order: 10,
    is_active: true,
  },
];

function parseEnv(text) {
  const env = {};
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

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
  for (const [key, value] of Object.entries(record)) fields[key] = toFirestoreValue(value);
  return { fields };
}

async function fetchJson(url, options = {}) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
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
  const doc = await fetchJson(`${firestoreBase}/user_roles/${uid}`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  const role = doc?.fields?.role?.stringValue;
  if (role !== "admin") throw new Error(`User ${uid} is not admin in user_roles`);
}

async function upsertDestinationPackage(firestoreBase, idToken, item) {
  const headers = { "Content-Type": "application/json" };
  if (idToken) headers.Authorization = `Bearer ${idToken}`;
  else headers.Authorization = "Bearer owner";

  return fetchJson(`${firestoreBase}/destination_packages/${item.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(
      buildFields({
        ...item,
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
  const envRaw = await fs.readFile(ENV_FILE, "utf8");
  const env = parseEnv(envRaw);

  const apiKey = env.VITE_FIREBASE_API_KEY;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;
  if (!apiKey || !projectId) throw new Error("Missing Firebase config in .env.");

  const firestoreBase = useEmulator
    ? `http://${process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8090"}/v1/projects/${projectId}/databases/(default)/documents`
    : `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

  console.log(`Prepared ${destinationPackages.length} destination package records`);
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
  for (const item of destinationPackages) {
    await upsertDestinationPackage(firestoreBase, idToken, item);
    writes += 1;
  }
  console.log(`Migration complete: wrote ${writes} destination packages.`);
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
