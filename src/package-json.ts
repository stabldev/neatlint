import fs from "fs/promises";
import path from "path";
import pc from "picocolors";

export async function updatePackageJsonScripts(cwd: string) {
  console.log(pc.cyan("Updating package.json..."));
  
  const pkgPath = path.join(cwd, "package.json");
  let pkg;
  try {
    const content = await fs.readFile(pkgPath, "utf8");
    pkg = JSON.parse(content);
  } catch (err) {
    console.log(pc.yellow("Warning: Could not read package.json"));
    return;
  }

  if (!pkg.scripts) {
    pkg.scripts = {};
  }

  const newScripts = {
    "lint": "eslint .",
    "format": "prettier . --write",
    "format:check": "prettier . --check"
  };

  for (const [key, value] of Object.entries(newScripts)) {
    if (pkg.scripts[key]) {
      console.log(pc.yellow(`Warning: Script "${key}" already exists. Skipping.`));
    } else {
      pkg.scripts[key] = value;
    }
  }

  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
}
