import { type DocPage, code, h2, kv, note, p, table, ul } from "../types";

export const tools: DocPage = {
  slug: "tools",
  title: "tools",
  summary:
    "Every built-in tool, its risk tier, and what it actually does — files, shell, web, calculator, clock, knowledge base, memory, and ask_user.",
  group: "reference",
  blocks: [
    p(
      "Every capability surfaces as a step in the plan you can watch, faces the same approval gate, runs locally where it can, and lands in a trace you can replay. `/tools` prints the live registry with each tool's tier; a tool's tier can be overridden with `/policy risk <tool> <tier> [--save]`.",
    ),
    table(
      ["tool", "tier", "does"],
      ["`read_file`", "read_only", "read a workspace file"],
      ["`write_file`", "side_effecting", "write a workspace file (pre-write snapshot backs `/undo`; the gate shows a diff)"],
      ["`edit_file`", "side_effecting", "anchored string replace inside a file"],
      ["`list_directory`", "read_only", "list a workspace directory"],
      ["`search_files`", "read_only", "content regex search across files"],
      ["`find_files`", "read_only", "find files by name glob"],
      ["`run_shell`", "destructive", "run a shell command in the workspace — always gated"],
      ["`web_search`", "read_only · untrusted", "keyless DuckDuckGo search — no key, no account"],
      ["`web_extract`", "read_only · untrusted", "fetch a page and extract its text locally (`trafilatura`); only the page's own host is contacted"],
      ["`calculate`", "read_only", "whitelisted-AST arithmetic; refuses a bare value"],
      ["`current_time`", "read_only", "the machine's own clock"],
      ["`search_knowledge_base`", "read_only · untrusted", "retrieve from your ingested documents (RAG)"],
      ["`remember`", "side_effecting", "store a durable fact"],
      ["`recall`", "read_only", "read durable facts back"],
      ["`ask_user`", "read_only", "pause with one question; your answer resumes the turn"],
      ["`mcp_<server>_<tool>`", "your declaration", "any tool from a configured MCP server"],
    ),
    h2("files"),
    p(
      "File tools are sandboxed to the workspace (`database/workspace/` by default). Every write takes a pre-write snapshot so `/undo` can revert a turn's file changes. The approval gate renders a write as a colored unified diff, says `no change` for a byte-identical rewrite, names an existing binary file as binary, and flags a path the sandbox will refuse as `REFUSED`.",
    ),
    h2("shell"),
    p(
      "`run_shell` hands the command to the host shell — PowerShell on Windows, `/bin/sh` on macOS/Linux — so write commands in your platform's native syntax. It is registered `destructive`, so it always hits the gate: the human seeing and approving the exact command is the safety boundary, not a path jail. Every run is a bounded foreground run with a timeout (`shell.timeout`, default 60 s); the child's environment is scrubbed of secret-shaped variables (`shell.env_scrub`); a command killed by a signal counts as a failed run. Prefix grants (`/policy allow`) let a reviewed command run unprompted next time, with the argument tail screened at every use.",
    ),
    h2("web"),
    p(
      "The web tools are API-less by design — a product whose pitch is \"your data stays yours\" shouldn't steer your search queries through a keyed SaaS backend. For deeper research the agent plans multiple search + read steps, visible in the rail and traced, rather than hiding them in a monolithic research tool. Both tools' output is untrusted and passes through the injection quarantine. `web.max_results` sets results per search.",
    ),
    h2("math and time"),
    p(
      "`calculate` evaluates arithmetic through a whitelisted AST — and refuses an expression that is a bare value, so a made-up number cannot be laundered into a \"computed\" result. `current_time` reads the machine clock, so \"today\" is computed, never guessed from memory.",
    ),
    h2("what is not a tool"),
    p(
      "`http_request` was removed. The MCP client is the integration surface: it does the same job with per-server trust declarations, outgoing-argument secret redaction, and connection status the generic tool never had — and with it gone, the list of ways anything can leave your machine is shorter to verify.",
    ),
  ],
};

export const mcp: DocPage = {
  slug: "mcp",
  title: "mcp servers",
  summary:
    "Connect any Model Context Protocol server from config.yaml — its tools face the same gate as everything else and never self-declare their risk.",
  group: "reference",
  blocks: [
    p(
      "Plug in any [Model Context Protocol](https://modelcontextprotocol.io) server — stdio, HTTP, or SSE — by declaring it in `config.yaml`. Its tools register as `mcp_<server>_<tool>` and join the agent behind the same approval gate as the built-ins. `/mcp` shows connection status and the tools each server added; `/mcp reload` applies a config edit without restarting.",
    ),
    code(
      "mcp:\n  connect_timeout: 20\n  call_timeout: 60\n  servers:\n    github:\n      command: npx\n      args: [\"-y\", \"@modelcontextprotocol/server-github\"]\n      env:\n        GITHUB_PERSONAL_ACCESS_TOKEN: ${GITHUB_TOKEN}\n    internal-docs:\n      url: https://mcp.example.com/mcp\n      headers:\n        Authorization: Bearer ${EXAMPLE_TOKEN}\n      risk: read_only",
      "config.yaml",
    ),
    kv(
      ["`transport`", "`stdio` | `http` | `sse` — optional; inferred from `command` (stdio) or `url` (http)"],
      ["`command` / `args` / `env`", "stdio: the server process to spawn"],
      ["`url` / `headers`", "http/sse: the remote endpoint"],
      ["`risk`", "the default tier for the server's tools. Omitted or invalid → `destructive` (always prompts). This is your trust declaration — the server's own annotations never drive the gate. Per-tool: `/policy risk <tool> <tier> --save`."],
      ["`enabled: false`", "keep the entry, skip the connection"],
    ),
    h2("trust rules"),
    ul(
      "Remote tools always prompt until you lower their tier — a server's own \"read-only\" claim is never trusted.",
      "Their results are untrusted input and pass through the injection quarantine.",
      "Their outgoing arguments are scanned for secrets, and every remote call is a recorded egress event (`/privacy egress`); `/privacy airgap on` refuses them.",
      "At the gate, an MCP tool's arguments render full-width — for a tool with no bespoke safety surface, the arguments are the safety surface.",
      "`${VAR}` in `url`, `args`, `env`, and `headers` expands from the environment or `.env`, so secrets never sit in the config file.",
    ),
    note(
      "A server that misses `connect_timeout` at startup is reported and skipped; a call that exceeds `call_timeout` fails cleanly, and the engine discloses it like any other failed step.",
    ),
  ],
};

export const knowledge: DocPage = {
  slug: "knowledge",
  title: "documents, memory & workspace",
  summary:
    "The local knowledge base (RAG), durable memory, per-workspace instructions in SATURDAY.md, @file mentions, and /undo.",
  group: "reference",
  blocks: [
    h2("documents (rag)"),
    p(
      "Ingest PDFs, text, markdown, HTML, CSV, and Word (`.docx`) files into a local knowledge base the agent can search with `search_knowledge_base`. Retrieval is cited like any other source. Embeddings come from the tier's `embedder` model (`qwen3-embedding:8b`) and the vector store is cached under `database/cache/`.",
    ),
    code(
      "/docs                       list documents (and workspace files)\n/docs add <path>            ingest a file\n/docs remove <name>\n/docs sync [--force]        re-scan the documents folder",
      "commands",
    ),
    p(
      "Adding a document no longer runs a model call to summarize it — manifests carry the file's own first line, so ingest is fast and untrusted document text is never fed through a model at ingest time. Retrieved chunks pass through the injection quarantine. Tuning knobs (`rag.chunk_size`, `rag.chunk_overlap`, `rag.k`) live in `config.yaml`; changing the chunking forces a re-embed on the next sync.",
    ),
    h2("memory"),
    p(
      "`remember` stores a durable fact; `recall` reads facts back. Memory persists across sessions in a plain markdown file (`database/memory/memory.md`) and is fully inspectable and editable with `/memory`.",
    ),
    code("/memory                 list facts\n/memory add <fact>\n/memory forget <n>", "commands"),
    h2("workspace instructions"),
    p(
      "`/init` surveys your workspace and drafts `SATURDAY.md` — standing instructions loaded every turn, like a per-project system prompt. Edit it by hand any time; `/init --force` redrafts it.",
    ),
    h2("@file mentions"),
    p(
      "`@path` tokens in a prompt expand to the file's contents (clamped), with fuzzy path completion; `@\"path with spaces\"` works. Attachments and piped stdin are scanned for instruction-shaped content and warn when they carry it, but never block.",
    ),
    h2("undo"),
    p(
      "Every write takes a pre-write snapshot. `/undo` reverts the file changes of the last turn that wrote anything; `/undo list` shows what can be reverted.",
    ),
    h2("sessions"),
    p(
      "Conversations autosave crash-safely; `/resume` continues the last one, `/resume save [name]` names one, `/resume list` lists them, `/resume <name>` restores. Sessions are plain `.json` files under `database/sessions/` — manage them there. Long histories auto-compact once the context window fills past `runtime.compact_threshold`.",
    ),
  ],
};

export const observability: DocPage = {
  slug: "observability",
  title: "observability & replay",
  summary:
    "/trace: the drill-down of any recorded run, why it decided what it did, what the model was actually sent, exports, and offline replay.",
  group: "reference",
  blocks: [
    p(
      "Every run is recorded to a local trace database. `/trace` expands one into the full replay the live rail abbreviates: the query, every node with its timing and metrics, the plan as it advanced, the agent's reasoning and tool-call decisions at each step, each tool call with its output, every gate decision — and, last and de-emphasized, the recorded final answer. It is the execution log, not a reprint of the answer.",
    ),
    table(
      ["command", "shows"],
      ["`/trace`", "the last run's drill-down; `/trace #id` any run; `/trace -l [n]` lists runs"],
      ["`/trace why`", "the run's decisions explained — each step's reasoning and the judge's verdicts"],
      ["`/trace answer`", "answer-level provenance: each cited source's origin and trust, what left the machine, the human gate decisions"],
      ["`/trace source <n>`", "the full material behind citation `[n]` of the last answer"],
      ["`/trace invoke`", "what each model call saw and said"],
      ["`/trace context [--node <name>] [--preview]`", "exactly what your machine sent the model — every system prompt and context block, token-for-token, per node"],
      ["`/trace export`", "write the run's complete record as JSON to `logging/exports/`"],
      ["`/trace replay <file>`", "re-render an exported record"],
      ["`/trace on|off|full`", "live trace verbosity"],
    ),
    h2("the export record"),
    p(
      "`/trace export` (or headless `--export FILE`, or `-q` automatically) writes one JSON file with the plan, every tool call and observation, every model call, and every human gate decision. `saturn --replay <file>` renders it anywhere, offline, with no database — a shareable, replayable artifact of exactly what the agent did. Oversized values are clipped with an explicit `truncated` marker naming what was dropped, never a JSON slice, and the replay discloses it under the node row.",
    ),
    code(
      "saturn --replay logging/exports/run_1.json",
      "offline replay",
    ),
    h2("what is not there"),
    p(
      "`/trace calls`, `/trace cost`, `/trace state`, and the `--md` export format were removed: `calls` duplicated the drill-down, `cost` measured cloud-era spend a local agent doesn't have (tok/s and context fill are live in the status bar), and the JSON export was always the one replayable record.",
    ),
    note(
      "The live rail fails soft: a display bug while rendering the trace or plan prints as one line, the run stays recorded, and the answer still arrives.",
    ),
  ],
};

export const headless: DocPage = {
  slug: "headless",
  title: "headless & the cli",
  summary:
    "saturn -p and -q for scripts and pipes, --json, --export, --yolo, --replay — and the deny-by-default gate when no human is present.",
  group: "reference",
  blocks: [
    table(
      ["flag", "does"],
      ["`-p, --prompt QUERY`", "run one query headlessly and print the answer to stdout"],
      ["`-q, --query QUESTION`", "one-shot query for pipes: only the final answer on stdout; progress and a `recorded:` replay receipt on stderr; the run auto-exports"],
      ["`--json`", "with `-p`: a structured JSON result (answer, plan, tools, tokens, timing, gates)"],
      ["`--export FILE`", "with `-p` or `-q`: write the run's export record to FILE after the turn"],
      ["`--yolo`", "open the approval gate for the whole run — the same view as `/policy open`"],
      ["`--replay FILE`", "render an exported run record offline, then exit"],
      ["`--version`", "print the version"],
    ),
    p(
      "The CLI is strict: an unknown flag exits 2 instead of silently launching the chat loop.",
    ),
    h2("-p vs -q"),
    p(
      "Both run the same headless turn — same engine loop, same deny-by-default gate, same trace recording. `-p` prints the answer (or, with `--json`, a machine-readable result whose `gates` record says which calls were prompted and denied). `-q` is the pipe-friendly rendering: stdout carries only the final synthesized answer, step-line progress goes to stderr, and the run auto-exports to `logging/exports/` so the closing `recorded: saturn --replay <file>` line names a command that actually replays the run offline. A completed run exits 0; errors emit JSON with `status: \"error\"` under `--json` and exit 1.",
    ),
    code(
      "saturn -p \"what changed in local LLMs this week?\"\ngit diff | saturn -p \"review this change\"\nsaturn -q \"summarize notes.md\" > summary.txt\nsaturn -p \"...\" --json --export run.json",
      "examples",
    ),
    h2("the gate with no human present"),
    p(
      "Headless runs deny gated tools by default — there is nobody at the gate to say yes — and the answer discloses what was denied. `--yolo` opens the gate for the run, and that choice is on the record too. Piped stdin attaches to the turn and is scanned like an `@file` attachment.",
    ),
    note(
      "The landing page's gate figure is a real headless run: the model planned `write_file`, the gate denied it, and nothing ran.",
    ),
  ],
};

export const commands: DocPage = {
  slug: "commands",
  title: "slash commands",
  summary: "The complete command list. Every command takes --help.",
  group: "reference",
  blocks: [
    p(
      "Type `/help` for the grouped list — it opens with the trust-stack map (posture · activity · proof) — or `/<command> --help` for details on any one. `--help` works as the first or last argument (mid-position it's ordinary data, so `/memory add …` can store a fact that mentions it). Removal verbs are interchangeable everywhere: `remove` / `rm` / `delete` / `del` / `forget` / `drop`.",
    ),
    table(
      ["command", "does"],
      ["`/help [cmd]`  (`/?`, `/h`)", "list commands by theme, or detail one"],
      ["`/config`", "view/edit `config.yaml`; `/config setup` health check; `/config context` runtime readout; `/config reload`"],
      ["`/models`  (`/model`)", "list installed Ollama models; bind roles or the embedder; `/models tier <name>`"],
      ["`/tools`", "the registered tools and their risk tiers"],
      ["`/mcp [list | reload]`", "MCP server status and the tools they add"],
      ["`/plan`", "show the plan; `review [on|off]`; `pause`"],
      ["`/draft [clear]`", "compose your own plan for the next message"],
      ["`/policy`", "the gate policy as one object: `risk`, `allow`, `open`"],
      ["`/privacy`", "what can leave, what did (`egress`), and `airgap`"],
      ["`/trace`", "observability hub: drill-down, `why`, `answer`, `source`, `invoke`, `context`, `export`, `replay`"],
      ["`/docs`  (`/documents`)", "the knowledge base: `list`, `add <path>`, `remove <name>`, `sync`"],
      ["`/memory`  (`/mem`)", "list, add, or forget durable facts"],
      ["`/init [--force]`", "survey the workspace and draft `SATURDAY.md`"],
      ["`/undo [list]`", "revert the last turn's file changes"],
      ["`/resume`  (`/continue`)", "sessions: resume the autosave; `save [name]`, `list`, `<name>`"],
      ["`/clear`  (`/cls`, `/reset`, `/new`)", "start a fresh conversation"],
      ["`/update [--check]`", "self-update (git pull at the install root); your data is never touched"],
      ["`/quit`  (`/exit`, `/q`)", "exit"],
    ),
    h2("removed spellings"),
    p(
      "A few commands were folded or cut in the focus pass; each old spelling prints a pointer to its replacement. `/risk`, `/allow`, `/autoapprove` → `/policy`. `/source`, `/glass` → `/trace source`, `/trace answer`. `/config key` → put env vars in `.env`. `/privacy redact` → `/config runtime.redaction`. `/resume delete|rename` → the session files under `database/sessions/`. `/plan draft` → `/draft`.",
    ),
  ],
};

export const configuration: DocPage = {
  slug: "configuration",
  title: "configuration & models",
  summary:
    "config.yaml: hardware tiers and model roles, runtime and safety knobs, web/RAG/MCP/shell sections — and which settings persist.",
  group: "reference",
  blocks: [
    p(
      "Everything lives in one file, `config.yaml`, seeded on first run from the tracked template `config.default.yaml`. Most of it is adjustable live with `/config <dotted.key> <value>`; edits persist by default, `--session` keeps one for this session only. Trust keys are the exception — see below.",
    ),
    h2("tiers and roles"),
    p(
      "The agent references model roles, never concrete model ids. A hardware tier maps each role to a model, so swapping hardware is a one-line `active_tier` change:",
    ),
    code(
      "active_tier: laptop\n\ntiers:\n  laptop:\n    provider: ollama\n    roles:\n      planner: gemma4:e4b\n      tool_caller: gemma4:e4b\n      synthesizer: gemma4:e4b\n      utility: gemma4:e4b\n      judge: gemma4:e4b\n    embedder: qwen3-embedding:8b\n  workstation:\n    provider: ollama\n    roles:\n      planner: qwen3.6:27b\n      tool_caller: qwen3.6:27b\n      synthesizer: qwen3.6:27b\n      utility: qwen3.6:27b\n      judge: qwen3.6:27b\n    embedder: qwen3-embedding:8b",
      "config.yaml",
    ),
    kv(
      ["planner", "drafts and redrafts the plan (structured output; keeps its hidden rationale)"],
      ["tool_caller", "the execute node: per-step reasoning and single-tool constrained calls"],
      ["synthesizer", "the final streamed answer"],
      ["judge", "the engine's judgment calls: rectify verdicts, the semantic write gate"],
      ["utility", "cheap background tasks"],
      ["embedder", "the RAG embedding model (separate from the roles)"],
    ),
    p(
      "The engine requires native tool-calling and structured output; `capabilities:` declares each model's context window and features, and `/config setup` warns when a bound model lacks one. `/models` lists installed Ollama models and rebinds a role, all roles, the embedder, or a whole tier (`--session` for this session only). Cloud providers are shelved: a non-Ollama binding refuses to run.",
    ),
    h2("runtime"),
    table(
      ["key", "default", "meaning"],
      ["`max_iterations`", "16", "execute-pass cap per turn"],
      ["`auto_approve`", "read_only", "tools at or below this tier run unprompted (trust key)"],
      ["`num_ctx`", "null (auto)", "Ollama context window; null uses each model's declared window"],
      ["`llm_timeout`", "120", "read timeout per model call, guards a wedged daemon"],
      ["`auto_compact` / `compact_threshold`", "true / 0.85", "fold older turns into a summary once the window fills"],
      ["`citations`", "true", "inline `[n]` citations and the Sources footer"],
      ["`airgap`", "false", "block and record every network exit (trust key)"],
      ["`redaction`", "off", "`off` / `warn` / `redact` at the network boundary (trust key)"],
      ["`quarantine`", "gate", "`off` / `warn` / `gate` for untrusted tool output (trust key)"],
      ["`receipt`", "true", "the trust segment on the per-answer receipt"],
      ["`confidence`", "true", "capture logprobs and mark low-confidence runs"],
      ["`confidence_threshold`", "auto", "per-model calibrated threshold, or a pinned number"],
      ["`confidence_exit_threshold`", "derived", "hysteresis exit for an open low-confidence run"],
      ["`grant_scope`", "task", "how long a gate `a` grant lives: `task` / `session` / `persist` (trust key)"],
    ),
    h2("other sections"),
    kv(
      ["`web.max_results`", "results per `web_search` (default 5); the backend is fixed and keyless"],
      ["`rag.chunk_size` / `chunk_overlap` / `k`", "1000 / 150 / 6 — chunking changes force a re-embed"],
      ["`mcp.servers` / `connect_timeout` / `call_timeout`", "see [mcp servers](/docs/mcp)"],
      ["`shell.timeout` / `shell.env_scrub`", "60 s per command; secret-shaped env fragments removed from children (trust key)"],
      ["`paths.*`", "database, documents, workspace, cache, memory, sessions, snapshots, permissions, exports"],
    ),
    h2("what persists"),
    ul(
      "Ordinary keys set with `/config` persist to `config.yaml` by default; `--session` keeps the change for this session.",
      "Trust keys — `auto_approve`, `airgap`, `quarantine`, `redaction`, `grant_scope`, `shell.env_scrub` — and the `/policy` and `/privacy` toggles are session-only unless you pass an explicit `--save`. A loosened posture is never written to disk silently.",
      "`/policy risk` overrides and the shell prefix allowlist persist in `database/permissions.json`. `/policy allow <prefix>` (the explicit command) always persists; a gate `a` grant follows `grant_scope`.",
      "The live `config.yaml` is user data and not tracked by git, so persisted settings never dirty the repo or break `/update`.",
    ),
    note(
      "Migration for older clone installs: pulling the change that untracked `config.yaml` removes an unmodified copy (recreated from the template on next launch). If you had edited it, git refuses the pull once — back the file up, `git checkout -- config.yaml`, pull again, and re-apply your settings.",
      "warn",
    ),
  ],
};
