import { ImageResponse } from "next/og";
import { site } from "./lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Social card in the product's skin: mono type, cyan on dark, whole-line
   emphasis. No gradients. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050507",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
            <circle
              cx="32"
              cy="32"
              r="14"
              stroke="#ededf0"
              strokeWidth="3.5"
            />
            <ellipse
              cx="32"
              cy="32"
              rx="23"
              ry="9"
              transform="rotate(-18 32 32)"
              stroke="#00ffff"
              strokeWidth="3.5"
            />
          </svg>
          <div style={{ fontSize: "30px", color: "#ededf0" }}>saturn</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 400,
              color: "#ededf0",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            ai agents should
          </div>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              color: "#00ffff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            show their work.
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "28px",
              color: "#9a9aa6",
              maxWidth: "860px",
              lineHeight: 1.4,
            }}
          >
            a local-first terminal agent — every plan, tool call, and decision
            on screen, behind approval gates.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#00ffff", fontSize: "26px" }}>$</span>
          <span style={{ color: "#9a9aa6", fontSize: "26px" }}>
            {site.installCommand}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
