import Chapter from "./chapter";
import { CaptureFigure, LoopRail, RecordedAnswer } from "./capture";
import { capture } from "../lib/runs/run-gate";

/* Run #6: the model reached for write_file, the gate said no, nothing was
   written. Every line below is from the run's export record. */
export default function GateChapter() {
  const gate = capture.rows.find((r) => r.kind === "gate");
  const denied = gate?.kind === "gate" ? gate.calls[0].name : "write_file";
  const prompted = gate?.kind === "gate" ? gate.calls.length : 0;
  const approved =
    gate?.kind === "gate" ? gate.calls.filter((c) => c.approved).length : 0;
  return (
    <Chapter n="02" label="the gate" title="it asks first.">
      <CaptureFigure
        caption={`fig. 02 — run #${capture.id}, ${capture.model}, ${capture.date}. the gate denied ${denied}; notes.md was never written. headless runs deny by default.`}
      >
        <div className="text-[13px] leading-relaxed">
          <p className="whitespace-pre-wrap">
            <span className="text-accent">»</span>{" "}
            <span className="text-fg">{capture.query}</span>
          </p>

          <div className="my-6">
            <LoopRail rows={capture.rows} />
          </div>

          <RecordedAnswer text={capture.response} />

          <p className="type-micro mt-6 lowercase text-faint">
            gates prompted {prompted} · approved {approved} · run #{capture.id}{" "}
            · {capture.model}
          </p>
        </div>
      </CaptureFigure>

      <p className="mt-10 max-w-2xl leading-relaxed text-muted">
        Every call that changes or sends something stops at the gate with the
        real artifact on screen: the diff, the full command, the number and
        the exact text of a message. Enter rejects, and an always-allow answer
        lasts for the turn, not forever. A text message asks every time — no
        setting skips it. Headless runs deny by default;{" "}
        <code className="text-fg">--yolo</code> opens the gate, and that
        choice is on the record too.
      </p>
    </Chapter>
  );
}
