/**
 * V1 — Estado Atual
 * Mirror of the current dominionarts.com.br/editorial page.
 * Flat 2-column grid, category filter pills, no hierarchy.
 */
import Link from "next/link"
import Image from "next/image"
import { editorialPosts, CATEGORY_LABELS, type Category } from "@/content/editorial-posts"
import { getLatestPosts, formatDate } from "@/lib/editorial"
import { cn } from "@/lib/utils"

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

export default function V1Page() {
  const posts = getLatestPosts(editorialPosts)

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* Back to index */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 mb-6">
        <Link href="/" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
          ← Voltar ao índice
        </Link>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* Variant badge */}
        <div className="inline-flex items-center gap-2 mb-8 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500">
            V1 — Estado Atual
          </span>
        </div>

        {/* Page header */}
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-brand-gold">
            Conteúdo
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-brand-navy tracking-[-0.02em] leading-[1.0]">
            Editorial
          </h1>
          <p className="mt-4 text-[16px] md:text-[18px] leading-7 md:leading-8 text-slate-500 max-w-xl">
            Artigos sobre arte, história, proveniência e o universo do colecionismo.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="mb-8 md:mb-10 flex flex-wrap gap-2">
          <button className="inline-flex items-center h-9 px-5 rounded-full text-sm font-medium border bg-brand-navy text-white border-brand-navy">
            Todos
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="inline-flex items-center h-9 px-5 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:border-brand-navy/40 hover:text-brand-navy transition-all duration-200"
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Posts grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
          {posts.map((post) => (
            <Link key={post.slug} href={`/v1/${post.slug}`}>
              <article className="group overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-500 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] hover:-translate-y-0.5">
                {/* Image */}
                <div className="block aspect-[4/3] overflow-hidden bg-stone-100">
                  <Image
                    src={post.image ?? `https://picsum.photos/seed/${post.slug}/800/600`}
                    alt={post.title}
                    width={530}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Text area */}
                <div className="p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-brand-gold">
                      {CATEGORY_LABELS[post.category]}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{formatDate(post.publishedAt)}</span>
                  </div>

                  <h3 className="mb-3 font-serif text-[22px] leading-tight tracking-[-0.02em] text-brand-navy group-hover:text-brand-navy/80 transition-colors">
                    {post.title}
                  </h3>

                  <p className="mb-4 line-clamp-3 text-[15px] leading-7 text-slate-600">
                    {post.excerpt}
                  </p>

                  <span className="text-[14px] font-medium text-brand-gold hover:text-brand-gold/80 transition-colors">
                    Ler artigo →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
