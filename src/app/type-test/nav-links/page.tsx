"use client"

/**
 * Type Test — Navegação principal
 *
 * Os links do menu definem o tom geral do site. Em corpo pequeno e em escala
 * horizontal, cada decisão tipográfica pesa: maiúsculas largas → comercial /
 * institucional; mistas com tracking neutro → editorial / próximo. Um peso
 * acima de 500 inclina para CTA; abaixo de 400 sai apagado.
 *
 * Renderiza uma barra de header realista (logo · menu · utilitários) com 5
 * destinos concretos do site. A barra inteira muda com a fonte para se
 * avaliar coerência — o "DA" do logo pertence à mesma família que os links.
 *
 * Aplica-se a:
 *   components/v5-header.tsx
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Search, User, ShoppingBag, Menu } from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────
type Size      = "11" | "12" | "13" | "14" | "15" | "16"
type Weight    = "300" | "400" | "500" | "600" | "700"
type Tracking  = "-0.01em" | "0em" | "0.02em" | "0.05em" | "0.1em" | "0.15em" | "0.18em" | "0.22em"
type Case      = "normal" | "upper"
type Separator = "none" | "dot" | "bar" | "wide"

interface Settings {
  size:      Size
  weight:    Weight
  tracking:  Tracking
  case:      Case
  separator: Separator
}

const DEFAULTS: Settings = {
  size:      "12",
  weight:    "500",
  tracking:  "0.02em",
  case:      "normal",
  separator: "none",
}

// ─── Fonts ─────────────────────────────────────────────────────────────────
// Mesma lista que os outros testes — ordem prioriza sans (uso típico de nav)
// mas mantém serifadas para exploração editorial.

const FONTS = [
  // Sans — uso comum em navegação
  { id: "inter",       label: "Inter",               var: "--font-inter",             maxWeight: 900, serif: false, note: "Neutro, técnico — referência de UI." },
  { id: "dm-sans",     label: "DM Sans",             var: "--font-dm-sans",           maxWeight: 900, serif: false, note: "Geométrico arredondado — quente." },
  { id: "jakarta",     label: "Plus Jakarta Sans",   var: "--font-jakarta",           maxWeight: 800, serif: false, note: "Editorial sem ser frio — bom equilíbrio." },
  { id: "manrope",     label: "Manrope",             var: "--font-manrope",           maxWeight: 800, serif: false, note: "Humanista, legível, pouco distintivo." },
  { id: "outfit",      label: "Outfit",              var: "--font-outfit",            maxWeight: 900, serif: false, note: "Geométrico limpo — afirmativo." },
  // Serif — escolha mais atrevida para nav
  { id: "playfair",    label: "Playfair Display",    var: "--font-playfair",          maxWeight: 800, serif: true,  note: "Display — perde definição em corpo pequeno." },
  { id: "fraunces",    label: "Fraunces",             var: "--font-fraunces",          maxWeight: 700, serif: true,  note: "Distinto em corpo pequeno — escolha autoral." },
  { id: "cormorant",   label: "Cormorant Garamond", var: "--font-cormorant",         maxWeight: 700, serif: true,  note: "Letras finas — frágil sob 13px." },
  { id: "eb-garamond", label: "EB Garamond",         var: "--font-eb-garamond",       maxWeight: 800, serif: true,  note: "Sóbrio, clássico, inclina para institucional." },
  { id: "baskerville", label: "Libre Baskerville",   var: "--font-libre-baskerville", maxWeight: 700, serif: true,  note: "Robusto em corpo — encorpado em nav." },
]
const ALL_FONT_IDS = FONTS.map((f) => f.id)

// ─── Realistic nav data ────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Editorial",    href: "/v5" },
  { label: "Coleção",      href: "/colecao" },
  { label: "Foundational", href: "/foundational/v5" },
  { label: "Sobre",        href: "/sobre" },
  { label: "Loja",         href: "#" },
]

// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS = "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"

// ─── Nav header preview ────────────────────────────────────────────────────
function NavPreview({ font, settings }: { font: typeof FONTS[0]; settings: Settings }) {
  const weight = String(Math.min(parseInt(settings.weight), font.maxWeight))

  const linkStyle: React.CSSProperties = {
    fontFamily:    `var(${font.var})`,
    fontSize:      `${settings.size}px`,
    fontWeight:    weight,
    letterSpacing: settings.tracking,
    textTransform: settings.case === "upper" ? "uppercase" : "none",
  }

  const showSeparator = settings.separator === "dot" || settings.separator === "bar"
  const gap = settings.separator === "wide" ? "gap-7 md:gap-9" : "gap-4 md:gap-6"

  return (
    <div className="my-8">
      {/* Header bar — espelha o V5Header */}
      <header className="bg-white/97 backdrop-blur-md border-y border-slate-100/80 shadow-[0_1px_12px_rgba(15,23,42,0.05)]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-6 md:px-8 h-14 md:h-[60px] flex items-center gap-3 md:gap-5">

          {/* Logo — usa a mesma fonte para testar coerência */}
          <div className="shrink-0 flex items-baseline gap-1.5">
            <span
              className="text-brand-navy"
              style={{
                fontFamily:    `var(${font.var})`,
                fontSize:      "21px",
                fontWeight:    String(Math.min(600, font.maxWeight)),
                letterSpacing: "-0.01em",
              }}
            >
              DA
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.18em] text-brand-gold leading-none mb-px">
              Editorial
            </span>
          </div>

          <div className="hidden md:block w-px h-4 bg-slate-200" />

          {/* Menu items — o que está sob teste */}
          <nav className={`hidden md:flex items-center ${gap} flex-1`}>
            {NAV_ITEMS.map((item, i) => (
              <span key={item.label} className="flex items-center gap-3 md:gap-5">
                {i > 0 && showSeparator && (
                  <span className="text-slate-200 text-[10px]" aria-hidden>
                    {settings.separator === "dot" ? "·" : "|"}
                  </span>
                )}
                <a
                  href={item.href}
                  className="text-brand-navy/75 hover:text-brand-navy transition-colors whitespace-nowrap"
                  style={linkStyle}
                >
                  {item.label}
                </a>
              </span>
            ))}
          </nav>

          {/* Spacer — desktop quando o nav está visível */}
          <div className="hidden md:block flex-1 md:hidden" />

          {/* Utilitários — search compacto + ícones */}
          <div className="flex-1 md:flex-none flex items-center justify-end gap-2 md:gap-3">
            <button
              className="hidden lg:flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-[7px] text-slate-400 hover:border-brand-navy/25 transition-colors"
              aria-label="Pesquisar"
            >
              <Search className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="text-[12px]">Buscar</span>
            </button>

            <button
              className="hidden sm:flex items-center gap-1.5 text-brand-navy/45 hover:text-brand-navy transition-colors py-1"
              style={linkStyle}
              aria-label="Conta"
            >
              <User className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Conta</span>
            </button>

            <button
              className="p-2 rounded-full text-brand-navy/50 hover:text-brand-navy hover:bg-slate-50 transition-all"
              aria-label="Loja"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            </button>

            <button
              className="md:hidden p-2 rounded-full text-brand-navy/50 hover:text-brand-navy hover:bg-slate-50 transition-all"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Vista mobile — nav vertical em drawer simulado.
          Mostra como os mesmos itens lêem em coluna empilhada. */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-4">
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-300 mb-3">Vista mobile (drawer)</p>
        <div className="border border-slate-100 rounded-lg p-5 bg-slate-50/40">
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-brand-navy/80 hover:text-brand-navy transition-colors"
                style={{ ...linkStyle, fontSize: `${parseInt(settings.size) + 4}px` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
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
      component: "nav-links",
      font: font.label,
      title: [
        font.label,
        `${settings.size}px`,
        `weight ${weight}`,
        `tracking ${settings.tracking}`,
        settings.case === "upper" ? "UPPERCASE" : "Mixed Case",
        `separador ${settings.separator}`,
      ].join(" · "),
      settings: {
        fontFamily:     `var(${font.var})`,
        fontSize:       `${settings.size}px`,
        fontWeight:     weight,
        letterSpacing:  settings.tracking,
        textTransform:  settings.case === "upper" ? "uppercase" : "none",
        separator:      settings.separator,
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
function NavTestInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>(() => ({
    size:      (searchParams.get("size")      as Size)      || DEFAULTS.size,
    weight:    (searchParams.get("weight")    as Weight)    || DEFAULTS.weight,
    tracking:  (searchParams.get("tracking")  as Tracking)  || DEFAULTS.tracking,
    case:      (searchParams.get("case")      as Case)      || DEFAULTS.case,
    separator: (searchParams.get("separator") as Separator) || DEFAULTS.separator,
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
      tracking: settings.tracking, case: settings.case,
      separator: settings.separator,
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
          <span className="text-[10px] text-brand-gold/70">nav-links</span>
        </div>

        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            <Select label="Tamanho" value={settings.size} onChange={(v) => set("size", v)}
              options={[
                { label: "11px", value: "11" },
                { label: "12px", value: "12" },
                { label: "13px", value: "13" },
                { label: "14px", value: "14" },
                { label: "15px", value: "15" },
                { label: "16px", value: "16" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select label="Peso" value={settings.weight} onChange={(v) => set("weight", v)}
              options={[
                { label: "300 — Light",    value: "300" },
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
                { label: "+0.18em", value: "0.18em" },
                { label: "+0.22em", value: "0.22em" },
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

            <Select label="Separador" value={settings.separator} onChange={(v) => set("separator", v)}
              options={[
                { label: "Nenhum",       value: "none" },
                { label: "Ponto ·",      value: "dot" },
                { label: "Barra |",      value: "bar" },
                { label: "Espaço amplo", value: "wide" },
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
          Teste tipográfico · Navegação principal
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          Que voz tem a navegação?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          Maiúsculas largas inclinam para institucional, mistas com tracking
          neutro para editorial, peso ≥ 500 para CTA. Cada variante mostra
          uma barra de header completa — logo, menu, utilitários — para se
          ler em contexto. Vista mobile abaixo simula o drawer.
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
        <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-14">
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

          <NavPreview font={font} settings={settings} />

          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSans.length - 1 && (
            <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-10"><div className="h-px bg-slate-100" /></div>
          )}
        </div>
      ))}

      {/* ── Serif section ────────────────────────────────── */}
      {activeSerifs.length > 0 && (
        <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-20">
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

          <NavPreview font={font} settings={settings} />

          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            <FontActions font={font} settings={settings} onRemove={() => removeFont(font.id)} />
          </div>

          {i < activeSerifs.length - 1 && (
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
            {["components/v5-header.tsx"].map((f, i, arr) => (
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

export default function NavLinksTestPage() {
  return (
    <Suspense>
      <NavTestInner />
    </Suspense>
  )
}
