import { execSync } from 'child_process';
import fs from 'fs';

export function setupCodeCov() {
  execSync('npm install codecov --save-dev', { stdio: 'inherit' });

  // Create a Codecov configuration file
  fs.writeFileSync('codecov.yml', `
coverage:
  status:
    project:
      default:
        target: 80%
    patch:
      default:
        target: 80%
  notify:
    require_ci_to_pass: yes
  comment:
    layout: "reach, diff, flags, files, footer"
    behavior: default
    require_changes: no
    require_base: no
    require_head: yes
  `);

  // Add a script to package.json for running code coverage
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.coverage = "jest --coverage && codecov";
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}