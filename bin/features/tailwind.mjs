import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

export default {
  name: 'tailwind',
  question: {
    type: 'confirm',
    name: 'useTailwind',
    message: 'Do you want to use Tailwind CSS?',
    default: true,
  },
  setup: async (answers) => {
    if (!answers.useTailwind) return;
    console.log(chalk.blue('Setting up Tailwind CSS...'));

    execSync('npm install tailwindcss postcss autoprefixer', { stdio: 'inherit' });
    
    fs.writeFileSync('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`.trim());

    fs.writeFileSync('postcss.config.js', `
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};`.trim());

    const cssDir = './src/styles';
    if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
    fs.writeFileSync(`${cssDir}/globals.css`, "@tailwind base;\n@tailwind components;\n@tailwind utilities;");
    
    console.log(chalk.green('Tailwind CSS setup completed.'));
  }
};
