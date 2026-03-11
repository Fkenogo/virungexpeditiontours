import fs from "node:fs/promises";
import path from "node:path";
import {loadProjectEnv} from "./lib/env.mjs";
import {DESTINATION_GUIDES, DESTINATION_PAGE_CONTENT} from "../src/content/destinationDefaults.js";

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, "src/assets");

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (Array.isArray(value)) return { arrayValue: { values: value.map((v) => toFirestoreValue(v)) } };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (typeof value === "object") {
    const fields = {};
    for (const [k, v] of Object.entries(value)) fields[k] = toFirestoreValue(v);
    return { mapValue: { fields } };
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

async function upsertDocument(firestoreBase, idToken, collectionName, docId, payload) {
  const headers = { "Content-Type": "application/json" };
  if (idToken) headers.Authorization = `Bearer ${idToken}`;
  else headers.Authorization = "Bearer owner";

  return fetchJson(`${firestoreBase}/${collectionName}/${docId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(buildFields(payload)),
  });
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(full)));
    } else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function basenameKey(file) {
  return path.basename(file).replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const dryRun = args.has("--dry-run");
  const useEmulator = args.has("--emulator");

  const env = await loadProjectEnv(ROOT);
  const apiKey = env.VITE_FIREBASE_API_KEY;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;
  if (!apiKey || !projectId) throw new Error("Missing Firebase config in .env.local or .env.");

  const firestoreBase = useEmulator
    ? `http://${process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8090"}/v1/projects/${projectId}/databases/(default)/documents`
    : `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

  const now = new Date().toISOString();
  const records = [
    ["site_settings", "global", {
      company_name: "Virunga Expedition Tours",
      phones: ["+250783959404", "+250783007010"],
      whatsapp_numbers: ["+250783959404", "+250783007010"],
      emails: ["info@virungaexpeditiontours.com", "egide@virungaexpeditiontours.com"],
      emergency_phone: "+250783959404",
      office_location: "Kigali, Rwanda",
      office_hours: ["Monday-Saturday: 8:00 AM - 6:00 PM CAT", "Sunday: Closed"],
      social_links: { facebook: "", instagram: "", x: "", youtube: "" },
      updated_at: now,
      created_at: now,
    }],
    ["home_content", "main", {
      hero_title: "Discover the Heart of Africa with Virunga Expedition Tours",
      hero_subtitle: "Experience unforgettable gorilla trekking, wildlife safaris, and volcano adventures across Rwanda, Uganda, and Eastern DRC",
      hero_cta_primary: "Explore Rwanda Tours",
      hero_cta_secondary: "Request Custom Quote",
      intro_heading: "Welcome to Virunga Expedition Tours",
      intro_body_1: "We are your gateway to Rwanda's most extraordinary wildlife experiences. Based in Kigali and specializing in the spectacular Virunga Mountains region, we create unforgettable adventures that connect you with endangered mountain gorillas, rare primates, and Africa's most breathtaking landscapes.",
      intro_body_2: "Whether you dream of tracking mountain gorillas in Volcanoes National Park, watching chimpanzees swing through ancient rainforests, or embarking on Big Five safaris in Akagera, we curate personalized journeys that exceed expectations.",
      updated_at: now,
      created_at: now,
    }],
    ["about_content", "main", {
      hero_title: "About Virunga Expedition Tours",
      hero_subtitle: "Your Trusted Partner for Rwanda Safari Adventures",
      story_intro: "Founded with a passion for Rwanda's extraordinary natural beauty and wildlife, Virunga Expedition Tours has grown into one of the region's most trusted safari operators.",
      mission_statement: "To provide exceptional, sustainable safari experiences that connect travelers with Rwanda's wildlife while supporting conservation and local communities.",
      updated_at: now,
      created_at: now,
    }],
    ["destination_content", "main", {
      ...DESTINATION_PAGE_CONTENT,
      updated_at: now,
      created_at: now,
    }],
    ["form_configs", "contact_quote", {
      countries: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Netherlands", "Belgium", "South Africa", "Other"],
      nationalities: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Netherlands", "Belgium", "South Africa", "Other"],
      tour_interests: ["Mountain Gorilla Trekking", "Golden Monkey Tracking", "Chimpanzee Trekking", "Colobus Monkey Tracking", "Canopy Walkway", "Dian Fossey Tomb Hike", "Akagera Safari (Big Five)", "Kigali City Tour", "Lake Kivu", "Cultural Experiences", "Volcano Hiking", "Bird Watching"],
      accommodation_options: ["Budget", "Mid-Range", "Luxury", "Ultra-Luxury", "Mixed (Combination)"],
      heard_from_options: ["Google Search", "TripAdvisor", "Social Media (Facebook, Instagram, etc.)", "Friend or Family Referral", "Travel Agent", "Previous Client", "Online Advertisement", "Other"],
      updated_at: now,
      created_at: now,
    }],
    ["legal_documents", "privacy-policy", { title: "Privacy Policy", content_markdown: "", is_active: false, updated_at: now, created_at: now }],
    ["legal_documents", "terms-and-conditions", { title: "Terms & Conditions", content_markdown: "", is_active: false, updated_at: now, created_at: now }],
    ["legal_documents", "booking-terms", { title: "Booking Terms", content_markdown: "", is_active: false, updated_at: now, created_at: now }],
    ...DESTINATION_GUIDES.map((guide) => [
      "destination_guides",
      guide.country,
      {
        ...guide,
        updated_at: now,
        created_at: now,
      },
    ]),
  ];

  const files = await walkFiles(ASSETS_DIR);
  const mediaRecords = files.map((file, idx) => {
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    return ["media_assets", `asset-${String(idx + 1).padStart(4, "0")}`, {
      key: basenameKey(file),
      title: path.basename(file),
      url: "",
      local_asset_path: rel,
      alt: basenameKey(file).replace(/-/g, " "),
      usage: "",
      tags: [],
      is_active: true,
      display_order: idx + 1,
      updated_at: now,
      created_at: now,
    }];
  });

  console.log(`Prepared ${records.length} content documents`);
  console.log(`Prepared ${mediaRecords.length} media asset registry documents`);
  if (dryRun) {
    console.log("Dry run complete. No writes performed.");
    return;
  }

  let idToken = null;
  if (!useEmulator) {
    const email = process.env.FIREBASE_ADMIN_EMAIL;
    const password = process.env.FIREBASE_ADMIN_PASSWORD;
    if (!email || !password) throw new Error("Set FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD to run migration.");
    const auth = await signInWithEmailPassword(apiKey, email, password);
    idToken = auth.idToken;
    const uid = auth.localId;
    if (!idToken || !uid) throw new Error("Failed to authenticate");
    await verifyAdmin(firestoreBase, idToken, uid);
  }

  let writes = 0;
  for (const [collectionName, docId, payload] of [...records, ...mediaRecords]) {
    await upsertDocument(firestoreBase, idToken, collectionName, docId, payload);
    writes += 1;
  }

  console.log(`Migration complete: wrote ${writes} documents.`);
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
