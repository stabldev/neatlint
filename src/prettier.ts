import fs from "fs/promises";
import path from "path";
import pc from "picocolors";

export async function createPrettierRc(cwd: string) {
  const prettierrcPath = path.join(cwd, ".prettierrc");
  const content = {
    semi: true,
    singleQuote: false,
    trailingComma: "es5"
  };

  console.log(pc.cyan("Writing .prettierrc..."));
  await fs.writeFile(prettierrcPath, JSON.stringify(content, null, 2) + "\n", "utf8");
}
