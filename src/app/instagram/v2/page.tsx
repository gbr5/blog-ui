import Link from "next/link"

const featuredPost = {
  slug: "dominio-e-arte-o-que-herdamos-moldamos-e-legamos",
  title: "Domínio e Arte: o que herdamos, moldamos e legamos",
  excerpt:
    "Uma reflexão sobre matéria, cultura, técnica, permanência e presença. O texto que define a DominionArts.",
  category: "Visão",
  image: "https://picsum.photos/seed/dominio/900/600",
  isFoundational: true,
}

const featuredProduct = {
  name: "Cristo Barroco em Marfim",
  description: "Escultura devocional · Séc. XVIII, Portugal",
  status: "Sob consulta",
  image: "https://picsum.photos/seed/cristo/500/700",
}

const recentPosts = [
  {
    title: "Beleza como herança",
    category: "Visão",
    image: "https://picsum.photos/seed/beleza/200/200",
    excerpt: "Por que certos objetos atravessam o tempo como memória material.",
  },
  {
    title: "O peso da matéria",
    category: "Visão",
    image: "https://picsum.photos/seed/materia/200/200",
    excerpt: "A física e a filosofia dos objetos que escolhemos conservar.",
  },
  {
    title: "Como ler uma obra: guia para iniciantes",
    category: "Educação Visual",
    image: "https://picsum.photos/seed/obra/200/200",
    excerpt: "Os elementos que todo colecionador deve aprender a identificar.",
  },
]

export default function RevistaPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Dev nav */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/instagram"
          className="text-[10px] tracking-[0.12em] uppercase text-slate-400 hover:text-brand-navy transition-colors"
        >
          ← variações
        </Link>
      </div>

      <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg px-5 sm:px-7 md:px-8 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-16">

        {/* Header */}
        <header className="mb-8 pt-2 flex flex-col items-center text-center">
          <span className="font-serif text-[11px] tracking-[0.18em] uppercase text-brand-gold mb-1">
            DA
          </span>
          <h1 className="font-serif text-[20px] sm:text-[24px] tracking-[0.03em] text-brand-navy">
            DominionArts
          </h1>
          <div className="mt-3 w-6 h-px bg-brand-gold/40" />
        </header>

        {/* Featured post — foundational */}
        <section className="mb-8">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 via-brand-navy-dark/20 to-transparent" />
            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-brand-gold text-white text-[9px] font-medium uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm">
                Texto fundador
              </span>
            </div>
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[9px] uppercase tracking-[0.14em] text-brand-gold/90 mb-1">
                {featuredPost.category}
              </p>
              <h2 className="font-serif text-[17px] sm:text-[20px] leading-tight text-white">
                {featuredPost.title}
              </h2>
            </div>
          </div>
          <div className="mt-3 px-1">
            <p className="text-[13px] leading-5.5 text-slate-500 mb-2">
              {featuredPost.excerpt}
            </p>
            <a
              href="#"
              className="text-[12px] font-medium text-brand-gold hover:text-brand-gold-dark transition-colors"
            >
              Ler ensaio →
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[9px] uppercase tracking-[0.16em] text-slate-300">Coleção</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Featured product */}
        <section className="mb-8">
          <div className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 sm:p-5">
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden shrink-0">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.14em] text-brand-gold mb-1">
                  Peça em destaque
                </span>
                <h3 className="font-serif text-[15px] leading-tight text-brand-navy mb-1">
                  {featuredProduct.name}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {featuredProduct.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-slate-400 italic">
                  {featuredProduct.status}
                </span>
                <a
                  href="#"
                  className="text-[11px] font-medium text-brand-navy hover:text-brand-gold transition-colors"
                >
                  Ver peça →
                </a>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <a
              href="#"
              className="text-[12px] text-slate-400 hover:text-brand-navy transition-colors"
            >
              Ver toda a coleção →
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[9px] uppercase tracking-[0.16em] text-slate-300">Editorial</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Recent posts */}
        <section className="mb-8">
          <div className="space-y-0">
            {recentPosts.map((post, i) => (
              <a
                key={i}
                href="#"
                className="group flex gap-3 py-3.5 border-b border-slate-100 last:border-0"
              >
                <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-sand-light">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[9px] uppercase tracking-[0.12em] text-brand-gold mb-0.5">
                    {post.category}
                  </span>
                  <h4 className="text-[13px] font-medium leading-tight text-brand-navy group-hover:text-brand-navy/70 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-3 text-center">
            <a
              href="#"
              className="text-[12px] text-slate-400 hover:text-brand-navy transition-colors"
            >
              Ver todo o editorial →
            </a>
          </div>
        </section>

        {/* Concierge CTA */}
        <section className="rounded-xl bg-brand-navy px-5 py-5 text-center">
          <p className="font-serif text-[16px] text-cream mb-1">
            Procura uma peça específica?
          </p>
          <p className="text-[12px] text-cream/55 mb-4">
            Para aquisições, curadoria de ambiente e consultas privadas.
          </p>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+vim+pelo+Instagram"
            className="inline-flex items-center gap-2 bg-brand-gold/90 hover:bg-brand-gold text-white text-[12px] font-medium px-5 py-2.5 rounded-full transition-colors"
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
