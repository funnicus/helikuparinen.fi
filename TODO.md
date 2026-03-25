# SEO / GEO Improvement Plan for helikuparinen.fi

## Phase 1 — Critical Fixes (High Impact, Low Effort)

- [ ] **Add `robots.txt`**
  - Create `public/robots.txt` with standard directives
  - Allow all crawlers, point to sitemap

- [ ] **Add dynamic `sitemap.xml`**
  - Create `src/pages/sitemap.xml.tsx` (server-rendered)
  - Pull blog slugs and painting pages from Contentful
  - Include all static pages with both `fi-FI` and `en-US` variants

- [ ] **Add `_document.tsx`**
  - Create `src/pages/_document.tsx` with global `<head>` defaults
  - Include charset, viewport, favicon, and theme-color meta tags

- [ ] **Add Open Graph + Twitter Card meta tags**
  - Add OG and Twitter meta tags to every page (`index`, `about`, `blog`, `blog/[slug]`, `paintings`)
  - Include `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`
  - Include `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

- [ ] **Add `hreflang` alternate links**
  - Add `<link rel="alternate" hreflang="fi" href="..." />` and `hreflang="en"` on all pages
  - Add `hreflang="x-default"` pointing to the Finnish version (default locale)

- [ ] **Add canonical URLs**
  - Add `<link rel="canonical" href="..." />` on every page
  - Ensure canonical points to the correct locale version

- [ ] **Fix blog index page title bug**
  - File: `src/pages/blog/index.tsx`
  - Change `<title>About me</title>` → `<title>Blog | Heli Kuparinen</title>`

- [ ] **Fix `getStaticPaths` bug in blog `[slug].tsx`**
  - File: `src/pages/blog/[slug].tsx`
  - `paths.concat(...)` doesn't mutate — change to `paths.push(...items)` or reassign
  - This ensures blog posts are pre-rendered at build time for crawlers

## Phase 2 — Structured Data & Content Quality (High Impact, Medium Effort)

- [ ] **Add JSON-LD structured data**
  - `WebSite` schema globally (in `_document.tsx` or `_app.tsx`)
  - `Person` schema on homepage and about page (artist info)
  - `VisualArtwork` schema on paintings page (per painting if possible)
  - `BlogPosting` schema on individual blog post pages
  - `BreadcrumbList` schema on all inner pages

- [ ] **Localize meta descriptions**
  - Provide Finnish-language descriptions when `locale === 'fi-FI'`
  - All pages currently have English-only descriptions regardless of locale

- [ ] **Improve page titles with branding**
  - Use consistent pattern: `"Page Name | Heli Kuparinen"` or `"Page Name — Heli Kuparinen, Taidemaalari"`
  - Localize titles for Finnish: e.g. `"Tietoa minusta | Heli Kuparinen"`

- [ ] **Fix meta description typo on paintings page**
  - File: `src/pages/paintings/index.tsx`
  - `"paintnigs"` → `"paintings"`

- [ ] **Fix HTML entity in blog meta description**
  - File: `src/pages/blog/index.tsx`
  - `"Heli&#39;s"` → `"Heli's"` (plain apostrophe in JSX)

## Phase 3 — Performance & Accessibility (Medium Impact)

- [ ] **Lazy-load gallery images below the fold**
  - File: `src/pages/paintings/index.tsx`
  - Remove `loading="eager"` from painting images (or apply it only to the first few)
  - Let Next.js default lazy-loading handle the rest

- [ ] **Fix social links in footer**
  - File: `src/components/footer/index.tsx`
  - Add `rel="noopener noreferrer"` to external links
  - Add `target="_blank"` so users don't leave the site
  - Add `aria-label="Facebook"` and `aria-label="Instagram"` for screen readers

- [ ] **Improve image alt texts**
  - File: `src/pages/about/index.tsx`
  - Change `"Picture of the author"` → `"Portrait of Heli Kuparinen, visual artist"`
  - Ensure all dynamically loaded images from Contentful have descriptive alt text

- [ ] **Add web app manifest**
  - Create `public/manifest.json` with app name, icons, theme color, background color
  - Reference it in `_document.tsx`

- [ ] **Improve mobile nav accessibility**
  - Use `aria-hidden` or `visibility: hidden` instead of `display: none` for hidden nav
  - Add `aria-expanded` attribute to hamburger button

## Phase 4 — GEO (Generative Engine Optimization)

- [ ] **Add FAQ section to About page**
  - Add a structured Q&A section about the artist
  - Add `FAQPage` JSON-LD schema so AI engines can extract answers
  - Example questions: "Who is Heli Kuparinen?", "What medium does Heli work with?", "Where is Heli based?"

- [ ] **Ensure semantic HTML throughout**
  - Verify all pages use proper `<article>`, `<section>`, `<h2>`/`<h3>` hierarchy
  - AI engines prefer well-structured content for summarization

- [ ] **Add authoritative external links**
  - Link to exhibitions, galleries, and art institutions Heli is associated with
  - Builds topical authority and trust signals for AI engines

- [ ] **Consider individual painting detail pages**
  - Create `/paintings/[slug]` routes for each artwork
  - Include full details: title, year, medium, dimensions, description, high-res image
  - Gives AI engines (and Google Image Search) much richer content to index
  - Each page gets its own `VisualArtwork` JSON-LD schema

- [ ] **Add breadcrumb navigation**
  - Visual breadcrumbs on inner pages (About, Blog, Paintings)
  - Backed by `BreadcrumbList` JSON-LD schema
  - Helps AI engines understand site hierarchy

---

## Priority Order

1. Phase 1 items (biggest SEO wins with least effort)
2. Phase 2 items (content quality & structured data)
3. Phase 3 items (performance & accessibility)
4. Phase 4 items (future-proofing for AI search)

## Notes

- The site already uses SSR/ISR via `getStaticProps` with `revalidate`, which is great for crawlability.
- The i18n setup (`fi-FI` default, `en-US` alternate) is functional but needs hreflang + localized meta to be SEO-complete.
- Contentful integration means some improvements (e.g., per-painting pages) require CMS content model changes.
