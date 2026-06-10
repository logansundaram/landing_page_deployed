import Container from "./container";

/** Shared header for interior pages (Docs, Install). */
export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="border-b border-edge">
      <Container className="py-16 md:py-20">
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
          <span className="text-accent">{"//"}</span>
          <span className="text-accent">{eyebrow}</span>
          <span aria-hidden className="h-px w-8 bg-edge-strong" />
        </p>
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-fg md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {lead}
        </p>
      </Container>
    </div>
  );
}
