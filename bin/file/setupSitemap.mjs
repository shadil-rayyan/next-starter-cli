import { execSync } from 'child_process';
import fs from 'fs';

export function setupSitemap() {
  execSync('npm install next-sitemap', { stdio: 'inherit' });
  fs.writeFileSync('next.config.js', `
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true, // (optional)
};
  `);
}