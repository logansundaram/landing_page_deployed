import Container from "./container";
import Button from "./button";
import Crosses from "./crosses";
import Orbit from "./orbit";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-edge">
      <Crosses />

      {/* The brand mark orbiting quietly behind the closing ask */}
      <Orbit
        pathId="cta-orbit"
        className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-50"
      />

      <Container className="relative py-24 md:py-36">
        <div className="flex flex-col items-center text-center">
          <p className="mb-6 font-mono text-xs tracking-wide text-muted">
            <span className="text-accent">{"//"}</span> get started
          </p>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-fg md:text-6xl">
            Run an agent you can <em className="text-accent">actually see.</em>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Install Saturn and have a transparent, local-first agent running in
            your terminal in under a minute.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/install">Install Saturn</Button>
            <Button href="/docs" variant="secondary">
              Read the docs
            </Button>
          </div>
          <p className="mt-9 font-mono text-sm text-faint">
            <span className="text-accent">$</span>{" "}
            <span className="text-muted">
              curl -fsSL saturdayai.org/install.sh | sh
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
