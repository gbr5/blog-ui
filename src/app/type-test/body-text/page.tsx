"use client"

/**
 * Type Test — Texto de corpo
 *
 * Testa a tipografia do corpo de texto dos artigos.
 * Parâmetros relevantes para leitura: fonte, tamanho, entrelinha, peso, tracking.
 * O preview é um excerto de artigo completo — heading + 4 parágrafos —
 * para avaliar conforto de leitura real, não uma ou duas frases isoladas.
 *
 * Aplica-se a:
 *   v5/[slug]/page.tsx · foundational/v5/page.tsx
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

// ─── Line-height: 1.4 → 2.2, step 0.05 ───────────────────────────────────
function buildLineHeights(): string[] {
  const out: string[] = []
  let v = 1.4
  while (v <= 2.201) {
    out.push(parseFloat(v.toFixed(2)).toString())
    v = Math.round((v + 0.05) * 100) / 100
  }
  return out
}
const LINE_H_OPTIONS = buildLineHeights()

// ─── Types ─────────────────────────────────────────────────────────────────
type Size    = "14" | "15" | "16" | "17" | "18"
type Weight  = "400" | "500"
type Tracking = "-0.02em" | "-0.01em" | "0em" | "0.01em" | "0.02em"

interface Settings {
  size:     Size
  weight:   Weight
  tracking: Tracking
  lineH:    string
}

const DEFAULTS: Settings = {
  size:     "15",
  weight:   "400",
  tracking: "0em",
  lineH:    "1.75",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FONTS = [
  // Serif — literary, editorial
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Elegante mas pode parecer fino em corpo pequeno." },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Académico, excelente para leitura longa." },
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Muito display — perde qualidade em corpo pequeno." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Distinto, humano, interessante em corpo." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Muito legível — desenhado para corpo de texto." },
  // Sans — contemporâneo, limpo
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Optimizado para ecrã — referência de legibilidade." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico, moderno, confortável em corpo." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Elegante, contemporâneo — bom para editorial." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Humanista, equilibrado, muito legível." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico limpo — pode parecer frio em corpo longo." },
]
const ALL_FONT_IDS = FONTS.map((f) => f.id)

// ─── Realistic body text ───────────────────────────────────────────────────
// Excerto editorial realista — comprido o suficiente para avaliar
// conforto de leitura, ritmo de linha e cansaço visual.

const HEADING = "O que a herança revela"

const PARAGRAPHS = [
  "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado. Um relógio de bolso que pertenceu ao avô não é apenas um relógio antigo — é um repositório de tempo vivido, de decisões tomadas, de momentos que ele testemunhou sem saber. É nesse acúmulo silencioso que reside o que chamamos de presença.",
  "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular. A beleza desses objetos não está na perfeição. Está na autenticidade. Está no facto de que foram feitos por alguém, usados por alguém, e que esse alguém deixou uma marca.",
  "Cercar-se do que merece permanecer é, em parte, um acto de resistência. Resistência à cultura do descartável, à ilusão de que o novo é sempre melhor, à ansiedade de acumulação sem critério. Os objectos que atravessam gerações fazem-no porque foram escolhidos com cuidado — porque alguém, em algum momento, reconheceu neles algo que valia a pena preservar.",
  "A curadoria começa nesse reconhecimento. Não é uma questão de preço ou de raridade — é uma questão de gosto cultivado ao longo do tempo, de atenção ao detalhe, de capacidade de ver além da moda do momento e identificar o que tem valor intrínseco. Essa capacidade não se compra. Desenvolve-se.",
]

const LABEL = "Colecção · Ensaio"

// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS = "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"

// ─── Body text preview ─────────────────────────────────────────────────────
function BodyTextPreview({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))

  const textStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${settings.size}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    lineHeight:    settings.lineH,
  }

  return (
    <div className="my-10 border-t border-b border-slate-100 py-10">
      <div className="mx-auto max-w-[700px] px-5 md:px-8">

        {/* Article label — fixed, not affected by settings */}
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-6">
          {LABEL}
        </p>

        {/* Section heading — uses same font, at a scaled-up size, to test family coherence */}
        <h2
          className="text-brand-navy mb-6"
          style={{
            fontFamily:    `var(${font.var})`,
            fontSize:      `${Math.round(parseInt(settings.size) * 1.6)}px`,
            fontWeight:    "600",
            letterSpacing: "-0.02em",
            lineHeight:    "1.2",
          }}
        >
          {HEADING}
        </h2>

        {/* Body paragraphs */}
        <div className="flex flex-col gap-[1em]">
          {PARAGRAPHS.map((p, i) => (
            <p key={i} className="text-slate-700" style={textStyle}>
              {p}
            </p>
          ))}
        </div>

        {/* Inline elements — to test font in context of links and emphasis */}
        <p className="mt-[1em] text-slate-400" style={{ ...textStyle, fontSize: `${Math.max(11, parseInt(settings.size) - 2)}px`, lineHeight: "1.5" }}>
          Este ensaio faz parte da{" "}
          <span className="text-brand-navy underline underline-offset-2 decoration-brand-gold/40 cursor-pointer">
            série editorial DominionArts
          </span>
          {" "}— publicada mensalmente para colecionadores e curadores.
        </p>

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
    const payload = {
      component: "body-text",
      font: font.label,
      title: [
        font.label,
        `${settings.size}px`,
        `weight ${weight}`,
        `tracking ${settings.tracking}`,
        `entrelinha ${settings.lineH}`,
      ].join(" · "),
      settings: {
        fontFamily:  `var(${font.var})`,
        fontSize:    `${settings.size}px`,
        fontWeight:  weight,
        tracking:    settings.tracking,
        lineHeight:  settings.lineH,
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
function BodyTextInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>(() => ({
    size:     (searchParams.get("size")     as Size)    || DEFAULTS.size,
    weight:   (searchParams.get("weight")   as Weight)  || DEFAULTS.weight,
    tracking: (searchParams.get("tracking") as Tracking)|| DEFAULTS.tracking,
    lineH:    searchParams.get("lineH")                 || DEFAULTS.lineH,
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
      tracking: settings.tracking, lineH: settings.lineH,
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

  const serifs      = FONTS.filter((f) => f.serif)
  const sansSerif   = FONTS.filter((f) => !f.serif)
  const activeAll   = FONTS.filter((f) => resolved.has(f.id))
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
          <span className="text-[10px] text-brand-gold/70">body-text</span>
        </div>

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select label="Tamanho" value={settings.size} onChange={(v) => set("size", v)}
              options={[
                { label: "14px", value: "14" },
                { label: "15px", value: "15" },
                { label: "16px", value: "16" },
                { label: "17px", value: "17" },
                { label: "18px", value: "18" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Peso" value={settings.weight} onChange={(v) => set("weight", v)}
              options={[
                { label: "400 — Regular", value: "400" },
                { label: "500 — Medium",  value: "500" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Entrelinha" value={settings.lineH} onChange={(v) => set("lineH", v)}
              options={LINE_H_OPTIONS.map((v) => ({ label: v, value: v }))}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tracking" value={settings.tracking} onChange={(v) => set("tracking", v)}
              options={[
                { label: "-0.02em", value: "-0.02em" },
                { label: "-0.01em", value: "-0.01em" },
                { label: "0em",     value: "0em" },
                { label: "+0.01em", value: "0.01em" },
                { label: "+0.02em", value: "0.02em" },
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
          Teste tipográfico · Texto de corpo
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Qual fonte serve melhor o corpo de texto?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          Cada variante mostra um excerto de artigo completo — label, título de
          secção e quatro parágrafos — para avaliar conforto de leitura real.
          O heading usa a mesma família, escalado, para testar coerência interna.
        </p>

        {/* Jump index */}
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

          <BodyTextPreview font={font} settings={settings} />

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

          <BodyTextPreview font={font} settings={settings} />

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

export default function BodyTextPage() {
  return (
    <Suspense>
      <BodyTextInner />
    </Suspense>
  )
}
