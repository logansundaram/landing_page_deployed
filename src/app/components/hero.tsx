import Container from "./container";
import Button from "./button";
import CodeBlock from "./code-block";
import SaturnRings from "./saturn-rings";
import { site } from "../lib/site";

export default function Hero() {
  return (
    <section className="relative flex overflow-hidden lg:min-h-[42vw]">
      {/* The observatory sheet spans the full viewport width */}
      <SaturnRings
        pathId="hero-f-ring"
        className="absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block"
      />

      <Container className="relative z-10 flex items-center py-24 md:py-32">
        <div className="max-w-5xl">
          {/* The policy flags Saturn boots with — real config, real values */}
          <p className="type-micro mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 lowercase text-muted">
            <span className="text-faint">$</span>
            <span>
              local_first=<span className="text-gate-ok">true</span>
            </span>
            <span>
              cloud_calls=<span className="text-gate-ok">0</span>
            </span>
            <span>
              telemetry=<span className="text-gate-ok">off</span>
            </span>
          </p>

          {/* Whole-line emphasis by weight — never a colored word */}
          <h1 className="type-display lowercase">
            <span className="block font-normal text-muted">
              ai agents should
            </span>
            <span className="block text-fg">show their work.</span>
          </h1>

          <p className="mt-8 max-w-xl leading-relaxed text-muted">
            Saturn is a terminal agent that runs on your hardware. Every plan,
            tool call, and decision is written to the screen as it happens —
            and when it wants to touch your system, it asks first.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/install">install saturn</Button>
            <Button href="/docs" variant="secondary">
              docs
            </Button>
          </div>

          <div className="mt-9 max-w-lg">
            <CodeBlock command={site.installCommand} />
          </div>
        </div>
      </Container>
    </section>
  );
}
