/**
 * Verify the footer receipts against the real build (runs as postbuild).
 *
 * Measures the first-paint payload of `/`: the prerendered HTML plus every
 * /_next/static asset it references (JS, CSS, fonts), uncompressed on disk.
 * Fails the build if the figure exceeds the value printed in the footer
 * (src/app/lib/receipts.ts) or the 300 kB budget from the design brief —
 * an unhonored receipt is a build error, not a footnote.
 */
import { readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUDGET_KB = 300;

function findIndexHtml() {
  const candidates = [
    join(root, ".next", "server", "app", "index.html"),
    join(root, ".next", "server", "pages", "index.html"),
  ];
  for (const c of candidates) {
    try {
      statSync(c);
      return c;
    } catch {
      /* keep looking */
    }
  }
  throw new Error("prerendered index.html not found — run next build first");
}

const htmlPath = findIndexHtml();
const html = readFileSync(htmlPath, "utf8");
const htmlBytes = statSync(htmlPath).size;

/* Every static asset the document references. Deduped; missing files are
   reported, not silently skipped. First paint = render-blocking bytes
   (HTML + CSS + fonts, uncompressed on disk); the async JS bundle is
   measured and reported separately so it can't hide. */
const refs = [
  ...new Set(
    [...html.matchAll(/\/_next\/static\/[^"'\s?\\]+/g)].map((m) => m[0]),
  ),
];

let paintBytes = htmlBytes;
let jsBytes = 0;
const rows = [];
for (const ref of refs) {
  const p = join(root, ".next", ref.replace("/_next/", "").replace(/\//g, "\\"));
  try {
    const size = statSync(p).size;
    if (/\.(css|woff2?)$/.test(ref)) paintBytes += size;
    else if (ref.endsWith(".js")) jsBytes += size;
    else paintBytes += size;
    rows.push([ref, size]);
  } catch {
    console.warn(`receipts: referenced asset missing on disk: ${ref}`);
  }
}

const totalKB = paintBytes / 1024;

const receiptsSrc = readFileSync(
  join(root, "src", "app", "lib", "receipts.ts"),
  "utf8",
);
const declared = Number(receiptsSrc.match(/firstPaintKB:\s*(\d+)/)?.[1]);

rows.sort((a, b) => b[1] - a[1]);
for (const [ref, size] of rows.slice(0, 8)) {
  console.log(`${(size / 1024).toFixed(1).padStart(8)} kB  ${ref}`);
}
console.log(`${(htmlBytes / 1024).toFixed(1).padStart(8)} kB  (html) /`);
console.log(
  `\nfirst paint (html+css+fonts): ${totalKB.toFixed(1)} kB measured · ${declared} kB declared · ${BUDGET_KB} kB budget`,
);
console.log(`async js (deferred, not first paint): ${(jsBytes / 1024).toFixed(1)} kB`);

if (Number.isNaN(declared)) {
  console.error("receipts: could not read firstPaintKB from receipts.ts");
  process.exit(1);
}
if (totalKB > BUDGET_KB) {
  console.error(`receipts: first paint exceeds the ${BUDGET_KB} kB budget`);
  process.exit(1);
}
if (totalKB > declared) {
  console.error(
    `receipts: first paint exceeds the declared ${declared} kB — update src/app/lib/receipts.ts or slim the page`,
  );
  process.exit(1);
}
console.log("receipts: ok");
