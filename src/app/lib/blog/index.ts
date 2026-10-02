import type { Post } from "./types";
import { introducingEris } from "./posts/introducing-eris";
import { saturnV2 } from "./posts/saturn-v2";
import { saturnV2Reach } from "./posts/saturn-v2-reach";

/* Newest first. The index page, the sitemap, and static params derive from
   this one list. */
export const posts: Post[] = [introducingEris, saturnV2, saturnV2Reach].sort(
  (a, b) => (a.date < b.date ? 1 : -1),
);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export type { Post } from "./types";
