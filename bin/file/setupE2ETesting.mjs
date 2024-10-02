import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

export function setupE2ETesting(testingTool) {
  console.log(chalk.blue(`\nInstalling ${testingTool} for end-to-end testing...`));

  // Install the selected end-to-end testing tool
  execSync(`npm install ${testingTool} --save-dev`, { stdio: 'inherit' });

  // Create test folders based on the tool selected
  fs.mkdirSync('tests/end-to-end', { recursive: true });
  console.log(chalk.green(`End-to-end testing folder structure created for ${testingTool}.`));

  if (testingTool === 'cypress') {
    setupCypress();
  } else if (testingTool === 'playwright') {
    setupPlaywright();
  } else if (testingTool === 'puppeteer') {
    setupPuppeteer();
  } else {
    console.log(chalk.yellow(`\nNo specific configuration for ${testingTool}. Please configure it manually.`));
  }
}

function setupCypress() {
  // Initialize Cypress
  execSync('npx cypress open', { stdio: 'inherit' });

  // Create a basic Cypress configuration file
  fs.writeFileSync('cypress.json', JSON.stringify({
    baseUrl: "http://localhost:3000",
    integrationFolder: "tests/end-to-end",
    supportFile: "tests/end-to-end/support/index.js"
  }, null, 2));

  console.log(chalk.green('\nCypress configuration file created.'));
}

function setupPlaywright() {
  // Initialize Playwright
  execSync('npx playwright install', { stdio: 'inherit' });

  // Create a basic Playwright configuration file
  fs.writeFileSync('playwright.config.js', `
const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests/end-to-end',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};
  `);

  console.log(chalk.green('\nPlaywright configuration file created.'));
}

function setupPuppeteer() {
  // Create a basic Puppeteer test file
  fs.writeFileSync('tests/end-to-end/puppeteer.test.js', `
const puppeteer = require('puppeteer');

describe('My First Puppeteer Test', () => {
  it('should load the page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const title = await page.title();
    expect(title).toBe('My Next.js App');
    await browser.close();
  });
});
  `);

  console.log(chalk.green('\nPuppeteer test file created.'));
}