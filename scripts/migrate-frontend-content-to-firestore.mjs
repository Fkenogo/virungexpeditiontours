import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {loadProjectEnv} from './lib/env.mjs';

const ROOT = process.cwd();
const TOURS_DIR = path.join(ROOT, 'src/pages/tours');

function normalizeSpaces(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function hashId(prefix, value) {
  const digest = crypto.createHash('sha1').update(value).digest('hex').slice(0, 20);
  return `${prefix}_${digest}`;
}

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map((v) => toFirestoreValue(v)),
      },
    };
  }
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
  let json = null;
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

function extractTourName(source, fallbackName) {
  const match = source.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (match?.[1]) return normalizeSpaces(match[1]);
  return fallbackName;
}

function extractVideos(source, tourName) {
  const out = [];
  const regex = /<VideoEmbed\s+url="([^"]+)"\s+title="([^"]+)"/gms;
  let m;
  let index = 0;
  while ((m = regex.exec(source)) !== null) {
    index += 1;
    const url = normalizeSpaces(m[1]);
    const title = normalizeSpaces(m[2]);
    const type = /testimonial/i.test(title) ? 'testimonial' : 'preview';
    out.push({
      id: hashId('video', `${tourName}|${url}|${title}`),
      tour_name: tourName,
      video_url: url,
      video_type: type,
      title,
      description: null,
      display_order: index,
      is_active: true,
    });
  }
  return out;
}

function extractTestimonials(source, tourName) {
  const out = [];
  const regex = /<p className="text-foreground\/80 mb-4">\s*"([\s\S]*?)"\s*<\/p>\s*<p className="font-semibold">\s*[—-]\s*([^<]+)<\/p>\s*<p className="text-sm text-foreground\/60">\s*([^<]+)<\/p>/gms;
  let m;
  let index = 0;
  while ((m = regex.exec(source)) !== null) {
    index += 1;
    const testimonialText = normalizeSpaces(m[1]);
    const customerName = normalizeSpaces(m[2]);
    const visitTag = normalizeSpaces(m[3]);
    out.push({
      id: hashId('testimonial', `${tourName}|${customerName}|${testimonialText}`),
      customer_name: customerName,
      customer_location: 'Unknown',
      tour_name: tourName,
      rating: 5,
      testimonial_text: testimonialText,
      visit_date: null,
      is_featured: index === 1,
      is_active: true,
      display_order: index,
      source_note: visitTag,
    });
  }
  return out;
}

async function extractFromTourFiles() {
  const files = (await fs.readdir(TOURS_DIR)).filter((f) => f.endsWith('.tsx'));
  const videos = [];
  const testimonials = [];

  for (const file of files) {
    const filePath = path.join(TOURS_DIR, file);
    const source = await fs.readFile(filePath, 'utf8');
    const fallbackName = file.replace('.tsx', '');
    const tourName = extractTourName(source, fallbackName);

    videos.push(...extractVideos(source, tourName));
    testimonials.push(...extractTestimonials(source, tourName));
  }

  // dedupe by id
  const dedupVideos = Array.from(new Map(videos.map((v) => [v.id, v])).values());
  const dedupTestimonials = Array.from(new Map(testimonials.map((t) => [t.id, t])).values());

  return { filesCount: files.length, videos: dedupVideos, testimonials: dedupTestimonials };
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
  const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/user_roles/${uid}`;
  const doc = await fetchJson(docUrl, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  const role = doc?.fields?.role?.stringValue;
  if (role !== 'admin') {
    throw new Error(`User ${uid} is not admin in user_roles`);
  }
}

async function upsertDocument(projectId, idToken, collection, docId, payload) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}/${docId}`;
  return fetchJson(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildFields(payload)),
  });
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const dryRun = args.has('--dry-run');

  const env = await loadProjectEnv(ROOT);

  const apiKey = env.VITE_FIREBASE_API_KEY;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;
  const email = process.env.FIREBASE_ADMIN_EMAIL;
  const password = process.env.FIREBASE_ADMIN_PASSWORD;

  if (!apiKey || !projectId) {
    throw new Error('Missing Firebase config in .env.local or .env (VITE_FIREBASE_API_KEY / VITE_FIREBASE_PROJECT_ID).');
  }

  const extracted = await extractFromTourFiles();

  console.log(`Scanned ${extracted.filesCount} tour files`);
  console.log(`Prepared ${extracted.videos.length} tour_videos records`);
  console.log(`Prepared ${extracted.testimonials.length} testimonials records`);

  if (dryRun) {
    console.log('Dry run complete. No Firestore writes performed.');
    return;
  }

  if (!email || !password) {
    throw new Error('Set FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD env vars to run migration.');
  }

  const auth = await signInWithEmailPassword(apiKey, email, password);
  const idToken = auth.idToken;
  const uid = auth.localId;

  if (!idToken || !uid) {
    throw new Error('Failed to obtain Firebase auth token.');
  }

  await verifyAdmin(projectId, idToken, uid);

  let videosWritten = 0;
  for (const item of extracted.videos) {
    const now = new Date().toISOString();
    await upsertDocument(projectId, idToken, 'tour_videos', item.id, {
      ...item,
      created_at: now,
      updated_at: now,
    });
    videosWritten += 1;
  }

  let testimonialsWritten = 0;
  for (const item of extracted.testimonials) {
    const now = new Date().toISOString();
    await upsertDocument(projectId, idToken, 'testimonials', item.id, {
      ...item,
      created_at: now,
      updated_at: now,
    });
    testimonialsWritten += 1;
  }

  console.log(`Migration complete: wrote ${videosWritten} tour_videos and ${testimonialsWritten} testimonials.`);
}

main().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
