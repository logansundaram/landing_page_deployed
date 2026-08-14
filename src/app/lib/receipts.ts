/* Footer receipts. firstPaintKB is the measured first-paint payload of `/`
   (HTML + CSS + JS + font, uncompressed on disk) rounded UP to the nearest
   5 kB. scripts/receipts.mjs re-measures after every build and fails if the
   real figure exceeds this one or the 300 kB budget — the receipt cannot
   silently rot. Update it by running: npm run build (postbuild prints the
   measured figure). */
export const receipts = {
  firstPaintKB: 240,
  thirdPartyRequests: 0,
} as const;
