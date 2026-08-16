"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docGroups } from "../../lib/docs";

/** The docs table of contents — grouped, hairline-plain, active page in
    the product's cyan. Sticky on wide screens; a plain list on phones. */
export default function DocsSidebar() {
  const pathname = usePathname();
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <nav className="space-y-7" aria-label="Documentation">
        <p className="type-micro lowercase text-faint">
          <Link
            href="/docs"
            className={`t-colors hover:text-fg ${
              pathname === "/docs" ? "text-accent" : ""
            }`}
          >
            <span className="text-accent">::</span> overview
          </Link>
        </p>
        {docGroups.map((g) => (
          <div key={g.group}>
            <p className="type-micro mb-3 lowercase text-faint">
              <span className="text-accent">::</span> {g.group}
            </p>
            <ul className="space-y-2">
              {g.pages.map((d) => {
                const href = `/docs/${d.slug}`;
                const active = pathname === href;
                return (
                  <li key={d.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`text-sm lowercase t-colors hover:text-fg ${
                        active ? "text-accent" : "text-muted"
                      }`}
                    >
                      {d.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
