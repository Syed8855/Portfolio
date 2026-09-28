import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#0a0d12",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7aa2d6",
          borderRadius: 6,
          fontWeight: 700,
          border: "1px solid #1c2738",
          fontFamily: "monospace",
        }}
      >
        H
      </div>
    ),
    {
      ...size,
    }
  );
}
