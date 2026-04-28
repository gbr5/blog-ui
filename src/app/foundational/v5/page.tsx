/**
 * F5 — Presença Máxima
 * The foundational text as a ceremonial experience.
 *
 * Differentiators vs regular V5 post:
 * - Full-screen hero (h-svh) — total immersion, DA monogram centered
 * - V5 Header appears below the hero, sticks as you scroll
 * - Drop cap on the lead paragraph
 * - Wider pullquote type (up to 64px)
 * - Section with cream background break for reading rhythm
 * - Ornate divider: ◆ · ◆ · ◆
 * - Ceremonial colophon closing (no related products)
 * - Single "próxima leitura" card instead of a grid
 * - Reading time in meta
 */
import Link from "next/link"
import Image from "next/image"
import { postContent } from "@/content/post-content"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { formatDate } from "@/lib/editorial"
import { V5Header } from "@/components/v5-header"
import { V5Footer } from "@/components/v5-footer"

const POST_SLUG = "dominio-e-arte-o-que-herdamos-moldamos-e-legamos"
const post = editorialPosts.find((p) => p.slug === POST_SLUG)!
const blocks = postContent[POST_SLUG]

// Sections that get the cream background treatment
// (by block index — the "Cultura, narrativa e prosperidade" chapter)
const CREAM_SECTION_RANGE = [8, 9, 10] // indices of the blocks to cream-bg

// Next essay card
const nextEssay = editorialPosts.find((p) => p.slug === "beleza-como-heranca")!

export default function FoundationalV5Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── DEV NAV ─────────────────────────────────────── */}
      <div className="absolute top-5 left-5 md:left-8 z-20">
        <Link
          href="/foundational"
          className="text-[12px] text-white/60 hover:text-white transition-colors backdrop-blur-sm"
        >
          ← Alternativas
        </Link>
      </div>
      <div className="absolute top-5 right-5 md:right-8 z-20">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/50 border border-white/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
          F5 · Presença Máxima
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────
          FULL-SCREEN HERO — total immersion
          h-svh (full viewport). DA monogram centered.
          Title sits in the lower third.
          No header peeking — this page opens in ceremony.
      ───────────────────────────────────────────────────── */}
      <div className="relative h-svh min-h-[600px] overflow-hidden">
        <Image
          src={post.image ?? "https://picsum.photos/seed/dominio/1400/900"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient: subtle dark top, strong dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/80" />

        {/* Top: DA monogram — ceremonial */}
        <div className="absolute top-1/4 left-0 right-0 flex flex-col items-center">
          <div
            className="flex items-center justify-center w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full mb-5"
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
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
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.30em] text-white/45">
            Texto fundador
          </p>
        </div>

        {/* Bottom: Title + kicker */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-20 pb-14 md:pb-20">
          <div className="max-w-[780px] mx-auto md:mx-0">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-brand-gold">
                DominionArts · {CATEGORY_LABELS[post.category]}
              </span>
            </div>
            <h1 className="font-serif text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] text-white tracking-[-0.03em] leading-[1.01] mb-6">
              {post.title}
            </h1>
            <p className="font-serif text-[17px] sm:text-[20px] italic text-white/60 max-w-2xl leading-[1.6]">
              &ldquo;{post.excerpt}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          STICKY HEADER
          Appears right after the full-screen hero.
          Sticks to top as the reader scrolls.
      ───────────────────────────────────────────────────── */}
      <V5Header backHref="/foundational" backLabel="Fundador" />

      {/* ─────────────────────────────────────────────────────
          ARTICLE — centered column
      ───────────────────────────────────────────────────── */}
      <article>

        {/* Meta bar */}
        <div className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-8 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-400">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="text-slate-200">·</span>
            <span className="text-brand-gold font-medium">{CATEGORY_LABELS[post.category]}</span>
            <span className="text-slate-200">·</span>
            <span>Leitura: ~8 minutos</span>
          </div>
        </div>

        {/* Body */}
        {blocks.map((block, i) => {
          const inCreamSection = CREAM_SECTION_RANGE.includes(i)
          const isFirstCream = i === CREAM_SECTION_RANGE[0]
          const isLastCream = i === CREAM_SECTION_RANGE[CREAM_SECTION_RANGE.length - 1]

          // ── Lead paragraph with drop cap ──
          if (block.type === "lead") {
            const firstLetter = block.text[0]
            const rest = block.text.slice(1)
            return (
              <div key={i} className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-2">
                <p className="font-serif text-[20px] md:text-[23px] leading-[1.8] text-brand-navy">
                  <span
                    className="float-left font-serif leading-none mr-3 mt-1 select-none"
                    style={{
                      fontSize: "clamp(4rem, 8vw, 5.5rem)",
                      color: "oklch(0.75 0.12 85)",
                      lineHeight: 0.85,
                    }}
                    aria-hidden="true"
                  >
                    {firstLetter}
                  </span>
                  {rest}
                </p>
              </div>
            )
          }

          // ── Pullquote — full-width navy strip, larger type for foundational ──
          if (block.type === "pullquote") {
            return (
              <figure
                key={i}
                className="my-16 md:my-24"
                style={{
                  marginLeft: "calc(-50vw + 50%)",
                  marginRight: "calc(-50vw + 50%)",
                  width: "100vw",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "oklch(0.30 0.06 250)",
                    transform: "skewY(-2deg)",
                    padding: "4rem 1.5rem",
                  }}
                >
                  <blockquote style={{ transform: "skewY(2deg)" }}>
                    <p
                      className="font-serif text-[28px] sm:text-[40px] md:text-[52px] lg:text-[62px] text-white font-bold tracking-[-0.03em] leading-[1.12] max-w-5xl mx-auto px-2 sm:px-8 md:px-16"
                    >
                      &ldquo;{block.text}&rdquo;
                    </p>
                  </blockquote>
                </div>
              </figure>
            )
          }

          // ── Ornate divider ──
          if (block.type === "divider") {
            return (
              <div key={i} className="mx-auto max-w-[700px] px-5 md:px-8 my-14 flex items-center justify-center gap-4">
                <div className="flex-1 h-px bg-slate-200/70" />
                <div className="flex items-center gap-2.5 text-brand-gold/60">
                  <span className="text-[8px]">◆</span>
                  <span className="text-[5px]">·</span>
                  <span className="text-[8px]">◆</span>
                  <span className="text-[5px]">·</span>
                  <span className="text-[8px]">◆</span>
                </div>
                <div className="flex-1 h-px bg-slate-200/70" />
              </div>
            )
          }

          // ── Heading — ceremonial treatment ──
          if (block.type === "heading") {
            return (
              <div
                key={i}
                className={`mx-auto max-w-[700px] px-5 md:px-8 mt-14 mb-6 ${inCreamSection ? "bg-cream" : ""}`}
              >
                {isFirstCream && <div className="pt-10" />}
                <div className="flex items-center gap-5 mb-4">
                  <div className="h-px flex-1 bg-brand-gold/25" />
                </div>
                <h2 className="font-serif text-[21px] md:text-[25px] text-brand-navy tracking-[-0.015em] mb-2">
                  {block.text}
                </h2>
                <div className="h-px w-10 bg-brand-gold" />
              </div>
            )
          }

          // ── Note ──
          if (block.type === "note") {
            return (
              <div key={i} className={inCreamSection ? "bg-cream" : ""}>
                <aside className="mx-auto max-w-[700px] px-5 md:px-8 my-8">
                  <div className="flex gap-4 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-5 py-5">
                    <div className="shrink-0 w-0.5 bg-brand-gold rounded-full" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-gold mb-2">
                        Nota editorial
                      </p>
                      <p className="text-[14px] leading-7 text-slate-600 italic">{block.text}</p>
                    </div>
                  </div>
                </aside>
                {isLastCream && <div className="pb-10" />}
              </div>
            )
          }

          // ── Paragraph — with cream section support ──
          if (block.type === "paragraph") {
            return (
              <div key={i} className={inCreamSection ? "bg-cream" : ""}>
                <p
                  className="mx-auto max-w-[700px] px-5 md:px-8 text-[16px] md:text-[17px] leading-[1.95] text-slate-600 mb-7"
                  style={{ paddingTop: isFirstCream ? "2.5rem" : undefined, paddingBottom: isLastCream ? "2.5rem" : undefined }}
                >
                  {block.text}
                </p>
              </div>
            )
          }

          return null
        })}

        {/* ── CEREMONIAL COLOPHON ─────────────────────── */}
        <div className="mx-auto max-w-[700px] px-5 md:px-8 pt-8 pb-20">
          <div className="flex flex-col items-center text-center pt-6 border-t border-slate-100">
            {/* Seal */}
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full mb-5 mt-2"
              style={{ border: "1px solid oklch(0.75 0.12 85 / 0.35)" }}
            >
              <span className="font-serif text-[16px]" style={{ color: "oklch(0.75 0.12 85)" }}>
                DA
              </span>
            </div>
            <p className="font-serif italic text-[15px] text-brand-navy/60 mb-1">
              DominionArts Editorial
            </p>
            <p className="text-[12px] text-slate-400">{formatDate(post.publishedAt)}</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-brand-gold/60">
              Texto fundador
            </p>
          </div>
        </div>

      </article>

      {/* ─────────────────────────────────────────────────────
          PRÓXIMA LEITURA — single featured card
      ───────────────────────────────────────────────────── */}
      <div className="bg-[#F9F8F6] border-t border-slate-100 py-14 md:py-16">
        <div className="mx-auto max-w-[700px] px-5 md:px-8">

          <div className="flex items-center gap-4 mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold shrink-0">
              Próxima leitura
            </p>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {nextEssay && (
            <Link
              href={`/v5/${nextEssay.slug}`}
              className="group flex flex-col sm:flex-row gap-6 overflow-hidden rounded-2xl bg-white border border-slate-200/60 hover:shadow-[0_8px_28px_rgba(15,23,42,0.09)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="sm:w-[42%] shrink-0 aspect-[16/9] sm:aspect-auto overflow-hidden bg-stone-50">
                <Image
                  src={nextEssay.image ?? `https://picsum.photos/seed/${nextEssay.slug}/600/400`}
                  alt={nextEssay.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 sm:py-8 flex flex-col justify-center">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-brand-gold mb-2">
                  {CATEGORY_LABELS[nextEssay.category]}
                </p>
                <h3 className="font-serif text-[22px] md:text-[26px] tracking-[-0.02em] text-brand-navy leading-tight mb-3 group-hover:text-brand-navy/80 transition-colors">
                  {nextEssay.title}
                </h3>
                <p className="text-[14px] leading-7 text-slate-500 mb-5">
                  {nextEssay.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-400">{formatDate(nextEssay.publishedAt)}</span>
                  <span className="text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                    Ler ensaio →
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      <V5Footer hideNewsletter />

    </div>
  )
}
