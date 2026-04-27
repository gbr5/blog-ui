import {
  type EditorialPost,
  type Category,
  editorialPosts,
} from "@/content/editorial-posts"

export function getFoundationalPost(posts: EditorialPost[]): EditorialPost | undefined {
  return posts
    .filter((p) => p.isFeatured && p.featuredContext === "foundational")
    .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999))[0]
}

export function getFeaturedEditorialPosts(posts: EditorialPost[]): EditorialPost[] {
  return posts
    .filter((p) => p.isFeatured && p.featuredContext !== "foundational")
    .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999))
}

export function getLatestPosts(posts: EditorialPost[]): EditorialPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostsByCategory(posts: EditorialPost[], category: Category): EditorialPost[] {
  return posts.filter((p) => p.category === category)
}

export function getCategoryCount(
  posts: EditorialPost[]
): Record<string, number> {
  return posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1
    return acc
  }, {})
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr + "T12:00:00"))
}

export function formatDateShort(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr + "T12:00:00"))
}

// Convenience: all posts pre-loaded
export const allPosts = editorialPosts
