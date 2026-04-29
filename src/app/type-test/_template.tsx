"use client"

/**
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TYPE-TEST PAGE TEMPLATE                                                │
 * │                                                                         │
 * │  Copy this file to /src/app/type-test/<slug>/page.tsx and adapt.       │
 * │  This file is prefixed with _ so Next.js does not treat it as a route. │
 * │                                                                         │
 * │  CHECKLIST when creating a new test page:                               │
 * │  [ ] Replace SUBJECTS with the things you're comparing                  │
 * │  [ ] Replace CONTROLS with the relevant parameters                      │
 * │  [ ] Replace SubjectPreview with the actual component                   │
 * │  [ ] Update the page header copy                                        │
 * │  [ ] Add the new entry to /type-test/page.tsx                           │
 * │  [ ] Register affected file paths in the locations array there          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * PATTERN OVERVIEW
 * ─────────────────
 * 1. SUBJECTS  — the things being compared (fonts, colors, components…)
 *                Each subject has an id, label, and any fixed properties.
 *
 * 2. SETTINGS  — shared parameters that apply to all subjects at once
 *                (size, weight, spacing, color…). Stored in the URL so the
 *                page is shareable. Controlled via <select> in the sticky header.
 *
 * 3. ACTIVE    — which subjects are currently visible. Managed by add-select
 *                in the header and remove button per subject. Null = all.
 *
 * 4. RENDER    — each subject renders inside realistic editorial context
 *                (real body text before and after) so decisions are made in
 *                context, not in a vacuum.
 *
 * 5. COPY      — per-subject button that writes a descriptive JSON payload
 *                to the clipboard: subject, settings, and the current URL.
 */

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

// ─── 1. SUBJECTS ───────────────────────────────────────────────────────────
// Replace this with the things you're actually comparing.
// Keep ids short and URL-safe (no spaces, no special chars).
// Add any fixed properties specific to each subject (e.g. maxWeight for fonts,
// hex for colors, componentVariant for UI elements).

type Subject = {
  id:    string
  label: string
  note:  string        // one-line description shown next to the label
  // tag?: string      // optional badge (e.g. "atual", "recomendado")
  // add subject-specific fixed props here
  // e.g. var: string   (CSS variable for fonts)
  //      hex: string   (hex value for colors)
}

const SUBJECTS: Subject[] = [
  { id: "option-a", label: "Opção A", note: "Descrição curta da opção A." },
  { id: "option-b", label: "Opção B", note: "Descrição curta da opção B." },
  { id: "option-c", label: "Opção C", note: "Descrição curta da opção C." },
  // add more…
]

const ALL_SUBJECT_IDS = SUBJECTS.map((s) => s.id)


// ─── 2. SETTINGS ───────────────────────────────────────────────────────────
// The shared parameters controlled from the sticky header.
// Each setting maps to a URL query param so the page is shareable.
// Use specific string unions for type safety and cleaner option lists.

// TODO: replace with the parameters that matter for this test.
// Examples:
//   size:    "sm" | "md" | "lg"
//   weight:  "400" | "700"
//   color:   "navy" | "gold" | "cream"
//   spacing: "tight" | "normal" | "loose"

type Settings = {
  paramA: string   // TODO: rename + constrain to a union type
  paramB: string   // TODO: rename + constrain to a union type
}

const DEFAULTS: Settings = {
  paramA: "default-a",
  paramB: "default-b",
}

// Human-readable labels for the copy payload
const PARAM_A_LABELS: Record<string, string> = {
  "default-a": "Default A",
  // add more options…
}
const PARAM_B_LABELS: Record<string, string> = {
  "default-b": "Default B",
  // add more options…
}


// ─── Body text placeholders ────────────────────────────────────────────────
// Use realistic editorial copy — not lorem ipsum. The component under test
// should appear inside real sentences to simulate actual reading conditions.

const BODY_A = "Há uma diferença fundamental entre coisas que ficam velhas e coisas que ganham profundidade com o tempo. O primeiro processo é deterioração. O segundo é acumulação de significado."
const BODY_B = "A patina de um bronze, o desgaste de um couro bem curtido, a irregularidade de uma cerâmica feita à mão — esses são os rastros do uso e do tempo que conferem ao objeto uma presença que a fabricação industrial não consegue simular."


// ─── 3. SubjectPreview ─────────────────────────────────────────────────────
// Replace this with the actual component/element being tested.
// It receives the subject (fixed props) and settings (shared controls).

function SubjectPreview({
  subject,
  settings,
}: {
  subject: Subject
  settings: Settings
}) {
  // TODO: render the actual thing being tested, styled with subject + settings.
  // Examples:
  //   - a pullquote block styled with subject's font and settings' size/weight
  //   - a product card in subject's color scheme at settings' density
  //   - a button in subject's variant at settings' size

  return (
    <div
      className="my-10 py-12 px-8 bg-slate-50 border border-slate-100 rounded-xl text-center"
      // style={{ ...apply subject/settings styles here }}
    >
      <p className="text-slate-400 text-[13px] font-mono">
        {/* TODO: replace with real component */}
        {subject.label} · paramA={settings.paramA} · paramB={settings.paramB}
      </p>
    </div>
  )
}


// ─── Shared select style ───────────────────────────────────────────────────
const SELECT_CLS =
  "text-[11px] text-brand-navy border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-brand-navy/40 cursor-pointer min-w-[80px]"


// ─── Select control ────────────────────────────────────────────────────────
function Select<T extends string>({
  label, value, onChange, options,
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
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className={SELECT_CLS}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}


// ─── Subject add-select ────────────────────────────────────────────────────
// Standard-height dropdown. Picking an option adds it to the active set
// and resets to the placeholder. Only shows subjects not already active.

function SubjectAddSelect({
  label, options, onAdd,
}: {
  label: string
  options: { label: string; value: string }[]
  onAdd: (id: string) => void
}) {
  const [val, setVal] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value
    if (!id) return
    onAdd(id)
    setVal("")
  }

  return (
    <div className="flex flex-col gap-1 shrink-0">
      <label className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-400">
        {label}
      </label>
      <select value={val} onChange={handleChange} className={SELECT_CLS}>
        <option value="">Adicionar...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}


// ─── Copy + remove per subject ─────────────────────────────────────────────
function SubjectActions({
  subject, settings, onRemove,
}: {
  subject: Subject
  settings: Settings
  onRemove: () => void
}) {
  const [copied, setCopied] = useState(false)

  function copy() {
    const payload = {
      // TODO: update component name and title format
      component: "TODO",
      subject: subject.label,
      title: [
        subject.label,
        `paramA: ${PARAM_A_LABELS[settings.paramA] ?? settings.paramA}`,
        `paramB: ${PARAM_B_LABELS[settings.paramB] ?? settings.paramB}`,
      ].join(" · "),
      settings: {
        // TODO: expand with human-readable labels for each param
        paramA: settings.paramA,
        paramB: settings.paramB,
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
function TestPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // ── Settings state (read from URL, fall back to DEFAULTS) ────────────────
  const [settings, setSettings] = useState<Settings>(() => ({
    paramA: searchParams.get("paramA") || DEFAULTS.paramA,
    paramB: searchParams.get("paramB") || DEFAULTS.paramB,
    // TODO: add more params here, matching the URL param key
  }))

  // ── Active subjects (null = all; removing the last one resets to all) ────
  const [active, setActive] = useState<Set<string> | null>(() => {
    const param = searchParams.get("subjects")
    if (!param) return null
    const ids = param.split(",").filter((id) => ALL_SUBJECT_IDS.includes(id))
    return ids.length === 0 ? null : new Set(ids)
  })

  const resolved = active ?? new Set(ALL_SUBJECT_IDS)

  // ── Sync state → URL ─────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams({
      paramA: settings.paramA,
      paramB: settings.paramB,
      // TODO: add more
    })
    if (active !== null) params.set("subjects", [...active].join(","))
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [settings, active, router])

  function set<K extends keyof Settings>(key: K, val: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: val }))
  }

  function addSubject(id: string) {
    setActive((prev) => new Set([...(prev ?? new Set(ALL_SUBJECT_IDS)), id]))
  }

  function removeSubject(id: string) {
    setActive((prev) => {
      const next = new Set([...(prev ?? new Set(ALL_SUBJECT_IDS))].filter((x) => x !== id))
      return next.size === 0 ? null : next
    })
  }

  const activeSubjects   = SUBJECTS.filter((s) => resolved.has(s.id))
  const inactiveSubjects = SUBJECTS.filter((s) => !resolved.has(s.id))

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky header ─────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pt-2.5 pb-1 flex items-center gap-2">
          <Link href="/" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">início</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          <Link href="/type-test" className="text-[10px] text-slate-300 hover:text-brand-navy transition-colors">type-test</Link>
          <span className="text-slate-200 text-[10px]">/</span>
          {/* TODO: update slug label */}
          <span className="text-[10px] text-brand-gold/70">slug</span>
        </div>

        {/* Controls row */}
        <div className="mx-auto max-w-[1360px] px-5 md:px-8 pb-3 overflow-x-auto">
          <div className="flex items-end gap-4 md:gap-5 min-w-max">

            {/* TODO: replace with real controls for this test */}
            <Select
              label="Parâmetro A"
              value={settings.paramA}
              onChange={(v) => set("paramA", v)}
              options={[
                { label: "Opção 1", value: "option-1" },
                { label: "Opção 2", value: "option-2" },
                { label: "Opção 3", value: "option-3" },
                { label: "Opção 4", value: "option-4" },
                { label: "Opção 5", value: "option-5" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            <Select
              label="Parâmetro B"
              value={settings.paramB}
              onChange={(v) => set("paramB", v)}
              options={[
                { label: "Opção 1", value: "option-1" },
                { label: "Opção 2", value: "option-2" },
                { label: "Opção 3", value: "option-3" },
                { label: "Opção 4", value: "option-4" },
                { label: "Opção 5", value: "option-5" },
              ]}
            />
            <div className="w-px h-7 bg-slate-100 self-end mb-1" />

            {/* Subject picker — only shows subjects not already active */}
            <SubjectAddSelect
              label="Adicionar"
              options={inactiveSubjects.map((s) => ({ label: s.label, value: s.id }))}
              onAdd={addSubject}
            />

          </div>
        </div>
      </div>

      {/* ── Page header + jump index ───────────────────────── */}
      <header className="mx-auto max-w-[700px] px-5 md:px-8 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
          {/* TODO: update category label */}
          Teste tipográfico · Nome do componente
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] text-brand-navy tracking-[-0.025em] leading-[1.05] mb-4">
          {/* TODO: update title */}
          O que estamos a testar?
        </h1>
        <p className="text-[14px] leading-7 text-slate-400 mb-10">
          {/* TODO: update description */}
          Descrição do que está a ser testado e porquê. O URL actualiza-se
          com as opções — partilhe o link ou copie as definições em JSON.
        </p>

        {/* Vertical jump index — shows only active subjects */}
        <nav className="flex flex-col gap-2">
          {activeSubjects.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-3 text-[13px] text-slate-400 hover:text-brand-navy transition-colors"
            >
              <span className="text-brand-gold/40 group-hover:text-brand-gold transition-colors text-[10px]">↓</span>
              <span>{s.label}</span>
              <span className="text-[12px] text-slate-300 italic">{s.note}</span>
            </a>
          ))}
        </nav>
      </header>

      {/* ── Subject sections ──────────────────────────────── */}
      {activeSubjects.map((subject, i) => (
        <div key={subject.id} id={subject.id}>
          <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-12 mb-1">
            <div className="flex items-baseline gap-3 flex-wrap mb-3">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-gold">
                {subject.label}
              </p>
              <span className="text-[12px] text-slate-300 italic">{subject.note}</span>
            </div>
            {/* Body text before the component */}
            <p className="text-[15px] leading-7 text-slate-500">{i % 2 === 0 ? BODY_A : BODY_B}</p>
          </div>

          {/* ── The component being tested ── */}
          <SubjectPreview subject={subject} settings={settings} />

          <div className="mx-auto max-w-[700px] px-5 md:px-8 mb-2">
            {/* Body text after the component */}
            <p className="text-[15px] leading-7 text-slate-500 mb-5">{i % 2 === 0 ? BODY_B : BODY_A}</p>

            {/* Copy + remove */}
            <SubjectActions
              subject={subject}
              settings={settings}
              onRemove={() => removeSubject(subject.id)}
            />
          </div>

          {i < activeSubjects.length - 1 && (
            <div className="mx-auto max-w-[700px] px-5 md:px-8 mt-10">
              <div className="h-px bg-slate-100" />
            </div>
          )}
        </div>
      ))}

      {/* ── Decision record ───────────────────────────────── */}
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <div className="border-t border-slate-100 mt-16 pt-10 pb-20">
          <p className="text-[9px] uppercase tracking-[0.22em] text-brand-gold mb-4">
            Veredito de trabalho
          </p>
          <p className="font-serif text-[20px] md:text-[24px] text-brand-navy tracking-[-0.015em] leading-[1.3] mb-4">
            Após decidir, aplicar a:
          </p>
          <p className="text-[13px] text-slate-400 leading-7">
            {/* TODO: list the actual files that will be changed */}
            {["path/to/file.tsx"].map((f, i, arr) => (
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

// ─── Suspense wrapper (required for useSearchParams in App Router) ─────────
export default function TestPage() {
  return (
    <Suspense>
      <TestPageInner />
    </Suspense>
  )
}
