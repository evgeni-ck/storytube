import { useEffect, useMemo } from 'react'
import { CategoryChips } from '../components/CategoryChips.jsx'
import { HolidayGrid } from '../components/HolidayGrid.jsx'
import { MiniCalendar } from '../components/MiniCalendar.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { Chip } from '../components/Chip.jsx'
import { Icon } from '../components/Icon.jsx'
import { filterHolidays, occurrencesInMonth } from '../lib/holidays.js'
import { formatLong, formatShort } from '../lib/dates.js'
import { T, holidayCount } from '../strings.js'

export function HomePage({
  categories, sorted, today, query, selected, onToggleCategory, onReset,
  selectedDay, onSelectDay, cal, onCalChange, onGoToday, calOpen, onToggleCal, onSaveScroll,
}) {
  // Remember where the list was scrolled so coming back from a detail page
  // lands on the same card. Runs on unmount only.
  useEffect(() => () => onSaveScroll(window.scrollY), [onSaveScroll])

  const visible = useMemo(
    () => filterHolidays(sorted, { query, categories: selected, day: selectedDay }),
    [sorted, query, selected, selectedDay],
  )

  const marks = useMemo(
    () => occurrencesInMonth(sorted, cal.year, cal.month),
    [sorted, cal.year, cal.month],
  )

  const filtering = selected.size > 0
  const activeLabels = categories.filter((c) => selected.has(c.id)).map((c) => c.label)

  const calendar = (
    <MiniCalendar
      year={cal.year}
      month={cal.month}
      today={today}
      marks={marks}
      selectedDay={selectedDay}
      onSelectDay={onSelectDay}
      onMonthChange={onCalChange}
      onGoToday={onGoToday}
    />
  )

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
      <div className="min-w-0">
        {/* Below lg the calendar collapses behind this toggle; when a day is
            picked while collapsed, the toggle shows it so the active filter
            is never invisible. */}
        <div className="mb-3 flex items-center gap-2 lg:hidden">
          <Chip onClick={onToggleCal} expanded={calOpen} active={calOpen} label={calOpen ? T.hideCalendar : T.showCalendar}>
            <Icon name="calendar" size={16} />
            {selectedDay && !calOpen ? formatShort(selectedDay) : T.calendar}
          </Chip>
          {selectedDay && !calOpen && (
            <Chip outlined onClick={() => onSelectDay(null)} label={T.clearDay}>
              <Icon name="x" size={14} />
              {T.clear}
            </Chip>
          )}
        </div>
        {calOpen && <div className="mb-4 lg:hidden">{calendar}</div>}

        <CategoryChips
          categories={categories}
          selected={selected}
          onToggle={onToggleCategory}
          onReset={onReset}
          filtering={filtering}
        />

        <p className="m-0 mb-4 text-[14px] text-ink-2" aria-live="polite">
          {holidayCount(visible.length)}
          {activeLabels.length > 0 && T.inCategories(activeLabels)}
          {selectedDay && T.onDay(formatLong(selectedDay))}
        </p>

        {visible.length > 0 ? (
          <HolidayGrid holidays={visible} />
        ) : (
          <EmptyState title={T.empty} hint={T.emptyHint} />
        )}
      </div>

      {/* Sticky below the 56px chrome bar on wide screens. */}
      <aside className="hidden lg:block">
        <div className="sticky top-[72px]">{calendar}</div>
      </aside>
    </div>
  )
}
