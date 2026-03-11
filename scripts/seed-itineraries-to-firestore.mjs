import fs from 'node:fs/promises';
import path from 'node:path';
import {loadProjectEnv} from './lib/env.mjs';

const ROOT = process.cwd();

const itineraries = [
  {
    id: '3-day-primates',
    title: '3-Day Rwanda Primate Safari',
    duration: '3 Days / 2 Nights',
    destinations: 'Kigali | Volcanoes National Park',
    image_key: 'hero-gorilla',
    image_url: null,
    category: '3-day',
    popular: false,
    family: false,
    highlights: [
      'Mountain gorilla trekking',
      'Golden monkey tracking',
      'Twin Lakes visit',
      'Kigali Genocide Memorial',
      'Cultural experiences',
    ],
    summary: "Perfect introduction to Rwanda's primates in a short timeframe. Experience mountain gorillas and golden monkeys with Kigali cultural immersion.",
    days: [
      'Day 1: Arrive Kigali, city tour, transfer to Volcanoes NP',
      'Day 2: Gorilla trekking, afternoon Twin Lakes',
      'Day 3: Golden monkeys, return to Kigali for departure',
    ],
    idealFor: 'Short visits • First-time Rwanda visitors • Primate enthusiasts • Time-constrained travelers',
    display_order: 1,
    is_active: true,
  },
  {
    id: '5-day-primates-safari',
    title: '5-Day Primates & Safari',
    duration: '5 Days / 4 Nights',
    destinations: 'Kigali | Akagera | Volcanoes',
    image_key: 'akagera-safari',
    image_url: null,
    category: '5-day',
    popular: true,
    family: true,
    highlights: [
      'Mountain gorilla trekking',
      'Golden monkey tracking',
      'Full-day Akagera game drives',
      'Boat safari on Lake Ihema',
      'Kigali city exploration',
      'Twin Lakes scenic visit',
    ],
    summary: 'Our most popular package! Combines gorilla trekking, golden monkeys, and Big Five safari for a comprehensive Rwanda wildlife experience.',
    days: [
      'Day 1: Arrive Kigali, city tour, relax',
      'Day 2: Transfer to Akagera, afternoon game drive',
      'Day 3: Full-day Akagera (game drive + boat safari), transfer to Kigali',
      'Day 4: Transfer to Volcanoes NP, relax or cultural village',
      'Day 5: Gorilla trekking, afternoon Twin Lakes or golden monkeys',
    ],
    idealFor: 'First-time Rwanda visitors • Balanced wildlife experience • Families (note: gorilla minimum age 15) • Most comprehensive short safari',
    display_order: 2,
    is_active: true,
  },
  {
    id: '7-day-best-rwanda',
    title: '7-Day Best of Rwanda Safari',
    duration: '7 Days / 6 Nights',
    destinations: 'All Major Parks',
    image_key: 'chimpanzees',
    image_url: null,
    category: '7-day',
    popular: true,
    family: false,
    highlights: [
      'Mountain gorilla trekking (Volcanoes NP)',
      'Chimpanzee trekking (Nyungwe Forest)',
      'Colobus monkey tracking',
      'Nyungwe canopy walkway',
      'Akagera Big Five safari',
      'Lake Kivu relaxation',
      'Kigali cultural sites',
      'Traditional village experience',
    ],
    summary: 'Experience everything Rwanda offers: gorillas, chimpanzees, Big Five safari, canopy walks, and cultural encounters. Our most comprehensive Rwanda-only itinerary.',
    days: [
      'Day 1: Arrive Kigali, city tour (Genocide Memorial, markets)',
      'Day 2: Transfer to Akagera, afternoon game drive',
      'Day 3: Full day Akagera (game drives + boat safari on Lake Ihema)',
      "Day 4: Transfer to Nyungwe Forest, stop at King's Palace & Ethnographic Museum",
      'Day 5: Chimpanzee trekking, afternoon canopy walkway',
      'Day 6: Transfer to Lake Kivu, boat rides and relaxation',
      'Day 7: Transfer to Volcanoes NP, optional cultural village',
    ],
    idealFor: 'First-time visitors wanting complete experience • Wildlife & primate enthusiasts • Photographers • Those with time to explore thoroughly',
    display_order: 3,
    is_active: true,
  },
  {
    id: '3-day-highlights',
    title: '3-Day Rwanda Highlights',
    duration: '3 Days / 2 Nights',
    destinations: 'Kigali | Akagera | Volcanoes',
    image_key: 'hero-gorilla',
    image_url: null,
    category: '3-day',
    popular: false,
    family: false,
    highlights: [
      'Mountain gorilla trekking',
      'Akagera game drives',
      'Boat safari on Lake Ihema',
      'Kigali city tour',
    ],
    summary: "Experience both Rwanda's gorillas and Big Five safari in three action-packed days.",
    days: [
      'Day 1: Arrive Kigali, city tour, transfer to Volcanoes',
      'Day 2: Gorilla trekking',
      'Day 3: Transfer to Akagera, game drive & boat safari, return to Kigali',
    ],
    idealFor: 'Wildlife enthusiasts wanting diverse experiences • Short but comprehensive Rwanda visit • Active travelers',
    display_order: 4,
    is_active: true,
  },
  {
    id: '10-day-grand-safari',
    title: '10-Day Grand Rwanda Safari',
    duration: '10 Days / 9 Nights',
    destinations: 'Complete Rwanda Experience',
    image_key: 'akagera-safari',
    image_url: null,
    category: '10-day',
    popular: false,
    family: false,
    highlights: [
      'Multiple gorilla treks',
      'Chimpanzee trekking',
      'Golden monkeys',
      'Extended Akagera safari',
      'Lake Kivu relaxation',
      'Cultural immersion',
      'All major parks',
    ],
    summary: 'The ultimate Rwanda adventure combining all wildlife experiences with ample time in each destination. Perfect for photographers and wildlife enthusiasts.',
    days: [
      'Day 1-2: Kigali arrival and exploration',
      'Day 3-4: Akagera National Park safari',
      'Day 5-6: Nyungwe Forest - chimpanzees and canopy walk',
      'Day 7: Lake Kivu relaxation',
      'Day 8-9: Volcanoes NP - gorillas and golden monkeys',
      'Day 10: Return to Kigali for departure',
    ],
    idealFor: 'Comprehensive wildlife experience • Photographers • Luxury travelers • Those wanting in-depth exploration',
    display_order: 5,
    is_active: true,
  },
  {
    id: '5-day-lake-kivu',
    title: '5-Day Game Drives, Gorillas & Lake Kivu',
    duration: '5 Days / 4 Nights',
    destinations: 'Complete Rwanda Circuit',
    image_key: 'hero-gorilla',
    image_url: null,
    category: '5-day',
    popular: false,
    family: true,
    highlights: [
      'Akagera Big Five safari',
      'Mountain gorilla trekking',
      'Lake Kivu boat rides & relaxation',
      "Scenic drives through Rwanda's hills",
      'Cultural experiences',
    ],
    summary: 'Wildlife adventures combined with lakeside relaxation at beautiful Lake Kivu.',
    days: [
      'Day 1: Kigali city tour, transfer to Akagera',
      'Day 2: Full day Akagera safari (game drives + boat)',
      'Day 3: Transfer to Volcanoes NP, stop at Lake Kivu',
      'Day 4: Gorilla trekking, afternoon relaxation',
      'Day 5: Transfer to Lake Kivu, boat rides, drive to Kigali',
    ],
    idealFor: 'Those wanting relaxation + adventure • Photographers (diverse landscapes) • Honeymoons • Balanced pace travelers',
    display_order: 6,
    is_active: true,
  },
  {
    id: 'uganda-gorilla-primate',
    title: '8-10 Day Uganda Gorilla & Primate Experience',
    duration: '8-10 Days / 7-9 Nights',
    destinations: 'Bwindi | Mgahinga | Lake Bunyonyi | Queen Elizabeth | Kibale',
    image_key: 'hero-gorilla',
    image_url: null,
    category: 'multi-country',
    popular: true,
    family: false,
    highlights: [
      'Mountain gorilla trekking in Bwindi ($800 permit)',
      'Gorilla Habituation Experience option (4 hours with gorillas)',
      'Golden monkey tracking in Mgahinga',
      'Volcano hiking (Mt. Muhabura, Gahinga, or Sabyinyo)',
      'Chimpanzee trekking in Kibale Forest',
      'Tree-climbing lions in Queen Elizabeth NP',
      "Lake Bunyonyi relaxation (Africa's 2nd deepest lake)",
      'Kazinga Channel boat safari',
      'Batwa cultural experiences',
    ],
    summary: "Experience Uganda's incredible primate diversity with lower-cost gorilla permits, the unique Gorilla Habituation Experience, and diverse wildlife across multiple ecosystems.",
    days: [
      'Day 1: Arrive Entebbe/Kigali, transfer to Bwindi Impenetrable Forest (4-5 hours from Kigali)',
      'Day 2: Mountain gorilla trekking in Bwindi - one of 19 habituated families across four sectors',
      'Day 3: Optional second gorilla trek OR transfer to Mgahinga Gorilla National Park',
      'Day 4: Golden monkey tracking and volcano hiking in Mgahinga, transfer to Lake Bunyonyi',
      'Day 5: Lake Bunyonyi relaxation - island hopping, canoeing, swimming in bilharzia-free waters',
      'Day 6: Transfer to Queen Elizabeth National Park, afternoon game drive',
      'Day 7: Full day Queen Elizabeth - morning Kazinga Channel boat safari, afternoon game drive in Ishasha sector for tree-climbing lions',
      'Day 8: Transfer to Kibale Forest National Park',
      'Day 9: Chimpanzee trekking in Kibale (90% success rate), optional Bigodi Wetland walk',
      'Day 10: Return to Entebbe/Kampala for departure or extend trip',
    ],
    idealFor: 'Cost-conscious gorilla trekkers • Primate enthusiasts • Those wanting extended gorilla time via habituation • Adventurous travelers • Photographers seeking diverse landscapes',
    display_order: 7,
    is_active: true,
  },
  {
    id: 'congo-adventure',
    title: '5-Day Congo Adventure - Gorillas & Nyiragongo Volcano',
    duration: '5 Days / 4 Nights',
    destinations: 'Kigali | Virunga National Park | Nyiragongo Volcano',
    image_key: 'akagera-safari',
    image_url: null,
    category: '5-day',
    popular: true,
    family: false,
    highlights: [
      'Mountain gorilla trekking in Virunga ($400 permit - lowest price)',
      "Nyiragongo volcano summit - world's largest lava lake",
      'Overnight camping on volcano crater rim',
      "Support Africa's most endangered park and heroic rangers",
      "Combine two of Africa's most dramatic experiences",
      'Armed ranger escorts throughout',
      'Dramatic volcanic landscapes',
    ],
    summary: "Combine affordable gorilla trekking with one of Earth's most spectacular natural phenomena - camping overnight on the rim of an active volcano with the world's largest lava lake churning below.",
    days: [
      'Day 1: Arrive Kigali, Rwanda. City tour including Genocide Memorial. Transfer to hotel near Gisenyi/Goma border. Safety briefing for DRC entry.',
      'Day 2: Cross Grande Barrier border into Goma, DRC. Met by Virunga Foundation team with armed ranger escorts. Transfer to Bukima or Mikeno Lodge. Afternoon relaxation and trek preparation briefing.',
      'Day 3: Mountain gorilla trekking in Virunga National Park. Early morning departure to track one of the habituated families. One hour with gorillas. Return to lodge, afternoon at leisure enjoying volcano views.',
      "Day 4: Transfer to Kibati Ranger Post (1,989m). Begin Nyiragongo volcano ascent at 8:00 AM. 5-7 hour climb gaining 1,500m through lava fields and forests to summit at 3,470m. Settle into crater rim cabin. Watch lava lake activity all night - nature's most hypnotic spectacle.",
      'Day 5: Sunrise over lava lake (weather permitting). Descend volcano (3-4 hours). Transfer back to Goma, cross to Rwanda. Drive to Kigali for evening departure OR extend with Lake Kivu relaxation.',
    ],
    idealFor: 'Adventure seekers • Volcano enthusiasts • Budget-conscious gorilla trekkers • Those wanting unique combinations • Fit travelers (volcano requires good fitness) • Conservation supporters',
    display_order: 8,
    is_active: true,
  },
  {
    id: 'ultimate-virunga',
    title: '10-12 Day Ultimate Virunga Massive Experience',
    duration: '10-12 Days / 9-11 Nights',
    destinations: 'Rwanda | Uganda | DRC - Complete Virunga Conservation Area',
    image_key: 'chimpanzees',
    image_url: null,
    category: 'multi-country',
    popular: false,
    family: false,
    highlights: [
      'Gorilla trekking in ALL THREE COUNTRIES (Rwanda, Uganda, DRC)',
      'Golden monkey tracking in Rwanda and Uganda',
      "Nyiragongo volcano summit with lava lake overnight",
      'Chimpanzee trekking in Nyungwe Forest',
      'Dian Fossey tomb hike in Rwanda',
      'Lake Kivu relaxation between adventures',
      'Batwa cultural experiences',
      'Support conservation across entire Virunga Massif',
      'Complete primate and volcanic experience',
    ],
    summary: 'The ultimate Central African adventure - gorilla trekking in three countries, active volcano summit, chimpanzees, golden monkeys, and cultural immersion across the entire Virunga Massif ecosystem.',
    days: [
      'Day 1: Arrive Kigali, Rwanda. City tour including Genocide Memorial, craft markets, local lunch. Transfer to Musanze near Volcanoes National Park. Welcome dinner.',
      'Day 2: Mountain gorilla trekking in Volcanoes National Park, Rwanda ($1,500 permit). Afternoon visit Twin Lakes or Ellen DeGeneres Campus. Evening cultural village visit.',
      'Day 3: Golden monkey tracking in Volcanoes NP. Afternoon: Optional Dian Fossey tomb hike OR transfer to Lake Kivu for sunset.',
      'Day 4: Morning at Lake Kivu - boat rides, swimming, kayaking. Afternoon transfer south toward Uganda border.',
      'Day 5: Cross into Uganda at Cyanika border. Transfer to Bwindi Impenetrable Forest (4-5 hours total from Musanze). Choose sector: Buhoma, Ruhija, Rushaga, or Nkuringo.',
      'Day 6: Mountain gorilla trekking in Bwindi, Uganda ($800 permit). Trek one of 19 habituated families. Evening: Batwa cultural experience learning forest skills from original inhabitants.',
      'Day 7: Optional second Uganda gorilla trek OR Gorilla Habituation Experience (4 hours with gorillas, $1,500) OR transfer to Mgahinga Gorilla National Park.',
      'Day 8: If in Mgahinga: Golden monkey tracking and volcano hiking (summit Mt. Gahinga or Mt. Muhabura). Transfer toward DRC border. Stay at Lake Kivu or near Gisenyi.',
      "Day 9: Cross Grande Barrier into Goma, DRC. Met by Virunga Foundation team. Transfer to Kibati Ranger Post. Begin Nyiragongo volcano ascent (5-7 hours). Overnight in crater rim cabin watching world's largest lava lake.",
      'Day 10: Sunrise over lava lake. Descend volcano (3-4 hours). Option A: Mountain gorilla trekking in Virunga National Park, DRC ($400 permit). OR Option B: Rest and relaxation. Transfer to Mikeno Lodge or back to Rwanda.',
      'Day 11 (Optional): If gorilla trek not done Day 10, complete DRC gorilla experience this morning. Transfer back to Rwanda. Drive to Nyungwe Forest (5-6 hours) OR return to Kigali area.',
      'Day 12: If extended to Nyungwe: Chimpanzee trekking and canopy walkway. Return to Kigali for evening departure. OR: Depart Kigali from Day 11 location.',
    ],
    idealFor: 'Ultimate primate enthusiasts • Multi-country adventurers • Conservation supporters wanting to help all three countries • Photographers seeking comprehensive documentation • Those with time and budget for complete experience • Fit travelers (includes volcano climb)',
    display_order: 9,
    is_active: true,
  },
];

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (Array.isArray(value)) return { arrayValue: { values: value.map((v) => toFirestoreValue(v)) } };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
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
  const res = await fetch(url, options);
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
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
}

async function verifyAdmin(projectId, idToken, uid) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/user_roles/${uid}`;
  const doc = await fetchJson(url, { headers: { Authorization: `Bearer ${idToken}` } });
  const role = doc?.fields?.role?.stringValue;
  if (role !== 'admin') throw new Error(`User ${uid} is not admin in user_roles`);
}

async function upsertItinerary(projectId, idToken, itinerary) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/itineraries/${itinerary.id}`;
  return fetchJson(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      buildFields({
        ...itinerary,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    ),
  });
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const env = await loadProjectEnv(ROOT);

  const apiKey = env.VITE_FIREBASE_API_KEY;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId) {
    throw new Error('Missing Firebase config in .env.local or .env.');
  }

  console.log(`Prepared ${itineraries.length} itinerary records`);

  if (dryRun) {
    console.log('Dry run complete. No writes performed.');
    return;
  }

  const email = process.env.FIREBASE_ADMIN_EMAIL;
  const password = process.env.FIREBASE_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('Set FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD to run migration.');
  }

  const auth = await signInWithEmailPassword(apiKey, email, password);
  const idToken = auth.idToken;
  const uid = auth.localId;

  if (!idToken || !uid) throw new Error('Failed to authenticate');

  await verifyAdmin(projectId, idToken, uid);

  let writes = 0;
  for (const itinerary of itineraries) {
    await upsertItinerary(projectId, idToken, itinerary);
    writes += 1;
  }

  console.log(`Migration complete: wrote ${writes} itineraries.`);
}

main().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
