import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
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
          padding: "72px 80px",
          backgroundColor: "#0a0b10",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(129,140,248,0.35), transparent 45%), radial-gradient(circle at 95% 90%, rgba(34,211,238,0.25), transparent 45%)",
          color: "#ececf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "linear-gradient(135deg, #818cf8, #22d3ee)",
                color: "white",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div style={{ fontSize: 30, fontWeight: 600 }}>{siteConfig.shortName}</div>
          </div>
          <div style={{ fontSize: 24, color: "#9b9daf" }}>{siteConfig.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#818cf8", fontFamily: "monospace" }}>Hello, I&apos;m</div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -2, marginTop: 8 }}>
            <span>Achira&nbsp;</span>
            <span
              style={{
                backgroundImage: "linear-gradient(100deg, #818cf8, #22d3ee)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Sandaruwan
            </span>
          </div>
          <div style={{ fontSize: 32, color: "#9b9daf", marginTop: 20 }}>{siteConfig.tagline}</div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#9b9daf" }}>{siteConfig.role}</div>
      </div>
    ),
    size,
  );
}
