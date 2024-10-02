import { execSync } from 'child_process';
import fs from 'fs';

export function setupAuth(authTool) {
  if (authTool === 'nextauth') { 
    execSync('npm install next-auth', { stdio: 'inherit' });
  } else if (authTool === 'firebase') {
    execSync('npm install firebase', { stdio: 'inherit' });
    fs.writeFileSync('firebase.js', `
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
    `);
  } else if (authTool === 'clerk') {
    execSync('npm install clerk-sdk', { stdio: 'inherit' });
  } 
}