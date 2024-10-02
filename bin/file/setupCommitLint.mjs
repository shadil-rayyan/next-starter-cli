import { execSync } from 'child_process';
import fs from 'fs';

export function setupCommitLint() {
  // Install commitlint and conventional config
  execSync('npm install @commitlint/config-conventional @commitlint/cli --save-dev', { stdio: 'inherit' });

  // Create commitlint configuration file
  fs.writeFileSync('commitlint.config.js', `
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {}
};
  `);

  // Install husky if not already installed
  execSync('npm install husky --save-dev', { stdio: 'inherit' });

  // Initialize husky
  execSync('npx husky install', { stdio: 'inherit' });

  // Add commit-msg hook to husky
  execSync('npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"', { stdio: 'inherit' });

  // Add husky install script to package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.prepare = "husky install";
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}