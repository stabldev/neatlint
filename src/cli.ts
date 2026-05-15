#!/usr/bin/env node

import cac from "cac";
import pc from "picocolors";
import { detectPackageManager } from "./package-manager.js";
import { runEslintInit } from "./eslint-init.js";
import { installPrettier } from "./install.js";
import { createPrettierRc } from "./prettier.js";
import { patchEslintConfig } from "./patch-eslint.js";
import { updatePackageJsonScripts } from "./package-json.js";

const cli = cac("neatlint");

cli
  .command("init", "Set up ESLint and Prettier")
  .action(async () => {
    try {
      const cwd = process.cwd();

      console.log(pc.cyan("Detecting package manager..."));
      const pm = detectPackageManager(cwd);
      console.log(pc.green(`Detected package manager: ${pm}`));

      await runEslintInit(pm, cwd);
      await installPrettier(pm, cwd);
      await createPrettierRc(cwd);
      await patchEslintConfig(cwd);
      await updatePackageJsonScripts(cwd);

      console.log(pc.green("Done."));
    } catch (err: any) {
      console.error(pc.red("An error occurred:"));
      console.error(err);
      process.exit(1);
    }
  });

cli.help();
cli.parse();
