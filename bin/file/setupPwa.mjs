import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export function setupPwa() {
  console.log('Setting up next-pwa for Progressive Web App...');

  // Install next-pwa
  execSync('npm install next-pwa', { stdio: 'inherit' });

  // Update next.config.js to include PWA configuration
  const nextConfigPath = 'next.config.js';
  const pwaConfig = `
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\\/\\/fonts\\.(?:googleapis|gstatic)\\.com\\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\\/\\/use\\.fontawesome\\.com\\/releases\\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'font-awesome',
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
  ],
});

module.exports = withPWA({
  // Your existing Next.js config here
});
  `;

  if (fs.existsSync(nextConfigPath)) {
    fs.writeFileSync(nextConfigPath, pwaConfig.trim());
  } else {
    fs.writeFileSync(nextConfigPath, pwaConfig.trim());
  }

  // Create public directory if it doesn't exist
  const publicDir = path.resolve('./public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Create manifest.json
  const manifest = {
    name: "My PWA App",
    short_name: "PWA App",
    description: "My awesome Progressive Web App!",
    background_color: "#ffffff",
    theme_color: "#000000",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // Create example service worker file
  const swFile = `
self.addEventListener('install', event => {
  console.log('Service worker installing...');
});

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
});
  `;
  fs.writeFileSync(path.join(publicDir, 'sw.js'), swFile.trim());

  console.log('next-pwa setup completed.');
}