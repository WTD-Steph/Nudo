import { Wordmark } from "../Wordmark";

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center bg-cream px-12 py-5">
      <div className="flex gap-7 text-sm font-medium">
        <a className="hover:text-clay" href="#">Shop</a>
        <a className="hover:text-clay" href="#">Starter kits</a>
        <a className="hover:text-clay" href="#">Guides</a>
        <a className="hover:text-clay" href="#">About</a>
      </div>
      <Wordmark size={28} color="var(--nl-charcoal)" />
      <div className="flex items-center justify-end gap-3 text-sm">
        <a href="#">Sign in</a>
        <a
          className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-[13px] font-semibold text-cream"
          href="#"
        >
          Cart
          <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-cream text-[11px] font-bold text-charcoal">
            0
          </span>
        </a>
      </div>
    </nav>
  );
}
