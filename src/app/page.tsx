/**
 * DominionArts Homepage — V5 Presença
 *
 * Sections:
 * 1. Full-screen hero (h-svh) — DA monogram, tagline, dual CTA
 * 2. V5 Header — sticky, appears right after hero
 * 3. Collection preview — cream bg, 4 products, horiz scroll mobile / grid desktop
 * 4. Navy quote strip — full-width skewed, "Cercar-se do que merece permanecer"
 * 5. Latest editorial — white bg, 3-col grid
 * 6. Manifesto teaser — cream bg, excerpt from foundational post
 * 7. Instagram CTA — white bg, image strip + link
 * 8. V5 Footer
 */
import Link from "next/link"
import Image from "next/image"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { getLatestPosts, formatDate } from "@/lib/editorial"
import { V5Header } from "@/components/v5-header"
import { V5Footer } from "@/components/v5-footer"

// Latest 3 non-foundational posts for the editorial section
const latestPosts = getLatestPosts(editorialPosts)
  .filter((p) => p.presentationStyle !== "foundational")
  .slice(0, 3)

// Mock collection pieces
const collectionPieces = [
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

const STATUS_STYLES: Record<string, string> = {
  "Disponível": "text-emerald-700 bg-emerald-50",
  "Reservado": "text-slate-500 bg-slate-100",
  "Sob consulta": "text-amber-700 bg-amber-50",
}

// Instagram post grid (mock)
const instagramImages = [
  "https://picsum.photos/seed/insta1/300/300",
  "https://picsum.photos/seed/insta2/300/300",
  "https://picsum.photos/seed/insta3/300/300",
  "https://picsum.photos/seed/insta4/300/300",
  "https://picsum.photos/seed/insta5/300/300",
  "https://picsum.photos/seed/insta6/300/300",
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ─────────────────────────────────────────────────────
          1. FULL-SCREEN HERO
          h-svh — total immersion. DA monogram centered.
          Two CTAs in the lower third.
          Lab nav in corner for dev access.
      ───────────────────────────────────────────────────── */}
      <div className="relative h-svh min-h-[600px] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/da-home-hero/1600/1000"
          alt="DominionArts"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient: subtle dark top + strong dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/85" />

        {/* Dev lab link — top left */}
        <div className="absolute top-5 left-5 md:left-8 z-20">
          <Link
            href="/lab"
            className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
          >
            UI Lab →
          </Link>
        </div>

        {/* Center: DA monogram */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div
            className="flex items-center justify-center w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full mb-6"
            style={{
              border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="font-serif text-[26px] sm:text-[32px]"
              style={{ color: "oklch(0.75 0.12 85)" }}
            >
              DA
            </span>
          </div>
          <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[56px] text-white tracking-[-0.02em] leading-[1.05] mb-3">
            DominionArts
          </h1>
          <p className="text-[11px] sm:text-[13px] uppercase tracking-[0.28em] text-white/50 mb-12">
            Objetos com presença
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <Link
              href="#colecao"
              className="px-7 py-3 bg-white text-brand-navy text-[13px] font-medium rounded-full hover:bg-white/90 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
            >
              Ver coleção
            </Link>
            <Link
              href="/v5"
              className="px-7 py-3 border border-white/30 text-white text-[13px] font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Ler o editorial
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          2. V5 HEADER — sticky, appears after hero
      ───────────────────────────────────────────────────── */}
      <V5Header />

      {/* ─────────────────────────────────────────────────────
          3. COLLECTION PREVIEW
          Cream background. Horizontal scroll on mobile,
          4-col grid on desktop.
      ───────────────────────────────────────────────────── */}
      <section id="colecao" className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-2">
                Coleção · Novidades
              </p>
              <h2 className="font-serif text-[24px] md:text-[30px] text-brand-navy tracking-[-0.02em]">
                Seleção desta semana
              </h2>
            </div>
            <Link
              href="#"
              className="hidden sm:block text-[13px] text-slate-400 hover:text-brand-navy transition-colors shrink-0"
            >
              Ver coleção completa →
            </Link>
          </div>

          {/* Cards — horizontal scroll mobile, grid desktop */}
          <div className="-mx-5 md:mx-0 px-5 md:px-0 overflow-x-auto md:overflow-visible">
            <div className="flex gap-4 md:grid md:grid-cols-4 md:gap-5 w-max md:w-auto">
              {collectionPieces.map((piece, i) => (
                <a
                  key={i}
                  href={piece.href}
                  className="group block w-[200px] sm:w-[220px] md:w-auto shrink-0 md:shrink"
                >
                  <div className="relative rounded-xl overflow-hidden bg-white mb-3 aspect-[3/4]">
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`text-[9px] font-medium uppercase tracking-[0.08em] px-2 py-0.5 rounded-full ${STATUS_STYLES[piece.status] ?? "text-slate-500 bg-slate-100"}`}>
                        {piece.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[14px] md:text-[15px] text-brand-navy leading-tight mb-0.5 line-clamp-2 group-hover:text-brand-navy/80 transition-colors">
                    {piece.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">{piece.period}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile "ver tudo" */}
          <div className="mt-6 sm:hidden">
            <Link
              href="#"
              className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors"
            >
              Ver coleção completa →
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          4. NAVY QUOTE STRIP — full-width, skewed
      ───────────────────────────────────────────────────── */}
      <div
        className="overflow-hidden"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <div
          style={{
            background: "oklch(0.30 0.06 250)",
            transform: "skewY(-1.5deg)",
            padding: "4rem 1.5rem",
          }}
        >
          <div style={{ transform: "skewY(1.5deg)" }}>
            <p className="font-serif text-[24px] sm:text-[34px] md:text-[48px] lg:text-[58px] text-white font-bold italic tracking-[-0.03em] leading-[1.12] max-w-5xl mx-auto px-2 sm:px-8 md:px-16 text-center">
              &ldquo;Cercar-se do que merece permanecer.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          5. LATEST EDITORIAL — white bg, 3-col grid
      ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">

          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-2">
                Editorial
              </p>
              <h2 className="font-serif text-[24px] md:text-[30px] text-brand-navy tracking-[-0.02em]">
                Últimos ensaios
              </h2>
            </div>
            <Link
              href="/v5"
              className="hidden sm:block text-[13px] text-slate-400 hover:text-brand-navy transition-colors shrink-0"
            >
              Ver todos os artigos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/v5/${post.slug}`}
                className="group overflow-hidden rounded-2xl bg-white border border-slate-100 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="aspect-[3/2] overflow-hidden bg-stone-50">
                  <Image
                    src={post.image ?? `https://picsum.photos/seed/${post.slug}/600/400`}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-brand-gold mb-2">
                    {CATEGORY_LABELS[post.category]}
                  </p>
                  <h3 className="font-serif text-[17px] md:text-[19px] leading-snug text-brand-navy line-clamp-2 group-hover:text-brand-navy/80 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[13px] leading-6 text-slate-400 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-slate-300">{formatDate(post.publishedAt)}</span>
                    <span className="text-[12px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                      Ler →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/v5" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
              Ver todos os artigos →
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          6. MANIFESTO TEASER — cream bg
          Excerpt from the foundational text + CTA
      ───────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-5 md:px-8 text-center">

          <div
            className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-8"
            style={{ border: "1px solid oklch(0.75 0.12 85 / 0.30)" }}
          >
            <span className="font-serif text-[14px]" style={{ color: "oklch(0.75 0.12 85)" }}>
              DA
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-5">
            Texto fundador
          </p>

          <h2 className="font-serif text-[26px] sm:text-[34px] md:text-[42px] text-brand-navy tracking-[-0.025em] leading-[1.1] mb-6">
            Domínio e Arte
          </h2>

          <p className="font-serif text-[17px] md:text-[19px] italic text-slate-500 leading-[1.75] mb-4 max-w-xl mx-auto">
            &ldquo;Há objetos que não envelhecem — acumulam. Há técnicas que não se perdem — evoluem. Há espaços que não esquecemos — nos habitam.&rdquo;
          </p>

          <p className="text-[15px] leading-7 text-slate-500 max-w-lg mx-auto mb-10">
            Uma reflexão sobre matéria, cultura, técnica, permanência e presença. O ensaio que define a visão da DominionArts.
          </p>

          <Link
            href="/foundational/v5"
            className="inline-flex items-center gap-2 px-7 py-3 border border-brand-navy/20 text-brand-navy text-[13px] font-medium rounded-full hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all duration-200"
          >
            Ler o ensaio completo
            <span>→</span>
          </Link>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          7. INSTAGRAM CTA — white bg
          Image strip (6-col mosaic) + link to gateway
      ───────────────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20 border-t border-slate-100">
        <div className="mx-auto max-w-[1360px] px-5 md:px-8">

          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-2">
              Instagram
            </p>
            <h2 className="font-serif text-[22px] md:text-[28px] text-brand-navy tracking-[-0.02em] mb-1">
              @dominionarts
            </h2>
            <p className="text-[14px] text-slate-400">
              Peças, espaços e referências que nos orientam.
            </p>
          </div>

          {/* Mosaic grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 md:gap-2 mb-8 rounded-2xl overflow-hidden">
            {instagramImages.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden bg-stone-100">
                <Image
                  src={src}
                  alt=""
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/instagram/v5"
              className="inline-flex items-center gap-2 px-7 py-3 bg-brand-navy text-white text-[13px] font-medium rounded-full hover:bg-brand-navy/90 transition-colors shadow-[0_4px_16px_rgba(15,23,42,0.18)]"
            >
              Ver no Instagram
              <span>↗</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          8. V5 FOOTER
      ───────────────────────────────────────────────────── */}
      <V5Footer />

    </div>
  )
}
