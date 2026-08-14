import Chapter from "./chapter";
import Button from "./button";
import CodeBlock from "./code-block";
import { site } from "../lib/site";

export default function GetStartedChapter() {
  return (
    <Chapter n="05" label="get started">
      <h2 className="type-display lowercase">
        <span className="block font-normal text-muted">run an agent</span>
        <span className="block text-fg">you can actually see.</span>
      </h2>

      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        One command. Under a minute. Everything on your hardware.
      </p>

      <div className="mt-10 max-w-lg">
        <CodeBlock command={site.installCommand} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/install">install saturn</Button>
        <Button href="/docs" variant="secondary">
          read the docs
        </Button>
      </div>

      <p className="type-micro mt-8 lowercase text-faint">
        works on macos · linux · wsl2 · windows — no account, no cloud
      </p>
    </Chapter>
  );
}
