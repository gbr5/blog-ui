/**
 * V5 post — Presença
 * Full-bleed hero → sticky header → article body →
 * author section → related products → related posts.
 *
 * Pullquote: full-width, brand-navy strip, skewY(-2deg), bold serif.
 * Content blocks: all other types render clean and light.
 */
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { getLatestPosts, formatDate } from "@/lib/editorial"
import { postContent, defaultContent, type ContentBlock } from "@/content/post-content"
import { V5Header } from "@/components/v5-header"
import { V5Footer } from "@/components/v5-footer"

export function generateStaticParams() {
  return editorialPosts.map((p) => ({ slug: p.slug }))
}

// ── Mock author ──────────────────────────────────────────
const AUTHOR = {
  name: "DominionArts Editorial",
  role: "Curadoria & Pesquisa",
  bio: "A curadoria editorial da DominionArts reúne pesquisadores, curadores e colecionadores com décadas de experiência em arte, design e cultura material. Cada ensaio nasce da observação direta de peças, coleções e espaços — e do compromisso com a beleza que dura.",
  avatar: "https://picsum.photos/seed/da-author/120/120",
}

// ── Mock related products ────────────────────────────────
const RELATED_PRODUCTS = [
  {
    name: "Cristo Barroco em Marfim",
    period: "Séc. XVIII · Portugal",
    material: "Marfim e madeira policromada",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/cristo/500/650",
    href: "#",
  },
  {
    name: "Caligrafia Otomana",
    period: "Séc. XVIII",
    material: "Tinta sobre papel afiligranado",
    status: "Disponível",
    image: "https://picsum.photos/seed/cali2/500/650",
    href: "#",
  },
  {
    name: "Secretária Neoclássica",
    period: "Séc. XIX · Rio de Janeiro",
    material: "Madeira nobre com incrustações",
    status: "Reservado",
    image: "https://picsum.photos/seed/secretaria/500/650",
    href: "#",
  },
]

const STATUS_STYLES: Record<string, string> = {
  "Disponível": "text-emerald-700 bg-emerald-50 border-emerald-100",
  "Reservado": "text-slate-500 bg-slate-50 border-slate-200",
  "Sob consulta": "text-amber-700 bg-amber-50 border-amber-100",
}

// ── Content block renderer ───────────────────────────────
function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "lead":
      return (
        <p
          key={index}
          className="text-[20px] md:text-[22px] leading-[1.75] text-brand-navy font-serif font-normal mb-8"
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
      // Full-width, brand-navy strip, skewY(-2deg), no rounded corners
      return (
        <figure
          key={index}
          className="my-14 md:my-20"
          style={{
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          {/* Skewed navy container */}
          <div
            style={{
              background: "oklch(0.30 0.06 250)",
              transform: "skewY(-2deg)",
              padding: "3.5rem 1.5rem",
            }}
          >
            {/* Counter-skew so text reads straight */}
            <blockquote style={{ transform: "skewY(2deg)" }}>
              <p
                className="font-serif text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px] text-white font-bold tracking-[-0.025em] leading-[1.15] max-w-5xl mx-auto px-2 sm:px-8 md:px-16"
              >
                &ldquo;{block.text}&rdquo;
              </p>
            </blockquote>
          </div>
        </figure>
      )

    case "heading":
      return (
        <h2
          key={index}
          className="mt-12 mb-5 font-serif text-[22px] md:text-[26px] text-brand-navy tracking-[-0.02em] border-b border-slate-100 pb-3"
        >
          {block.text}
        </h2>
      )

    case "note":
      return (
        <aside
          key={index}
          className="my-8 flex gap-4 bg-cream rounded-xl px-5 py-5 border border-brand-gold/15"
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

export default async function V5PostPage({ params }: { params: Promise<{ slug: string }> }) {
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

      {/* ── FULL-BLEED HERO ── */}
      <div className="relative">
        {post.image ? (
          <div className="relative h-[56vh] md:h-[65vh] min-h-[400px] overflow-hidden">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-white" />

            {/* Floating category + variant badge */}
            <div className="absolute top-5 left-5 md:left-8 right-5 md:right-8 flex justify-between items-center z-10">
              <Link href="/v5" className="text-[12px] text-white/70 hover:text-white transition-colors">
                ← Editorial
              </Link>
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/50 border border-white/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
                V5
              </span>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-5 md:px-12 pb-10 md:pb-14">
              {isFoundational && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-6 bg-brand-gold" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold">
                    Texto fundador
                  </span>
                </div>
              )}
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.14em] text-white/55 mb-2">
                {CATEGORY_LABELS[post.category]}
              </span>
              <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] text-brand-navy tracking-[-0.025em] leading-[1.05] max-w-3xl">
                {post.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="relative bg-brand-navy px-5 md:px-12 pt-20 pb-12">
            <div className="absolute top-5 left-5 md:left-8 right-5 md:right-8 flex justify-between items-center">
              <Link href="/v5" className="text-[12px] text-white/70 hover:text-white transition-colors">
                ← Editorial
              </Link>
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/50">V5</span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-gold mb-2 block">
              {CATEGORY_LABELS[post.category]}
            </span>
            <h1 className="font-serif text-[30px] md:text-[48px] text-white tracking-[-0.025em] leading-[1.05] max-w-3xl">
              {post.title}
            </h1>
          </div>
        )}
      </div>

      {/* ── STICKY HEADER ── */}
      <V5Header backHref="/v5" backLabel="Editorial" />

      {/* ── ARTICLE CONTENT ── */}
      <div className="mx-auto max-w-[680px] px-5 md:px-8 pt-10 pb-4">

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 pt-2">
          <span className="text-[13px] text-slate-400">{formatDate(post.publishedAt)}</span>
          <span className="text-slate-200">·</span>
          <span className="text-[13px] text-brand-gold font-medium">
            {CATEGORY_LABELS[post.category]}
          </span>
        </div>

        {/* Excerpt / intro */}
        <p className="text-[17px] md:text-[18px] leading-8 text-slate-500 mb-10 pb-10 border-b border-slate-100">
          {post.excerpt}
        </p>

        {/* Body blocks */}
        <div>{blocks.map((block, i) => renderBlock(block, i))}</div>
      </div>

      {/* ─────────────────────────────────────────────
          AUTHOR SECTION
      ───────────────────────────────────────────── */}
      <div className="bg-cream mt-8">
        <div className="mx-auto max-w-[680px] px-5 md:px-8 py-12 md:py-14">
          <div className="flex items-start gap-5">
            <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-stone-100">
              <Image
                src={AUTHOR.avatar}
                alt={AUTHOR.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-brand-gold mb-1">
                Sobre o autor
              </p>
              <p className="font-serif text-[17px] text-brand-navy mb-0.5">{AUTHOR.name}</p>
              <p className="text-[12px] text-slate-400 mb-3">{AUTHOR.role}</p>
              <p className="text-[14px] leading-7 text-slate-500">{AUTHOR.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          RELATED PRODUCTS
      ───────────────────────────────────────────── */}
      <div className="bg-white border-t border-slate-100 py-14 md:py-16">
        <div className="mx-auto max-w-[1000px] px-5 md:px-8">

          <div className="flex items-center gap-4 mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold shrink-0">
              Peças mencionadas
            </p>
            <div className="flex-1 h-px bg-slate-100" />
            <Link href="#" className="text-[12px] text-slate-400 hover:text-brand-navy transition-colors shrink-0">
              Ver coleção →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {RELATED_PRODUCTS.map((product) => (
              <a
                key={product.name}
                href={product.href}
                className="group block overflow-hidden rounded-xl border border-slate-200/60 bg-white hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="aspect-[3/4] overflow-hidden bg-stone-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-serif text-[15px] leading-tight text-brand-navy group-hover:text-brand-navy/80 transition-colors">
                      {product.name}
                    </h4>
                    <span
                      className={`shrink-0 text-[9px] font-medium uppercase tracking-[0.1em] border rounded-full px-2 py-0.5 ${STATUS_STYLES[product.status] ?? "text-slate-500 bg-slate-50 border-slate-200"}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{product.period}</p>
                  <p className="text-[11px] text-slate-400">{product.material}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          RELATED POSTS
      ───────────────────────────────────────────── */}
      <div className="bg-[#F9F8F6] border-t border-slate-100 py-14 md:py-16">
        <div className="mx-auto max-w-[1000px] px-5 md:px-8">

          <div className="flex items-center gap-4 mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold shrink-0">
              Leia também
            </p>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={p.featuredContext === "foundational" ? "/foundational/v3" : `/v5/${p.slug}`}
                className="group overflow-hidden rounded-xl bg-white border border-slate-200/60 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5"
              >
                <div className="aspect-[3/2] overflow-hidden bg-stone-50">
                  <Image
                    src={p.image ?? `https://picsum.photos/seed/${p.slug}/400/267`}
                    alt={p.title}
                    width={400}
                    height={267}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-gold mb-1.5">
                    {CATEGORY_LABELS[p.category]}
                  </p>
                  <h3 className="font-serif text-[15px] leading-snug text-brand-navy line-clamp-2 group-hover:text-brand-navy/80 transition-colors mb-2">
                    {p.title}
                  </h3>
                  <span className="text-[12px] text-slate-400">{formatDate(p.publishedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <V5Footer hideNewsletter />

    </div>
  )
}
