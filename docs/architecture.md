# Architecture & Feature Engine

The Next-Starter-CLI uses a **Plug-and-Play Feature Engine** that makes maintenance and expansion trivial.

## Overview
Unlike traditional CLIs that use complex switch statements or registries, this CLI uses **Dynamic Module Discovery**.

### 1. The Core Engine (`bin/index.mjs`)
- Initializes the base Next.js environment.
- Recursively looks for feature files in `bin/features/`.
- Merges core questions with feature-specific questions.
- Orchestrates the sequential execution of feature `setup` functions.

### 2. Feature Modules (`bin/features/*.mjs`)
Each feature is a self-contained ESM module that exports a default object:

```javascript
export default {
  name: 'example', // Unique ID
  question: { 
    type: 'confirm', 
    name: 'useExample', 
    message: 'Enable feature?' 
  },
  setup: async (answers) => {
    if (!answers.useExample) return;
    // logic...
  }
}
```

## Benefits
- **No Circular Dependencies**: Features do not know about each other or the core.
- **Easy Maintenance**: Deleting a file removes a feature. Adding a file adds one.
- **Type Safety**: Since each feature is isolated, errors in one module don't crash the logic of others.
