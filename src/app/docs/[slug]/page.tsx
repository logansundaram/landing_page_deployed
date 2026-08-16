import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/page-header";
import DocsShell from "../../components/docs/docs-shell";
import { DocBlocks } from "../../components/docs/doc-blocks";
import { docNeighbors, docPages, getDoc } from "../../lib/docs";
import { site } from "../../lib/site";

export function generateStaticParams() {
  return docPages.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  const title = `${doc.title} · docs`;
  return {
    title,
    description: `${doc.summary} — ${site.product} documentation.`,
    alternates: { canonical: `/docs/${doc.slug}` },
    openGraph: {
      title: `${title} — ${site.name}`,
      description: doc.summary,
      url: `/docs/${doc.slug}`,
      type: "article",
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const { prev, next } = docNeighbors(slug);

  return (
    <>
      <PageHeader eyebrow={`docs :: ${doc.group}`} title={doc.title} lead={doc.summary} />
      <DocsShell>
        <article>
          <DocBlocks blocks={doc.blocks} />
        </article>

        <nav
          className="mt-16 grid gap-px border border-edge bg-edge sm:grid-cols-2"
          aria-label="Previous / next"
        >
          <PagerLink doc={prev} dir="prev" />
          <PagerLink doc={next} dir="next" />
        </nav>
      </DocsShell>
    </>
  );
}

function PagerLink({
  doc,
  dir,
}: {
  doc?: { slug: string; title: string };
  dir: "prev" | "next";
}) {
  if (!doc) return <div className="bg-ink p-5" aria-hidden />;
  return (
    <Link
      href={`/docs/${doc.slug}`}
      className={`group bg-ink p-5 t-colors hover:bg-panel ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      <p className="type-micro lowercase text-faint">
        {dir === "prev" ? "← previous" : "next →"}
      </p>
      <p className="mt-1 text-sm lowercase text-muted t-colors group-hover:text-fg">
        {doc.title}
      </p>
    </Link>
  );
}
