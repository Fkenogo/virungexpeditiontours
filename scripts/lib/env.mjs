import fs from "node:fs/promises";
import path from "node:path";

const ENV_FILENAMES = [".env", ".env.local"];

export function parseEnv(text) {
  const env = {};
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

export async function loadProjectEnv(root = process.cwd()) {
  const loaded = {};

  for (const filename of ENV_FILENAMES) {
    const filePath = path.join(root, filename);
    try {
      const text = await fs.readFile(filePath, "utf8");
      Object.assign(loaded, parseEnv(text));
    } catch (error) {
      if (error && error.code === "ENOENT") continue;
      throw error;
    }
  }

  return {...loaded, ...process.env};
}

export function getFirebaseProjectId(env) {
  return env.FIREBASE_PROJECT_ID || env.VITE_FIREBASE_PROJECT_ID || null;
}

export function configureAdminSdkEmulator(db) {
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8090";
  process.env.FUNCTIONS_EMULATOR_HOST = process.env.FUNCTIONS_EMULATOR_HOST || "127.0.0.1:5106";

  db.settings({
    host: "127.0.0.1:8090",
    ssl: false,
  });
}
