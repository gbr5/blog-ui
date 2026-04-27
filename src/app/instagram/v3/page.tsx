import Link from "next/link"

const heroProduct = {
  name: "Cristo Barroco em Marfim",
  period: "Séc. XVIII · Portugal",
  material: "Marfim e madeira policromada",
  status: "Sob consulta",
  image: "https://picsum.photos/seed/cristo/700/900",
}

const collection = [
  {
    name: "Caligrafia Otomana",
    period: "Séc. XVIII",
    status: "Disponível",
    image: "https://picsum.photos/seed/cali2/400/520",
  },
  {
    name: "Têxtil Adamascado",
    period: "Séc. XVII",
    status: "Reservado",
    image: "https://picsum.photos/seed/textil/400/520",
  },
  {
    name: "Secretária Neoclássica",
    period: "Séc. XIX · RJ",
    status: "Disponível",
    image: "https://picsum.photos/seed/secretaria/400/520",
  },
  {
    name: "Oratório Baiano",
    period: "Séc. XVIII",
    status: "Sob consulta",
    image: "https://picsum.photos/seed/oratorio/400/520",
  },
]

const recentInstagram = [
  {
    title: "O peso da matéria",
    type: "Ensaio",
    image: "https://picsum.photos/seed/materia/300/300",
  },
  {
    title: "Cristo Barroco",
    type: "Peça",
    image: "https://picsum.photos/seed/cristob/300/300",
  },
  {
    title: "Espaços que falam",
    type: "Editorial",
    image: "https://picsum.photos/seed/espacos/300/300",
  },
]

const statusColors: Record<string, string> = {
  "Disponível": "text-emerald-700 bg-emerald-50",
  "Reservado": "text-slate-500 bg-slate-100",
  "Sob consulta": "text-brand-gold-dark bg-brand-gold/10",
}

export default function VitrinePagee() {
  return (
    <div className="min-h-screen bg-white">
      {/* Dev nav */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/instagram"
          className="text-[10px] tracking-[0.12em] uppercase text-slate-300 hover:text-slate-600 transition-colors"
        >
          ← variações
        </Link>
      </div>

      <div className="mx-auto w-full max-w-sm px-5 pt-14 pb-12">

        {/* Header — minimal */}
        <header className="mb-7 flex items-center justify-between">
          <div>
            <span className="font-serif text-[10px] tracking-[0.20em] uppercase text-brand-gold block">
              DA
            </span>
            <h1 className="font-serif text-[18px] tracking-[0.02em] text-brand-navy leading-none">
              DominionArts
            </h1>
          </div>
          <a
            href="https://wa.me/5511999999999"
            className="text-[10px] uppercase tracking-[0.12em] text-slate-400 hover:text-brand-navy transition-colors border border-slate-200 rounded-full px-3 py-1.5"
          >
            Consultar
          </a>
        </header>

        {/* Hero product */}
        <section className="mb-8">
          <div className="relative rounded-2xl overflow-hidden bg-sand-light">
            <img
              src={heroProduct.image}
              alt={heroProduct.name}
              className="w-full h-72 object-cover"
            />
            {/* Status badge top right */}
            <div className="absolute top-3 right-3">
              <span className={`text-[9px] font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${statusColors[heroProduct.status]}`}>
                {heroProduct.status}
              </span>
            </div>
          </div>
          <div className="mt-3 px-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-serif text-[19px] leading-tight text-brand-navy mb-0.5">
                  {heroProduct.name}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {heroProduct.period} · {heroProduct.material}
                </p>
              </div>
            </div>
            <a
              href="#"
              className="mt-3 flex items-center justify-center gap-2 w-full border border-brand-navy/15 hover:border-brand-navy/30 rounded-xl py-3 text-[12px] font-medium text-brand-navy transition-colors"
            >
              Consultar sobre esta peça
            </a>
          </div>
        </section>

        {/* Collection grid */}
        <section className="mb-8">
          <h3 className="text-[9px] uppercase tracking-[0.18em] text-slate-300 mb-4 px-1">
            Seleção desta semana
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {collection.map((item, i) => (
              <a key={i} href="#" className="group block">
                <div className="relative rounded-xl overflow-hidden bg-sand-light mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`text-[8px] font-medium uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <h4 className="font-serif text-[13px] text-brand-navy leading-tight mb-0.5 px-0.5">
                  {item.name}
                </h4>
                <p className="text-[10px] text-slate-400 px-0.5">{item.period}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-[9px] uppercase tracking-[0.16em] text-slate-300">Instagram</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Recent Instagram */}
        <section className="mb-8">
          <p className="text-[9px] uppercase tracking-[0.18em] text-slate-300 mb-3 px-1">
            Visto recentemente no Instagram
          </p>
          <div className="grid grid-cols-3 gap-2">
            {recentInstagram.map((item, i) => (
              <a key={i} href="#" className="group block">
                <div className="aspect-square rounded-xl overflow-hidden bg-sand-light mb-1.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                  />
                </div>
                <p className="text-[8px] uppercase tracking-[0.1em] text-brand-gold mb-0.5 px-0.5">
                  {item.type}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight line-clamp-2 px-0.5">
                  {item.title}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Curadoria CTA */}
        <section className="rounded-2xl bg-sand-light px-5 py-5">
          <p className="font-serif text-[15px] text-brand-navy mb-1 leading-tight">
            Procura uma peça para um ambiente específico?
          </p>
          <p className="text-[12px] text-slate-500 mb-4 leading-5">
            Nossa curadoria encontra objetos que dialogam com espaços e narrativas únicas.
          </p>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+vim+pelo+Instagram"
            className="inline-flex items-center gap-2 bg-brand-navy text-cream text-[12px] font-medium px-5 py-2.5 rounded-full hover:bg-brand-navy-light transition-colors"
          >
            <span>Falar com a curadoria</span>
            <span>↗</span>
          </a>
        </section>

        {/* Domain */}
        <p className="mt-8 text-center text-[10px] text-slate-300 tracking-wider">
          dominionarts.com.br
        </p>
      </div>
    </div>
  )
}
