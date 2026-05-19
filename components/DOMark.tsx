import Image from "next/image";

type Props = {
  size?: number;
  variant?: "black" | "white";
  className?: string;
  style?: React.CSSProperties;
};

const SRC: Record<NonNullable<Props["variant"]>, string> = {
  black: "/brand/logomark-black.png",
  white: "/brand/logomark-white.png",
};

export function DOMark({ size = 64, variant = "black", className, style }: Props) {
  return (
    <Image
      src={SRC[variant]}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
}
