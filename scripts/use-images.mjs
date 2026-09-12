// Points every holiday at a raster illustration when one exists next to its
// SVG (public/img/<slug>.jpg|png|webp), else back at the SVG. Run with
// `npm run images` after dropping generated pictures into public/img/.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const file = join(root, 'public/holidays.json')
const data = JSON.parse(readFileSync(file, 'utf8'))

// First match wins, so a .jpg beats a .png for the same slug.
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg']
let raster = 0
let changed = 0

for (const h of data.holidays) {
  const ext = EXTENSIONS.find((e) => existsSync(join(root, 'public/img', `${h.slug}.${e}`)))
  if (!ext) continue
  if (ext !== 'svg') raster++
  const next = `img/${h.slug}.${ext}`
  if (h.thumbnail !== next) {
    h.thumbnail = next
    changed++
  }
}

writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
console.log(` ✓ ${raster} raster, ${data.holidays.length - raster} svg thumbnails; ${changed} updated`)
