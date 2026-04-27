export type Category =
  | "visao"
  | "educacao-visual"
  | "guia-do-colecionador"
  | "design-de-interiores"

export type FeaturedContext =
  | "foundational"
  | "editorial"
  | "collection"
  | "seasonal"
  | "product-linked"

export type PresentationStyle =
  | "default"
  | "foundational"
  | "essay"
  | "visual-editorial"
  | "product-linked"

export type EditorialPost = {
  slug: string
  title: string
  excerpt: string
  category: Category
  publishedAt: string
  image?: string
  isFeatured?: boolean
  featuredRank?: number
  featuredContext?: FeaturedContext
  presentationStyle?: PresentationStyle
}

export const CATEGORY_LABELS: Record<Category, string> = {
  visao: "Visão",
  "educacao-visual": "Educação Visual",
  "guia-do-colecionador": "Guia do Colecionador",
  "design-de-interiores": "Design de Interiores",
}

export const editorialPosts: EditorialPost[] = [
  {
    slug: "dominio-e-arte-o-que-herdamos-moldamos-e-legamos",
    title: "Domínio e Arte: o que herdamos, moldamos e legamos",
    excerpt:
      "O texto fundador da DominionArts: uma reflexão sobre matéria, cultura, técnica, permanência e presença.",
    category: "visao",
    publishedAt: "2026-04-23",
    image: "https://picsum.photos/seed/dominio/1200/800",
    isFeatured: true,
    featuredRank: 1,
    featuredContext: "foundational",
    presentationStyle: "foundational",
  },
  {
    slug: "beleza-como-heranca",
    title: "Beleza como herança",
    excerpt:
      "Por que certos objetos atravessam o tempo não apenas como decoração, mas como memória material.",
    category: "visao",
    publishedAt: "2026-04-24",
    image: "https://picsum.photos/seed/beleza/800/600",
    isFeatured: true,
    featuredRank: 2,
    featuredContext: "editorial",
    presentationStyle: "essay",
  },
  {
    slug: "o-peso-da-materia",
    title: "O peso da matéria",
    excerpt:
      "Reflexões sobre a física e a filosofia dos objetos que escolhemos conservar.",
    category: "visao",
    publishedAt: "2026-04-25",
    image: "https://picsum.photos/seed/materia/800/600",
    isFeatured: true,
    featuredRank: 3,
    featuredContext: "editorial",
    presentationStyle: "essay",
  },
  {
    slug: "como-ler-uma-obra",
    title: "Como ler uma obra: guia para iniciantes",
    excerpt:
      "Os elementos visuais que todo colecionador deve aprender a identificar antes de qualquer aquisição.",
    category: "educacao-visual",
    publishedAt: "2026-04-20",
    image: "https://picsum.photos/seed/obra/800/600",
  },
  {
    slug: "proveniencia-e-autenticidade",
    title: "Proveniência e autenticidade no mercado de arte",
    excerpt:
      "Como verificar a origem de uma peça e por que isso importa tanto quanto o próprio objeto.",
    category: "guia-do-colecionador",
    publishedAt: "2026-04-18",
    image: "https://picsum.photos/seed/proveniencia/800/600",
  },
  {
    slug: "espacos-que-falam",
    title: "Espaços que falam: arte e arquitetura em diálogo",
    excerpt:
      "A relação entre o objeto e o ambiente: como a escolha de placement define a experiência.",
    category: "design-de-interiores",
    publishedAt: "2026-04-15",
    image: "https://picsum.photos/seed/espacos/800/600",
  },
  {
    slug: "primeiro-objeto",
    title: "O primeiro objeto: como começar uma coleção",
    excerpt:
      "Orientação prática e filosófica para quem está dando os primeiros passos no colecionismo.",
    category: "guia-do-colecionador",
    publishedAt: "2026-04-12",
    image: "https://picsum.photos/seed/colecao/800/600",
  },
  {
    slug: "textura-e-tempo",
    title: "Textura e tempo: a patina como linguagem",
    excerpt:
      "O envelhecimento dos materiais não é deterioração — é acúmulo de história e significado.",
    category: "educacao-visual",
    publishedAt: "2026-04-08",
    image: "https://picsum.photos/seed/textura/800/600",
  },
]
