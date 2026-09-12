// Calendar arithmetic and Bulgarian formatting. Everything works on local
// midnight Dates; day differences round, so a DST shift can never produce a
// 0.9999-day gap that floors to the wrong number.

const DAY_MS = 86400000

export const MONTHS = [
  'януари', 'февруари', 'март', 'април', 'май', 'юни',
  'юли', 'август', 'септември', 'октомври', 'ноември', 'декември',
]

// Short forms for the thumbnail badge. Some months are already short.
export const MONTHS_SHORT = [
  'ян.', 'февр.', 'март', 'апр.', 'май', 'юни',
  'юли', 'авг.', 'септ.', 'окт.', 'ноем.', 'дек.',
]

// Monday-first, as every Bulgarian calendar is printed.
export const WEEKDAYS_SHORT = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд']

export function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function addDays(d, n) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
}

export function diffDays(a, b) {
  return Math.round((startOfDay(a) - startOfDay(b)) / DAY_MS)
}

/** Monday = 0 … Sunday = 6, for laying out the grid. */
export function weekdayIndex(d) {
  return (d.getDay() + 6) % 7
}

export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Orthodox Easter Sunday in the Gregorian calendar. Meeus's Julian algorithm
 * gives the Julian date; the +13 shift converts it and holds from 1900 to
 * 2099, which is all this site will ever need.
 */
export function orthodoxEaster(year) {
  const a = year % 4
  const b = year % 7
  const c = year % 19
  const d = (19 * c + 15) % 30
  const e = (2 * a + 4 * b - d + 34) % 7
  const month = Math.floor((d + e + 114) / 31) // 3 = March, 4 = April
  const day = ((d + e + 114) % 31) + 1
  return addDays(new Date(year, month - 1, day), 13)
}

export function isMovable(rule) {
  return rule != null && 'easterOffset' in rule
}

/** The date a holiday falls on in a given year. */
export function resolveDate(rule, year) {
  if (isMovable(rule)) return addDays(orthodoxEaster(year), rule.easterOffset)
  return new Date(year, rule.month - 1, rule.day)
}

/**
 * The next time a holiday happens, counted from `today`. A day inside a
 * multi-day span counts as 0 (it is happening now); once the span is over the
 * holiday rolls to next year, which is what makes the list wrap around.
 */
export function nextOccurrence(holiday, today) {
  const base = startOfDay(today)
  const span = holiday.durationDays ?? 1
  for (const year of [base.getFullYear(), base.getFullYear() + 1]) {
    const start = resolveDate(holiday.date, year)
    const end = addDays(start, span - 1)
    if (diffDays(end, base) >= 0) {
      return { start, end, days: Math.max(0, diffDays(start, base)) }
    }
  }
  // Unreachable: next year's occurrence is always in the future.
  const start = resolveDate(holiday.date, base.getFullYear() + 1)
  return { start, end: start, days: diffDays(start, base) }
}

/** '2026-09-22' — a sortable, locale-free key for calendar cells. */
export function dayKey(d) {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function parseDayKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatLong(d) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function formatShort(d) {
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`
}

export function formatWithYear(d) {
  return `${formatLong(d)} ${d.getFullYear()} г.`
}

export function monthTitle(year, month) {
  const name = MONTHS[month]
  return `${name[0].toUpperCase()}${name.slice(1)} ${year}`
}
