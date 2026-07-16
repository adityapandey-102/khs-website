// One-off codemod: recolors component/page files for the #242424 dark-theme
// pass. Tokens like --color-offwhite / --color-gray-700 / --color-border were
// redefined in globals.css already (fixes most cases automatically); this
// script only fixes literal-color utility classes that need to flip meaning:
//   - `text-primary-dark` (heading/body text, NOT hover:) -> `text-white`
//   - `border-primary-dark` (outline-button default border) -> `border-white/30`
//   - plain `bg-white` (not `bg-white/NN`) -> `bg-surface`
// Run with `node scripts/dark-theme-recolor.mjs`. Header.tsx is excluded —
// handled by hand due to its scroll-transparency logic.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const EXCLUDE = new Set(["src/components/Header/Header.tsx"]);

async function main() {
  const files = globSync("src/**/*.{ts,tsx}", { cwd: ROOT }).filter(
    (f) => !EXCLUDE.has(f.replaceAll("\\", "/"))
  );

  let changedCount = 0;

  for (const relFile of files) {
    const filePath = path.join(ROOT, relFile);
    let content = await readFile(filePath, "utf8");
    const original = content;

    // Protect hover:text-primary-dark before the blanket text-primary-dark rule.
    content = content.replaceAll("hover:text-primary-dark", "@@HOVER_TEXT_PRIMARY@@");
    content = content.replaceAll("text-primary-dark", "text-white");
    content = content.replaceAll("@@HOVER_TEXT_PRIMARY@@", "hover:text-primary-dark");

    content = content.replaceAll("border-primary-dark", "border-white/30");

    // Plain bg-white (not bg-white/NN) -> bg-surface.
    content = content.replace(/bg-white(?!\/)/g, "bg-surface");

    if (content !== original) {
      await writeFile(filePath, content, "utf8");
      changedCount += 1;
      console.log(`updated: ${relFile}`);
    }
  }

  console.log(`\nDone. ${changedCount} files updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
