import type { ReactNode } from "react";

/**
 * The site's emphasis voice: Newsreader italic inside display text.
 * Use once per page — emphasis that appears everywhere is emphasis nowhere.
 */
export default function Em({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <em
      className={`font-serif text-[1.06em] font-medium italic ${
        accent ? "text-accent" : "text-fg"
      }`}
    >
      {children}
    </em>
  );
}
