import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

export default {
  name: 'eslint',
  question: {
    type: 'confirm',
    name: 'useESLint',
    message: 'Set up ESLint?',
    default: true,
  },
  setup: async (answers) => {
    if (!answers.useESLint) return;
    console.log(chalk.blue('Setting up ESLint...'));

    execSync('npm install eslint eslint-config-next --save-dev', { stdio: 'inherit' });
    fs.writeFileSync('.eslintrc.json', JSON.stringify({ "extends": "next/core-web-vitals" }, null, 2));
    console.log(chalk.green('ESLint setup completed.'));
  }
};
