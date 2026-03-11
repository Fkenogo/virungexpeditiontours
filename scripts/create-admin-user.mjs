#!/usr/bin/env node

import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { configureAdminSdkEmulator, getFirebaseProjectId, loadProjectEnv } from "./lib/env.mjs";

const env = await loadProjectEnv();
const projectId = getFirebaseProjectId(env);

if (!projectId) {
  throw new Error("Missing FIREBASE_PROJECT_ID or VITE_FIREBASE_PROJECT_ID in .env.local or .env.");
}

// Initialize Firebase Admin SDK
const firebaseConfig = {
  projectId,
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
  configureAdminSdkEmulator(db);
  console.log('📡 Connected to Firestore Emulator on localhost:8090');
}

async function createAdminUser() {
  try {
    console.log("🛡️  Creating Admin User Account...");
    
    // Check if user already exists
    const usersSnapshot = await db.collection('users').get();
    const existingUsers = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));

    if (existingUsers.length > 0) {
      console.log("📋 Existing users found:");
      existingUsers.forEach(user => {
        console.log(`   - ${user.id}: ${user.data.full_name || 'No name'} (${user.data.email})`);
      });
      
      // Grant admin to the first existing user
      const firstUser = existingUsers[0];
      await grantAdminToUser(firstUser.id, firstUser.data);
      return;
    }

    // Create a new admin user
    const adminUserId = 'admin-user-' + Date.now();
    const adminData = {
      full_name: 'Admin User',
      email: 'admin@virungatours.com',
      roles: ['admin'],
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    // Create user in users collection
    await db.collection('users').doc(adminUserId).set(adminData);
    
    // Create user in user_roles collection
    await db.collection('user_roles').doc(adminUserId).set({
      role: 'admin',
      roles: ['admin'],
      updated_at: Timestamp.now()
    });

    console.log(`✅ Admin user created successfully!`);
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`👤 Name: ${adminData.full_name}`);
    console.log(`🆔 User ID: ${adminUserId}`);
    console.log("🛡️  User has admin privileges");
    console.log("📍 You can now sign in with this account and access the admin dashboard");
    
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

async function grantAdminToUser(userId, userData) {
  try {
    console.log(`🛡️  Granting admin role to existing user: ${userData.full_name || userData.email}`);
    
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
createAdminUser();
