export const erisGuarantees = [
  {
    id: "local",
    title: "Nothing goes to an AI vendor",
    body: "Inference runs locally on llama.cpp. No telemetry, no cloud sync of investigations.",
  },
  {
    id: "ledger",
    title: "Nothing leaves except what the ledger shows",
    body: "Every outbound request is recorded. Targets see fetches, so the egress ledger sees them too.",
  },
  {
    id: "provenance",
    title: "Provenance is born with the edge",
    body: "Every tool returns its source, fetch time, and a hash of the raw response. Unsourced claims are marked, not dropped.",
  },
  {
    id: "merge",
    title: "The model never merges identities",
    body: "Identity merges are proposed with evidence and approved by the analyst at a gate. The decision is recorded.",
  },
  {
    id: "quarantine",
    title: "Untrusted by construction",
    body: "Fetched text never enters the planner. A quarantined extractor returns typed facts with locators, and only those are used.",
  },
  {
    id: "replay",
    title: "Every run is replayable",
    body: "A full run re-executes from its checkpoints and draws the same graph. Layout is deterministic for this reason.",
  },
];

export const erisPipeline = [
  {
    id: "intake",
    step: "01",
    title: "Intake",
    description:
      "The ask is rewritten into a neutral key question, sub-questions, and hypotheses. The analyst approves the collection plan before any lookup.",
  },
  {
    id: "seed",
    step: "02",
    title: "Seed",
    description:
      "The first hop fans out as one planned batch of passive lookups, with no model in the loop.",
  },
  {
    id: "pivot",
    step: "03",
    title: "Pivot",
    description:
      "A quarantined reader turns results into typed leads. A frontier gate in code counts, dedupes, and budgets them. The model picks one lead at a time to investigate.",
  },
  {
    id: "analyze",
    step: "04",
    title: "Analyze",
    description:
      "Corroboration counts independent roots, not URLs. Identity merges and red flags are proposed with evidence and held for the analyst.",
  },
  {
    id: "dossier",
    step: "05",
    title: "Dossier",
    description:
      "The document an analyst hands to someone. Every claim cites its edge, and every edge cites its source and hash. Negative results come from the ledger.",
  },
];

export const erisExclusions = [
  {
    id: "broker",
    title: "Not a data broker",
    body: "No central database of people exists to breach or subpoena.",
  },
  {
    id: "screening",
    title: "Not a screening tool",
    body: "Use for employment, tenancy, credit, or insurance decisions is prohibited.",
  },
  {
    id: "scanner",
    title: "Not an active scanner",
    body: "Port scans, brute force, and credential probing are absent from the tool registry, not gated.",
  },
];
