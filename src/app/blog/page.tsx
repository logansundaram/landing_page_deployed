import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "../content/posts";

export const metadata: Metadata = {
  title: "Blog | Saturday.ai",
  description: "Notes on what Saturday.ai is building and why.",
};

export default function Blog() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="base">
      <div className="w-full pt-18">
        <h1 className="text-4xl md:pt-10 md:text-6xl lg:text-9xl text-blue-900">
          Blog
        </h1>
        <p>Notes on what we are building and why.</p>
      </div>

      <div className="py-20 md:py-32 max-w-3xl">
        {sorted.map((post) => (
          <article key={post.slug} className="py-10 border-t border-zinc-200">
            <p className="text-sm text-blue-900 pb-2">{formatDate(post.date)}</p>
            <h2 className="text-2xl md:text-4xl">
              <Link href={`/blog/${post.slug}`} className="link">
                {post.title}
              </Link>
            </h2>
            <p className="text-blue-900 pb-4">{post.subtitle}</p>
            <p className="pb-6">{post.summary}</p>
            <Link href={`/blog/${post.slug}`} className="bg-zinc-900 text-light w-fit p-2 hover:bg-blue-900">
              Read the post
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
