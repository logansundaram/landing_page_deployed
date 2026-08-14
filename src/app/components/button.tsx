import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

/* Sharp corners, lowercase, luminance-only — controls read like TUI soft
   keys. Primary is inverse video (fg slab, ink text); secondary is
   bracketed the way a terminal renders a soft key. */
const base =
  "group inline-flex h-11 items-center justify-center gap-2 text-sm lowercase t-colors";

const variants: Record<Variant, string> = {
  primary: "bg-fg px-6 font-bold text-ink hover:bg-ramp-0",
  secondary: "px-3 text-fg hover:text-ramp-0",
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
          className="text-faint t-colors group-hover:text-muted"
        >
          [
        </span>
        {children}
        <span
          aria-hidden
          className="text-faint t-colors group-hover:text-muted"
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
