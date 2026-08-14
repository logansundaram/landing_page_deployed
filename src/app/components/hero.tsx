import Container from "./container";
import Button from "./button";
import CodeBlock from "./code-block";
import SaturnRings from "./saturn-rings";

export default function Hero() {
  return (
    <section className="relative flex overflow-hidden lg:min-h-[42vw]">
      {/* The observatory sheet spans the full viewport width */}
      <SaturnRings
        pathId="hero-f-ring"
        className="absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block"
      />

      <Container className="relative z-10 flex items-center py-24 md:py-32">
        <div className="max-w-4xl">
          {/* The policy flags Saturn boots with — restated in full in §02 */}
          <p className="animate-rise mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
            <span className="text-accent">$</span>
            <span>
              local_first=<span className="text-ok">true</span>
            </span>
            <span>
              cloud_calls=<span className="text-ok">0</span>
            </span>
            <span>
              telemetry=<span className="text-ok">off</span>
            </span>
          </p>

          <h1 className="animate-rise text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] text-fg sm:text-6xl md:text-7xl xl:text-8xl [animation-delay:80ms]">
            AI agents should
            <br />
            {/* Emphasis at line level: the whole line, in the serif voice */}
            <span className="font-serif text-[1.04em] font-medium italic text-accent">
              show their work.
            </span>
          </h1>

          <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-muted [animation-delay:160ms]">
            Saturday.ai is a local-first agent platform. Every plan, tool
            call, metric, and decision is written to the screen as it happens
            — on your hardware, in your terminal.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
            <Button href="/install">install saturn</Button>
            <Button href="/docs" variant="secondary">
              docs
            </Button>
          </div>

          <div className="animate-rise mt-9 max-w-lg [animation-delay:320ms]">
            <CodeBlock command="curl -fsSL saturdayai.org/install.sh | sh" />
          </div>
        </div>
      </Container>
    </section>
  );
}
