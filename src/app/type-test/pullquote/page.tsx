/**
 * Typography Test — Pullquote Block
 *
 * Tests font candidates for the navy pullquote component used in:
 *   - v5/[slug]/page.tsx      (post pages, skewed strip)
 *   - foundational/v5/page.tsx (foundational page, same strip, larger)
 *   - instagram/v5/page.tsx   (phone manifesto, italic, compact)
 *   - instagram/v6/page.tsx   (website manifesto, full-width, centered)
 *
 * Each variant is rendered inside realistic editorial content so you can
 * judge it in context — not in a sterile grid.
 */

import Link from "next/link"

const QUOTE = "A beleza que dura não é perfeição — é autenticidade."

const LOREM_SHORT =
  "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado."

const LOREM_LONG =
  "Um relógio de bolso que pertenceu ao avô não é apenas um relógio antigo — é um repositório de tempo vivido, de decisões tomadas, de momentos que ele testemunhou sem saber. É nesse acúmulo silencioso que reside o que chamamos de presença."

const LOREM_AFTER =
  "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular."

// ─── Shared pullquote shell ────────────────────────────────────────────────
function PullquoteShell({
  fontVar,
  weight = "600",
  tracking = "-0.025em",
  lineHeight = "0.95",
  style: extraStyle,
}: {
  fontVar: string
  weight?: string
  tracking?: string
  lineHeight?: string
  style?: React.CSSProperties
}) {
  return (
    <figure
      className="my-14 md:my-20"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "oklch(0.30 0.06 250)",
          transform: "skewY(-2deg)",
          padding: "3.5rem 1.5rem",
        }}
      >
        <blockquote style={{ transform: "skewY(2deg)" }}>
          <p
            className="text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px] text-white max-w-5xl mx-auto px-2 sm:px-8 md:px-16"
            style={{
              fontFamily: `var(${fontVar})`,
              fontWeight: weight,
              letterSpacing: tracking,
              lineHeight,
              ...extraStyle,
            }}
          >
            &ldquo;{QUOTE}&rdquo;
          </p>
        </blockquote>
      </div>
    </figure>
  )
}

// ─── Spec block rendered as article text ──────────────────────────────────
function Spec({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="my-6 border-l-2 border-brand-gold/30 pl-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold mb-2">{label}</p>
      {items.map((item, i) => (
        <p key={i} className="text-[13px] text-slate-400 font-mono leading-6">
          {item}
        </p>
      ))}
    </div>
  )
}

// ─── Section label ─────────────────────────────────────────────────────────
function VariantLabel({ n, name, verdict }: { n: number; name: string; verdict: string }) {
  return (
    <div className="mt-16 mb-4 flex items-baseline gap-3">
      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">
        Variante {n}
      </span>
      <h2 className="font-serif text-[22px] md:text-[26px] text-brand-navy tracking-[-0.02em]">
        {name}
      </h2>
      <span className="text-[11px] text-slate-400 italic">{verdict}</span>
    </div>
  )
}

export default function TypeTestPullquotePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Dev nav ────────────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8 pt-8 pb-2 flex items-center gap-4">
        <Link
          href="/"
          className="text-[11px] text-slate-400 hover:text-brand-navy transition-colors"
        >
          ← início
        </Link>
        <span className="text-slate-200">·</span>
        <Link
          href="/type-test"
          className="text-[11px] text-slate-400 hover:text-brand-navy transition-colors"
        >
          type-test
        </Link>
        <span className="text-slate-200">·</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-brand-gold/60 border border-brand-gold/20 rounded-full px-2.5 py-0.5">
          pullquote
        </span>
      </div>

      {/* ── Article header ─────────────────────────────── */}
      <header className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          Teste tipográfico · Componente pullquote
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-5">
          Qual fonte serve melhor o bloco de citação da DominionArts?
        </h1>
        <p className="text-[14px] sm:text-[15px] leading-7 text-slate-400">
          Este documento testa cinco candidatas para o componente de destaque tipográfico
          em fundo azul-marinho — o mesmo bloco usado nos artigos do V5, na página fundacional
          e nas seções de manifesto do Instagram V5 e V6. Cada variante aparece dentro de
          conteúdo editorial real para que o julgamento seja feito em contexto.
        </p>
      </header>

      {/* ══════════════════════════════════════════════════
          VARIANT 1 — Playfair Display (current)
      ══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantLabel n={1} name="Playfair Display" verdict="— atual" />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_SHORT} {LOREM_LONG}
        </p>
      </div>

      <PullquoteShell
        fontVar="--font-playfair"
        weight="700"
        tracking="-0.025em"
        lineHeight="1.15"
      />

      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          label="Especificações actuais"
          items={[
            "font-family: Playfair Display",
            "font-weight: 700 (bold)",
            "letter-spacing: -0.025em",
            "line-height: 1.15",
            "Avaliação: dramático, funciona — mas tem peso de revista de moda.",
            "               Pode tornar-se genérico. Loud para DominionArts.",
          ]}
        />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_AFTER}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════
          VARIANT 2 — Cormorant Garamond (recommended)
      ══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantLabel n={2} name="Cormorant Garamond" verdict="— recomendado" />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_SHORT} {LOREM_LONG}
        </p>
      </div>

      <PullquoteShell
        fontVar="--font-cormorant"
        weight="600"
        tracking="-0.025em"
        lineHeight="0.95"
      />

      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          label="Especificações candidatas"
          items={[
            "font-family: Cormorant Garamond",
            "font-weight: 600",
            "letter-spacing: -0.025em",
            "line-height: 0.95",
            "Avaliação: clássico, literário, elegante. Drama suficiente para",
            "               um bloco de citação, sem se tornar teatral. Melhor",
            "               opção gratuita para o tom museu-editorial da DA.",
          ]}
        />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_AFTER}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════
          VARIANT 3 — EB Garamond
      ══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantLabel n={3} name="EB Garamond" verdict="— mais académico" />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_SHORT} {LOREM_LONG}
        </p>
      </div>

      <PullquoteShell
        fontVar="--font-eb-garamond"
        weight="600"
        tracking="-0.02em"
        lineHeight="1.0"
      />

      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          label="Especificações candidatas"
          items={[
            "font-family: EB Garamond",
            "font-weight: 600",
            "letter-spacing: -0.02em",
            "line-height: 1.0",
            "Avaliação: mais sóbria e académica que o Cormorant. Boa opção se",
            "               o objectivo for máxima seriedade / menos ornamento.",
            "               Menos impacto visual em tamanhos grandes.",
          ]}
        />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_AFTER}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════
          VARIANT 4 — Libre Baskerville
      ══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantLabel n={4} name="Libre Baskerville" verdict="— mais estável" />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_SHORT} {LOREM_LONG}
        </p>
      </div>

      <PullquoteShell
        fontVar="--font-libre-baskerville"
        weight="700"
        tracking="-0.015em"
        lineHeight="1.05"
      />

      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          label="Especificações candidatas"
          items={[
            "font-family: Libre Baskerville",
            "font-weight: 700",
            "letter-spacing: -0.015em",
            "line-height: 1.05",
            "Avaliação: sólida, legível, confiável — mas menos luxuosa.",
            "               Funciona bem para texto corrido; em display grande",
            "               parece mais jornal de qualidade do que galeria de arte.",
          ]}
        />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_AFTER}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════
          VARIANT 5 — Fraunces
      ══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantLabel n={5} name="Fraunces" verdict="— mais distinto" />

        <p className="text-[15px] leading-7 text-slate-600 mb-6">
          {LOREM_SHORT} {LOREM_LONG}
        </p>
      </div>

      <PullquoteShell
        fontVar="--font-fraunces"
        weight="500"
        tracking="-0.02em"
        lineHeight="0.98"
      />

      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          label="Especificações candidatas"
          items={[
            "font-family: Fraunces",
            "font-weight: 500",
            "letter-spacing: -0.02em",
            "line-height: 0.98",
            "Avaliação: personalidade distinta e interessante. Opticamente",
            "               mais leve que parece. Ligeiramente mais lúdico —",
            "               pode funcionar se a DA quiser um toque mais humano.",
          ]}
        />

        <p className="text-[15px] leading-7 text-slate-600 mb-8">
          {LOREM_AFTER}
        </p>

        {/* ── Verdict ────────────────────────────────── */}
        <div className="border-t border-slate-100 pt-10 pb-16">
          <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
            Veredito de trabalho
          </p>
          <p className="font-serif text-[20px] md:text-[24px] text-brand-navy tracking-[-0.015em] leading-[1.3] mb-4">
            A recomendação é Cormorant Garamond, peso 600.
          </p>
          <p className="text-[14px] leading-7 text-slate-500">
            Tem drama suficiente para um bloco de citação em fundo escuro, mas mantém a
            contenção que define o tom da DominionArts. O bloco deve sentir-se como uma pausa
            curada — não como um punch line de rede social. Após decidir a fonte, a mesma
            escolha aplica-se a:{" "}
            <code className="text-[12px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
              v5/[slug]/page.tsx
            </code>
            {" · "}
            <code className="text-[12px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
              foundational/v5/page.tsx
            </code>
            {" · "}
            <code className="text-[12px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
              instagram/v5/page.tsx
            </code>
            {" · "}
            <code className="text-[12px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
              instagram/v6/page.tsx
            </code>
          </p>
        </div>
      </div>

    </div>
  )
}
