import Link from "next/link"

const variants = [
  {
    href: "/v1",
    label: "V1 — Estado Atual",
    description:
      "Grid plano sem hierarquia. Espelho do /editorial atual. Todos os posts com o mesmo peso visual.",
    tag: "Baseline",
    tagColor: "text-slate-500 bg-slate-100",
  },
  {
    href: "/v2",
    label: "V2 — Hierarquia Editorial",
    description:
      "Hero fundacional + destaques secundários + navegação por categoria + grid final. O sistema proposto.",
    tag: "Proposta principal",
    tagColor: "text-brand-navy bg-brand-navy/8",
  },
  {
    href: "/v3",
    label: "V3 — Publicação",
    description:
      "Visual-forward. Cover em full-bleed para o texto fundador. Layout assimétrico com destaque de imagem. Estilo revista/galeria.",
    tag: "Visual",
    tagColor: "text-brand-gold-dark bg-brand-gold/10",
  },
  {
    href: "/v4",
    label: "V4 — Arquivo",
    description:
      "Sem imagens. Hierarquia puramente tipográfica. Estilo revista literária ou periódico. Máximo de contenção.",
    tag: "Minimalista",
    tagColor: "text-slate-600 bg-sand-light",
  },
  {
    href: "/v5",
    label: "V5 — Presença",
    description:
      "Light, cheerful, image-led. Hero com header sticky ao rolar. Breaks de background entre seções. Destacaes tipográficos. Strip navy com frase skewed. Post com seções de autor + produtos + relacionados.",
    tag: "✦ Novo",
    tagColor: "text-white bg-brand-navy",
  },
]

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        {/* Back */}
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-brand-navy transition-colors mb-10"
        >
          ← UI Lab
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-gold mb-3">
            DominionArts · Editorial Blog
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-navy tracking-[-0.02em] leading-[1.05] mb-4">
            Editorial UI<br />Variations
          </h1>
          <p className="text-[16px] leading-7 text-slate-500 max-w-sm">
            Protótipo local. Escolha uma variação para avaliar a hierarquia
            editorial, tipografia e experiência mobile.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-3">
          {variants.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-5 py-5 transition-all duration-200 hover:border-brand-navy/20 hover:shadow-[0_4px_20px_rgba(15,23,42,0.07)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-medium text-brand-navy text-[15px] group-hover:text-brand-navy/80 transition-colors">
                  {v.label}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${v.tagColor}`}
                >
                  {v.tag}
                </span>
              </div>
              <p className="text-[14px] leading-6 text-slate-500">{v.description}</p>
              <span className="text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                Ver variação →
              </span>
            </Link>
          ))}
        </div>

        {/* Foundational post section */}
        <div className="mt-10 pt-10 border-t border-slate-200">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-gold mb-4">
            Texto fundador — página do post
          </p>
          <Link
            href="/foundational"
            className="group flex flex-col gap-2 rounded-xl border border-brand-gold/30 bg-brand-gold/5 px-5 py-5 transition-all duration-200 hover:border-brand-gold/50 hover:bg-brand-gold/8"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-medium text-brand-navy text-[15px]">
                Alternativas para "Domínio e Arte"
              </span>
              <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-brand-gold-dark bg-brand-gold/15">
                4 alternativas
              </span>
            </div>
            <p className="text-[14px] leading-6 text-slate-500">
              F1 artigo atual · F2 manifesto cerimonial · F3 longform literário · F4 ensaio visual em seções. Conteúdo real do site.
            </p>
            <span className="text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
              Ver alternativas →
            </span>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-[12px] text-slate-400 leading-5">
          Dados locais em{" "}
          <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">
            src/content/editorial-posts.ts
          </code>
          . Nenhuma conexão com banco de dados.
        </p>
      </div>
    </div>
  )
}
