/**
 * F2 — Manifesto / Cerimonial
 * The "institutional permanence" treatment from the brainstorm.
 * Cream background. Large kicker. Dominant serif title.
 * No header image — the text IS the event.
 * Pull quotes with gold left border.
 * Section headings with gold rule underneath.
 * Editorial note with brand-gold accent.
 * Closing signature block.
 */
import Link from "next/link"
import { postContent } from "@/content/post-content"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { formatDate } from "@/lib/editorial"

const POST_SLUG = "dominio-e-arte-o-que-herdamos-moldamos-e-legamos"
const post = editorialPosts.find((p) => p.slug === POST_SLUG)!
const blocks = postContent[POST_SLUG]

export default function F2Page() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-cream/90 backdrop-blur-sm border-b border-slate-200/60 px-5 md:px-8 py-3 flex items-center justify-between">
        <Link href="/foundational" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
          ← Alternativas
        </Link>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-navy/50">
          F2 — Manifesto
        </span>
      </div>

      {/* ── HEADER ── */}
      <header className="mx-auto max-w-[780px] px-6 md:px-8 pt-16 md:pt-24 pb-14 border-b border-slate-300/50">

        {/* Kicker row */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-10 bg-brand-gold" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-gold">
            Texto fundador
          </span>
          <div className="h-px flex-1 bg-brand-gold/20" />
        </div>

        {/* Category + date */}
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-slate-400 mb-5">
          {CATEGORY_LABELS[post.category]} · {formatDate(post.publishedAt)}
        </p>

        {/* Title */}
        <h1 className="font-serif text-[38px] md:text-[58px] lg:text-[66px] text-brand-navy tracking-[-0.03em] leading-[1.01] mb-8">
          {post.title}
        </h1>

        {/* Excerpt — styled as editorial intro */}
        <p className="font-serif text-[19px] md:text-[22px] italic leading-[1.6] text-brand-navy/70 max-w-[54ch]">
          &ldquo;{post.excerpt}&rdquo;
        </p>
      </header>

      {/* ── BODY ── */}
      <article className="mx-auto max-w-[680px] px-6 md:px-8 pt-14 pb-16">
        {blocks.map((block, i) => {
          if (block.type === "lead")
            return (
              <p key={i} className="font-serif text-[20px] md:text-[23px] italic leading-[1.7] text-brand-navy mb-10">
                {block.text}
              </p>
            )

          if (block.type === "paragraph")
            return (
              <p key={i} className="text-[16px] md:text-[17px] leading-[1.9] text-slate-700 mb-7">
                {block.text}
              </p>
            )

          if (block.type === "heading")
            return (
              <div key={i} className="mt-14 mb-6">
                <h2 className="font-serif text-[20px] md:text-[23px] text-brand-navy tracking-[-0.01em] mb-2">
                  {block.text}
                </h2>
                <div className="h-px w-12 bg-brand-gold" />
              </div>
            )

          if (block.type === "pullquote")
            return (
              <figure key={i} className="my-12 pl-7 border-l-2 border-brand-gold">
                <blockquote>
                  <p className="font-serif text-[22px] md:text-[26px] leading-[1.4] tracking-[-0.01em] text-brand-navy italic">
                    {block.text}
                  </p>
                </blockquote>
              </figure>
            )

          if (block.type === "note")
            return (
              <aside key={i} className="my-10 rounded-xl border border-brand-gold/25 bg-brand-gold/5 px-6 py-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-gold mb-2">
                  Nota editorial
                </p>
                <p className="text-[15px] leading-7 text-slate-600 italic">{block.text}</p>
              </aside>
            )

          if (block.type === "divider")
            return (
              <div key={i} className="my-14 flex items-center gap-5">
                <div className="flex-1 h-px bg-slate-300/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <div className="flex-1 h-px bg-slate-300/60" />
              </div>
            )
        })}
      </article>

      {/* ── CLOSING SIGNATURE ── */}
      <div className="mx-auto max-w-[680px] px-6 md:px-8 pb-24">
        <div className="flex items-center gap-5 pt-2">
          <div className="flex-1 h-px bg-slate-300/60" />
          <div className="text-center">
            <p className="font-serif text-[15px] italic text-brand-navy/60">DominionArts Editorial</p>
            <p className="text-[12px] text-slate-400 mt-0.5">{formatDate(post.publishedAt)}</p>
          </div>
          <div className="flex-1 h-px bg-slate-300/60" />
        </div>
      </div>
    </div>
  )
}
