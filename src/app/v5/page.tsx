/**
 * V5 — Presença
 * Light, cheerful, image-forward editorial hub.
 * Background shifts across sections for rhythm.
 * Sticky header lives right below the hero — sticks to top on scroll.
 * Mobile-first.
 */
import Link from "next/link"
import Image from "next/image"
import { editorialPosts, CATEGORY_LABELS, type Category } from "@/content/editorial-posts"
import {
  getFoundationalPost,
  getFeaturedEditorialPosts,
  getLatestPosts,
  formatDate,
} from "@/lib/editorial"
import { V5Header } from "@/components/v5-header"

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

const HEADER_H = 56 // px — must match h-14 in V5Header

export default function V5Page() {
  const foundational = getFoundationalPost(editorialPosts)
  const featured = getFeaturedEditorialPosts(editorialPosts)
  const [firstFeatured, ...restFeatured] = featured
  const allLatest = getLatestPosts(editorialPosts)
  const gridPosts = allLatest.filter(
    (p) => p.slug !== foundational?.slug && p.slug !== firstFeatured?.slug
  )

  return (
    <div className="min-h-screen bg-white">

      {/* ── DEV NAV ── */}
      <div className="absolute top-5 left-5 md:left-8 z-20">
        <Link
          href="/"
          className="text-[12px] text-white/60 hover:text-white transition-colors backdrop-blur-sm"
        >
          ← UI Lab
        </Link>
      </div>
      <div className="absolute top-5 right-5 md:right-8 z-20">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/50 border border-white/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
          V5 · Presença
        </span>
      </div>

      {/* ─────────────────────────────────────────────
          HERO — Full bleed, white-gradient bottom
          Height = viewport - header height so header
          is always visible at the bottom fold.
      ───────────────────────────────────────────── */}
      {foundational && (
        <div
          className="relative overflow-hidden"
          style={{ height: `calc(100svh - ${HEADER_H}px)`, minHeight: 480 }}
        >
          <Image
            src={foundational.image ?? `https://picsum.photos/seed/${foundational.slug}/1400/900`}
            alt={foundational.title}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient — dark top (for dev nav), white at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />

          {/* Content — anchored above the white fade */}
          <div className="absolute bottom-16 md:bottom-20 left-0 right-0 px-6 md:px-16 lg:px-20">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-brand-gold" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-gold">
                  Texto fundador
                </span>
              </div>
              <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] text-brand-navy tracking-[-0.025em] leading-[1.04] mb-5">
                {foundational.title}
              </h1>
              <p className="text-[15px] md:text-[17px] leading-7 text-slate-600 mb-7 max-w-lg">
                {foundational.excerpt}
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <Link
                  href="/foundational/v3"
                  className="inline-flex items-center gap-2 bg-brand-navy text-white rounded-full px-6 py-2.5 text-[14px] font-medium hover:bg-brand-navy/90 transition-all shadow-[0_4px_16px_rgba(15,23,42,0.20)]"
                >
                  Ler o ensaio →
                </Link>
                <span className="text-[13px] text-slate-400">
                  {formatDate(foundational.publishedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          STICKY HEADER
          Placed right after hero — sticks to top
          when hero scrolls out of view.
      ───────────────────────────────────────────── */}
      <V5Header />

      {/* ─────────────────────────────────────────────
          MANIFESTO PHRASE — cream bg, editorial tone
      ───────────────────────────────────────────── */}
      <div className="bg-cream px-6 py-12 md:py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-brand-gold/40" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-brand-gold">
              DominionArts
            </span>
            <div className="h-px w-8 bg-brand-gold/40" />
          </div>
          <p className="font-serif text-[22px] sm:text-[28px] md:text-[34px] text-brand-navy tracking-[-0.02em] leading-[1.2] italic">
            Cercar-se do que merece permanecer.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          EM DESTAQUE — Asymmetric, cream background
      ───────────────────────────────────────────── */}
      {firstFeatured && (
        <div className="bg-cream px-5 sm:px-6 md:px-8 lg:px-12 pb-14 md:pb-16 max-w-[1360px] mx-auto">

          <div className="flex items-center gap-4 mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold">
              Em destaque
            </p>
            <div className="flex-1 h-px bg-brand-gold/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-5 lg:gap-7">

            {/* Large featured card */}
            <Link href={`/v5/${firstFeatured.slug}`}>
              <article className="group overflow-hidden rounded-2xl bg-white border border-slate-200/50 hover:shadow-[0_8px_32px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-0.5">
                <div className="aspect-[16/9] overflow-hidden bg-stone-50">
                  <Image
                    src={firstFeatured.image ?? `https://picsum.photos/seed/${firstFeatured.slug}/900/500`}
                    alt={firstFeatured.title}
                    width={900}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-brand-gold mb-2">
                    {CATEGORY_LABELS[firstFeatured.category]}
                  </p>
                  <h2 className="font-serif text-[24px] md:text-[28px] tracking-[-0.02em] text-brand-navy mb-3 group-hover:text-brand-navy/80 transition-colors leading-tight">
                    {firstFeatured.title}
                  </h2>
                  <p className="text-[15px] leading-7 text-slate-500 mb-5 max-w-xl">
                    {firstFeatured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-slate-400">{formatDate(firstFeatured.publishedAt)}</span>
                    <span className="text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                      Ler ensaio →
                    </span>
                  </div>
                </div>
              </article>
            </Link>

            {/* Right column: stacked cards + categories */}
            <div className="flex flex-col gap-4">
              {restFeatured.map((post) => (
                <Link key={post.slug} href={`/v5/${post.slug}`}>
                  <article className="group flex gap-4 overflow-hidden rounded-xl bg-white border border-slate-200/50 p-4 hover:border-brand-navy/15 hover:shadow-[0_4px_16px_rgba(15,23,42,0.07)] transition-all">
                    <div className="shrink-0 w-[88px] aspect-square overflow-hidden rounded-lg bg-stone-50">
                      <Image
                        src={post.image ?? `https://picsum.photos/seed/${post.slug}/240/240`}
                        alt={post.title}
                        width={176}
                        height={176}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-1">
                        {CATEGORY_LABELS[post.category]}
                      </p>
                      <h3 className="font-serif text-[15px] leading-snug text-brand-navy mb-1 line-clamp-2 group-hover:text-brand-navy/80 transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-[12px] text-slate-400">{formatDate(post.publishedAt)}</span>
                    </div>
                  </article>
                </Link>
              ))}

              {/* Category pills */}
              <div className="rounded-xl border border-slate-200/60 bg-white px-5 py-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-navy/40 mb-3">
                  Explorar por tema
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_CATEGORIES.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] text-slate-600 hover:border-brand-navy/25 hover:text-brand-navy hover:bg-cream cursor-pointer transition-all"
                    >
                      {CATEGORY_LABELS[cat]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          FULL-WIDTH NAVY QUOTE BREAK
          Background shift — creates page rhythm
      ───────────────────────────────────────────── */}
      <div className="bg-brand-navy py-16 md:py-20 px-6 md:px-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-6 bg-brand-gold/50" />
            <span className="text-[9px] uppercase tracking-[0.22em] text-brand-gold/70">
              Visão editorial
            </span>
            <div className="h-px w-6 bg-brand-gold/50" />
          </div>
          <blockquote>
            <p className="font-serif text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] text-white leading-[1.25] tracking-[-0.02em] italic mb-6">
              "O valor de uma peça repousa no fato de ela condensar uma solução, uma história humana e uma forma de permanência."
            </p>
          </blockquote>
          <p className="text-[13px] text-white/40 uppercase tracking-[0.14em]">
            Domínio e Arte — Texto fundador
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          GRID — All articles, white background
      ───────────────────────────────────────────── */}
      <div className="bg-white px-5 sm:px-6 md:px-8 lg:px-12 py-14 md:py-16 max-w-[1360px] mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold shrink-0">
            Todos os artigos
          </p>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gridPosts.map((post, i) => {
            // Every 4th card: full-width across 2 cols, horizontal layout
            const isWide = i === 3 && gridPosts.length > 4

            return (
              <Link
                key={post.slug}
                href={`/v5/${post.slug}`}
                className={isWide ? "sm:col-span-2" : ""}
              >
                <article
                  className={`group overflow-hidden rounded-xl border border-slate-200/60 bg-white hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 h-full ${
                    isWide ? "flex flex-col sm:flex-row" : ""
                  }`}
                >
                  <div
                    className={`overflow-hidden bg-stone-50 ${
                      isWide
                        ? "sm:w-[45%] shrink-0 aspect-[3/2] sm:aspect-auto"
                        : "aspect-[3/2]"
                    }`}
                  >
                    <Image
                      src={post.image ?? `https://picsum.photos/seed/${post.slug}/600/400`}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col justify-center">
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-1.5">
                      {CATEGORY_LABELS[post.category]}
                    </p>
                    <h3 className="font-serif text-[18px] md:text-[20px] leading-snug tracking-[-0.01em] text-brand-navy mb-2 group-hover:text-brand-navy/80 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[13px] leading-[1.65] text-slate-500 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <span className="text-[12px] text-slate-400">{formatDate(post.publishedAt)}</span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          BOTTOM BREAK — sand bg, newsletter CTA
      ───────────────────────────────────────────── */}
      <div className="bg-[#F4EDD8] px-6 md:px-16 py-14 md:py-16">
        <div className="mx-auto max-w-[1360px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-sm">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold mb-3">
              DominionArts · Curadoria
            </p>
            <h2 className="font-serif text-[24px] md:text-[28px] text-brand-navy tracking-[-0.02em] leading-tight mb-2">
              Receba o que merece permanecer
            </h2>
            <p className="text-[14px] leading-6 text-slate-600">
              Artigos, peças e reflexões sobre cultura material — para quem coleciona com intenção.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 md:w-64 bg-white border border-slate-200 rounded-full px-4 py-2.5 text-[13px] text-brand-navy placeholder:text-slate-400 outline-none focus:border-brand-navy/30 focus:shadow-[0_0_0_3px_rgba(15,23,42,0.04)] transition-all"
            />
            <button className="shrink-0 bg-brand-navy text-white text-[13px] font-medium rounded-full px-5 py-2.5 hover:bg-brand-navy/90 transition-colors">
              Assinar
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
