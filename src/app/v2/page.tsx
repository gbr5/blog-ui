/**
 * V2 — Hierarquia Editorial
 * The proposed system: foundational hero → featured highlights → category nav → latest grid.
 * Quiet sophistication. No marketing energy. Institutional permanence.
 */
import Link from "next/link"
import Image from "next/image"
import { editorialPosts, CATEGORY_LABELS, type Category } from "@/content/editorial-posts"
import {
  getFoundationalPost,
  getFeaturedEditorialPosts,
  getLatestPosts,
  getCategoryCount,
  formatDate,
} from "@/lib/editorial"

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

export default function V2Page() {
  const foundational = getFoundationalPost(editorialPosts)
  const featured = getFeaturedEditorialPosts(editorialPosts)
  const latest = getLatestPosts(editorialPosts).filter(
    (p) => p.slug !== foundational?.slug
  )
  const categoryCounts = getCategoryCount(editorialPosts)

  return (
    <div className="min-h-screen bg-white">
      {/* Back to index */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-6 pb-0">
        <Link href="/" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
          ← Voltar ao índice
        </Link>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 md:px-8 pb-24">
        {/* Variant badge */}
        <div className="inline-flex items-center gap-2 mt-6 mb-10 rounded-full border border-brand-navy/15 bg-brand-navy/5 px-3 py-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-navy/60">
            V2 — Hierarquia Editorial
          </span>
        </div>

        {/* Page intro */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-gold mb-3">
            Editorial DominionArts
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-brand-navy tracking-[-0.025em] leading-[1.0] mb-5">
            Ensaios sobre<br />objetos e presença
          </h1>
          <p className="text-[16px] md:text-[17px] leading-7 text-slate-500">
            Cultura material, curadoria e o que os objetos nos dizem sobre quem somos.
          </p>
        </div>

        {/* ─── FOUNDATIONAL HERO ─── */}
        {foundational && (
          <div className="mb-16">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80">
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={foundational.image ?? `https://picsum.photos/seed/${foundational.slug}/1200/800`}
                  alt={foundational.title}
                  fill
                  className="object-cover opacity-20"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/90 to-brand-navy/70" />
              </div>

              {/* Content */}
              <div className="relative px-8 py-12 md:px-14 md:py-16 lg:py-20 max-w-2xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-brand-gold mb-5">
                  Texto fundador
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[44px] text-white tracking-[-0.02em] leading-[1.05] mb-6">
                  {foundational.title}
                </h2>
                <p className="text-[15px] md:text-[16px] leading-7 text-white/70 mb-8 max-w-lg">
                  {foundational.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href="/foundational/v2"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-2.5 text-[14px] font-medium text-brand-navy hover:bg-brand-gold-light transition-colors"
                  >
                    Ler o texto fundador
                  </Link>
                  <span className="text-[13px] text-white/40">
                    {formatDate(foundational.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── DESTAQUES EDITORIAIS ─── */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-baseline gap-4 mb-7">
              <h2 className="font-serif text-[22px] md:text-2xl text-brand-navy tracking-[-0.01em]">
                Destaques editoriais
              </h2>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((post) => (
                <Link key={post.slug} href={`/v2/${post.slug}`}>
                <article
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:-translate-y-0.5"
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
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-2">
                      {CATEGORY_LABELS[post.category]}
                    </p>
                    <h3 className="font-serif text-[19px] leading-snug tracking-[-0.01em] text-brand-navy mb-3 group-hover:text-brand-navy/80 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[14px] leading-6 text-slate-500 line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-slate-400">{formatDate(post.publishedAt)}</span>
                      <span className="text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                        Ler →
                      </span>
                    </div>
                  </div>
                </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── CATEGORY NAVIGATION ─── */}
        <section className="mb-14">
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="font-serif text-[22px] md:text-2xl text-brand-navy tracking-[-0.01em]">
              Por tema
            </h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ALL_CATEGORIES.map((cat) => (
              <div
                key={cat}
                className="group flex flex-col gap-1 rounded-xl border border-slate-200 px-4 py-4 hover:border-brand-navy/20 hover:bg-sand-light/50 transition-all duration-200 cursor-pointer"
              >
                <span className="font-medium text-[14px] text-brand-navy group-hover:text-brand-navy/80 transition-colors leading-tight">
                  {CATEGORY_LABELS[cat]}
                </span>
                <span className="text-[12px] text-slate-400">
                  {categoryCounts[cat] ?? 0} artigo{categoryCounts[cat] !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── LATEST POSTS ─── */}
        <section>
          <div className="flex items-baseline gap-4 mb-7">
            <h2 className="font-serif text-[22px] md:text-2xl text-brand-navy tracking-[-0.01em]">
              Últimos artigos
            </h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
            {latest.map((post) => (
              <Link key={post.slug} href={`/v2/${post.slug}`}>
              <article
                className="group flex gap-4 rounded-xl border border-slate-200/60 p-4 transition-all duration-200 hover:border-brand-navy/15 hover:bg-slate-50/50"
              >
                {/* Thumbnail */}
                <div className="shrink-0 w-[100px] md:w-[120px] aspect-square overflow-hidden rounded-lg bg-stone-100">
                  <Image
                    src={post.image ?? `https://picsum.photos/seed/${post.slug}/240/240`}
                    alt={post.title}
                    width={240}
                    height={240}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-1.5">
                    {CATEGORY_LABELS[post.category]}
                  </p>
                  <h3 className="font-serif text-[17px] leading-snug tracking-[-0.01em] text-brand-navy mb-1.5 group-hover:text-brand-navy/80 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[13px] leading-5 text-slate-500 line-clamp-2 mb-2">
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
