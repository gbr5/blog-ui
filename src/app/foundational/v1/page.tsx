/**
 * F1 — Artigo atual
 * Faithful mirror of dominionarts.com.br/editorial/[slug]/page.tsx layout.
 * Standard article: breadcrumb, category, title, excerpt, date, tags, image, body.
 * This is the baseline to beat.
 */
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { postContent } from "@/content/post-content"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { formatDate } from "@/lib/editorial"

const POST_SLUG = "dominio-e-arte-o-que-herdamos-moldamos-e-legamos"
const post = editorialPosts.find((p) => p.slug === POST_SLUG)!
const blocks = postContent[POST_SLUG]
const tags = ["Cultura Material", "Arte e Civilização", "Objetos Culturais", "Design Atemporal", "Colecionismo"]

export default function F1Page() {
  return (
    <div className="min-h-screen bg-white pt-10 pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/foundational" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
            ← Alternativas
          </Link>
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400 border border-slate-200 rounded-full px-3 py-1">
            F1 — Artigo atual
          </span>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-10 max-w-[820px] mx-auto flex items-center gap-1.5 text-xs text-slate-400 overflow-hidden whitespace-nowrap">
          <span className="shrink-0">Início</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="shrink-0">Editorial</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-brand-gold shrink-0">
            {CATEGORY_LABELS[post.category]}
          </span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate text-slate-500">{post.title}</span>
        </nav>

        {/* Article header */}
        <header className="max-w-[820px] mx-auto mb-10">
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-brand-gold">
            {CATEGORY_LABELS[post.category]}
          </span>
          <h1 className="mt-3 font-serif text-[36px] md:text-[52px] leading-[1.0] tracking-[-0.025em] text-brand-navy">
            {post.title}
          </h1>
          <p className="mt-5 text-[18px] md:text-[20px] leading-8 text-slate-500 max-w-[52ch]">
            {post.excerpt}
          </p>
          <time className="mt-5 block text-sm text-slate-400">{formatDate(post.publishedAt)}</time>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Cover image */}
        <div className="max-w-[820px] mx-auto mb-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-stone-100">
            <Image
              src={post.image ?? `https://picsum.photos/seed/${post.slug}/1200/675`}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Body */}
        <article className="max-w-[720px] mx-auto prose-neutral">
          {blocks.map((block, i) => {
            if (block.type === "lead")
              return (
                <p key={i} className="text-[19px] leading-8 text-slate-700 font-medium mb-6">
                  {block.text}
                </p>
              )
            if (block.type === "paragraph")
              return (
                <p key={i} className="text-[17px] leading-8 text-slate-600 mb-6">
                  {block.text}
                </p>
              )
            if (block.type === "heading")
              return (
                <h2 key={i} className="mt-10 mb-4 font-serif text-[26px] text-brand-navy tracking-[-0.01em]">
                  {block.text}
                </h2>
              )
            if (block.type === "pullquote")
              return (
                <blockquote key={i} className="my-8 border-l-2 border-brand-gold pl-6 italic font-serif text-[21px] leading-8 text-brand-navy">
                  {block.text}
                </blockquote>
              )
            if (block.type === "note")
              return (
                <div key={i} className="my-6 rounded-lg bg-slate-50 border border-slate-200 px-5 py-4">
                  <p className="text-[14px] leading-6 text-slate-500 italic">{block.text}</p>
                </div>
              )
            if (block.type === "divider")
              return (
                <div key={i} className="my-10 flex justify-center gap-2">
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-300">·</span>
                </div>
              )
          })}
        </article>

        {/* Newsletter CTA — mirrors dominionarts */}
        <div className="max-w-[720px] mx-auto mt-20 pt-12 border-t border-slate-100 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-brand-gold">
            Editorial semanal
          </p>
          <h2 className="mt-3 font-serif text-2xl md:text-3xl text-brand-navy tracking-[-0.02em]">
            Arte, objetos e cultura — toda semana
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-slate-500 max-w-[44ch] mx-auto">
            De práticas religiosas a hábitos domésticos, de peças únicas às culturas que as criaram — exploramos o universo material da história humana.
          </p>
          <div className="mt-6 flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-[14px] outline-none focus:border-brand-navy/40"
            />
            <button className="rounded-full bg-brand-navy px-5 py-2.5 text-[14px] font-medium text-white">
              Assinar
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
