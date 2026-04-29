"use client"

/**
 * Typography Test — Pullquote Block
 *
 * One pullquote per font family. All parameters controlled via sticky header.
 * Compare fonts at the same settings — not scattered across 37 static variants.
 *
 * Fonts tested:
 *   Cormorant Garamond · Playfair Display · EB Garamond · Fraunces · Libre Baskerville
 *
 * Applies to:
 *   v5/[slug]/page.tsx · foundational/v5/page.tsx
 *   instagram/v5/page.tsx · instagram/v6/page.tsx
 */

import { useState } from "react"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────
type Weight    = "600" | "700" | "800"
type Size      = "large" | "contained"
type Caps      = false | true
type Tracking  = "tight" | "normal" | "open"
type LineH     = "0.82" | "0.88" | "0.92" | "0.95" | "1.0" | "1.1" | "1.2" | "1.35"

interface Settings {
  weight:    Weight
  size:      Size
  caps:      Caps
  tracking:  Tracking
  lineH:     LineH
}

// ─── Font definitions ──────────────────────────────────────────────────────
const FONTS = [
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    var: "--font-cormorant",
    maxWeight: 700,
    note: "Clássico, literário, museológico.",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    var: "--font-playfair",
    maxWeight: 800,
    note: "Actual. Dramático — tende para fashion.",
    tag: "atual",
  },
  {
    id: "eb-garamond",
    label: "EB Garamond",
    var: "--font-eb-garamond",
    maxWeight: 800,
    note: "Académico, sóbrio, menos ornamento.",
  },
  {
    id: "fraunces",
    label: "Fraunces",
    var: "--font-fraunces",
    maxWeight: 800,
    note: "Distinto, contemporâneo, mais humano.",
  },
  {
    id: "libre-baskerville",
    label: "Libre Baskerville",
    var: "--font-libre-baskerville",
    maxWeight: 700,
    note: "Sólido, confiável — newspaper quality.",
  },
]

// ─── Parameter maps ────────────────────────────────────────────────────────
const TRACKING_MAP: Record<"sentence" | "caps", Record<Tracking, string>> = {
  sentence: { tight: "-0.04em",  normal: "-0.025em", open: "-0.01em" },
  caps:     { tight:  "0.04em",  normal:  "0.06em",  open:  "0.1em"  },
}
const LINE_H_VALUES: LineH[] = ["0.82", "0.88", "0.92", "0.95", "1.0", "1.1", "1.2", "1.35"]

const QUOTE = "A beleza que dura não é perfeição — é autenticidade."

const BODY_A = "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado."
const BODY_B = "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular."

// ─── Pullquote ─────────────────────────────────────────────────────────────
function Pullquote({
  fontVar,
  maxWeight,
  settings,
}: {
  fontVar: string
  maxWeight: number
  settings: Settings
}) {
  const weight      = String(Math.min(parseInt(settings.weight), maxWeight))
  const trackingKey = settings.caps ? "caps" : "sentence"
  const tracking    = TRACKING_MAP[trackingKey][settings.tracking]
  const lineHeight  = settings.lineH
  const displayText = settings.caps ? QUOTE.toUpperCase() : QUOTE

  const sizeClasses = settings.size === "contained"
    ? "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px]"
    : "text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px]"

  const padding = settings.size === "contained" ? "4rem 1.5rem" : "3.5rem 1.5rem"

  return (
    <figure
      className="my-10"
      style={{
        marginLeft:  "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div style={{ background: "oklch(0.30 0.06 250)", transform: "skewY(-2deg)", padding }}>
        <blockquote style={{ transform: "skewY(2deg)" }}>
          <p
            className={`${sizeClasses} text-white text-center max-w-5xl mx-auto px-2 sm:px-8 md:px-16`}
            style={{
              fontFamily:    `var(${fontVar})`,
              fontWeight:    weight,
              letterSpacing: tracking,
              lineHeight,
              textTransform: settings.caps ? "uppercase" : "none",
            }}
          >
            {displayText}
          </p>
        </blockquote>
      </div>
    </figure>
  )
}

// ─── Control pill ──────────────────────────────────────────────────────────
function ControlGroup<T extends string | boolean>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { label: string; value: T }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-col gap-1 shrink-0">
      <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-400">{label}</span>
      <div className="flex gap-0.5">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            className={`text-[10px] font-medium px-2.5 py-1 rounded-full transition-colors ${
              value === opt.value
                ? "bg-brand-navy text-white"
                : "text-slate-400 hover:text-brand-navy hover:bg-slate-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function TypeTestPullquotePage() {
  const [settings, setSettings] = useState<Settings>({
    weight:   "700",
    size:     "large",
    caps:     false,
    tracking: "normal",
    lineH:    "0.95",
  })

  function set<K extends keyof Settings>(key: K, val: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: val }))
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky header ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">

        {/* Breadcrumb row */}
        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pt-3 pb-1 flex items-center gap-3">
          <Link href="/" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">início</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <Link href="/type-test" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">type-test</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] text-brand-gold/70">pullquote</span>
        </div>

        {/* Controls row */}
        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-5 md:gap-7 min-w-max">

            <ControlGroup
              label="Peso"
              value={settings.weight}
              onChange={(v) => set("weight", v)}
              options={[
                { label: "600", value: "600" as Weight },
                { label: "700", value: "700" as Weight },
                { label: "800", value: "800" as Weight },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <ControlGroup
              label="Tamanho"
              value={settings.size}
              onChange={(v) => set("size", v)}
              options={[
                { label: "Grande", value: "large" as Size },
                { label: "Contido", value: "contained" as Size },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <ControlGroup
              label="Caixa"
              value={settings.caps}
              onChange={(v) => set("caps", v)}
              options={[
                { label: "Normal", value: false as Caps },
                { label: "Versalete", value: true as Caps },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <ControlGroup
              label="Tracking"
              value={settings.tracking}
              onChange={(v) => set("tracking", v)}
              options={[
                { label: "Fechado", value: "tight" as Tracking },
                { label: "Normal",  value: "normal" as Tracking },
                { label: "Aberto",  value: "open" as Tracking },
              ]}
            />

            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <ControlGroup
              label="Linha"
              value={settings.lineH}
              onChange={(v) => set("lineH", v)}
              options={LINE_H_VALUES.map((v) => ({ label: v, value: v }))}
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
          Uma variante por família tipográfica. Use o menu fixo para mudar
          peso, tamanho, caixa, tracking e entrelinha — todas as fontes
          respondem ao mesmo tempo.
        </p>
      </header>

      {/* ── Font variants ────────────────────────────────── */}
      {FONTS.map((font, i) => (
        <div key={font.id}>
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-14 mb-1">
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">
                {font.label}
              </p>
              {font.tag && (
                <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-slate-300 border border-slate-200 rounded-full px-2 py-0.5">
                  {font.tag}
                </span>
              )}
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
            <p className="text-[15px] leading-7 text-slate-500">
              {i % 2 === 0 ? BODY_A : BODY_B}
            </p>
          </div>

          <Pullquote
            fontVar={font.var}
            maxWeight={font.maxWeight}
            settings={settings}
          />

          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            <p className="text-[15px] leading-7 text-slate-500">
              {i % 2 === 0 ? BODY_B : BODY_A}
            </p>
          </div>

          {i < FONTS.length - 1 && (
            <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-8">
              <div className="h-px bg-slate-100" />
            </div>
          )}
        </div>
      ))}

      {/* ── Verdict ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <div className="border-t border-slate-100 mt-16 pt-10 pb-20">
          <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
            Veredito de trabalho
          </p>
          <p className="font-serif text-[20px] md:text-[24px] text-brand-navy tracking-[-0.015em] leading-[1.3] mb-4">
            Após decidir, aplicar a:
          </p>
          <p className="text-[13px] text-slate-400 leading-7">
            {[
              "v5/[slug]/page.tsx",
              "foundational/v5/page.tsx",
              "instagram/v5/page.tsx",
              "instagram/v6/page.tsx",
            ].map((f, i, arr) => (
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
