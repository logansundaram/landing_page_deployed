import Link from "next/link";
import Chapter from "./chapter";
import Button from "./button";
import { eris } from "../lib/eris";

/* What Eris adds on top of the harness — three readouts, in the TUI's
   own colors, the way the capabilities table reads. */
const rows = [
  {
    tag: "input",
    readout: "domain · org · claim · person",
    body: "one subject in. deterministic passive lookups first; a local model chooses the pivots.",
  },
  {
    tag: "output",
    readout: (
      <>
        ring graph · dossier · <span className="text-ok">replayable</span>
      </>
    ),
    body: "every edge carries source, fetch time, hash, trust tier, and confidence. every claim in the dossier cites one.",
  },
  {
    tag: "egress",
    readout: (
      <>
        ledgered · ai vendor <span className="text-ok">none</span>
      </>
    ),
    body: "inference on llama.cpp on your machine. every outbound request lands in the ledger; identity merges wait at the gate.",
  },
];

export default function ErisChapter() {
  return (
    <Chapter
      n="05"
      label="next on the harness"
      title={
        <>
          <span className="block font-normal">eris.</span>
          <span className="block">an investigation engine.</span>
        </>
      }
    >
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        The same trust harness, pointed at open-source intelligence. Eris
        builds a graph of what public sources say about a subject, with a
        defensible record of how it got there. {eris.status}: nothing shipped
        yet, and the status page says exactly what is built.
      </p>

      <div className="mt-10 border-y border-edge">
        {rows.map((r) => (
          <div
            key={r.tag}
            className="grid gap-x-8 gap-y-2 border-b border-edge py-5 t-colors last:border-b-0 hover:bg-panel md:grid-cols-[90px_minmax(0,320px)_1fr] md:items-baseline"
          >
            <p className="type-micro lowercase text-faint">{r.tag}</p>
            <p className="type-micro truncate text-muted">{r.readout}</p>
            <p className="max-w-xl text-sm lowercase leading-relaxed text-muted">
              {r.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/eris">what eris is</Button>
        <Link
          href={eris.announcement}
          className="group inline-flex h-11 items-center gap-2 px-3 text-sm lowercase text-fg t-colors hover:text-accent"
        >
          <span aria-hidden className="text-faint t-colors group-hover:text-accent">
            [
          </span>
          read the announcement
          <span aria-hidden className="text-faint t-colors group-hover:text-accent">
            ]
          </span>
        </Link>
      </div>
    </Chapter>
  );
}
