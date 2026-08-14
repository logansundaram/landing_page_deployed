import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* The confidence ramp as the touch icon — matches icon.svg and LogoMark. */
const RAMP = ["#dcd4be", "#d5b36a", "#d28a21", "#c25518", "#ac040c"];

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
          gap: "11px",
          backgroundColor: "#050507",
        }}
      >
        {RAMP.map((fill) => (
          <div
            key={fill}
            style={{ width: "22px", height: "90px", backgroundColor: fill }}
          />
        ))}
      </div>
    ),
    { ...size },
  );
}
