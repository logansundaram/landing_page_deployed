import { ImageResponse } from "next/og";
import { site } from "./lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RAMP = ["#dcd4be", "#d5b36a", "#d28a21", "#c25518", "#ac040c"];

/* Social card in the site's register: mono type, luminance hierarchy, the
   ramp as the only chromatic element. No gradients. */
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
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {RAMP.map((fill) => (
              <div
                key={fill}
                style={{
                  width: "10px",
                  height: "26px",
                  backgroundColor: fill,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: "30px", color: "#e6e4e1" }}>saturn</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 400,
              color: "#9b9891",
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
              color: "#e6e4e1",
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
              color: "#9b9891",
              maxWidth: "860px",
              lineHeight: 1.4,
            }}
          >
            a local-first terminal agent — every plan, tool call, and decision
            on screen, behind approval gates.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#6b6862", fontSize: "26px" }}>$</span>
          <span style={{ color: "#9b9891", fontSize: "26px" }}>
            {site.installCommand}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
