#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { questions } from './questions.mjs';
import { createCustomFolderStructure } from './createCustomFolderStructure.mjs';
import { setupTailwind } from './file/setupTailwind.mjs';
import { setupTypescript } from './file/setupTypescript.mjs';
import { setupESLint } from './file/setupESLint.mjs';
import { setupHusky } from './file/setupHusky.mjs';
import { setupCommitLint } from './file/setupCommitLint.mjs';
import { setupSentry } from './file/setupSentry.mjs';
import { setupCodeCov } from './file/setupCodeCov.mjs';
import { setupAuth } from './file/setupAuth.mjs';
import { setupPwa } from './file/setupPwa.mjs';
import { setupSitemap } from './file/setupSitemap.mjs';
import { setupDatabase } from './file/setupDatabase.mjs';
import { setupDeployment } from './file/setupDeployment.mjs';
import { setupUnitTesting } from './file/setupUnitTesting.mjs';
import { setupE2ETesting } from './file/setupE2ETesting.mjs';

export async function initProject() {
    const answers = await inquirer.prompt(questions);
  
    let projectPath = process.cwd();
    if (!answers.samefolder) {
      projectPath = path.join(process.cwd(), answers.projectname);
      fs.mkdirSync(answers.projectname);
      process.chdir(projectPath);
    }
  
    console.log(chalk.blue(`\nCreating your Next.js project in: ${projectPath}\n`));
  
    execSync('npm init -y', { stdio: 'inherit' });
    execSync('npm install next@latest react@latest react-dom@latest', { stdio: 'inherit' });
  
    createCustomFolderStructure(answers.approuter);
  
    if (answers.useTailwindCss) {
      setupTailwind();
    }
  
    if (answers.useTypescript) {
      setupTypescript();
    }
  
    if (answers.testing !== 'none') {
      setupE2ETesting(answers.testing);
    }
  
    // Setup the selected unit testing tool
    if (answers.unitTestingTool !== 'none') {
      setupUnitTesting(answers.unitTestingTool);
    }
  
    if (answers.useESLint) {
      setupESLint();
    }
  
    if (answers.useHusky) {
      setupHusky();
    }
  
    if (answers.useCommitLint) {
      setupCommitLint();
    }
  
    if (answers.useSentry) {
      setupSentry();
    }
  
    if (answers.useCodeCov) {
      setupCodeCov();
    }
  
    if (answers.useAuth !== 'none') {
      setupAuth(answers.useAuth);
    }
  
    if (answers.usePwa) {
      setupPwa();
    }
  
    if (answers.useSitemap) {
      setupSitemap();
    }
  
    if (answers.databaseTool !== 'None') {
      setupDatabase(answers.databaseTool);
    }
  
    if (answers.deploymentPlatform !== 'None') {
      setupDeployment(answers.deploymentPlatform);
    }
  
    // Create .gitignore
    fs.writeFileSync('.gitignore', `
  # Node modules
  node_modules/
  
  # Logs
  logs/
  *.log
  npm-debug.log*
  
  # Dependency directories
  jspm_packages/
  
  # Build directories
  dist/
  build/
  
  # Next.js
  .next/
  out/
  
  # Environment variables
  .env.local
  .env.development.local
  .env.test.local
  .env.production.local
  
  # Miscellaneous
  .DS_Store
    `);
  
    // Create README.md
    fs.writeFileSync('README.md', `
  # My Next.js Project
  
  ## Getting Started
  
  ### Prerequisites
  - Node.js (>= 12.x)
  - npm (>= 6.x)
  
  ### Installation
  1. Clone the repository:
     \`\`\`sh
     git clone <repository-url>
     cd <repository-directory>
     \`\`\`
  
  2. Install dependencies:
     \`\`\`sh
     npm install
     \`\`\`
  
  ### Running the Development Server
  \`\`\`sh
  npm run dev
  \`\`\`
  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  
  ### Building for Production
  \`\`\`sh
  npm run build
  npm start
  \`\`\`
  
  ### Running Tests
  #### Unit Tests
  \`\`\`sh
  npm run test
  \`\`\`
  
  #### End-to-End Tests
  \`\`\`sh
  npm run e2e
  \`\`\`
  
  ### Linting
  \`\`\`sh
  npm run lint
  \`\`\`
  
  ### Features
  - Custom folder structure
  - ESLint setup
  - Husky and commitlint for commit message linting
  - Optional end-to-end and unit testing tools
  - Optional Sentry for error tracking
  - Optional Codecov for test coverage
  - Optional PWA support
  - Optional sitemap generation
  - Optional authentication tools
  - Optional database tools
  - Deployment setup for Vercel or Netlify
    `);
}