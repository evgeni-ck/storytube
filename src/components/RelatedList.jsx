import { Thumb } from './Thumb.jsx'
import { href } from '../hooks/useHashRoute.js'
import { formatLong } from '../lib/dates.js'
import { T } from '../strings.js'

/** YouTube's "up next" column: small thumbnail on the left, text on the right. */
export function RelatedList({ holidays }) {
  if (!holidays.length) return null
  return (
    <section aria-label={T.related}>
      <h2 className="m-0 mb-3 text-[16px] font-medium text-ink">{T.related}</h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {holidays.map((h) => (
          <li key={h.slug}>
            <a
              href={href.holiday(h.slug)}
              className="flex gap-2 rounded-lg text-ink no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Thumb src={h.thumbnail} alt="" category={h.category} className="!w-[168px] shrink-0 rounded-lg" />
              <div className="min-w-0">
                <h3 className="m-0 line-clamp-2 text-[14px]/[20px] font-medium">{h.title}</h3>
                <p className="m-0 mt-1 text-[12px] text-ink-2">
                  {h.categoryLabel} · {formatLong(h.next.start)}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
