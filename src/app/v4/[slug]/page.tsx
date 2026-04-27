/**
 * V4 post — Arquivo
 * No image in header. Pure typographic experience.
 * Narrow reading column. Serif-heavy. Literary journal / museum catalog aesthetic.
 * Margin notes rendered as footnote-style asides on desktop.
 */
import { notFound } from "next/navigation"
import Link from "next/link"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { getLatestPosts, formatDate, formatDateShort } from "@/lib/editorial"
import { postContent, defaultContent, type ContentBlock } from "@/content/post-content"

export function generateStaticParams() {
  return editorialPosts.map((p) => ({ slug: p.slug }))
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "lead":
      return (
        <p
          key={index}
          className="font-serif text-[20px] md:text-[22px] leading-[1.65] text-brand-navy mb-8 italic"
        >
          {block.text}
        </p>
      )
    case "paragraph":
      return (
        <p
          key={index}
          className="text-[16px] leading-[1.9] text-charcoal mb-7 [text-align:justify] [hyphens:auto]"
          lang="pt-BR"
        >
          {block.text}
        </p>
      )
    case "pullquote":
      return (
        <blockquote
          key={index}
          className="my-10 text-center"
        >
          <p className="font-serif text-[20px] md:text-[24px] leading-[1.45] tracking-[-0.01em] text-brand-navy italic">
            &ldquo;{block.text}&rdquo;
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-px w-12 bg-brand-gold" />
          </div>
        </blockquote>
      )
    case "heading":
      return (
        <h2
          key={index}
          className="mt-12 mb-5 font-serif text-[19px] md:text-[22px] text-brand-navy tracking-[-0.01em] uppercase tracking-[0.04em]"
        >
          {block.text}
        </h2>
      )
    case "note":
      return (
        <aside
          key={index}
          className="my-8 text-[13px] leading-6 text-slate-400 italic pl-5 border-l border-slate-200"
        >
          {block.text}
        </aside>
      )
    case "divider":
      return (
        <div key={index} className="my-12 flex justify-center">
          <p className="font-serif text-[20px] text-slate-300 tracking-[0.3em]">∗ ∗ ∗</p>
        </div>
      )
  }
}

export default async function V4PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = editorialPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const isFoundational = post.presentationStyle === "foundational"
  const blocks = postContent[slug] ?? defaultContent
  const all = getLatestPosts(editorialPosts)
  const related = all.filter((p) => p.slug !== slug).slice(0, 4)
  const postIndex = all.findIndex((p) => p.slug === slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Nav strip */}
      <div className="border-b border-slate-200 py-4 px-6 md:px-10 flex items-center justify-between">
        <Link href="/v4" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors font-mono">
          ← Arquivo
        </Link>
        <div className="flex items-center gap-4">
          {postIndex >= 0 && (
            <span className="font-mono text-[12px] text-slate-300">
              {String(postIndex + 1).padStart(2, "0")}
            </span>
          )}
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">
            V4
          </span>
        </div>
      </div>

      <article className="mx-auto max-w-[580px] px-6 md:px-0 pt-14 pb-20">
        {/* Kicker */}
        {isFoundational && (
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-brand-gold mb-5">
            Texto fundador
          </p>
        )}

        {/* Meta */}
        {!isFoundational && (
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[12px] text-slate-400">
              {formatDateShort(post.publishedAt)}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500">
              {CATEGORY_LABELS[post.category]}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className={`font-serif text-brand-navy tracking-[-0.025em] leading-[1.06] mb-6 ${
            isFoundational
              ? "text-[38px] md:text-[52px]"
              : "text-[30px] md:text-[40px]"
          }`}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-[16px] leading-7 text-slate-500 mb-10 pb-10 border-b border-slate-200">
          {post.excerpt}
        </p>

        {/* Meta — foundational only, below excerpt */}
        {isFoundational && (
          <div className="flex items-center gap-3 mb-10 text-[12px] text-slate-400">
            <span className="font-mono">{formatDateShort(post.publishedAt)}</span>
            <span className="text-slate-300">·</span>
            <span className="font-medium uppercase tracking-[0.08em]">
              {CATEGORY_LABELS[post.category]}
            </span>
          </div>
        )}

        {/* Content */}
        <div>{blocks.map((block, i) => renderBlock(block, i))}</div>

        {/* Closing */}
        {isFoundational && (
          <div className="mt-16 text-center">
            <p className="font-serif text-[13px] italic text-slate-400">
              DominionArts Editorial — {formatDate(post.publishedAt)}
            </p>
          </div>
        )}
      </article>

      {/* Read next — list style */}
      <div className="border-t border-slate-200 py-12">
        <div className="mx-auto max-w-[580px] px-6 md:px-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-6">
            Outros textos
          </p>
          <ol className="space-y-0">
            {related.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/v4/${p.slug}`}
                  className="group flex items-start gap-5 py-4 border-b border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <span className="font-mono text-[12px] text-slate-300 leading-7 w-5 shrink-0 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-gold block mb-1">
                      {CATEGORY_LABELS[p.category]}
                    </span>
                    <span className="font-serif text-[16px] text-brand-navy group-hover:text-brand-navy/75 transition-colors leading-snug">
                      {p.title}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-[12px] text-slate-300 leading-7 self-center">
                    {formatDateShort(p.publishedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
