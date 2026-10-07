import Link from "next/link";
import type { ReactNode } from "react";
import Chapter from "./chapter";

/* Each capability leads with a readout of what that feature actually prints
   in the TUI — not an icon. Vignette colors are the TUI's own: cyan
   prompt/hints, ok green, hot for gated calls and pegged gauges. */
const capabilities: {
  tag: string;
  vignette: ReactNode;
  title: string;
  body: string;
}[] = [
  {
    tag: "llm",
    vignette: (
      <>
        qwen3.5:9b · <span className="text-ok">loaded</span> · cloud{" "}
        <span className="text-ok">0</span>
      </>
    ),
    title: "local models, sized to your mac",
    body: "Open models through Ollama on your own hardware. /models reads your chip, its memory, and its bandwidth, then recommends the largest model that fits and still runs at a usable speed. No API key anywhere in the product.",
  },
  {
    tag: "mac",
    vignette: (
      <>
        create_reminder <span className="text-faint">·</span> tomorrow 9:00{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-ok">your phone</span>
      </>
    ),
    title: "your mac, through its own apps",
    body: "Notes, Calendar, Mail, Contacts, Reminders, Messages, and Shortcuts, plus the page in your browser and the files selected in Finder. Everything goes through the app itself, so what Saturn does shows up where you'd look. Mail is drafted, never sent, and /tools off turns off any app you don't want it near.",
  },
  {
    tag: "loop",
    vignette: (
      <>
        <span className="text-ok">✓</span> read_file{" "}
        <span className="text-faint">·</span>{" "}
        <span className="text-ok">✓</span> calculate{" "}
        <span className="text-faint">·</span>{" "}
        <span className="text-accent">▸</span> answer
      </>
    ),
    title: "pause, steer & think",
    body: "One loop, every pass on screen. Press Esc to pause a running turn: continue, type a correction to steer it, or abort. On a multi-step errand the agent keeps a checklist you can watch in the rail. Saturn thinks before it calls a tool and never before a plain answer; the status bar times each thought, Esc stops it, and /think sets fast, auto, or deep.",
  },
  {
    tag: "gates",
    vignette: (
      <>
        send_message <span className="text-faint">→</span>{" "}
        <span className="text-hot">always asks</span> ·{" "}
        <span className="text-fg">y / N</span>
      </>
    ),
    title: "tool approval gates",
    body: "Every write, command, and send stops with the real diff, the full command, or the recipient and exact text on screen. Enter rejects. A text message asks every time, and a number the model made up is refused before you're asked.",
  },
  {
    tag: "answers",
    vignette: (
      <>
        [1] read_file <span className="text-faint">·</span> [2] calculate{" "}
        <span className="text-faint">·</span> <span className="text-ok">0</span>{" "}
        failed
      </>
    ),
    title: "answers you can check",
    body: "An answer that used tools ends with the exact calls and documents behind it, and /trace source shows the full material. Failed and declined calls are listed under the answer. Arithmetic and dates are computed, never guessed.",
  },
  {
    tag: "trust",
    vignette: (
      <>
        <span className="text-ramp-1">⇅</span> 2 sends · 18 kB{" "}
        <span className="text-faint">→</span> duckduckgo.com
      </>
    ),
    title: "egress ledger & air gap",
    body: "Every byte that leaves is recorded by host and channel and printed under the answer; /policy airgap seals the boundary. Web pages, mail, and files are quarantined against prompt injection, and a web address the model composed after reading outside content waits for your OK.",
  },
  {
    tag: "files",
    vignette: (
      <>
        delete_file <span className="text-faint">→</span> trash ·{" "}
        <span className="text-ok">/undo</span>
      </>
    ),
    title: "files & documents",
    body: "Saturn works in the folder you launch it from and reads PDF, Word, and Excel. Every write is snapshotted for /undo, and a delete goes to the Trash. Ask it to add a file to your local knowledge base and it asks first, every time. SATURN.md holds your standing instructions.",
  },
  {
    tag: "memory",
    vignette: (
      <>
        remembered #12 <span className="text-faint">·</span> you said it ·{" "}
        <span className="text-ok">/memory remove 12</span>
      </>
    ),
    title: "memory that only takes your word",
    body: "Say \"I'm vegetarian\" and Saturn keeps it without a prompt, with one line after the answer and the command that undoes it. That happens only when the fact's words come from a sentence you typed and nothing from a web page, mail, or file has entered the conversation; anything else asks first. The first launch offers three quick questions so it knows who you are from the start. Secrets are refused, and a fact that may contradict an older one says so.",
  },
  {
    tag: "skills",
    vignette: (
      <>
        /weekly-review <span className="text-faint">·</span> create_skill{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-hot">always asks</span>
      </>
    ),
    title: "skills",
    body: "Write a procedure once as a markdown file and run it by typing its name. Saturn can draft one for you, and it shows you every line before it saves. That prompt appears whatever your policy says.",
  },
  {
    tag: "mcp",
    vignette: (
      <>
        mcp_github_* · 12 tools ·{" "}
        <span className="text-hot">destructive</span>
      </>
    ),
    title: "mcp servers",
    body: "Connect any Model Context Protocol server from config.yaml. Its tools face the same gate as everything else and never self-declare their risk tier.",
  },
  {
    tag: "trace",
    vignette: (
      <>
        run_6.json <span className="text-faint">→</span> --replay ·{" "}
        <span className="text-ok">offline</span>
      </>
    ),
    title: "replayable runs",
    body: "Every run drills down to its model passes, tool I/O, and gate decisions. Export it as JSON and replay it anywhere with saturn --replay — no database needed.",
  },
  {
    tag: "cli",
    vignette: (
      <>
        saturn -q <span className="text-faint">{'"…"'}</span> · gate{" "}
        <span className="text-hot">deny</span> · exported{" "}
        <span className="text-ok">✓</span>
      </>
    ),
    title: "headless & pipes",
    body: "-p and -q run one turn for scripts and pipes; gated tools deny by default and a send is refused outright; --json for machines; the run auto-exports so the receipt names a command that replays it.",
  },
];

export default function CapabilitiesChapter() {
  return (
    <Chapter n="04" label="capabilities" title="what it does.">
      {/* Dense spec table — hairline rows, no cards */}
      <div className="border-y border-edge">
        {capabilities.map((c) => (
          <div
            key={c.tag}
            className="grid gap-x-8 gap-y-2 border-b border-edge py-5 t-colors hover:bg-panel md:grid-cols-[90px_minmax(0,320px)_1fr] md:items-baseline"
          >
            <p className="type-micro lowercase text-faint">{c.tag}</p>
            {/* Readouts keep their true case — [y/N] means default-No */}
            <p className="type-micro truncate text-muted">{c.vignette}</p>
            <div>
              <p className="text-sm font-bold lowercase text-fg">{c.title}</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                {c.body}
              </p>
            </div>
          </div>
        ))}
        <Link
          href="/docs"
          className="group grid gap-x-8 py-5 t-colors hover:bg-panel md:grid-cols-[90px_minmax(0,320px)_1fr] md:items-baseline"
        >
          <p className="type-micro lowercase text-faint">$</p>
          <p className="type-micro lowercase text-muted">man saturn</p>
          <p className="text-sm lowercase text-muted t-colors group-hover:text-fg">
            the full tool and workflow reference lives in the docs →
          </p>
        </Link>
      </div>
    </Chapter>
  );
}
