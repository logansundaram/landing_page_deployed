import type { DocPage } from "./types";
import { firstSession, installation, introduction } from "./pages/getting-started";
import { answers, approvalGate, plans, trust } from "./pages/control";
import {
  commands,
  configuration,
  headless,
  knowledge,
  mcp,
  observability,
  tools,
} from "./pages/reference";

/* Reading order — the sidebar, prev/next links, and the sitemap all derive
   from this one list. */
export const docPages: DocPage[] = [
  introduction,
  installation,
  firstSession,
  plans,
  approvalGate,
  trust,
  answers,
  tools,
  mcp,
  knowledge,
  observability,
  headless,
  commands,
  configuration,
];

export const docGroups = Array.from(new Set(docPages.map((d) => d.group))).map(
  (group) => ({ group, pages: docPages.filter((d) => d.group === group) }),
);

export function getDoc(slug: string): DocPage | undefined {
  return docPages.find((d) => d.slug === slug);
}

export function docNeighbors(slug: string) {
  const i = docPages.findIndex((d) => d.slug === slug);
  return {
    prev: i > 0 ? docPages[i - 1] : undefined,
    next: i >= 0 && i < docPages.length - 1 ? docPages[i + 1] : undefined,
  };
}

export type { DocPage, Block } from "./types";
