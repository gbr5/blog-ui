"use client"

/**
 * Type Test — Título hero (sobre imagem)
 *
 * Diferente do h1 do slug: aqui o display type vive sobre fotografia. As
 * variáveis críticas mudam — a tipografia tem de competir com o contraste
 * da imagem, e o tratamento (overlay + shadow) é tão decisivo quanto a
 * escolha da fonte.
 *
 * Cada fonte é mostrada em 3 imagens distintas (escura, clara, agitada)
 * ao mesmo tempo, em vez de uma só, porque o problema só aparece quando
 * a imagem muda — uma decisão que parece óptima sobre fundo escuro pode
 * desaparecer sobre fundo claro.
 *
 * Aplica-se a:
 *   v5/page.tsx · instagram/v6/page.tsx · foundational/v5/page.tsx · colecao/page.tsx
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

// ─── Types ─────────────────────────────────────────────────────────────────
type Size     = "36" | "44" | "52" | "60" | "72" | "84" | "96"
type Weight   = "400" | "500" | "600" | "700" | "800"
type Tracking = "-0.04em" | "-0.03em" | "-0.025em" | "-0.02em" | "-0.015em" | "-0.01em" | "0em"
type LineH    = "0.95" | "1.0" | "1.05" | "1.1" | "1.15"
type Color    = "white" | "gold" | "cream" | "navy"
type Overlay  = "gradient-bottom" | "gradient-full" | "scrim" | "vignette" | "none"
type Shadow   = "none" | "soft" | "strong" | "glow"
type Position = "bottom-left" | "centered" | "top-left" | "bottom-center"

interface Settings {
  size:     Size
  weight:   Weight
  tracking: Tracking
  lineH:    LineH
  color:    Color
  overlay:  Overlay
  shadow:   Shadow
  position: Position
}

const DEFAULTS: Settings = {
  size:     "60",
  weight:   "600",
  tracking: "-0.025em",
  lineH:    "1.05",
  color:    "white",
  overlay:  "gradient-bottom",
  shadow:   "soft",
  position: "bottom-left",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FONTS = [
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Display alto contraste — pode esfumar-se sobre imagem agitada." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Variável, robusto — boa presença sobre foto." },
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Letras finas — frágil sem overlay forte." },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Sóbrio — pesa de forma controlada." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Robusto — sólido em qualquer fundo." },
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Neutro, técnico — alta legibilidade." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico arredondado — afirmativo." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Editorial sem ser frio — bom equilíbrio." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Humanista — pouco distintivo em hero." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico afirmativo — moderno." },
]
const ALL_FONT_IDS = FONTS.map((f) => f.id)

// ─── Realistic title ───────────────────────────────────────────────────────
const HERO_TITLE = "O que a herança revela"
const HERO_KICKER = "DominionArts · Ensaio"

// ─── Image scenarios (intentionally varied) ────────────────────────────────
// "escura" = fotografia em tonalidade baixa — overlay é menos crítico
// "clara"  = fotografia em tonalidade alta — overlay tem de ser forte
// "agitada"= imagem com muita textura visual — testa shadow/blur de texto

const IMAGES: { id: string; label: string; src: string; tonality: "escura" | "clara" | "agitada" }[] = [
  { id: "escura",  label: "Fundo escuro",  src: "https://picsum.photos/seed/hero-dark-marble/1600/900",   tonality: "escura" },
  { id: "clara",   label: "Fundo claro",   src: "https://picsum.photos/seed/hero-light-fabric/1600/900",  tonality: "clara" },
  { id: "agitada", label: "Fundo agitado", src: "https://picsum.photos/seed/hero-busy-objects/1600/900", tonality: "agitada" },
]

// ─── Mapping helpers ───────────────────────────────────────────────────────
const COLOR_HEX: Record<Color, string> = {
  white: "#ffffff",
  gold:  "oklch(0.75 0.12 85)",
  cream: "oklch(0.97 0.01 85)",
  navy:  "oklch(0.30 0.06 250)",
}

const SHADOW_FILTER: Record<Shadow, string> = {
  none:   "none",
  soft:   "drop-shadow(0 2px 12px rgba(0,0,0,0.35))",
  strong: "drop-shadow(0 2px 4px rgba(0,0,0,0.6)) drop-shadow(0 4px 18px rgba(0,0,0,0.5))",
  glow:   "drop-shadow(0 0 24px rgba(0,0,0,0.7))",
}

const POSITION_CLS: Record<Position, string> = {
  "bottom-left":   "items-end justify-start text-left",
  "centered":      "items-center justify-center text-center",
  "top-left":      "items-start justify-start text-left",
  "bottom-center": "items-end justify-center text-center",
}

// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS = "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"

// ─── Single hero card ──────────────────────────────────────────────────────
function HeroSingle({
  image, font, settings,
}: {
  image: typeof IMAGES[0]
  font: typeof FONTS[0]
  settings: Settings
}) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))

  const titleStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${settings.size}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    lineHeight:    settings.lineH,
    color:         COLOR_HEX[settings.color],
    filter:        SHADOW_FILTER[settings.shadow],
  }

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-stone-200">
      <Image
        src={image.src}
        alt={image.label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />

      {/* Overlay layer */}
      {settings.overlay === "gradient-bottom" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      )}
      {settings.overlay === "gradient-full" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/55" />
      )}
      {settings.overlay === "scrim" && (
        <div className="absolute inset-0 bg-black/35" />
      )}
      {settings.overlay === "vignette" && (
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 90%)" }}
        />
      )}

      {/* Kicker — fixo, ajuda a ler o tipo no contexto editorial real */}
      <div className="absolute top-5 left-5 md:left-7 z-10 flex items-center gap-3">
        <div className="h-px w-6" style={{ backgroundColor: "oklch(0.75 0.12 85)" }} />
        <span
          className="text-[9px] font-medium uppercase tracking-[0.22em]"
          style={{
            color:  "oklch(0.75 0.12 85)",
            filter: SHADOW_FILTER[settings.shadow],
          }}
        >
          {HERO_KICKER}
        </span>
      </div>

      {/* Texto sob teste — posicionamento depende do setting */}
      <div className={`absolute inset-0 flex p-5 md:p-8 ${POSITION_CLS[settings.position]}`}>
        <h1 className="max-w-[90%]" style={titleStyle}>
          {HERO_TITLE}
        </h1>
      </div>

      {/* Tonality label — fora do hero, ajuda a navegação visual */}
      <div className="absolute top-5 right-5 z-10">
        <span className="text-[9px] uppercase tracking-[0.18em] bg-white/85 backdrop-blur-sm text-slate-600 px-2 py-0.5 rounded-full">
          {image.label}
        </span>
      </div>
    </div>
  )
}

function HeroPreview({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {IMAGES.map((img) => (
          <HeroSingle key={img.id} image={img} font={font} settings={settings} />
        ))}
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
      component: "hero-imagem",
      font: font.label,
      title: [
        font.label,
        `${settings.size}px`,
        `weight ${weight}`,
        `tracking ${settings.tracking}`,
        `lineH ${settings.lineH}`,
        `cor ${settings.color}`,
        `overlay ${settings.overlay}`,
        `shadow ${settings.shadow}`,
        `pos ${settings.position}`,
      ].join(" · "),
      settings: {
        fontFamily:    `var(${font.var})`,
        fontSize:      `${settings.size}px`,
        fontWeight:    weight,
        letterSpacing: settings.tracking,
        lineHeight:    settings.lineH,
        color:         COLOR_HEX[settings.color],
        textShadow:    SHADOW_FILTER[settings.shadow],
        overlay:       settings.overlay,
        position:      settings.position,
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
function HeroTestInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>(() => ({
    size:     (searchParams.get("size")     as Size)     || DEFAULTS.size,
    weight:   (searchParams.get("weight")   as Weight)   || DEFAULTS.weight,
    tracking: (searchParams.get("tracking") as Tracking) || DEFAULTS.tracking,
    lineH:    (searchParams.get("lineH")    as LineH)    || DEFAULTS.lineH,
    color:    (searchParams.get("color")    as Color)    || DEFAULTS.color,
    overlay:  (searchParams.get("overlay")  as Overlay)  || DEFAULTS.overlay,
    shadow:   (searchParams.get("shadow")   as Shadow)   || DEFAULTS.shadow,
    position: (searchParams.get("position") as Position) || DEFAULTS.position,
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
      color: settings.color, overlay: settings.overlay,
      shadow: settings.shadow, position: settings.position,
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

      {/* ── Sticky controls ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pt-2.5 pb-1 flex items-center gap-2">
          <Link href="/" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">início</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <Link href="/type-test" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">type-test</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] text-brand-gold/70">hero-imagem</span>
        </div>

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select label="Tamanho" value={settings.size} onChange={(v) => set("size", v)}
              options={[
                { label: "36px", value: "36" },
                { label: "44px", value: "44" },
                { label: "52px", value: "52" },
                { label: "60px", value: "60" },
                { label: "72px", value: "72" },
                { label: "84px", value: "84" },
                { label: "96px", value: "96" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Peso" value={settings.weight} onChange={(v) => set("weight", v)}
              options={[
                { label: "400 — Regular",   value: "400" },
                { label: "500 — Medium",    value: "500" },
                { label: "600 — Semibold",  value: "600" },
                { label: "700 — Bold",      value: "700" },
                { label: "800 — Extrabold", value: "800" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Entrelinha" value={settings.lineH} onChange={(v) => set("lineH", v)}
              options={[
                { label: "0.95", value: "0.95" },
                { label: "1.00", value: "1.0" },
                { label: "1.05", value: "1.05" },
                { label: "1.10", value: "1.1" },
                { label: "1.15", value: "1.15" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tracking" value={settings.tracking} onChange={(v) => set("tracking", v)}
              options={[
                { label: "-0.04em",  value: "-0.04em" },
                { label: "-0.03em",  value: "-0.03em" },
                { label: "-0.025em", value: "-0.025em" },
                { label: "-0.02em",  value: "-0.02em" },
                { label: "-0.015em", value: "-0.015em" },
                { label: "-0.01em",  value: "-0.01em" },
                { label: "0em",      value: "0em" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Cor" value={settings.color} onChange={(v) => set("color", v)}
              options={[
                { label: "Branco", value: "white" },
                { label: "Cream",  value: "cream" },
                { label: "Gold",   value: "gold" },
                { label: "Navy",   value: "navy" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Overlay" value={settings.overlay} onChange={(v) => set("overlay", v)}
              options={[
                { label: "Gradiente base",   value: "gradient-bottom" },
                { label: "Gradiente total",  value: "gradient-full" },
                { label: "Scrim plano",      value: "scrim" },
                { label: "Vignette",         value: "vignette" },
                { label: "Sem overlay",      value: "none" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Sombra" value={settings.shadow} onChange={(v) => set("shadow", v)}
              options={[
                { label: "Sem",     value: "none" },
                { label: "Suave",   value: "soft" },
                { label: "Forte",   value: "strong" },
                { label: "Glow",    value: "glow" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Posição" value={settings.position} onChange={(v) => set("position", v)}
              options={[
                { label: "Base esq.",   value: "bottom-left" },
                { label: "Centrado",    value: "centered" },
                { label: "Topo esq.",   value: "top-left" },
                { label: "Base centro", value: "bottom-center" },
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
      <header className="mx-auto max-w-[800px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          Teste tipográfico · Hero sobre imagem
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Como sobrevive o tipo sobre fotografia?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          Cada fonte é mostrada em três imagens em simultâneo — escura,
          clara, agitada — porque uma decisão que parece óptima sobre fundo
          escuro pode desaparecer sobre fundo claro. Overlay, sombra e cor
          são tão críticos como a família. A escala (36–96px) afecta o peso
          aparente: o que funciona em 60px pode parecer histriónico em 96px.
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
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 mt-14">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Serifadas</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSerifs.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[1280px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <HeroPreview font={font} settings={settings} />
          </div>

          <div className="mx-auto max-w-[1280px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSerifs.length - 1 && (
            <div className="mx-auto max-w-[1280px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
          )}
        </div>
      ))}

      {/* ── Sans-serif section ───────────────────────────── */}
      {activeSans.length > 0 && (
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 mt-20">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Sem serifa</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSans.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[1280px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <HeroPreview font={font} settings={settings} />
          </div>

          <div className="mx-auto max-w-[1280px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSans.length - 1 && (
            <div className="mx-auto max-w-[1280px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
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
            {["v5/page.tsx", "instagram/v6/page.tsx", "foundational/v5/page.tsx", "colecao/page.tsx"].map((f, i, arr) => (
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

export default function HeroImageTestPage() {
  return (
    <Suspense>
      <HeroTestInner />
    </Suspense>
  )
}
