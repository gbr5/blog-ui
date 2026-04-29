"use client"

/**
 * Type Test — Botões e CTAs
 *
 * Decisões em jogo:
 *   - forma: pill (atual em todo o site) vs arredondado vs recto
 *   - tamanho/densidade: sm/md/lg — padding e altura
 *   - tipografia do label: família, peso, tracking, caixa
 *   - hierarquia visível: primário (filled) vs secundário (outlined) vs ghost (text)
 *
 * Cada fonte mostra três botões lado-a-lado para que a hierarquia se leia
 * como um sistema, não como amostras isoladas. O contexto inclui um fundo
 * cream (CTA de página) e um fundo navy (CTA sobre hero) — botões mudam de
 * registo entre os dois.
 *
 * Aplica-se a:
 *   instagram/v6/page.tsx · components/v5-footer.tsx (e generaliza)
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────
type Shape    = "pill" | "rounded" | "soft" | "square"
type Size     = "sm" | "md" | "lg"
type Weight   = "400" | "500" | "600" | "700"
type Tracking = "-0.01em" | "0em" | "0.02em" | "0.05em" | "0.1em" | "0.15em" | "0.2em"
type Case     = "normal" | "upper"
type Icon     = "none" | "arrow"

interface Settings {
  shape:    Shape
  size:     Size
  weight:   Weight
  tracking: Tracking
  case:     Case
  icon:     Icon
}

const DEFAULTS: Settings = {
  shape:    "pill",
  size:     "md",
  weight:   "500",
  tracking: "0em",
  case:     "normal",
  icon:     "arrow",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FONTS = [
  // Sans — uso típico em UI / botões
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Neutro — referência de UI." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico arredondado — quente." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Editorial sem ser frio — bom equilíbrio." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Humanista — pouco distintivo em CTA." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico afirmativo — natural em CTA." },
  // Serif — escolha menos comum, mais editorial
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Display — pode parecer pesado em botão." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Distinto — voz autoral mesmo em botão." },
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Elegante, fino — frágil em peso baixo." },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Sóbrio, clássico — institucional." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Robusto — voz boutique." },
]
const ALL_FONT_IDS = FONTS.map((f) => f.id)

// ─── Shape, size mappings ──────────────────────────────────────────────────
const SHAPE_CLS: Record<Shape, string> = {
  pill:    "rounded-full",
  rounded: "rounded-xl",
  soft:    "rounded-md",
  square:  "rounded-none",
}

const SIZE_CLS: Record<Size, { padding: string; fontPx: string }> = {
  sm: { padding: "px-5 py-2",     fontPx: "12" },
  md: { padding: "px-7 py-3",     fontPx: "13" },
  lg: { padding: "px-8 py-3.5",   fontPx: "14" },
}

// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS = "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"

// ─── Button preview ────────────────────────────────────────────────────────
type Hierarchy = "primary" | "secondary" | "ghost"
type Bg = "light" | "dark"

function ButtonSample({
  label, hierarchy, bg, font, settings,
}: {
  label: string
  hierarchy: Hierarchy
  bg: Bg
  font: typeof FONTS[0]
  settings: Settings
}) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))
  const sizeMap = SIZE_CLS[settings.size]

  const labelStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${sizeMap.fontPx}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    textTransform: settings.case === "upper" ? "uppercase" : "none",
  }

  let classes = `inline-flex items-center gap-2 transition-colors ${sizeMap.padding} ${SHAPE_CLS[settings.shape]}`

  if (bg === "light") {
    if (hierarchy === "primary") {
      classes += " bg-brand-navy text-white hover:bg-brand-navy/90 shadow-[0_4px_16px_rgba(15,23,42,0.18)]"
    } else if (hierarchy === "secondary") {
      classes += " border border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy"
    } else {
      classes += " text-brand-navy hover:text-brand-navy/70"
    }
  } else {
    if (hierarchy === "primary") {
      classes += " bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
    } else if (hierarchy === "secondary") {
      classes += " border border-white/25 text-white hover:bg-white/10 backdrop-blur-sm"
    } else {
      classes += " text-white/70 hover:text-white"
    }
  }

  return (
    <button className={classes} style={labelStyle}>
      <span>{label}</span>
      {settings.icon === "arrow" && <span aria-hidden>→</span>}
    </button>
  )
}

function ButtonRow({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  return (
    <div className="my-8">
      {/* Light context */}
      <div className="bg-cream border border-brand-gold/15 px-6 py-10 md:py-12 rounded-2xl">
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 mb-5">
          Sobre fundo claro
        </p>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <ButtonSample label="Falar com a curadoria" hierarchy="primary"   bg="light" font={font} settings={settings} />
          <ButtonSample label="Ver coleção"           hierarchy="secondary" bg="light" font={font} settings={settings} />
          <ButtonSample label="Saber mais"            hierarchy="ghost"     bg="light" font={font} settings={settings} />
        </div>
      </div>

      {/* Dark context — espelha o uso sobre hero/foundational */}
      <div className="mt-4 bg-brand-navy px-6 py-10 md:py-12 rounded-2xl">
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40 mb-5">
          Sobre fundo escuro
        </p>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <ButtonSample label="Explorar coleção"   hierarchy="primary"   bg="dark" font={font} settings={settings} />
          <ButtonSample label="Editorial"          hierarchy="secondary" bg="dark" font={font} settings={settings} />
          <ButtonSample label="Ver tudo"           hierarchy="ghost"     bg="dark" font={font} settings={settings} />
        </div>
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
    const sizeMap = SIZE_CLS[settings.size]
    const payload = {
      component: "botoes",
      font: font.label,
      title: [
        font.label,
        `forma ${settings.shape}`,
        `tam ${settings.size} (${sizeMap.fontPx}px)`,
        `weight ${weight}`,
        `tracking ${settings.tracking}`,
        settings.case === "upper" ? "UPPERCASE" : "Mixed",
        `icon ${settings.icon}`,
      ].join(" · "),
      settings: {
        fontFamily:    `var(${font.var})`,
        shape:         settings.shape,
        size:          settings.size,
        padding:       sizeMap.padding,
        fontSize:      `${sizeMap.fontPx}px`,
        fontWeight:    weight,
        letterSpacing: settings.tracking,
        textTransform: settings.case === "upper" ? "uppercase" : "none",
        icon:          settings.icon,
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
function ButtonTestInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>(() => ({
    shape:    (searchParams.get("shape")    as Shape)    || DEFAULTS.shape,
    size:     (searchParams.get("size")     as Size)     || DEFAULTS.size,
    weight:   (searchParams.get("weight")   as Weight)   || DEFAULTS.weight,
    tracking: (searchParams.get("tracking") as Tracking) || DEFAULTS.tracking,
    case:     (searchParams.get("case")     as Case)     || DEFAULTS.case,
    icon:     (searchParams.get("icon")     as Icon)     || DEFAULTS.icon,
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
      shape: settings.shape, size: settings.size, weight: settings.weight,
      tracking: settings.tracking, case: settings.case, icon: settings.icon,
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

  const sansSerif    = FONTS.filter((f) => !f.serif)
  const serifs       = FONTS.filter((f) => f.serif)
  const activeAll    = FONTS.filter((f) => resolved.has(f.id))
  const activeSans   = sansSerif.filter((f) => resolved.has(f.id))
  const activeSerifs = serifs.filter((f) => resolved.has(f.id))

  const inactiveSans   = sansSerif.filter((f) => !resolved.has(f.id))
  const inactiveSerifs = serifs.filter((f) => !resolved.has(f.id))

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky controls ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pt-2.5 pb-1 flex items-center gap-2">
          <Link href="/" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">início</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <Link href="/type-test" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">type-test</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] text-brand-gold/70">botoes</span>
        </div>

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select label="Forma" value={settings.shape} onChange={(v) => set("shape", v)}
              options={[
                { label: "Pill (atual)",   value: "pill" },
                { label: "Arredondado",    value: "rounded" },
                { label: "Suave",          value: "soft" },
                { label: "Recto",          value: "square" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tamanho" value={settings.size} onChange={(v) => set("size", v)}
              options={[
                { label: "SM (12px / 5·2)",    value: "sm" },
                { label: "MD (13px / 7·3)",    value: "md" },
                { label: "LG (14px / 8·3.5)",  value: "lg" },
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
                { label: "-0.01em", value: "-0.01em" },
                { label: "0em",     value: "0em" },
                { label: "+0.02em", value: "0.02em" },
                { label: "+0.05em", value: "0.05em" },
                { label: "+0.10em", value: "0.1em" },
                { label: "+0.15em", value: "0.15em" },
                { label: "+0.20em", value: "0.2em" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Caixa" value={settings.case} onChange={(v) => set("case", v)}
              options={[
                { label: "Mista",     value: "normal" },
                { label: "MAIÚSCULA", value: "upper" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Ícone" value={settings.icon} onChange={(v) => set("icon", v)}
              options={[
                { label: "Sem ícone", value: "none" },
                { label: "Seta →",    value: "arrow" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <FontAddSelect
              label="Sem serifa"
              options={inactiveSans.map((f) => ({ label: f.label, value: f.id }))}
              onAdd={addFont}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <FontAddSelect
              label="Serifadas"
              options={inactiveSerifs.map((f) => ({ label: f.label, value: f.id }))}
              onAdd={addFont}
            />

          </div>
        </div>
      </div>

      {/* ── Page header + jump index ─────────────────────── */}
      <header className="mx-auto max-w-[800px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          Teste tipográfico · Botões e CTAs
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Que voz têm os botões?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          Cada fonte mostra três hierarquias — primário, secundário, ghost —
          em fundo claro (CTA de página) e em fundo escuro (CTA sobre hero).
          Forma e tamanho aplicam-se em conjunto; o resto da tipografia muda
          o registo entre comercial e editorial.
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

      {/* ── Sans-serif section ───────────────────────────── */}
      {activeSans.length > 0 && (
        <div className="mx-auto max-w-[900px] px-5 md:px-8 mt-14">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Sem serifa</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSans.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[900px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <div className="mx-auto max-w-[900px] px-5 md:px-8">
            <ButtonRow font={font} settings={settings} />
          </div>

          <div className="mx-auto max-w-[900px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSans.length - 1 && (
            <div className="mx-auto max-w-[900px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
          )}
        </div>
      ))}

      {/* ── Serif section ────────────────────────────────── */}
      {activeSerifs.length > 0 && (
        <div className="mx-auto max-w-[900px] px-5 md:px-8 mt-20">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Serifadas</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSerifs.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[900px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <div className="mx-auto max-w-[900px] px-5 md:px-8">
            <ButtonRow font={font} settings={settings} />
          </div>

          <div className="mx-auto max-w-[900px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSerifs.length - 1 && (
            <div className="mx-auto max-w-[900px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
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
            {["instagram/v6/page.tsx", "components/v5-footer.tsx", "(generaliza para toda a UI)"].map((f, i, arr) => (
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

export default function ButtonTestPage() {
  return (
    <Suspense>
      <ButtonTestInner />
    </Suspense>
  )
}
