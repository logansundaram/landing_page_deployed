import Link from "next/link";
import Container from "./container";
import InstallTranscript from "./install-transcript";

/**
 * The closing section is inverse video at page scale: a full-bleed cyan
 * slab with ink text, the dark install transcript punching out of it.
 */
export default function CTA() {
  return (
    <section className="bg-accent text-ink">
      <Container className="py-20 md:py-28">
        <p className="flex items-center gap-3 font-mono text-xs">
          <span className="text-ink/60">04</span>
          <span className="text-ink/60">::</span>
          <span className="lowercase">get started</span>
          <span aria-hidden className="h-px min-w-8 flex-1 bg-ink/25" />
        </p>

        {/* Whole line in the serif voice — the slab is the highlight */}
        <h2 className="mt-6 font-serif text-4xl font-medium italic leading-[1.08] tracking-tight md:text-6xl">
          Run an agent
          <br />
          you can actually see.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">
          One command. Under a minute. Everything on your hardware.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <InstallTranscript />

          <aside className="flex flex-col gap-3 lg:pt-2">
            <p className="mb-3 font-mono text-xs text-ink/60">
              :: no account · no cloud
            </p>
            <Link
              href="/install"
              className="inline-flex h-11 items-center justify-center bg-ink px-6 font-mono text-sm lowercase text-accent transition-colors hover:bg-panel-2 focus-visible:outline-ink"
            >
              install saturn
            </Link>
            <Link
              href="/docs"
              className="group inline-flex h-11 items-center justify-center gap-2 px-3 font-mono text-sm lowercase transition-opacity hover:opacity-70 focus-visible:outline-ink"
            >
              <span aria-hidden className="text-ink/50">
                [
              </span>
              read the docs
              <span aria-hidden className="text-ink/50">
                ]
              </span>
            </Link>
            <p className="mt-3 font-mono text-xs leading-relaxed text-ink/60">
              works on macOS · linux · wsl2 · windows
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
