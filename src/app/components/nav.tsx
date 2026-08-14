"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "../lib/site";
import GitHubIcon from "./github-icon";
import LogoMark from "./logo-mark";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Solid ink — no glass, no blur */}
      <div className="border-b border-edge bg-ink">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-fg t-colors hover:text-accent"
          >
            <LogoMark className="h-5 w-5 shrink-0" />
            <span className="text-lg lowercase leading-none tracking-tight">
              saturn
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {site.nav.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                active={pathname === item.href}
              >
                {item.label}
              </NavItem>
            ))}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted t-colors hover:text-fg"
            >
              <GitHubIcon className="h-4 w-4" />
              github
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center text-muted hover:text-fg md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <div className="relative h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-200 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-px w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-px w-5 bg-current transition-transform duration-200 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-b border-edge bg-ink transition-[max-height,opacity] duration-200 md:hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-2 py-3 text-sm text-muted t-colors hover:bg-panel hover:text-fg"
            >
              <span className="text-faint">/</span>
              {item.label}
            </Link>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted t-colors hover:bg-panel hover:text-fg"
          >
            <GitHubIcon className="h-4 w-4" />
            github
          </a>
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`text-sm t-colors ${
        active ? "text-accent" : "text-muted hover:text-fg"
      }`}
    >
      <span className={active ? "text-accent" : "text-faint"}>/</span>
      {children}
    </Link>
  );
}
