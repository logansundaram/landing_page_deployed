import { prerelease } from "../lib/site";

/* Renders the v2 pre-release footnote, or nothing once `prerelease` in
   lib/site.ts is null. `inverse` is for the cyan get-started slab. */
export default function PrereleaseNote({
  className = "",
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  if (!prerelease) return null;
  return (
    <p
      className={`type-micro lowercase ${inverse ? "text-ink/70" : "text-faint"} ${className}`}
    >
      <span className={inverse ? "text-ink" : "text-ramp-1"}>*</span>{" "}
      {prerelease}
    </p>
  );
}
