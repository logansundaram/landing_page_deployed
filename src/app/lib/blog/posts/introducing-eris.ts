import { h2, kv, note, ol, p, ul } from "../../docs/types";
import type { Post } from "../types";

export const introducingEris: Post = {
  slug: "introducing-eris",
  title: "introducing eris",
  date: "2026-09-26",
  summary:
    "A local-first OSINT investigation engine built on Saturn. Every claim cites its source, every request lands in a ledger, every run replays.",
  blocks: [
    p(
      "Since early September we have been building Eris, an open-source-intelligence (OSINT) investigation engine that runs entirely on your machine. You give it a subject — a domain, an organization, a claim, or a person — and it builds a ring graph of what public sources say about that subject, using deterministic passive lookups first and a local model to choose the next pivot and write the dossier at the end.",
    ),
    p(
      "Every edge in that graph carries its source, the time it was fetched, a hash of the raw response, a trust tier, and a confidence. Every external request goes through a gate and lands in a ledger. Every run can be replayed and will draw the same picture. Eris is built on the same [Saturn](/) trust harness that powers our terminal agent, so the trace, the egress ledger, replay, and quarantine are already there.",
    ),
    h2("why we are building it"),
    p(
      "Investigation tooling answers to an auditor, a privacy office, or a court. The property that matters is not how much you can collect — licensed-feed vendors will always win that. It is whether you can show exactly what the analyst did, what each claim rests on, and what left the machine.",
    ),
    p(
      "Most agentic tools cannot answer those questions. They send your query to a cloud model, hide the intermediate steps, and hand back prose with no way to trace a sentence to a source. Eris is built so that it always can.",
    ),
    h2("what it guarantees"),
    p(
      "These hold because of how the engine is built, not because a prompt asks nicely.",
    ),
    kv(
      [
        "nothing goes to an ai vendor",
        "Inference runs locally on llama.cpp. There is no telemetry and no cloud sync of investigations.",
      ],
      [
        "nothing leaves except what the ledger shows",
        "Targets see fetches, so the egress ledger records every one.",
      ],
      [
        "provenance is born with the edge",
        "Every tool returns its source, fetch time, and a hash of the raw response. A claim without a primary source is marked, never dropped silently.",
      ],
      [
        "the model never merges identities",
        "Person-identity merges are proposed with evidence and approved by the analyst at a gate. The decision is recorded.",
      ],
      [
        "untrusted by construction",
        "Page content and DNS records can carry prompt injection, so extracted text never enters the planner. A quarantined extractor returns typed facts with locators, and only those are used.",
      ],
    ),
    h2("how a case runs"),
    p(
      "A case moves through intake, a seed batch, a pivot loop, analysis, and a dossier. Most stages are plain code. A model call only happens where a judgment is needed, and each call decides exactly one thing.",
    ),
    p(
      "That split comes from the literature. A roughly 27B local model is at parity with frontier models on single tool calls and multi-source synthesis, but scores zero on long-horizon planning under persistent constraints. So the engine owns the plan: hop budgets, the frontier, and stop conditions are enforced in code. The graph is the memory, and the model reaches it through a query tool rather than pasted edges. Every candidate pivot is counted before it is expanded — a value shared by one host is nothing to pivot on, and a value shared by thousands is commodity noise.",
    ),
    ol(
      "**intake** rewrites the ask into a neutral key question, sub-questions, and hypotheses. The analyst approves the collection plan before any lookup.",
      "**seed** fans the first hop out as one planned batch of passive lookups, with no model in the loop.",
      "**extract** is a quarantined reader: tool results in, typed leads with source and relation out, no tools.",
      "**frontier gate** dedupes, counts before expanding, applies denylists, and enforces the beam and depth budget — in code.",
      "**investigate** takes one lead in focus and runs the parallel searches that test the connection.",
      "**merge** and **red flags** propose identity merges and rule-engine findings with evidence, held for the analyst.",
      "**dossier** renders the document an analyst hands to someone. Every claim cites its edge; every edge cites its source and hash.",
    ),
    h2("what eris is not"),
    ul(
      "Not a data broker. No central database of people exists to breach or subpoena.",
      "Not a screening tool. Use for employment, tenancy, credit, or insurance decisions is prohibited.",
      "Not an active scanner. Port scanning, subdomain brute force, and credential probing are not gated — they do not exist in the tool registry at all.",
    ),
    h2("where we are"),
    p(
      "Eris is pre-alpha. The architecture and tool set are decided. Six keyless passive tools are built: `web_search`, `fetch_page`, `dns_lookup`, `rdap_lookup`, `crt_sh`, and `wayback_captures`. The `extract` and `investigate` nodes are built and graded by their own harnesses against a local Qwen3.5-9B. They are not yet wired into a loop, and the graph store, API, and interface do not exist yet.",
    ),
    p("Next, in order:"),
    ol(
      "Serve a 27B model and re-run both harnesses to separate model-floor failures from structural ones.",
      "Build the engine loop: engine-owned state and the frontier gate, connecting seed → execute → extract → gate → investigate.",
      "Put `intake` in front of the loop and `judge` after `extract`.",
      "Commit the contract: event models and the graph schema with provenance columns, plus generated TypeScript types.",
      "Build the canvas from a real run, then the gate modal, then the dossier view.",
    ),
    note(
      "Eris is open-core. The Saturn harness underneath — trace, egress ledger, replay, quarantine — is MIT so the trust properties stay inspectable. The investigation layer on top is proprietary.",
    ),
    h2("the name"),
    p(
      "Eris is the goddess of strife, and the dwarf planet whose discovery forced astronomers to define what a planet is. Same deity-and-body pattern as Saturn.",
    ),
    p(
      "There is nothing to install yet. Follow the [eris page](/eris) for status; we will write again when there is something to run.",
    ),
  ],
};
