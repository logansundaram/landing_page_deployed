import type { ReactNode } from "react";

/**
 * Horizontal gutters inside the page rails (the max-width lives on <main>
 * in layout.tsx so the rails run continuously down the page).
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`w-full px-6 md:px-10 ${className}`}>{children}</div>;
}
