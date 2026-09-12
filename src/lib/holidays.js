import { addDays, dayKey, daysInMonth, diffDays, MONTHS, nextOccurrence, resolveDate } from './dates.js'

/** Attach `next` to every holiday and order by how soon it comes. */
export function sortByUpcoming(list, today) {
  return list
    .map((h) => ({ ...h, next: nextOccurrence(h, today) }))
    .sort(
      (a, b) =>
        a.next.days - b.next.days || a.title.localeCompare(b.title, 'bg'),
    )
}

// Search covers the category label and the month name too, so typing
// "септември" or "народни" narrows the list the way a child would expect.
function haystack(h) {
  return [
    h.title,
    h.summary,
    h.categoryLabel,
    ...(h.keywords ?? []),
    MONTHS[h.next.start.getMonth()],
  ]
    .join(' ')
    .toLowerCase()
}

/** True when the holiday (any day of its span) falls on `day` in day's year. */
function fallsOn(h, day) {
  const start = resolveDate(h.date, day.getFullYear())
  const offset = diffDays(day, start)
  return offset >= 0 && offset < (h.durationDays ?? 1)
}

/**
 * Filters combine as: search AND (category in selection, or nothing selected)
 * AND (falls on the picked calendar day, or no day picked). `day` is a Date
 * from the calendar, which may be paged to another year — so the day check
 * resolves the holiday for that year rather than reusing `next`.
 */
export function filterHolidays(sorted, { query, categories, day }) {
  const q = query.trim().toLowerCase()
  return sorted.filter((h) => {
    if (q && !haystack(h).includes(q)) return false
    if (categories.size && !categories.has(h.category)) return false
    if (day && !fallsOn(h, day)) return false
    return true
  })
}

/**
 * Map of dayKey → holidays for one calendar month. Multi-day spans mark each
 * of their days, and a span that starts in the previous month still marks the
 * days that spill into this one.
 */
export function occurrencesInMonth(list, year, month) {
  const marks = new Map()
  const first = new Date(year, month, 1)
  const last = new Date(year, month, daysInMonth(year, month))
  for (const h of list) {
    // A span can start in December and spill into January, so check the
    // previous year's occurrence as well as this year's.
    for (const y of [year - 1, year]) {
      const start = resolveDate(h.date, y)
      const span = h.durationDays ?? 1
      for (let i = 0; i < span; i++) {
        const d = addDays(start, i)
        if (d < first || d > last) continue
        const key = dayKey(d)
        if (!marks.has(key)) marks.set(key, [])
        if (!marks.get(key).includes(h)) marks.get(key).push(h)
      }
    }
  }
  return marks
}

/** Same category first, then the rest — all in upcoming order, self excluded. */
export function relatedTo(holiday, sorted, n = 6) {
  const others = sorted.filter((h) => h.slug !== holiday.slug)
  const same = others.filter((h) => h.category === holiday.category)
  const rest = others.filter((h) => h.category !== holiday.category)
  return [...same, ...rest].slice(0, n)
}
