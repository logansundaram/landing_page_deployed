import type { ReactNode } from "react";
import Container from "../container";
import DocsSidebar from "./docs-sidebar";

export default function DocsShell({ children }: { children: ReactNode }) {
  return (
    <Container className="py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <DocsSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </Container>
  );
}
