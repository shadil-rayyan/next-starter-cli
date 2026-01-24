# Next Starter CLI

A professional, modular CLI for scaffolding production-ready Next.js projects with a custom technology stack.

## 🚀 Quick Start

```bash
npx nextjs-starter-cli
```

## 🛠️ Features
- **App Router Support**: Standard Next.js structure.
- **TypeScript**: Pre-configured `tsconfig.json` and types.
- **Tailwind CSS**: Instant styling setup with modern paths.
- **ESLint**: Pre-configured with Next.js core web vitals.
- **Testing**: Support for Cypress, Playwright, and Vitest.
- **Databases**: Easy initialization for Prisma and Drizzle.

## 📖 Documentation
Detailed guides for developers and AI agents:
- [📁 Architecture Overview](./docs/architecture.md) - How the engine works.
- [📁 Adding Features](./docs/architecture.md#2-feature-modules-binfeaturesmjs) - Instructions for expanding the CLI.
- [📁 Testing & QA](./docs/testing.md) - Using the verification script.
- [📁 AI Agent Guide](./docs/agent.md) - Rules for AI-assisted development.

## 👨‍💻 Development

### Setup
```bash
git clone https://github.com/shadil-rayyan/nextjs-starter-cli
npm install
```

### Verification
Always run the audit before committing new features:
```bash
node verify-features.mjs
```

### Local Testing
```bash
npm link
# then run in a test folder:
nextjs-starter
```

## 📄 License
ISC
