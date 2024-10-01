#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createCustomFolderStructure } from './createCustomFolderStructure.mjs';

export async function initProject(answers) {
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
      execSync('npm install tailwindcss postcss autoprefixer', { stdio: 'inherit' });
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
  }
      `);
    }
  
    if (answers.useTypescript) {
      execSync('npm install typescript @types/react @types/node', { stdio: 'inherit' });
      fs.writeFileSync('tsconfig.json', `
  {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve"
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
  }
      `);
    }
  
    if (answers.testing !== 'none') {
      console.log(chalk.blue(`\nInstalling ${answers.testing}...`));
      execSync(`npm install ${answers.testing} --save-dev`, { stdio: 'inherit' });
    }
  
    if (answers.unitTestingTool !== 'none') {
      console.log(chalk.blue(`\nInstalling ${answers.unitTestingTool}...`));
      if (answers.unitTestingTool === 'jest') {
        execSync('npm install jest @testing-library/react @testing-library/jest-dom', { stdio: 'inherit' });
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
  };
        `);
        fs.writeFileSync('jest.setup.js', `
  import "@testing-library/jest-dom";
        `);
      } else if (answers.unitTestingTool === 'mocha') {
        execSync('npm install mocha --save-dev', { stdio: 'inherit' });
      }
    }
  
    if (answers.useESLint) {
      execSync('npm install eslint eslint-config-next', { stdio: 'inherit' });
      fs.writeFileSync('.eslintrc.json', JSON.stringify({
        "extends": "next/core-web-vitals",
        "rules": {}
      }, null, 2));
    }
  
    if (answers.useHusky) {
      execSync('npm install husky lint-staged', { stdio: 'inherit' });
      fs.writeFileSync('.huskyrc', JSON.stringify({
        "hooks": {
          "pre-commit": "npm run lint",
          "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
      }, null, 2));
    }
  
    if (answers.useCommitLint) {
      execSync('npm install @commitlint/config-conventional @commitlint/cli --save-dev', { stdio: 'inherit' });
      fs.writeFileSync('commitlint.config.js', `
  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {}
  };
      `);
    }
  
    if (answers.useSentry) {
      execSync('npm install @sentry/nextjs', { stdio: 'inherit' });
    }
  
    if (answers.useCodeCov) {
      execSync('npm install codecov --save-dev', { stdio: 'inherit' });
    }
  
    if (answers.useAuth !== 'none') {
      if (answers.useAuth === 'nextauth') { 
        execSync('npm install next-auth', { stdio: 'inherit' });
      } else if (answers.useAuth === 'firebase') {
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
      } else if (answers.useAuth === 'clerk') {
        execSync('npm install clerk-sdk', { stdio: 'inherit' });
      } 
  
    if (answers.usePwa) {
      execSync('npm install next-pwa', { stdio: 'inherit' });
    }
  
    if (answers.useSitemap) {
      execSync('npm install next-sitemap', { stdio: 'inherit' });
      fs.writeFileSync('next.config.js', `
        module.exports = {
    siteUrl: process.env.SITE_URL || 'https://example.com',
    generateRobotsTxt: true, // (optional)
  };
  `);
    }
  
    if (answers.databaseTool !== 'None') {
      execSync(`npm install ${answers.databaseTool}`, { stdio: 'inherit' });
    }
  
    if (answers.deploymentPlatform !== 'None') {
      console.log(chalk.blue(`\nSetting up deployment for ${answers.deploymentPlatform}...`));
      execSync(`npm install ${answers.deploymentPlatform}`, { stdio: 'inherit' });
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
}