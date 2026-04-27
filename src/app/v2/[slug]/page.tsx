/**
 * V2 post — Hierarquia Editorial
 * Presentation-style aware. Foundational posts get the full ceremonial treatment.
 * Essays get a clean premium layout. Both share the same editorial components
 * but with different framing.
 */
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { getLatestPosts, formatDate } from "@/lib/editorial"
import { postContent, defaultContent, type ContentBlock } from "@/content/post-content"

export function generateStaticParams() {
  return editorialPosts.map((p) => ({ slug: p.slug }))
}

function renderBlock(block: ContentBlock, index: number, isFoundational: boolean) {
  switch (block.type) {
    case "lead":
      return (
        <p
          key={index}
          className={`mb-8 font-serif leading-8 text-brand-navy ${
            isFoundational
              ? "text-[21px] md:text-[24px] font-normal italic"
              : "text-[18px] md:text-[20px]"
          }`}
        >
          {block.text}
        </p>
      )
    case "paragraph":
      return (
        <p key={index} className="text-[16px] md:text-[17px] leading-[1.85] text-slate-600 mb-7">
          {block.text}
        </p>
      )
    case "pullquote":
      return (
        <figure key={index} className="my-10 md:my-12">
          <blockquote className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-brand-gold">
            <p className="font-serif text-[22px] md:text-[26px] leading-[1.4] tracking-[-0.01em] text-brand-navy italic">
              {block.text}
            </p>
          </blockquote>
        </figure>
      )
    case "heading":
      return (
        <h2
          key={index}
          className="mt-12 mb-5 font-serif text-[22px] md:text-[26px] text-brand-navy tracking-[-0.015em]"
        >
          {block.text}
        </h2>
      )
    case "note":
      return (
        <aside
          key={index}
          className="my-8 border border-brand-gold/20 bg-brand-gold/5 rounded-xl px-6 py-5"
        >
          <p className="text-[13px] uppercase tracking-[0.1em] font-medium text-brand-gold mb-2">
            Nota editorial
          </p>
          <p className="text-[15px] leading-7 text-slate-600 italic">{block.text}</p>
        </aside>
      )
    case "divider":
      return (
        <div key={index} className="my-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      )
  }
}

export default async function V2PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = editorialPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const isFoundational = post.presentationStyle === "foundational"
  const blocks = postContent[slug] ?? defaultContent
  const related = getLatestPosts(editorialPosts)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <div className={`min-h-screen ${isFoundational ? "bg-cream" : "bg-white"}`}>
      {/* Top nav */}
      <div className="mx-auto max-w-[780px] px-5 md:px-8 pt-8">
        <div className="flex items-center justify-between">
          <Link href="/v2" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
            ← Editorial
          </Link>
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">
            V2
          </span>
        </div>
      </div>

      {/* ── FOUNDATIONAL HEADER ── */}
      {isFoundational ? (
        <header className="mx-auto max-w-[780px] px-5 md:px-8 pt-14 pb-12 border-b border-slate-200/80">
          {/* Kicker */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-brand-gold" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Texto fundador
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-[36px] md:text-[52px] lg:text-[60px] text-brand-navy tracking-[-0.03em] leading-[1.02] mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[17px] md:text-[19px] leading-8 text-slate-500 max-w-xl">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-8 text-[13px] text-slate-400">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="text-slate-300">·</span>
            <span>{CATEGORY_LABELS[post.category]}</span>
          </div>
        </header>
      ) : (
        /* ── STANDARD ESSAY HEADER ── */
        <header className="mx-auto max-w-[780px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-gold">
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[13px] text-slate-400">{formatDate(post.publishedAt)}</span>
          </div>
          <h1 className="font-serif text-[30px] md:text-[42px] text-brand-navy tracking-[-0.025em] leading-[1.06] mb-4">
            {post.title}
          </h1>
          <p className="text-[16px] md:text-[18px] leading-7 text-slate-500">{post.excerpt}</p>
        </header>
      )}

      {/* Cover image — essay only */}
      {!isFoundational && post.image && (
        <div className="mx-auto max-w-[780px] px-5 md:px-8 mt-8">
          <div className="overflow-hidden rounded-xl aspect-[16/9] bg-stone-100">
            <Image
              src={post.image}
              alt={post.title}
              width={780}
              height={440}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article
        className={`mx-auto max-w-[780px] px-5 md:px-8 py-12 md:py-16 ${
          isFoundational ? "md:px-16 lg:px-24" : ""
        }`}
      >
        {blocks.map((block, i) => renderBlock(block, i, isFoundational))}

        {/* Foundational closing signature */}
        {isFoundational && (
          <div className="mt-16 pt-8 border-t border-slate-200 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <p className="font-serif text-[14px] italic text-slate-400">
              DominionArts Editorial
            </p>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
        )}
      </article>

      {/* Read next */}
      <div className="border-t border-slate-200 py-14">
        <div className="mx-auto max-w-[780px] px-5 md:px-8">
          <div className="flex items-baseline gap-4 mb-7">
            <h2 className="font-serif text-[20px] text-brand-navy">
              Continue lendo
            </h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/v2/${p.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-slate-200 p-4 hover:border-brand-navy/15 hover:bg-slate-50/50 transition-all"
              >
                <div className="overflow-hidden rounded-lg aspect-[3/2] bg-stone-100">
                  <Image
                    src={p.image ?? `https://picsum.photos/seed/${p.slug}/400/267`}
                    alt={p.title}
                    width={400}
                    height={267}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-1">
                    {CATEGORY_LABELS[p.category]}
                  </p>
                  <h3 className="font-serif text-[15px] leading-snug text-brand-navy line-clamp-2 group-hover:text-brand-navy/80 transition-colors">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
