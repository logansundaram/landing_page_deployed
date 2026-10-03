/* Shapes of the sanitized capture data derived from real saturn runs by
   scripts/run-to-capture.mjs. */

/** One row of the loop as the rail prints it. */
export type CaptureRow =
  | {
      kind: "agent";
      iter: number;
      durS: number | null;
      contextTokens: number;
      tokPerSec: number;
      /** Tools the pass called; null when the pass was the answer. */
      calls: string[] | null;
    }
  | { kind: "tool"; call: string; result: string; ok: boolean }
  | {
      kind: "gate";
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
  rows: CaptureRow[];
  metrics: {
    contextTokens: number | null;
    tokPerSec: number | null;
    durationS: number | null;
  };
  response: string;
};
