import { type DocPage, code, h2, h3, kv, note, p, table, ul } from "../types";

export const tools: DocPage = {
  slug: "tools",
  title: "tools",
  summary:
    "All 44 built-in tools and their risk tiers: files, shell, web, knowledge and memory, the loop's own tools, and the macOS apps.",
  group: "reference",
  blocks: [
    p(
      "Every capability is a tool call you can watch in the rail. Each one faces the same approval gate, runs locally where it can, and lands in a trace you can replay. Reading runs without asking; anything that changes or sends something asks first. `/tools` prints the live registry with each tool's tier, and `/policy risk <tool> <tier> [--save]` overrides a tier. **untrusted** marks a tool whose output is outside content: it passes through the injection quarantine.",
    ),
    h2("files"),
    table(
      ["tool", "tier", "does"],
      ["`read_file`", "read_only · untrusted", "read a file; PDF, Word (`.docx`), and Excel (`.xlsx`) come back as text. Other binary files are refused by name."],
      ["`write_file`", "side_effecting", "create or replace a file (the gate shows a diff)"],
      ["`edit_file`", "side_effecting", "anchored string replace inside a file"],
      ["`move_file`", "side_effecting", "rename or move a file or folder; `/undo` moves it back"],
      ["`delete_file`", "side_effecting", "move a file or folder to the Trash, never erase it; `/undo` puts it back, which is why it isn't `destructive`"],
      ["`list_directory`", "read_only", "list a folder"],
      ["`search_files`", "read_only · untrusted", "regex search across file contents"],
      ["`find_files`", "read_only", "find files by name glob"],
    ),
    h2("shell, web, math"),
    table(
      ["tool", "tier", "does"],
      ["`run_shell`", "destructive · untrusted", "run a shell command in the working folder. It always faces the gate."],
      ["`web_search`", "read_only · untrusted", "keyless DuckDuckGo search"],
      ["`web_extract`", "read_only · untrusted", "fetch a page and extract its text locally (`trafilatura`)"],
      ["`calculate`", "read_only", "arithmetic through a whitelisted AST, never `eval`"],
      ["`current_time`", "read_only", "the machine's own clock, timezone, and weekday"],
    ),
    h2("knowledge and memory"),
    table(
      ["tool", "tier", "does"],
      ["`search_knowledge_base`", "read_only · untrusted", "retrieve passages from your ingested documents"],
      ["`remember`", "side_effecting", "store a durable fact in a memory layer (it asks first)"],
      ["`recall`", "read_only", "read durable facts back"],
    ),
    h2("the loop"),
    table(
      ["tool", "tier", "does"],
      ["`plan`", "read_only", "the agent's checklist for a multi-step task, shown in the rail"],
      ["`ask_user`", "read_only", "pause with one question; your answer resumes the turn"],
    ),
    h2("your mac"),
    table(
      ["tool", "tier", "does"],
      ["`search_notes` · `read_note`", "read_only · untrusted", "find and read Apple Notes"],
      ["`create_note` · `append_note`", "side_effecting", "start a note, or add to the one with exactly that title"],
      ["`list_calendar_events`", "read_only · untrusted", "events in a window, optionally narrowed to named calendars"],
      ["`create_calendar_event` · `update_calendar_event`", "side_effecting", "add an event; move or rename one"],
      ["`delete_calendar_event`", "destructive", "remove an event"],
      ["`list_mail` · `search_mail` · `read_mail`", "read_only · untrusted", "list, search, and read Apple Mail"],
      ["`draft_mail` · `reply_mail`", "side_effecting", "open an unsent draft or threaded reply. You press Send."],
      ["`update_mail`", "side_effecting", "mark read/unread, flag, move, or trash a list of messages in one approval"],
      ["`search_contacts`", "read_only · untrusted", "a name to the addresses, numbers, and birthday on the card"],
      ["`list_reminders`", "read_only · untrusted", "open and overdue reminders"],
      ["`create_reminder` · `complete_reminder`", "side_effecting", "add a reminder, tick one off"],
      ["`read_messages`", "read_only · untrusted", "your Messages history (needs Full Disk Access)"],
      ["`find_group_chats`", "read_only · untrusted", "your group chats and who is in them"],
      ["`send_message`", "destructive", "send an iMessage to one person or one existing group chat. It always asks."],
      ["`list_shortcuts`", "read_only", "the Shortcuts you have built"],
      ["`run_shortcut`", "destructive · untrusted", "run one of them; it asks unless you allowed it by name"],
      ["`read_browser_tab`", "read_only · untrusted", "the page in your front browser tab"],
      ["`finder_selection`", "read_only", "the files selected in Finder"],
      ["`schedule_notification`", "side_effecting", "a one-off desktop alert at a time you name"],
    ),
    p(
      "Plus any tool from a configured MCP server, registered as `mcp_<server>_<tool>` at the tier you declare (`destructive` by default). See [mcp servers](/docs/mcp).",
    ),
    h2("working with files"),
    p(
      "The file tools reach the working folder (where you launched Saturn) and any folder added with `/add-dir`, nothing else. Every write, edit, move, and delete is snapshotted first, so `/undo` reverts the turn. Searches skip `~/Library`, dependency folders (`node_modules`, `.venv`, …), and hidden folders, and stop at 50,000 entries. A content search has a 10-second budget and says when it was partial. On macOS it also asks Spotlight's index, which finds text inside PDF, Word, and Excel files. Every Spotlight hit is re-checked against the file itself and the same folder limits. Saturn refuses to write its own control files. See [the trust stack](/docs/trust).",
    ),
    h2("running commands"),
    p(
      "`run_shell` hands the command to `/bin/sh` in the working folder. It's `destructive`, so it always faces the gate: you seeing and approving the exact command is the safety boundary. Every run is a bounded foreground run with a timeout (`shell.timeout`, default 60 s). A command never reads your terminal: a prompt for input gets end-of-input at once. A non-zero exit or a timeout is a failed call the answer tells you about. The child's environment is stripped of secret-shaped variables (`shell.env_scrub`), and each run is recorded as `untracked` on the egress ledger. Shell effects can't be undone with `/undo`.",
    ),
    h2("the web, without a key"),
    p(
      "The web tools need no API key, by design: a product whose pitch is \"your data stays yours\" shouldn't route your queries through a keyed SaaS backend. `web_extract` contacts only the page's own host plus any host its redirects reach. Saturn follows each redirect itself, so every host is checked against the air-gap and written to the egress ledger before it's contacted. It stops reading at 5 MB. For deeper research the agent issues several search and read calls, each visible in the rail, instead of hiding them in one research tool. `web.max_results` (default 5) sets results per search.",
    ),
    h2("what is not a tool"),
    ul(
      "There's no clipboard tool. Saturn reads the clipboard only when you type `@clipboard`, and `/copy` writes the last answer to it.",
      "There's no `send_mail`. Mail is drafted, never sent: you press Send.",
      "There's no generic `http_request`. MCP is the integration surface, with your own trust declaration per server.",
    ),
  ],
};

export const yourMac: DocPage = {
  slug: "your-mac",
  title: "your mac",
  summary:
    "Notes, Calendar, Mail, Contacts, Reminders, Messages, Shortcuts, the browser tab, and Finder, plus the macOS permission dialogs and Full Disk Access.",
  group: "reference",
  blocks: [
    p(
      "On macOS, Saturn works through the apps themselves, so what it does shows up where you'd look for it. Each app tool runs AppleScript through `osascript`. Readers are `read_only` and **untrusted**: a shared note, an invitation, or an email is someone else's text, so it's scanned and fenced like a web page. Writers ask first.",
    ),
    h2("the apps"),
    kv(
      ["Notes", "search and read notes; create one; append to an existing note. An append writes only to the note with exactly that title (or its id), never a near match, and leaves a locked note or one with attachments alone."],
      ["Calendar", "list events (`today`, `tomorrow`, `next monday`, and `in 1 week` work); create, move, rename, or delete one. A repeating event changes only as a whole series, and you're told when attendees may be notified. A bare time like \"3pm\" keeps an event on its own day. Reading every calendar takes several seconds, so narrowing to named calendars is faster."],
      ["Mail", "list, search, and read; `draft_mail` and `reply_mail` open an **unsent** draft in the right thread with the original quoted, and you press Send. `update_mail` marks read/unread, flags, moves, or trashes a whole list of messages in one approval. Listings say whether you've replied."],
      ["Contacts", "a name becomes the addresses, numbers, and birthday on the card, so a reply or a text goes to a real address. An exact name ranks first, and a typo gets the closest names back."],
      ["Reminders", "\"remind me to call the dentist tomorrow at 9\" creates a reminder that reaches your phone. List what's open or overdue, tick one off. Reminders can't be made to repeat or trigger at a place from here, and Saturn says so when you ask."],
      ["Messages", "read your history, find group chats, and text someone. See below."],
      ["Shortcuts", "run any shortcut you've built (\"lights off\", a Focus mode, a HomeKit scene). It asks first unless you allow that one shortcut by name with `/policy shortcut <name>`. A shortcut is a process Saturn can't see inside, so each run is recorded as `untracked`, and under the air-gap every shortcut asks."],
      ["the browser tab", "`read_browser_tab` reads the front tab of the browser you used last. In Safari it reads the page text itself, with nothing fetched. In Chrome it gets the address and title unless you turn on *View › Developer › Allow JavaScript from Apple Events*. A closed browser is never launched."],
      ["Finder", "`finder_selection` gives Saturn the files you have selected. A file outside the folders it can reach comes back with the `/add-dir` that would allow it."],
      ["notifications", "`schedule_notification` hands a one-off alert to launchd, so it fires at the set time whether or not Saturn is running, and survives a reboot. `/notify` lists and cancels them."],
    ),
    h2("texting"),
    p(
      "\"Text Sam I'm 15 minutes late\": Saturn looks Sam up in Contacts and sends an iMessage through Messages. A send is the one action that **always** asks. You see the number, whose number it is, and the exact text every time. No setting, no always-allow, and no `--yolo` skips it, and headless mode refuses it outright. Every send is on the egress ledger, and the air-gap blocks it.",
    ),
    ul(
      "`send_message` goes to one person (a number or address, never a bare name) or to one existing group chat, by a reference only `find_group_chats` hands out. Saturn never creates a group. A group text's prompt lists every member and their number, and the ledger records each recipient.",
      "\"Text Sam\" means Sam alone, even when Sam is in groups. When several groups could be meant, Saturn asks which one.",
      "A number or address that appears in nothing you typed and nothing a tool returned is refused before you're asked. So is a group reference the model made up.",
      "A send is reported as handed to Messages, not delivered. A recipient who isn't on iMessage fails inside Messages, where Saturn can't see it.",
      "`read_messages` finds one person's messages however far back they go. A text search covers the newest 4,000 messages and says so when that isn't the whole history.",
    ),
    h2("permissions"),
    p(
      "The first time a tool reaches an app, macOS asks whether your terminal may control it: one dialog per app (Notes, Calendar, Mail, Contacts, Reminders, Messages, your browser, Finder). The dialog names the terminal app you launched Saturn from, not Saturn, and a grant made in one terminal doesn't carry over to another. If you said no, the tool tells you where to change it: *System Settings › Privacy & Security › Automation*.",
    ),
    h3("full disk access for messages"),
    p(
      "Reading your Messages history means reading `~/Library/Messages/chat.db`, which macOS opens only for an app with Full Disk Access. Grant it to your terminal (Terminal, iTerm, Visual Studio Code…), **not** to Messages, under *System Settings › Privacy & Security › Full Disk Access*, then restart the terminal. Saturn names the right app when access is missing. Sending a text and finding group chats don't need it.",
    ),
    h3("notifications"),
    p(
      "The first alert appears under \"Script Editor\", the built-in notifier Saturn calls. Run `/notify test` once to grant the permission macOS asks for. `notify.menubar: true` (off by default) adds a menu bar icon that lists what's pending; its \"Quit Saturn…\" stops the agent and cancels every notification.",
    ),
    note(
      "What isn't built yet, said plainly: mail is drafted, never sent; every fact Saturn learns still needs your accept; and the macOS permission dialogs name your terminal, not Saturn.",
    ),
  ],
};

export const mcp: DocPage = {
  slug: "mcp",
  title: "mcp servers",
  summary:
    "Connect any Model Context Protocol server from config.yaml. Its tools face the same gate as everything else and never set their own risk tier.",
  group: "reference",
  blocks: [
    p(
      "Plug in any [Model Context Protocol](https://modelcontextprotocol.io) server (stdio, HTTP, or SSE) by declaring it in `config.yaml`. Its tools register as `mcp_<server>_<tool>` and join the agent behind the same approval gate as the built-ins. `/mcp` shows connection status and the tools each server added, and `/mcp reload` applies a config edit without restarting.",
    ),
    code(
      "mcp:\n  connect_timeout: 20\n  call_timeout: 60\n  servers:\n    github:\n      command: npx\n      args: [\"-y\", \"@modelcontextprotocol/server-github\"]\n      env:\n        GITHUB_PERSONAL_ACCESS_TOKEN: ${GITHUB_TOKEN}\n    internal-docs:\n      url: https://mcp.example.com/mcp\n      headers:\n        Authorization: Bearer ${EXAMPLE_TOKEN}\n      risk: read_only",
      "config.yaml",
    ),
    kv(
      ["`transport`", "`stdio` | `http` | `sse`. Optional: inferred from `command` (stdio) or `url` (http)."],
      ["`command` / `args` / `env`", "stdio: the server process to spawn"],
      ["`url` / `headers`", "http/sse: the remote endpoint"],
      ["`risk`", "the default tier for the server's tools. Omitted or invalid means `destructive` (always asks). This is your trust declaration: the server's own annotations never drive the gate. To set one tool: `/policy risk <tool> <tier> --save`."],
      ["`enabled: false`", "keep the entry but skip the connection"],
    ),
    h2("trust rules"),
    ul(
      "Remote tools always ask until you lower their tier. A server's own \"read-only\" claim is never trusted; `/mcp` shows it as a hint only.",
      "Their results, error text included, are untrusted input and pass through the injection quarantine.",
      "Every remote (HTTP/SSE) call is a recorded egress event. A stdio server is a local process Saturn can't see inside, so each call to one is recorded as `untracked`.",
      "Under `/policy airgap on`, remote calls refuse, and every MCP call asks you first, even with its tier lowered or the gate open. A headless run refuses them.",
      "At the gate, an MCP tool's arguments render full-width, and a secret in them warns inline.",
      "`${VAR}` in `url`, `args`, `env`, and `headers` expands from your environment or `.env`, so secrets never sit in the config file.",
    ),
    note(
      "A server that misses `connect_timeout` at startup is reported and skipped. A call that runs past `call_timeout` fails cleanly, and the answer reports it like any other failed call.",
    ),
  ],
};

export const knowledge: DocPage = {
  slug: "knowledge",
  title: "workspace, memory & documents",
  summary:
    "The working folder and /add-dir, SATURN.md standing instructions, hooks, layered memory with its review queue, the local knowledge base, /undo, and sessions.",
  group: "reference",
  blocks: [
    h2("the working folder"),
    p(
      "Saturn works in the folder you launch it from, the way a coding agent works in a repo. The file tools, the shell, `/undo`, `/init`, and the folder's `SATURN.md` all work there. Launched from `~`, your home folder is the workspace. The tools can't reach anything outside it on their own: `/add-dir <folder>` makes another folder reachable for the session, and `/rm-dir` takes it away. Writes and shell commands there still face the gate.",
    ),
    code(
      "/add-dir ~/Desktop     reach ~/Desktop for this session\n/add-dir               list the working folder and every added folder\n/rm-dir ~/Desktop      stop reaching it",
      "commands",
    ),
    h2("standing instructions"),
    p(
      "`~/.saturn/SATURN.md` loads every turn: your tone, your rules (\"always metric\", \"never draft to my boss without asking\"). A `SATURN.md` in the working folder adds that folder's own instructions, and wins where the two conflict. `/init` surveys the working folder and drafts one. `/init --force` redrafts it. `SATURN_HOME` moves `~/.saturn`.",
    ),
    h2("hooks"),
    p(
      "`~/.saturn/hooks.yaml` runs your own shell commands at four moments: `turn-start`, `turn-end`, `before-write`, and `after-write`. Each command gets the details in its environment (`SATURN_QUERY`, `SATURN_ANSWER`, `SATURN_FILE`, `SATURN_TOOL`, …) and as JSON on stdin. A `before-write` hook that exits non-zero blocks the write, and the answer says so. A mistake in the file is named at startup instead of silently skipped.",
    ),
    code(
      "turn-end:\n  - command: ~/bin/log-answer.sh\n    timeout: 5\nbefore-write:\n  - ~/bin/refuse-outside-drafts.sh     # a non-zero exit blocks the write\nafter-write:\n  - git -C ~/notes add -A",
      "~/.saturn/hooks.yaml",
    ),
    p(
      "Hooks are your commands, so they run without the gate and aren't the agent's egress. That's why the file tools refuse to write `hooks.yaml`.",
    ),
    h2("memory"),
    p(
      "Memory is one markdown file in six layers, persisted across sessions and yours to grep and edit. `remember` stores a fact (it asks first), and `recall` reads facts back.",
    ),
    kv(
      ["user", "who you are, your preferences and constraints. Loaded every turn."],
      ["commitments", "open items with a due date. Loaded every turn."],
      ["memo", "dated notes. The last five load every turn."],
      ["agent", "what Saturn learned about this machine. Loaded when it matches the request."],
      ["entities", "the people, projects, places, and shorthand in your life. Loaded when it matches."],
      ["negative", "what not to do again. Loaded when it matches."],
    ),
    p(
      "Everything loads under one cap (`memory.context_cap`, 4,000 characters), and the block names any fact that didn't fit instead of silently dropping it. Every fact carries its provenance: who said it (you, or inferred), the run it came from, and when it was last used.",
    ),
    h3("learning goes through review"),
    p(
      "Nothing is written without your accept. During a session Saturn queues candidates: your mid-task corrections, gate denials, the compaction summary, and, unless you turn it off, the model's own proposals from the transcript. `/memory review` shows each one as a diff line and keeps it only on your `y`. The review also runs at `/quit` when anything is pending.",
    ),
    code(
      "/memory                     every fact, grouped by layer, with its #id\n/memory list <layer>        one layer\n/memory add <fact>          save a fact (--layer, --replaces <n>, --sens <mark>)\n/memory edit <n> <text>     rewrite fact n in place\n/memory forget <n>          delete fact n\n/memory why <n>             provenance: who said it, the run it came from, last use\n/memory review              accept or skip the queued candidates\n/memory stale               facts unmatched for memory.stale_days (flagged, never auto-deleted)",
      "commands",
    ),
    p(
      "`--replaces <n>` retires the old fact so a correction never sits beside it. `--sens <mark>` marks a fact sensitive: it's withheld from any prompt bound for a remote inference host.",
    ),
    h2("documents (rag)"),
    p(
      "Ingest PDF, text, markdown, HTML, CSV, and Word (`.docx`) files into a local knowledge base the agent searches with `search_knowledge_base`. Every launch syncs the documents folder on its own. Embeddings come from the tier's embedder (`qwen3-embedding:8b`), which the first `/docs add` offers to pull. Retrieved passages pass through the injection quarantine.",
    ),
    code(
      "/docs                  list the ingested documents\n/docs add <path>       copy a file into the knowledge base and embed it\n/docs remove <name>\n/docs rebuild          re-embed everything",
      "commands",
    ),
    p(
      "To read a single PDF or Word file, you don't need the knowledge base: `read_file` and `@file` read them directly. The tuning knobs (`rag.chunk_size`, `rag.chunk_overlap`, `rag.k`) live in `config.yaml`, and a chunking change re-embeds on the next sync.",
    ),
    h2("undo"),
    p(
      "Every write, edit, move, and delete is snapshotted first. `/undo` reverts the file changes of the last turn that wrote anything: a created file is deleted, an edited one restored, a moved or trashed one moved back. Each `/undo` steps one turn further back, and `/undo list` shows what can be reverted. Shell effects aren't undoable, and the conversation isn't rewound.",
    ),
    h2("sessions"),
    p(
      "Conversations autosave after every turn and on `/quit`. `/resume` continues the last one; `/resume save [name]` names one, `/resume list` lists them, and `/resume <name>` restores one. Sessions are plain `.json` files under `database/sessions/`. Long histories compact on their own once the context window fills past `runtime.compact_threshold`. `/clear` starts fresh without touching memory, documents, or the trace.",
    ),
  ],
};

export const observability: DocPage = {
  slug: "observability",
  title: "observability & replay",
  summary:
    "/trace: the drill-down of any recorded run, why it chose what it did, exactly what the model was sent, exports, and offline replay.",
  group: "reference",
  blocks: [
    p(
      "Every run is recorded to a local trace database (`database/db.sqlite`). `/trace` expands one into the full replay the live rail abbreviates: the query, every step of the loop with its timing, the checklist if the agent wrote one, the agent's reasoning and tool choices at each pass, each tool call with its output, every gate decision, and, last, the recorded answer. It's the execution log, not a reprint of the answer.",
    ),
    table(
      ["command", "shows"],
      ["`/trace`", "the last run's drill-down; `/trace #id` any run; `/trace -l [n]` lists runs"],
      ["`/trace why [#id]`", "why it did what it did: the checklist, each pass's thought and tool choice, and the evidence the answer was built from"],
      ["`/trace source [n]`", "the full material behind source `n` of the last answer"],
      ["`/trace invoke [#id]`", "every model call's input and output, with timing and tokens; `--full` shows whole messages, exactly what your machine sent (`/trace context` is the same view)"],
      ["`/trace export [#id]`", "write the run's complete record as JSON to `logging/exports/` (`-o <path>` to choose)"],
      ["`/trace replay <file>`", "re-render an exported record, offline"],
      ["`/trace on|off|full`", "live rail verbosity; recording is always on"],
    ),
    h2("the export record"),
    p(
      "`/trace export` (or headless `--export FILE`, or `-q`, which exports automatically) writes one self-contained JSON file: every event, every tool call and its result, every model call, and every human gate decision. `saturn --replay <file>` renders it anywhere, offline, with no database and no models. You can hand someone a record of exactly what the agent did, and they can replay it.",
    ),
    code("saturn --replay logging/exports/run_1.json", "offline replay"),
    h2("live, while it runs"),
    ul(
      "The rail shows each tool call with a one-line result preview, the agent's thought before a call as a leaf under its row, and every gate decision. An auto-approved call doesn't print a gate row.",
      "The status bar carries the context-fill meter, tok/s, the egress count, and GPU and memory use. The receipt under each answer is the turn's trust summary.",
      "The rail fails soft: a display bug prints as one line, the run stays recorded, and the answer still arrives.",
    ),
  ],
};

export const headless: DocPage = {
  slug: "headless",
  title: "headless & the cli",
  summary:
    "saturn -p and -q for scripts and pipes, --json, --export, --yolo, --replay, and what the gate does when no human is present.",
  group: "reference",
  blocks: [
    table(
      ["flag", "does"],
      ["`-p, --prompt QUERY`", "run one query headlessly and print the answer to stdout"],
      ["`-q, --query QUESTION`", "the pipe-friendly spelling: only the answer on stdout; progress and a `recorded:` replay line on stderr; the run auto-exports"],
      ["`--json`", "with `-p`: a structured JSON result instead of the bare answer"],
      ["`--export FILE`", "with `-p` or `-q`: write the run's export record to FILE after the turn"],
      ["`--yolo`", "open the approval gate for the whole run, the same as `/policy open`"],
      ["`--replay FILE`", "render an exported run record offline, then exit"],
      ["`--version`", "print the version"],
    ),
    p(
      "The CLI is strict: an unknown flag or an invalid combination (`-p` with `-q`, `--json` with `-q`, `--export` without a query) exits 2 instead of silently launching the chat loop.",
    ),
    code(
      "saturn -p \"what changed in local LLMs this week?\"\ngit diff | saturn -p \"review this change\"\nsaturn -q \"summarize notes.md\" > summary.txt\nsaturn -p \"...\" --json --export run.json",
      "examples",
    ),
    h2("-p vs -q"),
    p(
      "Both run the same turn: same loop, same gate, same trace recording. `-p` prints the answer. With `--json` it prints `status`, `query`, `answer`, `plan`, `tools_called`, `tool_events`, a `gates` record of which calls were prompted and denied, `documents_retrieved`, `iterations`, `context_tokens`, `tok_per_sec`, `duration_s`, `run_id`, and `version`. `-q` puts only the answer on stdout, sends progress to stderr, and exports the run so the closing `recorded: saturn --replay <file>` line names a file that actually replays. A completed run exits 0. An error exits 1, as JSON with `status: \"error\"` under `--json`.",
    ),
    h2("the gate with no human present"),
    p(
      "Read-only tools run freely. Gated calls are denied by default, because nobody is at the gate to say yes, and the answer says what was denied. `--yolo` opens the gate for the run, with three exceptions it never covers:",
    ),
    ul(
      "`send_message`: a send to another person always needs a human to read it first;",
      "under the air-gap, a shell command, a shortcut, or an MCP call, since nobody is there to check whether it touches the network;",
      "a `web_extract` URL the gate held: one the model composed after reading outside content, or a private address you didn't type.",
    ),
    p(
      "Each denial is explained on stderr. `ask_user` gets no answer headless, and the model has to say what stays unknown. Piped stdin attaches to the turn when something arrives within a second, and is scanned like an `@file` attachment.",
    ),
    note(
      "The home page's gate figure is a real headless run: the model reached for `write_file`, the gate denied it, and `notes.md` was never written.",
    ),
  ],
};

export const commands: DocPage = {
  slug: "commands",
  title: "slash commands",
  summary: "Every command. /help shows the everyday five, /help --all shows the rest, and every command takes --help.",
  group: "reference",
  blocks: [
    p(
      "`/help` lists the everyday five: `/memory`, `/policy`, `/trace`, `/help`, `/quit`. `/help --all` opens with the trust map (posture `/policy` · activity: the receipt and `/trace` · record: `/trace export` and replay) and lists every command by theme. `/<command> --help` details any one. `--help` works as the first or last argument; in the middle it's ordinary data, so `/memory add …` can store a fact that mentions it. Removal verbs are interchangeable everywhere: `remove` / `rm` / `delete` / `del` / `forget` / `drop`.",
    ),
    table(
      ["command", "does"],
      ["`/help [--all | cmd]`  (`/?`, `/h`)", "the everyday commands, every command, or one in detail"],
      ["`/memory`  (`/mem`)", "see, add, edit, forget, and review layered memory; `why <n>`, `stale`"],
      ["`/policy`", "your trust settings: `risk`, `allow`, `shortcut`, `open`, `egress`, `airgap`"],
      ["`/trace`", "inspect runs: `why`, `source`, `invoke`, `export`, `replay`, `on|off|full`"],
      ["`/quit`  (`/exit`, `/q`)", "exit, running `/memory review` first if candidates are pending (`--no-review` skips it)"],
      ["`/clear`", "start a fresh conversation"],
      ["`/resume`  (`/continue`)", "sessions: resume the autosave; `save [name]`, `list`, `<name>`"],
      ["`/copy`", "copy the last answer to the clipboard (macOS)"],
      ["`/add-dir [path]` · `/rm-dir <path>`", "reach another folder for this session · stop reaching it"],
      ["`/docs`  (`/documents`)", "the knowledge base: `add <path>`, `remove <name>`, `rebuild`"],
      ["`/init [--force]`", "survey the working folder and draft `SATURN.md`"],
      ["`/undo [list]`", "revert the last turn's file changes"],
      ["`/models`  (`/model`)", "the model page: your hardware, the tiers priced against it; `use <id>`, `embedder <id>`, `list`"],
      ["`/tools`", "the registered tools and their risk tiers"],
      ["`/mcp [list | reload]`", "MCP server status and the tools they add"],
      ["`/config`", "view or edit `config.yaml`; `/config <key> [value] [--session]`; `/config reload`"],
      ["`/notify`", "scheduled notifications: list, `cancel <id>`, `test`, `icon [start|stop]`"],
      ["`/update [--check]`", "self-update (git pull at the install root); your data is never touched"],
    ),
    h2("at the prompt"),
    kv(
      ["`!command`", "run a shell command yourself, without the agent; the output attaches to your next message"],
      ["`@file` · `@clipboard`", "attach a file, or what's on the clipboard"],
    ),
  ],
};

export const configuration: DocPage = {
  slug: "configuration",
  title: "configuration & models",
  summary:
    "config.yaml: the four model tiers, /models, runtime and trust knobs, the memory, web, RAG, MCP, and shell sections, and which settings persist.",
  group: "reference",
  blocks: [
    p(
      "Everything lives in one file, `config.yaml`, seeded on first run from the tracked template `config.default.yaml`. A clone keeps it beside the install, and pipx/uv installs keep it in `~/.saturn`. `/config <dotted.key> <value>` sets most of it live. Edits persist by default, and `--session` keeps one for this session only. Trust keys are the exception (see below).",
    ),
    h2("tiers"),
    p(
      "Each tier binds one chat model, used for the agent's calls and the background work (compaction, the memory review, `/init`), plus an embedder. Swapping hardware is a one-line `active_tier` change.",
    ),
    code(
      "active_tier: 4b\n\ntiers:\n  4b:\n    model: \"qwen3.5:4b\"\n    embedder: qwen3-embedding:8b\n  9b:\n    model: \"qwen3.5:9b\"\n    embedder: qwen3-embedding:8b\n  27b:\n    model: \"qwen3.8:27b\"\n    embedder: qwen3-embedding:8b\n  35b:\n    model: \"qwen3.6:35b\"\n    embedder: qwen3-embedding:8b",
      "config.yaml",
    ),
    table(
      ["tier", "model", "context window", "sized for"],
      ["`4b`", "`qwen3.5:4b`", "32k", "an 8 GB machine; the install default"],
      ["`9b`", "`qwen3.5:9b`", "64k", "a 16 GB Mac"],
      ["`27b`", "`qwen3.8:27b`", "64k", "a 32 GB Mac"],
      ["`35b`", "`qwen3.6:35b`", "128k", "36 GB or more of unified memory"],
    ),
    p(
      "The ladder is a recommendation, not a gate. Any Ollama model with native tool-calling binds with `/models use <id>`. `capabilities:` declares each model's context window, and an unknown model falls back to an 8,192-token window. `/config runtime.num_ctx <size|auto>` overrides every window at once. Ollama is the only backend.",
    ),
    h2("/models"),
    p(
      "The model page reads your machine (on Apple silicon: the chip, its GPU cores, unified memory, and memory bandwidth) and prices every tier against it: weights, the memory it needs at its window, an estimated decode speed, and whether it's pulled. The recommendation is the largest tier that fits **and** decodes at 10 tok/s or better. A tier that fits but would crawl reads `fits · slow` and is never the default. Below the ladder come the other models you've pulled; one that can't call tools is marked and can't be picked. The first launch runs this page.",
    ),
    code(
      "/models                  the page, then pick a row (Enter takes the recommendation)\n/models list             the page only\n/models use <id>         run any Ollama tool-calling model on this tier\n/models embedder <id>    switch the embedding model (re-embeds the corpus)",
      "commands",
    ),
    p(
      "A pick whose model isn't pulled asks first (y/N, default no) and switches only after the pull succeeds. Every switch persists to `config.yaml`; `--session` applies it live only.",
    ),
    h2("runtime"),
    table(
      ["key", "default", "meaning"],
      ["`max_iterations`", "16", "agent passes that may run tools per turn"],
      ["`think` / `think_budget`", "adaptive / 4096", "when a pass may think, and how many tokens it may spend"],
      ["`auto_approve`", "read_only", "tools at or below this tier run without asking (trust key)"],
      ["`num_ctx`", "null (auto)", "Ollama context window; null uses each model's declared window"],
      ["`llm_timeout`", "120", "read timeout per model call, so a wedged daemon can't hang a turn"],
      ["`keep_alive`", "30m", "how long Ollama keeps the model loaded between requests"],
      ["`prime`", "true", "re-send the stable prompt prefix between turns so the next turn prefills only what's new"],
      ["`auto_compact` / `compact_threshold`", "true / 0.85", "fold older turns into a summary once the window fills"],
      ["`citations`", "true", "the numbered Sources list under an answer"],
      ["`airgap`", "false", "block and record every network exit (trust key)"],
      ["`quarantine`", "gate", "`off` / `warn` / `gate` for untrusted tool output (trust key)"],
      ["`receipt`", "true", "the trust segment on the per-answer receipt"],
      ["`grant_scope`", "task", "how long a gate `a` grant lives: `task` / `session` / `persist` (trust key)"],
    ),
    h2("other sections"),
    kv(
      ["`memory.context_cap` / `stale_days` / `review_llm`", "4000 / 90 / true: the memory block's budget, when an unmatched fact is flagged stale, and whether the review asks the model for proposals"],
      ["`web.max_results`", "results per `web_search` (default 5); the backend is fixed and keyless"],
      ["`rag.chunk_size` / `chunk_overlap` / `k`", "1000 / 150 / 6; chunking changes force a re-embed"],
      ["`mcp.servers` / `connect_timeout` / `call_timeout`", "see [mcp servers](/docs/mcp)"],
      ["`shell.timeout` / `shell.env_scrub`", "60 s per command; secret-shaped variable names stripped from children (trust key)"],
      ["`notify.menubar`", "false: start the menu bar icon with each launch (macOS)"],
      ["`paths.*`", "database, documents, cache, memory, sessions, snapshots, permissions, exports"],
    ),
    h2("what persists"),
    ul(
      "Ordinary keys set with `/config` persist to `config.yaml` by default; `--session` keeps the change for this session.",
      "Trust keys (`runtime.auto_approve`, `runtime.airgap`, `runtime.quarantine`, `runtime.grant_scope`, and `shell.env_scrub`) and the `/policy` toggles are session-only unless you pass `--save`. A loosened posture is never written to disk silently.",
      "`/policy risk --save` overrides, the shell prefix allowlist, and the Shortcuts allowlist persist in `database/permissions.json`. `/policy allow <prefix>` always persists; a gate `a` grant follows `grant_scope`.",
      "The live `config.yaml` is user data that git doesn't track, so saved settings never dirty the repo or break `/update`.",
    ),
    note(
      "Environment variables use the `SATURN_` prefix (`SATURN_HOME`, `SATURN_DEBUG`, …), standing instructions live in `SATURN.md`, and a tier binds one `model:`. A `config.yaml` with an old `roles:` block is refused with the exact line to write instead.",
    ),
  ],
};
