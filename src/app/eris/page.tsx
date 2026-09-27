import type { Metadata } from "next";
import Link from "next/link";
import About from "../components/about";
import Step from "../components/step";
import Blurb from "../components/blurb";
import Signup from "../components/signup";
import { erisGuarantees, erisPipeline, erisExclusions } from "../content/eris";

export const metadata: Metadata = {
  title: "Eris | Saturday.ai",
  description:
    "Eris is a local-first OSINT investigation engine with a defensible record. Every claim cites its source, every request lands in a ledger, every run replays.",
};

export default function Eris() {
  return (
    <div className="base">
      <div className="flex w-full py-20 md:py-40">
        <div>
          <p className="text-blue-900 pb-2">In development</p>
          <h1 className="text-zinc-900 text-4xl md:text-6xl lg:text-9xl opacity-0 animate-[fadeUp_0.5s_ease-out_forwards]">
            Eris
          </h1>
          <p className="text-xl md:text-2xl text-accent opacity-0 animate-[fadeUp_0.7s_ease-out_forwards] [animation-delay:500ms]">
            A local-first investigation engine with a defensible record.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10 md:py-20">
        <div>
          <h2 className="text-3xl md:text-6xl">What it does</h2>
          <p className="text-blue-900">Public sources in, a sourced graph out.</p>
        </div>
        <div className="text-lg leading-relaxed">
          <p className="pb-6">
            Give Eris a subject: a domain, an organization, a claim, or a person. It builds a ring
            graph of what public sources say about that subject, using deterministic passive lookups
            first and a local model to choose the next pivot and write the dossier.
          </p>
          <p className="pb-6">
            Every edge carries its source, fetch time, a hash of the raw response, a trust tier, and
            a confidence. Every external request goes through a gate and lands in a ledger. Nothing
            runs in the cloud.
          </p>
          <Link href="/blog/introducing-eris" className="bg-zinc-900 text-light w-fit p-2 hover:bg-blue-900">
            Read the announcement
          </Link>
        </div>
      </div>

      <div className="py-20 md:py-32">
        <h2 className="text-3xl md:text-6xl">What it guarantees</h2>
        <p className="pb-10">Structural properties of the engine, not policies.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {erisGuarantees.map((g) => (
            <About key={g.id} header={g.title} body={g.body} />
          ))}
        </div>
      </div>

      <div className="py-20 md:py-32">
        <h2 className="text-3xl md:text-6xl">How a case runs</h2>
        <p className="pb-10">The engine owns the plan. Each model call decides one thing.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {erisPipeline.map((s) => (
            <Step key={s.id} step={s.step} header={s.title} body={s.description} />
          ))}
        </div>
      </div>

      <div className="py-20 md:py-32">
        <h2 className="text-3xl md:text-6xl">What it is not</h2>
        <p className="pb-10">Some capabilities are left out on purpose.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {erisExclusions.map((e) => (
            <About key={e.id} header={e.title} body={e.body} />
          ))}
        </div>
      </div>

      <div className="py-20 md:py-32 max-w-3xl">
        <h2 className="text-3xl md:text-6xl">Where it stands</h2>
        <p className="text-blue-900 pb-6">Pre-alpha. Nothing here is shipped.</p>
        <p className="pb-6 text-lg leading-relaxed">
          The architecture and tool set are decided. Six keyless passive tools are built: web search,
          page fetch, DNS, RDAP, certificate transparency, and Wayback captures. The extract and
          investigate nodes are built and graded by their own test harnesses against a local model.
          The engine loop, graph store, API, and interface are next.
        </p>
        <p className="text-lg leading-relaxed">
          Eris is open-core. The Saturn trust harness underneath it is MIT-licensed. The investigation
          layer on top is proprietary.
        </p>
      </div>

      <Blurb
        header="Show your work, or it is not evidence."
        subheader="Every claim cites its edge. Every edge cites its source."
      />

      <div className="flex w-full pb-20 justify-center items-center">
        <Signup />
      </div>
    </div>
  );
}
