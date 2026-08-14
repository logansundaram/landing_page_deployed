import Chapter from "./chapter";
import { AnswerSpans, CaptureFigure } from "./capture";
import { capture } from "../lib/runs/run-gate";

/* Run #155: the model planned write_file, the gate said no, nothing ran.
   Every line below is from the run's export record. */
export default function GateChapter() {
  const gate = capture.gates[0];
  const step = capture.plan[0];
  const planNode = capture.nodes.find((n) => n.node === "plan");
  const synthNode = capture.nodes.find((n) => n.node === "synthesize");

  return (
    <Chapter n="02" label="the gate">
      <CaptureFigure
        caption={`fig. 02 — run #${capture.id}, ${capture.date}. the gate denied ${gate.calls[0].name}; hello.txt was never written. headless runs deny by default.`}
      >
        <div className="text-[13px] leading-relaxed">
          <p className="whitespace-pre-wrap">
            <span className="text-prompt">»</span>{" "}
            <span className="text-fg">{capture.query}</span>
          </p>

          <div className="my-6">
            <div className="whitespace-pre py-0.5">
              <span className="text-gate-ok">✓</span>{" "}
              <span className="text-fg">plan</span>
              <span className="text-muted">
                {"        "}
                {planNode?.durS.toFixed(1)}s
              </span>
              <span className="text-faint">
                {"   "}step 1 → {step.intendedTool}
              </span>
            </div>
            <div className="whitespace-pre py-0.5">
              <span className="text-gate-ask">■</span>{" "}
              <span className="text-fg">gate</span>
              <span className="text-muted">
                {"        "}
                {gate.calls[0].name} —{" "}
              </span>
              <span className="font-bold text-gate-deny">denied</span>
              <span className="text-faint"> (headless default)</span>
            </div>
            <div className="whitespace-pre py-0.5">
              <span className="text-faint">–</span>{" "}
              <span className="text-muted">step 1</span>
              <span className="text-faint">
                {"      "}
                {step.status}. nothing ran.
              </span>
            </div>
            <div className="whitespace-pre py-0.5">
              <span className="text-gate-ok">✓</span>{" "}
              <span className="text-fg">synthesize</span>
              <span className="text-muted">
                {"  "}
                {synthNode?.durS.toFixed(1)}s
              </span>
            </div>
          </div>

          <p className="max-w-2xl whitespace-pre-wrap text-muted">
            {capture.answer && <AnswerSpans spans={capture.answer} />}
          </p>

          <p className="type-micro mt-6 lowercase text-faint">
            gates prompted 1 · approved 0 · run #{capture.id} · {capture.model}
          </p>
        </div>
      </CaptureFigure>

      <p className="mt-10 max-w-2xl leading-relaxed text-muted">
        Every side-effecting tool call stops at the gate. In the TUI you
        approve, deny, or read the diff first. Headless runs deny by default —{" "}
        <code className="text-fg">--yolo</code> opens the gate, and that choice
        is on the record too.
      </p>
    </Chapter>
  );
}
