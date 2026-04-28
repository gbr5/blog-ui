/**
 * Sobre / Visão — Brand story page
 * V5 Presença design language.
 *
 * Layout:
 * - Full-screen hero (h-svh) — ceremonial, like foundational page
 * - V5Header sticky below
 * - Vision section (cream bg) — brand story, 3 paragraphs
 * - Navy quote strip (skewed)
 * - "Nossa abordagem" — 3 pillars in card grid
 * - Team / behind the brand (minimal, editorial)
 * - Foundational text teaser
 * - V5Footer
 */
import Link from "next/link"
import Image from "next/image"
import { V5Header } from "@/components/v5-header"
import { V5Footer } from "@/components/v5-footer"

const pillars = [
  {
    number: "01",
    title: "Pesquisa",
    body: "Cada peça é investigada em profundidade: origem, trajetória, contexto histórico. Nunca adicionamos ao catálogo sem compreender plenamente o que estamos apresentando.",
  },
  {
    number: "02",
    title: "Autenticidade",
    body: "Trabalhamos com especialistas reconhecidos, documentação primária e laboratórios de análise. A proveniência não é um detalhe — é a fundação de tudo.",
  },
  {
    number: "03",
    title: "Curadoria",
    body: "Não somos um arquivo. Cada objeto entra na coleção porque acrescenta ao diálogo entre técnica, cultura e permanência que nos orienta desde o início.",
  },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── FULL-SCREEN HERO ────────────────────────────── */}
      <div className="relative h-svh min-h-[600px] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/sobre-hero/1600/1000"
          alt="DominionArts"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

        {/* Back nav */}
        <div className="absolute top-5 left-5 md:left-8 z-10">
          <Link href="/" className="text-[12px] text-white/60 hover:text-white transition-colors">
            ← DominionArts
          </Link>
        </div>

        {/* DA monogram */}
        <div className="absolute top-1/3 left-0 right-0 flex flex-col items-center">
          <div
            className="flex items-center justify-center w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] rounded-full mb-5"
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="font-serif text-[24px] sm:text-[30px]"
              style={{ color: "oklch(0.75 0.12 85)" }}
            >
              DA
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
            Sobre a DominionArts
          </p>
        </div>

        {/* Bottom title */}
        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-16 pb-14 md:pb-20">
          <div className="max-w-[700px]">
            <h1 className="font-serif text-[36px] sm:text-[52px] md:text-[64px] text-white tracking-[-0.03em] leading-[1.02] mb-5">
              Visão, história e compromisso com o excepcional
            </h1>
            <p className="font-serif text-[16px] sm:text-[18px] italic text-white/55 leading-[1.65]">
              &ldquo;Objetos com presença — e as histórias que os tornam inesquecíveis.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ── STICKY HEADER ────────────────────────────────── */}
      <V5Header backHref="/" backLabel="Início" />

      {/* ── VISÃO SECTION — cream bg ─────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-5 md:px-8">

          <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-5">
            Nossa visão
          </p>

          <div className="space-y-7 text-[16px] md:text-[17px] leading-[1.9] text-slate-600">
            <p>
              A DominionArts nasceu da convicção de que certos objetos transcendem a decoração. Eles carregam em si camadas de tempo, técnica e intenção humana — e, quando bem compreendidos e preservados, têm o poder de transformar o ambiente e a visão de quem os habita.
            </p>
            <p>
              Trabalhamos com arte antiga, design histórico e objetos de cultura material que sobreviveram ao tempo não por acaso, mas por qualidade intrínseca. Nossa seleção abrange esculturas, pintura, têxteis, mobiliário, cerâmica e arte sobre papel de diferentes civilizações e períodos — sempre com foco na excelência e na história documentável de cada peça.
            </p>
            <p>
              Mais do que um negócio, somos um ateliê de curadoria. Colaboramos com colecionadores, arquitetos e designers que compreendem que a beleza duradoura é um investimento — cultural e financeiro.
            </p>
          </div>

        </div>
      </section>

      {/* ── NAVY QUOTE STRIP ─────────────────────────────── */}
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
            transform: "skewY(-2deg)",
            padding: "4rem 1.5rem",
          }}
        >
          <div style={{ transform: "skewY(2deg)" }}>
            <p className="font-serif text-[24px] sm:text-[36px] md:text-[50px] lg:text-[58px] text-white font-bold tracking-[-0.03em] leading-[1.12] max-w-5xl mx-auto px-2 sm:px-8 md:px-16">
              &ldquo;Há objetos que não envelhecem — acumulam.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ── NOSSA ABORDAGEM — white bg ───────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">

          <div className="mb-10 md:mb-14">
            <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gold mb-3">
              Nossa abordagem
            </p>
            <h2 className="font-serif text-[26px] md:text-[34px] text-brand-navy tracking-[-0.02em]">
              O que nos guia em cada aquisição
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((p) => (
              <div key={p.number} className="border-t-2 border-brand-gold/25 pt-6">
                <p className="font-serif text-[40px] text-brand-gold/20 leading-none mb-4">
                  {p.number}
                </p>
                <h3 className="font-serif text-[20px] md:text-[22px] text-brand-navy mb-3">
                  {p.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-slate-500">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MANIFESTO TEASER — cream bg ──────────────────── */}
      <section className="bg-cream py-14 md:py-20 border-t border-slate-100">
        <div className="mx-auto max-w-[700px] px-5 md:px-8">

          <div className="flex items-center gap-4 mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-gold shrink-0">
              Texto fundador
            </p>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <h2 className="font-serif text-[22px] md:text-[28px] text-brand-navy tracking-[-0.02em] leading-tight mb-4">
            Domínio e Arte: o que herdamos, moldamos e legamos
          </h2>

          <p className="text-[15px] md:text-[16px] leading-[1.85] text-slate-500 mb-7">
            O ensaio que define a visão da DominionArts — uma reflexão sobre matéria, cultura, técnica, permanência e presença. Por que certos objetos atravessam o tempo e o que isso significa para quem os preserva e transmite.
          </p>

          <Link
            href="/foundational/v5"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-brand-navy border border-brand-navy/20 px-6 py-2.5 rounded-full hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all duration-200"
          >
            Ler o ensaio completo
            <span>→</span>
          </Link>

        </div>
      </section>

      <V5Footer />
    </div>
  )
}
