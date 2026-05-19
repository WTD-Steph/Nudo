import Image from "next/image";

type Props = {
  /** Logical pixel height of the wordmark. */
  height?: number;
  /** Brand colorway. */
  variant?: "green" | "clay" | "cream" | "black" | "white";
  className?: string;
};

const SRC: Record<NonNullable<Props["variant"]>, string> = {
  green: "/brand/wordmark-green.png",
  clay: "/brand/wordmark-clay.png",
  cream: "/brand/wordmark-cream.png",
  black: "/brand/wordmark-black.png",
  white: "/brand/wordmark-white.png",
};

// Real wordmark renders at ~2.83:1 (3508×1241).
const RATIO = 2.83;

export function Wordmark({ height = 32, variant = "green", className }: Props) {
  const width = Math.round(height * RATIO);
  return (
    <Image
      src={SRC[variant]}
      alt="Nudo Lab"
      width={width}
      height={height}
      priority
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
