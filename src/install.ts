import { execa } from "execa";
import { PackageManager } from "./package-manager.js";
import pc from "picocolors";

export async function installPrettier(pm: PackageManager, cwd: string) {
  let command: string;
  let args: string[];

  const deps = ["prettier", "eslint-config-prettier"];

  switch (pm) {
    case "npm":
      command = "npm";
      args = ["install", "-D", ...deps];
      break;
    case "pnpm":
      command = "pnpm";
      args = ["add", "-D", ...deps];
      break;
    case "yarn":
      command = "yarn";
      args = ["add", "-D", ...deps];
      break;
    case "bun":
      command = "bun";
      args = ["add", "-d", ...deps];
      break;
  }

  console.log(pc.cyan("Installing Prettier..."));

  await execa(command, args, {
    cwd,
    stdio: "inherit",
  });
}
