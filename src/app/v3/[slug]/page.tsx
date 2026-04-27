/**
 * V3 post — Publicação
 * Full-bleed image header. Wide content column. Visual-led.
 * Pull quotes are bold and graphic. More magazine than institution.
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

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "lead":
      return (
        <p
          key={index}
          className="text-[20px] md:text-[23px] leading-8 text-brand-navy font-serif font-normal mb-8"
        >
          {block.text}
        </p>
      )
    case "paragraph":
      return (
        <p key={index} className="text-[16px] md:text-[17px] leading-[1.9] text-slate-600 mb-7">
          {block.text}
        </p>
      )
    case "pullquote":
      return (
        <figure
          key={index}
          className="my-12 -mx-4 md:-mx-10 lg:-mx-16 bg-brand-navy px-8 md:px-14 py-10 rounded-2xl"
        >
          <blockquote>
            <p className="font-serif text-[24px] md:text-[30px] leading-[1.3] tracking-[-0.01em] text-white italic">
              {block.text}
            </p>
          </blockquote>
        </figure>
      )
    case "heading":
      return (
        <h2
          key={index}
          className="mt-12 mb-5 font-serif text-[24px] md:text-[28px] text-brand-navy tracking-[-0.02em] border-b border-slate-200 pb-3"
        >
          {block.text}
        </h2>
      )
    case "note":
      return (
        <aside
          key={index}
          className="my-8 flex gap-4 bg-sand-light rounded-xl px-5 py-5"
        >
          <div className="shrink-0 w-0.5 bg-brand-gold rounded-full" />
          <p className="text-[14px] leading-7 text-slate-600 italic">{block.text}</p>
        </aside>
      )
    case "divider":
      return (
        <div key={index} className="my-10 flex justify-center">
          <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
            <line x1="0" y1="6" x2="24" y2="6" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="30" cy="6" r="2.5" fill="oklch(0.75 0.12 85)" />
            <line x1="36" y1="6" x2="60" y2="6" stroke="#e2e8f0" strokeWidth="1" />
          </svg>
        </div>
      )
  }
}

export default async function V3PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = editorialPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const isFoundational = post.presentationStyle === "foundational"
  const blocks = postContent[slug] ?? defaultContent
  const related = getLatestPosts(editorialPosts)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* ── FULL-BLEED HEADER ── */}
      <div className="relative">
        {post.image ? (
          <div className="relative h-[55vh] md:h-[65vh] min-h-[420px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/90 via-brand-navy/40 to-black/20" />

            {/* Overlaid nav */}
            <div className="absolute top-5 left-5 md:left-8 right-5 md:right-8 flex justify-between items-center z-10">
              <Link href="/v3" className="text-[13px] text-white/70 hover:text-white transition-colors backdrop-blur-sm">
                ← Editorial
              </Link>
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/60 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                V3
              </span>
            </div>

            {/* Title overlay — bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-5 md:px-12 pb-10 md:pb-14">
              {isFoundational && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-6 bg-brand-gold" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-gold">
                    Texto fundador
                  </span>
                </div>
              )}
              <span className="inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-white/60 mb-2">
                {CATEGORY_LABELS[post.category]}
              </span>
              <h1 className="font-serif text-[30px] md:text-[48px] lg:text-[56px] text-white tracking-[-0.025em] leading-[1.05] max-w-3xl">
                {post.title}
              </h1>
            </div>
          </div>
        ) : (
          /* Fallback header — no image */
          <div className="relative bg-brand-navy px-5 md:px-12 pt-20 pb-12">
            <div className="absolute top-5 left-5 md:left-8 right-5 md:right-8 flex justify-between items-center">
              <Link href="/v3" className="text-[13px] text-white/70 hover:text-white transition-colors">
                ← Editorial
              </Link>
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/60">V3</span>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-gold mb-2 block">
              {CATEGORY_LABELS[post.category]}
            </span>
            <h1 className="font-serif text-[32px] md:text-[48px] text-white tracking-[-0.025em] leading-[1.05] max-w-3xl">
              {post.title}
            </h1>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-[680px] px-5 md:px-8 pt-10 pb-10">
        {/* Meta + excerpt */}
        <div className="flex items-center gap-3 mb-6 pt-2">
          <span className="text-[13px] text-slate-400">{formatDate(post.publishedAt)}</span>
        </div>
        <p className="text-[17px] md:text-[18px] leading-8 text-slate-500 mb-10 pb-10 border-b border-slate-200">
          {post.excerpt}
        </p>

        {/* Body */}
        <div>{blocks.map((block, i) => renderBlock(block, i))}</div>
      </div>

      {/* Read next — visual grid */}
      <div className="bg-slate-50 border-t border-slate-200 py-14">
        <div className="mx-auto max-w-[1000px] px-5 md:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold mb-8">
            Leia também
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/v3/${p.slug}`}
                className="group overflow-hidden rounded-xl bg-white border border-slate-200 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5"
              >
                <div className="aspect-[3/2] overflow-hidden bg-stone-100">
                  <Image
                    src={p.image ?? `https://picsum.photos/seed/${p.slug}/400/267`}
                    alt={p.title}
                    width={400}
                    height={267}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4">
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
