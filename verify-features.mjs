import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

async function testFeatures() {
  console.log(chalk.yellow('Starting Feature Module Audit...\n'));

  const featuresDir = './bin/features';
  const files = fs.readdirSync(featuresDir);

  for (const file of files) {
    try {
      const { default: f } = await import(`./${path.join(featuresDir, file)}`);
      
      console.log(chalk.white(`Checking [${file}]...`));
      
      if (!f.name || !f.question || !f.setup) {
        throw new Error(`Missing required fields: ${!f.name ? 'name ' : ''}${!f.question ? 'question ' : ''}${!f.setup ? 'setup' : ''}`);
      }

      console.log(chalk.green(`  ✅ Valid feature: ${f.name}`));
      console.log(chalk.gray(`  - Question: ${f.question.message}`));
    } catch (err) {
      console.error(chalk.red(`  ❌ Error in ${file}:`), err.message);
    }
  }

  console.log(chalk.yellow('\nAudit Complete.'));
}

testFeatures();
