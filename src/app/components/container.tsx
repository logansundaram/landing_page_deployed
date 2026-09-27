import type { ReactNode } from "react";

/**
 * Centers a section's content. Sections themselves are full-bleed — the
 * measure lives here, not on <main> — so any section can break out to the
 * full viewport width (hero art, CTA slab) while text stays readable.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
