# DominionArts UI Lab — Testing Roadmap

Tracks the design testing schedule for blog-ui. Each phase has a clear goal and definition of done.
Pages are validated here before being ported to the production app at `/Volumes/T7black/projects/dominionarts`.

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🔄 | In progress |
| ⬜ | Planned |
| 🔮 | Stretch / future |

---

## Phase 0 — V5 "Presença" Foundation ✅

Core design language established. All future variants build on this.

| Item | Route | Status |
|------|-------|--------|
| Blog index V5 | `/v5` | ✅ |
| Blog post V5 | `/v5/[slug]` | ✅ |
| Instagram gateway V5 | `/instagram/v5` | ✅ |
| V5 sticky header component | `components/v5-header.tsx` | ✅ |
| Mobile-first responsive (all instagram) | `/instagram/v1–v4` | ✅ |
| DESIGN.md documentation | `DESIGN.md` | ✅ |

**Design decisions locked in Phase 0:**
- Hero image fills `calc(100svh - 56px)` → header peeks at bottom fold → CSS sticky
- Pullquote: full-width navy strip, `skewY(-2deg)` container + counter-skew text
- Post bottom: author → related products → related posts
- Color break rhythm: cream → navy break → white → sand

---

## Phase 1 — V5 Completion ✅

Finishing the V5 design system: shared footer, Instagram hero parity, foundational page.

| Item | Route | Status | Notes |
|------|-------|--------|-------|
| V5 Footer component | `components/v5-footer.tsx` | ✅ | Based on dominionarts footer: brand-navy bg, editorial manifesto line, 3-col nav, newsletter |
| V5 Footer → Blog + Post | `/v5`, `/v5/[slug]` | ✅ | Replaces sand strip at bottom |
| Instagram V5 — hero image + sticky header | `/instagram/v5` | ✅ | Same hero pattern as blog (full-bleed → header peeks → sticks) |
| Foundational V5 page | `/foundational/v5` | ✅ | See design spec below |
| Update foundational index | `/foundational` | ✅ | F5 entry added |

### Foundational V5 design spec (F5 — Presença Máxima)

The foundational text deserves a page that feels ceremonial. More sophisticated than a regular post.

**Key differentiators:**
- **Full-screen hero** (`h-svh`) — maximum immersion, no peeking header. The image fills the entire first viewport.
- **Centered title treatment** — DA monogram large (~72px) at top of hero, title centered in the lower half (not bottom-aligned like regular posts)
- **Drop cap** — First paragraph opens with a large ornamental initial letter in brand-gold
- **Margin pullquotes** (lg+) — On desktop, certain pullquotes appear in the right margin column rather than inline, creating a literary magazine feel
- **Ceremonial section headings** — Thin gold rule above + heading + thin rule below. More weight than regular posts.
- **Larger pullquote strip** — Same skewed navy treatment but larger type: `text-[36px] sm:text-[48px] md:text-[64px]`
- **Ornate divider** — Three diamond shapes (`◆ · ◆ · ◆`) instead of the simple dot
- **Background rhythm** — The "Cultura, narrativa e prosperidade" section renders on cream background for contrast, then back to white
- **Closing seal** — DA monogram in a thin gold circle, date, "Texto fundador" — a ceremonial colophon
- **No related products section** — The foundational text stands alone. No product upsell.
- **Single "próxima leitura"** — One beautifully presented card (not a grid) suggesting the next essay
- **Reading time** — "Leitura: ~8 minutos" in the meta row
- **V5Header appears after hero** (not during) — Maximum immersion on first load

---

## Phase 2 — Homepage Redesign ⬜

The `/` route is currently the UI Lab selector. This phase replaces it with a real brand homepage experience following the V5 Presença language.

**Goal:** A homepage that could be the actual DominionArts landing page — not a prototype selector.

| Item | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage V1 (Presença) | `/` | ⬜ | Replaces UI Lab index |
| Keep UI Lab accessible | `/lab` | ⬜ | Move lab to `/lab` route |

### Homepage design spec

**Sections (top → bottom):**
1. **Full-screen hero** — Brand image (could rotate or be a curated still). Large DA monogram. Tagline *"Objetos com presença"*. CTA pair: "Ver coleção" + "Ler o editorial"
2. **V5 Header** (sticky, appears after hero scroll)
3. **Collection preview strip** — 3–4 product cards in a horizontal scroll on mobile, grid on desktop. "Coleção · Novidades" label. Link to full collection.
4. **Editorial break** — The `"Cercar-se do que merece permanecer"` navy quote strip (full-width, skewed)
5. **Latest editorial** — 3 most recent posts in a light card grid
6. **Brand manifesto teaser** — Excerpt from the foundational post, with a link to read the full essay. Cream background.
7. **Instagram CTA** — Link to Instagram gateway. Image strip of recent posts.
8. **V5 Footer**

---

## Phase 3 — Section Pages ⬜

Individual section pages built in the V5 design language.

| Item | Route | Status | Notes |
|------|-------|--------|-------|
| Collection index page | `/colecao` | ⬜ | Product grid with filters, V5 header + footer |
| About / Visão page | `/sobre` | ⬜ | Brand story, timeline, foundational text teaser |
| Curadoria page | `/curadoria` | ⬜ | Services for architects + interior designers |

---

## Phase 4 — Polish & Production Prep ⬜

Final validation before porting to production.

| Item | Status | Notes |
|------|--------|-------|
| Lighthouse audit (mobile + desktop) | ⬜ | Target: 90+ on all metrics |
| Image optimization check | ⬜ | Ensure `next/image` usage everywhere, correct sizes |
| Typography scale review | ⬜ | Verify all text passes WCAG AA contrast |
| Touch target audit | ⬜ | All interactive elements ≥ 44px |
| Cross-browser check | ⬜ | Safari iOS (primary audience), Chrome, Firefox |
| Port to dominionarts | ⬜ | Approved variants moved to production app |

---

## Design language reference (V5 Presença)

Quick reference for consistency across all new pages.

| Element | Value |
|---------|-------|
| Hero height | `calc(100svh - 56px)` (header peeks at bottom) |
| Header height | `h-14` (56px) mobile, `h-[60px]` md+ |
| Pullquote | Full-width, `bg-brand-navy`, `skewY(-2deg)`, bold serif |
| Section break | `bg-brand-navy` strip with large italic quote |
| Background rhythm | white → cream → navy → white → sand |
| Footer bg | `bg-brand-navy` (= `oklch(0.30 0.06 250)`, matches dominionarts) |
| Container | `max-w-[1360px] mx-auto` for wide, `max-w-[680px]` for article |
| Article stack | Author → Related products → Related posts |
| Grid accent | Every 4th card spans 2 cols in the grid |

---

## Sessions log

| Date | Work done |
|------|-----------|
| 2026-04-28 | Phase 0 complete: V5 blog/post/instagram, mobile-first responsive, DESIGN.md |
| 2026-04-28 | Phase 1 complete: V5 footer, Instagram V5 hero + sticky header, Foundational V5 (F5) |
