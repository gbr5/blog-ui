"use client"

/**
 * Typography Test — Pullquote Block
 * All controls are <select> inputs. All fields have ≥ 5 options.
 * Line-height: 0.85 → 3.00 in 0.15 steps.
 * Fonts: 5 serif + 5 sans-serif.
 */

import { useState } from "react"
import Link from "next/link"

// ─── Line-height values: 0.85 → 3.00, step 0.15 ───────────────────────────
function buildLineHeights(): string[] {
  const out: string[] = []
  let v = 0.85
  while (v <= 3.001) {
    out.push(v % 1 === 0 ? v.toFixed(2) : parseFloat(v.toFixed(2)).toString())
    v = Math.round((v + 0.15) * 1000) / 1000
  }
  if (!out.includes("3")) out.push("3")
  return out
}
const LINE_H_OPTIONS = buildLineHeights()

// ─── Types ─────────────────────────────────────────────────────────────────
type Weight  = "400" | "500" | "600" | "700" | "800" | "900"
type Size    = "xs"  | "sm"  | "md"  | "lg"  | "xl"
type Case    = "none" | "uppercase" | "capitalize" | "lowercase" | "small-caps"
type Tracking = string   // em value
type LineH   = string    // numeric value

interface Settings {
  weight:   Weight
  size:     Size
  textCase: Case
  tracking: Tracking
  lineH:    LineH
}

// ─── Size → Tailwind classes ───────────────────────────────────────────────
const SIZE_CLASSES: Record<Size, string> = {
  xs: "text-[18px] sm:text-[22px] md:text-[28px] lg:text-[34px]",
  sm: "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px]",
  md: "text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px]",
  lg: "text-[30px] sm:text-[40px] md:text-[52px] lg:text-[62px]",
  xl: "text-[34px] sm:text-[48px] md:text-[60px] lg:text-[72px]",
}

const SIZE_PADDING: Record<Size, string> = {
  xs: "2.5rem 1.5rem",
  sm: "3rem 1.5rem",
  md: "3.5rem 1.5rem",
  lg: "4.5rem 1.5rem",
  xl: "5.5rem 1.5rem",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FONTS = [
  // Serif
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Clássico, literário, museológico." },
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Actual. Dramático — tende para fashion.", tag: "atual" },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Académico, sóbrio, menos ornamento." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Distinto, contemporâneo, mais humano." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Sólido, confiável — newspaper quality." },
  // Sans-serif
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Neutro, técnico, muito legível." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico, moderno, limpo." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Contemporâneo, elegante, versátil." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico, display, preciso." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Moderno, humanista, equilibrado." },
]

const QUOTE = "A beleza que dura não é perfeição — é autenticidade."

const BODY_A = "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado."
const BODY_B = "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular."

// ─── Pullquote ─────────────────────────────────────────────────────────────
function Pullquote({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))
  const displayText =
    settings.textCase === "uppercase" ? QUOTE.toUpperCase()
    : settings.textCase === "lowercase" ? QUOTE.toLowerCase()
    : settings.textCase === "capitalize" ? QUOTE.replace(/\b\w/g, (c) => c.toUpperCase())
    : QUOTE

  const caseStyle: React.CSSProperties =
    settings.textCase === "small-caps"
      ? { fontVariant: "small-caps" }
      : { textTransform: settings.textCase === "none" ? "none" : settings.textCase as React.CSSProperties["textTransform"] }

  return (
    <figure
      className="my-10"
      style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw", overflow: "hidden" }}
    >
      <div style={{ background: "oklch(0.30 0.06 250)", transform: "skewY(-2deg)", padding: SIZE_PADDING[settings.size] }}>
        <blockquote style={{ transform: "skewY(2deg)" }}>
          <p
            className={`${SIZE_CLASSES[settings.size]} text-white text-center max-w-5xl mx-auto px-2 sm:px-8 md:px-16`}
            style={{
              fontFamily:    `var(${font.var})`,
              fontWeight:    weight,
              letterSpacing: settings.tracking,
              lineHeight:    settings.lineH,
              ...caseStyle,
            }}
          >
            {displayText}
          </p>
        </blockquote>
      </div>
    </figure>
  )
}

// ─── Select control ────────────────────────────────────────────────────────
function Select<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: { label: string; value: T }[]
}) {
  return (
    <div className="flex flex-col gap-1 shrink-0">
      <label className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function TypeTestPullquotePage() {
  const [settings, setSettings] = useState<Settings>({
    weight:   "700",
    size:     "md",
    textCase: "none",
    tracking: "-0.025em",
    lineH:    "0.95",
  })

  function set<K extends keyof Settings>(key: K, val: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: val }))
  }

  const serifs    = FONTS.filter((f) => f.serif)
  const sansSerif = FONTS.filter((f) => !f.serif)

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky header ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pt-2.5 pb-1 flex items-center gap-2">
          <Link href="/" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">início</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <Link href="/type-test" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">type-test</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] text-brand-gold/70">pullquote</span>
        </div>

        {/* Controls */}
        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select
              label="Peso"
              value={settings.weight}
              onChange={(v) => set("weight", v)}
              options={[
                { label: "400 — Regular",    value: "400" },
                { label: "500 — Medium",     value: "500" },
                { label: "600 — Semibold",   value: "600" },
                { label: "700 — Bold",       value: "700" },
                { label: "800 — Extrabold",  value: "800" },
                { label: "900 — Black",      value: "900" },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select
              label="Tamanho"
              value={settings.size}
              onChange={(v) => set("size", v)}
              options={[
                { label: "XS — 18→34px", value: "xs" },
                { label: "SM — 22→44px", value: "sm" },
                { label: "MD — 26→52px", value: "md" },
                { label: "LG — 30→62px", value: "lg" },
                { label: "XL — 34→72px", value: "xl" },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select
              label="Caixa"
              value={settings.textCase}
              onChange={(v) => set("textCase", v)}
              options={[
                { label: "Normal",      value: "none" },
                { label: "ALL CAPS",    value: "uppercase" },
                { label: "Capitalize",  value: "capitalize" },
                { label: "Small Caps",  value: "small-caps" },
                { label: "lowercase",   value: "lowercase" },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select
              label="Tracking"
              value={settings.tracking}
              onChange={(v) => set("tracking", v)}
              options={[
                { label: "-0.05em",  value: "-0.05em" },
                { label: "-0.04em",  value: "-0.04em" },
                { label: "-0.03em",  value: "-0.03em" },
                { label: "-0.02em",  value: "-0.02em" },
                { label: "-0.01em",  value: "-0.01em" },
                { label: "0em",      value: "0em" },
                { label: "+0.02em",  value: "0.02em" },
                { label: "+0.04em",  value: "0.04em" },
                { label: "+0.06em",  value: "0.06em" },
                { label: "+0.08em",  value: "0.08em" },
                { label: "+0.10em",  value: "0.10em" },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select
              label="Entrelinha"
              value={settings.lineH}
              onChange={(v) => set("lineH", v)}
              options={LINE_H_OPTIONS.map((v) => ({ label: v, value: v }))}
            />

          </div>
        </div>
      </div>

      {/* ── Page header ─────────────────────────────────── */}
      <header className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          Teste tipográfico · Componente pullquote
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Qual fonte serve melhor o bloco de citação?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400">
          10 famílias — 5 serifadas, 5 sem serifa. Use o menu fixo para mudar
          todos os parâmetros em simultâneo.
        </p>
      </header>

      {/* ── Serif section ────────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-14">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Serifadas</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>
      </div>

      {serifs.map((font, i) => (
        <div key={font.id}>
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-12 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap mb-3">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              {font.tag && (
                <span className="text-[8px] uppercase tracking-[0.14em] text-slate-300 border border-slate-200 rounded-full px-2 py-0.5">{font.tag}</span>
              )}
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
            <p className="text-[15px] leading-7 text-slate-500">{i % 2 === 0 ? BODY_A : BODY_B}</p>
          </div>
          <Pullquote font={font} settings={settings} />
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            <p className="text-[15px] leading-7 text-slate-500">{i % 2 === 0 ? BODY_B : BODY_A}</p>
          </div>
          {i < serifs.length - 1 && (
            <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-8">
              <div className="h-px bg-slate-100" />
            </div>
          )}
        </div>
      ))}

      {/* ── Sans-serif section ───────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-20">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Sem serifa</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>
      </div>

      {sansSerif.map((font, i) => (
        <div key={font.id}>
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-12 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap mb-3">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
            <p className="text-[15px] leading-7 text-slate-500">{i % 2 === 0 ? BODY_A : BODY_B}</p>
          </div>
          <Pullquote font={font} settings={settings} />
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            <p className="text-[15px] leading-7 text-slate-500">{i % 2 === 0 ? BODY_B : BODY_A}</p>
          </div>
          {i < sansSerif.length - 1 && (
            <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-8">
              <div className="h-px bg-slate-100" />
            </div>
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
            {["v5/[slug]/page.tsx", "foundational/v5/page.tsx", "instagram/v5/page.tsx", "instagram/v6/page.tsx"].map((f, i, arr) => (
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
