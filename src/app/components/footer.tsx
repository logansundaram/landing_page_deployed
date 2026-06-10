import Link from "next/link";
import { site } from "../lib/site";
import GitHubIcon from "./github-icon";
import LogoMark from "./logo-mark";

const status = ["100% local execution", "zero cloud calls", "no telemetry"];

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_auto_auto] md:gap-20 md:px-10">
        <div className="max-w-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-fg transition-colors hover:text-accent"
          >
            <LogoMark className="h-6 w-6 shrink-0" />
            <span className="font-serif text-xl leading-none tracking-tight">
              Saturday<span className="text-accent">.ai</span>
            </span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-faint">
            Local-first AI agents. The terminal is the product.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Site
          </p>
          <Link
            href="/docs"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            Docs
          </Link>
          <Link
            href="/install"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            Install
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Status
          </p>
          {status.map((s) => (
            <p
              key={s}
              className="flex items-center gap-2.5 font-mono text-xs text-muted"
            >
              <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-accent" />
              {s}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 font-mono text-xs text-faint md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Saturday.ai — All rights reserved.</p>
          <p>
            <span className="text-accent">»</span> everything on screen, nothing
            off it
          </p>
        </div>
      </div>
    </footer>
  );
}
