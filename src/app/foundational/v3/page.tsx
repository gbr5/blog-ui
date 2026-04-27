/**
 * F3 — Longform literário
 * Drop cap on the first paragraph. Narrow reading column (~580px).
 * No header image — the text is the subject.
 * Section headings in spaced small caps.
 * Pull quotes: centered, italic serif with gold rule below.
 * Editorial notes as footnote-style left-indented asides.
 * Justified text with hyphenation.
 * Aesthetic reference: The New Yorker, Granta, NYRB.
 */
import Link from "next/link"
import { postContent } from "@/content/post-content"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { formatDate } from "@/lib/editorial"

const POST_SLUG = "dominio-e-arte-o-que-herdamos-moldamos-e-legamos"
const post = editorialPosts.find((p) => p.slug === POST_SLUG)!
const blocks = postContent[POST_SLUG]

// Identify the first paragraph for drop cap
const firstParaIndex = blocks.findIndex((b) => b.type === "paragraph")

export default function F3Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* Top bar */}
      <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/foundational" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors font-mono">
          ← Alternativas
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">F3</span>
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <header className="mx-auto max-w-[580px] px-6 md:px-0 pt-16 pb-12 border-b border-slate-200">
        {/* Category + date line */}
        <div className="flex items-center justify-between mb-8 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
          <span>{CATEGORY_LABELS[post.category]}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>

        {/* Title — large serif, tight leading */}
        <h1 className="font-serif text-[34px] md:text-[46px] lg:text-[52px] text-brand-navy tracking-[-0.025em] leading-[1.04] mb-7">
          {post.title}
        </h1>

        {/* Excerpt — italic deck */}
        <p className="font-serif text-[17px] md:text-[19px] italic leading-7 text-slate-500">
          {post.excerpt}
        </p>
      </header>

      {/* ── BODY ── */}
      <article className="mx-auto max-w-[580px] px-6 md:px-0 pt-12 pb-24">
        {blocks.map((block, i) => {
          const isFirstPara = i === firstParaIndex

          if (block.type === "lead")
            return null // excerpt already serves as deck — skip lead

          if (block.type === "paragraph") {
            if (isFirstPara) {
              // Drop cap on first paragraph
              const [firstChar, ...rest] = block.text
              return (
                <p
                  key={i}
                  className="text-[16px] leading-[1.9] text-charcoal mb-7 [text-align:justify] [hyphens:auto]"
                  lang="pt-BR"
                >
                  <span className="float-left font-serif text-[72px] leading-[0.8] text-brand-navy mr-2 mt-1 select-none">
                    {firstChar}
                  </span>
                  {rest.join("")}
                </p>
              )
            }
            return (
              <p
                key={i}
                className="text-[16px] leading-[1.9] text-charcoal mb-7 [text-align:justify] [hyphens:auto]"
                lang="pt-BR"
              >
                {block.text}
              </p>
            )
          }

          if (block.type === "heading")
            return (
              <h2
                key={i}
                className="mt-12 mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500"
              >
                {block.text}
              </h2>
            )

          if (block.type === "pullquote")
            return (
              <figure key={i} className="my-12 text-center px-4">
                <blockquote>
                  <p className="font-serif text-[21px] md:text-[24px] leading-[1.45] tracking-[-0.01em] text-brand-navy italic">
                    &ldquo;{block.text}&rdquo;
                  </p>
                </blockquote>
                <div className="mt-5 flex justify-center">
                  <div className="h-px w-10 bg-brand-gold" />
                </div>
              </figure>
            )

          if (block.type === "note")
            return (
              <aside
                key={i}
                className="my-8 text-[13px] leading-6 text-slate-400 italic pl-5 border-l border-slate-200"
              >
                {block.text}
              </aside>
            )

          if (block.type === "divider")
            return (
              <div key={i} className="my-12 flex justify-center">
                <p className="font-serif text-[18px] text-slate-300 tracking-[0.5em]">∗ ∗ ∗</p>
              </div>
            )
        })}

        {/* Closing attribution */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="font-serif text-[13px] italic text-slate-400 text-center">
            DominionArts — {formatDate(post.publishedAt)}
          </p>
        </div>
      </article>
    </div>
  )
}
