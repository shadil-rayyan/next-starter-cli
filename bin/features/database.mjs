import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

export default {
  name: 'database',
  question: {
    type: 'list',
    name: 'dbtool',
    message: 'Which database tool?',
    choices: ['prisma', 'drizzle', 'none'],
    default: 'none',
  },
  setup: async (answers) => {
    const tool = answers.dbtool;
    if (tool === 'none') return;

    console.log(chalk.blue(`Setting up ${tool}...`));
    execSync(`npm install ${tool} @prisma/client`, { stdio: 'inherit' });

    if (tool === 'prisma') {
      execSync('npx prisma init', { stdio: 'inherit' });
    } else if (tool === 'drizzle') {
      fs.writeFileSync('drizzle.config.js', '// Drizzle config\nmodule.exports = {};');
    }

    console.log(chalk.green(`${tool} setup completed.`));
  }
};
