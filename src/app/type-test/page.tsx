/**
 * Type Test — index
 * Tracks all open typography decisions. Each entry links to a dedicated
 * test page where variants are rendered inside realistic content.
 */
import Link from "next/link"

const tests = [
  {
    href: "/type-test/pullquote",
    label: "Pullquote block",
    desc: "Bloco de citação em fundo azul-marinho. Usado nos artigos V5, página fundacional e manifestos Instagram V5/V6.",
    status: "em teste",
    locations: [
      "v5/[slug]/page.tsx",
      "foundational/v5/page.tsx",
      "instagram/v5/page.tsx",
      "instagram/v6/page.tsx",
    ],
  },
]

export default function TypeTestIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-20">

        <Link
          href="/"
          className="text-[11px] text-slate-400 hover:text-brand-navy transition-colors block mb-12"
        >
          ← início
        </Link>

        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-3">Laboratório</p>
        <h1 className="font-serif text-[32px] text-brand-navy tracking-[-0.025em] leading-tight mb-3">
          Type Test
        </h1>
        <p className="text-[14px] text-slate-400 leading-6.5 mb-12">
          Decisões tipográficas abertas. Cada página testa as candidatas dentro de
          conteúdo editorial real — não em grelhas de comparação abstractas.
        </p>

        <div className="divide-y divide-slate-100">
          {tests.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col gap-2 py-6 hover:bg-slate-50/60 -mx-3 px-3 rounded-lg transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-serif text-[18px] text-brand-navy group-hover:text-brand-navy/80 transition-colors tracking-[-0.01em]">
                  {t.label}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-brand-gold/70 border border-brand-gold/20 rounded-full px-2 py-0.5 shrink-0">
                  {t.status}
                </span>
              </div>
              <p className="text-[13px] text-slate-400 leading-[1.6]">{t.desc}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {t.locations.map((loc) => (
                  <code
                    key={loc}
                    className="text-[10px] bg-slate-50 text-slate-400 px-2 py-0.5 rounded"
                  >
                    {loc}
                  </code>
                ))}
              </div>
              <span className="text-brand-gold/50 text-sm group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all mt-1">
                →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
