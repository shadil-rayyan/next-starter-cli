#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { questions } from './questions.mjs';
import { initProject } from './initProject.mjs';

async function main() {
  const answers = await inquirer.prompt(questions);
  await initProject(answers);
}

main();