import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon.jsx'
import { Chip } from './Chip.jsx'
import {
  WEEKDAYS_SHORT, dayKey, daysInMonth, formatLong, monthTitle, weekdayIndex,
} from '../lib/dates.js'
import { T, holidayCount } from '../strings.js'

const NAV =
  'flex size-8 items-center justify-center rounded-full text-ink hover:bg-chip-hover focus-visible:outline-2 focus-visible:outline-accent'

/**
 * One month, Monday-first. Fully controlled: the page owns year/month and the
 * selected day so the filter state survives a trip to a detail page.
 * Keyboard follows the ARIA grid pattern with a roving tabindex.
 */
export function MiniCalendar({ year, month, today, marks, selectedDay, onSelectDay, onMonthChange, onGoToday }) {
  const count = daysInMonth(year, month)
  const lead = weekdayIndex(new Date(year, month, 1))
  const todayKey = dayKey(today)
  const selectedKey = selectedDay ? dayKey(selectedDay) : null

  // Which day carries tabIndex=0. A keyboard move records an override for
  // the month it happened in; otherwise prefer the selection, then today,
  // else the 1st. Derived during render, so no effect is needed.
  const [focusOverride, setFocusOverride] = useState(null)
  const pendingFocus = useRef(false)
  const gridRef = useRef(null)

  let focusDay = 1
  if (focusOverride && focusOverride.year === year && focusOverride.month === month) {
    focusDay = Math.min(focusOverride.day, count)
  } else if (selectedDay && selectedDay.getFullYear() === year && selectedDay.getMonth() === month) {
    focusDay = selectedDay.getDate()
  } else if (today.getFullYear() === year && today.getMonth() === month) {
    focusDay = today.getDate()
  }
  const setFocusDay = (day, y = year, m = month) => setFocusOverride({ year: y, month: m, day })

  // After a keyboard move that changed the month, move DOM focus to the new
  // cell once it exists.
  useEffect(() => {
    if (!pendingFocus.current) return
    pendingFocus.current = false
    gridRef.current?.querySelector('[tabindex="0"]')?.focus()
  })

  function shiftMonth(delta) {
    const d = new Date(year, month + delta, 1)
    onMonthChange(d.getFullYear(), d.getMonth())
  }

  function onKeyDown(e, day) {
    const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }
    let next = null
    if (e.key in moves) next = day + moves[e.key]
    else if (e.key === 'Home') next = 1
    else if (e.key === 'End') next = count
    else if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault()
      const delta = e.key === 'PageUp' ? -1 : 1
      const target = new Date(year, month + delta, 1)
      setFocusDay(Math.min(day, daysInMonth(target.getFullYear(), target.getMonth())), target.getFullYear(), target.getMonth())
      pendingFocus.current = true
      onMonthChange(target.getFullYear(), target.getMonth())
      return
    }
    if (next === null) return
    e.preventDefault()
    if (next < 1 || next > count) {
      // Walking off the edge pages the month and lands on the matching day.
      const target = new Date(year, month, next)
      setFocusDay(target.getDate(), target.getFullYear(), target.getMonth())
      pendingFocus.current = true
      onMonthChange(target.getFullYear(), target.getMonth())
      return
    }
    setFocusDay(next)
    pendingFocus.current = true
  }

  const cells = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: count }, (_, i) => i + 1),
  ]
  while (cells.length % 7) cells.push(null)
  const rows = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))

  const selectedList = selectedKey ? marks.get(selectedKey) ?? [] : []

  return (
    <section aria-label={T.calendarLabel} className="rounded-xl bg-card p-3 text-ink">
      <div className="mb-2 flex items-center justify-between gap-1">
        <button type="button" onClick={() => shiftMonth(-1)} aria-label={T.prevMonth} className={NAV}>
          <Icon name="chevronLeft" size={18} />
        </button>
        <h2 aria-live="polite" className="m-0 text-[15px] font-medium">
          {monthTitle(year, month)}
        </h2>
        <button type="button" onClick={() => shiftMonth(1)} aria-label={T.nextMonth} className={NAV}>
          <Icon name="chevronRight" size={18} />
        </button>
      </div>

      <div role="grid" ref={gridRef} className="grid grid-cols-7 gap-y-0.5 text-center text-[13px]">
        <div role="row" className="contents">
          {WEEKDAYS_SHORT.map((w) => (
            <div key={w} role="columnheader" className="pb-1 text-[12px] text-ink-2">
              {w}
            </div>
          ))}
        </div>
        {rows.map((row, r) => (
          <div key={r} role="row" className="contents">
            {row.map((day, c) => {
              if (day === null) return <div key={c} role="gridcell" aria-hidden="true" />
              const key = dayKey(new Date(year, month, day))
              const list = marks.get(key) ?? []
              const isSelected = key === selectedKey
              const isToday = key === todayKey
              const skin = isSelected
                ? 'bg-accent text-on-accent font-medium'
                : list.length
                  ? 'font-medium text-ink hover:bg-chip-hover'
                  : 'text-ink-2 hover:bg-chip-hover'
              const label = list.length
                ? `${formatLong(new Date(year, month, day))} – ${list.map((h) => h.title).join(', ')}`
                : formatLong(new Date(year, month, day))
              return (
                <div key={c} role="gridcell" className="flex justify-center">
                  <button
                    type="button"
                    tabIndex={day === focusDay ? 0 : -1}
                    aria-pressed={isSelected}
                    aria-label={label}
                    onKeyDown={(e) => onKeyDown(e, day)}
                    onClick={() => onSelectDay(isSelected ? null : new Date(year, month, day))}
                    className={`relative flex size-9 flex-col items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-accent ${skin} ${
                      isToday && !isSelected ? 'ring-1 ring-cal-today' : ''
                    }`}
                  >
                    {day}
                    {list.length > 0 && (
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-1 size-1 rounded-full ${isSelected ? 'bg-on-accent' : 'bg-accent'}`}
                      />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[13px] text-ink-2">
        {selectedDay ? (
          <>
            <span>
              {formatLong(selectedDay)} – {selectedList.length ? holidayCount(selectedList.length) : T.noHolidaysOnDay}
            </span>
            <Chip outlined onClick={() => onSelectDay(null)} label={T.clearDay}>
              <Icon name="x" size={14} />
              {T.clear}
            </Chip>
          </>
        ) : (
          <>
            <span />
            <Chip outlined onClick={onGoToday}>{T.goToday}</Chip>
          </>
        )}
      </div>
    </section>
  )
}
