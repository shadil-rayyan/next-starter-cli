#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  // 1. Core Questions
  const coreQuestions = [
    {
      type: 'confirm',
      name: 'samefolder',
      message: 'Create project in current folder?',
      default: false,
    },
    {
      type: 'input',
      name: 'projectname',
      message: 'Project name:',
      when: (a) => !a.samefolder,
      default: 'my-next-app',
    },
    {
      type: 'confirm',
      name: 'approuter',
      message: 'Use App Router?',
      default: true,
    }
  ];

  // 2. Load Features Automatically
  const featuresDir = path.join(__dirname, 'features');
  const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith('.mjs'));
  const features = [];

  for (const file of featureFiles) {
    const { default: feature } = await import(`./features/${file}`);
    if (feature) features.push(feature);
  }

  // 3. Collect Questions from Features
  const featureQuestions = features.map(f => f.question);
  
  // 4. Prompt
  const answers = await inquirer.prompt([...coreQuestions, ...featureQuestions]);

  // 5. Initialize Folder
  let projectPath = process.cwd();
  if (!answers.samefolder) {
    projectPath = path.join(process.cwd(), answers.projectname);
    if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath, { recursive: true });
    process.chdir(projectPath);
  }

  console.log(chalk.bold.cyan('\n🚀 Initializing Next.js Project...\n'));

  // 6. Base Setup
  import('child_process').then(({ execSync }) => {
    execSync('npm init -y', { stdio: 'inherit' });
    execSync('npm install next@latest react@latest react-dom@latest', { stdio: 'inherit' });

    // 7. Base structure
    fs.mkdirSync('src/components', { recursive: true });
    fs.mkdirSync('src/utils', { recursive: true });
    if (answers.approuter) {
      fs.mkdirSync('src/app', { recursive: true });
      fs.writeFileSync('src/app/page.tsx', 'export default function Home() { return <h1>Hello World</h1> }');
    } else {
      fs.mkdirSync('pages', { recursive: true });
      fs.writeFileSync('pages/index.js', 'export default function Home() { return <h1>Hello World</h1> }');
    }

    // 8. Run Selected Features
    (async () => {
      for (const feature of features) {
        await feature.setup(answers);
      }

      
      // 9. Static Files
      fs.writeFileSync('.gitignore', 'node_modules/\n.next/\nbuild/\n.env*'.trim());
      fs.writeFileSync('README.md', `# ${answers.projectname || 'My Project'}\nGenerated with Next-Starter-CLI`.trim());

      console.log(chalk.bold.green('\n✅ Project ready! Run `npm run dev` to start.\n'));
    })();
  });
}

main().catch(err => {
  console.error(chalk.red('\n❌ Error:'), err);
  process.exit(1);
});