// One-off migration script: pulls every real media attachment from the old
// krishnahomestudio.com WordPress site, associates each one with the page it
// belongs to (via the attachment's `post` parent field), and writes it into
// public/assets/khs/<bucket>/ — one file per unique attachment, no WP
// thumbnail-size duplicates. Run manually with `node scripts/migrate-assets.mjs`.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "khs");
const SITE = "https://krishnahomestudio.com";

// Known page slug -> asset bucket mapping (from the confirmed 20-page inventory).
const SLUG_TO_BUCKET = {
  "home-1": "home",
  about: "about",
  "about-prakash-chaudhary": "about/founder",
  contact: "showrooms",
  clientele: "clientele",
  media: "media-press",
  blog: "media-press",
  product: "bathware/_hub",
  "shower-faucets": "bathware/shower-faucets",
  "countertop-basin": "bathware/countertop-basin",
  "standalone-basin": "bathware/standalone-basin",
  "vanity-mirrors": "bathware/vanity-mirrors",
  "kitchen-sinks-faucets": "bathware/kitchen-sinks-faucets",
  "shower-enclosures": "bathware/shower-enclosures",
  "booster-heat-pumps": "bathware/booster-heat-pumps",
  "pressure-pump-water-heater": "bathware/water-softeners-heaters",
  "bath-accessories": "bathware/bath-accessories",
  "spa-wellness": "bathware/spa-wellness",
  "washbasins-waterclosets-urinals": "bathware/washbasins-waterclosets-urinals",
  hardware: "hardware",
  "safe-essentials": "safe-essentials",
};

async function fetchAllPaginated(endpoint) {
  const items = [];
  let page = 1;
  for (;;) {
    const res = await fetch(`${SITE}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`);
    if (!res.ok) {
      if (res.status === 400) break; // rest_post_invalid_page_number: past the last page
      throw new Error(`${endpoint} page ${page} failed: ${res.status}`);
    }
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    items.push(...batch);
    page += 1;
  }
  return items;
}

function stripHtml(html) {
  return (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#039;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

async function downloadWithLimit(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    for (;;) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

async function main() {
  console.log("Fetching page inventory ...");
  const pages = await fetchAllPaginated("pages");
  const pageIdToSlug = new Map(pages.map((p) => [p.id, p.slug]));
  console.log(`  ${pages.length} pages found.`);

  console.log("Fetching full media library (paginated) ...");
  const media = await fetchAllPaginated("media");
  console.log(`  ${media.length} media attachments found.`);

  const manifest = [];
  const usedNames = new Map(); // bucket -> Set of filenames already used

  const tasks = media
    .filter((m) => typeof m.source_url === "string" && m.source_url.length > 0)
    .map((m) => {
      const slug = m.post ? pageIdToSlug.get(m.post) : undefined;
      const bucket = (slug && SLUG_TO_BUCKET[slug]) || "unassociated";
      return { m, slug, bucket };
    });

  console.log(`Downloading ${tasks.length} unique attachments (one file per attachment, no size-variant duplicates) ...`);

  let ok = 0;
  let failed = 0;

  await downloadWithLimit(tasks, 8, async ({ m, slug, bucket }) => {
    const bucketDir = path.join(OUT_DIR, bucket);
    await mkdir(bucketDir, { recursive: true });

    let baseName = path.basename(new URL(m.source_url).pathname);
    const seen = usedNames.get(bucket) ?? new Set();
    if (seen.has(baseName)) {
      const ext = path.extname(baseName);
      const stem = baseName.slice(0, -ext.length || undefined);
      baseName = `${stem}-${m.id}${ext}`;
    }
    seen.add(baseName);
    usedNames.set(bucket, seen);

    const localRelPath = `/assets/khs/${bucket}/${baseName}`;
    const localAbsPath = path.join(bucketDir, baseName);

    try {
      const res = await fetch(m.source_url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(localAbsPath, buf);
      manifest.push({
        id: m.id,
        originalUrl: m.source_url,
        localPath: localRelPath,
        bucket,
        pageSlug: slug ?? null,
        bytes: buf.length,
        width: m.media_details?.width ?? null,
        height: m.media_details?.height ?? null,
        alt: m.alt_text || "",
        title: stripHtml(m.title?.rendered),
        caption: stripHtml(m.caption?.rendered),
      });
      ok += 1;
    } catch (err) {
      failed += 1;
      console.warn(`  FAILED ${m.source_url}: ${err.message}`);
    }
  });

  manifest.sort((a, b) => a.bucket.localeCompare(b.bucket) || a.id - b.id);
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, "asset-map.json"), JSON.stringify(manifest, null, 2));

  const byBucket = new Map();
  for (const entry of manifest) byBucket.set(entry.bucket, (byBucket.get(entry.bucket) ?? 0) + 1);

  console.log("\nDone.");
  console.log(`  Downloaded OK: ${ok}`);
  console.log(`  Failed: ${failed}`);
  console.log("  By bucket:");
  for (const [bucket, count] of [...byBucket.entries()].sort()) {
    console.log(`    ${bucket}: ${count}`);
  }
  console.log(`\nManifest written to public/assets/khs/asset-map.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
