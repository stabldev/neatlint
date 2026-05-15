import { execa } from "execa";
import { PackageManager } from "./package-manager.js";
import pc from "picocolors";

export async function runEslintInit(pm: PackageManager, cwd: string) {
  let command: string;
  let args: string[];

  switch (pm) {
    case "npm":
      command = "npm";
      args = ["init", "@eslint/config@latest"];
      break;
    case "pnpm":
      command = "pnpm";
      args = ["create", "@eslint/config@latest"];
      break;
    case "yarn":
      command = "yarn";
      args = ["create", "@eslint/config"];
      break;
    case "bun":
      command = "bunx";
      args = ["@eslint/create-config@latest"];
      break;
  }

  console.log(pc.cyan("Running ESLint initializer..."));
  
  await execa(command, args, {
    cwd,
    stdio: "inherit",
  });
}
