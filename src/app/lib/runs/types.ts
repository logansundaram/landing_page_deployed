/* Shapes of the sanitized capture data derived from real saturn runs by
   scripts/run-to-capture.mjs. */

/** One stretch of answer text at a confidence level. 0 = certain (default
    text voice), 1–4 climb the ramp toward uncertain. */
export type CaptureSpan = { text: string; level: 0 | 1 | 2 | 3 | 4 };

export type CaptureNode = {
  node: string;
  model: string;
  durS: number;
  promptTokens: number;
  outputTokens: number;
};

export type CapturePlanStep = {
  label: string;
  status: string;
  intendedTool: string | null;
};

export type CaptureGate = {
  step: string;
  decision: string;
  calls: { name: string; approved: boolean }[];
};

export type CaptureRun = {
  id: number;
  date: string | null;
  model: string | null;
  saturnVersion: string | null;
  query: string;
  status: string;
  nodes: CaptureNode[];
  plan: CapturePlanStep[];
  gates: CaptureGate[];
  metrics: {
    contextTokens: number | null;
    tokPerSec: number | null;
    durationS: number | null;
  };
  answer: CaptureSpan[] | null;
  response: string;
};
