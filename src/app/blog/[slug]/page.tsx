import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../components/container";
import PageHeader from "../../components/page-header";
import { DocBlocks } from "../../components/docs/doc-blocks";
import { getPost, posts } from "../../lib/blog";
import { site } from "../../lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — ${site.name}`,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`blog :: ${post.date}`}
        title={post.title}
        lead={post.summary}
      />

      <Container className="py-16 md:py-20">
        <article className="max-w-2xl">
          <DocBlocks blocks={post.blocks} />
        </article>

        <nav
          className="mt-16 flex flex-wrap items-center gap-3 border-t border-edge pt-8"
          aria-label="Post footer"
        >
          <Bracket href="/blog">all posts</Bracket>
          <Bracket href="/eris">eris</Bracket>
        </nav>
      </Container>
    </>
  );
}

function Bracket({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-11 items-center gap-2 px-3 text-sm lowercase text-fg t-colors hover:text-accent"
    >
      <span aria-hidden className="text-faint t-colors group-hover:text-accent">
        [
      </span>
      {children}
      <span aria-hidden className="text-faint t-colors group-hover:text-accent">
        ]
      </span>
    </Link>
  );
}
