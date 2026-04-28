/**
 * Instagram V5 — Presença
 * Follows the V5 blog design language: light, cheerful, image-led.
 * Mobile-first, narrow container.
 * Adds products section (new vs V1–V4).
 * Sticky mini-header: logo + search icon + shop + menu.
 */
import Link from "next/link"
import Image from "next/image"

// ── Navigation links ─────────────────────────────────────
const navLinks = [
  {
    label: "Coleção",
    description: "Objetos com presença histórica, material e estética.",
    href: "#",
    icon: "○",
  },
  {
    label: "Editorial",
    description: "Ensaios sobre beleza, técnica, memória e permanência.",
    href: "#",
    icon: "○",
  },
  {
    label: "Curadoria de ambientes",
    description: "Para arquitetos, designers e colecionadores.",
    href: "#",
    icon: "○",
  },
  {
    label: "Sobre a DominionArts",
    description: "Visão, história e compromisso com o excepcional.",
    href: "#",
    icon: "○",
  },
]

// ── Featured products ─────────────────────────────────────
const products = [
  {
    name: "Cristo Barroco em Marfim",
    period: "Séc. XVIII · Portugal",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/cristo/400/520",
    href: "#",
  },
  {
    name: "Caligrafia Otomana",
    period: "Séc. XVIII",
    status: "Disponível",
    image: "https://picsum.photos/seed/cali2/400/520",
    href: "#",
  },
  {
    name: "Têxtil Adamascado",
    period: "Séc. XVII",
    status: "Reservado",
    image: "https://picsum.photos/seed/textil/400/520",
    href: "#",
  },
  {
    name: "Secretária Neoclássica",
    period: "Séc. XIX · RJ",
    status: "Disponível",
    image: "https://picsum.photos/seed/secretaria/400/520",
    href: "#",
  },
]

// ── Featured editorial post ────────────────────────────────
const featuredPost = {
  slug: "beleza-como-heranca",
  title: "Beleza como herança",
  excerpt: "Por que certos objetos atravessam o tempo não apenas como decoração, mas como memória material.",
  category: "Visão",
  image: "https://picsum.photos/seed/beleza/900/600",
}

const STATUS_STYLES: Record<string, string> = {
  "Disponível": "text-emerald-700 bg-emerald-50",
  "Reservado": "text-slate-500 bg-slate-100",
  "Sob consulta": "text-amber-700 bg-amber-50",
}

export default function InstagramV5Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── STICKY MINI-HEADER ─────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/97 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
        <div className="mx-auto w-full max-w-sm md:max-w-md px-5 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link href="/instagram" className="flex items-baseline gap-1.5">
            <span className="font-serif text-[18px] text-brand-navy tracking-[-0.01em]">DA</span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-brand-gold leading-none mb-px hidden sm:block">
              Studio
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 focus-within:border-brand-navy/25 focus-within:bg-white transition-all">
            <svg className="w-3 h-3 text-slate-350 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Buscar peças, artigos..."
              className="flex-1 bg-transparent text-[12px] text-brand-navy placeholder:text-slate-400 outline-none min-w-0"
            />
          </div>

          {/* Shop + menu */}
          <div className="shrink-0 flex items-center gap-0.5">
            <button className="p-2 text-brand-navy/45 hover:text-brand-navy transition-colors" aria-label="Loja">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </button>
            <button className="p-2 text-brand-navy/45 hover:text-brand-navy transition-colors" aria-label="Menu">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg px-5 sm:px-6 pb-16">

        {/* ── BRAND HERO ─────────────────────────────────── */}
        <div className="pt-10 sm:pt-12 pb-10 text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-5 border border-brand-gold/20 bg-cream"
          >
            <span className="font-serif text-[18px] sm:text-[20px] text-brand-gold">DA</span>
          </div>
          <h1 className="font-serif text-[22px] sm:text-[26px] text-brand-navy tracking-[-0.01em] mb-1.5">
            DominionArts
          </h1>
          <p className="text-[12px] uppercase tracking-[0.18em] text-slate-400 mb-6">
            Objetos com presença
          </p>
          <div className="w-8 h-px bg-brand-gold/40 mx-auto" />
        </div>

        {/* ── NAVIGATION ──────────────────────────────────── */}
        <nav className="mb-10">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-slate-100 last:border-0"
            >
              <div className="min-w-0">
                <span className="block text-[15px] sm:text-[16px] font-medium text-brand-navy group-hover:text-brand-gold transition-colors">
                  {link.label}
                </span>
                <span className="block text-[11px] mt-0.5 text-slate-400 leading-tight">
                  {link.description}
                </span>
              </div>
              <span className="shrink-0 ml-4 text-brand-gold/50 text-sm group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </a>
          ))}
        </nav>

        {/* ─────────────────────────────────────────────────
            PRODUCTS SECTION — cream background strip
        ───────────────────────────────────────────────── */}
        <section className="-mx-5 sm:-mx-6 mb-10">

          {/* Section header */}
          <div className="bg-cream px-5 sm:px-6 pt-7 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.20em] text-brand-gold mb-1">
                  Coleção
                </p>
                <h2 className="font-serif text-[18px] sm:text-[20px] text-brand-navy">
                  Seleção desta semana
                </h2>
              </div>
              <a
                href="#"
                className="text-[11px] text-slate-400 hover:text-brand-navy transition-colors"
              >
                Ver tudo →
              </a>
            </div>
          </div>

          {/* 2-col product grid */}
          <div className="bg-cream px-5 sm:px-6 pb-7">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {products.map((product, i) => (
                <a key={i} href={product.href} className="group block">
                  <div className="relative rounded-xl overflow-hidden bg-white mb-2.5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={390}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* Status badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.08em] px-2 py-0.5 rounded-full ${STATUS_STYLES[product.status] ?? "text-slate-500 bg-slate-100"}`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[13px] sm:text-[14px] text-brand-navy leading-tight mb-0.5 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">{product.period}</p>
                </a>
              ))}
            </div>
          </div>

        </section>

        {/* ── EDITORIAL HIGHLIGHT ─────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[9px] uppercase tracking-[0.20em] text-brand-gold">Editorial</p>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <a href="#" className="group block rounded-xl overflow-hidden border border-slate-100 bg-white hover:shadow-[0_4px_16px_rgba(15,23,42,0.07)] transition-all">
            <div className="aspect-[16/9] overflow-hidden bg-stone-50">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                width={600}
                height={338}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-5">
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-brand-gold block mb-1.5">
                {featuredPost.category}
              </span>
              <h2 className="font-serif text-[16px] sm:text-[17px] leading-snug text-brand-navy group-hover:text-brand-navy/80 transition-colors mb-2">
                {featuredPost.title}
              </h2>
              <p className="text-[12px] sm:text-[13px] leading-5.5 text-slate-500 line-clamp-2 mb-3">
                {featuredPost.excerpt}
              </p>
              <span className="text-[12px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                Ler ensaio →
              </span>
            </div>
          </a>
        </section>

        {/* ── MANIFESTO QUOTE STRIP ─────────────────────── */}
        <section className="bg-brand-navy -mx-5 sm:-mx-6 px-7 sm:px-8 py-10 sm:py-12 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-5 bg-brand-gold/50" />
            <span className="text-[8px] uppercase tracking-[0.22em] text-brand-gold/70">Visão</span>
          </div>
          <blockquote>
            <p className="font-serif text-[18px] sm:text-[20px] text-white leading-[1.4] italic mb-4">
              &ldquo;Cercar-se do que merece permanecer.&rdquo;
            </p>
          </blockquote>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[11px] text-brand-gold/80 hover:text-brand-gold transition-colors"
          >
            <span>Ler o texto fundador</span>
            <span>→</span>
          </a>
        </section>

        {/* ── CONCIERGE CTA ───────────────────────────────── */}
        <section className="rounded-2xl border border-brand-gold/20 bg-cream px-5 py-6 sm:py-7 text-center mb-10">
          <p className="font-serif text-[16px] sm:text-[18px] text-brand-navy leading-tight mb-1.5">
            Procura uma peça específica?
          </p>
          <p className="text-[12px] sm:text-[13px] text-slate-500 leading-5.5 mb-5">
            Para aquisições, curadoria de ambiente e consultas privadas.
          </p>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+vim+pelo+Instagram"
            className="inline-flex items-center gap-2 bg-brand-navy text-white text-[13px] font-medium px-6 py-3 rounded-full hover:bg-brand-navy/90 transition-colors shadow-[0_4px_14px_rgba(15,23,42,0.18)]"
          >
            <span>Falar com a curadoria</span>
            <span>↗</span>
          </a>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <p className="text-center text-[10px] sm:text-[11px] text-slate-300 tracking-wider">
          dominionarts.com.br
        </p>
      </div>
    </div>
  )
}
