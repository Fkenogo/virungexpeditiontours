import fs from "node:fs/promises";
import path from "node:path";
import {loadProjectEnv} from "./lib/env.mjs";
import {DESTINATION_PACKAGES} from "../src/content/destinationDefaults.js";

const ROOT = process.cwd();
const destinationPackages = DESTINATION_PACKAGES;

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
  const env = await loadProjectEnv(ROOT);

  const apiKey = env.VITE_FIREBASE_API_KEY;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;
  if (!apiKey || !projectId) throw new Error("Missing Firebase config in .env.local or .env.");

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
