import Container from "./container";
import Button from "./button";
import CodeBlock from "./code-block";
import Orbit from "./orbit";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fine dot-grid backdrop, faded toward the edges */}
      <div
        aria-hidden
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 70% at 40% 30%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 40% 30%, #000 30%, transparent 100%)",
        }}
      />

      {/* The favicon mark, blown up into a slowly orbiting schematic */}
      <Orbit
        pathId="hero-orbit"
        className="absolute -right-48 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 lg:block xl:-right-36"
      />

      <Container className="relative py-24 md:py-36">
        <div className="max-w-3xl">
          <p className="animate-rise mb-7 flex items-center gap-3 font-mono text-xs tracking-wide text-muted">
            <span className="text-accent">{"//"}</span>
            local-first · transparent by default
            <span aria-hidden className="h-px w-10 bg-edge-strong" />
          </p>

          <h1 className="animate-rise font-serif text-6xl leading-[0.98] tracking-tight text-fg md:text-8xl [animation-delay:80ms]">
            AI agents should
            <br />
            <em className="text-accent">show their work.</em>
          </h1>

          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-muted [animation-delay:160ms]">
            Saturday.ai is a local-first agent platform. Every plan, tool call,
            metric, and decision is written to the screen as it happens — on
            your hardware, in your terminal.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
            <Button href="/install">Install Saturn</Button>
            <Button href="/docs" variant="secondary">
              Documentation
            </Button>
          </div>

          <div className="animate-rise mt-9 max-w-md [animation-delay:320ms]">
            <CodeBlock command="curl -fsSL saturdayai.org/install.sh | sh" />
          </div>
        </div>
      </Container>
    </section>
  );
}
