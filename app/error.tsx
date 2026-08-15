"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#050505", color: "#F5F5F5", padding: "20px" }}>
      <h1 style={{ fontSize: "72px", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "16px" }}>500</h1>
      <p style={{ color: "#8A8A8A", fontSize: "18px", marginBottom: "32px" }}>Something went wrong</p>
      <div style={{ display: "flex", gap: "16px" }}>
        <button onClick={() => reset()} style={{ padding: "12px 24px", border: "1px solid #222", borderRadius: "100px", color: "#F5F5F5", background: "transparent", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer" }}>
          Try again
        </button>
        <Link href="/" style={{ padding: "12px 24px", border: "1px solid #222", borderRadius: "100px", color: "#F5F5F5", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
