"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#050505", color: "#F5F5F5", margin: 0, fontFamily: "sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <h1 style={{ fontSize: "72px", fontWeight: 700, marginBottom: "16px" }}>500</h1>
          <p style={{ color: "#8A8A8A", fontSize: "18px", marginBottom: "32px" }}>Global application error</p>
          <button onClick={() => reset()} style={{ padding: "12px 24px", border: "1px solid #222", borderRadius: "100px", color: "#F5F5F5", background: "transparent", fontSize: "14px", textTransform: "uppercase", cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
