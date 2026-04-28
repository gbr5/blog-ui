import Link from "next/link"

const sections = [
  {
    href: "/blog",
    label: "Editorial Blog",
    description:
      "Variações de layout para o blog editorial da DominionArts. Hierarquia, tipografia, experiência mobile.",
    tag: "V1–V5",
    tagColor: "text-brand-navy bg-brand-navy/8",
    meta: "/v1 · /v2 · /v3 · /v4 · /v5",
  },
  {
    href: "/foundational",
    label: "Texto Fundador",
    description:
      "Alternativas de apresentação para o manifesto Domínio e Arte — do artigo padrão ao tratamento cerimonial.",
    tag: "F1–F5",
    tagColor: "text-brand-gold-dark bg-brand-gold/10",
    meta: "/foundational/v1 · /v2 · /v3 · /v4 · /v5",
  },
  {
    href: "/instagram",
    label: "Instagram Gateway",
    description:
      "Alternativas para o link-in-bio do Instagram. Do escuro ao editorial, do product showcase ao ultra-minimalista.",
    tag: "V1–V5",
    tagColor: "text-charcoal bg-sand-light",
    meta: "/instagram/v1 · /v2 · /v3 · /v4 · /v5",
  },
]

export default function UILabPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">

        {/* Back to homepage */}
        <div className="mb-8">
          <Link href="/" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
            ← DominionArts
          </Link>
        </div>

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-gold mb-3">
            DominionArts
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-navy tracking-[-0.02em] leading-[1.05] mb-4">
            UI Lab
          </h1>
          <p className="text-[16px] leading-7 text-slate-500 max-w-xs">
            Plataforma de testes de interface. Experimentos visuais antes de produção.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-6 transition-all duration-200 hover:border-brand-navy/20 hover:shadow-[0_6px_28px_rgba(15,23,42,0.07)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-serif text-[18px] text-brand-navy group-hover:text-brand-navy/80 transition-colors">
                  {s.label}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${s.tagColor}`}
                >
                  {s.tag}
                </span>
              </div>
              <p className="text-[14px] leading-6 text-slate-500">{s.description}</p>
              <p className="text-[11px] font-mono text-slate-400">{s.meta}</p>
              <span className="text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                Abrir seção →
              </span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-[12px] text-slate-400 leading-5">
            Protótipo local · DominionArts UI Lab · Dados em{" "}
            <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">
              src/content/
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}
