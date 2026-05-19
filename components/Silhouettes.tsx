// Hand-authored Rust silhouettes for products without real photography.
// Replace each with real product photos when they arrive.

type Props = { className?: string; "aria-label"?: string };

export function SensoryCupSilhouette({ className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 200 240"
      role="img"
      aria-label={rest["aria-label"] ?? "Sensory Cup illustration"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tulip-shaped porcelain cup: narrow rim, wider belly, narrow foot. */}
      <path
        d="M64 32 Q60 56 56 80 Q44 110 56 150 Q70 196 100 198 Q130 196 144 150 Q156 110 144 80 Q140 56 136 32 L64 32 Z"
        fill="#A3481A"
      />
      {/* Inner rim shadow */}
      <path
        d="M68 38 Q66 48 64 66 L136 66 Q134 48 132 38 L68 38 Z"
        fill="#0D330E"
        opacity="0.18"
      />
      {/* Saucer base — implied */}
      <ellipse cx="100" cy="208" rx="44" ry="6" fill="#A3481A" opacity="0.4" />
    </svg>
  );
}

export function DripBagSilhouette({ className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 200 240"
      role="img"
      aria-label={rest["aria-label"] ?? "Drip bag illustration"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer pouch — non-woven drip bag silhouette */}
      <rect x="40" y="40" width="120" height="160" rx="14" fill="#A3481A" />
      {/* Top seal */}
      <rect x="48" y="34" width="104" height="14" rx="3" fill="#0D330E" opacity="0.4" />
      {/* Hang notch */}
      <circle cx="100" cy="38" r="3" fill="#FDF8DE" />
      {/* V60 cone inside (visible through translucent pouch front) */}
      <path
        d="M70 86 L130 86 L100 168 Z"
        fill="#FDF8DE"
        opacity="0.85"
      />
      {/* Coffee fill */}
      <path d="M82 122 L118 122 L100 162 Z" fill="#0D330E" opacity="0.8" />
    </svg>
  );
}
