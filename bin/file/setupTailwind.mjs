import { execSync } from 'child_process';
import fs from 'fs';

export function setupTailwind() {
  console.log('Setting up Tailwind CSS...');

  // Install Tailwind CSS, PostCSS, and Autoprefixer
  execSync('npm install tailwindcss postcss autoprefixer', { stdio: 'inherit' });

  // Create Tailwind CSS configuration file
  fs.writeFileSync('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
  `.trim());

  // Create PostCSS configuration file
  fs.writeFileSync('postcss.config.js', `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
  `.trim());

  // Create a CSS file with Tailwind directives
  const cssDir = './styles';
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  fs.writeFileSync(`${cssDir}/globals.css`, `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `.trim());

  console.log('Tailwind CSS setup completed.');
}