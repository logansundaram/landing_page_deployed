import type { Metadata } from "next";
import type { ReactNode } from "react";
import Button from "../components/button";
import Container from "../components/container";
import PageHeader from "../components/page-header";
import {
  eris,
  erisBuilt,
  erisExclusions,
  erisNext,
  erisPipeline,
  erisPolicy,
  type NodeStatus,
} from "../lib/eris";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "eris",
  description:
    "Eris is a local-first OSINT investigation engine from Saturday.ai, built on the Saturn trust harness. Every claim cites its source, every request lands in a ledger, every run replays. Pre-alpha.",
  alternates: {
    canonical: "/eris",
  },
  openGraph: {
    title: "eris — Saturday.ai",
    description:
      "A local-first investigation engine with a defensible record. In development.",
    url: "/eris",
    type: "website",
  },
};

/* What a finished run hands the analyst. */
const deliverables = [
  {
    k: "ring graph",
    v: "subject at center, concentric rings by hop distance, edges colored by confidence. exports to graphml and json.",
  },
  {
    k: "dossier",
    v: "the document an analyst hands to someone. every claim cites its edge; every edge cites its source and hash.",
  },
  {
    k: "replay",
    v: "the full run re-executes from the checkpointer and draws the same picture.",
  },
  {
    k: "ledger",
    v: "every outbound request, every gate decision, every proposed and approved merge.",
  },
];

const statusStyle: Record<NodeStatus, string> = {
  built: "text-ok",
  poc: "text-accent",
  planned: "text-faint",
  later: "text-faint",
};

export default function ErisPage() {
  const built = erisPipeline.filter((n) => n.status === "built").length;

  return (
    <>
      <PageHeader
        eyebrow={`in development :: ${eris.status}`}
        title="eris."
        lead={`${eris.tagline}. Give it a domain, an organization, a claim, or a person; it builds a graph of what public sources say, on your hardware, with every claim tied to the source that produced it.`}
      />

      <Section label="what it does" title="a graph with receipts.">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Eris builds a ring graph of intelligence around a subject using
              deterministic passive sources first and a local model to choose
              pivots and write the dossier. Every edge carries its source, fetch
              time, raw-response hash, trust tier, and confidence.
            </p>
            <p>
              Investigation tooling answers to an auditor, a privacy office, or
              a court. The property that matters is not how much you can
              collect. It is whether you can show exactly what the analyst did,
              what each claim rests on, and what left the machine.
            </p>
            <p>
              It runs on the same{" "}
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                Saturn
              </a>{" "}
              trust harness as our terminal agent: trace, egress ledger, replay,
              and quarantine come for free.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href={eris.announcement}>read the announcement</Button>
              <Button href="/blog" variant="secondary">
                blog
              </Button>
            </div>
          </div>

          <div className="grid gap-px border border-edge bg-edge sm:grid-cols-2">
            {deliverables.map((d) => (
              <div key={d.k} className="bg-ink p-5">
                <p className="text-sm font-bold lowercase text-fg">{d.k}</p>
                <p className="mt-1.5 text-sm lowercase leading-relaxed text-muted">
                  {d.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        label="guarantees"
        title={
          <>
            <span className="block font-normal">structural,</span>
            <span className="block">not policy.</span>
          </>
        }
      >
        <div className="border-y border-edge">
          <div className="type-micro flex items-center justify-between border-b border-edge py-2.5 lowercase text-faint">
            <p># eris.policy</p>
            <p>{erisPolicy.length} rules · read-only</p>
          </div>
          {erisPolicy.map((r, i) => (
            <div
              key={r.key}
              className="grid gap-x-8 gap-y-2 border-b border-edge py-5 t-colors last:border-b-0 hover:bg-panel md:grid-cols-[24px_260px_1fr] md:items-baseline"
            >
              <p className="hidden text-sm text-faint md:block">{i + 1}</p>
              <p className="text-sm">
                <span className="text-fg">{r.key}</span>
                <span className="text-faint"> = </span>
                <span className="text-ok">{r.value}</span>
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        label="the pipeline"
        title={
          <>
            <span className="block font-normal">the engine owns the plan.</span>
            <span className="block">the model decides one thing.</span>
          </>
        }
      >
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-muted">
          A case runs intake → seed → pivot loop → analysis → dossier. Most
          nodes are plain code; a model call only happens where a judgment is
          needed. Hop budget, frontier, and stop conditions are enforced in
          code, because a ~27B local model matches frontier models on single
          tools and synthesis and scores zero on long-horizon planning.
        </p>

        <div className="border-y border-edge">
          <div className="type-micro hidden grid-cols-[80px_130px_60px_70px_1fr] gap-x-6 border-b border-edge py-2.5 lowercase text-faint md:grid">
            <p>stage</p>
            <p>node</p>
            <p>kind</p>
            <p>status</p>
            <p>does</p>
          </div>
          {erisPipeline.map((n) => (
            <div
              key={n.node}
              className="grid gap-x-6 gap-y-1 border-b border-edge py-4 t-colors last:border-b-0 hover:bg-panel md:grid-cols-[80px_130px_60px_70px_1fr] md:items-baseline"
            >
              <p className="type-micro lowercase text-faint">{n.stage}</p>
              <p className="text-sm font-bold lowercase text-fg">{n.node}</p>
              <p className="type-micro lowercase text-muted">{n.kind}</p>
              <p className={`type-micro lowercase ${statusStyle[n.status]}`}>
                {n.status}
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                {n.does}
              </p>
            </div>
          ))}
          <div className="type-micro flex items-center justify-between py-2.5 lowercase text-faint">
            <p>
              {built}/{erisPipeline.length} nodes built · graded by per-node
              harnesses
            </p>
            <p>
              <span className="text-ok">built</span> ·{" "}
              <span className="text-accent">poc</span> · planned
            </p>
          </div>
        </div>
      </Section>

      <Section label="not in the registry" title="what it is not.">
        <div className="border-y border-edge">
          {erisExclusions.map((e) => (
            <div
              key={e.k}
              className="grid gap-x-8 gap-y-1 border-b border-edge py-5 last:border-b-0 md:grid-cols-[260px_1fr] md:items-baseline"
            >
              <p className="text-sm font-bold lowercase text-fg">{e.k}</p>
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                {e.v}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="status" title="pre-alpha. nothing shipped.">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              The architecture and tool set are decided. The tools below are
              built, keyless, and passive. The extract and investigate nodes are
              built and graded by their own harnesses against a local
              Qwen3.5-9B. The engine loop, graph store, API, and interface do
              not exist yet.
            </p>
            <div className="mt-6 border-y border-edge">
              <div className="type-micro border-b border-edge py-2.5 lowercase text-faint">
                $ ls eris/tools
              </div>
              <div className="grid grid-cols-2 gap-x-6 py-3 sm:grid-cols-3">
                {erisBuilt.map((t) => (
                  <p key={t} className="py-1 text-sm text-fg">
                    <span className="text-ok">✓</span> {t}
                  </p>
                ))}
              </div>
            </div>
            <p className="type-micro mt-4 lowercase text-faint">
              open-core · the saturn harness underneath is mit · the
              investigation layer is proprietary
            </p>
          </div>

          <div>
            <p className="type-micro mb-3 flex items-center gap-3 lowercase">
              <span className="text-faint">::</span>
              <span className="text-accent">next, in order</span>
              <span aria-hidden className="h-px min-w-8 flex-1 bg-edge" />
            </p>
            <ol className="space-y-3">
              {erisNext.map((step, i) => (
                <li
                  key={step}
                  className="grid grid-cols-[28px_1fr] text-sm leading-relaxed text-muted"
                >
                  <span className="type-micro pt-0.5 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}

/* A product-page section: caption row, display claim, content. Not numbered —
   these are facets of one thing, not a sequence. */
function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-edge first-of-type:border-t-0">
      <Container className="pb-20 pt-8 md:pb-28 md:pt-10">
        <p className="type-micro flex items-center gap-3 lowercase">
          <span className="text-faint">::</span>
          <span className="text-accent">{label}</span>
          <span aria-hidden className="h-px min-w-8 flex-1 bg-edge" />
        </p>
        <h2 className="type-display mt-10 lowercase md:mt-12">{title}</h2>
        <div className="mt-12 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
