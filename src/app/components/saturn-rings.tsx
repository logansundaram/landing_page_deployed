/**
 * Saturn as a full-width observatory sheet — a panoramic 1800×800 drawing
 * meant to span the whole viewport. The ring system is concentric hairline
 * ellipses (C ring, B ring, Cassini division, A ring, a lone cyan F ring,
 * and an outer dotted "approval boundary") with true occlusion: rings pass
 * behind the planet above the ring plane and in front of it below. All
 * strokes use non-scaling-stroke so the hairlines stay hairlines at any
 * viewport width. The linework draws itself on page load (`.ring-draw`);
 * callouts and the title block fade in after (`.ring-fade`). A square
 * satellite rides the F ring via SMIL.
 *
 * `pathId` must be unique per page — it namespaces the clip paths and the
 * satellite's motion path.
 */

const TILT = -12;
const CX = 1050;
const CY = 400;
const ASPECT = 0.26; // ry / rx for every ring — one viewing angle
const PLANET_R = 160;

type Tone = "edge" | "strong" | "accent";

const TONES: Record<Tone, string> = {
  edge: "var(--color-edge)",
  strong: "var(--color-edge-strong)",
  accent: "var(--color-accent)",
};

/* [rx, tone, opacity, strokeWidth] — grouped like the real ring system */
const RINGS: [number, Tone, number, number][] = [
  // C ring — faint inner band
  [200, "edge", 0.9, 1],
  [216, "edge", 0.9, 1],
  [232, "strong", 0.8, 1],
  [246, "strong", 0.9, 1],
  // B ring — densest, carries the cyan
  [262, "strong", 1, 1],
  [274, "accent", 0.3, 1],
  [286, "strong", 1, 1.25],
  [297, "accent", 0.22, 1],
  [308, "strong", 1, 1],
  [320, "accent", 0.38, 1.25],
  [331, "strong", 1, 1],
  [343, "strong", 0.9, 1.5],
  // Cassini division, then the A ring
  [378, "strong", 1, 1.25],
  [392, "accent", 0.22, 1],
  [406, "strong", 0.9, 1],
  [420, "strong", 0.8, 1],
  [434, "accent", 0.26, 1],
  [448, "strong", 0.8, 1],
  // F ring — thin, bright, alone
  [520, "accent", 0.6, 1.5],
];

function RingSet({ delayOffset = 0 }: { delayOffset?: number }) {
  return (
    <>
      {RINGS.map(([rx, tone, opacity, width], i) => (
        <ellipse
          key={rx}
          cx={CX}
          cy={CY}
          rx={rx}
          ry={rx * ASPECT}
          stroke={TONES[tone]}
          strokeOpacity={opacity}
          strokeWidth={width}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="ring-draw"
          style={{ animationDelay: `${delayOffset + i * 45}ms` }}
        />
      ))}
      {/* Outer dotted orbit — the approval boundary */}
      <ellipse
        cx={CX}
        cy={CY}
        rx={780}
        ry={780 * ASPECT}
        stroke={TONES.strong}
        strokeWidth={1}
        strokeDasharray="2 8"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="ring-draw"
        style={{ animationDelay: `${delayOffset + RINGS.length * 45}ms` }}
      />
    </>
  );
}

function Label({
  x,
  y,
  anchor = "start",
  size = 14,
  fill = "var(--color-muted)",
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "end";
  size?: number;
  fill?: string;
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-mono)"
      fontSize={size}
      letterSpacing="0.06em"
      fill={fill}
      paintOrder="stroke"
      stroke="var(--color-ink)"
      strokeWidth={6}
      strokeLinejoin="round"
    >
      {children}
    </text>
  );
}

export default function SaturnRings({
  pathId,
  className = "",
}: {
  pathId: string;
  className?: string;
}) {
  const fRy = 520 * ASPECT; // 135.2

  return (
    <svg
      viewBox="0 0 1800 800"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      <defs>
        {/* Half-planes along the ring plane, in the tilted coordinate space */}
        <clipPath id={`${pathId}-behind`}>
          <rect x="-300" y="-300" width="2400" height="700" />
        </clipPath>
        <clipPath id={`${pathId}-infront`}>
          <rect x="-300" y="400" width="2400" height="700" />
        </clipPath>
        <clipPath id={`${pathId}-planet`}>
          <circle cx={CX} cy={CY} r={PLANET_R} />
        </clipPath>
      </defs>

      <g transform={`rotate(${TILT} ${CX} ${CY})`}>
        {/* Rings behind the planet */}
        <g clipPath={`url(#${pathId}-behind)`}>
          <RingSet />
        </g>

        {/* Planet disk occludes the far side of the rings */}
        <circle
          cx={CX}
          cy={CY}
          r={PLANET_R}
          fill="var(--color-ink)"
          stroke="var(--color-edge-strong)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Latitude bands */}
        <g clipPath={`url(#${pathId}-planet)`}>
          <ellipse
            cx={CX}
            cy={344}
            rx={155}
            ry={27}
            stroke="var(--color-edge)"
            vectorEffect="non-scaling-stroke"
          />
          <ellipse
            cx={CX}
            cy={410}
            rx={160}
            ry={31}
            stroke="var(--color-edge)"
            vectorEffect="non-scaling-stroke"
          />
          <ellipse
            cx={CX}
            cy={470}
            rx={144}
            ry={25}
            stroke="var(--color-edge)"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Rings in front of the planet */}
        <g clipPath={`url(#${pathId}-infront)`}>
          <RingSet delayOffset={120} />
        </g>

        {/* Motion path for the satellite — the F ring */}
        <path
          id={pathId}
          d={`M ${CX + 520} ${CY} A 520 ${fRy} 0 1 0 ${CX - 520} ${CY} A 520 ${fRy} 0 1 0 ${CX + 520} ${CY}`}
        />
        <g className="ring-fade motion-reduce:hidden">
          <rect x="-4" y="-4" width="8" height="8" fill="var(--color-accent)" />
          <animateMotion dur="28s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </g>
        <rect
          className="hidden motion-reduce:block"
          x={CX + 516}
          y={CY - 4}
          width="8"
          height="8"
          fill="var(--color-accent)"
        />
      </g>

      {/* ── Callouts ─────────────────────────────────────────────────── */}
      <g className="ring-fade">
        {/* 01 · the machine */}
        <polyline
          points="1163,287 1240,190 1360,190"
          stroke="var(--color-edge-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="1160" y="284" width="6" height="6" fill="var(--color-accent)" />
        <Label x={1240} y={176}>
          <tspan fill="var(--color-accent)">01</tspan>
          <tspan fill="var(--color-muted)"> — your machine</tspan>
        </Label>
        <Label x={1240} y={212} size={12} fill="var(--color-faint)">
          models &amp; data stay here
        </Label>

        {/* 02 · the loop */}
        <polyline
          points="1386,329 1450,260 1570,260"
          stroke="var(--color-edge-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="1383" y="326" width="6" height="6" fill="var(--color-accent)" />
        <Label x={1450} y={246}>
          <tspan fill="var(--color-accent)">02</tspan>
          <tspan fill="var(--color-muted)"> — the loop</tspan>
        </Label>
        <Label x={1450} y={282} size={12} fill="var(--color-faint)">
          every step on screen
        </Label>

        {/* 03 · the gate */}
        <polyline
          points="1092,599 1160,670 1300,670"
          stroke="var(--color-edge-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="1089" y="596" width="6" height="6" fill="var(--color-accent)" />
        <Label x={1160} y={658}>
          <tspan fill="var(--color-accent)">03</tspan>
          <tspan fill="var(--color-muted)"> — the gate</tspan>
        </Label>
        <Label x={1160} y={692} size={12} fill="var(--color-faint)">
          side effects wait for approval
        </Label>

        {/* ── Title block ────────────────────────────────────────────── */}
        <rect
          x="1560"
          y="640"
          width="210"
          height="74"
          fill="var(--color-ink)"
          stroke="var(--color-edge-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 1560 664 H 1770 M 1560 688 H 1770"
          stroke="var(--color-edge)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <Label x={1570} y={658} size={11} fill="var(--color-muted)">
          fig. 01 — saturn vi
        </Label>
        <Label x={1570} y={682} size={11} fill="var(--color-faint)">
          ring span 282,000 km
        </Label>
        <Label x={1570} y={706} size={11} fill="var(--color-faint)">
          scale 1:1.2e9 · rev 2026.08
        </Label>
      </g>
    </svg>
  );
}
