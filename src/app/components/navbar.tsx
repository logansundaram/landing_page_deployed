"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="text-lg flex w-full h-16 place-content-between fixed z-50 px-8 md:px-24 lg:px-32 py-8">
      <Link href="/" className="flex link">
        Saturday.ai
      </Link>

      <div className="md:gap-8 gap-6 md:flex hidden">
        <Link href="/about" className="link">About</Link>
        <Link href="/contact" className="link">Contact</Link>
        <Link href="/careers" className="link">Careers</Link>
        <Link href="/install" className="link">Install</Link>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <span className="sr-only">Open main menu</span>
        <div className="flex flex-col gap-1.5">
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
        </div>
      </button>

      <div
        className={[
          "md:hidden absolute left-0 top-full w-full bg-zinc-50",
          // keep it non-interactive + visually hidden when closed
          open ? "pointer-events-auto" : "pointer-events-none",
          open ? "" : "opacity-0 translate-y-3",
          // only animate AFTER first mount
          mounted
            ? open
              ? "animate-[fadeUp_0.4s_ease-out_forwards]"
              : "animate-[fadeDown_0.3s_ease-in_forwards]"
            : "",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-6 px-8 py-8">
          <Link href="/about" className="link" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" className="link" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/careers" className="link" onClick={() => setOpen(false)}>Careers</Link>
          <Link href="/install" className="link" onClick={() => setOpen(false)}>Install</Link>
        </nav>
      </div>
    </header>
  );
}
