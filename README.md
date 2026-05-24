# neatlint

A command-line interface (CLI) tool designed to automatically and seamlessly set up and configure ESLint and Prettier for modern JavaScript and TypeScript projects.

## Overview

Configuring linting and formatting tools for new or existing projects can be tedious and prone to configuration conflicts. `neatlint` automates the entire setup process. It detects your package manager, initializes ESLint, installs Prettier, writes default configurations, patches configuration files to avoid rule conflicts, and adds execution scripts to your `package.json`.

## Requirements

- Node.js version `^20.19.0`, `^22.13.0`, or `>=24`.

## Installation and Usage

To set up ESLint and Prettier in your project directory, run:

```bash
npx neatlint init
```

Alternatively, if you are using specific package managers, you can use:

```bash
# Using bun
bunx neatlint init
# Using pnpm
pnpm dlx neatlint init
# Using yarn
yarn dlx neatlint init
```

## What neatlint Does

### 1. Runs ESLint Initialization
It invokes the interactive ESLint initialization tool appropriate for your package manager to guide you through creating an ESLint configuration.

### 2. Installs Dependencies
It installs the following packages as development dependencies:
- `prettier`
- `eslint-config-prettier`

### 3. Generates `.prettierrc`
Creates a `.prettierrc` file with the following default configuration:
```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5"
}
```

### 4. Patches ESLint Flat Config
Locates your ESLint configuration file (`eslint.config.js`, `eslint.config.mjs`, `eslint.config.ts`, or `eslint.config.mts`) and integrates `eslint-config-prettier` by importing and appending it to the export array, preventing formatting conflicts.

### 5. Configures `package.json` Scripts
Appends the following scripts to your `package.json` (skipping any script name that already exists):
- `"lint": "eslint ."` - Lints the workspace.
- `"format": "prettier . --write"` - Formats all files.
- `"format:check": "prettier . --check"` - Checks file formatting.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
