# AI Agent Instructions (agent.md)

This file serves as the definitive guide for AI coding assistants working on this repository. Follow these rules strictly to ensure the codebase remains modular and maintainable.

## Core Philosophy
1.  **Zero-Core Modification**: The core logic in `bin/index.mjs` should rarely change.
2.  **Feature-First Evolution**: All new functionality, tools, or configurations MUST be implemented as independent modules in `bin/features/`.

## Architecture Rules
- **Automatic Discovery**: The CLI scans `bin/features/*.mjs` and imports them dynamically. 
- **Component Anatomy**:
  - `name`: String (identifies the feature).
  - `question`: Inquirer.js question object.
  - `setup`: Async function receiving `answers` and executing shell commands/file writes.
- **Idempotency**: Setup functions should be safe to run multiple times if possible (e.g., check if a file exists before writing).

## Maintenance Rules
1.  **Cleaner Logic**: Never add manual `if` statements for specific features in `bin/index.mjs`.
2.  **External Dependencies**: Avoid adding dependencies to the CLI's `package.json` unless they are core CLI requirements (like `inquirer` or `chalk`). Tools for the *generated project* should be installed via `execSync` during the `setup` phase.
3.  **Shell Interaction**: Use `{ stdio: 'inherit' }` for all `execSync` calls.

## How to Add Features
1. Create `bin/features/my-new-feature.mjs`.
2. Define the `question` (boolean for single check, list for multiple choices).
3. Implement the `setup` logic using `answers`.
4. Run `node verify-features.mjs` to validate the structure.
