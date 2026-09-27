import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate, type PostBlock } from "../../content/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found | Saturday.ai" };
  return {
    title: `${post.title} | Saturday.ai`,
    description: post.summary,
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="text-2xl md:text-4xl pt-10 pb-4">{block.text}</h2>;
    case "ul":
      return (
        <ul className="list-disc pl-6 pb-6 space-y-3">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "p":
    default:
      return <p className="pb-6">{block.text}</p>;
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="base">
      <div className="w-full pt-18 max-w-3xl">
        <Link href="/blog" className="link text-sm">
          All posts
        </Link>
        <p className="text-sm text-blue-900 pt-10 pb-2">{formatDate(post.date)}</p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl opacity-0 animate-[fadeUp_0.5s_ease-out_forwards]">
          {post.title}
        </h1>
        <p className="text-xl md:text-2xl text-blue-900 pt-2 opacity-0 animate-[fadeUp_0.7s_ease-out_forwards] [animation-delay:300ms]">
          {post.subtitle}
        </p>
      </div>

      <article className="py-16 md:py-24 max-w-2xl text-lg leading-relaxed">
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>

      <div className="max-w-2xl border-t border-zinc-200 pt-8 flex flex-wrap gap-4">
        <Link href="/eris" className="bg-zinc-900 text-light w-fit p-2 hover:bg-blue-900">
          Learn about Eris
        </Link>
        <Link href="/blog" className="link p-2">
          Back to all posts
        </Link>
      </div>
    </div>
  );
}
