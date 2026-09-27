import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "../../lib/docs/types";

/* ---------- inline marks: `code`, **bold**, [label](href) ---------- */

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="text-fg">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (m) {
          const [, label, href] = m;
          const cls = "text-accent hover:underline";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} className={cls} target="_blank" rel="noreferrer">
              {label}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ---------- blocks ---------- */

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function DocBlocks({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b, i) => renderBlock(b, i))}</>;
}

function renderBlock(b: Block, i: number): ReactNode {
  switch (b.t) {
    case "h2":
      return (
        <h2
          key={i}
          id={b.id ?? slugify(b.text)}
          className="mt-14 scroll-mt-24 border-t border-edge pt-6 text-sm font-bold lowercase text-fg first:mt-0 first:border-t-0 first:pt-0"
        >
          <span className="mr-2 text-accent">::</span>
          {b.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          id={slugify(b.text)}
          className="mt-8 scroll-mt-24 text-sm font-bold lowercase text-muted"
        >
          {b.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          <Inline text={b.text} />
        </p>
      );
    case "code":
      return (
        <div key={i} className="mt-5 overflow-hidden border border-edge bg-panel">
          {b.label && (
            <div className="type-micro border-b border-edge px-4 py-2 lowercase text-faint">
              {b.label}
            </div>
          )}
          <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-fg">
            <code>{b.code}</code>
          </pre>
        </div>
      );
    case "ul":
      return (
        <ul key={i} className="mt-4 max-w-2xl space-y-2">
          {b.items.map((it, j) => (
            <li
              key={j}
              className="grid grid-cols-[16px_1fr] text-sm leading-relaxed text-muted"
            >
              <span className="text-faint">–</span>
              <span>
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mt-4 max-w-2xl space-y-2">
          {b.items.map((it, j) => (
            <li
              key={j}
              className="grid grid-cols-[28px_1fr] text-sm leading-relaxed text-muted"
            >
              <span className="type-micro pt-0.5 text-accent">
                {String(j + 1).padStart(2, "0")}
              </span>
              <span>
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div key={i} className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] border-y border-edge text-left text-sm">
            <thead>
              <tr className="type-micro border-b border-edge lowercase text-faint">
                {b.head.map((h, j) => (
                  <th key={j} className="py-2.5 pr-6 font-normal last:pr-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, r) => (
                <tr
                  key={r}
                  className="border-b border-edge align-top last:border-b-0 t-colors hover:bg-panel"
                >
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`py-2.5 pr-6 leading-relaxed last:pr-0 ${
                        c === 0 ? "whitespace-nowrap text-fg" : "text-muted"
                      }`}
                    >
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "kv":
      return (
        <div key={i} className="mt-5 border-y border-edge">
          {b.rows.map(([k, v], j) => (
            <div
              key={j}
              className="grid gap-x-8 gap-y-1 border-b border-edge py-4 last:border-b-0 md:grid-cols-[220px_1fr] md:items-baseline"
            >
              <p className="text-sm font-bold lowercase text-fg">
                <Inline text={k} />
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                <Inline text={v} />
              </p>
            </div>
          ))}
        </div>
      );
    case "note":
      return (
        <div
          key={i}
          className={`mt-6 max-w-2xl border-l-2 py-1 pl-4 ${
            b.kind === "warn" ? "border-hot" : "border-accent"
          }`}
        >
          <p className="type-micro mb-1 lowercase text-faint">
            {b.kind === "warn" ? "note :: careful" : "note"}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            <Inline text={b.text} />
          </p>
        </div>
      );
  }
}
