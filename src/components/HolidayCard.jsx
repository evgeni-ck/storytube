import { Thumb } from './Thumb.jsx'
import { DateBadge } from './DateBadge.jsx'
import { href } from '../hooks/useHashRoute.js'
import { CATEGORY_DOT } from '../lib/categories.js'
import { T } from '../strings.js'

function relativeLabel(days) {
  if (days === 0) return T.today
  if (days === 1) return T.tomorrow
  return T.inDays(days)
}

/** A YouTube video card: thumbnail with a badge, title, then two meta lines. */
export function HolidayCard({ holiday }) {
  const { next } = holiday
  return (
    <a
      href={href.holiday(holiday.slug)}
      className="group block rounded-xl text-ink no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative">
        <Thumb src={holiday.thumbnail} alt="" category={holiday.category} />
        <DateBadge date={next.start} isToday={next.days === 0} />
      </div>

      <div className="px-1 pt-3">
        <h2 className="m-0 line-clamp-2 text-[16px]/[22px] font-medium">{holiday.title}</h2>
        <p className="m-0 mt-1 flex items-center gap-1.5 text-[14px] text-ink-2">
          <span className={`inline-block size-2 shrink-0 rounded-full ${CATEGORY_DOT[holiday.category] ?? ''}`} />
          <span className="truncate">{holiday.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="shrink-0">{relativeLabel(next.days)}</span>
        </p>
        <p className="m-0 mt-1 line-clamp-2 text-[14px]/[20px] text-ink-2">{holiday.summary}</p>
      </div>
    </a>
  )
}
