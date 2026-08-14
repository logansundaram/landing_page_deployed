# Saturn site rework — design spec

2026-08-14. Implements the v2 rework brief ("terminal is the object, type is the
brand, color is data") on the existing Next.js 16 + Tailwind v4 chassis.
Decisions below were settled with Logan in the brainstorming session; he then
waived per-section approval ("do what you believe is best").

## Locked decisions

1. **Stack**: keep Next.js 16 + Tailwind v4 + Vercel deploy. No Astro, no
   hand-rolled build. `output: 'export'` is ruled out — the `/install.sh` and
   `/install.ps1` clean URLs are `rewrites()` proxies in `next.config.ts` and
   must survive. Every page remains statically prerendered; that satisfies the
   brief's "static output" in substance.
2. **Type**: all-mono, one family — **Commit Mono** (OFL), self-hosted via
   `next/font/local`, weights 400 + 700 only. Geist, JetBrains Mono, and
   Newsreader are removed. Emphasis = whole-line weight/scale, never a second
   family, never a colored word.
3. **Color is data**: chromatic color appears only through the semantic token
   set. Cyan is demoted to exactly one meaning — the prompt / "waiting on you"
   state — and appears only inside captures and gate UI. Decorative cyan
   (nav, links, slabs, LEDs, selection, focus) is gone.
4. **Captures are real runs**: rendered from Saturn's own `--export` run
   records (headless `-p … --json --export FILE`). Run #154 (plain query) and
   run #155 (real `write_file` gate denial) were captured during this session
   on qwen3.6:27b. Raw export records contain the grounding-context manifest,
   which includes private workspace data — they are **never committed**. They
   live in a git-ignored `runs-raw/` directory; `scripts/run-to-capture.mjs`
   derives sanitized render data (query, plan/gate events, timings, tokens,
   answer + confidence spans, run id/model/date as provenance) into committed
   TS modules under `src/app/lib/runs/`.
5. **Rings**: the CAD schematic survives on the landing page (Logan's explicit
   call), recolored luminance-only, with the dotted approval boundary as the
   single chromatic line (`gate-ask` amber — it is data: the gate). The
   terminal capture leads; the schematic keeps the front-door viewport with
   the headline.
6. **Scope**: landing, docs shell, `/install` (standalone), 404, footer
   receipts. No changelog, no `/design` page this round.
7. Analytics (`@vercel/analytics`, `@vercel/speed-insights`) are removed —
   zero third-party requests is a non-negotiable. Unused deps
   (`@supabase/supabase-js`, `ogl`, `react-intersection-observer`,
   `tailwind-merge`) are removed after a usage grep confirms they're dead.

## Tokens (single source: the `@theme` block in `globals.css`)

Surfaces (unchanged): `ink #050507`, `panel #0b0b0e`, `panel-2 #101015`,
`edge #1c1c22`, `edge-strong #2a2a33`.

Text (warm off-white class, never `#fff`): `fg #e6e4e1`, `muted #9b9891`,
`faint #6b6862`. Grays carry all hierarchy.

Confidence ramp (the motif; OKLCH-built, luminance strictly monotone so
grayscale preserves order, which also preserves order under CVD; validated
with the dataviz palette validator — the single-hue check intentionally fails
because the brief mandates the amber→red hue sweep):

| token | oklch | hex | meaning |
|---|---|---|---|
| `ramp-0` | 0.87 0.03 90 | `#dcd4be` | certain |
| `ramp-1` | 0.78 0.10 85 | `#d5b36a` | |
| `ramp-2` | 0.69 0.14 70 | `#d28a21` | |
| `ramp-3` | 0.58 0.155 45 | `#c25518` | |
| `ramp-4` | 0.47 0.19 28 | `#ac040c` | uncertain |

`ramp-4` is 2.69:1 on ink — marks only, never body-size text.

Gate states: `gate-ok #28c840` (ran/approved — the TUI's green),
`gate-ask = ramp-2`, `gate-deny = ramp-4`. Prompt: `prompt #00ffff`
(the TUI's cyan, restricted per decision 3).

Deleted: `accent`, `accent-dim`, `.bg-scanlines` (it's a
`repeating-linear-gradient` — `grep -ri gradient` on shipped CSS must be 0),
cyan `::selection`, cyan focus ring (both become fg-based), nav
`backdrop-blur` (glass is banned → solid ink + hairline).

Motif slots (Nothing discipline — the ramp appears in exactly these,
defined once): favicon (`icon.svg` becomes a 5-bar ramp glyph; `LogoMark`
and `apple-icon` follow), confidence spans inside captures, the og-image
social card, active nav state (a small ramp-0 tick, since active = data),
and the 404's signal readout. Never decorative fills, never backgrounds.

## Type scale (three sizes, violent jumps, no middle register)

- **display**: `clamp(2.75rem, 8vw, 7.5rem)`, weight 700, tracking −0.02em,
  lowercase. Hero and CTA headlines only.
- **body/spec**: 14px (0.875rem), weight 400; 700 for in-line emphasis and
  table heads. All prose, tables, docs.
- **micro**: 11px lowercase captions — the deadpan register
  (`gate: ask. diff shown. nothing ran.`), figure labels, receipts.

The 2.75rem `SectionHeading` middle register dies. Chapters are labeled by
micro caption rows (`01 · meet saturn ────`); content carries the size.
Docs headings are body-size 700 — Oxide density, not display type.

## Landing chapters (one idea per viewport)

- **00 / front door**: full-viewport. Headline `ai agents should /` (400,
  muted) `show their work.` (700, fg) — whole-line emphasis by weight. Real
  policy flags as micro caption (`local_first=true cloud_calls=0
  telemetry=off`, values in gate-ok). Bracketed `[ install ]` `[ docs ]`
  links, luminance-only. Rings schematic behind/right, luminance linework +
  amber approval boundary; callout numerals go fg/muted; satellite square
  goes fg.
- **01 / the capture**: full-bleed real run #154 as token-styled `<pre>` on
  page background — the seam vanishes; no window chrome, no scanlines. A
  hairline top/bottom rule frames the chapter. Real pipeline nodes (ground →
  plan → execute → synthesize) with real timings from the export's
  `llm_calls`; answer text carries confidence spans colored by real
  logprobs mapped to ramp steps. Micro caption:
  `fig. 01 — run #154, qwen3.6:27b, 2026-08-14. unedited.` Below, a dense
  spec table replaces the marker-chip annotations (declared up front /
  execution trace / live readout / your move).
- **02 / the gate**: run #155 — the real denial. Short capture: plan step,
  `write_file → denied`, skipped step, the model's own "I did not create
  hello.txt" answer. Caption: `gate: ask. headless default: deny. nothing
  ran.` This chapter is the brief's caption made literal.
- **03 / policy**: the `# saturn.policy` table survives (already spec-sheet);
  restyled — line numbers, values in gate-ok, hairline rows, no panel box.
- **04 / capabilities**: the 7-cell card grid dies (card grids are banned).
  Becomes a dense spec table: rows = capability / readout vignette /
  one-line body. Hairline-divided, flush.
- **05 / get started**: cyan slab dies. Full-bleed ink, display-size
  `run an agent you can actually see.` (700), the one-liner
  `curl -fsSL saturdayai.org/install.sh | sh` in a copyable block,
  bracketed links. Deadpan.
- **footer**: the only place "Saturday" appears (`a saturday.ai project`).
  Receipts row (micro): `first paint: NN kB · requests to third parties: 0 ·
  no analytics · fonts self-hosted`. A `scripts/receipts.mjs` postbuild
  script measures the built first-paint payload of `/` and fails the build
  if it exceeds the printed figure or the 300 KB budget — the receipt can't
  silently rot. ("Works offline" is only claimed if a service worker ships;
  this round it does not — receipt stays honest without it.)

## Interior pages

- **Docs**: same shell (sidebar + content), Oxide density — tight measure,
  body-size 700 headings, dense hairline tables, no panel cards, no cyan.
- **Install**: standalone; steps as a numbered spec sheet, requirements as a
  dense table, both code blocks kept (copy button stays — it's function, not
  decoration).
- **404** (`not-found.tsx`): the one moment of joy — rings schematic with the
  satellite square drifting off the F ring, caption
  `fig. 404 — object not found. nothing ran.` plus a `[ return ]` link.
- **SEO/meta**: `site.ts` leads with Saturn (`name: "Saturn"`, Saturday.ai
  kept as publisher/organization in JSON-LD and footer). Title default
  `Saturn — the local-first agent that shows its work`; template
  `%s — Saturn`. og-image rebuilt: mono type, ramp bars, no cyan, no grid
  gradient. All keywords/canonicals/robots plumbing kept.

## Capture pipeline

`scripts/run-to-capture.mjs` reads a raw export record from the git-ignored
`runs-raw/` directory and emits the sanitized render data (nodes, timings,
tokens, confidence spans bucketed to ramp steps) as a typed TS module under
`src/app/lib/runs/` — build-time only, zero client JS. Re-running a capture
= run saturn with `--export runs-raw/<name>.json`, re-run the script. Logprob→ramp mapping: mean span logprob `p`;
`p ≥ −0.05` → fg (no color — certainty is the default voice); then ramp-1
at ≥ −0.5, ramp-2 at ≥ −1.5, ramp-3 at ≥ −2.5, else ramp-4. The mapping
lives in one file shared by capture rendering and the motif components.

## Verification (the brief's "done when")

1. `npm run build` + `npm run lint` pass.
2. `grep -ri gradient` over `.next/static/**/*.css` → 0 matches.
3. Dev-server network log: origin-only (checked via browser tools).
4. Grayscale screenshot keeps hierarchy and ramp order (monotone-L ramp
   guarantees it by construction; verified visually).
5. 320px hero thumbnail is unmistakable next to warp.dev / ghostty.org.
6. "Saturday" appears in footer only (`grep -ri saturday src/app` audit of
   rendered components; metadata/JSON-LD publisher exempt by design).
7. First-paint payload < 300 KB enforced by `receipts.mjs`.

## Post-ship revision (2026-08-14, Logan)

Two corrections after the first ship:

1. **Naming**: Saturn is the product, Saturday.ai is the company. Nav and
   titles stay Saturn-led; the footer is the company's slot and signs as
   `saturday.ai` ("the company behind saturn"). Metadata description names
   both.
2. **Palette**: the site must match the actual product — terminal cyan on
   dark grey. Decision 3's cyan demotion is reversed: `accent #00ffff` is
   restored as the site accent (hero line 2, buttons, nav active, `::`
   markers, ring linework, focus/selection), along with the TUI's `ok`/
   `hot` status colors and the full-bleed cyan CTA slab. The `gate-ask`/
   `gate-deny` tokens are gone (gate UI wears `hot`, as the TUI does).
   The confidence ramp survives **as data only**: it colors real logprob
   spans inside captures. Brand mark reverts to the planet-and-cyan-ring.
   Everything else from v2 stands: all-mono Commit Mono, chapters, real
   captures, receipts, no gradients/glass/scanlines.

## Implementation order

fonts → tokens/globals → site.ts + layout (drop analytics) → capture
pipeline + components → nav/footer → landing chapters → rings recolor →
docs/install/404 → icons/og → dep cleanup → receipts script → verify →
memory update.
