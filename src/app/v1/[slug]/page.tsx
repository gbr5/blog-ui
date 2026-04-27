/**
 * V1 post — Estado Atual
 * Simple, clean article page. No hierarchy, no special treatment.
 * Matches the current dominionarts style.
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
        <p key={index} className="text-[19px] md:text-[21px] leading-8 text-slate-700 font-medium mb-6">
          {block.text}
        </p>
      )
    case "paragraph":
      return (
        <p key={index} className="text-[16px] md:text-[17px] leading-8 text-slate-600 mb-6">
          {block.text}
        </p>
      )
    case "pullquote":
      return (
        <blockquote
          key={index}
          className="my-8 border-l-2 border-brand-gold pl-6 italic font-serif text-[20px] md:text-[22px] leading-8 text-brand-navy"
        >
          {block.text}
        </blockquote>
      )
    case "heading":
      return (
        <h2
          key={index}
          className="mt-10 mb-4 font-serif text-[24px] md:text-[26px] text-brand-navy tracking-[-0.01em]"
        >
          {block.text}
        </h2>
      )
    case "note":
      return (
        <div key={index} className="my-6 rounded-lg bg-slate-50 border border-slate-200 px-5 py-4">
          <p className="text-[14px] leading-6 text-slate-500 italic">{block.text}</p>
        </div>
      )
    case "divider":
      return (
        <div key={index} className="my-10 flex justify-center">
          <div className="flex gap-2">
            <span className="text-slate-300">·</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-300">·</span>
          </div>
        </div>
      )
  }
}

export default async function V1PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = editorialPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const blocks = postContent[slug] ?? defaultContent
  const related = getLatestPosts(editorialPosts)
    .filter((p) => p.slug !== slug)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <div className="mx-auto max-w-[720px] px-5 md:px-8 pt-8 pb-0">
        <div className="flex items-center justify-between">
          <Link href="/v1" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
            ← Editorial
          </Link>
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">
            V1
          </span>
        </div>
      </div>

      <article className="mx-auto max-w-[720px] px-5 md:px-8 pt-10 pb-20">
        {/* Category + date */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-brand-gold">
            {CATEGORY_LABELS[post.category]}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-[13px] text-slate-400">{formatDate(post.publishedAt)}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-[32px] md:text-[42px] lg:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-5">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-[17px] leading-7 text-slate-500 mb-8 border-b border-slate-200 pb-8">
          {post.excerpt}
        </p>

        {/* Cover image */}
        {post.image && (
          <div className="mb-8 overflow-hidden rounded-xl aspect-[16/9] bg-stone-100">
            <Image
              src={post.image}
              alt={post.title}
              width={720}
              height={405}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div>{blocks.map((block, i) => renderBlock(block, i))}</div>
      </article>

      {/* Read next */}
      {related.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-[720px] px-5 md:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-400 mb-6">
              Continue lendo
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/v1/${p.slug}`}
                  className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-navy/20 hover:shadow-[0_4px_16px_rgba(15,23,42,0.07)] transition-all"
                >
                  <div className="shrink-0 w-[72px] aspect-square overflow-hidden rounded-lg bg-stone-100">
                    <Image
                      src={p.image ?? `https://picsum.photos/seed/${p.slug}/144/144`}
                      alt={p.title}
                      width={144}
                      height={144}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
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
      )}
    </div>
  )
}
