import { ImageResponse } from "next/og";
import { site } from "./lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundImage:
            "linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              backgroundColor: "#00ffff",
            }}
          />
          <div style={{ fontSize: "30px", color: "#9a9aa6" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              color: "#ededf0",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            AI agents should be
          </div>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              color: "#00ffff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            transparent.
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              color: "#9a9aa6",
              maxWidth: "820px",
              lineHeight: 1.4,
            }}
          >
            Local-first AI agents that expose workflows, tools, metrics, and
            decisions — in your terminal.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#00ffff", fontSize: "26px" }}>$</span>
          <span style={{ color: "#9a9aa6", fontSize: "26px" }}>
            curl -fsSL saturdayai.org/install.sh | sh
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
