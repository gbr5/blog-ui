/**
 * V3 — Publicação
 * Visual-forward. Full-bleed cover for the foundational post.
 * Asymmetric featured layout. More magazine/gallery aesthetic.
 * Still premium, but image-led rather than typography-led.
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

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

export default function V3Page() {
  const foundational = getFoundationalPost(editorialPosts)
  const featured = getFeaturedEditorialPosts(editorialPosts)
  const [firstFeatured, ...restFeatured] = featured
  const allLatest = getLatestPosts(editorialPosts)
  const gridPosts = allLatest.filter(
    (p) => p.slug !== foundational?.slug && p.slug !== firstFeatured?.slug
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Back to index */}
      <div className="absolute top-5 left-5 md:left-8 z-20">
        <Link
          href="/"
          className="text-[13px] text-white/70 hover:text-white transition-colors backdrop-blur-sm"
        >
          ← Índice
        </Link>
      </div>

      {/* Variant badge */}
      <div className="absolute top-5 right-5 md:right-8 z-20">
        <div className="rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/80">
            V3 — Publicação
          </span>
        </div>
      </div>

      {/* ─── FULL-BLEED FOUNDATIONAL COVER ─── */}
      {foundational && (
        <div className="relative h-[75vh] md:h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden">
          <Image
            src={foundational.image ?? `https://picsum.photos/seed/${foundational.slug}/1400/900`}
            alt={foundational.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy/50 to-transparent" />

          {/* Content — bottom aligned */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-16 md:pb-14 lg:px-20 lg:pb-16">
            <div className="max-w-[680px]">
              {/* Kicker */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand-gold" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-gold">
                  Texto fundador
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-5xl lg:text-[54px] text-white tracking-[-0.025em] leading-[1.04] mb-4">
                {foundational.title}
              </h1>

              <p className="text-[15px] md:text-[17px] leading-7 text-white/65 mb-7 max-w-lg">
                {foundational.excerpt}
              </p>

              <div className="flex items-center gap-6 flex-wrap">
                <Link
                  href="/foundational/v3"
                  className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-2.5 text-[14px] font-medium text-white hover:bg-white/10 hover:border-white/50 transition-all"
                >
                  Ler o ensaio fundador
                </Link>
                <span className="text-[13px] text-white/40">
                  {formatDate(foundational.publishedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── FEATURED — ASYMMETRIC ─── */}
      <div className="bg-white px-5 md:px-8 lg:px-12 py-14 md:py-16 max-w-[1360px] mx-auto">
        {firstFeatured && (
          <section className="mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold mb-6">
              Em destaque
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
              {/* Large card */}
              <Link href={`/v3/${firstFeatured.slug}`}>
              <article className="group overflow-hidden rounded-2xl border border-slate-200/60">
                <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                  <Image
                    src={firstFeatured.image ?? `https://picsum.photos/seed/${firstFeatured.slug}/900/500`}
                    alt={firstFeatured.title}
                    width={900}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-2">
                    {CATEGORY_LABELS[firstFeatured.category]}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.02em] text-brand-navy mb-3 group-hover:text-brand-navy/80 transition-colors leading-tight">
                    {firstFeatured.title}
                  </h2>
                  <p className="text-[15px] leading-7 text-slate-500 mb-5">
                    {firstFeatured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-slate-400">{formatDate(firstFeatured.publishedAt)}</span>
                    <span className="text-[14px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                      Ler ensaio →
                    </span>
                  </div>
                </div>
              </article>
              </Link>

              {/* Stacked smaller cards */}
              <div className="flex flex-col gap-4">
                {restFeatured.map((post) => (
                  <Link key={post.slug} href={`/v3/${post.slug}`}>
                  <article
                    className="group flex gap-4 overflow-hidden rounded-xl border border-slate-200/60 p-4 hover:border-brand-navy/15 transition-all"
                  >
                    <div className="shrink-0 w-[90px] aspect-square overflow-hidden rounded-lg bg-stone-100">
                      <Image
                        src={post.image ?? `https://picsum.photos/seed/${post.slug}/240/240`}
                        alt={post.title}
                        width={180}
                        height={180}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-1">
                        {CATEGORY_LABELS[post.category]}
                      </p>
                      <h3 className="font-serif text-[16px] leading-snug text-brand-navy mb-1 line-clamp-2 group-hover:text-brand-navy/80 transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-[12px] text-slate-400">{formatDate(post.publishedAt)}</span>
                    </div>
                  </article>
                  </Link>
                ))}

                {/* Category band */}
                <div className="mt-2 rounded-xl border border-sand bg-cream px-5 py-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-navy/50 mb-3">
                    Por tema
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATEGORIES.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-slate-200 px-3 py-1 text-[12px] text-slate-600 hover:border-brand-navy/30 hover:text-brand-navy cursor-pointer transition-all"
                      >
                        {CATEGORY_LABELS[cat]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── GRID — ALL REMAINING ─── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold">
              Todos os artigos
            </p>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
            {gridPosts.map((post) => (
              <Link key={post.slug} href={`/v3/${post.slug}`}>
              <article
                className="group overflow-hidden rounded-xl border border-slate-200/60 bg-white hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="aspect-[3/2] overflow-hidden bg-stone-100">
                  <Image
                    src={post.image ?? `https://picsum.photos/seed/${post.slug}/600/400`}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-1.5">
                    {CATEGORY_LABELS[post.category]}
                  </p>
                  <h3 className="font-serif text-[18px] leading-snug tracking-[-0.01em] text-brand-navy mb-2 group-hover:text-brand-navy/80 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[13px] leading-5.5 text-slate-500 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <span className="text-[12px] text-slate-400">{formatDate(post.publishedAt)}</span>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
