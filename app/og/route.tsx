import { ImageResponse } from "next/og";

export const runtime = "edge";

const GREEN = "#0D330E";
const CREAM = "#FDF8DE";
const MUSTARD = "#E3AD55";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "For every first brews.";
  const eyebrow = searchParams.get("eyebrow") ?? "Nudo Lab";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: CREAM,
          padding: "72px",
          fontFamily: "ui-sans-serif, system-ui",
          color: GREEN,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(13,51,14,0.6)",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(13,51,14,0.5)",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            nudolab.com
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontSize: title.length > 50 ? 64 : 88,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 0.95,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: -2,
                color: GREEN,
              }}
            >
              NUDO
            </span>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: MUSTARD,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(13,51,14,0.6)",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            ヌードラボ · For every first brews.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
