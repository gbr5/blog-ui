/**
 * Typography Test — Pullquote Block
 *
 * Tests font candidates for the navy pullquote component used in:
 *   - v5/[slug]/page.tsx       (post pages, skewed strip)
 *   - foundational/v5/page.tsx (foundational page, same strip, larger)
 *   - instagram/v5/page.tsx    (phone manifesto, italic, compact)
 *   - instagram/v6/page.tsx    (website manifesto, full-width, centered)
 *
 * 37 variants — data-driven. No italics. No quotes. Text centered.
 * Thin weights (< 600) excluded: highlight component.
 */

import Link from "next/link"

const QUOTE = "A beleza que dura não é perfeição — é autenticidade."

const BODY_A =
  "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado."

const BODY_B =
  "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular."

// ─── Variant definition ────────────────────────────────────────────────────
type Variant = {
  group: string
  n: number
  name: string
  tag?: string
  fontVar: string
  weight: string
  tracking: string
  lineHeight: string
  caps?: boolean
  size?: "large" | "contained"
  note: string
}

const VARIANTS: Variant[] = [

  // ── Grupo A — Referência ─────────────────────────────────────────────────
  {
    group: "A", n: 1,
    name: "Playfair Display 700",
    tag: "atual",
    fontVar: "--font-playfair",
    weight: "700", tracking: "-0.025em", lineHeight: "1.15",
    note: "Referência actual. Dramático e funcional — mas com peso de revista de moda. Loud para o tom museu-editorial da DA.",
  },

  // ── Grupo B — Cormorant Garamond ─────────────────────────────────────────
  {
    group: "B", n: 1,
    name: "Cormorant Garamond 600",
    tag: "candidato",
    fontVar: "--font-cormorant",
    weight: "600", tracking: "-0.025em", lineHeight: "0.95",
    note: "Clássico, literário, elegante. Drama suficiente sem se tornar teatral. Melhor opção gratuita para o tom da DA.",
  },
  {
    group: "B", n: 2,
    name: "Cormorant Garamond 700",
    fontVar: "--font-cormorant",
    weight: "700", tracking: "-0.03em", lineHeight: "0.92",
    note: "Um passo mais pesado que B1. Ainda refinado — começa a cruzar para território fashion. Comparar com B1 em mobile.",
  },
  {
    group: "B", n: 3,
    name: "Cormorant Garamond 600 · tracking muito fechado",
    fontVar: "--font-cormorant",
    weight: "600", tracking: "-0.04em", lineHeight: "0.9",
    note: "Tracking mais fechado que B1. Mais compacto, mais denso. Testa o limite de legibilidade em mobile.",
  },
  {
    group: "B", n: 4,
    name: "Cormorant Garamond 700 · tracking muito fechado",
    fontVar: "--font-cormorant",
    weight: "700", tracking: "-0.04em", lineHeight: "0.88",
    note: "Peso 700 com tracking extremo. Máxima densidade para o Cormorant. Imponente em desktop, pode falhar em mobile.",
  },
  {
    group: "B", n: 5,
    name: "Cormorant Garamond 600 · linha aberta",
    fontVar: "--font-cormorant",
    weight: "600", tracking: "-0.02em", lineHeight: "1.1",
    note: "Line-height mais alto dá respiro entre linhas. Menos teatro, mais leitura. Pode funcionar melhor em frases com quebra de linha natural.",
  },
  {
    group: "B", n: 6,
    name: "Cormorant Garamond 600 · contido",
    tag: "tamanho menor",
    fontVar: "--font-cormorant",
    weight: "600", tracking: "-0.02em", lineHeight: "1.0",
    size: "contained",
    note: "Tamanho ~20% menor. Mais respiro, menos teatro. Expensive pela contenção — não pelo volume.",
  },
  {
    group: "B", n: 7,
    name: "Cormorant Garamond 700 · contido",
    fontVar: "--font-cormorant",
    weight: "700", tracking: "-0.025em", lineHeight: "0.95",
    size: "contained",
    note: "Peso 700 no tamanho contido. Equilíbrio entre presença e discrição. Candidato forte para páginas com mais conteúdo.",
  },

  // ── Grupo BC — Cormorant caps ─────────────────────────────────────────────
  {
    group: "BC", n: 1,
    name: "Cormorant Garamond 600 · versalete",
    fontVar: "--font-cormorant",
    weight: "600", tracking: "0.06em", lineHeight: "1.05",
    caps: true,
    note: "Evoca sinalética de museu. Funciona melhor com frases curtas — esta começa a ficar longa em caps.",
  },
  {
    group: "BC", n: 2,
    name: "Cormorant Garamond 700 · versalete",
    fontVar: "--font-cormorant",
    weight: "700", tracking: "0.04em", lineHeight: "1.0",
    caps: true,
    note: "Peso 700 em caps. Mais impacto, menor tracking. Mais próximo de um título de exposição do que uma citação.",
  },
  {
    group: "BC", n: 3,
    name: "Cormorant Garamond 600 · versalete largo",
    fontVar: "--font-cormorant",
    weight: "600", tracking: "0.1em", lineHeight: "1.1",
    caps: true,
    note: "Tracking muito largo. Respira como mármores de galeria. Máximo requinte — mas exige frase muito curta.",
  },

  // ── Grupo P — Playfair Display ────────────────────────────────────────────
  {
    group: "P", n: 1,
    name: "Playfair Display 600",
    fontVar: "--font-playfair",
    weight: "600", tracking: "-0.02em", lineHeight: "1.1",
    note: "Um passo mais leve que A1. Menos agressivo — mas o Playfair com menos peso perde algum do impacto que é a sua razão de existir.",
  },
  {
    group: "P", n: 2,
    name: "Playfair Display 800",
    fontVar: "--font-playfair",
    weight: "800", tracking: "-0.03em", lineHeight: "1.05",
    note: "Peso máximo do Playfair. Muito mais fashion/magazine. Útil para perceber onde está o teto desta família.",
  },
  {
    group: "P", n: 3,
    name: "Playfair Display 700 · contido",
    fontVar: "--font-playfair",
    weight: "700", tracking: "-0.025em", lineHeight: "1.15",
    size: "contained",
    note: "A1 no tamanho contido. O Playfair beneficia mais do que o Cormorant com a redução de tamanho — parece mais editorial.",
  },
  {
    group: "P", n: 4,
    name: "Playfair Display 600 · versalete",
    fontVar: "--font-playfair",
    weight: "600", tracking: "0.06em", lineHeight: "1.1",
    caps: true,
    note: "Playfair em caps é muito mais agressivo que o Cormorant. Útil como contraste para perceber porque o Cormorant aguenta melhor versalete.",
  },
  {
    group: "P", n: 5,
    name: "Playfair Display 700 · versalete",
    fontVar: "--font-playfair",
    weight: "700", tracking: "0.05em", lineHeight: "1.1",
    caps: true,
    note: "Versalete mais pesado. Chega perto de poster de cinema. O oposto do que a DA precisa — mas importante como referência do que evitar.",
  },
  {
    group: "P", n: 6,
    name: "Playfair Display 800 · versalete",
    fontVar: "--font-playfair",
    weight: "800", tracking: "0.04em", lineHeight: "1.05",
    caps: true,
    note: "Teto do Playfair em caps. Comparar com BC3 para ver a distância de tom entre as duas famílias.",
  },

  // ── Grupo EB — EB Garamond ────────────────────────────────────────────────
  {
    group: "EB", n: 1,
    name: "EB Garamond 600",
    fontVar: "--font-eb-garamond",
    weight: "600", tracking: "-0.02em", lineHeight: "1.0",
    note: "Mais sóbrio e académico que o Cormorant. Em display grande perde alguma personalidade — funciona melhor em tamanhos de texto corrido.",
  },
  {
    group: "EB", n: 2,
    name: "EB Garamond 700",
    fontVar: "--font-eb-garamond",
    weight: "700", tracking: "-0.025em", lineHeight: "0.95",
    note: "Académico refinado ao peso 700. Boa opção se o objectivo for máxima seriedade sem ornamento. Menos impacto visual que o Cormorant.",
  },
  {
    group: "EB", n: 3,
    name: "EB Garamond 800",
    fontVar: "--font-eb-garamond",
    weight: "800", tracking: "-0.03em", lineHeight: "0.92",
    note: "Peso máximo do EB Garamond. Ganha presença mas começa a afastar-se do tom académico — fica mais próximo de impacto editorial.",
  },
  {
    group: "EB", n: 4,
    name: "EB Garamond 700 · contido",
    fontVar: "--font-eb-garamond",
    weight: "700", tracking: "-0.02em", lineHeight: "1.0",
    size: "contained",
    note: "Tamanho contido. O EB Garamond beneficia desta redução — parece mais museu, menos display advertising.",
  },
  {
    group: "EB", n: 5,
    name: "EB Garamond 600 · versalete",
    fontVar: "--font-eb-garamond",
    weight: "600", tracking: "0.06em", lineHeight: "1.05",
    caps: true,
    note: "EB Garamond em versalete é mais sóbrio que o Cormorant — menos ornamento, mais seriedade. Bom para frases declarativas.",
  },
  {
    group: "EB", n: 6,
    name: "EB Garamond 700 · versalete",
    fontVar: "--font-eb-garamond",
    weight: "700", tracking: "0.05em", lineHeight: "1.0",
    caps: true,
    note: "Peso 700 em versalete. A combinação mais forte desta família para o componente. Comparar com BC2.",
  },
  {
    group: "EB", n: 7,
    name: "EB Garamond 800 · versalete",
    fontVar: "--font-eb-garamond",
    weight: "800", tracking: "0.04em", lineHeight: "0.98",
    caps: true,
    note: "Máximo peso em caps. Ganha impacto mas perde o tom académico que é o diferencial desta família.",
  },

  // ── Grupo F — Fraunces ────────────────────────────────────────────────────
  {
    group: "F", n: 1,
    name: "Fraunces 600",
    fontVar: "--font-fraunces",
    weight: "600", tracking: "-0.02em", lineHeight: "0.98",
    note: "Distinto, com personalidade forte. Mais contemporâneo e humano que o Cormorant. Pode funcionar se a DA quiser diferenciar-se de galerias tradicionais.",
  },
  {
    group: "F", n: 2,
    name: "Fraunces 700",
    tag: "candidato",
    fontVar: "--font-fraunces",
    weight: "700", tracking: "-0.025em", lineHeight: "0.95",
    note: "Ao peso 700 ganha presença sem perder a personalidade. O mais distinto de todos os candidatos.",
  },
  {
    group: "F", n: 3,
    name: "Fraunces 800",
    fontVar: "--font-fraunces",
    weight: "800", tracking: "-0.03em", lineHeight: "0.92",
    note: "Peso máximo. Muito impacto — começa a tornar-se exuberante para o tom da DA. Útil como limite superior.",
  },
  {
    group: "F", n: 4,
    name: "Fraunces 600 · contido",
    fontVar: "--font-fraunces",
    weight: "600", tracking: "-0.02em", lineHeight: "1.0",
    size: "contained",
    note: "O tamanho contido serve muito bem o Fraunces — a personalidade da fonte mantém-se sem dominar.",
  },
  {
    group: "F", n: 5,
    name: "Fraunces 700 · contido",
    fontVar: "--font-fraunces",
    weight: "700", tracking: "-0.025em", lineHeight: "0.95",
    size: "contained",
    note: "Candidato forte no tamanho contido. Equilíbrio entre presença e discrição.",
  },
  {
    group: "F", n: 6,
    name: "Fraunces 600 · versalete",
    fontVar: "--font-fraunces",
    weight: "600", tracking: "0.07em", lineHeight: "1.05",
    caps: true,
    note: "Fraunces em versalete tem menos naturalidade que o Cormorant — a fonte foi desenhada para texto corrido e display, não para caps.",
  },
  {
    group: "F", n: 7,
    name: "Fraunces 700 · versalete",
    fontVar: "--font-fraunces",
    weight: "700", tracking: "0.05em", lineHeight: "1.0",
    caps: true,
    note: "Caps mais pesado. Perde ainda mais a personalidade característica do Fraunces. Comparar com BC2 e EB6.",
  },

  // ── Grupo LB — Libre Baskerville ─────────────────────────────────────────
  {
    group: "LB", n: 1,
    name: "Libre Baskerville 700",
    fontVar: "--font-libre-baskerville",
    weight: "700", tracking: "-0.015em", lineHeight: "1.05",
    note: "Sólida, confiável, legível. Em display grande parece mais jornal de qualidade do que galeria de arte. Referência para perceber o que falta aos outros.",
  },
  {
    group: "LB", n: 2,
    name: "Libre Baskerville 700 · contido",
    fontVar: "--font-libre-baskerville",
    weight: "700", tracking: "-0.015em", lineHeight: "1.05",
    size: "contained",
    note: "O tamanho contido não resolve o problema fundamental do Baskerville — parece sempre mais newspaper do que museu.",
  },
  {
    group: "LB", n: 3,
    name: "Libre Baskerville 700 · versalete",
    fontVar: "--font-libre-baskerville",
    weight: "700", tracking: "0.05em", lineHeight: "1.1",
    caps: true,
    note: "Em caps o Baskerville aproxima-se mais do tom desejado — perde algum do carácter newspaper. Mas o Cormorant ainda ganha nesta dimensão.",
  },

  // ── Grupo X — Tracking e line-height extremos ─────────────────────────────
  {
    group: "X", n: 1,
    name: "Cormorant Garamond 600 · linha muito fechada",
    fontVar: "--font-cormorant",
    weight: "600", tracking: "-0.025em", lineHeight: "0.85",
    note: "Line-height extremamente fechado. As linhas quase se tocam. Pode funcionar como efeito visual deliberado — testa o limite.",
  },
  {
    group: "X", n: 2,
    name: "Playfair Display 700 · linha muito fechada",
    fontVar: "--font-playfair",
    weight: "700", tracking: "-0.025em", lineHeight: "0.9",
    note: "Playfair com linha fechada. A presença das serifas torna o empilhamento mais arriscado que no Cormorant.",
  },
  {
    group: "X", n: 3,
    name: "EB Garamond 800 · tracking muito fechado",
    fontVar: "--font-eb-garamond",
    weight: "800", tracking: "-0.035em", lineHeight: "0.92",
    note: "Peso máximo com tracking muito fechado. Densidade máxima para esta família. Testa se o EB Garamond aguenta o extremo.",
  },
  {
    group: "X", n: 4,
    name: "Cormorant Garamond 700 · tracking aberto",
    fontVar: "--font-cormorant",
    weight: "700", tracking: "-0.01em", lineHeight: "1.0",
    note: "Tracking intencionalmente menos fechado. O Cormorant 700 respira mais — perde densidade mas ganha clareza em mobile.",
  },
]

// ─── Pullquote shell ───────────────────────────────────────────────────────
function PullquoteShell({ v }: { v: Variant }) {
  const sizeClasses =
    v.size === "contained"
      ? "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px]"
      : "text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px]"

  const displayText = v.caps ? QUOTE.toUpperCase() : QUOTE

  return (
    <figure
      className="my-10 md:my-14"
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
          padding: v.size === "contained" ? "4rem 1.5rem" : "3.5rem 1.5rem",
        }}
      >
        <blockquote style={{ transform: "skewY(2deg)" }}>
          <p
            className={`${sizeClasses} text-white max-w-5xl mx-auto px-2 sm:px-8 md:px-16 text-center`}
            style={{
              fontFamily: `var(${v.fontVar})`,
              fontWeight: v.weight,
              letterSpacing: v.tracking,
              lineHeight: v.lineHeight,
              textTransform: v.caps ? "uppercase" : "none",
            }}
          >
            {displayText}
          </p>
        </blockquote>
      </div>
    </figure>
  )
}

// ─── Spec row ──────────────────────────────────────────────────────────────
function Spec({ v }: { v: Variant }) {
  const rows: [string, string][] = [
    ["font-family", v.fontVar.replace("--font-", "").replace(/-/g, " ")],
    ["font-weight", v.weight],
    ["letter-spacing", v.tracking],
    ["line-height", v.lineHeight],
    ["text-transform", v.caps ? "uppercase" : "none"],
    ["size", v.size === "contained" ? "contained (~20% menor)" : "large (padrão)"],
  ]
  return (
    <div className="my-5 border-l-2 border-brand-gold/20 pl-5">
      <div className="grid grid-cols-[130px_1fr] gap-x-3 mb-3">
        {rows.map(([k, val]) => (
          <>
            <span key={`k-${k}`} className="text-[10px] font-mono text-slate-300 leading-5">{k}</span>
            <span key={`v-${k}`} className="text-[10px] font-mono text-slate-400 leading-5">{val}</span>
          </>
        ))}
      </div>
      <p className="text-[12px] text-slate-400 leading-5 italic">{v.note}</p>
    </div>
  )
}

// ─── Group divider ─────────────────────────────────────────────────────────
function GroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mt-20 mb-2 mx-auto max-w-[700px] px-5 md:px-8">
      <div className="h-px flex-1 bg-slate-100" />
      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300 shrink-0">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-100" />
    </div>
  )
}

// ─── Group map (for dividers) ──────────────────────────────────────────────
const GROUP_LABELS: Record<string, string> = {
  A:  "Grupo A — Referência",
  B:  "Grupo B — Cormorant Garamond",
  BC: "Grupo BC — Cormorant · versalete",
  P:  "Grupo P — Playfair Display",
  EB: "Grupo EB — EB Garamond",
  F:  "Grupo F — Fraunces",
  LB: "Grupo LB — Libre Baskerville",
  X:  "Grupo X — Tracking e line-height extremos",
}

export default function TypeTestPullquotePage() {
  let lastGroup = ""

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
          37 variantes cobrindo fonte, peso, versalete, tamanho, tracking e
          line-height. Sem itálicos. Sem aspas. Texto centrado. Pesos abaixo
          de 600 excluídos.
        </p>
      </header>

      {/* ── Variants ────────────────────────────────────── */}
      {VARIANTS.map((v, i) => {
        const showDivider = v.group !== lastGroup
        if (showDivider) lastGroup = v.group

        return (
          <div key={i}>
            {showDivider && <GroupDivider label={GROUP_LABELS[v.group] ?? v.group} />}

            <div className="mx-auto max-w-[700px] px-5 md:px-8">
              <div className="mt-12 mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-slate-300">
                    {v.group}{v.n}
                  </span>
                  {v.tag && (
                    <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-brand-gold/70 border border-brand-gold/20 rounded-full px-2 py-0.5">
                      {v.tag}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-[19px] md:text-[22px] text-brand-navy tracking-[-0.02em]">
                  {v.name}
                </h2>
              </div>
              <p className="text-[14px] leading-7 text-slate-500">{i % 2 === 0 ? BODY_A : BODY_B}</p>
            </div>

            <PullquoteShell v={v} />

            <div className="mx-auto max-w-[700px] px-5 md:px-8">
              <Spec v={v} />
              <p className="text-[14px] leading-7 text-slate-500 pb-2">{i % 2 === 0 ? BODY_B : BODY_A}</p>
            </div>
          </div>
        )
      })}

      {/* ── Verdict ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <div className="border-t border-slate-100 mt-16 pt-10 pb-20">
          <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
            Veredito de trabalho
          </p>
          <p className="font-serif text-[20px] md:text-[24px] text-brand-navy tracking-[-0.015em] leading-[1.3] mb-4">
            Candidatos finais: B1, B7, BC1.
          </p>
          <p className="text-[14px] leading-7 text-slate-500 mb-6">
            B1 (Cormorant 600, standard) para artigos. B7 (Cormorant 700 contido)
            para páginas manifesto. BC1 (versalete) reservado para frases muito curtas.
          </p>
          <p className="text-[13px] text-slate-400 leading-6">
            Aplica-se a:{" "}
            {[
              "v5/[slug]/page.tsx",
              "foundational/v5/page.tsx",
              "instagram/v5/page.tsx",
              "instagram/v6/page.tsx",
            ].map((f, i, arr) => (
              <span key={f}>
                <code className="text-[11px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-400">{f}</code>
                {i < arr.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

    </div>
  )
}
