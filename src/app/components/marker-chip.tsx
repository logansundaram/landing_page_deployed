/**
 * Square numbered marker — pins a line inside a terminal render to its
 * matching annotation, the way figure callouts work on a schematic.
 */
export default function MarkerChip({
  n,
  className = "",
}: {
  n: string | number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-[18px] w-[18px] shrink-0 select-none items-center justify-center border border-accent/50 bg-accent/10 font-mono text-[10px] leading-none text-accent ${className}`}
    >
      {n}
    </span>
  );
}
