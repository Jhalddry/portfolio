import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0c", borderRadius: 16, color: "#c6ff3d", fontSize: 34, fontWeight: 800, fontFamily: "monospace" }}>
        JG
      </div>
    ),
    size,
  );
}
