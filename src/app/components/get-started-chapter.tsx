import Link from "next/link";
import Container from "./container";
import CodeBlock from "./code-block";
import { site } from "../lib/site";

/**
 * The closing chapter is inverse video at page scale: a full-bleed cyan
 * slab with ink text — the product's accent turned into the surface — with
 * the dark install command panel punching out of it. Links are ink-styled
 * inline (no Button component; its focus ring vanishes on cyan).
 */
export default function GetStartedChapter() {
  return (
    <section className="bg-accent text-ink">
      <Container className="py-20 md:py-28">
        <p className="type-micro flex items-center gap-3 lowercase">
          <span className="text-ink/60">05</span>
          <span className="text-ink/60">::</span>
          <span>get started</span>
          <span aria-hidden className="h-px min-w-8 flex-1 bg-ink/25" />
        </p>

        <h2 className="type-display mt-10 lowercase">
          <span className="block font-normal">run an agent</span>
          <span className="block">you can actually see.</span>
        </h2>

        <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
          One command. Under a minute. Everything on your hardware.
        </p>

        <div className="mt-10 max-w-lg">
          <CodeBlock command={site.installCommand} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/install"
            className="inline-flex h-11 items-center justify-center bg-ink px-6 text-sm font-bold lowercase text-accent t-colors hover:bg-panel-2 focus-visible:outline-ink"
          >
            install saturn
          </Link>
          <Link
            href="/docs"
            className="group inline-flex h-11 items-center justify-center gap-2 px-3 text-sm lowercase transition-opacity hover:opacity-70 focus-visible:outline-ink"
          >
            <span aria-hidden className="text-ink/50">
              [
            </span>
            read the docs
            <span aria-hidden className="text-ink/50">
              ]
            </span>
          </Link>
        </div>

        <p className="type-micro mt-8 lowercase text-ink/60">
          works on macos · linux · wsl2 · windows — no account, no cloud
        </p>
      </Container>
    </section>
  );
}
