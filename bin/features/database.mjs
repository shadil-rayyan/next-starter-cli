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

    if (tool === 'prisma') {
      execSync('npm install prisma --save-dev', { stdio: 'inherit' });
      execSync('npm install @prisma/client', { stdio: 'inherit' });
      execSync('npx prisma init', { stdio: 'inherit' });
    } else if (tool === 'drizzle') {
      execSync('npm install drizzle-orm', { stdio: 'inherit' });
      execSync('npm install drizzle-kit --save-dev', { stdio: 'inherit' });
      fs.writeFileSync('drizzle.config.js', `
/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
};`.trim());
    }

    console.log(chalk.green(`${tool} setup completed.`));
  }
};
