import fs from 'fs';
import chalk from 'chalk';

export function createCustomFolderStructure(useAppRouter) {
    console.log(chalk.blue('\nCreating custom folder structure...'));
  
    // Create common folders
    fs.mkdirSync('src/components', { recursive: true });
    fs.mkdirSync('src/styles', { recursive: true });
    fs.mkdirSync('src/utils', { recursive: true });
  
    if (useAppRouter) {
      fs.mkdirSync('src/app', { recursive: true });
      fs.writeFileSync('src/app/page.tsx', 'export default function Home() { return <h1>Hello App Router</h1> }');
    } else {
      fs.mkdirSync('pages', { recursive: true });
      fs.writeFileSync('pages/index.js', 'export default function Home() { return <h1>Hello Pages Router</h1> }');
    }
  }
  
  initProject();