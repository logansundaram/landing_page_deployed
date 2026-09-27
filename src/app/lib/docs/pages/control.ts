import { type DocPage, code, h2, h3, kv, note, p, table, ul } from "../types";

export const plans: DocPage = {
  slug: "plans",
  title: "plans & steering",
  summary:
    "The plan rail is the control surface: review and edit the plan, steer a running turn, write your own plan with /draft, and what a removed step really removes.",
  group: "concepts",
  blocks: [
    p(
      "Every turn starts with a plan: a numbered list of steps, each naming the tool it intends to call. The plan renders live in the rail and advances as the engine executes it one step at a time. It is not a summary — it is the object that drives execution, which is why editing it changes what happens.",
    ),
    h2("pause and edit"),
    p(
      "Press `Esc` on an empty line during a turn (or type `/plan pause`) to stop at the next step boundary and open the plan editor. This works even while the planner is still drafting. `/plan review on` opens the editor at every step boundary.",
    ),
    table(
      ["editor verb", "does"],
      ["`add <label> [::tool]`", "append a step, optionally with an intended tool"],
      ["`edit <id> <label>`", "relabel step #id"],
      ["`tool <id> <name|none>`", "set or clear step #id's intended tool"],
      ["`status <id> <status>`", "set a step's status (pending, done, skipped, …)"],
      ["`move <id> <pos>`", "move step #id to position pos"],
      ["`drop <id>`", "remove step #id"],
      ["`go` / bare Enter", "run the (edited) plan"],
      ["`abort` / `Ctrl+C`", "stop this turn"],
      ["`show` · `help`", "reprint the plan · the editor's own help"],
    ),
    p(
      "A step you remove stays removed — the engine's self-correction cannot resurrect it, and a redraft that keeps bringing it back ends the turn honestly instead of spending the replan budget.",
    ),
    h3("removing a step revokes its effect, not just its wording"),
    p(
      "Dropping a state-changing step at review revokes its target for the rest of the turn: the file it names, or every write for a step that names none. The refusal is checked on the step's description before anything is generated and again on the generated arguments right before the call is emitted, so a redraft cannot re-do the work under a different sentence or a hidden path. Removing a read revokes nothing; a step you merely reworded still runs; the refusal reads as your single-step veto and the rest of the plan continues.",
    ),
    h2("steer a running turn"),
    p(
      "Type a correction while a turn runs and press `Esc`. The correction is recorded into the conversation and the remaining plan is redrafted around your words at the next step boundary — without restarting the turn. If you pressed `Esc` to review and then steered before the boundary, the review is honored first and the correction lands at the following one; several corrections land together, oldest first. A correction that arrives after the turn's last boundary runs as its own next message.",
    ),
    h2("write your own plan — /draft"),
    p(
      "`/draft` opens the same editor with an empty list. Compose the steps by hand, then type your request: the agent executes your plan instead of drafting one. Tool spellings are normalized (`calc` → `calculate`); an unrecognized tool is kept as written and fails closed at execution. Everything downstream is unchanged — per-step reflection, the approval gate, and mid-turn `Esc` review all still apply, so a hand-written plan gets the full safety envelope. `/plan` shows the pending draft; `/draft clear` discards it.",
    ),
    h2("what the engine may add on its own"),
    p(
      "The engine closes gaps between your request and the plan deterministically once every step has run cleanly — reading your words only, never text inside a file or web page:",
    ),
    ul(
      "A workspace file you named that no step acted on gets its missing steps.",
      "A request for a total, average, difference, or comparison that no step computed gets its `calculate` step(s) instead of arithmetic done in the answer's prose.",
      "A request that defers a target to an earlier result (\"read the file it names\") that the plan never followed gets the second hop.",
    ),
    p(
      "The reverse rule is stricter. A state-changing step the engine adds mid-turn, after files or pages have been read, is dropped unless your own words asked for a workspace change and named that target — so text inside a document can never add a write or a shell command to the plan. Steps drafted up front, before anything was read, are exempt.",
    ),
    h2("when it asks instead of guessing"),
    p(
      "When a needed value, choice, or confirmation is missing, the agent pauses mid-run with one question (`ask_user`) and your typed answer resumes the turn. Three deterministic rules gate the interruption: one question per turn; if your request names something the agent can search itself (\"search my notes…\") it searches before asking; and a question whose answer no later step could use is reported in the answer instead of stopping the run. A question you asked for in your own words (\"ask me which…\") always runs. When a question is refused, the plan is redrafted around it.",
    ),
    h2("bounds and honest endings"),
    ul(
      "`runtime.max_iterations` (default 16) caps execute passes per turn; every early landing is disclosed in the answer's incidents block.",
      "A turn that issues the exact same tool call with the same arguments three times is stopped as a disclosed \"step is looping\" incident; a legitimate second read still runs.",
      "A plan step naming a tool that doesn't exist fails closed as a disclosed error the engine can replan around — it never silently degrades into the model answering from its own knowledge.",
    ),
    code(
      "/plan                 show the plan (+ any pending draft)\n/plan review [on|off] open the editor at every step boundary\n/plan pause           pause at the next step boundary\n/draft [clear]        compose your own plan / discard it",
      "commands",
    ),
  ],
};

export const approvalGate: DocPage = {
  slug: "approval-gate",
  title: "the approval gate",
  summary:
    "Risk tiers, the y/N/s/a/e prompt, what a grant covers and how long it lives, shell prefix allowlists, and /policy — the one front door for every relaxation.",
  group: "concepts",
  blocks: [
    p(
      "Every tool declares a risk tier: `read_only`, `side_effecting`, or `destructive`. Tools at or below the auto-approve threshold (`runtime.auto_approve`, default `read_only`) run without prompting. Everything else stops the turn and asks you — with the real artifact of the decision on screen.",
    ),
    code(
      "  ┗━ approve? y / N / s / a / e  (Enter = no) »",
      "the prompt",
    ),
    table(
      ["key", "does"],
      ["`y`", "approve the batch"],
      ["`N` / Enter", "reject — the fail-closed default; anything unrecognized also rejects"],
      ["`s`", "select per call"],
      ["`a`", "always-allow: relax these tools for the rest of the turn (see grants)"],
      ["`e`", "explain: the plan step this call fulfils and the model's recorded reasoning, then re-prompt"],
    ),
    h2("what the prompt shows"),
    ul(
      "**File writes** render as a colored unified diff against the current file. A byte-identical rewrite reads `no change` instead of a full-file diff; an existing binary file is named as binary; a path the workspace sandbox will refuse is flagged `REFUSED` at the prompt.",
      "**Shell commands** render in full, untruncated, byte-faithfully — tabs and space runs reach you exactly as the shell would receive them.",
      "**Everything else** (notably every `mcp_*` tool) renders its arguments full-width: for a tool with no bespoke safety surface, the arguments are the safety surface.",
      "A **secret scan** warns inline when a call's arguments carry a key, token, or private-key block — approving the call sends the secret wherever the call goes.",
      "If a preview fails to draw, a plain view names the call and the same reject-by-default prompt runs. The prompt always renders.",
    ),
    p(
      "Rejection is plan-aware: the decline is recorded onto the current step, the remaining steps are cancelled, a declined call is never re-issued, and the answer discloses what was not done. Every prompt is recorded as a structured gate event — it feeds `/trace answer`, headless `--json`, and the trust receipt. An empty record always means the human was never asked.",
    ),
    h2("grants have a lifetime"),
    p(
      "Answering `a` grants for the rest of the current turn by default (`runtime.grant_scope: task`): the tool's tier drop expires at the turn boundary and the turn's closing note says what expired. `session` keeps a grant until Saturn exits; `persist` writes it to `permissions.json`. The scope is a trust setting — session-only unless you pass `--save`.",
    ),
    p(
      "For `run_shell`, `a` never drops the tool's tier (that would un-gate every future command from one keypress). Instead it offers a **prefix grant** covering the full command you just reviewed — or a shorter prefix you type deliberately.",
    ),
    h2("shell prefix allowlist"),
    p(
      "`/policy allow <prefix>` persists a `run_shell` prefix that runs without prompting. Matching is strict: token-boundary, case-insensitive, and never when the command contains shell metacharacters — chaining and redirection always face the human. The arguments after the granted prefix are screened at every use:",
    ),
    ul(
      "capability-introducing flags (`--output`, `-c`, `--exec`, …), globs, and paths outside the workspace disqualify the command;",
      "a general-purpose interpreter (`python`, `npm`, `powershell`, …) is only ever exempt as the exact granted command;",
      "non-ASCII text (a lookalike `；`) never passes the automation path.",
    ),
    p(
      "Previously `git log --output=<path>` could ride in on a `git log` grant. Now it prompts.",
    ),
    h2("/policy — one object"),
    p(
      "Every relaxation mechanism — the threshold, `Shift+Tab` cycling, per-tool overrides, the prefix allowlist, headless `--yolo` — is a view of one policy object, and `/policy` is its front door. Bare forms report; changing is always an explicit verb.",
    ),
    code(
      "/policy                             the live posture\n/policy risk <tool> <tier> [--save]  override a tool's tier (reset restores it)\n/policy allow <prefix>              persist a run_shell prefix grant\n/policy allow list | remove <n>     inspect / revoke\n/policy open [on|off]               open the gate (threshold → destructive)",
      "usage",
    ),
    p(
      "Durable state is one JSON file, `database/permissions.json`. A hand-edited file with wrong-shaped fields fails closed like a garbled one: strict defaults, recorded at startup, the file kept aside as `.corrupt`. Relaxing a tool's tier never removes it from the injection quarantine's coercion scan.",
    ),
    note(
      "The `⚠ GATE OFF` status-bar indicator is derived live from the threshold — there is no separate flag to drift. Choosing a tier explicitly while the gate is open supersedes the pre-open snapshot, so `/policy open off` lands on the tier you set last.",
      "warn",
    ),
  ],
};

export const trust: DocPage = {
  slug: "trust",
  title: "the trust stack",
  summary:
    "The egress ledger and air gap, prompt-injection quarantine, the per-answer trust receipt, secret handling, and why every loosened posture is session-only unless saved.",
  group: "concepts",
  blocks: [
    p(
      "The privacy claim is not a policy promise — it is inspectable in the code and observable on the network. With `http_request` removed, the only ways anything leaves your machine are a web search query, a page fetch, and the MCP servers you configured. Each of those exits is recorded.",
    ),
    h2("egress ledger and air gap"),
    p(
      "Every network exit — host, bytes, channel — is recorded and renders live in the rail (`⇅ sent → host · bytes · channel`). `/privacy` shows what can leave, `/privacy egress` what did, and `/privacy airgap on` seals the boundary: web tools refuse, remote MCP calls refuse, and every blocked attempt shows in the ledger as `⛔ air-gap blocked`. A fully local turn's receipt reads `local-only`; silence means nothing left.",
    ),
    code(
      "/privacy                    what CAN leave this machine\n/privacy egress [clear|n]   the per-event ledger of what DID\n/privacy airgap [on|off] [--save]",
      "commands",
    ),
    p(
      "The test suite carries a no-new-egress grep guard over the source tree, so a new network path cannot land unnoticed.",
    ),
    h2("prompt-injection quarantine"),
    p(
      "Web pages, remote MCP results, and the ingested corpus are untrusted input. Content that tries to steer the agent (\"ignore your previous instructions\", tool coercion, role overrides) is detected, visibly flagged in the trace, and fenced between data-not-instructions markers before the model sees it. In the default `gate` mode, the first tool batch after a flagged observation faces the approval gate regardless of risk tier — one fresh human look at calls whose arguments may derive from injected content. Tool classifications come from the live registry (tools declare `untrusted=True`), so the coercion scan covers every gated tool, MCP tools included. `@file` attachments and piped stdin warn when instruction-shaped, but never block.",
    ),
    kv(
      ["`runtime.quarantine: off`", "no scanning"],
      ["`warn`", "scan, fence, and show flags — never change gating"],
      ["`gate` (default)", "warn, plus the first tool batch after a hit faces the gate"],
    ),
    h2("the trust receipt"),
    p(
      "The one-line stats receipt under each answer carries a trust segment: `local-only`, or the turn's egress summary (`⇅ N sends · bytes → host`) in yellow, blocked attempts, and how many calls faced the approval gate. `/trace answer` expands it into full answer provenance — each cited source's origin and trust flags, what left the machine, and the human gate decisions.",
    ),
    h2("secrets"),
    ul(
      "**At the gate** — each gated call's arguments are scanned for keys, tokens, and private-key blocks; a hit warns inline.",
      "**In shell children** — `run_shell` children do not inherit secret-shaped environment variables (`*API_KEY*`, `*SECRET*`, `*TOKEN*`, `*PASSWORD*`, `*CREDENTIAL*`, `ANTHROPIC*`, `OPENAI*`, `AWS_*`, `GITHUB_*` by default). The fragment list is `shell.env_scrub`.",
      "**At the network boundary** — outgoing MCP arguments and any remote-Ollama send are subject to `runtime.redaction` (`off` / `warn` / `redact`); local Ollama calls are never scanned because there is no boundary.",
      "**Nowhere else** — no Saturn feature takes an API key. MCP secrets are plain env vars expanded from `.env`.",
    ),
    h2("trust settings are session-only unless saved"),
    p(
      "`runtime.auto_approve`, `runtime.airgap`, `runtime.quarantine`, `runtime.redaction`, `runtime.grant_scope`, and `shell.env_scrub` set through `/config`, `/policy`, or `/privacy` apply for the session only unless you pass an explicit `--save`. A loosened security posture is never written to disk silently.",
    ),
    h2("what the benchmark measures"),
    p(
      "`python benchmark.py` runs the graded trust benchmark — the numbers the product's claims rest on: the grounding judge's catch rate, approval-gate coverage (every non-read-only call must have faced the gate), the injection flag rate (a planted corpus document carrying instruction-shaped content, retrieved through the live knowledge-base path), and the semantic write gate's fabrication catch rate. `--strict` exits 1 on any graded FAIL. Reports land in `logging/benchmarks/`.",
    ),
  ],
};

export const answers: DocPage = {
  slug: "answers",
  title: "answers you can check",
  summary:
    "Citations and sources, token-confidence marking, the groundedness check on every figure, and interrupt-and-correct.",
  group: "concepts",
  blocks: [
    h2("citations"),
    p(
      "Answers that drew on tools or documents cite their sources inline (`[1]`) and end with a Sources list mapping each number to the exact tool call or document behind it, trust-colored by origin. `/trace source 3` shows the full material behind any citation; `/trace answer` shows the whole provenance picture. `runtime.citations: false` restores unadorned answers.",
    ),
    h2("confidence on screen"),
    p(
      "While the final answer streams, the daemon's per-token log-probabilities are captured and runs of consecutive low-probability tokens render red — live in the streaming tail, in the freeze editor, and on the final render. The receipt counts the uncertain spans. It is the model's own uncertainty, made visible where it lands.",
    ),
    ul(
      "`runtime.confidence_threshold: auto` (default) uses the synthesizer model's own calibrated threshold — \"worse than 95% of this model's clean output\" — from a shipped table covering the tier synthesizers; an uncalibrated model falls back to 0.20. Set a number to pin it. Regenerate the table with `utilities/confidence_calibrate.py`.",
      "A run needs three or more consecutive low tokens; single uncertain tokens (an open word choice) are never marked.",
      "Two-threshold hysteresis (`runtime.confidence_exit_threshold`, derived by default) keeps an open run from flickering off on one merely-unlikely token, and function words (the, of, is, …) never count toward or break a run.",
      "`runtime.confidence: false` stops requesting logprobs entirely.",
    ),
    h2("every figure is checked"),
    p(
      "After a turn that observed something, every figure the answer states (three or more digits, or any decimal) is traced back to your words or the turn's tool results. A figure that traces to nothing gets one corrective regeneration; anything still untraceable is disclosed under the answer (\"these figures could not be traced to any gathered result\") rather than passed off as gathered. The inverse check makes sure the value the plan's own `calculate` step produced actually appears in the answer.",
    ),
    p(
      "Upstream of that, `calculate` refuses a bare value (`551`) with a hint to write the actual arithmetic over gathered values — it cannot be used to launder a made-up number into a \"computed\" result. And before a value is persisted to disk, the semantic write gate verifies it actually came from the request or gathered results, failing closed when it can't.",
    ),
    h2("interrupt-and-correct"),
    p(
      "Press `Esc` while the answer streams: the stream freezes (`✂ freezing…`), an editor opens on the text so far, and when you save, the model continues from your edited prefix. Human-authored spans stay marked in the final answer and its audit record.",
    ),
    ul(
      "Pressing `Esc` mid-word lets the answer finish the word before freezing, so the editor opens on a clean boundary; a second `Esc` cuts immediately.",
      "The edited prefix is trimmed of trailing spaces and tabs before generation resumes; newlines are kept; a resume without changes is not recorded as an edit.",
      "On a resumed answer the figure checks only mark — your edit is never regenerated over.",
      "Verified on the qwen3.5, qwen3.6, qwen3.8, and gemma4 families; a model outside the registry simply never arms the freeze key.",
    ),
    h2("honest disclosure"),
    p(
      "Skipped, blocked, or failed steps are disclosed in the answer's incidents note. An answer that came back empty still carries the incidents note and the Sources footer, and the recorded answer states that no answer text was produced. Trailers are gated on their own triggers, never on whether the prose happened to mention them.",
    ),
    note(
      "Every model call now states explicitly whether the model may \"think\": only the planner keeps its hidden rationale (measured to matter for plan quality on small models); the judge, tool-argument generation, reasoning steps, and the streamed answer run without it. Every call carries an output-token bound so a looping generation ends as a truncated result instead of filling the context window.",
    ),
  ],
};
