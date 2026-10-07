import { type DocPage, code, h2, kv, note, ol, p, table, ul } from "../types";

export const introduction: DocPage = {
  slug: "introduction",
  title: "introduction",
  summary:
    "What Saturn is, the two guarantees it is built around, and how one turn runs through the loop.",
  group: "getting started",
  blocks: [
    p(
      "Saturn is a private, local-first AI agent that runs in your terminal: a companion you can hand your day to. \"Reply to Petra about Thursday.\" \"Rename these photos by date.\" \"Remind me to call the dentist tomorrow at 9.\" \"Text Sam I'm 15 minutes late.\" It reads and writes your files, your notes, calendar, mail, contacts and reminders, searches the web, runs commands, and remembers things across sessions. You see every step it takes, and it stops for your approval before anything changes or leaves the machine.",
    ),
    p(
      "Inference runs entirely on local models through [Ollama](https://ollama.com). Nothing needs an API key: web search is keyless, page extraction is local, and there is no telemetry. Saturn is built by Saturday.ai and released under the MIT license.",
    ),
    h2("two guarantees"),
    kv(
      [
        "nothing leaves your machine",
        "Local models, zero required keys, zero telemetry. Saturn itself can only reach the network through a web search, a page fetch, a text you approve, the remote MCP servers you configured, or a remote Ollama you point it at. Every one of those is recorded in an egress ledger you can read (`/policy egress`) or seal (`/policy airgap`). Shell commands, Shortcuts, and stdio MCP servers are separate processes Saturn can't see inside, so each run is recorded as `untracked` rather than left out.",
      ],
      [
        "nothing happens without you",
        "Every side effect stops at an approval gate that shows the real artifact of the decision: the full shell command, a colored diff of the file write, the number and exact text of a message. Press `Esc` at any moment to pause the turn and continue, steer, or abort. Every run can be replayed afterward (`/trace`), and file changes reversed (`/undo`). Out of the box, the one write that skips the gate is a fact you state yourself (\"I'm vegetarian\"): it's remembered without asking, the answer ends with a `remembered #N` line, and `/memory remove N` undoes it. Turn that off with `memory.auto_learn: false`.",
      ],
    ),
    h2("how a turn works"),
    p("Every turn is one loop of small, inspectable steps:"),
    code(
      "ground → agent ─(no tool calls)─→ answer\n           ↑          │ tool calls\n           └── tools ← approval",
      "the loop",
    ),
    ul(
      "**ground** loads your standing instructions (`~/.saturn/SATURN.md` and the folder's `SATURN.md`), today's date, the memory facts relevant to this request, and the knowledge-base manifest.",
      "**agent** makes one model call. It either calls tools or answers. A message without tool calls is the answer, and it streams as it's written. At the default thinking level (`/think auto`), a pass that is about to call a tool is thought through first, which costs a second call; a plain answer never waits on a thought.",
      "**approval** stops for your OK before anything that changes or sends something runs.",
      "**tools** run, and their results flow back so the agent can decide what to do next.",
    ),
    p(
      "A chat question costs one model call. A lookup takes two passes: one to call the tool, one to answer. On a multi-step task the agent keeps a checklist with the `plan` tool, shown live in the rail. See [the loop & steering](/docs/loop).",
    ),
    h2("prove it in 60 seconds"),
    ol(
      "Ask something that needs the web: `» what changed in local LLMs this week?` Each `web_search` / `web_extract` call shows in the rail as it runs, with its result.",
      "Read the receipt under the answer. It shows `⇅ N sends · <bytes> → <host>` in yellow because something did leave your machine. The receipt says so instead of hiding it.",
      "`/policy egress` shows the per-event ledger: exactly what left, by channel, host, and bytes.",
      "Make it ask: `» save a two-line summary to notes.md`. The gate shows the exact file diff and waits. Bare Enter rejects.",
      "`/trace export` writes the run's complete record as JSON, and `saturn --replay <file>` renders it offline. It's a real execution log you can share and replay, not a screenshot.",
    ),
    note(
      "Saturn is trust-first and built for people who live in a terminal. The terminal is the product. There's no GUI chat window on the roadmap, by design.",
    ),
  ],
};

export const installation: DocPage = {
  slug: "installation",
  title: "installation",
  summary:
    "The one-line installer, pipx/uv, and installing from source, plus the environment knobs the installer honors.",
  group: "getting started",
  blocks: [
    h2("quick install"),
    p(
      "One command. It installs [Ollama](https://ollama.com) if needed (or updates one older than 0.6.0), clones Saturn into `~/.saturday` with its own virtualenv, pulls the small local chat model, and puts a `saturn` command on your PATH.",
    ),
    code("curl -fsSL saturdayai.org/install.sh | sh", "macos / linux"),
    p(
      "Then open a new terminal and run `saturn`. The script is plain text at that URL, so you can download and read it before you run it. On macOS it installs Ollama with Homebrew; without Homebrew, install Ollama from [ollama.com](https://ollama.com/download) first. If `~/.local/bin` isn't on your PATH, the installer offers to add it to your shell profile.",
    ),
    p(
      "The installer defaults to the `4b` tier (`qwen3.5:4b`). The first launch opens `/models`, which reads your hardware, prices every tier against it for fit and speed, lists any other models you've pulled, and asks which tier and embedder to run. Enter takes the recommendation, and anything not pulled yet is pulled once you agree. Re-run `/models` any time.",
    ),
    p(
      "Right after the model pick, Saturn offers three quick questions: what to call you, what you do, and anything it should never do. Enter starts them, `n` skips, and any one can be skipped. Each answer is saved to memory in your words, so your first real request already knows who you are, and a \"never…\" answer becomes a rule loaded on every turn. The offer is made once. `/memory setup` asks them again later, with two more about the people you mention most and what you want help with. See [memory](/docs/knowledge#first-run).",
    ),
    table(
      ["variable", "default", "what it does"],
      ["`SATURN_TIER`", "`4b`", "the tier to activate: `4b`, `9b`, `27b`, or `35b`"],
      ["`SATURN_INSTALL_DIR`", "`~/.saturday`", "where the clone and its virtualenv go"],
      ["`SATURN_MODELS`", "`qwen3.5:4b`", "the models the installer pulls"],
      ["`SATURN_BRANCH`", "`main`", "the branch to install from"],
      ["`SATURN_BIN`", "`~/.local/bin`", "where the `saturn` launcher goes"],
      ["`SATURN_REPO`", "the GitHub repo", "the git URL to clone"],
      ["`SATURN_MIN_OLLAMA`", "`0.6.0`", "the oldest Ollama the installer accepts before it updates it"],
    ),
    p(
      "The installer pulls the chat model only. The knowledge-base embedder (`qwen3-embedding:8b`) is pulled when you first run `/docs add`, and only if you agree. `SATURN_TIER` doesn't change what gets pulled: to install a larger tier up front, set `SATURN_MODELS` to its model too (`SATURN_TIER=9b SATURN_MODELS=qwen3.5:9b`), or let the first launch's `/models` offer the pull.",
    ),
    h2("pipx / uv"),
    p("Saturn isn't on PyPI yet. pipx and uv install it straight from GitHub, as the `saturn-agent` package:"),
    code("pipx install git+https://github.com/logansundaram/saturn\n# or\nuv tool install git+https://github.com/logansundaram/saturn"),
    p(
      "You still need Ollama running and the tier's chat model pulled. For the `4b` tier that's `ollama pull qwen3.5:4b`. The first launch's `/models` page offers to run any missing pull (y/N, default no), and later launches warn about anything missing. Installed this way, your data and `config.yaml` live in `~/.saturn` (override with `SATURN_HOME`). Update with `pipx reinstall saturn-agent` / `uv tool install --reinstall git+https://github.com/logansundaram/saturn`.",
    ),
    h2("from source"),
    p("Prerequisites: **Python 3.11+**, git, and Ollama running locally."),
    code(
      "git clone https://github.com/logansundaram/saturn\ncd saturn\npython -m venv .venv\nsource .venv/bin/activate\npip install -e .\nollama pull qwen3.5:4b\npython agent.py",
    ),
    p(
      "More hardware to spare? Run `/models` and pick a larger tier, or set `active_tier` in `config.yaml` to `9b`, `27b`, or `35b` and pull that tier's model. Small models are less reliable at choosing tools, so use the `9b` or larger if your hardware fits it. `saturn.sh` launches from anywhere and prefers the repo's own `.venv`.",
    ),
    h2("requirements"),
    kv(
      ["os", "macOS or Linux. The Notes, Calendar, Mail, Contacts, Reminders, Messages, Shortcuts, browser-tab, Finder, and notification tools need macOS. On Linux you get the file, shell, web, and knowledge-base tools."],
      ["runtime", "Python 3.11+ and git, plus Ollama 0.6.0 or newer (the quick installer handles Ollama)"],
      ["memory", "the `4b` tier fits on an 8 GB machine; `9b` wants a 16 GB Mac, `27b` a 32 GB Mac, `35b` 36 GB or more of unified memory. `/models` checks this against your machine and also estimates speed: it recommends the largest tier that fits and runs at 10 tok/s or better, so a base-chip Mac may be steered to a smaller tier than its memory allows."],
    ),
    note(
      "There's no API key step. Secrets for an MCP server's `${VAR}` expansion are plain environment variables: export them in your shell, or put them in a `.env` file at the install (or `~/.saturn/.env` for pipx/uv installs).",
    ),
    h2("updating"),
    p(
      "Clone and quick installs update with `/update`, or by re-running the install command, which updates the existing install in place. `/update --check` reports how many commits behind you are without changing anything, and `/update` reinstalls Python dependencies when `pyproject.toml` changed. pipx/uv installs reinstall from GitHub instead. Your data is never touched. The live `config.yaml` is user data that git doesn't track: it's seeded on first run from the template `config.default.yaml`, and settings you save land in it without dirtying the repo.",
    ),
  ],
};

export const firstSession: DocPage = {
  slug: "first-session",
  title: "your first session",
  summary:
    "The working folder, the prompt, the rail and status bar, and the keys that matter during a turn.",
  group: "getting started",
  blocks: [
    p(
      "`cd` into a folder and run `saturn`. That folder is the working folder: the file tools read and write there, shell commands run there, and its `SATURN.md` loads every turn. Launched from `~`, your home folder is the working folder. You get a prompt (`»`). Anything starting with `/` is a command, and everything else is a turn for the agent.",
    ),
    code(
      "» what's on my calendar tomorrow, and is anything in mail waiting on me?\n» summarize report.pdf and list the decisions in it\n» remind me to call the dentist tomorrow at 9\n» remember that I prefer concise answers",
    ),
    h2("what you see"),
    ul(
      "**The rail** shows each tool call as it runs, with a one-line preview of its result, the gate decisions, and, on a multi-step task, the agent's checklist.",
      "**The status bar** is pinned to the bottom. It shows posture only when it deviates from the safe default (`⚠ GATE OFF`, a loosened tier, `⛓ AIRGAP`), then progress (`thinking 3s` while the model reasons, iteration, tool count, elapsed time, tok/s), the context-fill meter, an egress count once the ledger has an entry, GPU and memory use, and the keys `esc pause · ctrl-c cancel`.",
      "**The answer** streams as it's written. When the turn gathered anything, it ends with a numbered Sources list. A one-line receipt follows with tokens and timing, plus a trust segment whenever something left the machine or faced the gate.",
      "**The gate** stops the turn when a call wants to change or send something, and shows you the exact diff, command, or message. Bare Enter rejects.",
    ),
    p(
      "A fact you state in your own words (\"remember that I prefer concise answers\") is kept without a gate, and the answer ends with `remembered #N: …`. `/memory remove N` undoes it. Once a web page, an email, a file, or an attachment has entered the conversation, every later fact asks first, until `/clear`.",
    ),
    h2("keys"),
    table(
      ["key", "does"],
      ["`Esc` on an empty line", "pause at the agent's next pass: Enter continues, typed text steers, `q` aborts. While the model is thinking, it stops the thought and the pass answers without it"],
      ["type text, then `Esc`", "steer the running turn with that correction, without restarting it"],
      ["type text, then `Enter`", "queue it as your next message (the queue depth shows in the status bar)"],
      ["`Ctrl+C`", "cancel the turn"],
      ["`Shift+Tab`", "at the prompt: cycle the approval tier (`read_only` → `side_effecting` → `destructive`)"],
      ["`Shift+Enter` / `Ctrl+J` / `\\` then `Enter`", "insert a newline in the prompt"],
      ["`Tab`", "complete `/commands` and `@paths`"],
    ),
    p(
      "A large paste collapses into a `[paste #N +L lines]` chip that is sent in full. Put the cursor on a chip and press `Ctrl+E` to expand it for editing.",
    ),
    h2("in a message"),
    kv(
      ["`@file`", "attach a file's contents (PDF, Word, and Excel are read as text), with tab completion. `@\"path with spaces\"` works."],
      ["`@clipboard`", "attach what's on the clipboard. Saturn never reads the clipboard unless you type this."],
      ["`!command`", "run a shell command yourself, without the agent. The output prints and is attached to your next message, so `!git diff` followed by \"summarize that\" works."],
    ),
    h2("first things to try"),
    ol(
      "`/help` lists every command, grouped by theme. Every command takes `--help`.",
      "`/policy` shows your trust posture: what runs without asking, and what can leave the machine.",
      "`/tools` shows the toolkits: Saturn's tools in groups (files, web, mail, calendar, messages, …). `/tools off messages` turns one off so the model never sees it.",
      "`/init` surveys the working folder and drafts `SATURN.md`, standing instructions loaded every turn.",
      "`/trace`, after a turn, shows the full drill-down of what just happened.",
      "`/skills create weekly-review` writes a template to `~/.saturn/skills/weekly-review/SKILL.md`. Fill in the steps, then type `/weekly-review` to run it. Every action it leads to still asks as usual.",
    ),
    note(
      "The file tools can't reach outside the working folder on their own. Ask about a file elsewhere and Saturn suggests `/add-dir <folder>`, which makes that folder reachable for the session. `/rm-dir` takes it away again.",
    ),
  ],
};
