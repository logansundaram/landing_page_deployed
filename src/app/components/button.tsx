import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

/* Sharp corners + mono uppercase — buttons read like schematic labels. */
const base =
  "inline-flex h-11 items-center justify-center gap-2 px-6 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-[#7bffff]",
  secondary:
    "border border-edge-strong text-fg hover:border-accent hover:text-accent",
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

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
