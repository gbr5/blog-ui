"use client"

/**
 * Type Test — Título de artigo (h1)
 *
 * Testa o display type principal de cada post — o h1 do hero.
 * Mesma família que o pullquote, mas comportamento diferente: no h1 a fonte
 * trabalha em escala muito maior (36–80px) e com leading apertado (~1.0–1.1),
 * onde detalhes de desenho que passam despercebidos no corpo se tornam
 * dominantes. Aqui avaliamos família, peso, escala, tracking e entrelinha.
 *
 * Renderiza em dois contextos reais:
 *   - claro:  fundo cream, navy
 *   - escuro: fundo navy, white  (com kicker dourado, espelha o hero foundational)
 *
 * Aplica-se a:
 *   v5/[slug]/page.tsx · foundational/v5/page.tsx
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

// ─── Line-height: 0.95 → 1.30, step 0.05 ─────────────────────────────────
function buildLineHeights(): string[] {
  const out: string[] = []
  let v = 0.95
  while (v <= 1.301) {
    out.push(parseFloat(v.toFixed(2)).toString())
    v = Math.round((v + 0.05) * 100) / 100
  }
  return out
}
const LINE_H_OPTIONS = buildLineHeights()

// ─── Types ─────────────────────────────────────────────────────────────────
type Size     = "32" | "40" | "48" | "56" | "64" | "72" | "80"
type Weight   = "400" | "500" | "600" | "700" | "800"
type Tracking = "-0.04em" | "-0.035em" | "-0.03em" | "-0.025em" | "-0.02em" | "-0.015em" | "-0.01em" | "0em"
type Title    = "curto" | "medio" | "longo"
type Context  = "claro" | "escuro"

interface Settings {
  size:     Size
  weight:   Weight
  tracking: Tracking
  lineH:    string
  title:    Title
  context:  Context
}

const DEFAULTS: Settings = {
  size:     "56",
  weight:   "600",
  tracking: "-0.025em",
  lineH:    "1.05",
  title:    "medio",
  context:  "claro",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
// Mesma lista que o body-text para permitir comparação directa
// entre comportamento do tipo em corpo pequeno e em escala display.

const FONTS = [
  // Serif — display, editorial
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Display por excelência — alto contraste, italics decorativas." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Variável, distinto, humano em escala grande." },
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Elegância clássica — letras finas e largas." },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Histórico, sóbrio, peso visível em display." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Robusto — desenhado para corpo, perde elegância em display grande." },
  // Sans — contemporâneo, limpo
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Neutro, técnico — referência editorial moderna." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico arredondado — quente em escala grande." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Contemporâneo, editorial sem ser frio." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Humanista — confortável mas pouco distintivo." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico limpo — afirmativo em display." },
]
const ALL_FONT_IDS = FONTS.map((f) => f.id)

// ─── Realistic post data ───────────────────────────────────────────────────
// Três comprimentos para stress-testar o tipo em display.
// Curto: bate forte, mostra forma das letras. Longo: parte em 2–3 linhas
// e revela o ritmo do leading e o tracking acumulado.

const TITLES: Record<Title, string> = {
  curto: "A herança",
  medio: "O que a herança revela sobre o tempo",
  longo: "O que a herança revela sobre o tempo, a memória e os objectos que merecem permanecer",
}

const KICKER  = "DominionArts · Ensaio"
const EXCERPT = "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo."

// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS = "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"

// ─── H1 preview ────────────────────────────────────────────────────────────
function H1Preview({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))
  const isDark = settings.context === "escuro"

  const titleStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${settings.size}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    lineHeight:    settings.lineH,
  }

  return (
    <div
      className={`my-10 py-16 md:py-20 px-6 md:px-12 border-y ${
        isDark
          ? "bg-brand-navy border-brand-navy"
          : "bg-cream border-slate-100"
      }`}
    >
      <div className="max-w-[780px] mx-auto">

        {/* Kicker rule + label — espelha o hero da foundational */}
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-8 bg-brand-gold" />
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-brand-gold">
            {KICKER}
          </span>
        </div>

        {/* O h1 sob teste */}
        <h1
          className={isDark ? "text-white mb-6" : "text-brand-navy mb-6"}
          style={titleStyle}
        >
          {TITLES[settings.title]}
        </h1>

        {/* Excerto — fixo, em itálico serif, não muda com settings.
            Existe para testar o h1 em vizinhança real, não isolado. */}
        <p
          className={`font-serif italic max-w-[640px] leading-[1.6] ${
            isDark ? "text-white/60" : "text-slate-500"
          }`}
          style={{ fontSize: `${Math.max(15, Math.round(parseInt(settings.size) * 0.28))}px` }}
        >
          &ldquo;{EXCERPT}&rdquo;
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
      component: "h1-titulo",
      font: font.label,
      title: [
        font.label,
        `${settings.size}px`,
        `weight ${weight}`,
        `tracking ${settings.tracking}`,
        `entrelinha ${settings.lineH}`,
        `contexto ${settings.context}`,
      ].join(" · "),
      settings: {
        fontFamily:  `var(${font.var})`,
        fontSize:    `${settings.size}px`,
        fontWeight:  weight,
        tracking:    settings.tracking,
        lineHeight:  settings.lineH,
        context:     settings.context,
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
function H1TestInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>(() => ({
    size:     (searchParams.get("size")     as Size)     || DEFAULTS.size,
    weight:   (searchParams.get("weight")   as Weight)   || DEFAULTS.weight,
    tracking: (searchParams.get("tracking") as Tracking) || DEFAULTS.tracking,
    lineH:    searchParams.get("lineH")                  || DEFAULTS.lineH,
    title:    (searchParams.get("title")    as Title)    || DEFAULTS.title,
    context:  (searchParams.get("context")  as Context)  || DEFAULTS.context,
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
      title: settings.title, context: settings.context,
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
          <span className="text-[10px] text-brand-gold/70">h1-titulo</span>
        </div>

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select label="Tamanho" value={settings.size} onChange={(v) => set("size", v)}
              options={[
                { label: "32px", value: "32" },
                { label: "40px", value: "40" },
                { label: "48px", value: "48" },
                { label: "56px", value: "56" },
                { label: "64px", value: "64" },
                { label: "72px", value: "72" },
                { label: "80px", value: "80" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Peso" value={settings.weight} onChange={(v) => set("weight", v)}
              options={[
                { label: "400 — Regular",  value: "400" },
                { label: "500 — Medium",   value: "500" },
                { label: "600 — Semibold", value: "600" },
                { label: "700 — Bold",     value: "700" },
                { label: "800 — Extrabold",value: "800" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Entrelinha" value={settings.lineH} onChange={(v) => set("lineH", v)}
              options={LINE_H_OPTIONS.map((v) => ({ label: v, value: v }))}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Tracking" value={settings.tracking} onChange={(v) => set("tracking", v)}
              options={[
                { label: "-0.04em",  value: "-0.04em" },
                { label: "-0.035em", value: "-0.035em" },
                { label: "-0.03em",  value: "-0.03em" },
                { label: "-0.025em", value: "-0.025em" },
                { label: "-0.02em",  value: "-0.02em" },
                { label: "-0.015em", value: "-0.015em" },
                { label: "-0.01em",  value: "-0.01em" },
                { label: "0em",      value: "0em" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Título" value={settings.title} onChange={(v) => set("title", v)}
              options={[
                { label: "Curto",  value: "curto" },
                { label: "Médio",  value: "medio" },
                { label: "Longo",  value: "longo" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Contexto" value={settings.context} onChange={(v) => set("context", v)}
              options={[
                { label: "Claro",  value: "claro" },
                { label: "Escuro", value: "escuro" },
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
          Teste tipográfico · Título de artigo (h1)
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Qual fonte ganha em escala display?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          O h1 é o primeiro elemento visto em cada artigo. A escala (32–80px) e
          o leading apertado revelam detalhes de desenho que não aparecem no
          corpo. Cada fonte é mostrada num hero realista — kicker dourado,
          título sob teste, e excerto fixo — em fundo claro ou escuro.
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

          <H1Preview font={font} settings={settings} />

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

          <H1Preview font={font} settings={settings} />

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

export default function H1TestPage() {
  return (
    <Suspense>
      <H1TestInner />
    </Suspense>
  )
}
