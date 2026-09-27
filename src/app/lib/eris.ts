/* Eris — the investigation engine in development on the Saturn harness.
   Everything here is sourced from the eris repo README; status values are
   honest and should be updated as nodes land. */

export const eris = {
  name: "Eris",
  tagline: "a local-first investigation engine with a defensible record",
  status: "pre-alpha",
  announcement: "/blog/introducing-eris",
} as const;

/* Rendered like the Saturn policy file: key = value, then the rule. */
export const erisPolicy = [
  {
    key: "ai_vendor",
    value: "none",
    body: "Inference runs locally on llama.cpp. No telemetry, no cloud sync of investigations. Structural, not policy.",
  },
  {
    key: "egress",
    value: "ledgered",
    body: "Targets see fetches, so the egress ledger records every one. SOCKS proxy support is in config for managed-attribution setups.",
  },
  {
    key: "provenance",
    value: "per_edge",
    body: "Every tool returns its source, fetch time, and a hash of the raw response. A claim without a primary source is marked, not dropped.",
  },
  {
    key: "identity_merge",
    value: "analyst_gate",
    body: "The model never merges identities. Merges are proposed with evidence, approved at the gate, and the decision is recorded.",
  },
  {
    key: "fetched_text",
    value: "quarantined",
    body: "Page content and DNS records can carry injection. A quarantined extractor returns typed facts with locators; only those reach the planner.",
  },
  {
    key: "runs",
    value: "replayable",
    body: "A full run re-executes from its checkpoints and draws the same graph. Layout is deterministic for this reason.",
  },
];

export type NodeStatus = "built" | "poc" | "planned" | "later";

/* The pipeline as it stands in the repo — kind and status per node. */
export const erisPipeline: {
  stage: string;
  node: string;
  kind: "code" | "model" | "mixed";
  status: NodeStatus;
  does: string;
}[] = [
  {
    stage: "intake",
    node: "intake",
    kind: "model",
    status: "planned",
    does: "rewrites the ask into a neutral key question, sub-questions, and hypotheses; the analyst approves the plan before any lookup.",
  },
  {
    stage: "collect",
    node: "seed",
    kind: "code",
    status: "planned",
    does: "first-hop fan-out as one planned batch, no model in the loop.",
  },
  {
    stage: "collect",
    node: "execute",
    kind: "code",
    status: "poc",
    does: "runs tool calls in parallel; every call logged to the ledger.",
  },
  {
    stage: "collect",
    node: "extract",
    kind: "model",
    status: "built",
    does: "quarantined reader: tool results → typed leads with source and relation, no tools.",
  },
  {
    stage: "collect",
    node: "judge",
    kind: "model",
    status: "planned",
    does: "keep/drop pass on each lead against its evidence; quotes re-located in stored text or rejected.",
  },
  {
    stage: "collect",
    node: "frontier gate",
    kind: "code",
    status: "planned",
    does: "dedupe, count-before-expand, denylists, sensitive categories to a hold queue, beam/depth budget, stop rule.",
  },
  {
    stage: "collect",
    node: "investigate",
    kind: "model",
    status: "built",
    does: "one lead in focus → parallel searches that test the connection and check claims against records.",
  },
  {
    stage: "analyze",
    node: "merge",
    kind: "model",
    status: "planned",
    does: "listwise identity proposals with a scorecard; disconfirmation searches first; the analyst approves at the gate.",
  },
  {
    stage: "analyze",
    node: "red flags",
    kind: "code",
    status: "planned",
    does: "rule engine over the graph: address and officer counts, cycles, lifespan, bursts, OFAC 50%.",
  },
  {
    stage: "report",
    node: "critic",
    kind: "model",
    status: "planned",
    does: "devil's advocacy and premortem on key judgments only.",
  },
  {
    stage: "report",
    node: "dossier",
    kind: "mixed",
    status: "planned",
    does: "renders the report; methodology and negative results come from the ledger; a linter enforces ICD 203 language.",
  },
];

export const erisExclusions = [
  {
    k: "not a data broker",
    v: "no central database of people exists to breach or subpoena.",
  },
  {
    k: "not a screening tool",
    v: "use for employment, tenancy, credit, or insurance decisions is prohibited.",
  },
  {
    k: "not an active scanner",
    v: "port scans, subdomain brute force, and credential probing are absent from the tool registry — not gated, absent.",
  },
];

export const erisBuilt = [
  "web_search",
  "fetch_page",
  "dns_lookup",
  "rdap_lookup",
  "crt_sh",
  "wayback_captures",
];

export const erisNext = [
  "serve a 27b model; re-run both harnesses to separate model-floor failures from structural ones.",
  "the engine loop: engine-owned state and the frontier gate, seed → execute → extract → gate → investigate.",
  "intake in front of the loop; judge after extract.",
  "the contract: event models and the graph schema with provenance columns; generated ts types.",
  "canvas fed by a real run, then the gate modal, then the dossier view.",
];
