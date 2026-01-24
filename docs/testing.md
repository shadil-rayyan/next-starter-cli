# Testing & Verification

Maintaining a modular CLI requires quick verification to ensure that new feature modules follow the required contract.

## The Verification Script (`verify-features.mjs`)
The `verify-features.mjs` script acts as a linter for your feature modules. It performs a "Dry Import" of every module to check for:
- Export existence (Is there a default export?).
- Schema validity (Does it have `name`, `question`, and `setup`?).
- Logic integrity (Can the file be parsed/imported?).

### How to use
```bash
node verify-features.mjs
```

### Example Success Output
```text
Checking [tailwind.mjs]...
  ✅ Valid feature: tailwind
  - Question: Do you want to use Tailwind CSS?
```

### Example Failure Output
```text
Checking [broken-tool.mjs]...
  ❌ Error in broken-tool.mjs: Missing required fields: setup
```

## Local Integration Testing
To test the full CLI locally before publishing to NPM:
1. Run `npm link` in the root of this project.
2. Go to a temporary directory.
3. Run `nextjs-starter`.
4. Verify the generated project structure and configurations.
