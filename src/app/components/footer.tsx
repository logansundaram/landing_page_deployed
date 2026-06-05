import Link from "next/link";
import { site } from "../lib/site";
import GitHubIcon from "./github-icon";

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="font-serif text-lg leading-none text-fg transition-colors hover:text-accent"
          >
            Saturday<span className="text-accent">.ai</span>
          </Link>
          <p className="text-xs text-faint">
            Local-first AI agents. The terminal is the product.
          </p>
        </div>

        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/docs" className="transition-colors hover:text-fg">
            Docs
          </Link>
          <Link href="/install" className="transition-colors hover:text-fg">
            Install
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-fg"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto w-full max-w-6xl px-6 py-5 md:px-8">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} Saturday.ai — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
