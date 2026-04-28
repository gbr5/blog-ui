import Link from "next/link"

const links = [
  {
    label: "Coleção",
    description: "Objetos com presença histórica, material e estética.",
    href: "#",
  },
  {
    label: "Editorial",
    description: "Ensaios sobre beleza, técnica, memória e permanência.",
    href: "#",
  },
  {
    label: "Curadoria de ambientes",
    description: "Para arquitetos, designers e colecionadores.",
    href: "#",
  },
  {
    label: "Sobre a DominionArts",
    description: "Visão, história e compromisso com o excepcional.",
    href: "#",
  },
]

const objetoDaSemana = {
  name: "Cristo Barroco em Marfim",
  description:
    "Escultura devocional do século XVIII, Portugal. Uma peça de rara qualidade técnica e devoção silenciosa. Marfim e madeira policromada.",
  status: "Sob consulta",
}

const textoFundador = {
  title: "Domínio e Arte",
  subtitle: "O que herdamos, moldamos e legamos.",
  href: "#",
}

export default function CartaPage() {
  return (
    <div className="min-h-screen bg-[#F4EDD8] flex flex-col">
      {/* Dev nav */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/instagram"
          className="text-[10px] tracking-[0.12em] uppercase text-[#1C1208]/30 hover:text-[#1C1208]/60 transition-colors"
        >
          ← variações
        </Link>
      </div>

      <div className="flex-1 mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg px-7 sm:px-9 md:px-10 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-16 flex flex-col">

        {/* Monogram */}
        <div className="mb-10">
          <span
            className="font-serif italic text-[52px] sm:text-[64px] leading-none tracking-[-0.02em]"
            style={{ color: "oklch(0.30 0.06 250)" }}
          >
            DA
          </span>
        </div>

        {/* Wordmark + date line */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1
              className="font-serif text-[13px] tracking-[0.12em] uppercase"
              style={{ color: "oklch(0.30 0.06 250)" }}
            >
              DominionArts
            </h1>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: "rgba(28,18,8,0.40)" }}
            >
              Objetos com presença
            </p>
          </div>
          <p
            className="text-[10px] tracking-wide"
            style={{ color: "rgba(28,18,8,0.30)" }}
          >
            2026
          </p>
        </div>

        {/* Thin rule */}
        <div
          className="w-full h-px mb-10"
          style={{ background: "rgba(28,18,8,0.10)" }}
        />

        {/* Opening line */}
        <p
          className="font-serif italic text-[17px] sm:text-[19px] leading-relaxed mb-8"
          style={{ color: "oklch(0.30 0.06 250)" }}
        >
          Bem-vindo à DominionArts.<br />
          Selecione um caminho.
        </p>

        {/* Navigation as letter-body items */}
        <nav className="flex-1 mb-6">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="group block py-3 sm:py-4 border-b"
              style={{ borderColor: "rgba(28,18,8,0.08)" }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[11px] font-serif italic shrink-0"
                  style={{ color: "rgba(28,18,8,0.28)" }}
                >
                  —
                </span>
                <div>
                  <span
                    className="text-[15px] font-medium tracking-[-0.01em] transition-colors duration-150 group-hover:underline"
                    style={{ color: "oklch(0.30 0.06 250)", textDecorationColor: "oklch(0.75 0.12 85)" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="block text-[11px] mt-0.5 leading-tight"
                    style={{ color: "rgba(28,18,8,0.38)" }}
                  >
                    {link.description}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </nav>

        {/* Thin rule */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "rgba(28,18,8,0.08)" }}
        />

        {/* Objeto da semana */}
        <div className="mb-8">
          <p
            className="text-[9px] uppercase tracking-[0.20em] mb-3"
            style={{ color: "rgba(28,18,8,0.30)" }}
          >
            Objeto desta semana
          </p>
          <h2
            className="font-serif italic text-[18px] leading-tight mb-2"
            style={{ color: "oklch(0.30 0.06 250)" }}
          >
            {objetoDaSemana.name}
          </h2>
          <p
            className="text-[12px] leading-5.5 mb-3"
            style={{ color: "rgba(28,18,8,0.50)" }}
          >
            {objetoDaSemana.description}
          </p>
          <a
            href="#"
            className="text-[12px] font-medium transition-colors"
            style={{ color: "oklch(0.65 0.14 85)" }}
          >
            Consultar sobre esta peça →
          </a>
        </div>

        {/* Thin rule */}
        <div
          className="w-full h-px mb-7"
          style={{ background: "rgba(28,18,8,0.08)" }}
        />

        {/* Texto fundador */}
        <div className="mb-8">
          <p
            className="text-[9px] uppercase tracking-[0.20em] mb-2"
            style={{ color: "rgba(28,18,8,0.30)" }}
          >
            Texto fundador
          </p>
          <a href={textoFundador.href} className="group block">
            <span
              className="font-serif italic text-[15px]"
              style={{ color: "oklch(0.30 0.06 250)" }}
            >
              {textoFundador.title}
            </span>
            <span
              className="block text-[12px] mt-0.5 group-hover:underline"
              style={{ color: "rgba(28,18,8,0.45)" }}
            >
              {textoFundador.subtitle}
            </span>
          </a>
        </div>

        {/* Closing + contact */}
        <div className="mt-auto pt-6 border-t" style={{ borderColor: "rgba(28,18,8,0.08)" }}>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+vim+pelo+Instagram"
            className="group flex items-center justify-between"
          >
            <div>
              <span
                className="block text-[12px] font-medium"
                style={{ color: "oklch(0.30 0.06 250)" }}
              >
                Falar com a curadoria
              </span>
              <span
                className="block text-[10px] mt-0.5"
                style={{ color: "rgba(28,18,8,0.35)" }}
              >
                Para aquisições, propostas ou curadoria de ambiente
              </span>
            </div>
            <span
              className="text-base ml-4"
              style={{ color: "oklch(0.75 0.12 85)" }}
            >
              ↗
            </span>
          </a>

          <p
            className="mt-6 text-[9px] tracking-[0.16em] uppercase"
            style={{ color: "rgba(28,18,8,0.22)" }}
          >
            dominionarts.com.br
          </p>
        </div>
      </div>
    </div>
  )
}
