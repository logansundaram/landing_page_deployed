"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: "/install", label: "Install" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    function onPointerDown(e: PointerEvent) {
      const el = headerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-zinc-50/90 backdrop-blur border-b border-zinc-200"
    >
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-8 md:px-24 lg:px-32">
        <Link href="/" className="link font-medium">
          Saturday.ai
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Toggle main menu</span>
          <div className="relative h-4 w-6">
            <span
              className={[
                "absolute left-0 top-0 h-0.5 w-6 bg-black transition-transform duration-200",
                open ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[7px] h-0.5 w-6 bg-black transition-opacity duration-200",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[14px] h-0.5 w-6 bg-black transition-transform duration-200",
                open ? "translate-y-[-7px] -rotate-45" : "",
              ].join(" ")}
            />
          </div>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={[
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-200",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-6 px-8 md:px-24 lg:px-32 py-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link w-fit"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
