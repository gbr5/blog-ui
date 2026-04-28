import Link from "next/link"

const variants = [
  {
    href: "/foundational/v1",
    label: "F1 — Artigo atual",
    description:
      "Espelho fiel do layout existente em dominionarts.com.br. Sem hierarquia especial: categoria, título, imagem, corpo.",
    tag: "Baseline",
    tagColor: "text-slate-500 bg-slate-100",
  },
  {
    href: "/foundational/v2",
    label: "F2 — Manifesto",
    description:
      "Tratamento cerimonial e institucional. Kicker \"Texto fundador\", fundo creme, título dominante, espaço branco generoso, assinatura editorial. O que o brainstorm descreveu.",
    tag: "Proposta principal",
    tagColor: "text-brand-navy bg-brand-navy/8",
  },
  {
    href: "/foundational/v3",
    label: "F3 — Longform literário",
    description:
      "Cap inicial, coluna estreita, tipografia pesada, sem imagem de cabeçalho. Estilo revista literária de alto nível — The New Yorker, Granta.",
    tag: "Tipográfico",
    tagColor: "text-charcoal bg-sand-light",
  },
  {
    href: "/foundational/v4",
    label: "F4 — Ensaio visual",
    description:
      "Seções alternadas claro/escuro. Sem imagem — apenas tipografia, cor e espaço como design. Experiência de scroll deliberada e editorial.",
    tag: "Ousado",
    tagColor: "text-brand-gold-dark bg-brand-gold/10",
  },
  {
    href: "/foundational/v5",
    label: "F5 — Presença Máxima",
    description:
      "Tratamento cerimonial e imersivo. Hero full-screen com monograma centrado. Drop cap dourado. Strip navy skewed com tipo maior. Seção em fundo creme para ritmo de leitura. Colofão de encerramento. Próxima leitura como card único. Sem produtos relacionados.",
    tag: "✦ Novo",
    tagColor: "text-white bg-brand-navy",
  },
]

export default function FoundationalIndexPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <div className="mb-4">
          <Link href="/" className="text-[13px] text-slate-400 hover:text-brand-navy transition-colors">
            ← Índice geral
          </Link>
        </div>

        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-gold mb-3">
            DominionArts · Texto fundador
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-navy tracking-[-0.02em] leading-[1.05] mb-4">
            Alternativas para<br />a página do manifesto
          </h1>
          <p className="text-[15px] leading-7 text-slate-500 max-w-sm">
            Quatro formas de apresentar{" "}
            <em className="text-brand-navy">Domínio e Arte</em> — o texto fundador
            da DominionArts. Mesmo conteúdo real, tratamentos visuais distintos.
          </p>
        </div>

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
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${v.tagColor}`}>
                  {v.tag}
                </span>
              </div>
              <p className="text-[14px] leading-6 text-slate-500">{v.description}</p>
              <span className="text-[13px] font-medium text-brand-gold group-hover:text-brand-gold-dark transition-colors">
                Ver alternativa →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[12px] text-slate-400">
          Conteúdo real extraído de{" "}
          <span className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">
            dominionarts.com.br/editorial/dominio-e-arte-...
          </span>
        </p>
      </div>
    </div>
  )
}
