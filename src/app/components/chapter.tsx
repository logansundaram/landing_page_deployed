import type { ReactNode } from "react";
import Container from "./container";

/**
 * A landing-page chapter: a hairline seam with the deadpan numbered caption
 * sitting right under it (chapters are numbered because the page reads as a
 * sequence: the pipeline order), then a display-register claim, then the
 * content. The display heading returned 2026-08-14 — the caption alone left
 * chapters reading as one continuous column; the filled status-bar variant
 * was tried and cut the next day (headings are enough).
 */
export default function Chapter({
  n,
  label,
  title,
  children,
  className = "",
}: {
  n: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-edge ${className}`}>
      <Container className="pb-24 pt-8 md:pb-32 md:pt-10">
        <p className="type-micro flex items-center gap-3 lowercase">
          <span className="text-faint">{n}</span>
          <span className="text-faint">::</span>
          <span className="text-accent">{label}</span>
          <span aria-hidden className="h-px min-w-8 flex-1 bg-edge" />
        </p>
        <h2 className="type-display mt-10 lowercase md:mt-12">{title}</h2>
        <div className="mt-12 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
