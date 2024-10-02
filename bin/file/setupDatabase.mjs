import { execSync } from 'child_process';
import fs from 'fs';

export function setupDatabase(databaseTool) {
  execSync(`npm install ${databaseTool}`, { stdio: 'inherit' });

  if (databaseTool === 'prisma') {
    setupPrisma();
  } else if (databaseTool === 'drizzle') {
    setupDrizzle();
  }
}

function setupPrisma() {
  // Install Prisma CLI and client
  execSync('npm install @prisma/cli @prisma/client --save-dev', { stdio: 'inherit' });

  // Initialize Prisma
  execSync('npx prisma init', { stdio: 'inherit' });

  // Create a basic Prisma schema
  fs.writeFileSync('prisma/schema.prisma', `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
  `);

  // Add DATABASE_URL to .env file
  fs.appendFileSync('.env', '\nDATABASE_URL="postgresql://user:password@localhost:5432/mydb"\n');
}

function setupDrizzle() {
  // Install Drizzle ORM
  execSync('npm install drizzle-orm drizzle-orm-postgres', { stdio: 'inherit' });

  // Create a basic Drizzle configuration file
  fs.writeFileSync('drizzle.config.js', `
const { drizzle } = require('drizzle-orm');
const { postgres } = require('drizzle-orm-postgres');

const db = drizzle(postgres({
  user: 'user',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'mydb'
}));

module.exports = db;
  `);

  // Add DATABASE_URL to .env file
  fs.appendFileSync('.env', '\nDATABASE_URL="postgresql://user:password@localhost:5432/mydb"\n');
}