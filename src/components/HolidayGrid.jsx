import { HolidayCard } from './HolidayCard.jsx'

// A real grid, not CSS columns as in vitshub: every card has the same
// 16:9 thumbnail plus a clamped title, so rows line up like YouTube's feed.
export function HolidayGrid({ holidays }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {holidays.map((h) => (
        <HolidayCard key={h.slug} holiday={h} />
      ))}
    </div>
  )
}
