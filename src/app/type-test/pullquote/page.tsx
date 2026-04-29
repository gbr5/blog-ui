/**
 * Typography Test — Pullquote Block
 *
 * Tests font candidates for the navy pullquote component used in:
 *   - v5/[slug]/page.tsx       (post pages, skewed strip)
 *   - foundational/v5/page.tsx (foundational page, same strip, larger)
 *   - instagram/v5/page.tsx    (phone manifesto, italic, compact)
 *   - instagram/v6/page.tsx    (website manifesto, full-width, centered)
 *
 * Variants are grouped by decision axis — font, weight, style, case, size.
 * Thin weights (300/400) excluded: this is a highlight component.
 * Libre Baskerville excluded: too newspaper for DominionArts.
 */

import Link from "next/link"

const QUOTE = "A beleza que dura não é perfeição — é autenticidade."
const QUOTE_CAPS = "A beleza que dura não é perfeição — é autenticidade."

const BODY_A =
  "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado."

const BODY_B =
  "Um relógio de bolso que pertenceu ao avô não é apenas um relógio antigo — é um repositório de tempo vivido, de decisões tomadas, de momentos que ele testemunhou sem saber."

const BODY_C =
  "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular."

// ─── Pullquote shell ───────────────────────────────────────────────────────
function PullquoteShell({
  fontVar,
  weight = "600",
  tracking = "-0.025em",
  lineHeight = "0.95",
  italic = false,
  caps = false,
  size = "large",
}: {
  fontVar: string
  weight?: string
  tracking?: string
  lineHeight?: string
  italic?: boolean
  caps?: boolean
  size?: "large" | "contained"
}) {
  const sizeClasses =
    size === "contained"
      ? "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px]"
      : "text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px]"

  const displayText = caps ? QUOTE_CAPS.toUpperCase() : `\u201c${QUOTE}\u201d`

  return (
    <figure
      className="my-12 md:my-18"
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
          padding: size === "contained" ? "4rem 1.5rem" : "3.5rem 1.5rem",
        }}
      >
        <blockquote style={{ transform: "skewY(2deg)" }}>
          <p
            className={`${sizeClasses} text-white max-w-5xl mx-auto px-2 sm:px-8 md:px-16`}
            style={{
              fontFamily: `var(${fontVar})`,
              fontWeight: weight,
              letterSpacing: tracking,
              lineHeight,
              fontStyle: italic ? "italic" : "normal",
              textTransform: caps ? "uppercase" : "none",
            }}
          >
            {displayText}
          </p>
        </blockquote>
      </div>
    </figure>
  )
}

// ─── Spec block ────────────────────────────────────────────────────────────
function Spec({
  items,
  note,
}: {
  items: [string, string][]
  note: string
}) {
  return (
    <div className="my-6 border-l-2 border-brand-gold/25 pl-5 flex flex-col gap-0.5">
      <div className="grid grid-cols-[140px_1fr] gap-x-3 mb-2">
        {items.map(([k, v], i) => (
          <>
            <span key={`k${i}`} className="text-[11px] font-mono text-slate-300">{k}</span>
            <span key={`v${i}`} className="text-[11px] font-mono text-slate-500">{v}</span>
          </>
        ))}
      </div>
      <p className="text-[12px] text-slate-400 italic leading-5 mt-1">{note}</p>
    </div>
  )
}

// ─── Variant header ────────────────────────────────────────────────────────
function VariantHeader({
  group,
  n,
  name,
  tag,
}: {
  group: string
  n: number
  name: string
  tag?: string
}) {
  return (
    <div className="mt-20 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-slate-300">
          {group}
        </span>
        <span className="text-[8px] text-slate-200">·</span>
        <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-slate-300">
          {n}
        </span>
      </div>
      <div className="flex items-baseline gap-3 flex-wrap">
        <h2 className="font-serif text-[21px] md:text-[25px] text-brand-navy tracking-[-0.02em]">
          {name}
        </h2>
        {tag && (
          <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-brand-gold/70 border border-brand-gold/20 rounded-full px-2 py-0.5">
            {tag}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Group divider ─────────────────────────────────────────────────────────
function GroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mt-24 mb-2 mx-auto max-w-[700px] px-5 md:px-8">
      <div className="h-px flex-1 bg-slate-100" />
      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-100" />
    </div>
  )
}

export default function TypeTestPullquotePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Dev nav ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8 pt-8 pb-2 flex items-center gap-3 flex-wrap">
        <Link href="/" className="text-[11px] text-slate-400 hover:text-brand-navy transition-colors">
          ← início
        </Link>
        <span className="text-slate-200">·</span>
        <Link href="/type-test" className="text-[11px] text-slate-400 hover:text-brand-navy transition-colors">
          type-test
        </Link>
        <span className="text-slate-200">·</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-brand-gold/60 border border-brand-gold/20 rounded-full px-2.5 py-0.5">
          pullquote
        </span>
      </div>

      {/* ── Article header ──────────────────────────────── */}
      <header className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          Teste tipográfico · Componente pullquote
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-5">
          Qual fonte serve melhor o bloco de citação da DominionArts?
        </h1>
        <p className="text-[14px] sm:text-[15px] leading-7 text-slate-400">
          Nove variantes cobrindo as decisões relevantes: fonte, peso, estilo
          (normal · itálico), caixa (sentença · versalete) e tamanho. Pesos
          abaixo de 600 excluídos — este é um componente de destaque. Cada
          variante aparece dentro de conteúdo editorial real para que o
          julgamento seja feito em contexto.
        </p>
      </header>


      {/* ════════════════════════════════════════════════════
          GRUPO A — Referência
      ════════════════════════════════════════════════════ */}
      <GroupDivider label="Grupo A — Referência" />

      {/* A1 — Playfair 700 normal */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="A" n={1} name="Playfair Display 700" tag="atual" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A}</p>
      </div>
      <PullquoteShell fontVar="--font-playfair" weight="700" tracking="-0.025em" lineHeight="1.15" />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Playfair Display"],
            ["font-weight", "700"],
            ["letter-spacing", "-0.025em"],
            ["line-height", "1.15"],
            ["font-style", "normal"],
            ["text-transform", "none"],
          ]}
          note="Dramático e funcional — mas tem o peso de uma revista de moda. Pode tornar-se genérico. Loud para o tom museu-editorial da DominionArts."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>


      {/* ════════════════════════════════════════════════════
          GRUPO B — Cormorant Garamond (foco principal)
      ════════════════════════════════════════════════════ */}
      <GroupDivider label="Grupo B — Cormorant Garamond" />

      {/* B1 — Cormorant 600 normal */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="B" n={1} name="Cormorant Garamond 600 · normal" tag="recomendado base" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A} {BODY_B}</p>
      </div>
      <PullquoteShell fontVar="--font-cormorant" weight="600" tracking="-0.025em" lineHeight="0.95" />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Cormorant Garamond"],
            ["font-weight", "600"],
            ["letter-spacing", "-0.025em"],
            ["line-height", "0.95"],
            ["font-style", "normal"],
            ["text-transform", "none"],
          ]}
          note="Clássico, literário, elegante. Drama suficiente sem se tornar teatral. Melhor opção gratuita para o tom da DA."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>

      {/* B2 — Cormorant 700 normal */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="B" n={2} name="Cormorant Garamond 700 · normal" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A}</p>
      </div>
      <PullquoteShell fontVar="--font-cormorant" weight="700" tracking="-0.03em" lineHeight="0.92" />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Cormorant Garamond"],
            ["font-weight", "700"],
            ["letter-spacing", "-0.03em"],
            ["line-height", "0.92"],
            ["font-style", "normal"],
            ["text-transform", "none"],
          ]}
          note="Um passo mais pesado que o 600. Ainda refinado, mas começa a cruzar para território fashion. Comparar com B1 em mobile."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>

      {/* B3 — Cormorant 600 italic */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="B" n={3} name="Cormorant Garamond 600 · itálico" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A} {BODY_B}</p>
      </div>
      <PullquoteShell fontVar="--font-cormorant" weight="600" tracking="-0.025em" lineHeight="0.95" italic />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Cormorant Garamond"],
            ["font-weight", "600"],
            ["letter-spacing", "-0.025em"],
            ["line-height", "0.95"],
            ["font-style", "italic"],
            ["text-transform", "none"],
          ]}
          note="Muito literário e clássico. O itálico do Cormorant tem traços calígraficos genuínos — funciona bem com citações longas. Pode parecer demasiado delicado em mobile."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>

      {/* B4 — Cormorant 700 italic */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="B" n={4} name="Cormorant Garamond 700 · itálico" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A}</p>
      </div>
      <PullquoteShell fontVar="--font-cormorant" weight="700" tracking="-0.025em" lineHeight="0.93" italic />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Cormorant Garamond"],
            ["font-weight", "700"],
            ["letter-spacing", "-0.025em"],
            ["line-height", "0.93"],
            ["font-style", "italic"],
            ["text-transform", "none"],
          ]}
          note="Bold italic refinado. Combina presença com elegância histórica. Bom equilíbrio entre impacto e contenção. Candidato forte ao lado de B1."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>


      {/* ════════════════════════════════════════════════════
          GRUPO C — Versalete (caps)
      ════════════════════════════════════════════════════ */}
      <GroupDivider label="Grupo C — Versalete / All-caps" />

      {/* C1 — Cormorant 600 caps */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="C" n={1} name="Cormorant Garamond 600 · versalete" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A} {BODY_B}</p>
      </div>
      <PullquoteShell fontVar="--font-cormorant" weight="600" tracking="0.06em" lineHeight="1.05" caps />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Cormorant Garamond"],
            ["font-weight", "600"],
            ["letter-spacing", "0.06em"],
            ["line-height", "1.05"],
            ["font-style", "normal"],
            ["text-transform", "uppercase"],
          ]}
          note="Evoca sinalética de museu ou mármores de galeria. Sem aspas — caps e aspas colidem. Poderoso mas exige que o texto da citação aguente a caixa alta. Funciona melhor com frases curtas."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>

      {/* C2 — Playfair 700 caps */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="C" n={2} name="Playfair Display 700 · versalete" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A}</p>
      </div>
      <PullquoteShell fontVar="--font-playfair" weight="700" tracking="0.05em" lineHeight="1.1" caps />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Playfair Display"],
            ["font-weight", "700"],
            ["letter-spacing", "0.05em"],
            ["line-height", "1.1"],
            ["font-style", "normal"],
            ["text-transform", "uppercase"],
          ]}
          note="Muito mais agressivo em caps do que o Cormorant. Chega perto de um poster de cinema. Útil como comparação para perceber que o Cormorant aguenta melhor a caixa alta."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>


      {/* ════════════════════════════════════════════════════
          GRUPO D — Tamanho contido
      ════════════════════════════════════════════════════ */}
      <GroupDivider label="Grupo D — Tamanho contido" />

      {/* D1 — Cormorant 600 contained */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="D" n={1} name="Cormorant Garamond 600 · tamanho contido" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A} {BODY_B}</p>
      </div>
      <PullquoteShell fontVar="--font-cormorant" weight="600" tracking="-0.02em" lineHeight="1.0" size="contained" />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Cormorant Garamond"],
            ["font-weight", "600"],
            ["letter-spacing", "-0.02em"],
            ["line-height", "1.0"],
            ["font-style", "normal"],
            ["text-transform", "none"],
          ]}
          note="Tamanho reduzido (~20% menor). Mais espaço de respiro, menos teatro. Compara com B1: qual parece mais expensive? Pode ser a resposta certa para mobile."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>


      {/* ════════════════════════════════════════════════════
          GRUPO E — Alternativas
      ════════════════════════════════════════════════════ */}
      <GroupDivider label="Grupo E — Alternativas" />

      {/* E1 — EB Garamond 700 italic */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="E" n={1} name="EB Garamond 700 · itálico" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A} {BODY_B}</p>
      </div>
      <PullquoteShell fontVar="--font-eb-garamond" weight="700" tracking="-0.02em" lineHeight="1.0" italic />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "EB Garamond"],
            ["font-weight", "700"],
            ["letter-spacing", "-0.02em"],
            ["line-height", "1.0"],
            ["font-style", "italic"],
            ["text-transform", "none"],
          ]}
          note="Académico e refinado. O itálico do EB Garamond é mais sóbrio que o do Cormorant — menos ornamento, mais seriedade. Boa opção se o tom virar mais intelectual/museu do que literário."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_C}</p>
      </div>

      {/* E2 — Fraunces 700 normal */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <VariantHeader group="E" n={2} name="Fraunces 700 · normal" />
        <p className="text-[15px] leading-7 text-slate-600 mb-1">{BODY_A}</p>
      </div>
      <PullquoteShell fontVar="--font-fraunces" weight="700" tracking="-0.025em" lineHeight="0.95" />
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <Spec
          items={[
            ["font-family", "Fraunces"],
            ["font-weight", "700"],
            ["letter-spacing", "-0.025em"],
            ["line-height", "0.95"],
            ["font-style", "normal"],
            ["text-transform", "none"],
          ]}
          note="Distinto e com personalidade forte. Ao peso 700 tem impacto sem ser thin. Mais contemporâneo e humano — menos clássico que o Cormorant. Pode funcionar se a DA quiser diferenciar-se de galerias tradicionais."
        />
        <p className="text-[15px] leading-7 text-slate-600 mb-8">{BODY_C}</p>
      </div>


      {/* ── Verdict ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <div className="border-t border-slate-100 pt-10 pb-20">
          <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
            Veredito de trabalho
          </p>
          <p className="font-serif text-[20px] md:text-[24px] text-brand-navy tracking-[-0.015em] leading-[1.3] mb-4">
            Candidatos finais: B1 (600 normal) e B4 (700 itálico).
          </p>
          <p className="text-[14px] leading-7 text-slate-500 mb-6">
            Ambos mantêm a contenção que define o tom da DominionArts. B1 é
            mais contemporâneo e seguro; B4 é mais histórico e dramático. A
            decisão depende de onde o componente vai aparecer com mais
            frequência: artigos longos pedem B1, páginas manifesto pedem B4.
            Versalete (C1) fica reservado para frases muito curtas.
          </p>
          <p className="text-[13px] text-slate-400 leading-6">
            A escolha aplica-se a:{" "}
            {[
              "v5/[slug]/page.tsx",
              "foundational/v5/page.tsx",
              "instagram/v5/page.tsx",
              "instagram/v6/page.tsx",
            ].map((f, i, arr) => (
              <span key={f}>
                <code className="text-[11px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-400">
                  {f}
                </code>
                {i < arr.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

    </div>
  )
}
