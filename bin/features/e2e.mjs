import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

export default {
  name: 'e2e',
  question: {
    type: 'list',
    name: 'e2etool',
    message: 'Which E2E testing tool?',
    choices: ['cypress', 'playwright', 'none'],
    default: 'none',
  },
  setup: async (answers) => {
    const tool = answers.e2etool;
    if (tool === 'none') return;

    console.log(chalk.blue(`Setting up ${tool}...`));
    execSync(`npm install ${tool} --save-dev`, { stdio: 'inherit' });

    if (tool === 'cypress') {
      fs.writeFileSync('cypress.config.js', `const { defineConfig } = require("cypress");\nmodule.exports = defineConfig({ e2e: { baseUrl: "http://localhost:3000" } });`);
    } else if (tool === 'playwright') {
      execSync('npx playwright install', { stdio: 'inherit' });
    }

    console.log(chalk.green(`${tool} setup completed.`));
  }
};
