type Props = {
  size?: number;
  color?: string;
  className?: string;
};

export function DOMark({ size = 32, color = "currentColor", className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.72}
      viewBox="0 0 100 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nudo Lab logogram"
    >
      <path
        d="M5 8 L5 64 Q5 68 9 68 L34 68 Q52 68 52 36 Q52 4 34 4 L9 4 Q5 4 5 8 Z"
        fill={color}
      />
      <circle cx="70" cy="40" r="22" fill={color} />
      <circle cx="70" cy="40" r="11" fill="var(--punch, transparent)" />
      <path
        d="M22 14 L22 58 L34 58 Q44 58 44 36 Q44 14 34 14 Z"
        fill="var(--punch, transparent)"
      />
    </svg>
  );
}
