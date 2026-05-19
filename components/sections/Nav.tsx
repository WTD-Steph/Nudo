import { Wordmark } from "../Wordmark";

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center bg-cream px-12 py-5">
      <div className="flex gap-7 text-sm font-medium">
        <a className="hover:text-rust" href="#">Shop</a>
        <a className="hover:text-rust" href="#">Starter kits</a>
        <a className="hover:text-rust" href="#">Guides</a>
        <a className="hover:text-rust" href="#">About</a>
      </div>
      <Wordmark height={28} variant="green" />
      <div className="flex items-center justify-end gap-3 text-sm">
        <a href="#">Sign in</a>
        <a
          className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2 text-[13px] font-semibold text-cream"
          href="#"
        >
          Cart
          <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-cream text-[11px] font-bold text-ink">
            0
          </span>
        </a>
      </div>
    </nav>
  );
}
