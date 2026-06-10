/**
 * Crosshair registration marks pinned to a section's top corners — where the
 * section's top hairline meets the page rails. Parent must be `relative`.
 */
export default function Crosses() {
  return (
    <>
      <Tick className="-left-[4.5px] -top-[4.5px]" />
      <Tick className="-right-[4.5px] -top-[4.5px]" />
    </>
  );
}

function Tick({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 9 9"
      className={`pointer-events-none absolute z-10 h-[9px] w-[9px] text-edge-strong ${className}`}
    >
      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" />
    </svg>
  );
}
