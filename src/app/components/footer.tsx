import Link from "next/link";
import { site } from "../lib/site";
import { receipts } from "../lib/receipts";
import GitHubIcon from "./github-icon";
import LogoMark from "./logo-mark";

/* The receipts row states what the page does, measurably. Values are
   enforced at build time by scripts/receipts.mjs. */
const receiptLines = [
  `first paint ≤ ${receipts.firstPaintKB} kB`,
  `requests to third parties: ${receipts.thirdPartyRequests}`,
  "no analytics",
  "fonts self-hosted",
  "every capture a real run",
];

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_auto_auto] md:gap-20 md:px-10">
        <div className="max-w-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-fg t-colors hover:text-muted"
          >
            <LogoMark className="h-4 w-4 shrink-0" />
            <span className="lowercase leading-none tracking-tight">
              saturn
            </span>
          </Link>
          {/* The only place the org name appears on the site */}
          <p className="type-micro mt-3 lowercase text-faint">
            a {site.org.toLowerCase()} project · local-first · the terminal is
            the product
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <p className="type-micro lowercase text-faint">site</p>
          <Link
            href="/docs"
            className="text-sm lowercase text-muted t-colors hover:text-fg"
          >
            docs
          </Link>
          <Link
            href="/install"
            className="text-sm lowercase text-muted t-colors hover:text-fg"
          >
            install
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm lowercase text-muted t-colors hover:text-fg"
          >
            <GitHubIcon className="h-4 w-4" />
            github
          </a>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="type-micro lowercase text-faint">receipts</p>
          {receiptLines.map((s) => (
            <p key={s} className="type-micro lowercase text-muted">
              {s}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="type-micro lowercase text-faint">
            © {new Date().getFullYear()} {site.org.toLowerCase()} — all rights
            reserved
          </p>
          <p className="type-micro lowercase text-faint">
            everything on screen, nothing off it
          </p>
        </div>
      </div>
    </footer>
  );
}
