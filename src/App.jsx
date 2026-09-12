import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { ChromeBar } from './components/ChromeBar.jsx'
import { SkeletonGrid } from './components/SkeletonGrid.jsx'
import { EmptyState } from './components/EmptyState.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { HolidayPage } from './pages/HolidayPage.jsx'
import { useHolidays, useDelayed } from './hooks/useHolidays.js'
import { useTheme } from './hooks/useTheme.js'
import { useHashRoute, href } from './hooks/useHashRoute.js'
import { useToday } from './hooks/useToday.js'
import { useDocumentTitle } from './hooks/useDocumentTitle.js'
import { sortByUpcoming } from './lib/holidays.js'
import { T } from './strings.js'

export default function App() {
  const { data, loading, error } = useHolidays()
  const showSkeleton = useDelayed(loading)
  const { dark, toggle: toggleTheme } = useTheme()
  const route = useHashRoute()
  const today = useToday()

  // Landing filter state lives here, not in HomePage, so it survives the trip
  // to a detail page and back.
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(() => new Set())
  const [selectedDay, setSelectedDay] = useState(null)
  const [cal, setCal] = useState(() => ({ year: today.getFullYear(), month: today.getMonth() }))
  const [calOpen, setCalOpen] = useState(false)
  const homeScroll = useRef(0)

  // Cheap for ~40 items, and it keeps typing responsive if the corpus grows.
  const deferredQuery = useDeferredValue(query)

  const sorted = useMemo(
    () => sortByUpcoming(data?.holidays ?? [], today),
    [data, today],
  )

  const toggleCategory = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => setSelected(new Set()), [])

  const onCalChange = useCallback((year, month) => setCal({ year, month }), [])
  const goToday = useCallback(() => {
    setCal({ year: today.getFullYear(), month: today.getMonth() })
    setSelectedDay(null)
  }, [today])
  const saveScroll = useCallback((y) => {
    homeScroll.current = y
  }, [])

  // From a detail page: pick exactly this category and go back to the list.
  const filterCategory = useCallback((id) => {
    setSelected(new Set([id]))
    window.location.hash = href.home
  }, [])

  const holiday = route.name === 'holiday' ? sorted.find((h) => h.slug === route.slug) : null

  // Detail pages open at the top; the list comes back where it was left. The
  // browser would otherwise keep the list's scroll offset on the detail page.
  useEffect(() => {
    if (route.name === 'holiday') window.scrollTo(0, 0)
    else window.scrollTo(0, homeScroll.current)
  }, [route.name, route.slug])

  useDocumentTitle(
    route.name === 'holiday'
      ? holiday
        ? `${holiday.title} – ${T.siteName}`
        : loading
          ? T.siteTitle
          : `${T.notFound} – ${T.siteName}`
      : T.siteTitle,
  )

  return (
    <div className="min-h-screen bg-page">
      <ChromeBar query={query} onQuery={setQuery} dark={dark} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-[1280px] px-4 pb-16 pt-4">
        {error ? (
          <EmptyState title={T.error} hint={T.errorHint} />
        ) : route.name === 'holiday' ? (
          <HolidayPage
            holiday={holiday}
            sorted={sorted}
            loading={loading}
            onFilterCategory={filterCategory}
          />
        ) : showSkeleton ? (
          <SkeletonGrid />
        ) : loading ? null : (
          <HomePage
            categories={data.categories}
            sorted={sorted}
            today={today}
            query={deferredQuery}
            selected={selected}
            onToggleCategory={toggleCategory}
            onReset={reset}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            cal={cal}
            onCalChange={onCalChange}
            onGoToday={goToday}
            calOpen={calOpen}
            onToggleCal={() => setCalOpen((v) => !v)}
            onSaveScroll={saveScroll}
          />
        )}
      </main>
    </div>
  )
}
