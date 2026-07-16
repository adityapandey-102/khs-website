// Rewrites every "/assets/old-site/<file>" reference across src/ to the new
// "/assets/khs/<bucket>/<file>" path from the re-scraped, page-bucketed
// manifest, matching by WordPress "base identity" (stripping -WIDTHxHEIGHT /
// -scaled / -N size-variant suffixes) since the new manifest only keeps one
// canonical file per attachment. Run with `node scripts/remap-asset-paths.mjs`.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function stem(filename) {
  const ext = path.extname(filename);
  let name = filename.slice(0, -ext.length || undefined);
  name = name.replace(/-\d+x\d+$/, ""); // -1024x649
  name = name.replace(/-scaled$/, ""); // -scaled
  name = name.replace(/-\d+$/, ""); // -1, -2 (only trailing bare number)
  return name.toLowerCase() + ext.toLowerCase();
}

async function main() {
  const newManifest = JSON.parse(
    await readFile(path.join(ROOT, "public/assets/khs/asset-map.json"), "utf8")
  );

  // stem -> list of candidate new entries, preferring non-"unassociated" buckets first
  const byStem = new Map();
  for (const entry of newManifest) {
    const base = path.basename(entry.localPath);
    const key = stem(base);
    const list = byStem.get(key) ?? [];
    list.push(entry);
    byStem.set(key, list);
  }
  for (const list of byStem.values()) {
    list.sort((a, b) => (a.bucket === "unassociated") - (b.bucket === "unassociated"));
  }

  const files = globSync("src/**/*.{ts,tsx}", { cwd: ROOT });
  const oldPathRe = /\/assets\/old-site\/([^"'`)\s]+)/g;

  let totalRefs = 0;
  let matched = 0;
  const unmatched = new Set();

  for (const relFile of files) {
    const filePath = path.join(ROOT, relFile);
    const content = await readFile(filePath, "utf8");
    let changed = false;

    const newContent = content.replace(oldPathRe, (full, filename) => {
      totalRefs += 1;
      const key = stem(decodeURIComponent(filename));
      const candidates = byStem.get(key);
      if (candidates && candidates.length > 0) {
        matched += 1;
        changed = true;
        return candidates[0].localPath;
      }
      unmatched.add(filename);
      return full;
    });

    if (changed) {
      await writeFile(filePath, newContent, "utf8");
      console.log(`updated: ${relFile}`);
    }
  }

  console.log(`\nTotal old-site references found: ${totalRefs}`);
  console.log(`Matched + rewritten: ${matched}`);
  console.log(`Unmatched (left as-is, needs manual attention): ${unmatched.size}`);
  if (unmatched.size > 0) {
    console.log([...unmatched].join("\n"));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
