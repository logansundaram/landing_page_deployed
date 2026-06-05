import Container from "./container";
import Button from "./button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Faint grid backdrop — texture, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      <Container className="relative py-24 md:py-36">
        <div className="max-w-3xl">
          <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Local-first · Transparent by default
          </p>

          <h1 className="animate-rise font-serif text-5xl leading-[1.05] tracking-tight text-fg md:text-7xl [animation-delay:80ms]">
            AI agents should be
            <br />
            <span className="text-accent">transparent.</span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted [animation-delay:160ms]">
            Saturday.ai is a local-first AI agent platform that exposes
            workflows, tools, metrics, and decisions instead of hiding them.
            Everything runs on your hardware, in your terminal.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
            <Button href="/install">Install</Button>
            <Button href="/docs" variant="secondary">
              Documentation
            </Button>
          </div>

          <div className="animate-rise mt-8 flex items-center gap-3 font-mono text-sm text-faint [animation-delay:320ms]">
            <span className="text-accent">$</span>
            <span className="text-muted">curl -fsSL saturday.ai/install | sh</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
