#!/usr/bin/env node

import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || "virungexpeditiontours",
};

try {
  initializeApp(firebaseConfig);
  console.log("✅ Firebase Admin SDK initialized successfully");
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin SDK:", error);
  process.exit(1);
}

const db = getFirestore();

// Use emulator if running with --emulator flag
if (process.argv.includes('--emulator')) {
  console.log('🔧 Using Firebase Emulator');
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FUNCTIONS_EMULATOR_HOST = 'localhost:5001';
  
  // Configure Firestore to use emulator
  db.settings({
    host: 'localhost:8090',
    ssl: false
  });
  console.log('📡 Connected to Firestore Emulator on localhost:8090');
}

async function grantAdminRole() {
  try {
    console.log("🛡️  Granting Admin Role to User...");
    
    // Get all users from the users collection
    const usersSnapshot = await db.collection('users').get();
    
    if (usersSnapshot.empty) {
      console.log("❌ No users found in the database");
      console.log("💡 Please sign up first, then run this script to grant admin privileges");
      return;
    }

    console.log(`📋 Found ${usersSnapshot.size} user(s):`);
    
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(`   - ${doc.id}: ${userData.full_name || 'No name'} (${userData.email})`);
    });

    // Grant admin role to the first user (or you can modify this logic)
    const firstUser = usersSnapshot.docs[0];
    const userId = firstUser.id;
    const userData = firstUser.data();

    // Update user_roles collection
    await db.collection('user_roles').doc(userId).set({
      role: 'admin',
      roles: ['admin'],
      updated_at: Timestamp.now()
    }, { merge: true });

    // Update users collection
    await db.collection('users').doc(userId).set({
      roles: ['admin'],
      updated_at: Timestamp.now()
    }, { merge: true });

    console.log(`✅ Admin role granted to user: ${userData.full_name || userData.email}`);
    console.log("🛡️  User now has admin privileges and can access the admin dashboard");
    console.log("📍 Navigate to /admin to access the admin interface");
    
  } catch (error) {
    console.error("❌ Error granting admin role:", error);
    process.exit(1);
  }
}

// Run the function
grantAdminRole();