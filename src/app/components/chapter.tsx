import type { ReactNode } from "react";
import Container from "./container";

/**
 * A landing-page chapter: deadpan micro caption row, then content. The
 * caption replaces display-size section headings — chapters are numbered
 * because the page reads as a sequence (the pipeline order), and the
 * content itself carries the size.
 */
export default function Chapter({
  n,
  label,
  children,
  className = "",
}: {
  n: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-edge ${className}`}>
      <Container className="py-20 md:py-28">
        <p className="type-micro flex items-center gap-3 lowercase">
          <span className="text-faint">{n}</span>
          <span className="text-faint">::</span>
          <span className="text-accent">{label}</span>
          <span aria-hidden className="h-px min-w-8 flex-1 bg-edge" />
        </p>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
