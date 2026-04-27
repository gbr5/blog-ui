/**
 * F4 — Ensaio visual
 * Sections alternate between dark (brand-navy) and light (white/cream) backgrounds.
 * No images — typography, color and white space are the design.
 * Pull quotes become full-section moments.
 * Opening section is full dark with the title.
 * Closing section returns to dark.
 * Creates a deliberate, scroll-based editorial experience.
 */
import Link from "next/link"
import { postContent, type ContentBlock } from "@/content/post-content"
import { editorialPosts, CATEGORY_LABELS } from "@/content/editorial-posts"
import { formatDate } from "@/lib/editorial"

const POST_SLUG = "dominio-e-arte-o-que-herdamos-moldamos-e-legamos"
const post = editorialPosts.find((p) => p.slug === POST_SLUG)!
const blocks = postContent[POST_SLUG]

// Split content into sections divided by headings
type Section = { heading?: string; blocks: ContentBlock[] }

function splitIntoSections(blocks: ContentBlock[]): Section[] {
  const sections: Section[] = []
  let current: Section = { blocks: [] }

  for (const block of blocks) {
    if (block.type === "heading") {
      if (current.blocks.length > 0 || current.heading) {
        sections.push(current)
      }
      current = { heading: block.text, blocks: [] }
    } else {
      current.blocks.push(block)
    }
  }
  if (current.blocks.length > 0 || current.heading) {
    sections.push(current)
  }
  return sections
}

function renderBodyBlock(block: ContentBlock, i: number, isDark: boolean) {
  const textColor = isDark ? "text-white/80" : "text-slate-700"
  const titleColor = isDark ? "text-white" : "text-brand-navy"

  if (block.type === "lead")
    return (
      <p key={i} className={`font-serif text-[20px] md:text-[24px] italic leading-[1.65] mb-8 ${titleColor}`}>
        {block.text}
      </p>
    )

  if (block.type === "paragraph")
    return (
      <p key={i} className={`text-[16px] md:text-[17px] leading-[1.9] mb-7 ${textColor}`}>
        {block.text}
      </p>
    )

  if (block.type === "note")
    return (
      <aside
        key={i}
        className={`my-8 pl-5 border-l-2 ${isDark ? "border-brand-gold/40 text-white/50" : "border-brand-gold/40 text-slate-400"} text-[14px] leading-7 italic`}
      >
        {block.text}
      </aside>
    )

  if (block.type === "divider")
    return (
      <div key={i} className={`my-10 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
    )

  return null
}

export default function F4Page() {
  const sections = splitIntoSections(blocks)

  // Identify pull quotes as standalone sections
  const pullquotes = blocks.filter((b) => b.type === "pullquote")
  const bodyBlocks = blocks.filter((b) => b.type !== "pullquote")

  return (
    <div className="min-h-screen">

      {/* ── 1. OPENING — DARK ── */}
      <section className="relative bg-brand-navy min-h-[85vh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-12 pt-6">
          <Link href="/foundational" className="text-[13px] text-white/50 hover:text-white transition-colors">
            ← Alternativas
          </Link>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40 border border-white/15 rounded-full px-3 py-1">
            F4 — Ensaio visual
          </span>
        </div>

        {/* Title block */}
        <div className="flex-1 flex items-end px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
          <div className="max-w-[820px]">
            {/* Kicker */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-gold">
                Texto fundador · {CATEGORY_LABELS[post.category]}
              </span>
            </div>
            {/* Title */}
            <h1 className="font-serif text-[38px] md:text-[60px] lg:text-[72px] text-white tracking-[-0.03em] leading-[1.01] mb-8">
              {post.title}
            </h1>
            {/* Excerpt */}
            <p className="font-serif text-[17px] md:text-[20px] italic text-white/60 leading-[1.65] max-w-[52ch]">
              &ldquo;{post.excerpt}&rdquo;
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-10 bg-white" />
        </div>
      </section>

      {/* ── 2. SECTION INTRO — LIGHT ── */}
      {sections[0] && (
        <section className="bg-white px-6 md:px-12 lg:px-0 py-16 md:py-20">
          <div className="mx-auto max-w-[640px]">
            {sections[0].blocks.map((block, i) => renderBodyBlock(block, i, false))}
          </div>
        </section>
      )}

      {/* ── 3. PULL QUOTE 1 — DARK ACCENT ── */}
      {pullquotes[0] && (
        <section className="bg-brand-navy-dark px-6 md:px-12 py-16 md:py-20">
          <div className="mx-auto max-w-[720px] text-center">
            <div className="flex justify-center mb-8">
              <div className="h-px w-12 bg-brand-gold/40" />
            </div>
            <p className="font-serif text-[26px] md:text-[36px] lg:text-[42px] text-white italic leading-[1.3] tracking-[-0.02em]">
              &ldquo;{pullquotes[0].text}&rdquo;
            </p>
            <div className="flex justify-center mt-8">
              <div className="h-px w-12 bg-brand-gold/40" />
            </div>
          </div>
        </section>
      )}

      {/* ── 4. SECTIONS 1-2 — CREAM ── */}
      {sections.slice(1, 3).map((section, si) => (
        <section key={si} className={`${si % 2 === 0 ? "bg-cream" : "bg-white"} px-6 md:px-12 lg:px-0 py-16 md:py-20`}>
          <div className="mx-auto max-w-[640px]">
            {section.heading && (
              <div className="mb-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-gold mb-3">
                  {section.heading}
                </p>
                <div className="h-px w-8 bg-brand-gold/30" />
              </div>
            )}
            {section.blocks.map((block, i) => renderBodyBlock(block, i, false))}
          </div>
        </section>
      ))}

      {/* ── 5. PULL QUOTE 2 — CREAM CENTERED ── */}
      {pullquotes[1] && (
        <section className="bg-sand-light px-6 md:px-12 py-16 md:py-24">
          <div className="mx-auto max-w-[640px] text-center">
            <p className="font-serif text-[22px] md:text-[30px] text-brand-navy italic leading-[1.4] tracking-[-0.01em] mb-6">
              &ldquo;{pullquotes[1].text}&rdquo;
            </p>
            <div className="flex justify-center">
              <div className="h-px w-10 bg-brand-gold" />
            </div>
          </div>
        </section>
      )}

      {/* ── 6. REMAINING SECTIONS — WHITE ── */}
      {sections.slice(3).map((section, si) => (
        <section key={si} className="bg-white px-6 md:px-12 lg:px-0 py-16 md:py-20">
          <div className="mx-auto max-w-[640px]">
            {section.heading && (
              <div className="mb-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-gold mb-3">
                  {section.heading}
                </p>
                <div className="h-px w-8 bg-brand-gold/30" />
              </div>
            )}
            {section.blocks.map((block, i) => renderBodyBlock(block, i, false))}
          </div>
        </section>
      ))}

      {/* ── 7. CLOSING — DARK ── */}
      <section className="bg-brand-navy-dark px-6 md:px-12 lg:px-0 py-20 md:py-28">
        <div className="mx-auto max-w-[640px]">
          <div className="flex items-center gap-5 mb-12">
            <div className="flex-1 h-px bg-white/10" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/60" />
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <p className="font-serif text-[22px] md:text-[28px] italic text-white/70 leading-[1.5] mb-10">
            A DominionArts nasce da convicção de que a cultura material importa, de que a forma nunca é neutra, e de que escolher bem o que nos rodeia é uma forma de construir permanência.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-px w-6 bg-brand-gold/40" />
            <p className="font-serif text-[14px] italic text-white/40">
              DominionArts Editorial · {formatDate(post.publishedAt)}
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
