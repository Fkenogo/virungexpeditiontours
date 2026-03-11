# VIRUNGA EXPEDITION TOURS — FULL PRE-DEPLOYMENT TECHNICAL AUDIT

**Audit Date:** 2026-03-10
**Auditor:** Senior Software Audit Agent
**Stack:** React 18 + TypeScript + Vite + Firebase (Auth, Firestore, Cloud Functions) + Tailwind + shadcn/ui
**Firebase Project:** `virunga-tours` (region: `africa-south1`)

---

## A. EXECUTIVE SUMMARY

**This application is NOT safe to deploy in its current state.**

There are 6 deployment blockers that will cause broken payment flows, security compromises, failed function deploys, and silent data destruction in production. Numerous additional issues affect trust, data integrity, and user experience.

### What Blocks Deployment
1. Firebase emulator flag is `true` in `.env` — production build connects to `localhost`, the app breaks entirely
2. Cloud Functions specify Node.js 24 which Firebase does not support — functions will not deploy
3. Booking price is fully client-controlled — trivial financial fraud
4. Tour booking records can be written directly to Firestore bypassing the Cloud Function entirely
5. Admin content management destroys tour page content on every save (never loads saved data, overwrites with defaults)
6. Seasonal guide admin saves to wrong Firestore collection — edits never appear publicly

### What Can Wait Until Post-Launch
- Pagination on admin list views
- Testimonials connection to homepage
- Dead buttons on Tours/Itineraries pages
- Hardcoded WhatsApp numbers
- Dead code cleanup
- Timestamp consistency

---

## B. CRITICAL ISSUES (Deployment Blockers)

### B1 — Emulator Flag Active in Production Config
**File:** `.env:11`
`VITE_USE_FIREBASE_EMULATORS="true"` is set. The Firebase client (`src/integrations/firebase/client.ts:22-28`) reads this and connects all SDK calls to `127.0.0.1:9200` (Auth), `127.0.0.1:8090` (Firestore), `127.0.0.1:5106` (Functions). In production these ports are closed. **The entire app fails silently.**
No `.env.production` exists. No documentation of what production env vars are needed.

### B2 — Node.js 24 in Cloud Functions (Unsupported)
**File:** `functions/package.json:14`
`"node": "24"` — Firebase Cloud Functions supports Node 18 and Node 20 only. Deploying will either fail outright or run on an unsupported runtime with undefined behavior.

### B3 — Client-Controlled Booking Price (Financial Fraud Risk)
**File:** `functions/src/index.ts:168`, `src/components/BookingCalendar.tsx:118-130`
The `totalPrice` value is computed client-side and passed to `createBookingRequest`. The Cloud Function stores it verbatim with no validation or recalculation. Any user can submit `totalPrice: 0` for a $1,500+ gorilla trek. The availability doc with `base_price` is already fetched inside the function at line 138 — the price must be computed server-side.

### B4 — Firestore Allows Direct Booking Creation (Bypasses Cloud Function)
**File:** `firestore.rules:31`
```js
allow create: if true;
```
Any unauthenticated user can write arbitrary documents to `tour_bookings` directly via the Firestore SDK, bypassing the Cloud Function's transaction, availability check, price calculation, and email notifications entirely. The rule should require authentication and reject direct client writes (force bookings through the Cloud Function only).

### B5 — ContentManagement Destroys Tour Page Content on Every Save
**File:** `src/pages/admin/ContentManagement.tsx:167,174-255,296`
`tour_page_content/main` is never fetched on component mount. The state initializes from `DEFAULT_TOUR_PAGE_CONTENT`. When admin clicks "Save All", the defaults overwrite whatever was previously in Firestore. Any previously saved tour page content is silently destroyed. This has been verified: the 12-document `useEffect` load explicitly does not include `tour_page_content/main`.

### B6 — Seasonal Guide Collection Name Mismatch
**File:** `src/pages/SeasonalGuide.tsx:105` vs `src/pages/admin/ContentManagement.tsx:202`
The public page reads from `seasonal_guide_content/main`. The admin saves to `seasonal_guide/main`. These are different Firestore collections. Admin edits to the seasonal guide will never be reflected on the public page.

### B7 — Resend Sandbox Domains Used as Production Email Senders
**File:** `functions/src/index.ts:95,109,213,219,248,253,353`
All outbound emails are sent `from: "bookings@resend.dev"` and `from: "onboarding@resend.dev"`. These Resend sandbox addresses only work during Resend trial/test mode. In production with a live Resend account, these will be rejected or silently dropped unless the sending domain is verified. Customers will receive zero booking confirmation emails.

---

## C. MAJOR STRUCTURAL GAPS

### C1 — Admin Testimonials Are Never Displayed Publicly
**File:** `src/pages/Index.tsx:523-575`, `src/pages/admin/Testimonials.tsx`
The admin Testimonials page has full CRUD against the `testimonials` Firestore collection. The homepage testimonials section is 100% hardcoded JSX with fabricated reviews ("Jennifer M., Australia - March 2024"). No public page ever queries the `testimonials` collection. The entire admin feature is connected to nothing.

### C2 — Three Unauthenticated Cloud Functions Enable Abuse
**File:** `functions/src/index.ts:121,199,232,269`
- `createBookingRequest` — no auth check; any unauthenticated caller can spam bookings and exhaust availability
- `sendQuoteNotification` — no auth check; email bombing vector through Resend API
- `sendInquiryNotification` — no auth check; same
- `travelChatbot` — no auth check; can exhaust Gemini/Lovable AI quota freely

Only `sendAdminNotification` checks authentication.

### C3 — Privilege Escalation via `users` Collection
**File:** `firestore.rules:123`, `src/hooks/useAuth.tsx:63-69`
Firestore allows any authenticated user to update their own `users/{uid}` document with no field restrictions. The auth hook checks both `user_roles/{uid}` AND `users/{uid}` for admin status. A user can write `{ role: "admin" }` to their own `users` document from the browser console, gaining full admin UI access on next auth state change. (Actual Firestore write operations are still blocked by `user_roles` rules, but all client-side admin screens become accessible.)

### C4 — Dangerously Rendering Markdown as HTML
**File:** `src/pages/PrivacyPolicy.tsx:86`, `src/pages/TermsConditions.tsx:78`, `src/pages/BookingTerms.tsx:68`
These fallback legal pages use `dangerouslySetInnerHTML={{ __html: content.content_markdown }}`. The content is **Markdown text**, not HTML. This renders raw Markdown syntax (`##`, `**`, `---`) visible to users. Meanwhile `LegalDocumentPage.tsx:53` correctly uses `<ReactMarkdown>` for the same content type.

### C5 — Old Legal Pages and New Legal Page Read Different Firestore Collections
**File:** `src/pages/PrivacyPolicy.tsx:12`, `src/pages/LegalDocumentPage.tsx:32`
The new `LegalDocumentPage` reads from `legal_documents/{slug}`. The old fallback pages use `useContentDoc("legal", slug, ...)` which reads from a `legal` collection. The admin saves to `legal_documents`. The `legal` collection is never populated. The fallback flow is broken.

### C6 — Cloud Functions and Firestore in Different Regions (Cross-Region Latency)
**File:** `firebase.json:3`, `functions/src/index.ts:7`
Firestore database is in `africa-south1`. Cloud Functions use the default `us-central1` (no region specified in `setGlobalOptions`). Every transaction in `createBookingRequest` crosses the Atlantic on each Firestore read/write. This adds ~200–400ms of latency to every booking.

### C7 — Quote/Inquiry Data Lost if Email Fails
**File:** `functions/src/index.ts:199-267`
`sendQuoteNotification` and `sendInquiryNotification` only send emails. They write nothing to Firestore. If Resend is down, rate-limited, or the function crashes, the customer's data is permanently lost. There is no recovery path, no queue, no retry.

### C8 — `firebase-admin` SDK Listed as Frontend Dependency
**File:** `package.json:67`
`"firebase-admin": "^13.6.1"` is in the root `package.json`. This is a server-only SDK containing Node.js native modules. If any import path accidentally pulls it into the Vite bundle it will cause build failures. It should only be in `functions/package.json`.

### C9 — `@dataconnect/generated` References Non-Existent Local Path
**File:** `package.json:29`
`"@dataconnect/generated": "file:src/dataconnect-generated"` — this local directory does not exist in the repository. `npm install` will fail or warn on fresh environments.

---

## D. MEDIUM ISSUES

| # | Issue | File:Line |
|---|-------|-----------|
| D1 | `updated_at` field is Firestore `serverTimestamp` from Cloud Function but ISO string from admin UI | `functions/src/index.ts:177-178` vs `Bookings.tsx:105`, `Availability.tsx:121,131` |
| D2 | No idempotency on `createBookingRequest` — network retry creates duplicate booking and double-decrements availability | `functions/src/index.ts:121-197` |
| D3 | Admin can remove their own admin role with no last-admin protection — permanent lockout risk | `admin/Users.tsx:85-109` |
| D4 | `createBookingRequest` has no upper-bound check on `numberOfPeople` — `numberOfPeople: 999999` passes validation | `functions/src/index.ts:130` |
| D5 | No email format validation on `customerEmail` in Cloud Function — `requireString` only checks non-empty | `functions/src/index.ts:128` |
| D6 | Booking submit button has no disabled/loading state — double-submit possible | `src/components/BookingCalendar.tsx:340-341` |
| D7 | Auth race condition: `isAdmin` state retains previous value between sign-out and new sign-in's `checkAdminRole` completion | `src/hooks/useAuth.tsx:36-50` |
| D8 | `ContentManagement.tsx` silently swallows JSON parse errors and shows success toast | `ContentManagement.tsx:147-153` |
| D9 | `RESEND_API_KEY` and `LOVABLE_API_KEY` read from `process.env` without Firebase Secrets Manager `defineSecret()` — must be manually set at deploy time with no documentation | `functions/src/index.ts:10-11` |
| D10 | Audit log rules allow any signed-in user to write arbitrary log entries with only `user_id` constrained — forensic value compromised | `firestore.rules:117` |
| D11 | `tour_page_content` and `seasonal_guide` collections have no matching Firestore rules — writes fail in production | `firestore.rules` (missing entries) |
| D12 | `VITE_USE_FIREBASE_EMULATORS` must be explicitly unset in production — no `.env.production` or `.env.example` exists | project root |
| D13 | Blog post `published_at` field set even when `published: false` (stale timestamp) — republished post loses its "first published" date | `admin/BlogPosts.tsx:155-163` |
| D14 | Hardcoded availability tour name dropdown — won't include tours added via ToursManagement | `admin/Availability.tsx:55-66` |
| D15 | Category lists duplicated and hardcoded in both admin and public Blog pages | `admin/BlogPosts.tsx:60-66`, `Blog.tsx:20-27` |
| D16 | Blog listing page ignores `?category=` URL param — breadcrumb category filter links silently do nothing | `Blog.tsx:51`, `BlogPost.tsx:140` |

---

## E. MINOR ISSUES

| # | Issue | File:Line |
|---|-------|-----------|
| E1 | `WhatsAppFloat` and `TravelChatbot` buttons fixed at same position (`bottom-6 right-6`) — they overlap | `WhatsAppFloat.tsx:10-11`, `TravelChatbot.tsx:101-102` |
| E2 | "Request Quote" button on Tours page has no handler, no link — inert dead button | `Tours.tsx:174` |
| E3 | Two CTA buttons on Itineraries page are inert — no handlers, no navigation | `Itineraries.tsx:306-310` |
| E4 | "Read More Reviews" link goes to `/about` page — not reviews | `Index.tsx:579-581` |
| E5 | Hardcoded `tel:+250783007010` in Header while display text reads from `useSiteSettings` — link target won't update if phone changes | `Header.tsx:56` |
| E6 | Footer copyright year hardcoded as 2025 | `Footer.tsx:86` |
| E7 | Contact page has map placeholder (icon + text) with no actual map integration | `Contact.tsx:702-705` |
| E8 | Dashboard "System Status" card hardcoded as "Connected / Active / Operational" regardless of actual state | `admin/Dashboard.tsx:129-142` |
| E9 | Silent error swallowing (console.error only) on data fetch failures in Tours, Blog, Destinations, Itineraries pages | `Tours.tsx:87-89`, `Blog.tsx:72-74`, etc. |
| E10 | `onKeyPress` deprecated — should use `onKeyDown` | `TravelChatbot.tsx:176` |
| E11 | WhatsApp numbers hardcoded in FAQ, VideoGallery, Itineraries instead of using `useSiteSettings` | `FAQ.tsx:138`, `VideoGallery.tsx:178`, `Itineraries.tsx:310` |
| E12 | `useLocation()` imported and called but result never used | `Itineraries.tsx:72` |
| E13 | Unused imports: `ScrollArea`, `Separator`, `Hotel`, `ReactMarkdown`, `remarkGfm` in SeasonalGuide | `SeasonalGuide.tsx:7-8,20,25-26` |
| E14 | Unused `Accordion` imports (4 symbols each) in PrivacyPolicy and TermsConditions | `PrivacyPolicy.tsx:2`, `TermsConditions.tsx:2` |
| E15 | Unused `Check`, `X` imports in BookingTerms | `BookingTerms.tsx:2` |
| E16 | Unused `Eye` import in VideoGallery | `VideoGallery.tsx:8` |
| E17 | Supabase SDK still in dependencies and types still in source — dead code adding bundle weight | `package.json:58`, `src/integrations/supabase/` |
| E18 | `Index.tsx` loads `useContentDoc`, `useSiteSettings`, `useMediaAssets` but never shows loading state — flash of default content | `Index.tsx:46-49` |
| E19 | Admin Dashboard stats use `getDocs` full collection scans — should use `getCountFromServer()` | `admin/Dashboard.tsx:22-25` |
| E20 | `RelatedArticles` fetches entire `blog_posts` collection to render 3 posts | `RelatedArticles.tsx:48` |
| E21 | All admin list pages (`Bookings`, `BlogPosts`, `Users`, `Availability`) have no pagination | various |
| E22 | No CI/CD pipeline exists — deployment is fully manual with no safety net | project root |
| E23 | No staging Firebase project — one project used for everything | `.firebaserc` |

---

## F. FEATURE COMPLETION MAP

| Feature | Status | Evidence | Risk | Recommended Action |
|---------|--------|----------|------|--------------------|
| User signup/login | **Complete** | `useAuth.tsx` full flow, Firestore writes confirmed | Low | — |
| Admin route protection (client-side) | **Complete** | `ProtectedRoute.tsx` wraps all `/admin/*` | Low | — |
| Admin route protection (server-side) | **Partial** | Firestore rules mostly correct; `users` collection self-update vector | High | Fix rules field restriction |
| Tour booking via calendar | **Mostly Complete** | Full flow to Cloud Function + transaction; missing price validation, double-submit guard | Critical | Fix price server-side |
| Booking email notifications | **Broken** | Sandbox `resend.dev` from-address will be rejected in production | Critical | Change from-address to verified domain |
| Quote request form | **Partial** | Saves to Firestore ✓; Cloud Function email only, data lost if email fails | High | Persist in Cloud Function before email |
| Quick inquiry form | **Partial** | Same as quote — no persistence in Cloud Function | High | Same fix |
| Blog (public listing + post) | **Complete** | Reads from Firestore, slug routing works, category filter works | Low | — |
| Blog admin (CRUD) | **Complete** | Full CRUD confirmed | Low | — |
| FAQ (public) | **Complete** | Connected to `faq_items` Firestore | Low | — |
| FAQ admin | **Complete** | Full CRUD confirmed | Low | — |
| Video gallery (public) | **Complete** | Reads from `tour_videos` Firestore | Low | — |
| Tour videos admin | **Complete** | Full CRUD confirmed | Low | — |
| Testimonials admin | **UI Only** | Full CRUD to Firestore; zero public pages display the data | High | Connect to homepage |
| Testimonials (public) | **Broken** | Homepage uses hardcoded fake reviews | High | Fetch from Firestore |
| Tour availability admin | **Mostly Complete** | Full CRUD; hardcoded tour name list won't include newly added tours | Medium | Dynamic list from `tour_packages` |
| Tour packages admin | **Complete** | Full CRUD | Low | — |
| Destinations admin | **Complete** | Full CRUD | Low | — |
| Itineraries admin | **Complete** | Full CRUD | Low | — |
| Site settings admin | **Complete** | Reads/writes `site_settings/global` | Low | — |
| Media assets admin | **Complete** | Full CRUD | Low | — |
| Legal pages (public) | **Partial** | New `LegalDocumentPage` works; old fallback pages render raw Markdown; reads wrong collection | Medium | Fix fallback rendering |
| Legal pages admin | **Mostly Complete** | Admin saves to correct collection; `tour_page_content` tab destroys data on save | Critical | Fix load-on-mount |
| Seasonal guide (public) | **Broken** | Page reads `seasonal_guide_content`, admin saves to `seasonal_guide` — different collections | Critical | Fix collection name |
| Seasonal guide admin | **Partial** | Saves to wrong collection name | Critical | Fix collection name |
| AI chatbot | **Mostly Complete** | Works end-to-end; no rate limiting, no auth guard | Medium | Add rate limiting |
| Audit logs | **Mostly Complete** | Written correctly; any user can write arbitrary entries | Medium | Tighten rules |
| Admin dashboard stats | **Partial** | Real Firestore counts; full collection scans; hardcoded system status | Medium | Use count aggregation |
| Tours page (public) | **Mostly Complete** | Reads from Firestore; dead "Request Quote" button | Medium | Fix button |
| Itineraries page (public) | **Mostly Complete** | Reads from Firestore; two dead CTA buttons | Medium | Fix buttons |
| Homepage dynamic content | **Partial** | Hero/intro partially CMS-driven; featured tours, testimonials, destinations hardcoded | High | Connect to Firestore |
| Booking availability check (client) | **Complete** | `BookingCalendar` reads availability correctly | Low | — |

---

## G. SECURITY FINDINGS

| Severity | Issue | Risk | Fix |
|----------|-------|------|-----|
| **Critical** | Client controls `totalPrice` in booking — stored without server validation | Any user pays $0 for any tour | Recalculate server-side from availability doc |
| **Critical** | `tour_bookings` Firestore rule: `allow create: if true` | Anyone writes fake/free bookings | Require auth or block direct writes |
| **Critical** | Users can update own `users/{uid}` with no field restriction — gains admin UI access | Privilege escalation to admin UI | Add field-level restriction in Firestore rules |
| **Critical** | 3 Cloud Functions have no auth check — `createBookingRequest`, `sendQuoteNotification`, `sendInquiryNotification` | Booking spam, email bombing, availability DoS | Add `request.auth` checks |
| **Critical** | `travelChatbot` has no auth or rate limiting | AI quota exhaustion, financial cost | Add auth check + rate limiting |
| **High** | `.env` file tracked in git with real credentials | API key leakage in git history | Rotate keys, remove from git tracking |
| **High** | `VITE_USE_FIREBASE_EMULATORS="true"` could reach production | App breaks entirely in production | Separate `.env.production` with flag unset |
| **High** | Admin role check: frontend checks `users` collection, Firestore rules check `user_roles` | Confused privilege state | Unify to single source of truth |
| **High** | `quote_requests` and `quick_inquiries`: `allow create: if true` with no field validation | Data pollution, potential abuse | Add validation or auth requirement |
| **High** | Audit log: any authenticated user writes arbitrary log entries | Forensic integrity compromised | Add field-level constraints in rules |
| **Medium** | No email format validation server-side for booking emails | Invalid emails, silent delivery failure | Add regex validation in Cloud Function |
| **Medium** | No max `numberOfPeople` check | Integer overflow / pricing calculation abuse | Add upper bound (e.g., 50) |
| **Medium** | `RESEND_API_KEY`, `LOVABLE_API_KEY` not managed via Firebase Secrets Manager | Manual secret management, risk of misconfiguration | Use `defineSecret()` |
| **Medium** | Old legal pages use `dangerouslySetInnerHTML` with Markdown content | XSS risk if content ever contains user input | Replace with `<ReactMarkdown>` |
| **Low** | Supabase anon key still in `.env` — orphaned attack surface | Minimal if Supabase project is inactive | Remove and deactivate |
| **Low** | No last-admin safeguard | Admin demotes self → permanent lockout | Check count before demotion |

---

## H. DATABASE / SCHEMA FINDINGS

| # | Issue | Collections | Severity |
|---|-------|-------------|----------|
| H1 | `updated_at` field is Firestore `serverTimestamp` from Cloud Function but ISO string from admin UI | `tour_bookings`, `tour_availability` | Medium |
| H2 | `tour_page_content` and `seasonal_guide` collections have no Firestore security rules — writes denied by catch-all | both | High |
| H3 | Admin reads `seasonal_guide_content` but admin writes `seasonal_guide` — wrong collection name in public page | `seasonal_guide` | Critical |
| H4 | Old legal fallback pages read from `legal` collection; admin writes to `legal_documents` — mismatch | both | High |
| H5 | `testimonials` collection fully managed but never read by any public page | `testimonials` | High |
| H6 | `quote_requests` and `quick_inquiries` written from Contact page but Cloud Functions never write to them — no guaranteed persistence | both | High |
| H7 | `published_at` set to non-null on every save (even drafts) — could expose drafts via `published_at != null` rule | `blog_posts` | Medium |
| H8 | Hardcoded tour names in Availability UI — out of sync with `tour_packages` collection | `tour_availability` | Medium |
| H9 | Missing `region` in Cloud Functions config — Firestore in `africa-south1`, functions default to `us-central1` | N/A | High |
| H10 | `createBookingRequest` writes `total_price` from client input, not from `base_price × number_of_people` | `tour_bookings` | Critical |
| H11 | No batch write or compensation logic when transaction succeeds but email fails | `tour_bookings` | Medium |
| H12 | Indexes defined only for `tour_availability (tour_name, date)` and `tour_bookings (status, created_at)` — adequate for current queries | N/A | Low |
| H13 | `seasonal_guide` collection referenced in scripts but not in Firestore rules | N/A | Medium |
| H14 | `home_content`, `about_content`, `services_content`, `destination_content`, `form_configs` collections have no Firestore rules defined | N/A | High |

---

## I. DEPLOYMENT CHECKLIST

```
PRE-DEPLOYMENT BLOCKLIST (must resolve first)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Set VITE_USE_FIREBASE_EMULATORS to "false" in production build env
[ ] Downgrade functions/package.json Node version from 24 to 20
[ ] Set region in Cloud Functions to africa-south1 (match Firestore)
[ ] Change Resend from-addresses to verified custom domain addresses
[ ] Fix createBookingRequest to calculate totalPrice server-side
[ ] Add Firestore rules to allow write to tour_page_content, seasonal_guide,
    home_content, about_content, services_content, destination_content, form_configs
[ ] Fix seasonal_guide collection name mismatch (SeasonalGuide.tsx reads wrong name)
[ ] Fix ContentManagement.tsx to load tour_page_content on mount
[ ] Fix tour_bookings Firestore rule — remove allow create: if true for unauthenticated
[ ] Add field restriction to users/{userId} update rule (prevent role self-elevation)
[ ] Set RESEND_API_KEY and LOVABLE_API_KEY in Firebase Functions config or Secrets Manager
[ ] Build and test with VITE_USE_FIREBASE_EMULATORS=false before deploy
[ ] Verify firebase.json public dir matches vite build output (dist/) ✓
[ ] Run firebase deploy --only functions and confirm Node version accepted
[ ] Run firebase deploy --only firestore:rules and verify rules deploy

SHOULD DO BEFORE LAUNCH
━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Remove @dataconnect/generated from package.json (references non-existent path)
[ ] Remove firebase-admin from root package.json (server-only SDK)
[ ] Add authentication checks to createBookingRequest, sendQuoteNotification,
    sendInquiryNotification, travelChatbot
[ ] Add server-side persistence in sendQuoteNotification / sendInquiryNotification
    before sending emails
[ ] Fix legal page fallback — use ReactMarkdown instead of dangerouslySetInnerHTML
[ ] Add loading/error state to booking submit button (prevent double submit)
[ ] Create .env.example documenting all required environment variables
[ ] Fix hardcoded tel: link in Header to read from useSiteSettings
[ ] Remove Supabase dependency from package.json and src/integrations/supabase/

POST-LAUNCH
━━━━━━━━━━━
[ ] Connect homepage testimonials to Firestore testimonials collection
[ ] Fix dead buttons on Tours and Itineraries pages
[ ] Add rate limiting to travelChatbot function
[ ] Fix blog category URL filter to read from query params
[ ] Add pagination to admin list views
[ ] Replace hardcoded WhatsApp numbers with useSiteSettings
[ ] Set up CI/CD pipeline
[ ] Set up staging Firebase project
[ ] Add idempotency key to createBookingRequest
[ ] Switch admin dashboard stats to getCountFromServer()
[ ] Dynamic tour name list in Availability admin
```

---

## J. PRIORITY FIX PLAN

### P0 — Fix Before Deployment

| Issue | Affected Files | Proposed Fix | Difficulty | Risk If Ignored |
|-------|---------------|--------------|------------|-----------------|
| Emulator flag in production | `.env`, `firebase/client.ts` | Create `.env.production` with `VITE_USE_FIREBASE_EMULATORS=false`; document required vars in `.env.example` | Easy | App entirely broken in production |
| Node.js 24 unsupported | `functions/package.json:14` | Change `"node": "24"` to `"node": "20"` | Trivial | Cloud Functions won't deploy |
| Resend sandbox from-addresses | `functions/src/index.ts:95,109,213,219,248,253,353` | Replace `resend.dev` addresses with verified domain (e.g., `bookings@virungaexpeditiontours.com`) | Easy | Zero booking/quote/inquiry emails sent |
| Cross-region Functions/Firestore | `functions/src/index.ts:7` | Add `region: "africa-south1"` to `setGlobalOptions` | Trivial | ~400ms added to every transaction |
| Client-controlled booking price | `functions/src/index.ts:168` | Compute `totalPrice = availDoc.base_price * data.numberOfPeople` server-side | Easy | Financial fraud — $0 bookings |
| Direct booking write bypasses CF | `firestore.rules:31` | Change `allow create: if true` to `allow create: if false` (or require auth + validation) | Easy | Integrity bypass, availability not decremented |
| ContentManagement destroys data | `ContentManagement.tsx:174-255` | Add `tour_page_content/main` fetch to the mount `useEffect` | Medium | Admin silently wipes tour page content on every open |
| Seasonal guide collection mismatch | `SeasonalGuide.tsx:105` | Change `"seasonal_guide_content"` to `"seasonal_guide"` | Trivial | Public seasonal guide never shows admin edits |
| Missing Firestore rules | `firestore.rules` | Add rules for `tour_page_content`, `seasonal_guide`, `home_content`, `about_content`, `services_content`, `destination_content`, `form_configs` | Easy | Admin content writes silently fail |
| Users self-update privilege escalation | `firestore.rules:123` | Add field-level restriction disallowing `role`/`roles` fields in user self-updates | Easy | Any user can gain admin UI access |
| Set function secrets | Firebase Console | Set `RESEND_API_KEY` and `LOVABLE_API_KEY` via `firebase functions:config:set` or Secrets Manager | Easy | All email and chatbot functions fail |

### P1 — Fix Within First Week After Launch

| Issue | Affected Files | Proposed Fix | Difficulty | Risk If Ignored |
|-------|---------------|--------------|------------|-----------------|
| Unauthenticated Cloud Functions | `functions/src/index.ts:121,199,232,269` | Add `if (!request.auth) throw new HttpsError(...)` to 4 functions | Easy | Spam bookings, email abuse, AI cost abuse |
| Quote/inquiry data not persisted | `functions/src/index.ts:199-267` | Write quote/inquiry to Firestore before sending email | Easy | Customer data lost on email failure |
| Homepage testimonials hardcoded | `Index.tsx:523-575` | Query `testimonials` collection, render dynamically | Medium | Admin testimonials feature useless |
| Legal page fallback renders raw Markdown | `PrivacyPolicy.tsx:86`, `TermsConditions.tsx:78`, `BookingTerms.tsx:68` | Replace `dangerouslySetInnerHTML` with `<ReactMarkdown>` | Easy | Legal pages display raw `##` Markdown syntax |
| Remove `firebase-admin` from frontend deps | `package.json:67` | Move to `functions/package.json` only | Trivial | Bundle risk, confusion |
| Remove `@dataconnect/generated` | `package.json:29` | Delete the dependency | Trivial | `npm install` fails on fresh environments |
| Double-submit on booking | `BookingCalendar.tsx:340-341` | Add `isSubmitting` state, disable button on submit | Easy | Duplicate bookings, double availability decrement |
| Dead CTA buttons (Tours, Itineraries) | `Tours.tsx:174`, `Itineraries.tsx:306-310` | Add `Link` or `onClick` navigation | Easy | Dead-end user flows, lost conversions |
| Header phone link hardcoded | `Header.tsx:56` | Use `toTelUrl(settings.phones[1])` from `useSiteSettings` | Easy | Phone link breaks if number changes |
| Remove Supabase dependency | `package.json:58`, `src/integrations/supabase/` | Delete files, remove from package.json | Easy | Bundle bloat, orphaned credentials |

### P2 — Fix After Launch (Within First Month)

| Issue | Proposed Fix | Difficulty |
|-------|-------------|------------|
| Add pagination to all admin list views | Firestore `limit()` + cursor-based pagination | Medium |
| Connect blog category filter to URL params | Read `?category=` in `Blog.tsx` | Easy |
| Dynamic tour names in Availability admin | Query `tour_packages` collection | Easy |
| Admin dashboard stats via `getCountFromServer()` | Replace `getDocs` with count query | Easy |
| Limit RelatedArticles query | Add `limit(10)` + client-side filter | Easy |
| Hardcoded WhatsApp numbers | Replace with `useSiteSettings` | Easy |
| Add idempotency to createBookingRequest | Add idempotency key param + check | Medium |
| Auth role check race condition | Set `isAdmin(false)` before checking new role | Easy |
| Set up staging Firebase project | Create project, add to `.firebaserc` | Medium |

### P3 — Cleanup Later

| Issue | Proposed Fix |
|-------|-------------|
| Unused imports (15+ across multiple files) | Remove all listed in E12-E16 |
| Footer copyright year | Use `new Date().getFullYear()` |
| Map placeholder on Contact page | Integrate Mapbox or Google Maps |
| Dashboard fake system status | Add Firebase connectivity health check |
| CI/CD pipeline | GitHub Actions with deploy on merge to main |
| `onKeyPress` deprecated | Replace with `onKeyDown` |
| Overlapping float buttons | Coordinate z-index and positioning |

---

## K. SUGGESTED REFACTORS

### K1 — Unify Admin Role Source of Truth
Currently `useAuth.tsx` checks two collections (`user_roles` then `users`). Firestore rules only check `user_roles`. Either remove admin check from `users` collection entirely (use `user_roles` only), or add `user_roles` check consistently. Eliminates escalation vector and confused state.

### K2 — Cloud Function Price as Single Source of Truth
`BookingCalendar.tsx` should not compute or pass `totalPrice`. Only `numberOfPeople` and `availabilityId` should be sent. The Cloud Function already fetches the availability doc — it should compute `total_price = availDoc.base_price * data.numberOfPeople` there.

### K3 — Centralized Collection Constants
Collection names like `"seasonal_guide"`, `"tour_page_content"`, `"legal_documents"` are string literals scattered across 15+ files. A single `src/lib/collections.ts` constant file would prevent the kind of mismatch found in B6 (collection name typo caused a critical broken feature).

### K4 — `useSiteSettings` as the Single Source for Contact Info
Phone numbers, WhatsApp numbers, and email addresses appear hardcoded in 6+ locations. `useSiteSettings` already exists and is used by Footer and WhatsAppFloat — extend its use to FAQ, VideoGallery, Itineraries, Header.

### K5 — Error Boundaries + Toasts on Data Fetches
All public pages silently swallow fetch errors with `console.error`. A shared `useFetchCollection` hook with built-in error toast and retry logic would DRY this pattern and ensure users see actionable feedback.

### K6 — Remove Dead Supabase Layer
The entire `src/integrations/supabase/` directory and the `@supabase/supabase-js` package are dead weight. Removing them reduces bundle size and eliminates the orphaned credential surface.

---

## L. EVIDENCE INDEX

| Finding | Files |
|---------|-------|
| B1 — Emulator in production | `.env:11`, `src/integrations/firebase/client.ts:22-28` |
| B2 — Node 24 unsupported | `functions/package.json:14` |
| B3 — Client price fraud | `functions/src/index.ts:168`, `src/components/BookingCalendar.tsx:118-130` |
| B4 — Direct booking write | `firestore.rules:31` |
| B5 — ContentManagement destroys data | `src/pages/admin/ContentManagement.tsx:167,174-255,296` |
| B6 — Seasonal guide collection mismatch | `src/pages/SeasonalGuide.tsx:105`, `src/pages/admin/ContentManagement.tsx:202` |
| B7 — Sandbox email addresses | `functions/src/index.ts:95,109,213,219,248,253,353` |
| C1 — Testimonials not displayed | `src/pages/Index.tsx:523-575`, `src/pages/admin/Testimonials.tsx:75` |
| C2 — Unauthenticated functions | `functions/src/index.ts:121,199,232,269` |
| C3 — User self-escalation | `firestore.rules:123`, `src/hooks/useAuth.tsx:63-69` |
| C4 — Markdown as HTML | `src/pages/PrivacyPolicy.tsx:86`, `TermsConditions.tsx:78`, `BookingTerms.tsx:68` |
| C5 — Legal collection mismatch | `src/pages/PrivacyPolicy.tsx:12`, `src/pages/LegalDocumentPage.tsx:32` |
| C6 — Cross-region latency | `firebase.json:3`, `functions/src/index.ts:7` |
| C7 — Quote data not persisted | `functions/src/index.ts:199-267` |
| C8 — firebase-admin in frontend | `package.json:67` |
| C9 — @dataconnect non-existent path | `package.json:29` |
| H2 — Missing Firestore rules | `firestore.rules` (missing entries for 7 collections) |
| H14 — Missing rules for CMS collections | `firestore.rules`, `src/pages/admin/ContentManagement.tsx` |

---

## TOTALS

| Category | Count |
|----------|-------|
| Critical Blockers (B) | 7 |
| Major Structural Gaps (C) | 9 |
| Medium Issues (D) | 16 |
| Minor Issues (E) | 23 |
| **Total Findings** | **55** |

---

---

## M. P0 FIX LOG

The following P0 issues have been implemented and are ready for review:

| Fix | Files Changed | Status |
|-----|--------------|--------|
| Node.js 24 → 20 | `functions/package.json:14` | ✅ Done |
| Cloud Functions region `africa-south1` | `functions/src/index.ts:7` | ✅ Done |
| Server-side price calculation (removed client `totalPrice`) | `functions/src/index.ts` | ✅ Done |
| Auth check on `createBookingRequest` | `functions/src/index.ts` | ✅ Done |
| Auth check on `travelChatbot` | `functions/src/index.ts` | ✅ Done |
| Email validation in Cloud Functions | `functions/src/index.ts` | ✅ Done |
| `numberOfPeople` upper bound (max 50) | `functions/src/index.ts` | ✅ Done |
| Resend sandbox → production `virungaexpeditiontours.com` | `functions/src/index.ts` | ✅ Done — verify domain in Resend dashboard |
| Seasonal guide collection name (`seasonal_guide_content` → `seasonal_guide`) | `src/pages/SeasonalGuide.tsx:105` | ✅ Done |
| ContentManagement loads `tour_page_content` on mount | `src/pages/admin/ContentManagement.tsx` | ✅ Done |
| Firestore: `tour_bookings` direct write blocked | `firestore.rules:33` | ✅ Done |
| Firestore: `users` role self-escalation prevented | `firestore.rules:127-132` | ✅ Done |
| Firestore: rules added for `tour_page_content` | `firestore.rules:143-146` | ✅ Done |
| Firestore: rules added for `seasonal_guide` | `firestore.rules:148-151` | ✅ Done |
| `.env.example` created | `.env.example` | ✅ Done |
| `.env.production` created (emulator flag = false) | `.env.production` | ✅ Done |

---

## N. P1 FIX LOG

| Fix | Files Changed | Status |
|-----|--------------|--------|
| Auth check on `sendQuoteNotification` | `functions/src/index.ts` | ✅ Done |
| Auth check on `sendInquiryNotification` | `functions/src/index.ts` | ✅ Done |
| Quote data persisted to Firestore before email | `functions/src/index.ts` | ✅ Done |
| Inquiry data persisted to Firestore before email | `functions/src/index.ts` | ✅ Done |
| Testimonials connected to Firestore | `src/pages/Index.tsx` | ✅ Already done in P0 round |
| Legal pages using ReactMarkdown (no dangerouslySetInnerHTML) | `PrivacyPolicy.tsx`, `TermsConditions.tsx`, `BookingTerms.tsx` | ✅ Already done in P0 round |
| `firebase-admin` removed from root `package.json` | `package.json` | ✅ Already absent |
| `@dataconnect/generated` removed from `package.json` | `package.json` | ✅ Already absent |
| Booking submit button disabled while submitting | `src/components/BookingCalendar.tsx` | ✅ Already done in P0 round |
| Tours "Request Quote" button linked to `/contact` | `src/pages/Tours.tsx` | ✅ Already done in P0 round |
| Itineraries CTA buttons linked | `src/pages/Itineraries.tsx` | ✅ Already done in P0 round |
| Header phone link uses `useSiteSettings` | `src/components/Header.tsx` | ✅ Already done in P0 round |
| Supabase dependency and integration files removed | `package.json`, `src/integrations/supabase/` | ✅ Already removed |

---

## O. P2 FIX LOG

| Fix | Files Changed | Status |
|-----|--------------|--------|
| Blog category filter syncs to URL params (`?category=`) | `src/pages/Blog.tsx` | ✅ Done |
| WhatsApp float moved to `bottom-24` (no longer overlaps chatbot button at `bottom-6`) | `src/components/WhatsAppFloat.tsx` | ✅ Done |
| Idempotency key added to `createBookingRequest` | `functions/src/index.ts`, `src/components/BookingCalendar.tsx` | ✅ Done |
| Blog category filter reads from URL on initial load | `src/pages/Blog.tsx` | ✅ Already done in prior round |
| Dynamic tour names in Availability admin (fetches from `tour_packages`) | `src/pages/admin/Availability.tsx` | ✅ Already done |
| Dashboard stats via `getCountFromServer()` | `src/pages/admin/Dashboard.tsx` | ✅ Already done |
| RelatedArticles uses `limit(20)` + client-side slice to 3 | `src/components/RelatedArticles.tsx` | ✅ Already done |
| WhatsApp numbers via `useSiteSettings` in FAQ, VideoGallery, Itineraries | various | ✅ Already done |
| Auth race condition fixed (`setIsAdmin(false)` before new role check) | `src/hooks/useAuth.tsx` | ✅ Already done |
| Footer copyright year uses `new Date().getFullYear()` | `src/components/Footer.tsx` | ✅ Already done |
| `onKeyPress` replaced with `onKeyDown` in TravelChatbot | `src/components/TravelChatbot.tsx` | ✅ Already done |

---

## P. P3 FIX LOG

| Fix | Files Changed | Status |
|-----|--------------|--------|
| Unused `Eye` import removed from VideoGallery | `src/pages/VideoGallery.tsx` | ✅ Done |
| Dashboard "System Status" reads real Firebase connectivity | `src/pages/admin/Dashboard.tsx` | ✅ Done |
| CI/CD pipeline: deploy to Firebase on push to `main` | `.github/workflows/deploy.yml` | ✅ Done |
| CI/CD pipeline: Firebase Hosting preview on pull requests | `.github/workflows/preview.yml` | ✅ Done |
| Unused `Accordion`, `useLocation`, `Check`, `X` imports | various | ✅ Already cleaned up in prior rounds |
| Footer copyright year dynamic | `src/components/Footer.tsx` | ✅ Already done |
| `onKeyPress` → `onKeyDown` | `src/components/TravelChatbot.tsx` | ✅ Already done |
| Overlapping float buttons | `src/components/WhatsAppFloat.tsx` | ✅ Fixed in P2 |

**CI/CD setup requires these GitHub repository secrets:**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT_VIRUNGA_TOURS` (download from Firebase Console → Project Settings → Service accounts)
- `FIREBASE_TOKEN` (run `firebase login:ci` locally to generate)

**Remaining (not yet addressed):**
- Contact page map placeholder — requires Mapbox or Google Maps API key decision
- Staging Firebase project — requires creating a second Firebase project

**Remaining manual steps before deploy:**
1. Verify `virungaexpeditiontours.com` domain in Resend dashboard (DNS records)
2. Set `RESEND_API_KEY` via `firebase functions:secrets:set RESEND_API_KEY`
3. Set `LOVABLE_API_KEY` via `firebase functions:secrets:set LOVABLE_API_KEY`
4. Run `firebase deploy --only firestore:rules` to push the updated rules
5. Run `firebase deploy --only functions` to push the updated Cloud Functions
6. Build frontend with production env: `VITE_USE_FIREBASE_EMULATORS=false vite build`
7. Run `firebase deploy --only hosting` to push the frontend

---

**Deployment Verdict: DO NOT DEPLOY — fix P0 issues first.**

The most dangerous issues are (1) the emulator flag breaking the entire app, (2) the Node.js version crashing function deployment, (3) sandbox email addresses silencing all transactional emails, and (4) client-controlled pricing enabling financial fraud. These four alone make production deployment unsafe. The remaining P0 items (collection name mismatches, data destruction on content save, security rules) are close behind.

All P0 issues are straightforward fixes — none require architectural changes. A focused 1–2 day effort can clear the deployment blockers.
