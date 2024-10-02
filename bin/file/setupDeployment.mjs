import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';

export function setupDeployment(deploymentPlatform) {
  console.log(chalk.blue(`\nSetting up deployment for ${deploymentPlatform}...`));
  execSync(`npm install ${deploymentPlatform}`, { stdio: 'inherit' });

  if (deploymentPlatform === 'vercel') {
    setupVercel();
  } else if (deploymentPlatform === 'netlify') {
    setupNetlify();
  } else {
    console.log(chalk.yellow(`\nNo specific configuration for ${deploymentPlatform}. Please configure it manually.`));
  }
}

function setupVercel() {
  // Create a Vercel configuration file
  fs.writeFileSync('vercel.json', JSON.stringify({
    version: 2,
    builds: [
      { src: "next.config.js", use: "@vercel/next" }
    ],
    routes: [
      { src: "/(.*)", dest: "/" }
    ]
  }, null, 2));

  console.log(chalk.green('\nVercel configuration file created.'));
}

function setupNetlify() {
  // Create a Netlify configuration file
  fs.writeFileSync('netlify.toml', `
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  `);

  console.log(chalk.green('\nNetlify configuration file created.'));
}