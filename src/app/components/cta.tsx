import Container from "./container";
import Button from "./button";

export default function CTA() {
  return (
    <section className="border-t border-edge">
      <Container className="py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-fg md:text-5xl">
            Run an agent you can actually see.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Install Saturn and have a transparent, local-first agent running in
            your terminal in under a minute.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/install">Install</Button>
            <Button href="/docs" variant="secondary">
              Read the docs
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
