import { code, h2, kv, note, p, table, ul } from "../../docs/types";
import type { Post } from "../types";

export const saturnSkills: Post = {
  slug: "saturn-skills",
  title: "saturn v2: skills",
  date: "2026-10-03",
  summary:
    "Write a procedure once in markdown and run it by typing its name. Saturn can draft one for you too, and it saves the skill only after you've read every line of it.",
  blocks: [
    p(
      'Saturn already had places for standing instructions (`SATURN.md`), for automation (hooks), and for rules (`/policy`). It had nowhere to keep a *procedure*, like "do my weekly review" or "file this receipt". You either typed it out again each time or parked it in `SATURN.md`, where it rode along on every turn. The dogfood log asked for skills by name: "Create a skill called weekly-review that does what we just did."',
    ),
    p(
      "Skills were sixth on [yesterday's list](/blog/saturn-v2-reach). They're built now, along with a way for Saturn to write one for you.",
    ),
    h2("a skill is a markdown file"),
    p(
      "A skill lives at `~/.saturn/skills/<name>/SKILL.md`, or as a flat `<name>.md`. It uses the same file shape Claude Code uses, so skills you already have will work. It has an optional frontmatter with a name and a one-line description, followed by the steps in plain markdown:",
    ),
    code(
      `---
name: weekly-review
description: Review the past week and plan the next one
---

1. List what's on my calendar for the next seven days.
2. List open reminders, overdue ones first.
3. Read my "this week" note and mark what got done.
4. Finish with a short summary: what was done and what is left.`,
      "~/.saturn/skills/weekly-review/SKILL.md",
    ),
    p(
      "A folder can carry its own skills in `.saturn/skills/`, and those win over the global ones when the names match. The file name is the skill's name, and Saturn reads it from disk every time it runs, so an edit takes effect on the next run with nothing to reload.",
    ),
    h2("running one"),
    p(
      "Type `/weekly-review`, or `/weekly-review focus on work` to point it at something. That's an ordinary turn with the skill's steps added to that turn's context. It costs no extra model calls, leaves the cached prompt prefix alone, and isn't carried into the next turn. `saturn -p \"/weekly-review\"` runs one headless.",
    ),
    p(
      "A built-in command always beats a skill with the same name, and both startup and `/skills` tell you when one is shadowed.",
    ),
    h2("the /skills command"),
    kv(
      [
        "/skills",
        "Lists every skill with its description, its scope, and who wrote it: `you`, or `saturn · #412` for one Saturn drafted. `/trace why #412` then shows the run it came from. The list also names any skill file that failed to load, and why.",
      ],
      [
        "/skills show <name>",
        "Prints the path, the body, and any frontmatter keys that were ignored.",
      ],
      [
        "/skills create <name>",
        "Writes a commented template to `~/.saturn/skills/<name>/SKILL.md` and prints the path. It refuses a malformed name, a built-in command's name, and any file that's already there.",
      ],
      [
        "/skills delete <name>",
        "Shows you what will go, asks `move to the Trash? [y/N]`, and moves it there. Deleting a skill is yours alone; Saturn has no tool for it.",
      ],
    ),
    h2("saturn can write one"),
    p(
      'After an errand goes well, say "save that as a skill called weekly-review". Saturn drafts it through one tool, `create_skill`, which takes three plain strings: a name, a description, and the steps. The tool builds the file itself, so a 9b model never has to write YAML. It also forgives small-model habits: `/Weekly Review` becomes `weekly-review`, and a JSON list of steps becomes a numbered list. Both fixes happen *before* the approval prompt, so what you read is the call that will run.',
    ),
    p(
      "To change a skill that exists, Saturn calls the tool again with `replace=true`. Since the model has no other way to read a skill it didn't just run, the first attempt is answered with the skill's current text, so the rewrite starts from what's really there.",
    ),
    h2("why saving a skill always asks"),
    p(
      'A skill is a procedure Saturn will follow as your own words every time it runs. That makes a saved skill more like a send than a note: whatever goes into it gets authority later. So `create_skill` joins `send_message` in the small set of tools that always ask. No `/policy` setting, risk override, "always allow", or `--yolo` gets past it, and headless mode refuses it outright.',
    ),
    ul(
      "**You see the whole skill.** The generic approval views fold long values and long diffs. A folded middle is exactly where a planted step would hide, so a new skill is shown line by line and a replacement is shown as its full diff, wrapped and never cut. Bidi overrides and zero-width characters show as code points.",
      "**What you see is what gets saved.** One function renders the file. The prompt shows that exact text and the tool writes those exact bytes. A draft over 3,000 characters is refused rather than trimmed, because a trimmed skill isn't the one you approved, and 3,000 characters is about what a person will actually read at a prompt.",
      "**No hidden characters.** A draft containing characters you can't see even at the gate (Unicode tag characters, word joiners, soft hyphens, private-use code points) is refused. Terminal escape sequences are made visible before anything is saved.",
      '**A warning when outside content is around.** If a web page, file, attachment, or email entered the conversation before the draft, the prompt adds: "external content entered this conversation before this skill was drafted — read each step as if a stranger wrote it." It\'s a note, not a refusal, since "summarize this page and save the method as a skill" is a fair request.',
      "**The file tools can't touch the skills folders.** `write_file`, `edit_file`, `move_file`, and `delete_file` all refuse a target inside one, including the real path behind a symlinked skill. `create_skill` and `/skills` are the only writers.",
      "**A skill never changes the gate.** `allowed-tools` and any other unknown frontmatter key are ignored. Every action a skill leads to asks exactly as it would if you'd typed the steps yourself.",
      "**`/undo` takes a save back.** A new skill is removed, and a replaced one is restored. Your `before-write` hooks run on a save like any other write, and a veto stops it.",
    ),
    h2("saving is not running"),
    p(
      "The first benchmark run failed the new `skill_create` task on both tiers. A live probe showed why: asked to save a procedure, the 9b *carried out* the quoted steps first, running the reads and the shell commands, and only then saved them. When the save was declined, it went on carrying them out for 17 passes.",
    ),
    p(
      "The fix took two sentences. The tool's description now says that saving is the whole job and that it shouldn't carry out the steps first, and a declined save gets a note saying the same thing. After that change, the 9b saves in two passes whether you approve or decline.",
    ),
    p(
      "We measured three runs per tier, before and after, on the loop benchmark plus two new tasks: `skill_create` (a save reaches the gate) and `skill_chat` (a question about skills doesn't).",
    ),
    table(
      ["tier", "shared tasks, 3 runs", "skill_create", "skill_chat"],
      ["9b", "29 · 28 · 29 → 29 · 29 · 29", "3 / 3", "3 / 3"],
      ["4b", "21 · 21 · 21 → 22 · 22 · 22", "never calls the tool", "—"],
    ),
    p(
      "On the 9b, no stable pass was lost, `create_skill` was never picked for the wrong request, and chat turns still average one pass, so it ships. The 4b went up a task overall, but it never calls `create_skill`. It carries the steps out instead. The changelog says so plainly: saving a skill is reliable on the 9b and up.",
    ),
    h2("what it doesn't do yet"),
    ul(
      "**Saturn picking a skill on its own.** Today a skill runs only when you type its name. Having the model notice that a request matches a skill and load it is a separate phase, and it has to pass the benchmark before it ships.",
      "**Parameters.** There's no `$ARGUMENTS`, no typed inputs, and no scripts run from a skill folder. Whatever you type after the name is the request the steps apply to.",
      "**Workspace skills from the agent.** Saturn only writes to your global folder. A project's `.saturn/skills/` arrives with the project, and you edit it by hand.",
      "**Skills on a schedule.** Running `/weekly-review` every Sunday morning is on the research list, not built.",
    ),
    p(
      "Item one on yesterday's list landed today as well: terminal escape sequences in tool output, attachments, and answers are now made visible instead of reaching your screen live.",
    ),
    note(
      "v2 still isn't released. It lives on the `v2` branch, and the installer still ships the v1 plan engine.",
      "warn",
    ),
  ],
};
