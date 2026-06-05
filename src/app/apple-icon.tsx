import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050507",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Planet */}
          <circle
            cx="32"
            cy="32"
            r="14"
            stroke="#ededf0"
            strokeWidth="2.5"
          />
          {/* Orbit ring */}
          <ellipse
            cx="32"
            cy="32"
            rx="23"
            ry="9"
            transform="rotate(-18 32 32)"
            stroke="#00ffff"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
