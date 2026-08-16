/**
 * The docs are authored as typed blocks, not markdown — no renderer
 * dependency, and every page wears the same three-register type scale as
 * the rest of the site. Inline text supports three marks:
 *   `code`            → <code>
 *   **bold**          → <strong>
 *   [label](href)     → <a> (internal hrefs stay Next links)
 */
export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string; id?: string }
  | { t: "h3"; text: string }
  | { t: "code"; code: string; label?: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "kv"; rows: [string, string][] }
  | { t: "note"; text: string; kind?: "note" | "warn" };

export type DocPage = {
  slug: string;
  title: string;
  /** One-line summary — used for metadata and the docs index. */
  summary: string;
  group: string;
  blocks: Block[];
};

export const h2 = (text: string): Block => ({ t: "h2", text });
export const h3 = (text: string): Block => ({ t: "h3", text });
export const p = (text: string): Block => ({ t: "p", text });
export const code = (code: string, label?: string): Block => ({
  t: "code",
  code,
  label,
});
export const ul = (...items: string[]): Block => ({ t: "ul", items });
export const ol = (...items: string[]): Block => ({ t: "ol", items });
export const table = (head: string[], ...rows: string[][]): Block => ({
  t: "table",
  head,
  rows,
});
export const kv = (...rows: [string, string][]): Block => ({ t: "kv", rows });
export const note = (text: string, kind: "note" | "warn" = "note"): Block => ({
  t: "note",
  text,
  kind,
});
