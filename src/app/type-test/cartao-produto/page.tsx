"use client"

/**
 * Type Test — Cartão de produto
 *
 * Diferente dos testes anteriores: aqui o objecto sob teste é um componente
 * inteiro, não uma propriedade tipográfica isolada. Cada fonte é mostrada
 * numa fila de 3 cartões — é nesse contexto (lado a lado, com badge, com
 * meta) que se vê se a tipografia do título funciona ou não.
 *
 * Decisões em jogo:
 *   - proporção da imagem (3/4 default vs 4/5 vs quadrado vs 5/7)
 *   - raio do cartão (sem arredondado → arredondado generoso)
 *   - tipografia do título (família, tamanho, peso, tracking)
 *   - badge de status (posição, estilo)
 *   - densidade do meta abaixo da imagem
 *
 * Aplica-se a:
 *   colecao/page.tsx · instagram/v6/page.tsx
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

// ─── Types ─────────────────────────────────────────────────────────────────
type Aspect    = "3/4" | "4/5" | "1/1" | "5/4" | "5/7"
type Radius    = "none" | "sm" | "md" | "lg" | "xl"
type Size      = "12" | "13" | "14" | "15" | "16" | "17" | "18"
type Weight    = "400" | "500" | "600" | "700"
type Tracking  = "-0.02em" | "-0.015em" | "-0.01em" | "0em" | "0.01em" | "0.02em"
type BadgePos  = "top-right" | "top-left" | "bottom-left" | "bottom-right" | "none"
type BadgeStyle= "filled" | "outlined" | "minimal"
type Density   = "compact" | "regular" | "spacious"
type Meta      = "minimal" | "regular" | "full"

interface Settings {
  aspect:     Aspect
  radius:     Radius
  size:       Size
  weight:     Weight
  tracking:   Tracking
  badgePos:   BadgePos
  badgeStyle: BadgeStyle
  density:    Density
  meta:       Meta
}

const DEFAULTS: Settings = {
  aspect:     "3/4",
  radius:     "lg",
  size:       "15",
  weight:     "500",
  tracking:   "-0.01em",
  badgePos:   "top-right",
  badgeStyle: "filled",
  density:    "regular",
  meta:       "regular",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FONTS = [
  // Sans — neutro, comercial
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Neutro — discreto, comercial." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico arredondado — quente." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Editorial moderno — bom para títulos curtos." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Humanista — neutro, pouco distintivo." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico afirmativo — inclina para CTA." },
  // Serif — escolha actual
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Atual em /colecao. Display — pode parecer pesado." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Distinto — voz autoral, editorial." },
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Elegante, fino — frágil em peso baixo." },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Sóbrio, museológico." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Robusto — boa presença em meta acima." },
]
const ALL_FONT_IDS = FONTS.map((f) => f.id)

// ─── Realistic pieces (subset of /colecao) ─────────────────────────────────
const PIECES = [
  {
    name: "Cristo Barroco em Marfim",
    period: "Séc. XVIII · Portugal",
    material: "Marfim e madeira policromada",
    type: "Escultura",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/cristo/500/650",
  },
  {
    name: "Caligrafia Otomana",
    period: "Séc. XVIII",
    material: "Tinta sobre papel afiligranado",
    type: "Arte sobre papel",
    status: "Disponível",
    image: "https://picsum.photos/seed/cali2/500/650",
  },
  {
    name: "Têxtil Adamascado",
    period: "Séc. XVII",
    material: "Seda e fios de ouro",
    type: "Têxtil",
    status: "Reservado",
    image: "https://picsum.photos/seed/textil/500/650",
  },
]

// ─── Status badge palette ──────────────────────────────────────────────────
const STATUS_FILL: Record<string, string> = {
  "Disponível":   "text-emerald-700 bg-emerald-50",
  "Reservado":    "text-slate-500 bg-slate-100",
  "Sob consulta": "text-amber-700 bg-amber-50",
}
const STATUS_OUTLINE: Record<string, string> = {
  "Disponível":   "text-emerald-700 border-emerald-200 bg-white/80",
  "Reservado":    "text-slate-500 border-slate-200 bg-white/80",
  "Sob consulta": "text-amber-700 border-amber-200 bg-white/80",
}
const STATUS_DOT: Record<string, string> = {
  "Disponível":   "bg-emerald-500",
  "Reservado":    "bg-slate-400",
  "Sob consulta": "bg-amber-500",
}

// ─── Mappings for class-name resolution ────────────────────────────────────
const ASPECT_CLS: Record<Aspect, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "5/4": "aspect-[5/4]",
  "5/7": "aspect-[5/7]",
}
const RADIUS_CLS: Record<Radius, string> = {
  none: "rounded-none",
  sm:   "rounded-sm",
  md:   "rounded-md",
  lg:   "rounded-xl",
  xl:   "rounded-3xl",
}
const BADGE_POS_CLS: Record<BadgePos, string> = {
  "top-right":    "top-2.5 right-2.5",
  "top-left":     "top-2.5 left-2.5",
  "bottom-left":  "bottom-2.5 left-2.5",
  "bottom-right": "bottom-2.5 right-2.5",
  "none":         "",
}
const DENSITY_CLS: Record<Density, { gap: string; meta: string }> = {
  compact:   { gap: "mb-2",  meta: "space-y-0" },
  regular:   { gap: "mb-3",  meta: "space-y-0.5" },
  spacious:  { gap: "mb-4",  meta: "space-y-1" },
}

// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS = "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"

// ─── Card preview ──────────────────────────────────────────────────────────
function ProductCard({
  piece, font, settings,
}: {
  piece: typeof PIECES[0]
  font: typeof FONTS[0]
  settings: Settings
}) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))
  const titleStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${settings.size}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    lineHeight:    "1.25",
  }

  const showBadge = settings.badgePos !== "none"
  const density = DENSITY_CLS[settings.density]

  return (
    <a href="#" className="group block">
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-stone-50 ${ASPECT_CLS[settings.aspect]} ${RADIUS_CLS[settings.radius]} ${density.gap}`}
      >
        <Image
          src={piece.image}
          alt={piece.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {showBadge && settings.badgeStyle === "filled" && (
          <div className={`absolute ${BADGE_POS_CLS[settings.badgePos]}`}>
            <span className={`text-[9px] font-medium uppercase tracking-[0.08em] px-2 py-0.5 rounded-full ${STATUS_FILL[piece.status]}`}>
              {piece.status}
            </span>
          </div>
        )}

        {showBadge && settings.badgeStyle === "outlined" && (
          <div className={`absolute ${BADGE_POS_CLS[settings.badgePos]}`}>
            <span className={`text-[9px] font-medium uppercase tracking-[0.08em] px-2 py-0.5 rounded-full border backdrop-blur-sm ${STATUS_OUTLINE[piece.status]}`}>
              {piece.status}
            </span>
          </div>
        )}

        {showBadge && settings.badgeStyle === "minimal" && (
          <div className={`absolute ${BADGE_POS_CLS[settings.badgePos]} flex items-center gap-1.5 bg-white/85 backdrop-blur-sm rounded-full px-2 py-0.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[piece.status]}`} />
            <span className="text-[9px] uppercase tracking-[0.08em] text-slate-600">{piece.status}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Meta below image */}
      <div className={density.meta}>
        {(settings.meta === "regular" || settings.meta === "full") && (
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.10em] text-brand-gold/70">
            {piece.type}
          </p>
        )}

        <h3 className="text-brand-navy line-clamp-2 group-hover:text-brand-navy/75 transition-colors" style={titleStyle}>
          {piece.name}
        </h3>

        {(settings.meta === "regular" || settings.meta === "full") && (
          <p className="text-[11px] text-slate-400">{piece.period}</p>
        )}

        {settings.meta === "full" && (
          <p className="text-[11px] text-slate-300 line-clamp-1">{piece.material}</p>
        )}
      </div>
    </a>
  )
}

// ─── Card row preview (one row of 3 cards per font) ────────────────────────
function CardRowPreview({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  return (
    <div className="my-8 bg-white border-y border-slate-100 py-10">
      <div className="mx-auto max-w-[1080px] px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {PIECES.map((piece, i) => (
            <ProductCard key={i} piece={piece} font={font} settings={settings} />
          ))}
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
    const payload = {
      component: "cartao-produto",
      font: font.label,
      title: [
        font.label,
        `aspect ${settings.aspect}`,
        `radius ${settings.radius}`,
        `${settings.size}px`,
        `weight ${weight}`,
        `badge ${settings.badgePos}/${settings.badgeStyle}`,
        `meta ${settings.meta}`,
        `density ${settings.density}`,
      ].join(" · "),
      settings: {
        fontFamily:    `var(${font.var})`,
        aspect:        settings.aspect,
        radius:        settings.radius,
        titleFontSize: `${settings.size}px`,
        fontWeight:    weight,
        letterSpacing: settings.tracking,
        badge:         { position: settings.badgePos, style: settings.badgeStyle },
        density:       settings.density,
        meta:          settings.meta,
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
function CardTestInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>(() => ({
    aspect:     (searchParams.get("aspect")     as Aspect)    || DEFAULTS.aspect,
    radius:     (searchParams.get("radius")     as Radius)    || DEFAULTS.radius,
    size:       (searchParams.get("size")       as Size)      || DEFAULTS.size,
    weight:     (searchParams.get("weight")     as Weight)    || DEFAULTS.weight,
    tracking:   (searchParams.get("tracking")   as Tracking)  || DEFAULTS.tracking,
    badgePos:   (searchParams.get("badgePos")   as BadgePos)  || DEFAULTS.badgePos,
    badgeStyle: (searchParams.get("badgeStyle") as BadgeStyle)|| DEFAULTS.badgeStyle,
    density:    (searchParams.get("density")    as Density)   || DEFAULTS.density,
    meta:       (searchParams.get("meta")       as Meta)      || DEFAULTS.meta,
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
      aspect: settings.aspect, radius: settings.radius,
      size: settings.size, weight: settings.weight, tracking: settings.tracking,
      badgePos: settings.badgePos, badgeStyle: settings.badgeStyle,
      density: settings.density, meta: settings.meta,
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
          <span className="text-[10px] text-brand-gold/70">cartao-produto</span>
        </div>

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select label="Proporção" value={settings.aspect} onChange={(v) => set("aspect", v)}
              options={[
                { label: "3 / 4 (vertical)",   value: "3/4" },
                { label: "4 / 5 (vertical)",   value: "4/5" },
                { label: "1 / 1 (quadrado)",   value: "1/1" },
                { label: "5 / 7 (alto)",       value: "5/7" },
                { label: "5 / 4 (paisagem)",   value: "5/4" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Raio" value={settings.radius} onChange={(v) => set("radius", v)}
              options={[
                { label: "Recto",       value: "none" },
                { label: "Suave",       value: "sm" },
                { label: "Médio",       value: "md" },
                { label: "Generoso",    value: "lg" },
                { label: "Pronunciado", value: "xl" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tamanho" value={settings.size} onChange={(v) => set("size", v)}
              options={[
                { label: "12px", value: "12" },
                { label: "13px", value: "13" },
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
                { label: "400 — Regular",  value: "400" },
                { label: "500 — Medium",   value: "500" },
                { label: "600 — Semibold", value: "600" },
                { label: "700 — Bold",     value: "700" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tracking" value={settings.tracking} onChange={(v) => set("tracking", v)}
              options={[
                { label: "-0.02em",  value: "-0.02em" },
                { label: "-0.015em", value: "-0.015em" },
                { label: "-0.01em",  value: "-0.01em" },
                { label: "0em",      value: "0em" },
                { label: "+0.01em",  value: "0.01em" },
                { label: "+0.02em",  value: "0.02em" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Badge pos" value={settings.badgePos} onChange={(v) => set("badgePos", v)}
              options={[
                { label: "Topo dir.",  value: "top-right" },
                { label: "Topo esq.",  value: "top-left" },
                { label: "Base esq.",  value: "bottom-left" },
                { label: "Base dir.",  value: "bottom-right" },
                { label: "Sem badge",  value: "none" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Badge estilo" value={settings.badgeStyle} onChange={(v) => set("badgeStyle", v)}
              options={[
                { label: "Preenchido", value: "filled" },
                { label: "Contorno",   value: "outlined" },
                { label: "Mínimo",     value: "minimal" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Densidade" value={settings.density} onChange={(v) => set("density", v)}
              options={[
                { label: "Compacta", value: "compact" },
                { label: "Regular",  value: "regular" },
                { label: "Folgada",  value: "spacious" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Meta" value={settings.meta} onChange={(v) => set("meta", v)}
              options={[
                { label: "Mínimo (só título)",    value: "minimal" },
                { label: "Regular (+ período)",   value: "regular" },
                { label: "Completo (+ material)", value: "full" },
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
      <header className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          Teste de componente · Cartão de produto
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Como deve ler-se uma peça em catálogo?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          Cada fonte é mostrada numa fila de 3 cartões — proporção da imagem,
          raio, badge de status, tipografia do título e densidade do meta
          alteram em conjunto. O contexto importa: um cartão isolado mente,
          uma fila não.
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
        <div className="mx-auto max-w-[1080px] px-5 md:px-8 mt-14">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Sem serifa</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSans.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[1080px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <CardRowPreview font={font} settings={settings} />

          <div className="mx-auto max-w-[1080px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSans.length - 1 && (
            <div className="mx-auto max-w-[1080px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
          )}
        </div>
      ))}

      {/* ── Serif section ────────────────────────────────── */}
      {activeSerifs.length > 0 && (
        <div className="mx-auto max-w-[1080px] px-5 md:px-8 mt-20">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300">Serifadas</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        </div>
      )}

      {activeSerifs.map((font, i) => (
        <div key={font.id} id={font.id}>
          <div className="mx-auto max-w-[1080px] px-5 md:px-8 mt-10 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">{font.label}</p>
              <span className="text-[12px] text-slate-300 italic">{font.note}</span>
            </div>
          </div>

          <CardRowPreview font={font} settings={settings} />

          <div className="mx-auto max-w-[1080px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSerifs.length - 1 && (
            <div className="mx-auto max-w-[1080px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
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
            {["colecao/page.tsx", "instagram/v6/page.tsx"].map((f, i, arr) => (
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

export default function CardTestPage() {
  return (
    <Suspense>
      <CardTestInner />
    </Suspense>
  )
}
