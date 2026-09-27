/** The planet-and-ring brand mark (matches icon.svg), inheriting text color
    for the planet with the ring in the product's cyan. */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="3.5" />
      <ellipse
        cx="32"
        cy="32"
        rx="23"
        ry="9"
        transform="rotate(-18 32 32)"
        stroke="var(--color-accent)"
        strokeWidth="3.5"
      />
    </svg>
  );
}
