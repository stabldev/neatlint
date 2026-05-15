import fs from "fs/promises";
import path from "path";
import pc from "picocolors";

export async function patchEslintConfig(cwd: string) {
  console.log(pc.cyan("Patching ESLint config..."));

  const configFiles = [
    "eslint.config.js",
    "eslint.config.mjs",
    "eslint.config.ts",
    "eslint.config.mts"
  ];

  let configPath = null;
  let content = "";

  for (const file of configFiles) {
    const fullPath = path.join(cwd, file);
    try {
      content = await fs.readFile(fullPath, "utf8");
      configPath = fullPath;
      break;
    } catch {
      // Not found, try next
    }
  }

  const manualSnippet = `
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // existing config
  eslintConfigPrettier,
];`;

  if (!configPath) {
    console.log(pc.yellow("Warning: ESLint flat config file not found."));
    console.log(pc.yellow("Please add prettier manually:"));
    console.log(pc.white(manualSnippet));
    return;
  }

  if (content.includes("eslint-config-prettier")) {
    console.log(pc.green("ESLint config already contains eslint-config-prettier."));
    return;
  }

  const exportDefaultRegex = /export\s+default\s+\[/;
  if (!exportDefaultRegex.test(content)) {
    console.log(pc.yellow(`Warning: Could not automatically patch ${path.basename(configPath)}.`));
    console.log(pc.yellow("Please add prettier manually:"));
    console.log(pc.white(manualSnippet));
    return;
  }

  const lastBracketIndex = content.lastIndexOf("]");
  if (lastBracketIndex === -1) {
    console.log(pc.yellow(`Warning: Could not automatically patch ${path.basename(configPath)}.`));
    console.log(pc.yellow("Please add prettier manually:"));
    console.log(pc.white(manualSnippet));
    return;
  }

  const before = content.slice(0, lastBracketIndex);
  const after = content.slice(lastBracketIndex);

  const trimmedBefore = before.trim();
  const needsComma = trimmedBefore.length > 0 && !trimmedBefore.endsWith(",") && !trimmedBefore.endsWith("[");

  const importStatement = `import eslintConfigPrettier from "eslint-config-prettier";\n`;
  const injection = (needsComma ? "," : "") + "\n  eslintConfigPrettier,\n";

  const newContent = importStatement + before + injection + after;

  await fs.writeFile(configPath, newContent, "utf8");
  console.log(pc.green(`Patched ${path.basename(configPath)}.`));
}
