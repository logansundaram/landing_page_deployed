import type { ReactNode } from "react";
import Container from "./container";

/** Shared header for interior pages (Docs, Install). */
export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
}) {
  return (
    <div className="border-b border-edge">
      <Container className="py-16 md:py-20">
        <p className="mb-5 flex items-center gap-3 font-mono text-xs">
          <span className="text-faint">::</span>
          <span className="lowercase text-accent">{eyebrow}</span>
          <span aria-hidden className="h-px w-16 bg-edge" />
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {lead}
        </p>
      </Container>
    </div>
  );
}
