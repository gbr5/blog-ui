/**
 * Type Test — index
 *
 * Active tests + backlog of decisions still open.
 * To create a new test: copy _template.tsx → <slug>/page.tsx, adapt, add entry here.
 */
import Link from "next/link"

type Status = "em teste" | "decidido" | "backlog"

type TestEntry = {
  href?:      string     // omit if not yet created
  label:      string
  desc:       string
  status:     Status
  priority?:  "alta" | "média" | "baixa"
  locations:  string[]
}

const ACTIVE: TestEntry[] = [
  {
    href: "/type-test/pullquote",
    label: "Pullquote block",
    desc: "Bloco de citação em fundo azul-marinho. Testando fonte, peso, tamanho, tracking, entrelinha, caixa — 10 famílias tipográficas.",
    status: "em teste",
    locations: [
      "v5/[slug]/page.tsx",
      "foundational/v5/page.tsx",
      "instagram/v5/page.tsx",
      "instagram/v6/page.tsx",
    ],
  },
  {
    href: "/type-test/body-text",
    label: "Texto de corpo",
    desc: "A tipografia mais lida no site. Fonte, tamanho (14–18px), entrelinha e peso avaliados em excerto editorial completo — heading + 4 parágrafos.",
    status: "em teste",
    locations: [
      "v5/[slug]/page.tsx",
      "foundational/v5/page.tsx",
    ],
  },
  {
    href: "/type-test/h1-titulo",
    label: "Título de artigo (h1)",
    desc: "Display type do hero — 32–80px com leading apertado. Mesma família do pullquote mas comportamento diferente em escala. Testa título curto/médio/longo em fundo claro e escuro.",
    status: "em teste",
    locations: [
      "v5/[slug]/page.tsx",
      "foundational/v5/page.tsx",
    ],
  },
  {
    href: "/type-test/nav-links",
    label: "Navegação principal",
    desc: "Links do header com 5 destinos reais (Editorial / Coleção / Foundational / Sobre / Loja). Testa fonte, tamanho, peso, tracking, caixa e separadores em barra desktop + drawer mobile.",
    status: "em teste",
    locations: [
      "components/v5-header.tsx",
    ],
  },
  {
    href: "/type-test/h2-h3",
    label: "Subtítulos (h2 / h3)",
    desc: "Cabeçalhos de secção dentro de artigos. Corpo de texto fixo (Plus Jakarta Sans 15px) como referência estável. h3 escala em 78% do h2. Testa 5 tratamentos decorativos (plain, linhas, kicker, lateral).",
    status: "em teste",
    locations: [
      "v5/[slug]/page.tsx",
      "foundational/v5/page.tsx",
    ],
  },
  {
    href: "/type-test/cartao-produto",
    label: "Cartão de produto",
    desc: "Componente inteiro: proporção (3/4, 4/5, quadrado, 5/7, 5/4), raio, tipografia do título, badge de status (4 posições × 3 estilos), densidade e meta (mínimo / regular / completo). Renderiza fila de 3 cartões por fonte.",
    status: "em teste",
    locations: [
      "colecao/page.tsx",
      "instagram/v6/page.tsx",
    ],
  },
]

const BACKLOG: TestEntry[] = [
  {
    label: "Botões e CTAs",
    desc: "Pill arredondado vs. levemente arredondado vs. quadrado. Peso do texto, tracking, tamanho e hierarquia primário/secundário/ghost.",
    status: "backlog",
    priority: "média",
    locations: [
      "instagram/v6/page.tsx",
      "components/v5-footer.tsx",
    ],
  },
  {
    label: "Título hero (sobre imagem)",
    desc: "Tipo display grande em cima de fotografia com overlay. Contexto diferente do artigo — precisa de contraste e impacto. Testar família, tamanho e shadow/overlay.",
    status: "backlog",
    priority: "média",
    locations: [
      "instagram/v6/page.tsx",
      "v5/page.tsx",
    ],
  },
  {
    label: "Labels e captions",
    desc: "O sistema de pequenas etiquetas em maiúsculas com tracking largo (8–10px). São usadas em toda a UI como marcadores de categoria e secção. Testar tamanho, tracking e se devem ser serif ou sans.",
    status: "backlog",
    priority: "baixa",
    locations: [
      "v5/[slug]/page.tsx",
      "instagram/v6/page.tsx",
      "components/v5-footer.tsx",
    ],
  },
  {
    label: "Citação inline (blockquote)",
    desc: "Blockquotes dentro do corpo de artigos — diferente do pullquote de largura total. Testar indentação, linha lateral, fonte e tamanho relativo ao corpo.",
    status: "backlog",
    priority: "baixa",
    locations: [
      "v5/[slug]/page.tsx",
      "foundational/v5/page.tsx",
    ],
  },
  {
    label: "Paleta de cores",
    desc: "Navy, gold e cream nas suas variações. Testar combinações de fundo/texto, estados hover, e como as cores se comportam em contexto editorial real.",
    status: "backlog",
    priority: "baixa",
    locations: [
      "globals.css",
    ],
  },
]

const STATUS_STYLES: Record<Status, string> = {
  "em teste": "text-brand-gold/70 border-brand-gold/20",
  "decidido": "text-emerald-600 border-emerald-200",
  "backlog":  "text-slate-300 border-slate-200",
}

const PRIORITY_DOT: Record<string, string> = {
  alta:  "bg-brand-gold",
  média: "bg-slate-300",
  baixa: "bg-slate-200",
}

function TestCard({ t }: { t: TestEntry }) {
  const inner = (
    <div className="group flex flex-col gap-2 py-6 -mx-3 px-3 rounded-lg transition-colors hover:bg-slate-50/60">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          {t.priority && (
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-0.5 ${PRIORITY_DOT[t.priority]}`} />
          )}
          <span className="font-serif text-[18px] text-brand-navy group-hover:text-brand-navy/80 transition-colors tracking-[-0.01em]">
            {t.label}
          </span>
        </div>
        <span className={`text-[9px] font-medium uppercase tracking-[0.14em] border rounded-full px-2 py-0.5 shrink-0 ${STATUS_STYLES[t.status]}`}>
          {t.status}
        </span>
      </div>
      <p className="text-[13px] text-slate-400 leading-[1.6]">{t.desc}</p>
      <div className="flex flex-wrap gap-1.5 mt-0.5">
        {t.locations.map((loc) => (
          <code key={loc} className="text-[10px] bg-slate-50 text-slate-400 px-2 py-0.5 rounded">
            {loc}
          </code>
        ))}
      </div>
      {t.href && (
        <span className="text-brand-gold/50 text-sm group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all mt-0.5">
          →
        </span>
      )}
    </div>
  )

  return t.href ? <Link href={t.href}>{inner}</Link> : <div>{inner}</div>
}

export default function TypeTestIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-20">

        <Link href="/" className="text-[11px] text-slate-400 hover:text-brand-navy transition-colors block mb-12">
          ← início
        </Link>

        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-3">Laboratório</p>
        <h1 className="font-serif text-[32px] text-brand-navy tracking-[-0.025em] leading-tight mb-3">
          Type Test
        </h1>
        <p className="text-[14px] text-slate-400 leading-relaxed mb-3">
          Decisões de design abertas. Cada página testa variantes dentro de
          conteúdo editorial real. Para criar um novo teste, copie{" "}
          <code className="text-[12px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
            _template.tsx
          </code>{" "}
          para{" "}
          <code className="text-[12px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
            &lt;slug&gt;/page.tsx
          </code>{" "}
          e adapte.
        </p>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-12 text-[10px] text-slate-300">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />prioridade alta</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300" />média</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-200" />baixa</span>
        </div>

        {/* Active tests */}
        <div className="mb-2">
          <div className="flex items-center gap-4 mb-1">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Em curso</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
          <div className="divide-y divide-slate-100">
            {ACTIVE.map((t) => <TestCard key={t.label} t={t} />)}
          </div>
        </div>

        {/* Backlog */}
        <div className="mt-10">
          <div className="flex items-center gap-4 mb-1">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Backlog</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
          <div className="divide-y divide-slate-100">
            {BACKLOG.map((t) => <TestCard key={t.label} t={t} />)}
          </div>
        </div>

      </div>
    </div>
  )
}
