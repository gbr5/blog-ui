/**
 * Coleção — Collection index page
 * V5 Presença design language.
 *
 * Layout:
 * - Compact hero (50vh) with brand image, title overlay
 * - V5Header sticky below hero
 * - Filter strip (status + type — static for prototype)
 * - Product grid: 2-col mobile → 3-col md → 4-col lg
 * - V5Footer
 */
import Link from "next/link"
import Image from "next/image"
import { V5Header } from "@/components/v5-header"
import { V5Footer } from "@/components/v5-footer"

const HEADER_H = 56

const pieces = [
  {
    name: "Cristo Barroco em Marfim",
    period: "Séc. XVIII · Portugal",
    material: "Marfim e madeira policromada",
    type: "Escultura",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/cristo/500/650",
    href: "#",
  },
  {
    name: "Caligrafia Otomana",
    period: "Séc. XVIII",
    material: "Tinta sobre papel afiligranado",
    type: "Arte sobre papel",
    status: "Disponível",
    image: "https://picsum.photos/seed/cali2/500/650",
    href: "#",
  },
  {
    name: "Têxtil Adamascado",
    period: "Séc. XVII",
    material: "Seda e fios de ouro",
    type: "Têxtil",
    status: "Reservado",
    image: "https://picsum.photos/seed/textil/500/650",
    href: "#",
  },
  {
    name: "Secretária Neoclássica",
    period: "Séc. XIX · Rio de Janeiro",
    material: "Madeira nobre com incrustações",
    type: "Mobiliário",
    status: "Disponível",
    image: "https://picsum.photos/seed/secretaria/500/650",
    href: "#",
  },
  {
    name: "Ânfora Grega",
    period: "Séc. V a.C. · Atenas",
    material: "Terracota com figuras negras",
    type: "Cerâmica",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/anfora/500/650",
    href: "#",
  },
  {
    name: "Retrato Flamengo",
    period: "Séc. XVII · Antuérpia",
    material: "Óleo sobre painel de carvalho",
    type: "Pintura",
    status: "Disponível",
    image: "https://picsum.photos/seed/retrato/500/650",
    href: "#",
  },
  {
    name: "Relógio de Pêndulo",
    period: "Séc. XVIII · Paris",
    material: "Bronze dourado e mármore",
    type: "Relógio",
    status: "Reservado",
    image: "https://picsum.photos/seed/relogio/500/650",
    href: "#",
  },
  {
    name: "Porcelana Ming",
    period: "Séc. XV · China",
    material: "Porcelana com cobalto azul",
    type: "Cerâmica",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/ming/500/650",
    href: "#",
  },
  {
    name: "Armadura Japonesa",
    period: "Séc. XVII · Japão",
    material: "Laca, seda e metal",
    type: "Armadura",
    status: "Disponível",
    image: "https://picsum.photos/seed/armadura/500/650",
    href: "#",
  },
  {
    name: "Mapa Cartográfico",
    period: "1632 · Amsterdam",
    material: "Gravura em cobre colorida à mão",
    type: "Arte sobre papel",
    status: "Disponível",
    image: "https://picsum.photos/seed/mapa/500/650",
    href: "#",
  },
  {
    name: "Tapeçaria de Aubusson",
    period: "Séc. XVIII · França",
    material: "Lã e seda sobre trama de linho",
    type: "Têxtil",
    status: "Reservado",
    image: "https://picsum.photos/seed/tapecaria/500/650",
    href: "#",
  },
  {
    name: "Numismática Romana",
    period: "Séc. I · Roma Imperial",
    material: "Ouro 22k — aureus",
    type: "Numismática",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/moeda/500/650",
    href: "#",
  },
]

const STATUS_STYLES: Record<string, string> = {
  "Disponível": "text-emerald-700 bg-emerald-50",
  "Reservado": "text-slate-500 bg-slate-100",
  "Sob consulta": "text-amber-700 bg-amber-50",
}

const filters = ["Todos", "Disponível", "Reservado", "Sob consulta"]
const typeFilters = ["Todos os tipos", "Escultura", "Pintura", "Cerâmica", "Mobiliário", "Têxtil", "Arte sobre papel"]

export default function ColecaoPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── COMPACT HERO ─────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: `calc(50svh - ${HEADER_H}px)`, minHeight: 280 }}
      >
        <Image
          src="https://picsum.photos/seed/colecao-hero/1600/800"
          alt="Coleção DominionArts"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />

        {/* Back nav */}
        <div className="absolute top-5 left-5 md:left-8 z-10">
          <Link href="/" className="text-[12px] text-white/60 hover:text-white transition-colors">
            ← DominionArts
          </Link>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-8 pb-8 md:pb-10">
          <div className="mx-auto max-w-[1360px]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-brand-gold mb-2">
              DominionArts
            </p>
            <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[54px] text-white tracking-[-0.025em] leading-[1.05]">
              Coleção
            </h1>
          </div>
        </div>
      </div>

      {/* ── STICKY HEADER ────────────────────────────────── */}
      <V5Header backHref="/" backLabel="Início" />

      {/* ── PAGE CONTENT ─────────────────────────────────── */}
      <div className="mx-auto max-w-[1360px] px-5 md:px-8 py-10 md:py-12">

        {/* Intro + stats */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-[15px] leading-7 text-slate-500 max-w-md">
              Objetos selecionados com rigor. Cada peça carrega história, técnica e presença.
            </p>
          </div>
          <p className="text-[13px] text-slate-400 shrink-0">
            {pieces.length} peças em catálogo
          </p>
        </div>

        {/* Filter strips */}
        <div className="flex flex-col gap-3 mb-10">
          {/* Status filter */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                  i === 0
                    ? "bg-brand-navy text-white"
                    : "border border-slate-200 text-slate-500 hover:border-brand-navy/30 hover:text-brand-navy"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Type filter */}
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((f, i) => (
              <button
                key={f}
                className={`px-3.5 py-1 rounded-full text-[11px] transition-colors ${
                  i === 0
                    ? "bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/20"
                    : "border border-slate-100 text-slate-400 hover:border-brand-gold/20 hover:text-brand-gold-dark"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {pieces.map((piece, i) => (
            <a
              key={i}
              href={piece.href}
              className="group block"
            >
              <div className="relative rounded-xl overflow-hidden bg-stone-50 aspect-[3/4] mb-3">
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className={`text-[9px] font-medium uppercase tracking-[0.08em] px-2 py-0.5 rounded-full ${STATUS_STYLES[piece.status] ?? "text-slate-500 bg-slate-100"}`}>
                    {piece.status}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <div className="space-y-0.5">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.10em] text-brand-gold/70">
                  {piece.type}
                </p>
                <h3 className="font-serif text-[14px] sm:text-[15px] text-brand-navy leading-tight line-clamp-2 group-hover:text-brand-navy/75 transition-colors">
                  {piece.name}
                </h3>
                <p className="text-[11px] text-slate-400">{piece.period}</p>
                <p className="text-[11px] text-slate-300 line-clamp-1">{piece.material}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Consult CTA */}
        <div className="mt-16 rounded-2xl bg-cream border border-brand-gold/15 px-6 py-8 md:py-10 text-center">
          <p className="font-serif text-[18px] md:text-[22px] text-brand-navy mb-2">
            Procura uma peça específica?
          </p>
          <p className="text-[14px] text-slate-500 mb-6 max-w-sm mx-auto">
            Para aquisições privadas, curadoria de ambiente e consultas especializadas.
          </p>
          <Link
            href="/curadoria"
            className="inline-flex items-center gap-2 px-7 py-3 bg-brand-navy text-white text-[13px] font-medium rounded-full hover:bg-brand-navy/90 transition-colors"
          >
            Falar com a curadoria
            <span>→</span>
          </Link>
        </div>

      </div>

      <V5Footer hideNewsletter />
    </div>
  )
}
