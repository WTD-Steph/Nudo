type Props = {
  size?: number;
  color?: string;
  dotColor?: string;
};

export function Wordmark({ size = 32, color = "currentColor", dotColor }: Props) {
  return (
    <span
      style={{
        fontFamily: "var(--font-urbanist)",
        fontWeight: 700,
        letterSpacing: "-0.045em",
        lineHeight: 1,
        fontSize: size,
        color,
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      NUDO
      <span
        aria-hidden
        style={{
          width: size * 0.18,
          height: size * 0.18,
          borderRadius: "50%",
          background: dotColor ?? color,
          display: "inline-block",
          marginLeft: size * 0.05,
          alignSelf: "flex-end",
          marginBottom: size * 0.12,
        }}
      />
    </span>
  );
}
