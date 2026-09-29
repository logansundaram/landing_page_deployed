import { code, h2, kv, note, ol, p, table, ul } from "../../docs/types";
import type { Post } from "../types";

export const saturnV2: Post = {
  slug: "saturn-v2",
  title: "saturn v2: an agent for daily life",
  date: "2026-09-28",
  summary:
    "Saturn is becoming Claude Code for daily life: a local agent you can tell everything, shape to fit you, and watch at every step. One loop replaces the plan engine.",
  blocks: [
    p(
      "Until this weekend, Saturn was built around the plan. On every turn a planner wrote out the steps, a reviewer checked them, an executor ran them, a judge graded the results, and a synthesizer wrote the answer. It all ran on your hardware and showed on your screen. That made a good demo of an agent that shows its work. It made a slow way to answer \"what's on my calendar thursday\".",
    ),
    p(
      "So we cut the engine. Saturn v2 is one loop, and it aims at a different job.",
    ),
    h2("what we measured"),
    p(
      "We traced 46 real turns. 41 of them needed a single step, and each one still paid for a plan call, an execute pass, a judge, and a synthesis. A quick path routed around the engine for the simplest requests. That left two engines to maintain and a regex choosing between them.",
    ),
    p(
      "Most of what people ask an assistant is short. An agent that thinks every request is a project is tiring to use, no matter how honest it is about its thinking.",
    ),
    h2("what saturn is now"),
    p(
      "**Saturn is Claude Code for daily life: a local companion you can hand your personal world to.**",
    ),
    p(
      "The audience is the same as Claude Code's: people who live in a terminal. The work is different. Instead of code, it's the admin of a life: \"reply to petra about thursday\", \"what did I decide about the lease\", \"rename these photos by date\", \"remind me to call the dentist when I'm home\".",
    ),
    p(
      "Running locally gives Saturn three things a cloud agent cannot promise, and the product relies on all three:",
    ),
    kv(
      [
        "you can tell it everything",
        "Your calendar, mail, notes, files, the people in your life, and what you're worried about all stay on the machine, so the agent can get to know you the way a good assistant does. Knowing you is the feature, not a privacy trade-off.",
      ],
      [
        "it is yours to shape",
        "Standing instructions, your own procedures, your own tools, and your own tone. It's the customization Claude Code gives developers, pointed at a life instead of a codebase.",
      ],
      [
        "every action is visible and gated",
        "You watch it work in the rail, every risky action asks first, every byte that leaves the machine is on the ledger, and every run can be replayed. This is what makes the first two safe to want.",
      ],
    ),
    h2("the part we lean on hardest"),
    p(
      "A cloud agent has to be careful about what you tell it. A local one does not. Saturn already keeps six memory layers in one markdown file, stamps every fact with where it came from, and withholds sensitive facts whenever inference isn't local. What it lacks is speed of learning. Right now every fact waits for you to approve it, so every session starts out knowing almost nothing about you.",
    ),
    p(
      "Fixing that is most of the next month's work. When you state a fact yourself, like \"I'm vegetarian\" or \"my lease ends in march\", it should be remembered right away with one visible line in the rail and a way to undo it. The first run should be a short interview, not a model picker. Only facts the model infers should wait for review. A web page must never be able to plant a memory; that gate stays.",
    ),
    p(
      "In one line: **the agent you can tell everything, because it keeps everything here.** Every other part of Saturn exists to make that line safe.",
    ),
    h2("one loop"),
    p(
      "The planner, plan review, rectify, replan, and synthesize nodes are gone. In their place is a four-node loop:",
    ),
    code(
      `ground → agent ─(no tool calls)─→ answer
           ↑        │ tool calls
           │        ▼
           └─ tools ← approval`,
      "the v2 loop",
    ),
    p(
      "Each pass is one native tool-calling request to the model. The first message with no tool calls is the answer. A chat question costs one model call and a lookup costs two. On the 9b tier, a calculator question takes 2 calls and 3.7 s, and a two-file comparison issues both reads in one pass.",
    ),
    p(
      "Deterministic guards replace the judge, and none of them costs a model call:",
    ),
    ul(
      "An unknown tool or malformed arguments go back to the model along with the tool's schema.",
      "A call you declined at the gate is refused if the model tries it again, and the model is told to tell you instead.",
      "The third identical call in a turn is refused, which stops the loop from stalling on one step.",
      "Past the pass cap, the model gets one last pass with no tools. It answers from what it has and says what's left undone.",
    ),
    p(
      "The plan still exists, but as a tool the model can use. On a multi-step task it writes a checklist and ticks items off, and the rail shows it. Every tool call shows a one-line result preview as it lands. Esc pauses a running turn so you can continue, steer, or abort.",
    ),
    p(
      "Thinking now adapts to the request. The first pass of every turn runs without reasoning, so easy requests never pay for it. A later pass gets a bounded thinking budget only once the turn has shown it's hard: the model reached for `plan`, a call failed or was declined, or the turn reached its third pass.",
    ),
    h2("yours to shape"),
    p(
      "`~/.saturn/SATURN.md` is loaded on every turn. It holds your standing instructions, such as \"always metric\" or \"never draft to my boss without asking\", and a folder's own file overrides it where they conflict. `!command` at the prompt runs a command in your own shell and attaches the output to your next message, so `!git diff` followed by \"summarize that\" works the way you'd expect.",
    ),
    p(
      "Next come the other Claude Code pieces, using the same file formats and vocabulary. **Skills** are markdown procedures you write once, like `/weekly-review` or `/expense`. **Script tools** are any shell or Python script with a frontmatter, and every call still goes through the gate. **Hooks** run on turn start and on writes. The plan comes back here too: written by you, once, instead of generated by the model on every turn.",
    ),
    h2("what we cut"),
    p(
      "The v2 branch so far deletes about 24,800 lines and adds about 4,700. Along with the engine, these went:",
    ),
    ul(
      "Confidence coloring and token steering. They were clever, but the loop never used them, and every call was paying for the logprobs.",
      "The Glass Box (`/trace answer`), which was built on the synthesizer's inline citations. There's no synthesizer anymore.",
      "Windows. The daily-life tools are AppleScript and notifications go through launchd, so on Windows Saturn was only a file-and-shell agent. CI now runs macOS and Linux.",
      "The cloud-provider abstraction, the qwen-only model gate, the two smallest tiers, and the planner, judge, and synthesizer model roles. Any Ollama model with native tool calling now works.",
      "The workspace manifest, the embedder in the installer, and the CPU and GPU gauges on the status bar.",
    ),
    p(
      "**The trust stack stayed:** the gate, the egress ledger, the air-gap, quarantine of untrusted content, the trace database and replay, and gated memory. We cut features that existed to impress an auditor, not the ones that make it safe to hand Saturn your life.",
    ),
    h2("how we decide now"),
    p("Every change has to pass two tests:"),
    ol(
      "**Would a person hand this to Saturn on a Tuesday?** If a feature doesn't make some concrete daily request possible or faster, it waits.",
      "**Does it cost the chat turn anything?** A chat question is one call. Every addition states what it costs on that path, and a safeguard that can't fire there must cost nothing.",
    ),
    h2("where we are"),
    note(
      "v2 isn't released yet. It lives on the `v2` branch, and the installer still ships the plan engine. The site's docs describe the v1 engine until then.",
      "warn",
    ),
    table(
      ["work", "status"],
      ["one loop, plan as a tool, result previews, esc to pause", "built"],
      ["adaptive thinking", "built"],
      ["global `SATURN.md`, `!command`, a shorter `/help`", "built"],
      ["gate, ledger, air-gap, quarantine, trace, replay", "carried over from v1"],
      ["work in whatever folder you launch from", "next"],
      ["read the PDFs and .docx files people actually have", "next"],
      ["contacts and reminders as native tools", "next"],
      ["remember what you say without an approval click", "next"],
      ["a first-run interview and a launch brief", "planned"],
      ["skills, script tools, hooks", "planned"],
      ["a gated `send_mail`", "last, after the rest"],
    ),
    p(
      "The first two \"next\" items matter most. Today the file tools are confined to Saturn's workspace directory and read UTF-8 text only, so \"summarize the PDF on my desktop\" fails before the model is ever asked. That's the most important everyday thing Claude Code can do that Saturn can't yet.",
    ),
    note(
      "[Eris](/blog/introducing-eris) is unaffected. It builds on the Saturn harness, which is the part that stayed. Eris also keeps an engine-owned plan on purpose: an investigation needs one, and a Tuesday errand doesn't.",
    ),
  ],
};
