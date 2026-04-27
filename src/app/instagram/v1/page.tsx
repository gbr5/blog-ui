import Link from "next/link"

const navLinks = [
  {
    num: "01",
    label: "Coleção",
    sub: "Peças disponíveis para aquisição",
    href: "#",
  },
  {
    num: "02",
    label: "Editorial",
    sub: "Ensaios sobre arte, técnica e permanência",
    href: "#",
  },
  {
    num: "03",
    label: "Curadoria",
    sub: "Para ambientes com presença",
    href: "#",
  },
  {
    num: "04",
    label: "Sobre",
    sub: "Visão e história da DominionArts",
    href: "#",
  },
]

const recentInstagram = [
  {
    title: "Cristo Barroco em Marfim",
    type: "Peça",
    image: "https://picsum.photos/seed/cristo/300/300",
  },
  {
    title: "Beleza como herança",
    type: "Ensaio",
    image: "https://picsum.photos/seed/beleza/300/300",
  },
  {
    title: "Caligrafia Otomana",
    type: "Peça",
    image: "https://picsum.photos/seed/cali/300/300",
  },
]

export default function EntradaPage() {
  return (
    <div className="min-h-screen bg-[#191511] text-[#F5EDE0] flex flex-col">
      {/* Dev nav */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/instagram"
          className="text-[10px] tracking-[0.12em] uppercase text-[#F5EDE0]/25 hover:text-[#F5EDE0]/50 transition-colors"
        >
          ← variações
        </Link>
      </div>

      <div className="flex-1 mx-auto w-full max-w-sm px-6 pt-16 pb-10 flex flex-col">

        {/* Monogram */}
        <div className="mb-10 flex flex-col items-center">
          <div
            className="flex items-center justify-center w-[52px] h-[52px] rounded-full mb-5"
            style={{ border: "1px solid rgba(245,237,224,0.12)" }}
          >
            <span className="font-serif text-lg" style={{ color: "oklch(0.75 0.12 85)" }}>
              DA
            </span>
          </div>
          <h1 className="font-serif text-[22px] tracking-[0.04em] text-[#F5EDE0]">
            DominionArts
          </h1>
          <p
            className="mt-2 text-[10px] uppercase tracking-[0.20em]"
            style={{ color: "rgba(245,237,224,0.35)" }}
          >
            Objetos com presença
          </p>
        </div>

        {/* Gold rule */}
        <div
          className="w-6 h-px mx-auto mb-10"
          style={{ background: "oklch(0.75 0.12 85)", opacity: 0.45 }}
        />

        {/* Navigation */}
        <nav className="flex-1 mb-2">
          {navLinks.map((link) => (
            <a
              key={link.num}
              href={link.href}
              className="group flex items-center justify-between py-4"
              style={{ borderBottom: "1px solid rgba(245,237,224,0.07)" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="font-serif text-[11px] pt-0.5 tabular-nums"
                  style={{ color: "oklch(0.75 0.12 85)", opacity: 0.7 }}
                >
                  {link.num}
                </span>
                <div>
                  <span className="block text-[15px] font-medium tracking-wide text-[#F5EDE0] transition-colors duration-200 group-hover:text-[oklch(0.75_0.12_85)]">
                    {link.label}
                  </span>
                  <span
                    className="block text-[11px] mt-0.5 leading-tight"
                    style={{ color: "rgba(245,237,224,0.38)" }}
                  >
                    {link.sub}
                  </span>
                </div>
              </div>
              <span
                className="text-base transition-all duration-200 group-hover:translate-x-0.5"
                style={{ color: "oklch(0.75 0.12 85)", opacity: 0.5 }}
              >
                →
              </span>
            </a>
          ))}
        </nav>

        {/* Recent Instagram */}
        <div
          className="mt-8 pt-7"
          style={{ borderTop: "1px solid rgba(245,237,224,0.07)" }}
        >
          <p
            className="text-[9px] uppercase tracking-[0.22em] mb-4"
            style={{ color: "rgba(245,237,224,0.28)" }}
          >
            Visto recentemente no Instagram
          </p>
          <div className="grid grid-cols-3 gap-2">
            {recentInstagram.map((item, i) => (
              <a key={i} href="#" className="group block">
                <div className="aspect-square rounded-lg overflow-hidden mb-1.5 bg-[#F5EDE0]/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-55 group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
                <p
                  className="text-[9px] leading-tight line-clamp-2"
                  style={{ color: "rgba(245,237,224,0.32)" }}
                >
                  {item.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Concierge CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+vim+pelo+Instagram"
            className="group inline-flex items-center gap-2 transition-colors duration-200"
            style={{ color: "rgba(245,237,224,0.38)" }}
          >
            <span className="text-[11px] tracking-wide group-hover:text-[oklch(0.75_0.12_85)] transition-colors">
              Falar com a curadoria
            </span>
            <span
              className="text-xs group-hover:text-[oklch(0.75_0.12_85)] transition-colors"
            >
              ↗
            </span>
          </a>
        </div>

        {/* Domain */}
        <p
          className="mt-8 text-center text-[9px] tracking-[0.18em] uppercase"
          style={{ color: "rgba(245,237,224,0.15)" }}
        >
          dominionarts.com.br
        </p>
      </div>
    </div>
  )
}
