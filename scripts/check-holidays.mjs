// Data validator: run with `npm run check`. Catches the mistakes a JSON file
// cannot catch itself - duplicate slugs, unknown categories, missing art,
// absolute asset paths that would break under a Pages subpath - and pins the
// Orthodox Easter algorithm to known dates.
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { orthodoxEaster } from '../src/lib/dates.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(readFileSync(join(root, 'public/holidays.json'), 'utf8'))
const errors = []

const categories = new Set((data.categories ?? []).map((c) => c.id))
if (!categories.size) errors.push('no categories defined')

const slugs = new Set()
for (const h of data.holidays ?? []) {
  const where = `[${h.slug ?? '?'}]`
  if (!h.slug || !/^[a-z0-9-]+$/.test(h.slug)) errors.push(`${where} slug must be lowercase latin with dashes`)
  if (slugs.has(h.slug)) errors.push(`${where} duplicate slug`)
  slugs.add(h.slug)
  if (!categories.has(h.category)) errors.push(`${where} unknown category "${h.category}"`)
  if (!h.title || !h.summary) errors.push(`${where} missing title or summary`)
  const d = h.date ?? {}
  const fixed = Number.isInteger(d.month) && Number.isInteger(d.day) && d.month >= 1 && d.month <= 12 && d.day >= 1 && d.day <= 31
  const movable = Number.isInteger(d.easterOffset)
  if (fixed === movable) errors.push(`${where} date must be {month, day} or {easterOffset}`)
  if (!Array.isArray(h.sections) || h.sections.length < 2) errors.push(`${where} needs at least 2 sections`)
  for (const src of [h.thumbnail, ...(h.photos ?? []).map((p) => p.src)]) {
    if (!src) continue
    if (src.startsWith('/')) errors.push(`${where} "${src}" must be relative (no leading /)`)
    else if (!existsSync(join(root, 'public', src))) errors.push(`${where} missing file public/${src}`)
  }
  for (const p of h.photos ?? []) {
    if (!p.caption || !p.credit || !p.license) errors.push(`${where} photo ${p.src} needs caption, credit and license`)
  }
}

// Known Orthodox Easter Sundays (Gregorian).
const EASTER = { 2024: '5-5', 2025: '4-20', 2026: '4-12', 2027: '5-2', 2028: '4-16', 2029: '4-8', 2030: '4-28' }
for (const [year, expected] of Object.entries(EASTER)) {
  const e = orthodoxEaster(Number(year))
  const got = `${e.getMonth() + 1}-${e.getDate()}`
  if (got !== expected) errors.push(`orthodoxEaster(${year}) = ${got}, expected ${expected}`)
}

if (errors.length) {
  console.error(errors.map((e) => ` ✗ ${e}`).join('\n'))
  process.exit(1)
}
console.log(` ✓ ${slugs.size} holidays, ${categories.size} categories, Easter table OK`)
