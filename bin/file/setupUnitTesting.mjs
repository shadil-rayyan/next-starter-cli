import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

export function setupUnitTesting(unitTestingTool) {
  if (unitTestingTool === 'none') {
    console.log(chalk.yellow('No unit testing tool selected.'));
    return;
  }

  console.log(chalk.blue(`\nInstalling ${unitTestingTool} for unit testing...`));

  if (unitTestingTool === 'jest') {
    // Install Jest and related libraries
    execSync('npm install jest @testing-library/react @testing-library/jest-dom babel-jest --save-dev', { stdio: 'inherit' });

    // Create Jest configuration file
    fs.writeFileSync('jest.config.js', `
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverageFrom: [
    "pages/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  transform: {
    "^.+\\\\.jsx?$": "babel-jest",
    "^.+\\\\.tsx?$": "babel-jest",
  },
};
    `.trim());

    // Create Jest setup file
    fs.writeFileSync('jest.setup.js', `
import "@testing-library/jest-dom";
    `.trim());

    console.log(chalk.green('Jest and testing-library configured successfully.'));
    
  } else if (unitTestingTool === 'mocha') {
    // Install Mocha and related libraries
    execSync('npm install mocha chai --save-dev', { stdio: 'inherit' });

    // Create Mocha configuration file (optional)
    fs.writeFileSync('.mocharc.json', `
{
  "require": ["@babel/register"],
  "extension": ["js", "jsx", "ts", "tsx"],
  "spec": "test/**/*.spec.js",
  "ignore": ["node_modules"],
  "recursive": true
}
    `.trim());

    // Create a sample Mocha test file
    if (!fs.existsSync('test')) {
      fs.mkdirSync('test');
    }

    fs.writeFileSync('test/sample.spec.js', `
const { expect } = require('chai');

describe('Sample Test', () => {
  it('should return true', () => {
    expect(true).to.be.true;
  });
});
    `.trim());

    console.log(chalk.green('Mocha and Chai configured successfully.'));
    
  } else if (unitTestingTool === 'vitest') {
    // Install Vitest and related libraries
    execSync('npm install vitest jsdom @testing-library/react @testing-library/jest-dom --save-dev', { stdio: 'inherit' });

    // Add Vitest configuration in vite.config.js (if using Vite)
    if (fs.existsSync('vite.config.js')) {
      const viteConfig = fs.readFileSync('vite.config.js', 'utf8');
      if (!viteConfig.includes('test:')) {
        const newViteConfig = viteConfig.replace('export default {', `
export default {
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },
`);
        fs.writeFileSync('vite.config.js', newViteConfig.trim());
      }
    } else {
      // If Vite config doesn't exist, create one
      fs.writeFileSync('vite.config.js', `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },
});
      `.trim());
    }

    // Create Vitest setup file
    fs.writeFileSync('vitest.setup.js', `
import "@testing-library/jest-dom";
    `.trim());

    console.log(chalk.green('Vitest and testing-library configured successfully.'));
    
  } else {
    console.log(chalk.red(`Unsupported unit testing tool: ${unitTestingTool}`));
  }
}