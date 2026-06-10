/**
 * Large decorative planet-and-ring graphic — the favicon mark blown up into a
 * schematic. A small satellite traces the orbit via SMIL so it works without
 * client JS; hidden when the user prefers reduced motion.
 *
 * `pathId` must be unique per page (the satellite references the orbit path
 * by fragment id).
 */
export default function Orbit({
  pathId,
  className = "",
}: {
  pathId: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 640"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      {/* Planet */}
      <circle
        cx="320"
        cy="320"
        r="132"
        stroke="var(--color-edge-strong)"
        strokeWidth="1.5"
      />
      {/* Latitude hint */}
      <ellipse
        cx="320"
        cy="320"
        rx="132"
        ry="44"
        stroke="var(--color-edge)"
        strokeWidth="1"
      />

      <g transform="rotate(-18 320 320)">
        {/* Outer dotted orbit */}
        <ellipse
          cx="320"
          cy="320"
          rx="290"
          ry="112"
          stroke="var(--color-edge-strong)"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        {/* Primary ring — the cyan of the favicon */}
        <path
          id={pathId}
          d="M 550 320 A 230 88 0 1 0 90 320 A 230 88 0 1 0 550 320"
          stroke="var(--color-accent)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        {/* Satellite */}
        <g className="motion-reduce:hidden">
          <circle r="10" fill="var(--color-accent)" fillOpacity="0.15" />
          <circle r="3.5" fill="var(--color-accent)" />
          <animateMotion dur="18s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </g>
      </g>
    </svg>
  );
}
