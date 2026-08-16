import { type DocPage, code, h2, kv, note, ol, p, table, ul } from "../types";

export const introduction: DocPage = {
  slug: "introduction",
  title: "introduction",
  summary:
    "What Saturn is, the two guarantees it is built around, and how a turn flows through the engine.",
  group: "getting started",
  blocks: [
    p(
      "Saturn is a private, local-first AI agent that runs in your terminal. It plans its work in the open, calls tools to search the web, read and write your files, query your own documents, run commands, and remember things across sessions — and it shows you every step it takes, pausing for your approval before anything touches the outside world.",
    ),
    p(
      "Inference runs entirely on local models through [Ollama](https://ollama.com). No API key is required for anything: web search is keyless, page extraction is local, and there is no telemetry. Saturn is built by Saturday.ai and released under the MIT license.",
    ),
    h2("two guarantees"),
    kv(
      [
        "nothing leaves your machine",
        "Local models by default, zero required keys, zero telemetry. The only ways anything can leave are a web search query, a page fetch, and the MCP servers you configured — and every exit is recorded in an egress ledger you can read (`/privacy egress`) or seal (`/privacy airgap`).",
      ],
      [
        "nothing happens without you",
        "The plan is a live, editable object you can pause, steer, and rewrite mid-run. Every side effect stops at an approval gate that shows the real artifact of the decision — the full shell command, a colored diff of the proposed write. Every run can be replayed afterward (`/trace`), and file changes reversed (`/undo`).",
      ],
    ),
    h2("how a turn works"),
    p("Every turn flows through a graph of small, inspectable steps:"),
    code(
      "ground → plan → [review?] → agent → [approval?] → tools → update plan → … → synthesize",
      "the engine loop",
    ),
    ul(
      "**ground** loads your profile, memory, and document/workspace manifests.",
      "**plan** drafts a step-by-step plan — the transparency surface you can inspect and edit.",
      "**agent** picks the next tool to call (or finishes) against a curated per-step context.",
      "**approval** pauses for your OK before anything side-effecting runs.",
      "**tools** run; results flow back so the agent can decide what's next. A judge reviews each step's outcome and can revise the remaining plan, bounded by iteration and replan budgets.",
      "**synthesize** writes the final answer from what was actually gathered — with citations, and with every figure checked against the turn's results.",
    ),
    p(
      "The plan is a first-class object: it both shows you what's happening and drives execution. Skipped, blocked, or failed steps are disclosed plainly in the answer, never papered over.",
    ),
    h2("prove it in 60 seconds"),
    ol(
      "Ask something that needs the web: `» what changed in local LLMs this week?` The plan renders live; each `web_search` / `web_extract` call shows in the rail as it runs.",
      "Read the receipt under the answer. It says `⇅ N sends · <bytes> → <host>` because something did leave your machine — the receipt says so instead of hiding it.",
      "`/trace answer` — answer-level provenance: each cited source's origin (local vs network) and trust, and what left the machine this turn.",
      "`/privacy egress` — the per-event ledger: exactly what left, channel / host / bytes.",
      "Make it ask: `» save a two-line summary to notes.md`. The gate shows the exact file diff and waits; bare Enter rejects.",
      "`/trace export` writes the run's complete record as JSON, and `saturn --replay <file>` renders it offline — a shareable, replayable execution log, not a screenshot.",
    ),
    note(
      "Saturn is a trust-first agent, not a general-purpose assistant racing on breadth. The terminal is the product — there is no GUI on the roadmap, by design.",
    ),
  ],
};

export const installation: DocPage = {
  slug: "installation",
  title: "installation",
  summary:
    "The one-line installer, pipx/uv, and manual installs from source — plus the environment knobs each one honors.",
  group: "getting started",
  blocks: [
    h2("quick install"),
    p(
      "One command. It installs [Ollama](https://ollama.com) if needed, sets Saturn up in `~/.saturday` in an isolated virtualenv, pulls the small local models, and puts a `saturn` command on your PATH.",
    ),
    code("curl -fsSL saturdayai.org/install.sh | sh", "macos / linux / wsl2"),
    code("irm saturdayai.org/install.ps1 | iex", "windows (powershell)"),
    p(
      "Then open a new terminal and run `saturn`. The first run pulls a few GB of models, so it takes a minute. Both scripts are plain text at those URLs — download and read them first if you prefer.",
    ),
    table(
      ["variable", "default", "what it does"],
      ["`SATURDAY_TIER`", "`laptop`", "hardware tier to activate (`laptop` or `workstation`)"],
      ["`SATURDAY_HOME`", "`~/.saturday`", "install directory (your data lives here too)"],
      ["`SATURDAY_MODELS`", "`gemma4:e4b qwen3-embedding:8b`", "models the installer pulls"],
      ["`SATURDAY_BRANCH`", "`main`", "branch to install from"],
    ),
    p(
      "The installer defaults to the lightweight `laptop` tier. Switch to a bigger tier any time from inside Saturn with `/models tier workstation`.",
    ),
    h2("pipx / uv"),
    p("Saturn ships on PyPI as `saturn-agent`:"),
    code("pipx install saturn-agent\n# or\nuv tool install saturn-agent"),
    p(
      "You still need Ollama running and the tier models pulled — for the `laptop` tier that's `ollama pull gemma4:e4b` and `ollama pull qwen3-embedding:8b`. `/config setup` reports what's missing and offers to run the pulls for you (default no). Installed this way your data and `config.yaml` live in `~/.saturday`; upgrade with `pipx upgrade saturn-agent` / `uv tool upgrade saturn-agent`.",
    ),
    h2("from source"),
    p("Prerequisites: **Python 3.11+**, git, and Ollama running locally."),
    code(
      "git clone https://github.com/logansundaram/saturn\ncd saturn\npython -m venv .venv\n# Windows: .venv\\Scripts\\activate   macOS/Linux: source .venv/bin/activate\npip install -r requirements.txt\nollama pull qwen3.6:27b          # the workstation tier's model\nollama pull qwen3-embedding:8b   # the embedder (RAG)\npython agent.py",
    ),
    p(
      "Lighter on hardware? Set `active_tier: laptop` in `config.yaml` and pull `gemma4:e4b` instead (same embedder). Small models are less reliable at tool-calling; `/config setup` will say so. `saturn.cmd` (Windows) and `saturn.sh` (macOS/Linux) launch from anywhere and prefer the repo's own `.venv`.",
    ),
    h2("requirements"),
    kv(
      ["os", "macOS 13+, Linux, WSL2, or Windows 10/11"],
      ["runtime", "Python 3.11+ and git (the quick installer handles both)"],
      ["memory", "8 GB RAM minimum for the laptop tier; 16 GB+ recommended"],
      ["disk", "~6 GB free for the local models"],
    ),
    note(
      "There is no API key step. Secrets for MCP servers' `${VAR}` expansion are plain environment variables — put them in a `.env` file next to the install (or `~/.saturday/.env` for pipx installs).",
    ),
    h2("updating"),
    p(
      "Clone and quick installs update with `/update` (`/update --check` reports how many commits behind you are without changing anything); pipx/uv installs use their own upgrade command. Your data under `database/` is never touched. The live `config.yaml` is user data and is not tracked by git — it is seeded on first run from the template `config.default.yaml`, and persisted settings land in it without dirtying the repo.",
    ),
  ],
};

export const firstSession: DocPage = {
  slug: "first-session",
  title: "your first session",
  summary:
    "The prompt, the plan rail, the status bar, and the keys that matter during a turn.",
  group: "getting started",
  blocks: [
    p(
      "Run `saturn`. You get an interactive prompt (`»`). Anything starting with `/` is a command; everything else is a turn for the agent.",
    ),
    code(
      "» what's 15% of 2,340, and find me the latest news on local LLMs?\n» read the file notes.md in my workspace and summarize it\n» remember that I prefer concise answers",
    ),
    h2("what you see"),
    ul(
      "**The plan rail** — the drafted plan, then each step as it runs: the tool it calls, the observation that came back, and the judge's verdict. Every node is timed.",
      "**The status bar** — bottom-pinned: posture (only when it deviates from the safe default: `⚠ GATE OFF`, a loosened tier, `⛓ AIRGAP`), progress (`▸node · iter · tools · elapsed · tok/s`), context-fill meter, egress count, and CPU/RAM/GPU/VRAM.",
      "**The answer** — streamed token by token, with inline citations `[n]` and a Sources footer, low-confidence spans marked, and a one-line receipt: tokens, timing, and the trust segment (`local-only`, or exactly what left and how many calls faced the gate).",
      "**The gate** — when a step wants to write a file or run a command, the turn stops and shows you the exact diff or command. Bare Enter rejects.",
    ),
    h2("keys during a turn"),
    table(
      ["key", "does"],
      ["`Esc` (empty line)", "pause at the next step boundary and open the plan editor"],
      ["type text, then `Esc`", "steer: the remaining plan is redrafted around your correction"],
      ["`Esc` while the answer streams", "freeze the answer, edit it, and let the model continue from your prefix"],
      ["`Shift+Tab`", "cycle the approval tier live (`read_only` → `side_effecting` → `destructive`)"],
      ["`Ctrl+C`", "cancel the turn (in an editor: abort)"],
      ["`Shift+Enter` / `Ctrl+J`", "insert a newline in the prompt"],
      ["`Tab`", "complete `/commands` and `@paths`"],
    ),
    p(
      "Type ahead while a turn runs — follow-ups queue and the queue depth shows in the status bar. Pastes of three or more lines collapse into a `[paste #N]` chip that re-expands at submit; `Ctrl+E` re-opens a chip for editing.",
    ),
    h2("first things to try"),
    ol(
      "`/help` — the grouped command list, opening with the trust-stack map (posture · activity · proof). Every command takes `--help`.",
      "`/config setup` — the health check: Ollama reachable, tier models pulled, capabilities declared.",
      "`/tools` — the registered tools and their risk tiers.",
      "`/policy` — the live gate posture as one object.",
      "`/init` — survey your workspace and draft `SATURDAY.md`, standing instructions loaded every turn.",
      "`/trace` — after a turn, the full drill-down of what just happened.",
    ),
    note(
      "The workspace is `database/workspace/` under your install (or `SATURDAY_HOME`). File tools are sandboxed to it. `@path` mentions in the prompt attach a file's contents to the turn, with tab completion.",
    ),
  ],
};
