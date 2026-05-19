import { ComingSoon } from "@/components/ComingSoon";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <ComingSoon
      eyebrow="Cart"
      title="Your cart is empty — and so is ours."
      blurb="Checkout is coming. Browse the basics, find something you'd buy when it launches, and email us. We'll set one aside."
    />
  );
}
