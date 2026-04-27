/**
 * V4 — Arquivo
 * No images. Pure typographic hierarchy.
 * Aesthetic of a literary quarterly or museum publication index.
 * Maximum restraint. The foundational post gets an anchored block.
 * Remaining posts as a clean numbered list.
 */
import Link from "next/link"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import {
  getFoundationalPost,
  getLatestPosts,
  formatDate,
  formatDateShort,
} from "@/lib/editorial"

export default function V4Page() {
  const foundational = getFoundationalPost(editorialPosts)
  const all = getLatestPosts(editorialPosts)
  const rest = all.filter((p) => p.slug !== foundational?.slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Back to index */}
      <div className="mx-auto max-w-[720px] px-6 pt-8 pb-0">
        <Link href="/" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
          ← Voltar ao índice
        </Link>
      </div>

      <div className="mx-auto max-w-[720px] px-6 pt-10 pb-24">
        {/* Variant badge */}
        <div className="inline-flex items-center gap-2 mb-10 rounded-full border border-sand px-3 py-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500">
            V4 — Arquivo
          </span>
        </div>

        {/* Masthead */}
        <div className="mb-12 border-b border-slate-200 pb-10">
          <h1 className="font-serif text-[42px] md:text-[56px] text-brand-navy tracking-[-0.03em] leading-[1.0] mb-3">
            Editorial
          </h1>
          <p className="text-[15px] leading-6 text-slate-400 max-w-md">
            DominionArts · Ensaios sobre cultura material, curadoria e presença.
          </p>
        </div>

        {/* ─── FOUNDATIONAL — ANCHORED BLOCK ─── */}
        {foundational && (
          <div className="mb-12 border-l-2 border-brand-gold pl-6 py-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold mb-3">
              Texto fundador
            </p>
            <h2 className="font-serif text-[26px] md:text-[30px] text-brand-navy tracking-[-0.02em] leading-[1.1] mb-3">
              {foundational.title}
            </h2>
            <p className="text-[15px] leading-7 text-slate-500 mb-4 max-w-lg">
              {foundational.excerpt}
            </p>
            <div className="flex items-center gap-5 text-[13px]">
              <Link
                href="/foundational/v4"
                className="font-medium text-brand-navy hover:text-brand-navy/70 transition-colors"
              >
                Ler o texto fundador ↗
              </Link>
              <span className="text-slate-400">{formatDate(foundational.publishedAt)}</span>
            </div>
          </div>
        )}

        {/* ─── DIVIDER ─── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Índice
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* ─── POST LIST ─── */}
        <ol className="space-y-0">
          {rest.map((post, index) => (
            <li key={post.slug}>
              <Link href={`/v4/${post.slug}`}>
              <article className="group flex gap-6 py-5 border-b border-slate-100 hover:border-slate-200 transition-colors">
                {/* Number */}
                <span
                  className="shrink-0 font-mono text-[13px] text-slate-300 leading-7 w-6 text-right"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-gold">
                      {CATEGORY_LABELS[post.category]}
                    </span>
                    <span className="text-slate-300">·</span>
                    <time className="text-[12px] text-slate-400 font-mono">
                      {formatDateShort(post.publishedAt)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[19px] md:text-[21px] tracking-[-0.015em] text-brand-navy leading-snug mb-1.5 group-hover:text-brand-navy/75 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[14px] leading-6 text-slate-500 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Arrow — appears on hover */}
                <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-200">
                  <span className="text-[18px] text-brand-gold">→</span>
                </div>
              </article>
              </Link>
            </li>
          ))}
        </ol>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="font-serif text-[14px] italic text-slate-400">
            DominionArts Editorial — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
