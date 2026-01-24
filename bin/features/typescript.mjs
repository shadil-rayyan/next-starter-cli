import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

export default {
  name: 'typescript',
  question: {
    type: 'confirm',
    name: 'useTypescript',
    message: 'Do you want to use TypeScript?',
    default: true,
  },
  setup: async (answers) => {
    if (!answers.useTypescript) return;
    console.log(chalk.blue('Setting up TypeScript...'));

    execSync('npm install typescript @types/react @types/node @types/react-dom --save-dev', { stdio: 'inherit' });
    
    fs.writeFileSync('tsconfig.json', JSON.stringify({
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./src/*"] }
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"]
    }, null, 2));
    
    console.log(chalk.green('TypeScript setup completed.'));
  }
};
