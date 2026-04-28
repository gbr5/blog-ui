# blog-ui Design System

Companion to the DominionArts production design system at `/Volumes/T7black/projects/dominionarts`.
This document governs every page in this prototype sandbox.

---

## Principle: Mobile-First

All layouts are written mobile-first. Default styles target the smallest screens (~320px). Larger breakpoints add progressive enhancements.

**Never** write a layout for desktop and shrink it down. Always start from mobile.

---

## Breakpoints (Tailwind v4 defaults)

| Token | Width   | Target device                    |
|-------|---------|----------------------------------|
| _(default)_ | 0px+ | Small phones (320–479px)    |
| `sm`  | 640px+  | Large phones, small tablets      |
| `md`  | 768px+  | Tablets, landscape phones        |
| `lg`  | 1024px+ | Laptops, desktop                 |
| `xl`  | 1280px+ | Wide desktop (use sparingly)     |

---

## Container Strategy

Use centered, width-capped containers. Choose the cap based on page intent:

| Page type               | Mobile default | Cap at md/lg             |
|-------------------------|----------------|--------------------------|
| Instagram gateway (v1–v4) | `w-full px-5` | `max-w-sm md:max-w-md lg:max-w-lg mx-auto` |
| Editorial index (v1–v4) | `w-full px-4` | `max-w-2xl lg:max-w-4xl mx-auto` |
| Post detail             | `w-full px-4` | `max-w-xl lg:max-w-2xl mx-auto` |
| Hub / Lab index         | `w-full px-4` | `max-w-2xl mx-auto` |

Always add horizontal padding at the container level, never on child elements (except for fine-tuning).

---

## Spacing Scale

Vertical rhythm uses Tailwind spacing. On mobile use tighter values; relax at `sm`/`md`.

```
Gap/padding on mobile → relax at sm or md:

py-10 sm:py-16 md:py-24    ← page top/bottom
mb-6 sm:mb-8 md:mb-12      ← section separators
gap-3 sm:gap-4             ← grid gaps
px-5 sm:px-6 md:px-8       ← horizontal padding
```

---

## Typography

Base sizes are set for mobile. Add responsive bumps at `sm`/`md` for headings only. Body text rarely changes size.

| Role              | Mobile          | sm / md                        |
|-------------------|-----------------|--------------------------------|
| Display heading   | `text-3xl`      | `sm:text-4xl md:text-5xl`      |
| Section heading   | `text-xl`       | `sm:text-2xl`                  |
| Card title        | `text-[15px]`   | `sm:text-[17px]`               |
| Body              | `text-[14px]` / `text-sm` | (no change)        |
| Caption / label   | `text-[11px]` / `text-xs` | (no change)        |

Use `font-serif` (Playfair Display) for display/editorial headings, `font-sans` (Inter) for everything else.

---

## Images

Always set responsive heights. Never use a fixed height without a responsive override.

```tsx
// Good
className="h-48 sm:h-56 md:h-64"

// For hero/full-bleed
className="h-64 sm:h-80 md:h-96"

// Aspect-ratio is preferred over fixed height when possible
className="aspect-[4/3] sm:aspect-[16/9]"
```

Always use `object-cover` on `<img>` inside fixed-height containers.

---

## Touch Targets

All interactive elements (links, buttons) must have a minimum touch target of **44×44px** on mobile. Use `py-3 px-4` minimum on buttons, or `py-4` on list items.

---

## Grid Patterns

Start with single or 2-column on mobile, expand at breakpoints:

```tsx
// Standard content grid
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

// Compact image grid (e.g. Instagram feed strip)
grid grid-cols-3 sm:grid-cols-4

// Product/collection grid
grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
```

---

## Color Tokens

Defined in `tailwind.config` / global CSS. Always use tokens, never raw hex or oklch values in JSX except when a token doesn't exist.

| Token           | Value                        | Use                     |
|-----------------|------------------------------|-------------------------|
| `brand-navy`    | oklch(0.30 0.06 250)         | Primary text, headings  |
| `brand-gold`    | oklch(0.75 0.12 85)          | Accents, labels, CTAs   |
| `cream`         | oklch(0.97 0.01 85)          | Light background        |
| `sand-light`    | —                            | Subtle off-white        |

For dark-theme pages (V1 — Entrada), use inline rgba/oklch values as the dark palette is not tokenized yet.

---

## Variant Convention

Each new UI concept → new route:
- Instagram gateway: `/instagram/v5`, `/instagram/v6`, …
- Editorial index: `/v5`, `/v6`, …
- Post detail: `/v5/[slug]`, …

Data lives in `src/content/editorial-posts.ts`. No DB, no auth.

---

## What Not to Do

- Do not use `@media` queries in JSX — use Tailwind breakpoint prefixes.
- Do not hardcode widths like `width: 375px` — use `max-w-*` and `w-full`.
- Do not nest containers — one max-width wrapper per page.
- Do not use `vh` units for heights — they break on mobile browsers with dynamic toolbars. Use `min-h-screen` or `flex flex-col flex-1` patterns.
- Do not add desktop layouts before the mobile layout is complete.
