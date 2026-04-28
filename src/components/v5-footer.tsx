/**
 * V5 Footer — Presença
 * Brand-navy background (matches dominionarts footer exactly).
 * Structure: manifesto line → 3-col nav + newsletter → bottom bar.
 * Shared across V5 blog, post, foundational, and homepage.
 */
import Link from "next/link"

const editorialLinks = [
  { label: "Visão", href: "#" },
  { label: "Educação Visual", href: "#" },
  { label: "Guia do Colecionador", href: "#" },
  { label: "Design de Interiores", href: "#" },
]

const collectionLinks = [
  { label: "Coleção", href: "#" },
  { label: "Curadoria de ambientes", href: "#" },
  { label: "Sobre", href: "#" },
  { label: "Contato", href: "#" },
]

const legalLinks = [
  { label: "Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Envio", href: "#" },
]

interface V5FooterProps {
  /** Suppress the newsletter form (e.g. on pages that already have one) */
  hideNewsletter?: boolean
}

export function V5Footer({ hideNewsletter }: V5FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy">

      {/* ── TOP MANIFESTO LINE ─────────────────────────── */}
      <div className="border-b border-white/8 py-12 md:py-16 px-6 md:px-12 text-center">
        <div className="flex items-center justify-center gap-5 mb-7">
          <div className="h-px w-10 bg-brand-gold/40" />
          <span className="text-[9px] uppercase tracking-[0.24em] text-brand-gold/60">
            DominionArts
          </span>
          <div className="h-px w-10 bg-brand-gold/40" />
        </div>
        <p className="font-serif text-[22px] sm:text-[28px] md:text-[34px] text-white/90 italic tracking-[-0.015em] leading-[1.25] max-w-2xl mx-auto">
          Rastros da humanidade. Objetos culturais emoldurados.<br className="hidden sm:block" />
          Uma janela que conta a nossa história.
        </p>
      </div>

      {/* ── MAIN BODY ──────────────────────────────────── */}
      <div className="mx-auto max-w-[1360px] px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-14">

          {/* Col 1 — Brand + Newsletter */}
          <div>
            <div className="mb-6">
              <Link href="/" className="flex items-baseline gap-1.5 group w-fit">
                <span className="font-serif text-[22px] text-white tracking-[-0.01em] group-hover:text-brand-gold transition-colors">
                  DA
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-brand-gold/70 leading-none mb-px">
                  Editorial
                </span>
              </Link>
              <p className="mt-3 text-[13px] leading-6 text-white/45 max-w-xs">
                Objetos com presença. Arte, técnica e permanência — curados para quem coleciona com intenção.
              </p>
            </div>

            {!hideNewsletter && (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-brand-gold mb-3">
                  Editorial semanal
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="flex-1 min-w-0 bg-white/8 border border-white/12 rounded-full px-4 py-2 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-brand-gold/40 focus:bg-white/12 transition-all"
                  />
                  <button className="shrink-0 bg-brand-gold/90 hover:bg-brand-gold text-white text-[12px] font-medium rounded-full px-4 py-2 transition-colors">
                    Assinar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Col 2 — Editorial */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-brand-gold/70 mb-5">
              Editorial
            </p>
            <ul className="space-y-3">
              {editorialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/50 hover:text-white transition-colors leading-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Coleção & Info */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-brand-gold/70 mb-5">
              Coleção
            </p>
            <ul className="space-y-3">
              {collectionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/50 hover:text-white transition-colors leading-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────── */}
      <div className="border-t border-white/8 px-6 md:px-8 lg:px-12 py-5">
        <div className="mx-auto max-w-[1360px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © {year} DominionArts
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
