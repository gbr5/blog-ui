/**
 * V5 Site Header
 * Sticky (CSS only — no JS). Placed right after the hero image.
 * At page load: sits at the bottom edge of the hero (hero height = viewport - header height).
 * As user scrolls: sticks to top of viewport.
 *
 * Layout: [DA · Conta] ——— [Search bar] ——— [Shop · Menu]
 */
import Link from "next/link"
import { Search, User, ShoppingBag, Menu } from "lucide-react"

interface V5HeaderProps {
  backHref?: string
  backLabel?: string
}

export function V5Header({ backHref, backLabel }: V5HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/97 backdrop-blur-md border-b border-slate-100/80 shadow-[0_1px_12px_rgba(15,23,42,0.05)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-8 h-14 md:h-[60px] flex items-center gap-3 md:gap-5">

        {/* ── Left: Logo + separator + Account ── */}
        <div className="shrink-0 flex items-center gap-3 md:gap-4">
          <Link
            href={backHref ?? "/"}
            className="group flex items-baseline gap-1.5"
            aria-label="DominionArts Editorial"
          >
            <span className="font-serif text-[19px] md:text-[21px] text-brand-navy tracking-[-0.01em] group-hover:text-brand-navy/80 transition-colors">
              DA
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.18em] text-brand-gold leading-none mb-px">
              {backLabel ?? "Editorial"}
            </span>
          </Link>

          <div className="hidden sm:block w-px h-4 bg-slate-200" />

          <button
            className="hidden sm:flex items-center gap-1.5 text-brand-navy/45 hover:text-brand-navy transition-colors py-1"
            aria-label="Minha conta"
          >
            <User className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-[11px] tracking-wide">Conta</span>
          </button>
        </div>

        {/* ── Center: Search ── */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-[500px] flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3.5 py-2 md:py-[9px] transition-all duration-200 focus-within:border-brand-navy/25 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(15,23,42,0.04)]">
            <Search className="w-3.5 h-3.5 text-slate-350 shrink-0" strokeWidth={1.5} />
            <input
              type="search"
              placeholder="Buscar artigos, peças, coleções..."
              className="flex-1 bg-transparent text-[13px] text-brand-navy placeholder:text-slate-400 outline-none min-w-0 leading-none"
            />
            <kbd className="hidden md:inline-flex items-center gap-1 text-[10px] text-slate-350 bg-slate-100 px-1.5 py-0.5 rounded font-mono shrink-0">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* ── Right: Shop + Menu ── */}
        <div className="shrink-0 flex items-center gap-0.5 md:gap-1">
          <button
            className="flex items-center gap-1.5 px-2 md:px-3 py-2 rounded-full text-brand-navy/50 hover:text-brand-navy hover:bg-slate-50 transition-all text-[12px]"
            aria-label="Loja"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            <span className="hidden md:block font-medium">Loja</span>
          </button>
          <button
            className="p-2 rounded-full text-brand-navy/50 hover:text-brand-navy hover:bg-slate-50 transition-all"
            aria-label="Menu"
          >
            <Menu className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  )
}
