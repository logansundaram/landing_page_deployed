import { h2, kv, note, ol, p, table, ul } from "../../docs/types";
import type { Post } from "../types";

export const saturnV2Reach: Post = {
  slug: "saturn-v2-reach",
  title: "saturn v2: reaching your life",
  date: "2026-10-02",
  summary:
    "Four days after the pivot, Saturn works in the folder you launch it from, reads your PDFs, texts people, and runs your Shortcuts. The trust layer got tighter, and the code got smaller.",
  blocks: [
    p(
      "[Last week's post](/blog/saturn-v2) closed with a list. Three of the items marked \"next\" were about reach: work in whatever folder you launch from, read the documents people actually have, and use contacts and reminders. All three are built now, along with a good deal more. This post covers what Saturn can touch now, what we tightened so that it's safe to let it, what we cut, and what the benchmark says.",
    ),
    h2("it works where you are"),
    p(
      "`cd` into any folder and run `saturn`. The file tools, the shell, `/undo`, `/init`, and that folder's `SATURN.md` all work there, the way Claude Code works inside a repo. Launch it from `~` and your home folder is the workspace. The tools can't reach anything outside that folder on their own. If you ask about a file somewhere else, Saturn suggests `/add-dir <folder>`, which opens that folder for the rest of the session, and `/rm-dir` closes it again. Every write and every shell command still goes through the gate.",
    ),
    p(
      '`read_file` now reads PDFs page by page, Word documents as paragraphs and tables, and spreadsheets as one CSV block per sheet. "Summarize the PDF on my desktop", which last week failed before the model was even asked, now takes one tool call. `@file` attachments read documents the same way. Images and archives are refused by name instead of being returned as garbled bytes.',
    ),
    p(
      "On macOS, a content search also checks Spotlight's index. A search from your home folder that used to spend its full ten seconds reading files now answers in two to five, and it finds matches inside PDF, Word, and Excel files. Each hit is still checked against the file itself before Saturn reports it.",
    ),
    h2("it can reach your life"),
    p(
      "The tool catalog went from 26 tools to 42 this week. The new ones are the errands from last week's examples:",
    ),
    kv(
      [
        "text someone",
        '"Text Sam I\'m 15 minutes late" looks Sam up in Contacts and sends an iMessage through Messages. Of everything Saturn can do, this is the one action that always asks: you see the number and the exact text each time.',
      ],
      [
        "contacts and reminders",
        '`search_contacts` turns a name into a real address or number, so a reply never goes to a guessed one. "Remind me to call the dentist tomorrow at 9" creates a reminder that shows up on your phone, and "what\'s overdue" lists the open ones.',
      ],
      [
        "your shortcuts",
        "`run_shortcut` runs any Shortcut you've built, such as lights off, a Focus mode, or a HomeKit scene. It asks first unless you allow that one shortcut by name.",
      ],
      [
        "mail, calendar, notes",
        "Saturn can open a reply in the right thread with the original quoted (you press Send), triage a batch of messages in one approval, move or delete calendar events, and append to an existing note instead of starting another.",
      ],
      [
        "files",
        "`move_file` renames and moves files, and `/undo` moves them back. Renaming used to take a shell command.",
      ],
      [
        "what's in front of you",
        '"This page" reads the front browser tab. "These files" reads your Finder selection. Type `@clipboard` to attach whatever is on the clipboard (Saturn never reads it on its own), and `/copy` puts the last answer there.',
      ],
    ),
    p(
      'Saturn also knows today\'s date on every turn now, so "this thursday" no longer costs a tool call, and `~/.saturn/hooks.yaml` runs your own commands on turn start, turn end, and before and after writes. A `before-write` hook that exits non-zero blocks the write.',
    ),
    h2("more reach, a tighter gate"),
    p(
      "An agent that can send a text from your number needs a stricter boundary than one that only reads your notes. Most of the trust work this week came from going through the new reach and asking what someone could make it do.",
    ),
    ul(
      '**A send always asks.** `send_message` sits above every policy lever. No setting, no "always allow", and no `--yolo` skips the prompt. Headless mode refuses sends outright, and the air-gap blocks them. Saturn reports a message as handed to Messages, not as delivered, because it can\'t see what happens after that.',
      "**A fetch can't carry your data out unasked.** `web_extract` never prompts, but the URL it fetches is itself a message to the outside. When the model composes an address after reading a file, a note, an email, or a web page, and that address doesn't appear in anything you typed or anything a tool returned, the gate shows it to you first. A redirect gets the same check: each new host is checked and recorded before Saturn contacts it.",
      "**The shell can't hide from the ledger.** `git pull` or `curl` can reach the network without Saturn seeing the bytes. The ledger used to say nothing had left the machine in that case. Every shell command and every stdio MCP call is now recorded as *untracked*, the answer's receipt counts it, and under the air-gap these calls always ask first.",
      "**Saturn never writes the files that control it.** `write_file` and `edit_file` refuse `hooks.yaml`, the live `config.yaml`, and `permissions.json`, even when you approve the write. Launched from `~`, those files are inside the workspace, and this refusal is what keeps them out of reach.",
      "**Failures get scanned too.** An MCP server's error text and a failed command's output now go through the injection scan like any other outside content. So does everything `run_shell` prints.",
      "**A remote Ollama can't pass as local.** `OLLAMA_HOST=http://127.evil.example.com` used to count as loopback because the name started with `127.`. Saturn now parses the address.",
    ),
    p(
      "The order of the work matters here. We built the reach first and then closed the holes it opened. We don't ship one without the other: v2 stays off the installer until both are done.",
    ),
    h2("what we cut, again"),
    p(
      "Last week's cut removed the plan engine. This week's removed what was left over from it:",
    ),
    ul(
      "**One model per tier.** The utility role is folded in, so one model now handles the loop, compaction, the memory review, and `/init`. `/models use <id>` replaces the per-role commands.",
      "**A model page that estimates speed, not just fit.** `/models` reads your Apple chip and its GPU core count and estimates each tier's decode speed from the chip's published memory bandwidth. It recommends the largest tier that both fits and runs at 10 tok/s or faster. On a 32 GB base M4, it now tells you the 27b fits but would run at about 6 tok/s, and offers the 9b instead.",
      '**Fewer commands.** `/privacy` is now part of `/policy`. The first launch runs only `/models`. About twenty old spellings and v0.1-era aliases now answer "unknown command".',
      "**A bloat sweep.** We removed dead fallbacks, duplicate renderers, and comments that narrated history, for 1,140 fewer lines of non-test Python with no change in behavior.",
    ),
    p(
      "Across the whole v2 branch, counting only non-test Python, Saturn has deleted about 16,600 lines and added about 8,400, even with sixteen new tools. It's half the size it was and does more.",
    ),
    h2("what the benchmark says"),
    p(
      "The loop benchmark runs 25 daily requests through the live loop and grades each turn from its record. It checks pass counts against the shape's bound, tool choice, whether the answer contains a value we can verify, and phantom actions, meaning text that describes a tool call that never happened.",
    ),
    table(
      ["tier", "passed", "phantoms", "capped turns"],
      ["4b", "20 / 25", "0", "0"],
      ["9b", "20 / 24", "0", "0"],
    ),
    p(
      "Both tiers passed the trust benchmark's gate, injection, and memory probes. The misses are worth naming:",
    ),
    ul(
      "`file_long_middle` fails on every tier. The fact sits in the middle of a 30,000-character file, and the head-and-tail clamp drops it. That's an engine problem, not a model problem.",
      'On the 4b, "what can you do with my email?" calls `list_mail`, and "send a text to Petra" reaches for `draft_mail`. Both are wrong-tool picks. They count for more now that the catalog is 42 tools and about 6,000 tokens of schema, up from 26 tools and 3,700 tokens.',
      "The 9b made seven `calculate` calls to check whether 391 is prime. It got the right answer, but it took eight passes.",
    ),
    p(
      "A one-task difference on this benchmark is noise, so before any engine change is measured, three runs per change becomes the default, along with a column for tasks that pass on all three.",
    ),
    h2("what's next"),
    p(
      "We ranked everything still open against the two tests from last week: would a person hand this to Saturn on a Tuesday, and what does it cost the chat turn. Then we wrote an implementation plan for each of the top eight. None of them is built yet.",
    ),
    ol(
      "**Strip terminal escape sequences.** We found this one while checking the plans against the code. A web page or email carrying escape bytes could reach the screen through the rail's result preview and rewrite what you see. In a product whose promise is that what you see is what happened, it goes first.",
      '**Loop guards.** A hygiene budget, a final pass that knows what failed, and replay of a repeated read. The worst run on record is a 4b spiral that took 14 passes and ended with "I\'ve updated my memory". None of these guards costs the clean path anything.',
      "**Remember what you say, without the click.** A fact lands right away only when its words come from what you typed this turn. Anything from a web page, an email, or a compaction summary still waits in the queue. Memory injection is a demonstrated attack, so this rule stays deterministic.",
      "**A first-run interview**, so the second turn already knows who it's talking to.",
      "**The observation path.** A clamp that keeps the relevant middle, which fixes `file_long_middle`, and then a budgeted view of the prompt so long errands stop pushing the system prompt off the front.",
      "**Skills.** Markdown procedures you write once, in the same file format Claude Code uses, with no registry and no installing from a URL.",
      "**A launch brief.** Open the terminal and see your day, built from readers that already exist, with no model call.",
      "**A question is an answer.** Delete the `ask_user` interrupt. It has the least user-visible value on the list and removes the most code.",
    ),
    p(
      "After those come drafts in your own voice, written from the last few messages you sent to that person. Every email product leads with that feature, and it costs the chat turn nothing.",
    ),
    note(
      "v2 still isn't released. It lives on the `v2` branch, and the installer still ships the v1 plan engine. The site's docs describe v1 until v2 is released.",
      "warn",
    ),
  ],
};
