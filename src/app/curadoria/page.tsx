/**
 * Curadoria — Services page
 * For architects, interior designers, and private collectors.
 * V5 Presença design language.
 *
 * Layout:
 * - Compact hero (45vh) with background image
 * - V5Header sticky below
 * - Intro (white bg)
 * - 3 service cards (cream bg)
 * - Process steps (white bg)
 * - Testimonial / quote strip (navy)
 * - Contact CTA (cream bg)
 * - V5Footer
 */
import Link from "next/link"
import Image from "next/image"
import { V5Header } from "@/components/v5-header"
import { V5Footer } from "@/components/v5-footer"

const HEADER_H = 56

const services = [
  {
    label: "Para arquitetos e designers",
    title: "Curadoria de Ambientes",
    body: "Seleção e posicionamento de peças históricas em projetos residenciais e comerciais. Trabalhamos lado a lado com sua equipe desde a concepção do espaço até a instalação final — garantindo coerência entre a peça, o ambiente e a narrativa do cliente.",
    details: ["Visita ao espaço + briefing de projeto", "Proposta de peças com ficha técnica completa", "Assessoria na negociação e logística", "Documentação e certificação de autenticidade"],
    cta: "Falar com a curadoria",
  },
  {
    label: "Para colecionadores privados",
    title: "Aquisição Privada",
    body: "Busca ativa de peças específicas no mercado nacional e internacional. Com acesso a leilões, colecionadores particulares e dealers especializados, encontramos o que você procura — com rigor na verificação e discrição em todas as etapas.",
    details: ["Reunião de alinhamento e briefing", "Pesquisa e triagem de peças elegíveis", "Due diligence de autenticidade e proveniência", "Suporte jurídico e logística internacional"],
    cta: "Solicitar pesquisa",
  },
  {
    label: "Para coleções institucionais",
    title: "Consultoria de Coleção",
    body: "Análise, valoração e recomendações estratégicas para coleções existentes. Identificamos lacunas, oportunidades de desinvestimento e peças que elevam o conjunto — com relatórios detalhados e planos de conservação.",
    details: ["Inventário e análise da coleção atual", "Relatório de valoração de mercado", "Recomendações de aquisição e desinvestimento", "Plano de conservação preventiva"],
    cta: "Solicitar consultoria",
  },
]

const processSteps = [
  {
    step: "1",
    title: "Contato inicial",
    body: "Uma conversa para compreender seu projeto, espaço ou coleção. Sem compromisso.",
  },
  {
    step: "2",
    title: "Proposta personalizada",
    body: "Apresentamos uma seleção de peças com ficha técnica, histórico e documentação de autenticidade.",
  },
  {
    step: "3",
    title: "Aquisição e logística",
    body: "Cuidamos de toda a negociação, documentação legal, seguro e entrega — nacional ou internacional.",
  },
  {
    step: "4",
    title: "Instalação e pós-venda",
    body: "Orientação de posicionamento e conservação. Acompanhamento contínuo para colecionadores parceiros.",
  },
]

export default function CuradoriaPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── COMPACT HERO ─────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: `calc(48svh - ${HEADER_H}px)`, minHeight: 260 }}
      >
        <Image
          src="https://picsum.photos/seed/curadoria-hero/1600/800"
          alt="Curadoria DominionArts"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />

        {/* Back nav */}
        <div className="absolute top-5 left-5 md:left-8 z-10">
          <Link href="/" className="text-[12px] text-white/60 hover:text-white transition-colors">
            ← DominionArts
          </Link>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-8 pb-8 md:pb-10">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-brand-gold mb-2">
              Serviços
            </p>
            <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[52px] text-white tracking-[-0.025em] leading-[1.05]">
              Curadoria de ambientes
            </h1>
          </div>
        </div>
      </div>

      {/* ── STICKY HEADER ────────────────────────────────── */}
      <V5Header backHref="/" backLabel="Início" />

      {/* ── INTRO — white bg ─────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[760px] px-5 md:px-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-5">
            Para quem trabalhamos
          </p>
          <p className="font-serif text-[20px] md:text-[24px] text-brand-navy tracking-[-0.015em] leading-[1.45] mb-6">
            Arquitetos, designers de interiores e colecionadores que entendem que o objeto certo transforma o espaço — e que autenticidade não é negociável.
          </p>
          <p className="text-[15px] md:text-[16px] leading-[1.85] text-slate-500">
            Nossa equipe atende projetos residenciais de alto padrão, espaços corporativos com identidade cultural e coleções privadas em formação ou consolidação. Cada colaboração começa com escuta e termina com uma peça que permanece.
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS — cream bg ──────────────────────── */}
      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">

          <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-10">
            Como podemos colaborar
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 p-6 md:p-7 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-brand-gold mb-3">
                  {s.label}
                </p>
                <h3 className="font-serif text-[20px] md:text-[22px] text-brand-navy tracking-[-0.015em] leading-tight mb-4">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-7 text-slate-500 mb-6 flex-1">
                  {s.body}
                </p>
                <ul className="space-y-2 mb-7 border-t border-slate-100 pt-5">
                  {s.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-slate-500">
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-brand-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+gostaria+de+saber+mais+sobre+curadoria"
                  className="inline-flex items-center gap-2 justify-center bg-brand-navy text-white text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-brand-navy/90 transition-colors"
                >
                  {s.cta}
                  <span>↗</span>
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PROCESS — white bg ───────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">

          <div className="mb-10 md:mb-14">
            <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-3">
              Como funciona
            </p>
            <h2 className="font-serif text-[24px] md:text-[32px] text-brand-navy tracking-[-0.02em]">
              Do primeiro contato à peça instalada
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {processSteps.map((s, i) => (
              <div
                key={i}
                className={`relative px-0 py-6 md:py-0 md:px-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-slate-100" : ""}`}
              >
                <p
                  className="font-serif text-[52px] md:text-[60px] leading-none mb-3"
                  style={{ color: "oklch(0.75 0.12 85 / 0.18)" }}
                >
                  {s.step}
                </p>
                <h3 className="font-serif text-[17px] md:text-[19px] text-brand-navy mb-2">
                  {s.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-7 text-slate-500">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── QUOTE STRIP — navy ───────────────────────────── */}
      <div
        className="overflow-hidden"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <div
          style={{
            background: "oklch(0.30 0.06 250)",
            transform: "skewY(-1.5deg)",
            padding: "3.5rem 1.5rem",
          }}
        >
          <div style={{ transform: "skewY(1.5deg)" }}>
            <p className="font-serif text-[22px] sm:text-[30px] md:text-[42px] text-white font-bold tracking-[-0.02em] leading-[1.15] max-w-4xl mx-auto px-2 sm:px-8 md:px-16">
              &ldquo;O objeto certo no espaço certo não precisa de explicação.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ── CONTACT CTA — cream bg ────────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[640px] px-5 md:px-8 text-center">

          <div
            className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-7"
            style={{ border: "1px solid oklch(0.75 0.12 85 / 0.30)" }}
          >
            <span className="font-serif text-[13px]" style={{ color: "oklch(0.75 0.12 85)" }}>
              DA
            </span>
          </div>

          <h2 className="font-serif text-[24px] md:text-[30px] text-brand-navy tracking-[-0.02em] leading-tight mb-4">
            Comece uma conversa
          </h2>
          <p className="text-[15px] leading-7 text-slate-500 mb-8 max-w-sm mx-auto">
            Todos os projetos começam com uma conversa sem compromisso. Conte-nos sobre o seu espaço, coleção ou necessidade.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+gostaria+de+falar+sobre+curadoria"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-navy text-white text-[13px] font-medium px-7 py-3 rounded-full hover:bg-brand-navy/90 transition-colors shadow-[0_4px_16px_rgba(15,23,42,0.18)]"
            >
              Falar pelo WhatsApp
              <span>↗</span>
            </a>
            <Link
              href="/colecao"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-brand-navy/20 text-brand-navy text-[13px] font-medium px-7 py-3 rounded-full hover:bg-brand-navy/5 transition-colors"
            >
              Ver a coleção
            </Link>
          </div>

        </div>
      </section>

      <V5Footer hideNewsletter />
    </div>
  )
}
