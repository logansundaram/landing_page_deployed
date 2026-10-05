import { code, h2, kv, note, p, table, ul } from "../../docs/types";
import type { Post } from "../types";

export const saturnThinkRemember: Post = {
  slug: "saturn-think-remember",
  title: "saturn v2: thinking and remembering",
  date: "2026-10-04",
  summary:
    "Saturn now thinks before it acts and never before a plain answer, and you can watch a thought and stop it. It also remembers what you tell it without asking, but only when it can prove you typed the words.",
  blocks: [
    p(
      "Two things shipped today, and both are about decisions Saturn makes on every turn. The first is whether to think before it moves. The second is what it keeps about you afterwards. In both cases the old answer was a rule that was easy to write and wrong in the places that mattered.",
    ),
    h2("where the mistakes were"),
    p(
      "Until today a pass thought only right after a tool error. That sounds sensible, but the benchmark disagreed. On the 4b, thinking that way passed 23 of 34 tasks, while never thinking passed 25 and always thinking passed 29. The failures were first-move mistakes: a wrong tool, a needless tool, or a question that should have been asked. The rule never fired on those passes. When it did fire, the thought just restated the error message, which already named its own fix.",
    ),
    p(
      "Always thinking was not free either. Most of its empty thoughts came on the turn's last pass, where the model wrote the whole answer inside the thought and then returned nothing, so the pass had to run again.",
    ),
    h2("think before acting, never before answering"),
    p(
      "So `auto` now follows one rule. Each pass that has a decision to make drafts first, with thinking off. If the draft is a plain answer, that's the answer, at no extra cost. If the draft calls a tool, it is pulled back and the pass runs again with thinking on. Saturn also thinks after a tool error and after you steer. A pass never makes more than two model calls because of thinking, whatever goes wrong.",
    ),
    p(
      "The decision is made by the harness, not the model. Qwen3.5 can't switch its own thinking on per request, so the harness looks at what kind of step it's on (first move, recovery, steered, wrap-up) and decides. That makes it a plain function of the turn's messages, with no extra model call and no guessing from the request's wording. It can be tested, shown, and explained.",
    ),
    p(
      "We measured seven policies on the 34-task loop benchmark, on both tiers. Here are five of them:",
    ),
    table(
      ["mode", "4b passed · suite", "9b passed · suite", "9b empty thoughts"],
      ["fast (never)", "24 · 147 s", "29 · 367 s", "0"],
      ["recover (old)", "23.5 · 160 s", "30 · 385 s", "0"],
      ["think on the first move", "26 · 227 s", "31 · 425 s", "0"],
      ["**act (new auto)**", "**29.5 · 247 s**", "**31 · 455 s**", "0"],
      ["deep (always)", "30 · 234 s", "29 · 472 s", "22"],
    ),
    p(
      "Thinking is worth about six tasks on the 4b and nothing we can measure on the 9b. `act` matches the best 4b score with fewer thoughts and doesn't cost the 9b anything. The price is time. The full suite takes 54% longer on the 4b and 18% longer on the 9b, and a simple lookup on the 4b goes from 3.5 s to about 6 s. A chat turn barely moves (3.4 s to 3.7 s), because a plain answer never waits on a thought.",
    ),
    p(
      "To be clear about how this was decided: we wrote the acceptance rule before the runs, and `act` failed it. The 9b gain is under two tasks and the 4b slowdown is over 40%. The rule said that made the default a judgment call, and we picked `act`, because a small model getting six more errands right is worth a few seconds on a lookup. The 4b numbers are means of two runs. The 9b numbers are single runs.",
    ),
    h2("a thought you can see and stop"),
    p(
      "OpenAI's model router in 2025 is the cautionary tale here. Silent switching felt like a broken model, and the manual picker was back within a week. So the decision is visible:",
    ),
    ul(
      "**While it thinks**, the status bar reads `thinking 3s`, and Esc stops the thought. The pass then answers without it.",
      "**A thought has a budget.** It is cut at `runtime.think_budget` tokens (1024 by default, about twice the longest thought we've seen), and the pass reruns without thinking.",
      "**Afterwards**, the trace line shows `thought 1.8s` with the reason and the opening of the thought. The receipt shows the turn's thinking time, and `/trace why` lists when each pass thought.",
      "**A thought never enters the conversation.** It's shown and recorded, but it isn't replayed to the model.",
    ),
    h2("the /think command"),
    kv(
      [
        "/think",
        "Shows the level, what each kind of pass does, and what the last turn did, pass by pass.",
      ],
      [
        "/think fast | auto | deep",
        "Sets the level. `fast` never thinks, `auto` thinks before it acts, and `deep` thinks on every pass.",
      ],
      [
        "/think <request>",
        "Runs that one request at `deep`. `saturn -p \"/think …\"` does the same headless.",
      ],
    ),
    p(
      "There are three levels and nothing else, and the old `off` / `adaptive` / `on` names still work. Writing `think: on` in `config.yaml` also does what it says now. YAML reads a bare `on` as a boolean, and Saturn had been quietly running it as `adaptive`.",
    ),
    h2("remembering what you say"),
    p(
      'Saturn already had a memory file, but every fact the model wanted to keep went through an approval prompt. The big assistants all save silently or tell you afterwards, and where a product asked before every save, people complained about the friction. So now, when you say "I\'m vegetarian", "Petra is my manager", or "never book anything before 10am", Saturn keeps it without a prompt and prints one line after the answer:',
    ),
    code(
      "remembered #12: I'm vegetarian — you said it · /memory forget 12 undoes it",
    ),
    p(
      "A rule like \"never…\" or \"from now on…\" goes into the layer that loads on every request, because the research is blunt about this: ten turns after you state a preference, models follow it less than 10% of the time unless it's put in front of them again.",
    ),
    h2("why it only skips the prompt for your words"),
    p(
      "A memory gets authority later. A planted fact is a quiet, durable way to steer every future turn, and published attacks get payloads from mail and calendar invites into agent memory about 98% of the time. So skipping the prompt has to be earned, and a deterministic check decides it, not the model:",
    ),
    ul(
      "**The words must be yours.** Every meaningful word in the fact has to come from one sentence you typed and stated. A question doesn't count, and a \"not\" has to stay where you put it. Requiring one sentence also stops \"I hate cilantro. My sister loves sushi.\" from turning into \"user loves cilantro\".",
      "**Nothing from outside has been read.** Once a web page, an email, a file, or an attachment enters the conversation, every later fact asks, until `/clear`. A conversation restored with `/resume` asks every time, because a session file can't say what it read.",
      "**Otherwise it asks, and says why.** For example: `'evil@x.com' is not in anything you typed`.",
    ),
    p(
      "The check proves you typed the words. It doesn't prove the fact means what you meant. Inside a single sentence, a restatement can still reorder things, which is why the line after the answer exists. Read it.",
    ),
    h2("what else memory does now"),
    ul(
      '**A new fact names the one it may contradict.** When "I live in Berlin" lands next to a stored "I live in Paris", the line says `similar: #3 "I live in Paris" — /memory forget 3 if that is no longer true`. Nothing is removed for you. Word overlap can\'t tell a correction from an elaboration, and deleting the wrong fact is worse than one extra line.',
      "**Every fact carries its date.** The memory block tells the model that a later fact outranks an earlier one, and that what you say now and what a tool returns now outrank all of it. In published results, small Qwen models answer from a stale memory over 90% of the time when it disagrees with what's in front of them. Adding dates and provenance to each fact brought the 8B to 95% correct.",
      "**Secrets are refused.** A card number, a Social Security number, a password, a PIN, an API key, or a private key in a common written form is refused on every path that writes a fact, including `/memory add`. It catches the usual shapes. It is not a guarantee for every one.",
      "**The session review reads only the conversation's own words.** The model pass that proposes facts for you to accept now sees only what you typed and what Saturn answered. It never sees a tool result or a summary. One public audit found 97.8% of auto-extracted memories were junk, and much of it came from the system reading its own injected context back.",
    ),
    p(
      "`/memory` marks these facts `said`, and `/memory why` explains how each one arrived. `memory.auto_learn: false` turns it off, and `saturn -p` never does it.",
    ),
    h2("what it doesn't do yet"),
    ul(
      "**Auto-learn hasn't met a model.** The check has 139 tests and went through an independent review, and every finding from that review was fixed. But nobody has measured how often the 4b or 9b actually calls `remember` for a fact you state, or whether it marks a correction as replacing the old fact. The probes for both are written. If the 9b misses more than 20% of plain statements, a deterministic catch gets built, and it feeds the review queue rather than writing directly.",
      "**Nobody has pressed Esc on a live thought yet.** The pieces are unit-tested: the events, the status bar, and the stream cut with a pending pause. The full path in a real terminal hasn't been run against a thinking model.",
      "**Two benchmark tasks fail under any policy that thinks on the first move.** The thought adds a cautious extra lookup, and the turn runs past its pass limit holding the right answer.",
      "**The first-run interview, an incognito session, and `/memory import`** are designed and not built.",
      "**`act` is hand-written.** A small classifier trained on Saturn's own runs, a learned per-step router, or a `think` tool the model calls itself might do better. Any of them has to beat `act` on both tiers first.",
    ),
    note(
      "v2 is out. It merged to `main` just after midnight, so the installer now ships the agent loop described here instead of the v1 plan engine. Re-running the install command updates an existing install in place.",
    ),
  ],
};
