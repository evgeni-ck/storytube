# StoryTube

Български празници и паметни дати, разказани за деца на 7–8 години. Статичен сайт с дизайн като YouTube: карти с картинки, календар, търсене и подробна страница за всеки празник.

Bulgarian national holidays, memorial dates, folk and international days, written for 7–8-year-olds. A static React site in a YouTube-like layout, deployed to GitHub Pages.

## Развойна среда / Development

```bash
npm install
npm run dev       # http://localhost:5173 (или порт от .claude/launch.json)
npm run build     # dist/
npm run preview   # serves dist/
npm run lint      # oxlint
npm run check     # validates public/holidays.json
npm run images    # prefer public/img/<slug>.jpg|png|webp over the .svg placeholders
```

Node 20.19+ (CI uses 24). React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`, no `tailwind.config`).

## Съдържание / Content

All content lives in `public/holidays.json` and ships verbatim, so it can be edited without touching the code. Run `npm run check` after editing.

```jsonc
{
  "categories": [{ "id": "official", "label": "Официални празници" }, …],
  "holidays": [{
    "slug": "osvobozhdenie",              // stable; used in the URL (#/praznik/<slug>) and img/<slug>.svg
    "title": "…", "category": "official",
    "date": { "month": 3, "day": 3 },      // or movable: { "easterOffset": -7 } (days from Orthodox Easter Sunday)
    "durationDays": 1,                     // optional, default 1
    "year": 1878,                          // optional: shown as "преди N години"
    "summary": "…", "keywords": ["…"],     // keywords widen the search
    "sections": [{ "heading": "…", "text": "…" }],
    "funFact": "…",
    "thumbnail": "img/osvobozhdenie.svg",  // relative to the site root, never a leading "/"
    "photos": [{ "src": "img/photos/x.jpg", "caption": "…", "credit": "…", "license": "…", "sourceUrl": "…" }]
  }]
}
```

- Categories: `official`, `memorial`, `folk`, `world`. An entry with an unknown category is dropped at load.
- Writing rules: short sentences, everyday words, no graphic detail. 2–4 sections plus one fun fact per entry.
- Conventional dates worth knowing when reviewing: Левски is commemorated on 19 Feb (the Julian date 6 Feb 1873 converts to 18 Feb); the April Uprising on 20 Apr (old style); Шипка on 26 Aug (the battles were 21–23 Aug new style).

## Дати / Dates

`src/lib/dates.js` computes Orthodox Easter (Meeus's Julian algorithm + 13 days, valid 1900–2099); `npm run check` pins it against known years. Movable holidays are stored as an offset from Easter Sunday (Лазаровден −8, Цветница −7, Сирни заговезни −49, Тодоровден −43).

The landing page sorts by the next occurrence from today (a day inside a multi-day span counts as today), so the list wraps around the year. The date is re-evaluated at midnight in an open tab.

## Навигация / Routing

Hash routing (`#/` and `#/praznik/<slug>`), implemented in `src/hooks/useHashRoute.js` with no dependency. GitHub Pages serves one `index.html` and knows nothing about client routes, so path-based routes would 404 on reload; the hash never reaches the server and leaves the Pages base path untouched. Cards and the back button are real links.

## Картинки / Images

- `public/img/<slug>.svg` — flat 16:9 placeholders, one per entry, used as both thumbnail and hero. A missing file falls back to a category-coloured block.
- `public/img/<slug>.jpg|png|webp` — realistic painted illustrations generated with an AI image tool from the prompts in `docs/image-prompts.md`. Drop a file in and run `npm run images`: it repoints `thumbnail` at the raster file (or back at the SVG when none exists).
- `public/img/photos/` — public-domain / CC photos from Wikimedia Commons for the detail pages. Every photo carries `caption`, `credit`, `license` and `sourceUrl` in the data; CC BY-SA works need the author named. Never hot-link.

## Тема / Theme

Dark by default. `<html class="dark">` is committed that way and an inline script only ever *removes* the class when `localStorage.theme === 'light'`, so there is no flash. Palette tokens are `--st-*` custom properties in `src/index.css`, re-exported through `@theme inline` so utilities flip at runtime. The OS preference is deliberately not consulted.

## Публикуване / Deploy

Push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, `npm run build`, upload `dist/` to GitHub Pages. In the repo settings, **Pages → Source must be "GitHub Actions"**, not "deploy from a branch" (the branch holds unbuilt JSX).

The base path is derived from `GITHUB_REPOSITORY` in `vite.config.js`, so renaming the repo needs no edit. For a custom domain set `BASE_PATH=/` in the workflow env.

`holidays.json` is requested with `?v=<build id>` (commit SHA on CI) so a deploy never serves a stale cached copy.
