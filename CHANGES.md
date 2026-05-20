# Editorial Academic redesign — change log

Applied the design direction from `preview-hero.html` and `DESIGN-REVIEW.md` across the whole site. Reference files (`preview-hero.html`, `DESIGN-REVIEW.md`, `todo.html`, `script.js`) are untouched.

## `styles.css` — full rewrite (~2500 → ~1000 lines)
- New token system: ink (`#0F1B2D`, `#18253B`), cream + opacity scale, bronze (`#8A6438` accent / `#B98E5D` decorative), optional teal, modular type scale, 4/8/pill radii, ink-tinted shadow scale.
- Unified card style shared by `.skill-category`, `.exp-card`, `.education-card`, `.contact-link`, `.contact-card`, `.certifications`, `.stat-card` — `#18253B` fill, 1px cream-10% border, 4px radius, hover lifts to 25% border + soft shadow.
- Buttons: primary = cream pill with ink text; secondary = transparent with cream-25% border, 8px radius.
- Deleted: every `body.dark-mode` rule (whole site is now editorial dark by default), unused `#projects` styles, gradient-heavy timeline line, mustard/cornflower palette tokens, generic underline element styling.
- Added: body-wide warm SVG film-grain overlay at ~2% (fixed, blend-mode overlay, pointer-events none).

## `index.html` — full rewrite
- Nav logo: "KP" monogram → "Kedar Phadke" wordmark in Fraunces cream.
- Fonts: Playfair → Fraunces (variable, ital + opsz axes). Inter kept.
- Hero matches `preview-hero.html` exactly (eyebrow, italic `<em>PhD</em>`, Inter subtitle, cream primary CTA, hairline stat cards).
- All four skill-icon emojis (⚙ 📊 🎓 👥) → Lucide-style bronze SVGs (briefcase, bar-chart, mortarboard, users) at 1.5px stroke.
- Contact-link icons (✉ "in" 🌐) → bronze SVGs (mail, LinkedIn brand mark, globe).
- Cert checkmarks (HTML entity `&#10003;`) → bronze SVG check polylines.
- Italic `<em>` accents on every section h2; eyebrow labels added (`01 — Background` through `05 — Connect`).
- Education section structure preserved; new styles handle the visual change.
- Favicon updated to ink-on-bronze KP monogram.

## `portfolio.html` — full rewrite
- Stripped the ~950-line inline `<style>` block; now links to `styles.css` like `index.html`.
- HTML restructured to use the new component classes (`.exp-card`, `.skills-grid`, unified card style, etc.) — old `.timeline-item` / `.timeline-dot` / `.timeline-content` markup gone.
- Experience section uses a single-column stack of `.exp-card`s (no sticky timeline nav, since portfolio's inline script doesn't run the IntersectionObserver that drives it).
- Kept the simpler 3-field form (email / subject / message) and inline script — it's the page's only meaningful difference from `index.html`.
- Same favicon + Fraunces/Inter font loading as `index.html`.

## Scope decisions worth flagging
- **Theme toggle removed from the nav.** Spec #9 said "keep the circle icon functional," but spec #1 said "deep ink for ALL sections" and `preview-hero.html` (the approved reference) has no toggle. A toggle with no light mode to switch to is worse than no toggle. `script.js` still has the toggle functions — they're harmless dead code now. Add back by reintroducing the button + a `body.light-mode` palette if you want it.
- **`script.js` not touched.** The `dark-mode` class it still adds on init has no matching CSS, so it has no visual effect.
- **Responsive verified by stylesheet:** breakpoints at 1024 (timeline collapses), 968 (hero stacks, about/contact stack), 768 (hamburger menu, single-column stats, buttons go full-width), 400 (smaller numerals, tighter section padding).

---

## Revision pass — quieting the editorial flourishes

Five targeted edits to `index.html`, `styles.css`, and `portfolio.html`. `preview-hero.html`, `DESIGN-REVIEW.md`, `todo.html`, and `script.js` untouched.

- **Eyebrow labels removed.** All five "01 — Background" / "02 — Capabilities" / "03 — Career" / "04 — Academic" / "05 — Connect" spans pulled from both HTML files. `.eyebrow` rule deleted from `styles.css`. `.section-header` gains a small `padding-top: var(--space-3)` to keep the h2 from feeling jammed against the section's top edge. `.hero-eyebrow` (the "PhD · Educator · Consultant" line in the hero) stays — that's a different class on a different component.
- **Italic `<em>` accents stripped from every section/card heading.** Removed from "About Me", "Skills & Expertise", "Professional Experience", "Get In Touch", "Let's start a conversation", "Open for opportunities", and "Send a Message" (modal — same flourish, same fate). The lone surviving italic is the hero's `Kedar Phadke, <em>PhD</em>`. Corresponding CSS rules (`.section-header h2 em`, `.contact-info h3 em`, `.contact-card h4 em`, `.modal-header h3 em`) deleted; `.hero-text h1 em` retained.
- **First experience card header fixed.** "December 2024 — Present" and the "CURRENT ROLE" pill were visually colliding because the date's `letter-spacing: 0.18em` extends the glyph box past the visible text. Bumped `.exp-header` gap from `var(--space-2)` to `var(--space-4)`, added `padding-right: 0.18em` to `.exp-date` to absorb the trailing track, set `.exp-current` to `flex: 0 0 auto` + `white-space: nowrap` so the badge can never be squashed or wrapped onto the date. Other cards (no badge) unaffected.
- **About-Me prose width capped.** `max-width: 680px` moved from the `<p>` to the `.about-text` container so all paragraphs share one measure (~70 char lines). Certifications card on the right unchanged.
- **Skills grid forced to 2×2.** Was `repeat(auto-fit, minmax(300px, 1fr))` which fell back to 3+1 once column-width math couldn't fit four. Now `repeat(2, 1fr)` with a larger gap (`1.75rem`) and slightly more generous card padding (`var(--space-7) var(--space-6)`). The mobile breakpoint (`max-width: 768px`) explicitly collapses to single column.

---

## Positioning pass — Founder of EduAssess

Repositioning from "academic leader" to "Founder of EduAssess — building AI products for higher education." Academic background now supports the founder identity rather than leading it. Mirrored across `index.html` and `portfolio.html`; new styles in `styles.css`; reference files (`preview-hero.html`, `DESIGN-REVIEW.md`, `todo.html`, `script.js`) untouched.

**Added**
- **New "Currently Building" section** (`#building`) between About and Skills. One prominent featured card with the EduAssess brand block at top (logo + wordmark + subtitle + overarching paragraph), bronze hairline divider, then a two-panel body (Placement Preparation + Smart Assessments & Outcome Mapping) with descriptions and bronze metric pills, ending in a left-aligned primary CTA linking to `https://www.eduassess.co.in` in a new tab. Panels are side-by-side ≥769px, stack ≤768px; the logo+wordmark block also stacks ≤768px.
- **Featured "AI & Product Development" skills card** above the existing 2×2 grid, same unified card style but more padding and a 2-column list (collapses to 1 column on mobile).
- **"Building" nav item** between About and Skills (both pages) → `#building` anchor.
- **CSS:** new `.building-card`, `.building-header`, `.building-brand`, `.building-logo`, `.building-wordmark`, `.building-overview`, `.building-divider`, `.building-panels`, `.building-panel`, `.building-panel-icon`, `.building-pills`, `.building-footer`, `.skill-featured` rules. Responsive breakpoints at 968 and 768.

**Updated**
- **Page title:** "Kedar Phadke, PhD | Founder, EduAssess · Building AI for Higher Education".
- **Hero:** eyebrow → "Founder · PhD · Builder". Subtitle → "Founder, EduAssess · AI Products for Higher Education". Intro paragraph rewritten around EduAssess and 30+ years of higher-ed depth.
- **About Me:** subtitle → "Bringing academic rigor and three decades of operational depth to AI product building". Inserted new EduAssess/AI Catalyst paragraph immediately after the opening intro paragraph (between the "30 years" framer and the Pune teaching paragraph) so the narrative reads framing → present-day product → past context.
- **Certifications:** AI Catalyst Program (Outskill, 24-week) added at the top of the list; three existing certifications preserved.
- **Experience top card:** title → "Founder, EduAssess & Visiting Faculty"; description rewritten to lead with EduAssess and the AI Catalyst Program; metric pills → "Founder · EduAssess", "200+ Students", "AI Catalyst Graduate". "CURRENT ROLE" badge kept.
- **Contact intro paragraph:** rewritten to open with EduAssess (universities + educational institutions), then AI consulting + academic collaborations + teaching partnerships, ending with a direct "let's talk" call.

**File dependency added**
- `EduAssess logo.svg` is referenced from both HTML files (URL-encoded as `EduAssess%20logo.svg` because the filename contains a space). Logo file was not renamed or modified.

**Consistency check (manual sweep)**
- No eyebrow labels (`01 — …` etc.) anywhere — confirmed removed from both pages.
- Only italic `<em>` on the site is the hero h1 `Kedar Phadke, <em>PhD</em>`.
- All cards (Certifications, Currently Building + its sub-panels, Skill Featured, Skill Categories, Experience, Education, Contact links, Contact card) share `--ink-700` fill + `--cream-10` border + `translateY(-2px)` hover.
- Bronze used only for accents (icons, dividers, pills, dates, hero PhD italic). Primary CTAs (Get in Touch, Visit eduassess.co.in, Send a Message) are cream-on-ink.
- Fonts: Fraunces for display + select titles, Inter for everything else.
- Film-grain overlay (`body::after`) still present, untouched.

---

## Two corrections

- **EduAssess logo image removed from the Currently Building card.** Stripped the `<img class="building-logo" src="EduAssess%20logo.svg">` from both `index.html` and `portfolio.html`, along with the `<div class="building-brand">` flex wrapper that existed only to align the logo against the wordmark. The `.building-wordmark` ("EduAssess" Fraunces title + Inter subtitle) now sits directly at the top-left of the card with `margin-bottom: var(--space-5)` to space it from the overarching paragraph below — reads as a clean editorial title block, no negative space where the logo used to be. The logo file (`EduAssess logo.svg`) is still in the project folder, just no longer referenced. CSS `.building-brand` and `.building-logo` rules deleted from `styles.css`; mobile breakpoint also cleaned up (no more `flex-direction: column` for the brand block since it's gone).
- **Card padding dialed down ~17%.** `.building-card` padding `3rem` → `2.5rem` (desktop), `2.25rem` → `1.9rem` (≤968px), `1.75rem 1.5rem` → `1.5rem 1.25rem` (≤768px). Visual weight feels more proportional to neighboring sections; still reads as the featured item on the page.
- **Cache-buster bumped to `styles.css?v=12`** in both HTML files. On audit, the HTML for the Education & Training and Leadership cards is intact (both have a complete `<h3>` with the bronze SVG icon + Fraunces title), and the `.skill-category h3` CSS rule renders them identically to Project Management and Data & Analytics. The most likely cause of the missing-titles render was a stale browser cache of the previous `?v=11` stylesheet — bumping forces a fresh load. No HTML edits were needed to "restore" those titles; they were never actually removed.

---

## Three corrections — factual + content trims

- **About Me — factual correction.** The "decades teaching" framing in the EduAssess/AI-Catalyst paragraph was wrong. Replaced with "23 years in industry and 13 years in academia teaching and mentoring 1,000+ students" in both HTML files. Rest of the paragraph unchanged.
- **Currently Building — pill removed.** "Placement Office Workflow" pill removed from the Placement Preparation panel; the panel now shows three pills (Progressive Mock Interviews / AI Question Generation / Readiness Analytics). Smart Assessments panel's pills untouched.
- **Hero stats — "7 Research Papers" → "AI Catalyst / Graduate".** Same `.stat-card` markup and classes, so the styling (bronze Fraunces stat-number, uppercase tracked cream stat-label, 4px-radius card with cream-10% border + hover lift) is identical to the other three blocks. Layout stays 2×2.
- **Cache-buster bumped to `styles.css?v=13`** in both `index.html` and `portfolio.html`. No CSS changes this pass, but the bump ensures any earlier-stuck `?v=12` cache reloads cleanly.
