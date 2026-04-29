/**
 * Instagram V6 — Presença (Website Edition)
 * Same content as V5 but presented as a proper full-width website page:
 *   - V5Header component (full nav, wide max-w-[1360px])
 *   - Full-bleed section backgrounds (cream, navy) at viewport width
 *   - Content constrained to max-w-[1360px], not narrow phone container
 *   - Desktop-first layout shifts: multi-col grids, side-by-side editorial
 * Mobile-first responsive throughout.
 */
import Link from "next/link"
import Image from "next/image"
import { V5Header } from "@/components/v5-header"
import { V5Footer } from "@/components/v5-footer"

const HEADER_H = 56

const navLinks = [
  {
    label: "Coleção",
    description: "Objetos com presença histórica, material e estética.",
    href: "#",
  },
  {
    label: "Editorial",
    description: "Ensaios sobre beleza, técnica, memória e permanência.",
    href: "#",
  },
  {
    label: "Curadoria de ambientes",
    description: "Para arquitetos, designers e colecionadores.",
    href: "#",
  },
  {
    label: "Sobre a DominionArts",
    description: "Visão, história e compromisso com o excepcional.",
    href: "#",
  },
]

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

const featuredPost = {
  title: "Beleza como herança",
  excerpt:
    "Por que certos objetos atravessam o tempo não apenas como decoração, mas como memória material. Uma reflexão sobre permanência, técnica e o papel do olhar cultivado.",
  category: "Visão",
  image: "https://picsum.photos/seed/beleza/900/600",
  href: "/v5/beleza-como-heranca",
}

const STATUS_STYLES: Record<string, string> = {
  Disponível: "text-emerald-700 bg-emerald-50",
  Reservado: "text-slate-500 bg-slate-100",
  "Sob consulta": "text-amber-700 bg-amber-50",
}

export default function InstagramV6Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── DEV NAV ──────────────────────────────────────── */}
      <div className="absolute top-5 left-5 z-20">
        <Link
          href="/instagram"
          className="text-[11px] text-white/60 hover:text-white transition-colors backdrop-blur-sm"
        >
          ← variações
        </Link>
      </div>
      <div className="absolute top-5 right-5 z-20">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/50 border border-white/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
          V6 · Website
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────
          FULL-BLEED HERO — same height logic as V5
      ───────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: `calc(100svh - ${HEADER_H}px)`, minHeight: 500 }}
      >
        <Image
          src="https://picsum.photos/seed/da-hero-insta/1600/900"
          alt="DominionArts"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white" />

        {/* Brand identity — left-aligned on desktop, centered on mobile */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-[1360px]">
            <div className="max-w-lg">
              <div
                className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-6"
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="font-serif text-[20px] sm:text-[24px]"
                  style={{ color: "oklch(0.75 0.12 85)" }}
                >
                  DA
                </span>
              </div>
              <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[60px] text-white tracking-[-0.02em] leading-[1.0] mb-3">
                DominionArts
              </h1>
              <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.24em] text-white/55 mb-8">
                Objetos com presença
              </p>
              <a
                href="#colecao"
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white text-[13px] font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                Explorar a coleção
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── V5 HEADER (sticky, full-width) ──────────────── */}
      <V5Header backHref="/instagram" backLabel="Instagram" />

      {/* ─────────────────────────────────────────────────────
          NAVIGATION — grid on desktop, list on mobile
      ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-8 pt-12 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="group flex flex-col gap-1.5 py-5 sm:py-0 sm:px-6 first:sm:pl-0 last:sm:pr-0 hover:bg-slate-50/60 sm:hover:bg-transparent transition-colors sm:py-1"
            >
              <span className="text-[15px] sm:text-[16px] font-medium text-brand-navy group-hover:text-brand-gold transition-colors">
                {link.label}
              </span>
              <span className="text-[11px] sm:text-[12px] text-slate-400 leading-tight">
                {link.description}
              </span>
              <span className="text-brand-gold/50 text-sm group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all mt-auto pt-2">
                →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          PRODUCTS — full-bleed cream background
      ───────────────────────────────────────────────────── */}
      <section id="colecao" className="bg-cream py-14 md:py-16">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-1.5">Coleção</p>
              <h2 className="font-serif text-[24px] sm:text-[28px] md:text-[32px] text-brand-navy tracking-[-0.01em]">
                Seleção desta semana
              </h2>
            </div>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-brand-navy transition-colors"
            >
              Ver coleção completa →
            </a>
          </div>

          {/* Product grid — 2 col mobile → 4 col desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <a key={i} href={product.href} className="group block">
                <div className="relative rounded-xl overflow-hidden bg-white mb-3 aspect-[3/4]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[9px] font-medium uppercase tracking-[0.08em] px-2 py-0.5 rounded-full ${
                        STATUS_STYLES[product.status] ?? "text-slate-500 bg-slate-100"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-[14px] sm:text-[15px] text-brand-navy leading-tight mb-0.5 line-clamp-2 group-hover:text-brand-navy/75 transition-colors">
                  {product.name}
                </h3>
                <p className="text-[11px] text-slate-400">{product.period}</p>
              </a>
            ))}
          </div>

          {/* Mobile link */}
          <div className="mt-8 text-center sm:hidden">
            <a href="#" className="text-[13px] text-brand-gold hover:text-brand-gold-dark transition-colors">
              Ver coleção completa →
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          EDITORIAL — side-by-side on desktop
      ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-8 py-14 md:py-16">

        <div className="flex items-center gap-3 mb-8">
          <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold">Editorial</p>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <Link
          href={featuredPost.href}
          className="group grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr] gap-0 rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-[0_8px_32px_rgba(15,23,42,0.08)] transition-all duration-300"
        >
          {/* Image */}
          <div className="overflow-hidden bg-stone-50 aspect-[16/9] md:aspect-auto md:min-h-[340px]">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              width={900}
              height={600}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-brand-gold block mb-3">
              {featuredPost.category}
            </span>
            <h2 className="font-serif text-[22px] sm:text-[26px] md:text-[30px] leading-[1.15] text-brand-navy group-hover:text-brand-navy/80 transition-colors tracking-[-0.01em] mb-4">
              {featuredPost.title}
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-6.5 text-slate-500 mb-6">
              {featuredPost.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
              Ler ensaio
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </div>
        </Link>
      </section>

      {/* ─────────────────────────────────────────────────────
          MANIFESTO — full-bleed navy background
      ───────────────────────────────────────────────────── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-6 bg-brand-gold/50" />
              <span className="text-[8px] uppercase tracking-[0.24em] text-brand-gold/70">Visão</span>
              <div className="h-px w-6 bg-brand-gold/50" />
            </div>
            <blockquote>
              <p className="font-serif text-[24px] sm:text-[30px] md:text-[36px] text-white leading-[1.3] italic tracking-[-0.01em] mb-6">
                &ldquo;Cercar-se do que merece permanecer.&rdquo;
              </p>
            </blockquote>
            <p className="text-[14px] leading-7 text-white/45 mb-8 max-w-lg mx-auto">
              Objetos que atravessam gerações carregam mais do que estética — são testemunhos da habilidade humana, da história e do gosto cultivado ao longo do tempo.
            </p>
            <Link
              href="/foundational/v5"
              className="inline-flex items-center gap-2.5 border border-brand-gold/30 text-brand-gold text-[13px] font-medium px-6 py-3 rounded-full hover:bg-brand-gold/10 transition-colors"
            >
              Ler o texto fundador
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          CONCIERGE CTA — full-bleed cream
      ───────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">
          <div className="flex flex-col items-center text-center gap-8 max-w-lg mx-auto">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-3">Curadoria privada</p>
              <p className="font-serif text-[24px] sm:text-[28px] md:text-[32px] text-brand-navy leading-[1.2] tracking-[-0.01em] mb-3">
                Procura uma peça específica?
              </p>
              <p className="text-[14px] sm:text-[15px] text-slate-500 leading-6.5">
                Para aquisições, curadoria de ambiente e consultas privadas —
                nossa equipe acompanha sua busca do início ao fim.
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+vim+pelo+Instagram"
                className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white text-[13px] font-medium px-8 py-3.5 rounded-full hover:bg-brand-navy/90 transition-colors shadow-[0_4px_18px_rgba(15,23,42,0.15)]"
              >
                Falar com a curadoria
                <span>↗</span>
              </a>
              <Link
                href="/colecao"
                className="inline-flex items-center justify-center gap-2 border border-brand-navy/20 text-brand-navy text-[13px] font-medium px-8 py-3.5 rounded-full hover:bg-brand-navy/5 transition-colors"
              >
                Ver coleção
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── V5 FOOTER ────────────────────────────────────── */}
      <V5Footer />

    </div>
  )
}
