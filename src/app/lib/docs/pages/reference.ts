import { type DocPage, code, h2, h3, kv, note, p, table, ul } from "../types";

export const tools: DocPage = {
  slug: "tools",
  title: "tools",
  summary:
    "All 47 built-in tools and their risk tiers, the toolkits you can turn off, and what each tool does: files, shell, web, knowledge, memory and skills, the loop's own tools, and the macOS apps.",
  group: "reference",
  blocks: [
    p(
      "Every capability is a tool call you can watch in the rail. Each one faces the same approval gate, runs locally where it can, and lands in a trace you can replay. Reading runs without asking; anything that changes or sends something asks first. `/tools --all` prints the live registry with each tool's tier, and `/policy risk <tool> <tier> [--save]` overrides a tier, except for `run_shell`, `run_shortcut`, `send_message`, `create_skill`, `add_document`, and `remove_document`, which always keep theirs. **untrusted** marks a tool whose output is outside content: it passes through the injection quarantine.",
    ),
    h2("toolkits"),
    p(
      "Tools come in toolkits, and any toolkit you don't use can be turned off. A toolkit that is off is unbound: the model isn't shown its tools and can't call them, the prompt is smaller, and Saturn can never reach that app. Ask for something it would do (\"what's on my calendar tomorrow?\") and Saturn says the toolkit is off and names the command that turns it back on. Everything starts on.",
    ),
    code(
      "/tools                      the toolkits: how many tools, on or off, what each is for\n/tools mail                 one toolkit's tools, each with its risk tier\n/tools off messages mail    turn toolkits off (saved to config.yaml)\n/tools on messages          turn one back on\n/tools off shell --session  for this session only\n/tools --all                every tool in one list, with its toolkit",
      "commands",
    ),
    p(
      "The toolkits are `files`, `web`, `shell`, `knowledge`, `notes`, `calendar`, `mail`, `contacts`, `reminders`, `messages`, `shortcuts`, `desktop` (the browser tab and the Finder selection), `notifications`, and `skills`. The core (the checklist, `ask_user`, memory, the calculator, and the clock) is always on. The choice is saved under `toolkits:` in `config.yaml`, and a change applies to your next request. Turning a toolkit on never changes what the gate asks about: its tools keep their tiers. An MCP server is listed as a toolkit too, and turned on and off from `/mcp`.",
    ),
    h2("files"),
    table(
      ["tool", "tier", "does"],
      ["`read_file`", "read_only · untrusted", "read a file; PDF, Word (`.docx`), and Excel (`.xlsx`) come back as text. Other binary files are refused by name."],
      ["`write_file`", "side_effecting", "create, replace, or append to a file (the gate shows a diff)"],
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
    h2("knowledge, memory, skills"),
    table(
      ["tool", "tier", "does"],
      ["`search_knowledge_base`", "read_only · untrusted", "retrieve passages from your ingested documents; with no query, list the documents it holds"],
      ["`add_document` · `remove_document`", "side_effecting", "add a file to the [knowledge base](/docs/knowledge#documents-rag), or move one of its documents to the Trash. Both always ask, and headless runs refuse them."],
      ["`remember`", "side_effecting", "store a durable fact in a memory layer. It asks first, unless you typed the fact yourself (see [memory](/docs/knowledge))."],
      ["`recall`", "read_only", "read durable facts back"],
      ["`create_skill`", "side_effecting", "save a procedure as one of your [skills](/docs/skills). You read the whole skill first, and it always asks."],
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
      ["`create_calendar_event` · `update_calendar_event`", "side_effecting", "add an event; move, rename, relocate, or rewrite the notes of one"],
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
      ["Calendar", "list events (`today`, `tomorrow`, `next monday`, and `in 1 week` work); create one; move, rename, or delete one, or replace its notes. A repeating event changes only as a whole series, and you're told when attendees may be notified. A bare time like \"3pm\" keeps an event on its own day. Reading every calendar takes several seconds, so narrowing to named calendars is faster."],
      ["Mail", "list, search, and read; `draft_mail` opens an **unsent** new message, and `reply_mail` an **unsent** reply in the right thread with the original quoted (`reply_all` addresses everyone on it). You press Send. `update_mail` marks read/unread, flags, moves, or trashes a whole list of messages in one approval. Listings say whether you've replied."],
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
      "`read_messages` finds one person's messages however far back they go, or reads one whole group chat with everyone named. A text search covers the newest 4,000 messages and says so when that isn't the whole history.",
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
      "What isn't built yet, said plainly: mail is drafted, never sent; a reminder can't repeat or trigger at a place; and the macOS permission dialogs name your terminal, not Saturn.",
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
    "The working folder and /add-dir, SATURN.md standing instructions, hooks, layered memory (what you tell it, the first-run questions, and the review queue), the local knowledge base, /undo, and sessions.",
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
      "Memory is one markdown file in six layers, persisted across sessions and yours to grep and edit. `remember` stores a fact and `recall` reads facts back. A fact you state yourself is kept without a prompt (below); any other `remember` asks first.",
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
      "Everything loads under one cap (`memory.context_cap`, 4,000 characters), and the block names any fact that didn't fit instead of silently dropping it. Every fact carries its provenance: who said it (you, or inferred), the run it came from, and when it was last used. Each fact reaches the model with the day it was saved: when two disagree the later one wins, and what you say in the conversation outranks both.",
    ),
    h3("what you tell it"),
    p(
      "Say \"I'm vegetarian\", \"Petra is my manager\", or \"never book anything before 10am\" and Saturn keeps it with no approval prompt, then says so after the answer: `remembered #12: … — you said it · /memory remove 12 undoes it`. That happens only when the fact's words come from one sentence you typed and stated (a question doesn't count, and a \"not\" has to stay where you put it), and nothing from outside (a web page, mail, a file, an attachment) has entered the conversation. Once something has, every later fact asks, until `/clear`. Otherwise the prompt appears and says why. The check proves you typed the words, not that the fact means what you meant, so read the line after the answer. `/memory` marks these facts `said`. `memory.auto_learn: false` turns it off, and `saturn -p` / `-q` never do it.",
    ),
    ul(
      "A rule you give (\"never…\", \"from now on…\") is filed where it loads every turn.",
      "A new fact names the stored one it may contradict, after the answer, at the prompt, and on `/memory add`: `similar: #3 \"I live in Paris\" — /memory remove 3 if that is no longer true`. Nothing is removed for you.",
      "A recognisable secret (a card number, a Social Security number, a password, a PIN, an API key, a private key) is refused wherever a fact is written, and Saturn says why. It's a net for the common shapes, not a guarantee.",
    ),
    h3("first run"),
    p(
      "Right after the first launch picks your model, Saturn offers three quick questions: what to call you, what you do, and anything it should never do. Enter starts them, `n` skips, and the offer is made once. Each answer is saved straight to memory in your words, with no model call, so the next answer already knows you. A \"never…\" answer becomes one rule per `;`, filed where rules load every turn. An answer that looks like a password or a card number is refused and asked again.",
    ),
    p(
      "`/memory setup` asks those three and two more: the people you mention most, and what you want help with. It shows your current answers: Enter keeps one, a new answer replaces it, and people and rules are added to. `/memory` marks these facts `setup`. An install that already has memories gets one line about `/memory setup` instead of the offer.",
    ),
    h3("learning goes through review"),
    p(
      "Everything else Saturn learns waits for your accept. During a session it queues candidates: your mid-task corrections, gate denials, the compaction summary, and the model's own proposals from your words and its answers (never a tool result directly; `memory.review_llm: false` turns these off). A proposal from a conversation outside content entered says so. `/memory review` shows each one as a diff line and keeps it only on your `y`. The review also runs at `/quit` when anything is pending.",
    ),
    code(
      "/memory                     every fact, grouped by layer, with its #id\n/memory list <layer>        one layer\n/memory add <fact>          save a fact (--layer, --replaces <n>, --sens <mark>)\n/memory edit <n> <text>     rewrite fact n in place\n/memory remove <n>          delete fact n\n/memory setup               the first-run questions, plus two more\n/memory why <n>             provenance: who said it, the run it came from, last use\n/memory review              accept or skip the queued candidates (--no-llm skips the model's proposals)\n/memory stale               facts unmatched for memory.stale_days (flagged, never auto-deleted)",
      "commands",
    ),
    p(
      "`--replaces <n>` retires the old fact so a correction never sits beside it. `--sens <mark>` marks a fact sensitive: it's withheld from any prompt bound for a remote inference host.",
    ),
    h2("documents (rag)"),
    p(
      "Ingest PDF, text, markdown, HTML, CSV, and Word (`.docx`) files into a local knowledge base the agent searches with `search_knowledge_base`. Every launch syncs the documents folder on its own. Embeddings come from the tier's embedder (`qwen3-embedding:8b`), which the first `/docs add` offers to pull. Retrieved passages pass through the injection quarantine.",
    ),
    p(
      "You can also just ask. \"Add notes.md to my knowledge base\" copies the file in and embeds it, searchable straight away; \"remove notes.md from my knowledge base\" moves the knowledge base's copy to the Trash. Both always ask first, whatever `/policy` says, because a document's text reaches the model on every later search that matches it. The prompt warns when the file holds text that reads like instructions. Only a file in a folder Saturn can reach can be added, and headless runs refuse both. \"What's in my knowledge base?\" lists the documents.",
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

export const skills: DocPage = {
  slug: "skills",
  title: "skills",
  summary:
    "Your own procedures, written once in markdown and run by typing their name. Saturn can draft one for you, and it always asks before it saves.",
  group: "reference",
  blocks: [
    p(
      "A skill is a procedure you write once in markdown and run by typing its name: `/weekly-review`, or `/weekly-review focus on work` to point it at something. Saturn follows its steps for that one request, with no extra model call. Every action a skill leads to still asks for approval as usual: a skill never changes what asks first. `saturn -p \"/weekly-review\"` runs one headless.",
    ),
    h2("where they live"),
    code(
      "~/.saturn/skills/<name>/SKILL.md      or  ~/.saturn/skills/<name>.md\n<folder>/.saturn/skills/<name>/SKILL.md  or  <folder>/.saturn/skills/<name>.md",
      "paths",
    ),
    p(
      "It's the same file shape Claude Code uses, so skills you already have work. A working folder's own `.saturn/skills` wins over a global skill of the same name. The name is the file name (the folder's, for `SKILL.md`): lowercase letters, digits, and hyphens. A skill named like a built-in command (`/help`, `/memory`, …) never runs, and startup and `/skills` say so. Skills are read from disk each time, so an edit runs without a restart.",
    ),
    code(
      "---\nname: weekly-review\ndescription: Friday review — what got done, what slipped, what is next\n---\n1. List this week's calendar events and the reminders completed or overdue.\n2. Read my note titled \"This week\" if there is one.\n3. Answer in three short lists: done, slipped, next week.",
      "~/.saturn/skills/weekly-review/SKILL.md",
    ),
    p(
      "The frontmatter takes `name` and a one-line `description`. Other keys (`allowed-tools`, `model`, …) are ignored, and `/skills show` names them. Saturn reads only `SKILL.md` and runs nothing else in the folder. A body past 6,000 characters is cut, with a note saying so.",
    ),
    h2("commands"),
    code(
      "/skills                 list your skills, where they live, and who wrote each\n/skills show <name>     print one\n/skills create <name>   write a template to ~/.saturn/skills/<name>/SKILL.md\n/skills delete <name>   move one to the Trash (asks first)\n/<name> [request]       run a skill\n/<name> --help          show it instead of running it",
      "commands",
    ),
    h2("saturn can write one"),
    p(
      "Say \"save that as a skill called weekly-review\" and Saturn drafts it with `create_skill`. The prompt shows the complete skill, every step, and it's saved only on your yes. That prompt always appears, whatever `/policy` says: there's no always-allow for it, and `saturn -p` never saves a skill. A drafted skill goes in `~/.saturn/skills` and is at most 3,000 characters, so you can read all of it before you approve. `/skills` shows which skills Saturn drafted, and `/undo` takes a save back.",
    ),
    note(
      "Saturn's file tools never write the skills folders, even approved: a skill is followed as your own words. Skills run only when you type their name; Saturn doesn't pick one on its own. Drafting is reliable on the 9b and up; the 4b tends to carry the steps out instead of saving them.",
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
      ["`/trace why [#id]`", "why it did what it did: the checklist, each pass's thought and tool choice, the evidence the answer was built from, and when each pass thought"],
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
      "The rail shows each tool call with a one-line result preview, the agent's words before a call as a leaf under its row, and every gate decision. An auto-approved call doesn't print a gate row.",
      "A pass that thought shows `thought 1.8s` on its row and a leaf with why it thought and the opening of the thought. A thought that was cut, stopped, or came back empty says so, and the pass answered without it.",
      "The status bar carries `thinking 3s` while a thought is in flight (Esc stops it), the context-fill meter, tok/s, the egress count once it's above zero, and the machine: `gpu 31% · mem 21.4/36 GB`, GPU utilisation and unified memory in use, sampled every two seconds. Memory turns yellow at 85%.",
      "The receipt under each answer keeps what the bar showed once it's gone: time, passes, tools, tok/s, and the turn's thinking time, followed by the turn's trust summary.",
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
      ["`--yolo`", "open the approval gate for the whole run, headless or interactive, the same as `/policy open`"],
      ["`--replay FILE`", "render an exported run record offline, then exit (0 if it rendered, 1 if not)"],
      ["`--version`", "print the version"],
    ),
    p(
      "The CLI is strict: an unknown flag or an invalid combination (`-p` with `-q`, `--json` with `-q`, `--export` without a query, `--replay` with a query, an empty `-p \"\"`) exits 2 instead of silently launching the chat loop.",
    ),
    code(
      "saturn -p \"what changed in local LLMs this week?\"\ngit diff | saturn -p \"review this change\"\nsaturn -q \"summarize notes.md\" > summary.txt\nsaturn -p \"...\" --json --export run.json",
      "examples",
    ),
    h2("-p vs -q"),
    p(
      "Both run the same turn: same loop, same gate, same trace recording. `-p` prints the answer. With `--json` it prints `status`, `query`, `answer`, `plan`, `tools_called`, `tool_events`, a `gates` record of which calls were prompted and denied, `documents_retrieved`, `iterations`, `context_tokens`, `tok_per_sec`, `duration_s`, `run_id`, and `version`. `-q` puts only the answer on stdout, sends progress to stderr, and exports the run so the closing `recorded: saturn --replay <file>` line names a file that actually replays. A completed run exits 0. An error exits 1, as JSON with `status: \"error\"` under `--json`. A failed export write also exits 1, after the answer is already out.",
    ),
    h2("the gate with no human present"),
    p(
      "Read-only tools run freely. Gated calls are denied by default, because nobody is at the gate to say yes, and the answer says what was denied. `--yolo` opens the gate for the run, with five exceptions it never covers:",
    ),
    ul(
      "`send_message`: a send to another person always needs a human to read it first;",
      "`create_skill`: saving a skill always shows you the whole skill first;",
      "`add_document` and `remove_document`: changing what the knowledge base holds is refused headless;",
      "under the air-gap, a shell command, a shortcut, or an MCP call, since nobody is there to check whether it touches the network;",
      "a `web_extract` URL the gate held: one the model composed after reading outside content, or a private address you didn't type.",
    ),
    p(
      "Each denial is explained on stderr. `ask_user` gets no answer headless, and the model has to say what stays unknown. Piped stdin attaches to the turn when something arrives within a second, and is scanned like an `@file` attachment.",
    ),
    p(
      "A headless run never learns a fact on its own, since nobody reads a `remembered` line on stdout: a `remember` faces the gate like any other side-effecting call. It never saves a skill either. `saturn -p \"/think <request>\"` runs that request at `deep`, and `saturn -p \"/weekly-review\"` runs your skill, the same as typing either at the prompt.",
    ),
    note(
      "The home page's gate figure is a real headless run: the model reached for `write_file`, the gate denied it, and `notes.md` was never written.",
    ),
  ],
};

export const commands: DocPage = {
  slug: "commands",
  title: "slash commands",
  summary: "Every command. /help lists them all by theme, and every command takes --help.",
  group: "reference",
  blocks: [
    p(
      "`/help` opens with the trust map (posture `/policy` · activity: the receipt and `/trace` · record: `/trace export` and replay) and lists every command by theme. `/help --all` still works and prints the same thing. `/<command> --help` details any one. `--help` works as the first or last argument; in the middle it's ordinary data, so `/memory add …` can store a fact that mentions it. Removal verbs are interchangeable everywhere: `remove` / `rm` / `delete` / `del` / `forget` / `drop`.",
    ),
    table(
      ["command", "does"],
      ["`/help [cmd]`  (`/?`, `/h`)", "every command by theme, or one in detail"],
      ["`/memory`  (`/mem`)", "see, add, edit, remove, and review layered memory; `why <n>`, `stale`, `setup` (the first-run questions)"],
      ["`/skills`", "your own procedures: list them; `show <name>`, `create <name>`, `delete <name>` (to the Trash, asks first)"],
      ["`/policy`", "your trust settings: `risk`, `allow`, `shortcut`, `open`, `egress`, `airgap`"],
      ["`/think [fast | auto | deep]`", "how much Saturn reasons before it answers: bare shows the level and what the last turn's passes did; a level sets it (`--session` for this session only)"],
      ["`/trace`", "inspect runs: `why`, `source`, `invoke`, `export`, `replay`, `on|off|full`"],
      ["`/quit`  (`/exit`, `/q`)", "exit, running `/memory review` first if candidates are pending (`--no-review` skips it)"],
      ["`/clear`", "start a fresh conversation"],
      ["`/resume`  (`/continue`)", "sessions: resume the autosave; `save [name]`, `list`, `<name>`"],
      ["`/copy`", "copy the last answer to the clipboard (macOS)"],
      ["`/add-dir [path]` · `/rm-dir <path>`", "reach another folder for this session · stop reaching it"],
      ["`/docs`  (`/documents`)", "the knowledge base: `add <path>`, `remove <name>`, `rebuild`"],
      ["`/init [--force]`", "survey the working folder and draft `SATURN.md`"],
      ["`/undo [list]`", "revert the last turn's file changes"],
      ["`/models`  (`/model`)", "the model page: your hardware, the tiers priced against it, every other model you've pulled; `use <id>`, `embedder <id>`, `list`"],
      ["`/tools`", "the toolkits: `on|off <toolkit>` (`--session`), `<toolkit>` lists its tools and tiers, `--all` every tool"],
      ["`/mcp [list | reload]`", "MCP server status and the tools they add"],
      ["`/config`", "view or edit `config.yaml`; `/config <key> [value] [--session]`; `/config reload`"],
      ["`/notify`", "scheduled notifications: list, `cancel <id>`, `test`, `icon [start|stop]`"],
      ["`/update [--check]`", "self-update (git pull at the install root); your data is never touched"],
    ),
    h2("at the prompt"),
    kv(
      ["`!command`", "run a shell command yourself, without the agent; the output attaches to your next message"],
      ["`@file` · `@clipboard`", "attach a file, or what's on the clipboard"],
      ["`/think <request>`", "run this one request at `deep`, whatever the level; a level word on its own sets the level instead"],
      ["`/<skill> [request]`", "run one of your skills (`/weekly-review focus on work`); `/<skill> --help` shows it instead. A built-in command's name always wins over a skill's"],
    ),
  ],
};

export const configuration: DocPage = {
  slug: "configuration",
  title: "configuration & models",
  summary:
    "config.yaml: the four model tiers, /models, runtime and trust knobs, the memory, web, RAG, MCP, toolkits, and shell sections, and which settings persist.",
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
      "The model page reads your machine (on Apple silicon: the chip, its GPU cores, unified memory, and memory bandwidth) and prices two ladders against it, the four chat tiers and three `qwen3-embedding` sizes: weights, the memory each needs at its window, an estimated decode speed, and whether it's pulled. The recommendation is the largest tier that fits **and** decodes at 10 tok/s or better. A tier that fits but would crawl reads `fits · slow` and is never the default. Below the ladders come every other model you've pulled, chat models and embedders in separate sections, each with its size, parameter count, and whether it fits. The rows are numbered: pick a chat model to run it on the active tier, or an embedder to switch to it. A chat model that can't call tools reads `no tool calling` and can't be picked. The first launch runs this page.",
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
      ["`max_iterations`", "16", "agent passes per turn; from this pass on no tool call runs, and the model answers from what it has"],
      ["`think`", "auto", "`fast` never thinks, `auto` thinks before it acts (and after an error or a steer), `deep` thinks on every pass; set it with `/think`. The old `off` / `adaptive` / `on` still read, and anything else runs as `auto` with a warning at startup"],
      ["`think_budget`", "1024", "the most tokens one thought may spend before it's cut"],
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
      ["`memory.auto_learn`", "true: keep a fact you state in your own words without asking; `false` makes every `remember` ask. Headless runs never auto-learn"],
      ["`web.max_results`", "results per `web_search` (default 5); the backend is fixed and keyless"],
      ["`rag.chunk_size` / `chunk_overlap` / `k`", "1000 / 150 / 6; chunking changes force a re-embed"],
      ["`mcp.servers` / `connect_timeout` / `call_timeout`", "see [mcp servers](/docs/mcp)"],
      ["`toolkits.<name>`", "true for every toolkit: `false` unbinds that group of tools. `/tools on|off` edits these lines; see [toolkits](/docs/tools#toolkits)"],
      ["`shell.timeout` / `shell.env_scrub`", "60 s per command; secret-shaped variable names stripped from children (trust key)"],
      ["`notify.menubar`", "false: start the menu bar icon with each launch (macOS)"],
      ["`paths.*`", "database, documents, workspace (a fallback only), cache, memory, db_sqlite, sessions, snapshots, permissions, exports"],
    ),
    h2("what persists"),
    ul(
      "Ordinary keys set with `/config` persist to `config.yaml` by default; `--session` keeps the change for this session. A save rewrites the key's existing line in place, comments kept. A setting added to Saturn after your `config.yaml` was written gets its line appended to the end of its section, and nothing else in the file changes. A key Saturn doesn't know is never written.",
      "Trust keys (`runtime.auto_approve`, `runtime.airgap`, `runtime.quarantine`, `runtime.grant_scope`, and `shell.env_scrub`) and the `/policy` toggles are session-only unless you pass `--save`. A loosened posture is never written to disk silently.",
      "`/policy risk --save` overrides, the shell prefix allowlist, and the Shortcuts allowlist persist in `database/permissions.json`. `/policy allow <prefix>` always persists; a gate `a` grant follows `grant_scope`.",
      "The live `config.yaml` is user data that git doesn't track, so saved settings never dirty the repo or break `/update`.",
    ),
    note(
      "Environment variables use the `SATURN_` prefix (`SATURN_HOME`, `SATURN_DEBUG`, …), standing instructions live in `SATURN.md`, and a tier binds one `model:`. A `config.yaml` with an old `roles:` block is refused with the exact line to write instead.",
    ),
  ],
};
