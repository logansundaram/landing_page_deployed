export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  subtitle: string;
  date: string; // ISO date, YYYY-MM-DD
  summary: string;
  body: PostBlock[];
}

export const posts: Post[] = [
  {
    slug: "introducing-eris",
    title: "Introducing Eris",
    subtitle: "A local-first investigation engine with a defensible record.",
    date: "2026-09-26",
    summary:
      "Eris is the first product we are building on Saturday.ai. Give it a subject and it builds a graph of what public sources say, with every claim tied to the source that produced it and every request written to a ledger.",
    body: [
      {
        type: "p",
        text: "Since early September we have been building Eris, an open-source-intelligence (OSINT) investigation engine that runs entirely on your machine. You give it a subject: a domain, an organization, a claim, or a person. It builds a ring graph of what public sources say about that subject, using deterministic passive lookups first and a local model to choose where to pivot next and to write the dossier at the end.",
      },
      {
        type: "p",
        text: "Every edge in that graph carries its source, the time it was fetched, a hash of the raw response, a trust tier, and a confidence. Every external request goes through a gate and lands in a ledger. Every run can be replayed and will draw the same picture.",
      },
      { type: "h2", text: "Why we are building it" },
      {
        type: "p",
        text: "Investigation tooling answers to an auditor, a privacy office, or a court. The property that matters is not how much you can collect. Licensed-feed vendors will always win that. It is whether you can show exactly what the analyst did, what each claim rests on, and what left the machine.",
      },
      {
        type: "p",
        text: "Most agentic tools cannot answer those questions. They send your query to a cloud model, hide the intermediate steps, and hand back prose with no way to trace a sentence to a source. Eris is built so that it always can. This is the same conviction behind Saturday.ai as a whole: local-first, transparent, and under the user's control.",
      },
      { type: "h2", text: "What Eris guarantees" },
      {
        type: "p",
        text: "These are structural properties of the system, not policies. They hold because of how the engine is built, not because a prompt asks nicely.",
      },
      {
        type: "ul",
        items: [
          "Nothing goes to an AI vendor. Inference runs locally on llama.cpp. There is no telemetry and no cloud sync of investigations.",
          "Nothing leaves except what the ledger shows. Targets see fetches, so the egress ledger records every one.",
          "Provenance is born with the edge. Every tool returns its source, fetch time, and a hash of the raw response. A claim without a primary source is marked, never dropped silently.",
          "The model never merges identities. Person-identity merges are proposed with evidence and approved by the analyst at a gate. The decision is recorded.",
          "Untrusted by construction. Page content and DNS records can carry prompt injection, so extracted text never enters the planner. A quarantined extractor returns typed facts with locators, and only those are used.",
        ],
      },
      { type: "h2", text: "How a case runs" },
      {
        type: "p",
        text: "A case moves through intake, a seed batch, a pivot loop, analysis, and a dossier. Most of those stages are plain code. A model call only happens where a judgment is needed, and each call decides exactly one thing.",
      },
      {
        type: "p",
        text: "That split comes from the literature. A roughly 27B local model is at parity with frontier models on single tool calls and multi-source synthesis, but scores zero on long-horizon planning under persistent constraints. So the engine owns the plan. Hop budgets, the frontier, and stop conditions are enforced in code. The graph is the memory, and the model reaches it through a query tool rather than pasted edges. Every candidate pivot is counted before it is expanded, so a value shared by one host is nothing to pivot on and a value shared by thousands is commodity noise.",
      },
      { type: "h2", text: "What Eris is not" },
      {
        type: "ul",
        items: [
          "Not a data broker. No central database of people exists to breach or subpoena.",
          "Not a screening tool. Use for employment, tenancy, credit, or insurance decisions is prohibited.",
          "Not an active scanner. Port scanning, subdomain brute force, and credential probing are not gated. They do not exist in the tool registry at all.",
        ],
      },
      { type: "h2", text: "Where we are" },
      {
        type: "p",
        text: "Eris is pre-alpha. The architecture and tool set are decided. Six keyless passive tools are built: web search, page fetch, DNS, RDAP, certificate transparency, and Wayback captures. The extract and investigate nodes are built and graded by their own test harnesses against a local Qwen3.5-9B model. They are not yet wired into a loop, and the graph store, API, and interface do not exist yet.",
      },
      {
        type: "p",
        text: "Next up: serving a 27B model and re-running the harnesses to separate model failures from structural ones, then building the engine loop, the intake and judge nodes, the event contract between backend and frontend, and finally the canvas that shows a run as it happens.",
      },
      { type: "h2", text: "Built on Saturn" },
      {
        type: "p",
        text: "Eris is open-core. The Saturn trust harness underneath it, which provides the trace, the egress ledger, replay, and quarantine, is MIT-licensed so the trust properties stay inspectable by anyone. The investigation layer on top, which holds the collection strategies, the pivot gate, entity resolution, and the dossier, is proprietary.",
      },
      { type: "h2", text: "The name" },
      {
        type: "p",
        text: "Eris is the goddess of strife, and the dwarf planet whose discovery forced astronomers to define what a planet is. It follows the same deity-and-body pattern as Saturn.",
      },
      {
        type: "p",
        text: "If this is the kind of tool you have been waiting for, join early access on the home page and we will write again when there is something to run.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
