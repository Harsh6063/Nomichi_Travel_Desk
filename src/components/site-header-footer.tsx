import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-display font-black text-2xl tracking-tight text-ink">
            nomichi
          </span>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.15em] text-olive font-medium">
            travel that finds you
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/#trips"
            className="hidden sm:inline text-sm font-medium text-ink/70 hover:text-ink transition-colors"
          >
            Trips
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
          >
            Team login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 mt-auto">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-display font-bold text-lg text-ink">nomichi</p>
          <p className="text-sm text-ink/60 mt-1">Travel that finds you.</p>
        </div>
        <div className="text-sm text-ink/50">
          <p>hello@thenomichi.com</p>
          <p className="mt-1">© {new Date().getFullYear()} Nomichi. Small groups, slow trips.</p>
        </div>
      </div>
    </footer>
  );
}
