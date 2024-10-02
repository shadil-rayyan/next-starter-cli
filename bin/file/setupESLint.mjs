import { execSync } from 'child_process';
import fs from 'fs';

export function setupESLint() {
  console.log('Setting up ESLint...');
  
  // Install ESLint and necessary plugins
  execSync('npm install eslint eslint-config-next eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks --save-dev', { stdio: 'inherit' });

  // Create ESLint configuration file
  fs.writeFileSync('.eslintrc.json', JSON.stringify({
    "extends": [
      "next/core-web-vitals",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:jsx-a11y/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "error",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          "components": ["Link"],
          "specialLink": ["hrefLeft", "hrefRight"],
          "aspects": ["invalidHref", "preferButton"]
        }
      ]
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }, null, 2));

  console.log('ESLint setup completed.');
}