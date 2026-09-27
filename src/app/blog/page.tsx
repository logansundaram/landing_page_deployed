import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/container";
import PageHeader from "../components/page-header";
import { posts } from "../lib/blog";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "blog",
  description: `Notes from ${site.name} on what is being built and why: Saturn, Eris, and the trust harness underneath both.`,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "blog — Saturday.ai",
    description: "Notes on what is being built and why.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="blog"
        title="blog."
        lead="Notes on what we are building and why. Dated, unedited after posting, and honest about what is and is not shipped."
      />

      <Container className="py-16 md:py-20">
        <div className="type-micro flex items-center justify-between border-b border-edge py-2.5 lowercase text-faint">
          <p># posts</p>
          <p>
            {posts.length} {posts.length === 1 ? "entry" : "entries"} · newest
            first
          </p>
        </div>

        <div className="border-b border-edge">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid gap-x-8 gap-y-1 border-b border-edge py-5 t-colors last:border-b-0 hover:bg-panel md:grid-cols-[120px_1fr] md:items-baseline"
            >
              <p className="type-micro text-faint">{post.date}</p>
              <div>
                <p className="text-sm font-bold lowercase text-fg t-colors group-hover:text-accent">
                  {post.title}
                </p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
