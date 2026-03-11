# Firebase Emulator Setup Guide

This guide explains how to set up and use the Firebase Emulator for local development and testing of the Virunga Expedition Tours content management system.

## Prerequisites

1. **Firebase CLI installed**: If not installed, run:
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase project initialized**: If not done, run:
   ```bash
   firebase init
   ```
   Select Firestore and Functions when prompted.

## Starting the Firebase Emulator

### Option 1: Using the default firebase.json configuration
```bash
firebase emulators:start
```

This will start all emulators defined in your `firebase.json` file.

### Option 2: Start only Firestore emulator
```bash
firebase emulators:start --only firestore
```

### Option 3: Start with custom ports (if default ports are in use)
```bash
firebase emulators:start --only firestore --port 8080
```

**Note**: The firebase.json has been configured to use alternative ports to avoid conflicts:
- Firestore: 8090 (instead of 8181)
- Auth: 9200 (instead of 9199)
- Functions: 5106 (instead of 5105)
- UI: 4003 (instead of 4002)

## Running Seed Scripts with Emulator

All seed scripts now support the `--emulator` flag to connect to the local emulator instead of production Firebase.

### Tour Page Content
```bash
npm run migrate:tour-page-content -- --emulator
# OR
node scripts/seed-tour-page-content-to-firestore.mjs --emulator
```

### Seasonal Guide Content
```bash
npm run migrate:seasonal-guide-content -- --emulator
# OR
node scripts/seed-seasonal-guide-content-to-firestore.mjs --emulator
```

### Managed Content (Legal pages, forms, etc.)
```bash
npm run migrate:managed-content -- --emulator
# OR
node scripts/seed-managed-content-to-firestore.mjs --emulator
```

## Environment Variables for Emulator

The emulator scripts automatically configure the following environment variables when using the `--emulator` flag:

- `FIRESTORE_EMULATOR_HOST=localhost:8080`
- `FUNCTIONS_EMULATOR_HOST=localhost:5001`

## Verifying Emulator is Running

1. **Check the emulator UI**: Open http://localhost:4000 in your browser
2. **Check Firestore**: Open http://localhost:8080 in your browser
3. **Check console output**: Look for "Firestore Emulator ready" message

## Expected Console Output

When running seed scripts with the emulator flag, you should see:

```
🔧 Using Firebase Emulator
📡 Connected to Firestore Emulator on localhost:8080
✅ Firebase Admin SDK initialized successfully
🌿 Seeding Seasonal Guide Content to Firestore...
✅ Seasonal Guide Content seeded successfully!
📍 Document path: seasonal_guide/main
📊 Content includes:
   - 3 National Parks
   - 4 Seasons
   - 5 Activities
   - 3 Travel Tips
   - 5 Comparison Metrics
   - 4 Data Points
```

## Troubleshooting

### Error: "Network request failed"
**Cause**: Emulator is not running
**Solution**: Start the emulator first:
```bash
firebase emulators:start --only firestore
```

### Error: "Permission denied"
**Cause**: Scripts trying to connect to production Firebase
**Solution**: Use the `--emulator` flag:
```bash
npm run migrate:tour-page-content -- --emulator
```

### Error: "Connection refused"
**Cause**: Wrong port or emulator not accessible
**Solution**: Check emulator is running on correct port (default: 8080)

### Error: "Missing Firebase config"
**Cause**: .env file missing or incomplete
**Solution**: Ensure .env file has all required Firebase configuration variables

## Development Workflow

1. **Start emulator**:
   ```bash
   firebase emulators:start
   ```

2. **Seed content** (in separate terminal):
   ```bash
   npm run migrate:managed-content -- --emulator
   npm run migrate:tour-page-content -- --emulator
   npm run migrate:seasonal-guide-content -- --emulator
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   (Development server runs on http://localhost:8082)

4. **Access admin interface**:
   Navigate to `http://localhost:8082/admin/content-management`

5. **View seeded content**:
   Navigate to `http://localhost:8082/tours` and other frontend pages

## Production Deployment

When deploying to production, **do not** use the `--emulator` flag:

```bash
# Production deployment (no --emulator flag)
npm run migrate:managed-content
npm run migrate:tour-page-content
npm run migrate:seasonal-guide-content
```

## Resetting Emulator Data

To clear all data from the emulator and start fresh:

1. **Stop the emulator** (Ctrl+C)
2. **Delete emulator data directory**:
   ```bash
   rm -rf .firebase/emulator
   ```
3. **Restart emulator**:
   ```bash
   firebase emulators:start
   ```
4. **Re-seed content**:
   ```bash
   npm run migrate:managed-content -- --emulator
   npm run migrate:tour-page-content -- --emulator
   npm run migrate:seasonal-guide-content -- --emulator
   ```

## Emulator UI Features

The Firebase Emulator UI (http://localhost:4000) provides:

- **Firestore Data Viewer**: Browse and edit documents
- **Authentication**: Manage test users
- **Functions**: View function logs and triggers
- **Storage**: Manage test files and assets
- **Realtime Database**: View and edit realtime data

This is particularly useful for:
- Verifying seed scripts work correctly
- Manually editing test data
- Debugging content management issues
- Testing admin interface functionality

## Next Steps

After setting up the emulator and seeding content:

1. **Test the admin interface**: Navigate to `/admin/content-management` and verify all tabs work
2. **Test frontend pages**: Visit `/tours`, `/seasonal-guide`, and other pages to see dynamic content
3. **Add sample content**: Use the admin interface to add your own content
4. **Test functionality**: Verify all features work as expected before deploying to production