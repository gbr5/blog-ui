"use client"

/**
 * Type Test — Subtítulos (h2 / h3)
 *
 * Decisão central: o subtítulo herda a família do corpo ou mantém uma família
 * display própria? Em escala 18–30px com leading curto, a mesma fonte que se
 * comporta bem em corpo pode parecer apagada como heading; e a display que
 * brilha no h1 pode parecer histriónica entre parágrafos.
 *
 * O corpo de texto é fixo (Plus Jakarta Sans 15px) para que cada subtítulo
 * sob teste seja avaliado contra a mesma referência estável. O h3 escala
 * proporcionalmente ao h2 (~80%) — uma escolha tipográfica que se observa
 * em conjunto, não isoladamente.
 *
 * Aplica-se a:
 *   v5/[slug]/page.tsx · foundational/v5/page.tsx
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────
type SizeH2    = "18" | "20" | "22" | "24" | "26" | "28" | "30"
type Weight    = "400" | "500" | "600" | "700"
type Tracking  = "-0.025em" | "-0.02em" | "-0.015em" | "-0.01em" | "0em" | "0.01em"
type Treatment = "plain" | "rule-below" | "rule-above" | "kicker" | "side-rule"

interface Settings {
  size:      SizeH2
  weight:    Weight
  tracking:  Tracking
  treatment: Treatment
}

const DEFAULTS: Settings = {
  size:      "24",
  weight:    "600",
  tracking:  "-0.02em",
  treatment: "plain",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FONTS = [
  // Serif — escolha display tradicional
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Atual. Display, decorativa em escala média." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Distinto, humano — alternativa à Playfair." },
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Elegante, fino — pode parecer frágil em peso 400." },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Sóbrio, académico — pesa de forma controlada." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Robusto — boa presença em corpo médio." },
  // Sans — herdar família do corpo
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Neutro — heading discreto, integrado ao corpo." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico arredondado — quente em peso 700." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Atual no body-test. Coerência total se herdar." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Humanista — confortável mas pouco distintivo." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico — afirmativo em peso médio-alto." },
]
const ALL_FONT_IDS = FONTS.map((f) => f.id)

// ─── Realistic article excerpt ─────────────────────────────────────────────
// Corpo fixo — referência estável contra a qual o subtítulo é avaliado.
// Estrutura: parágrafo, H2, parágrafo, H3, parágrafo. Reproduz a relação
// hierárquica que ocorre dentro de um artigo real.

const INTRO = "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado."

const H2_TEXT = "O que a herança revela"

const MIDDLE = "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objecto uma presença que a fabricação industrial não consegue simular."

const H3_TEXT = "A arquitectura do tempo"

const OUTRO = "Cercar-se do que merece permanecer é, em parte, um acto de resistência. Resistência à cultura do descartável, à ilusão de que o novo é sempre melhor, à ansiedade de acumulação sem critério."

// Corpo fixo — Plus Jakarta Sans 15px, tomado como referência estável.
const BODY_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-jakarta)",
  fontSize:   "15px",
  fontWeight: "400",
  lineHeight: "1.75",
}

// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS = "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"

// ─── Heading renderers ─────────────────────────────────────────────────────
// Os tratamentos refletem padrões já presentes nos artigos: rule-below
// é o `border-b` do v5/[slug], kicker é o estilo eyebrow uppercase do
// foundational/v3. Servem para testar se a hierarquia precisa de
// decoração ou se a tipografia sustenta sozinha.

function HeadingH2({
  text, font, settings,
}: {
  text: string
  font: typeof FONTS[0]
  settings: Settings
}) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))
  const headingStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${settings.size}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    lineHeight:    "1.2",
  }

  if (settings.treatment === "kicker") {
    return (
      <div className="mt-12 mb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold mb-2">Secção</p>
        <h2 className="text-brand-navy" style={headingStyle}>{text}</h2>
      </div>
    )
  }

  if (settings.treatment === "rule-above") {
    return (
      <div className="mt-12 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-brand-gold" />
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-brand-gold">Secção</span>
        </div>
        <h2 className="text-brand-navy" style={headingStyle}>{text}</h2>
      </div>
    )
  }

  if (settings.treatment === "rule-below") {
    return (
      <h2
        className="mt-12 mb-5 text-brand-navy border-b border-slate-100 pb-3"
        style={headingStyle}
      >
        {text}
      </h2>
    )
  }

  if (settings.treatment === "side-rule") {
    return (
      <h2
        className="mt-12 mb-6 text-brand-navy border-l-2 border-brand-gold pl-4"
        style={headingStyle}
      >
        {text}
      </h2>
    )
  }

  return (
    <h2 className="mt-12 mb-6 text-brand-navy" style={headingStyle}>
      {text}
    </h2>
  )
}

function HeadingH3({
  text, font, settings,
}: {
  text: string
  font: typeof FONTS[0]
  settings: Settings
}) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))
  const h2Px = parseInt(settings.size)
  // h3 escala em ~80% do h2 — preserva a relação hierárquica
  const h3Px = Math.max(15, Math.round(h2Px * 0.78))

  const headingStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${h3Px}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    lineHeight:    "1.25",
  }

  return (
    <h3 className="mt-10 mb-4 text-brand-navy" style={headingStyle}>
      {text}
    </h3>
  )
}

// ─── Article excerpt preview ───────────────────────────────────────────────
function HeadingPreview({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  return (
    <div className="my-8 border-y border-slate-100 py-12">
      <div className="mx-auto max-w-[680px] px-5 md:px-8">

        {/* Article kicker — fixo, contexto */}
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-6">
          Colecção · Ensaio
        </p>

        <p className="text-slate-700" style={BODY_STYLE}>{INTRO}</p>

        <HeadingH2 text={H2_TEXT} font={font} settings={settings} />

        <p className="text-slate-700" style={BODY_STYLE}>{MIDDLE}</p>

        <HeadingH3 text={H3_TEXT} font={font} settings={settings} />

        <p className="text-slate-700" style={BODY_STYLE}>{OUTRO}</p>

      </div>
    </div>
  )
}

// ─── Select ────────────────────────────────────────────────────────────────
function Select<T extends string>({
  label, value, onChange, options,
}: {
  label: string; value: T; onChange: (v: T) => void; options: { label: string; value: T }[]
}) {
  return (
    <div className="flex flex-col gap-1 shrink-0">
      <label className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-400">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className={SELECT_CLS}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// ─── Font add-select ───────────────────────────────────────────────────────
function FontAddSelect({
  label, options, onAdd,
}: {
  label: string; options: { label: string; value: string }[]; onAdd: (id: string) => void
}) {
  const [val, setVal] = useState("")
  return (
    <div className="flex flex-col gap-1 shrink-0">
      <label className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-400">{label}</label>
      <select
        value={val}
        onChange={(e) => { if (e.target.value) { onAdd(e.target.value); setVal("") } }}
        className={SELECT_CLS}
      >
        <option value="">Adicionar...</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// ─── Copy + remove ─────────────────────────────────────────────────────────
function FontActions({
  font, settings, onRemove,
}: {
  font: typeof FONTS[0]; settings: Settings; onRemove: () => void
}) {
  const [copied, setCopied] = useState(false)

  function copy() {
    const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))
    const h3Px = Math.max(15, Math.round(parseInt(settings.size) * 0.78))
    const payload = {
      component: "h2-h3",
      font: font.label,
      title: [
        font.label,
        `h2 ${settings.size}px / h3 ${h3Px}px`,
        `weight ${weight}`,
        `tracking ${settings.tracking}`,
        `tratamento ${settings.treatment}`,
      ].join(" · "),
      settings: {
        fontFamily:    `var(${font.var})`,
        h2FontSize:    `${settings.size}px`,
        h3FontSize:    `${h3Px}px`,
        fontWeight:    weight,
        letterSpacing: settings.tracking,
        treatment:     settings.treatment,
      },
      url: window.location.href,
    }
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copy}
        className={`text-[10px] font-medium px-3 py-1 rounded-full border transition-all ${
          copied
            ? "border-emerald-200 text-emerald-600 bg-emerald-50"
            : "border-slate-200 text-slate-400 hover:border-brand-navy/30 hover:text-brand-navy"
        }`}
      >
        {copied ? "Copiado ✓" : "Copiar opções"}
      </button>
      <button
        onClick={onRemove}
        className="text-[10px] font-medium px-3 py-1 rounded-full border border-slate-200 text-slate-300 hover:border-red-200 hover:text-red-400 transition-all"
      >
        Remover
      </button>
    </div>
  )
}

// ─── Inner page ────────────────────────────────────────────────────────────
function H2H3TestInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>(() => ({
    size:      (searchParams.get("size")      as SizeH2)    || DEFAULTS.size,
    weight:    (searchParams.get("weight")    as Weight)    || DEFAULTS.weight,
    tracking:  (searchParams.get("tracking")  as Tracking)  || DEFAULTS.tracking,
    treatment: (searchParams.get("treatment") as Treatment) || DEFAULTS.treatment,
  }))

  const [activeFonts, setActiveFonts] = useState<Set<string> | null>(() => {
    const param = searchParams.get("fonts")
    if (!param) return null
    const ids = param.split(",").filter((id) => ALL_FONT_IDS.includes(id))
    return ids.length === 0 ? null : new Set(ids)
  })

  const resolved = activeFonts ?? new Set(ALL_FONT_IDS)

  useEffect(() => {
    const params = new URLSearchParams({
      size: settings.size, weight: settings.weight,
      tracking: settings.tracking, treatment: settings.treatment,
    })
    if (activeFonts !== null) params.set("fonts", [...activeFonts].join(","))
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [settings, activeFonts, router])

  function set<K extends keyof Settings>(key: K, val: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: val }))
  }

  function addFont(id: string) {
    setActiveFonts((prev) => new Set([...(prev ?? new Set(ALL_FONT_IDS)), id]))
  }

  function removeFont(id: string) {
    setActiveFonts((prev) => {
      const next = new Set([...(prev ?? new Set(ALL_FONT_IDS))].filter((x) => x !== id))
      return next.size === 0 ? null : next
    })
  }

  const serifs       = FONTS.filter((f) => f.serif)
  const sansSerif    = FONTS.filter((f) => !f.serif)
  const activeAll    = FONTS.filter((f) => resolved.has(f.id))
  const activeSerifs = serifs.filter((f) => resolved.has(f.id))
  const activeSans   = sansSerif.filter((f) => resolved.has(f.id))

  const inactiveSerifs = serifs.filter((f) => !resolved.has(f.id))
  const inactiveSans   = sansSerif.filter((f) => !resolved.has(f.id))

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky header ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pt-2.5 pb-1 flex items-center gap-2">
          <Link href="/" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">início</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <Link href="/type-test" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">type-test</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] text-brand-gold/70">h2-h3</span>
        </div>

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select label="Tamanho h2" value={settings.size} onChange={(v) => set("size", v)}
              options={[
                { label: "18px", value: "18" },
                { label: "20px", value: "20" },
                { label: "22px", value: "22" },
                { label: "24px", value: "24" },
                { label: "26px", value: "26" },
                { label: "28px", value: "28" },
                { label: "30px", value: "30" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Peso" value={settings.weight} onChange={(v) => set("weight", v)}
              options={[
                { label: "400 — Regular",  value: "400" },
                { label: "500 — Medium",   value: "500" },
                { label: "600 — Semibold", value: "600" },
                { label: "700 — Bold",     value: "700" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tracking" value={settings.tracking} onChange={(v) => set("tracking", v)}
              options={[
                { label: "-0.025em", value: "-0.025em" },
                { label: "-0.02em",  value: "-0.02em" },
                { label: "-0.015em", value: "-0.015em" },
                { label: "-0.01em",  value: "-0.01em" },
                { label: "0em",      value: "0em" },
                { label: "+0.01em",  value: "0.01em" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tratamento" value={settings.treatment} onChange={(v) => set("treatment", v)}
              options={[
                { label: "Plain",        value: "plain" },
                { label: "Linha abaixo", value: "rule-below" },
                { label: "Linha acima",  value: "rule-above" },
                { label: "Kicker",       value: "kicker" },
                { label: "Lateral",      value: "side-rule" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <FontAddSelect
              label="Serifadas"
              options={inactiveSerifs.map((f) => ({ label: f.label, value: f.id }))}
              onAdd={addFont}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <FontAddSelect
              label="Sem serifa"
              options={inactiveSans.map((f) => ({ label: f.label, value: f.id }))}
              onAdd={addFont}
            />

          </div>
        </div>
      </div>

      {/* ── Page header + jump index ─────────────────────── */}
      <header className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          Teste tipográfico · Subtítulos h2 / h3
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Herdar a fonte do corpo, ou manter display?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          O corpo de texto é fixo — Plus Jakarta Sans 15px — para que cada
          subtítulo sob teste se compare contra a mesma referência estável. O
          h3 escala automaticamente a ~78% do h2 para preservar a relação
          hierárquica. Tratamento adiciona ou remove decoração (linha, kicker,
          lateral) para avaliar se a tipografia sustenta sozinha.
        </p>

        <nav className="flex flex-col gap-2">
          {activeAll.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="group flex items-center gap-3 text-[13px] text-slate-400 hover:text-brand-navy transition-colors"
            >
              <span className="text-brand-gold/40 group-hover:text-brand-gold transition-colors text-[10px]">↓</span>
              <span>{f.label}</span>
              <span className="text-[9px] text-slate-200 uppercase tracking-[0.12em]">
                {f.serif ? "serif" : "sans"}
              </span>
            </a>
          ))}
        </nav>
      </header>

      {/* ── Serif section ────────────────────────────────── */}
      {activeSerifs.length > 0 && (
        <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-14">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Serifadas</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSerifs.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <HeadingPreview font={font} settings={settings} />

          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSerifs.length - 1 && (
            <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
          )}
        </div>
      ))}

      {/* ── Sans-serif section ───────────────────────────── */}
      {activeSans.length > 0 && (
        <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-20">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Sem serifa</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSans.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <HeadingPreview font={font} settings={settings} />

          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSans.length - 1 && (
            <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
          )}
        </div>
      ))}

      {/* ── Verdict ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <div className="border-t border-slate-100 mt-16 pt-10 pb-20">
          <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">Veredito de trabalho</p>
          <p className="font-serif text-[20px] md:text-[24px] text-brand-navy tracking-[-0.015em] leading-[1.3] mb-4">
            Após decidir, aplicar a:
          </p>
          <p className="text-[13px] text-slate-400 leading-7">
            {["v5/[slug]/page.tsx", "foundational/v5/page.tsx"].map((f, i, arr) => (
              <span key={f}>
                <code className="text-[11px] bg-slate-50 px-1.5 py-0.5 rounded">{f}</code>
                {i < arr.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

    </div>
  )
}

export default function H2H3TestPage() {
  return (
    <Suspense>
      <H2H3TestInner />
    </Suspense>
  )
}
