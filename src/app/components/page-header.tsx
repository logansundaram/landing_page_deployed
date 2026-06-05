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
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl leading-tight tracking-tight text-fg md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {lead}
        </p>
      </Container>
    </div>
  );
}
