import type { Block } from "../docs/types";

/* Posts are authored as the same typed blocks as the docs, so they render
   through DocBlocks and wear the same three-register type scale. */
export type Post = {
  slug: string;
  title: string;
  /** One line — the index row, metadata description, and post lead. */
  summary: string;
  /** ISO date, YYYY-MM-DD. Printed as-is: the site's register is deadpan. */
  date: string;
  blocks: Block[];
};
