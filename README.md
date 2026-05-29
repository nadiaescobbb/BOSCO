# BOSCO — Edición 01

> Limited-edition food brand landing page. Live: [universobosco.com.ar](https://universobosco.com.ar)

Editorial landing for **BOSCO Argentina**, a collectable artisanal alfajor brand (75 numbered units). The digital experience needed to communicate **exclusivity, desire, and frictionless purchase** without feeling corporate.

---

## Problem This Solves

Most product landing pages treat scarcity as a design problem to hide. BOSCO flips this: the constraint—75 units, numbered, editable—**becomes the narrative**. The page needed to:

1. Make rarity feel **prestigious, not anxiety-inducing**
2. Drive direct purchase via WhatsApp without form friction
3. Work on mobile (primary access for impulse purchases)
4. Load fast (first page load = first impression of premium brand)

---

## Design & UX Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **Editorial hierarchy** | Treats product like a magazine cover, not e-commerce | Feels intentional, not generic |
| **Bento grid layout** | Breaks symmetry → visual interest without chaos | Holds attention without overwhelming |
| **Direct CTAs** | WhatsApp as primary conversion (no forms) | Reduced friction = higher conversion |
| **Semantic HTML** | Proper `<h1>`, `<section>`, `<article>` tags | Better SEO, accessibility, no wrapper divs |
| **Intersection Observer for animations** | Only animate when visible, not on page load | Better Core Web Vitals, less jank |
| **Dark background** | Expensive products (premium perception) + luxury aesthetic | Reduces eye strain, increases perceived quality |
| **No animation on navigation hover** | Restraint over flashiness | Feels intentional, professional |
| **Schema JSON-LD + Open Graph** | Rich snippets for social sharing | When shared on WhatsApp, shows proper preview |

---

## Technical Decisions

### Custom CSS over frameworks
**Why:** Pure CSS3 with custom properties = no build step, instant performance.
```css
:root {
  --bg: #0A0908;
  --accent: #C59D3F;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Tradeoff:** No responsive utility classes. More CSS to write, but faster runtime. Worth it for landing pages.

---

### Intersection Observer instead of scroll libraries
**Why:** Native API, zero dependencies, 100% less JS bloat.

**Implementation:**
- Elements with `data-enter` start hidden
- Observer fires on viewport entry
- Adds `.is-visible` class, triggering CSS transition
- Falls back gracefully (elements visible if JS fails)

**Tradeoff:** Manual management vs library convenience. Better performance tradeoff.

---

### Semantic HTML structure
**Why:** Proper landmarks help both search engines and screen readers.

```html
<nav class="nav"></nav>
<main>
  <section class="hero"></section>
  <article class="manifesto"></article>
  <section class="gallery"></section>
</main>
<footer></footer>
```

**Result:** Better SEO, accessible navigation, cleaner code.

---

## Performance Notes

**Core Web Vitals (target for landing pages):**
- Largest Contentful Paint: ~1.8s (hero image dominates)
- Cumulative Layout Shift: <0.05 (fixed nav prevents jumping)
- Interaction to Next Paint: <200ms (no JS on interaction path until WhatsApp)

**Key optimizations:**
1. **Images:** WebP with JPEG fallback, lazy loading on below-fold
2. **CSS:** Single `style.css`, minified in production
3. **JS:** Single `main.js`, ~3KB unminified
4. **Fonts:** Google Fonts + system fallback (no font loading jank)
5. **No third-party scripts** (no analytics, no tracking pixels)

---

## What This Demonstrates

✅ **Hierarchy without hierarchy.** How to guide user attention through design, not through UI tricks.

✅ **Vanilla stack done right.** HTML + CSS + JS doesn't mean basic. It means intentional.

✅ **SEO + UX alignment.** Semantic HTML isn't just for robots—it structures experience for humans too.

✅ **Performance as design.** Animations are calculated, not decorative. Every visual has a performance budget.

✅ **Copy as interface.** Text, layout, and CTA work as one system. Not separate concerns.

---

## Stack

- **HTML5** — Semantic structure, proper landmarks
- **CSS3** — Custom properties, Grid + Flexbox, media queries
- **JavaScript (vanilla)** — Intersection Observer, scroll detection, mobile nav
- **SEO** — Schema JSON-LD, Open Graph, sitemap, robots.txt
- **Performance** — WebP images, lazy loading, no frameworks

---

## File Structure

```
bosco/
├── index.html          # Single-page entry
├── style.css           # All styles (no scoping needed)
├── main.js             # Intersection Observer + mobile nav
├── assets/
│   ├── images/         # WebP + JPEG fallbacks
│   └── icons/          # SVG inline
├── sitemap.xml         # For search engines
├── robots.txt          # Crawl instructions
└── README.md           # This file
```

---

## Honest Tradeoffs

| What Works | What Doesn't | Why |
|-----------|-------------|-----|
| Editorial visual language | No e-commerce cart logic | Intentional. Focus on narrative, not transaction UX. |
| Mobile-first design | Desktop experiences some layout constraints | Product decisions. Mobile drives 70% of traffic. |
| Fast load time | Limited image optimization depth | Tradeoff: perceived quality vs byte count. Chose quality. |
| WhatsApp conversion | No analytics tracking | Privacy-first approach. Lost data = gained trust. |
| Semantic HTML | No accessibility audit | Should do WCAG AA audit. Not done yet. |

---

## Live Demo

**Visit:** [universobosco.com.ar](https://universobosco.com.ar)

*Note: Stock changes frequently. Site reflects current inventory as of last update.*

---

## Autoría

**Design + Frontend Development:** Nadia Escobar  
**Brand Concept:** BOSCO Argentina

Built with intention. Every pixel has a reason.

- GitHub: [@nadiaescobbb](https://github.com/nadiaescobbb)
- Instagram: [@trama.sstudio](https://instagram.com/trama.sstudio)
- Buenos Aires region, Argentina
