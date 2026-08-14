import type { ReactNode } from "react";
import Container from "./container";

/** Shared header for interior pages (Docs, Install). Display type, micro
    caption — same three-register scale as the front door. */
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
        <p className="type-micro mb-5 flex items-center gap-3 lowercase">
          <span className="text-muted">{eyebrow}</span>
          <span aria-hidden className="h-px w-16 bg-edge" />
        </p>
        <h1 className="type-display lowercase text-fg">{title}</h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">{lead}</p>
      </Container>
    </div>
  );
}
