# Security Audit Report

## Executive Summary

This audit found one confirmed secret-exposure class in the repository: tracked local environment files containing live project configuration, including a publicly flagged Google API key.

What was confirmed:
- A real Firebase Web API key was present in tracked `.env` and in git history.
- A Supabase anon/publishable JWT was present in tracked `.env` history.
- The repository was configured to ignore env files, but `.env` had already been committed, so ignore rules alone were not sufficient.
- Server-side code is already reading secrets from environment variables rather than hardcoding them in source.

What was not found:
- No committed private keys or service account JSON files in the current tree.
- No hardcoded OpenAI, Anthropic, Stripe, Twilio, SendGrid, PayPal, AWS, Cloudinary, or database credentials in committed source.
- The user-mentioned files `/scripts/seed-responses-to-firestore.mjs` and `/scripts/verify-seed-responses.mjs` do not exist in this repository.

## Findings By File

| File | Issue Found | Severity | Why It Is A Problem | Fix Applied | Rotate Now |
|---|---|---:|---|---|---|
| `.env` | Tracked env file contained live Firebase and Supabase values, including a Google API key | Critical | Ignored env files are safe only if they were never committed. Once tracked, the values are exposed in the repo and history. | Removed tracked `.env` from the repository, preserved local behavior via ignored `.env.local`, and updated scripts to load `.env.local` or `.env` safely. | Yes |
| `git history` (`4987fa5`, `ed4e0e6`) | Exposed Firebase API key and Supabase anon token remain in repository history | High | Even after deleting the file in HEAD, the values remain recoverable from historical commits on `main` and `origin/main`. | Reported cleanup approach only; did not rewrite history. | Yes |
| `.env.production` (local, untracked) | Local production env file existed outside the example-only pattern | Medium | Untracked but still easy to mis-handle or accidentally add later. | Moved local file to ignored `.env.production.local`. | No, unless separately published |
| [scripts/create-admin-user.mjs](/Users/theo/virungexpeditiontours/scripts/create-admin-user.mjs) | Hardcoded fallback Firebase project ID | Medium | Not a secret, but environment-specific configuration embedded in code encourages drift and accidental writes to the wrong project. | Refactored to load project ID from `.env.local` / `.env` or process env via shared helper. | No |
| [scripts/grant-admin-role.mjs](/Users/theo/virungexpeditiontours/scripts/grant-admin-role.mjs) | Hardcoded fallback Firebase project ID | Medium | Same risk as above. | Refactored to shared env loader. | No |
| [scripts/seed-tour-page-content-to-firestore.mjs](/Users/theo/virungexpeditiontours/scripts/seed-tour-page-content-to-firestore.mjs) | Hardcoded fallback Firebase project ID | Medium | Same risk as above. | Refactored to shared env loader. | No |
| [scripts/seed-seasonal-guide-content-to-firestore.mjs](/Users/theo/virungexpeditiontours/scripts/seed-seasonal-guide-content-to-firestore.mjs) | Hardcoded fallback Firebase project ID | Medium | Same risk as above. | Refactored to shared env loader. | No |
| [scripts/seed-managed-content-to-firestore.mjs](/Users/theo/virungexpeditiontours/scripts/seed-managed-content-to-firestore.mjs) | Loaded config only from tracked `.env` | High | This path encouraged storing live config in a committed file. | Refactored to load `.env.local` first, then `.env`, then process env. | No |
| [scripts/seed-tour-packages-to-firestore.mjs](/Users/theo/virungexpeditiontours/scripts/seed-tour-packages-to-firestore.mjs) | Loaded config only from tracked `.env`; also had stale emulator port `8181` | High | Committed env dependence was unsafe; wrong emulator port caused fragile local workflows. | Refactored to shared env loader and corrected emulator port to `8090`. | No |
| [scripts/seed-itineraries-to-firestore.mjs](/Users/theo/virungexpeditiontours/scripts/seed-itineraries-to-firestore.mjs) | Loaded config only from tracked `.env` | High | Same committed-env risk. | Refactored to shared env loader. | No |
| [scripts/seed-destination-packages-to-firestore.mjs](/Users/theo/virungexpeditiontours/scripts/seed-destination-packages-to-firestore.mjs) | Loaded config only from tracked `.env` | High | Same committed-env risk. | Refactored to shared env loader. | No |
| [scripts/migrate-frontend-content-to-firestore.mjs](/Users/theo/virungexpeditiontours/scripts/migrate-frontend-content-to-firestore.mjs) | Loaded config only from tracked `.env` | High | Same committed-env risk. | Refactored to shared env loader. | No |
| [EMULATOR_SETUP_GUIDE.md](/Users/theo/virungexpeditiontours/EMULATOR_SETUP_GUIDE.md) | Documentation still instructed users to rely on `.env` | Low | Docs could reintroduce the same mistake. | Updated guide to reference `.env.local` / `.env` safely. | No |
| [.env.example](/Users/theo/virungexpeditiontours/.env.example) | Incomplete env contract; safe/public vs private values not clearly separated | Medium | Ambiguous env docs lead to hardcoding or misuse of client-side variables in server scripts. | Expanded placeholders, separated client config from server-only variables, and set safer default for emulator toggle. | No |
| [.gitignore](/Users/theo/virungexpeditiontours/.gitignore) | Did not explicitly ignore credential file patterns | Medium | Easier to accidentally commit service accounts or private key files later. | Added ignores for service account JSONs, `.pem`, `.key`, Firebase debug artifacts, and local env variants. | No |
| [package.json](/Users/theo/virungexpeditiontours/package.json) and [scripts/scan-secrets.mjs](/Users/theo/virungexpeditiontours/scripts/scan-secrets.mjs) | No lightweight secret scanning safeguard | Medium | No automated guard meant exposed values could re-enter unnoticed. | Added `npm run audit:secrets` and a high-confidence scanner for tracked/unignored files. | No |

## Fixes Applied

### 1. Removed committed env exposure
- Deleted tracked `.env` from the repository.
- Preserved local behavior by copying the existing local values into ignored `.env.local`.
- Moved local `.env.production` to ignored `.env.production.local`.

### 2. Standardized env loading for scripts
- Added shared loader: [scripts/lib/env.mjs](/Users/theo/virungexpeditiontours/scripts/lib/env.mjs)
- Refactored root scripts to load from:
  1. `.env`
  2. `.env.local`
  3. `process.env`
- Removed hardcoded Firebase project ID fallbacks from Admin SDK helper scripts.

### 3. Hardened ignore rules
- Added explicit ignore patterns for:
  - `*-firebase-adminsdk-*.json`
  - `*service-account*.json`
  - `*.pem`
  - `*.key`
  - `.firebase/`
  - Firebase debug logs

### 4. Added repo-level secret scanning
- Added [scripts/scan-secrets.mjs](/Users/theo/virungexpeditiontours/scripts/scan-secrets.mjs)
- Added npm command:
  - `npm run audit:secrets`

## Environment Variables Required

### Browser/Public Firebase config
These identify the frontend Firebase project. They are not private secrets, but they should still come from env rather than being hardcoded in scripts.

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_USE_FIREBASE_EMULATORS`

### Legacy frontend Supabase config
These are public/anon client values, not server secrets, but they should still stay out of tracked local env files.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

### Script/server-only variables
- `FIREBASE_PROJECT_ID`
- `FIREBASE_ADMIN_EMAIL`
- `FIREBASE_ADMIN_PASSWORD`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `RESEND_API_KEY`
- `LOVABLE_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Keys That Must Be Rotated Now

### Immediate rotation required
- Firebase Web API key exposed via tracked `.env` and git history
  - Reason: Google has already flagged it publicly.
- Supabase anon/publishable key exposed in git history
  - Reason: It was committed historically and should be treated as compromised.

### Rotation conditional on wider exposure
- Any values stored in local `.env.production` before it was moved
  - Rotate if that file was ever uploaded, shared, or copied into CI outside the current machine.

## Git History Impact

Confirmed affected commits:
- `4987fa5` on `main` / `origin/main`
- `ed4e0e6` on `main` / `origin/main`

No committed `.env.local` or `.env.*.local` history was found.
No tags currently contain those commits.

### Recommended cleanup approach
- Use `git filter-repo`, not BFG, if you want precise path and content cleanup across this repo.
- Remove `.env` and any matching secret values from all refs.
- Review and rewrite:
  - `main`
  - `origin/main`
  - any tags if later found to contain the same commits
- After rewrite:
  - force-push affected branches
  - notify all collaborators to re-clone or hard-reset carefully
  - rotate the exposed credentials regardless, because history may already have been mirrored or cached

## Follow-up Recommendations

1. Rotate the exposed Firebase API key immediately in Google Cloud / Firebase Console.
2. Rotate the exposed Supabase anon key and review Supabase API restrictions and RLS.
3. Verify Firebase API key restrictions:
   - allowed APIs
   - allowed origins / referrers
4. Verify GitHub Actions secrets:
   - `VITE_FIREBASE_*`
   - `FIREBASE_SERVICE_ACCOUNT_VIRUNGA_TOURS`
   - `FIREBASE_TOKEN`
5. Keep server-only credentials out of Vite-prefixed env vars.
6. Run `npm run audit:secrets` in CI or before every release.
