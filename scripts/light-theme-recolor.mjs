// One-off codemod: reverts the light-section text/border colors that the
// earlier dark-theme-recolor.mjs pass hardcoded to white/light, now that the
// page background is going back to white (client: "no black backgrounds",
// match https://thw.co.in/ navy+white scheme). Sections that are genuinely
// dark (bg-primary-dark: Hero, PageHero, Footer, ContactSection, AwardsVideo,
// ClienteleCarousel, dark CTA bands, Header's own conditional logic) are left
// untouched — this script only targets the specific known light-section
// occurrences, using exact substring replacement (not blanket regex) so nothing
// dark accidentally flips. Run with `node scripts/light-theme-recolor.mjs`.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const edits = [
  {
    file: "src/components/AboutSection/AboutSection.tsx",
    replacements: [
      ['text-3xl font-light leading-tight text-white sm:text-4xl', 'text-3xl font-light leading-tight text-primary-dark sm:text-4xl'],
      ['border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white',
       'border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white'],
    ],
  },
  {
    file: "src/app/about/page.tsx",
    replacements: [
      ['mb-6 text-3xl font-light leading-tight text-white sm:text-4xl', 'mb-6 text-3xl font-light leading-tight text-primary-dark sm:text-4xl'],
      ['mb-1.5 text-sm font-medium text-white">{item.title}', 'mb-1.5 text-sm font-medium text-primary-dark">{item.title}'],
      ['border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white\n              id="about-visit-btn"',
       'border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white\n              id="about-visit-btn"'],
      ['px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white underline decoration-gold underline-offset-4 hover:text-gold',
       'px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark underline decoration-gold underline-offset-4 hover:text-gold'],
    ],
  },
  {
    file: "src/app/safe-essentials/page.tsx",
    replacements: [
      ['mb-6 text-3xl font-light leading-tight text-white sm:text-4xl', 'mb-6 text-3xl font-light leading-tight text-primary-dark sm:text-4xl'],
      ['border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white',
       'border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white'],
      ['px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white underline decoration-gold underline-offset-4 hover:text-gold',
       'px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark underline decoration-gold underline-offset-4 hover:text-gold'],
      ['<span className="text-sm font-medium text-white">{feature.title}</span>', '<span className="text-sm font-medium text-primary-dark">{feature.title}</span>'],
    ],
  },
  {
    file: "src/app/about/founder/page.tsx",
    replacements: [
      ['<span className="block text-sm font-medium text-white">Prakash Choudhary</span>', '<span className="block text-sm font-medium text-primary-dark">Prakash Choudhary</span>'],
      ['mb-6 text-3xl font-light leading-tight text-white sm:text-4xl', 'mb-6 text-3xl font-light leading-tight text-primary-dark sm:text-4xl'],
      ['text-lg font-light italic leading-relaxed text-white">', 'text-lg font-light italic leading-relaxed text-primary-dark">'],
      ['border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white',
       'border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white'],
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">The Entrepreneurial Journey</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">The Entrepreneurial Journey</h2>'],
    ],
  },
  {
    file: "src/components/CategoryGrid/CategoryGrid.tsx",
    replacements: [
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">{title}</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">{title}</h2>'],
      ['border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white',
       'border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white'],
    ],
  },
  {
    file: "src/components/NewsSection/NewsSection.tsx",
    replacements: [
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">In The Press</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">In The Press</h2>'],
      ['border border-white/30 px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-primary-dark hover:text-white',
       'border border-primary-dark px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white'],
      ['<h3 className="mb-2 text-base font-medium text-white">{item.publication}</h3>', '<h3 className="mb-2 text-base font-medium text-primary-dark">{item.publication}</h3>'],
    ],
  },
  {
    file: "src/app/media/page.tsx",
    replacements: [
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">Featured Articles &amp; Recognition</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">Featured Articles &amp; Recognition</h2>'],
      ['<h3 className="mb-1 text-base font-medium text-white">{item.publication}</h3>', '<h3 className="mb-1 text-base font-medium text-primary-dark">{item.publication}</h3>'],
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">The Feature, In Print</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">The Feature, In Print</h2>'],
      ['<h3 className="mb-2 text-base font-medium text-white">India Design Awards recognition</h3>', '<h3 className="mb-2 text-base font-medium text-primary-dark">India Design Awards recognition</h3>'],
      ['<h3 className="mb-2 text-base font-medium text-white">Premium collections across bathware and hardware</h3>', '<h3 className="mb-2 text-base font-medium text-primary-dark">Premium collections across bathware and hardware</h3>'],
      ['<h3 className="mb-2 text-base font-medium text-white">Personal consultation and end-to-end support</h3>', '<h3 className="mb-2 text-base font-medium text-primary-dark">Personal consultation and end-to-end support</h3>'],
    ],
  },
  {
    file: "src/components/HomeExtras/HomeExtras.tsx",
    replacements: [
      ['<h2 className="max-w-xl text-3xl font-light text-white sm:text-4xl">', '<h2 className="max-w-xl text-3xl font-light text-primary-dark sm:text-4xl">'],
      ['<Link href="/clientele" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gold">',
       '<Link href="/clientele" className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-gold">'],
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">What Our Customers Say</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">What Our Customers Say</h2>'],
      ['<strong className="mt-4 block text-sm font-medium text-white">{review.name}</strong>', '<strong className="mt-4 block text-sm font-medium text-primary-dark">{review.name}</strong>'],
    ],
  },
  {
    file: "src/app/contact/page.tsx",
    replacements: [
      ['"w-full border border-border bg-surface px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-gold focus:outline-none"',
       '"w-full border border-border bg-surface px-4 py-3 text-sm text-primary-dark placeholder:text-gray-400 focus:border-gold focus:outline-none"'],
      ['<h2 className="mb-8 text-3xl font-light text-white">How can we help?</h2>', '<h2 className="mb-8 text-3xl font-light text-primary-dark">How can we help?</h2>'],
      ['<h3 className="mb-2 text-xl font-light text-white">Thank You!</h3>', '<h3 className="mb-2 text-xl font-light text-primary-dark">Thank You!</h3>'],
      ['border border-white/30 px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white hover:bg-primary-dark hover:text-white',
       'border border-primary-dark px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-primary-dark hover:bg-primary-dark hover:text-white'],
      ['<h3 className="mb-5 text-lg font-medium text-white">Bathware Studio</h3>', '<h3 className="mb-5 text-lg font-medium text-primary-dark">Bathware Studio</h3>'],
      ['<h3 className="mb-5 text-lg font-medium text-white">Hardware Studio</h3>', '<h3 className="mb-5 text-lg font-medium text-primary-dark">Hardware Studio</h3>'],
      ['<h3 className="mb-5 text-lg font-medium text-white">Jaquar Authorised Dealer</h3>', '<h3 className="mb-5 text-lg font-medium text-primary-dark">Jaquar Authorised Dealer</h3>'],
    ],
  },
  {
    file: "src/components/FAQAccordion/FAQAccordion.tsx",
    replacements: [
      ['<span className="text-[0.95rem] font-medium text-white">{item.question}</span>', '<span className="text-[0.95rem] font-medium text-primary-dark">{item.question}</span>'],
    ],
  },
  {
    file: "src/components/ContactSection/ContactSection.tsx",
    replacements: [
      ['inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold-hover',
       'inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-gold-hover'],
    ],
  },
  {
    file: "src/components/NumberedFeatureBlock/NumberedFeatureBlock.tsx",
    replacements: [
      ['<h3 className="mb-2 text-base font-medium text-white">{feature.title}</h3>', '<h3 className="mb-2 text-base font-medium text-primary-dark">{feature.title}</h3>'],
    ],
  },
  {
    file: "src/components/AwardsSection/AwardsSection.tsx",
    replacements: [
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">Excellence, By Every Measure</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">Excellence, By Every Measure</h2>'],
      ['<h3 className="mb-2 text-base font-medium text-white transition-colors group-hover:text-white">', '<h3 className="mb-2 text-base font-medium text-primary-dark transition-colors group-hover:text-white">'],
    ],
  },
  {
    file: "src/app/hardware/page.tsx",
    replacements: [
      ['mb-6 text-3xl font-light text-white sm:text-4xl', 'mb-6 text-3xl font-light text-primary-dark sm:text-4xl'],
      ['<h3 className="text-xl font-light text-white">Need Custom Fittings?</h3>', '<h3 className="text-xl font-light text-primary-dark">Need Custom Fittings?</h3>'],
      ['bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold-hover',
       'bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-dark transition-colors hover:bg-gold-hover'],
    ],
  },
  {
    file: "src/app/clientele/page.tsx",
    replacements: [
      ['<span className="block text-4xl font-light text-white">500+</span>', '<span className="block text-4xl font-light text-primary-dark">500+</span>'],
      ['<span className="block text-4xl font-light text-white">40+</span>', '<span className="block text-4xl font-light text-primary-dark">40+</span>'],
      ['<span className="block text-4xl font-light text-white">15+</span>', '<span className="block text-4xl font-light text-primary-dark">15+</span>'],
      ['<h2 className="text-3xl font-light text-white sm:text-4xl">Authorized Brands We Carry</h2>', '<h2 className="text-3xl font-light text-primary-dark sm:text-4xl">Authorized Brands We Carry</h2>'],
      ['<span className="mt-4 block text-sm font-medium text-white">{review.name}</span>', '<span className="mt-4 block text-sm font-medium text-primary-dark">{review.name}</span>'],
      ['<h2 className="mb-5 text-3xl font-light text-white sm:text-4xl">Partner with Krishna Home Studio</h2>', '<h2 className="mb-5 text-3xl font-light text-primary-dark sm:text-4xl">Partner with Krishna Home Studio</h2>'],
      ['border border-white/30 px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-dark hover:text-white',
       'border border-primary-dark px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-dark transition-colors hover:bg-primary-dark hover:text-white'],
    ],
  },
  {
    file: "src/app/hardware/[slug]/page.tsx",
    replacements: [
      ['<h2 className="mb-6 text-center text-2xl font-light text-white">Frequently Asked Questions</h2>', '<h2 className="mb-6 text-center text-2xl font-light text-primary-dark">Frequently Asked Questions</h2>'],
      ['bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold-hover',
       'bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-dark transition-colors hover:bg-gold-hover'],
    ],
  },
  {
    file: "src/app/bathware/[slug]/page.tsx",
    replacements: [
      ['<h2 className="mb-6 text-center text-2xl font-light text-white">Frequently Asked Questions</h2>', '<h2 className="mb-6 text-center text-2xl font-light text-primary-dark">Frequently Asked Questions</h2>'],
      ['bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold-hover',
       'bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-dark transition-colors hover:bg-gold-hover'],
    ],
  },
  {
    file: "src/components/Footer/Footer.tsx",
    replacements: [
      ['<footer className="bg-[#0d0d0d] text-white/70">', '<footer className="bg-primary-dark text-white/70">'],
    ],
  },
];

async function main() {
  let totalReplacements = 0;
  for (const { file, replacements } of edits) {
    const filePath = path.join(ROOT, file);
    let content = await readFile(filePath, "utf8");
    let fileChanges = 0;
    for (const [oldStr, newStr] of replacements) {
      if (!content.includes(oldStr)) {
        console.warn(`  WARNING: pattern not found in ${file}:\n    ${oldStr.slice(0, 80)}...`);
        continue;
      }
      content = content.replace(oldStr, newStr);
      fileChanges += 1;
    }
    if (fileChanges > 0) {
      await writeFile(filePath, content, "utf8");
      console.log(`updated: ${file} (${fileChanges} replacements)`);
      totalReplacements += fileChanges;
    }
  }
  console.log(`\nDone. ${totalReplacements} total replacements.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
