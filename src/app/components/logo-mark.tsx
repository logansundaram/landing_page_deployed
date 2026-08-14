/**
 * The brand mark is the confidence ramp: five bars, certain to uncertain,
 * luminance falling left to right (matches icon.svg and apple-icon.tsx).
 * The one place chromatic color appears as identity — never decoration.
 */
const RAMP = [
  "var(--color-ramp-0)",
  "var(--color-ramp-1)",
  "var(--color-ramp-2)",
  "var(--color-ramp-3)",
  "var(--color-ramp-4)",
];

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      {RAMP.map((fill, i) => (
        <rect key={i} x={4 + i * 12} y={16} width={8} height={32} fill={fill} />
      ))}
    </svg>
  );
}
