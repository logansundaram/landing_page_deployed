import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

/* Sharp corners + lowercase mono — buttons read like TUI controls.
   The secondary variant is bracketed the way a terminal renders a soft key. */
const base =
  "group inline-flex h-11 items-center justify-center gap-2 font-mono text-sm lowercase transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-accent px-6 text-ink hover:bg-[#7bffff]",
  secondary: "px-3 text-fg hover:text-accent",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;

  const label =
    variant === "secondary" ? (
      <>
        <span
          aria-hidden
          className="text-faint transition-colors group-hover:text-accent"
        >
          [
        </span>
        {children}
        <span
          aria-hidden
          className="text-faint transition-colors group-hover:text-accent"
        >
          ]
        </span>
      </>
    ) : (
      children
    );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
