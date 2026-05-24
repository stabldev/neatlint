# neatlint

A command-line interface (CLI) tool designed to automatically and seamlessly set up and configure ESLint and Prettier for modern JavaScript and TypeScript projects.

## Overview

Configuring linting and formatting tools for new or existing projects can be tedious and prone to configuration conflicts. `neatlint` automates the entire setup process. It detects your package manager, initializes ESLint, installs Prettier, writes default configurations, patches configuration files to avoid rule conflicts, and adds execution scripts to your `package.json`.

## Features

- **Package Manager Auto-Detection**: Supports and automatically detects npm, pnpm, yarn, and bun.
- **Automated ESLint Setup**: Runs the official ESLint configuration tool (`@eslint/config`) tailored to your package manager.
- **Prettier Integration**: Installs Prettier and `eslint-config-prettier` to disable formatting-related ESLint rules that might conflict with Prettier.
- **Automatic Configuration Patching**: Detects and patches existing ESLint flat configuration files (e.g., `eslint.config.js`, `eslint.config.mjs`, `eslint.config.ts`, or `eslint.config.mts`) to apply the Prettier configuration.
- **Predefined Scripts**: Adds npm scripts to `package.json` for immediate linting and formatting.
- **Default Formatting Rules**: Generates a standard `.prettierrc` file.

## Requirements

- Node.js version `^20.19.0`, `^22.13.0`, or `>=24`.

## Installation and Usage

To set up ESLint and Prettier in your project directory, run:

```bash
npx neatlint init
```

Alternatively, if you are using specific package managers, you can use:

```bash
# Using pnpm
pnpm dlx neatlint init

# Using yarn
yarn dlx neatlint init

# Using bun
bunx neatlint init
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

## Local Development

To clone, build, and run the project locally, follow these steps:

### Prerequisites
Make sure you have `pnpm` installed.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/stabldev/neatlint.git
   cd neatlint
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run in development mode:
   ```bash
   pnpm dev init
   ```

4. Build the project:
   ```bash
   pnpm build
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
