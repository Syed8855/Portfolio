import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Syed Hasnain Peeran | ML Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0a0d12",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(122, 162, 214, 0.15) 0%, transparent 50%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#4ade80",
            }}
          />
          <span
            style={{
              color: "#8ea0bd",
              fontSize: "18px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Available for collaboration
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            Syed Hasnain Peeran
          </h1>
          <p
            style={{
              fontSize: "30px",
              color: "#7aa2d6",
              margin: 0,
              fontWeight: 500,
            }}
          >
            ML Engineer · Applied AI Systems
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "#8ea0bd",
              margin: 0,
              maxWidth: "850px",
              lineHeight: 1.5,
            }}
          >
            RAG pipelines, interpretability research, and optimization workflows.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1c2738",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "#8ea0bd", fontSize: "19px" }}>
            github.com/SyedHasnain04
          </span>
          <span style={{ color: "#7aa2d6", fontSize: "19px" }}>
            syed-hasnain-portfolio-opal.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
