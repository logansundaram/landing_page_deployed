import type { Post } from "./types";
import { introducingEris } from "./posts/introducing-eris";

/* Newest first. The index page, the sitemap, and static params derive from
   this one list. */
export const posts: Post[] = [introducingEris].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export type { Post } from "./types";
