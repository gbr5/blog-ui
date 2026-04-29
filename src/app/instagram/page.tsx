import Link from "next/link"

const variants = [
  {
    href: "/instagram/v1",
    label: "V1 — Entrada",
    description:
      "Escura, densa, silenciosa. O corredor de entrada de uma galeria privada. Navegação como directório de museu. Sem ruído.",
    tag: "Galeria · Escuro",
    tagColor: "text-slate-200 bg-slate-800",
    preview: "bg-[#191511]",
  },
  {
    href: "/instagram/v2",
    label: "V2 — Revista",
    description:
      "Publicação editorial premium. Hero fundacional, destaques de coleção, artigos recentes. Inspirado em revistas de arquitetura e arte.",
    tag: "Editorial · Claro",
    tagColor: "text-brand-navy bg-brand-navy/8",
    preview: "bg-cream",
  },
  {
    href: "/instagram/v3",
    label: "V3 — Vitrine",
    description:
      "Sala de visualização privada. Foco nos objetos. Imagens grandes, status das peças, aquisição direta. Estilo casa de leilões.",
    tag: "Coleção · Branco",
    tagColor: "text-brand-gold-dark bg-brand-gold/10",
    preview: "bg-white",
  },
  {
    href: "/instagram/v4",
    label: "V4 — Carta",
    description:
      "Máxima contenção. Uma carta de gabinete. Tipografia pura, presença absoluta, nenhuma imagem de produto. Apenas palavras e espaço.",
    tag: "Minimalista · Areia",
    tagColor: "text-slate-600 bg-sand-light",
    preview: "bg-[#F4EDD8]",
  },
  {
    href: "/instagram/v5",
    label: "V5 — Presença",
    description:
      "Segue a linguagem visual do blog V5. Light, editorial, image-led. Header sticky com search. Seção de produtos com grid. Strip navy com citação. Cheerful mas sofisticado.",
    tag: "Claro",
    tagColor: "text-brand-navy bg-brand-navy/8",
    preview: "bg-white",
  },
  {
    href: "/instagram/v6",
    label: "V6 — Website",
    description:
      "V5 repensado como página do site. Largura total, header e footer V5 completos, seções com background full-bleed (cream, navy), grid de 4 colunas no desktop, editorial lado a lado. Presença de site, não de link-in-bio.",
    tag: "✦ Novo · Website",
    tagColor: "text-white bg-brand-navy",
    preview: "bg-white",
  },
]

export default function InstagramIndexPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-5 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">

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
            DominionArts · Instagram Gateway
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy tracking-[-0.02em] leading-[1.05] mb-4">
            Link-in-Bio<br />Variations
          </h1>
          <p className="text-[16px] leading-7 text-slate-500 max-w-sm">
            Alternativas para a página de entrada pelo Instagram. Cada versão
            explora uma direção de marca distinta.
          </p>
        </div>

        {/* Concept note */}
        <div className="mb-10 rounded-xl border border-brand-gold/25 bg-brand-gold/5 px-5 py-4">
          <p className="text-[13px] leading-6 text-slate-600">
            <span className="font-medium text-brand-navy">Conceito:</span>{" "}
            Não um Linktree. Uma entrada curada para o mundo da DominionArts —
            coleção, editorial, visão e aquisição privada.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-3">
          {variants.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="group flex gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5 transition-all duration-200 hover:border-brand-navy/20 hover:shadow-[0_4px_20px_rgba(15,23,42,0.07)]"
            >
              {/* Color swatch */}
              <div className={`shrink-0 w-10 h-10 rounded-lg ${v.preview} border border-slate-200 mt-0.5`} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <span className="font-medium text-brand-navy text-[15px] group-hover:text-brand-navy/80 transition-colors">
                    {v.label}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${v.tagColor}`}
                  >
                    {v.tag}
                  </span>
                </div>
                <p className="text-[13px] leading-5.5 text-slate-500">{v.description}</p>
                <span className="mt-2 inline-block text-[12px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                  Ver variação →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-[12px] text-slate-400 leading-5">
          Mobile-first · Dados locais · UTM tracking por variação
        </p>
      </div>
    </div>
  )
}
