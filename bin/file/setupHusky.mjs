import { execSync } from 'child_process';
import fs from 'fs';

export function setupHusky() {
  console.log('Setting up Husky and lint-staged...');

  // Install Husky and lint-staged
  execSync('npm install husky lint-staged --save-dev', { stdio: 'inherit' });

  // Initialize Husky
  execSync('npx husky install', { stdio: 'inherit' });

  // Add pre-commit hook
  execSync('npx husky add .husky/pre-commit "npx lint-staged"', { stdio: 'inherit' });

  // Add commit-msg hook
  execSync('npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"', { stdio: 'inherit' });

  // Add lint-staged configuration to package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson['lint-staged'] = {
    "*.{js,jsx,ts,tsx}": "eslint --fix",
    "*.{css,scss,md}": "prettier --write"
  };
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  console.log('Husky and lint-staged setup completed.');
}