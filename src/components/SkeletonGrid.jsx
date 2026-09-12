import { T } from '../strings.js'

// Skeleton chips as well as cards: the category vocabulary arrives in the same
// fetch, so rendering real filters over placeholder cards would offer controls
// that cannot work yet.
const CHIP_WIDTHS = ['72px', '150px', '160px', '140px', '150px']

export function SkeletonGrid() {
  return (
    <div aria-busy="true">
      <span className="sr-only" role="status">
        {T.loading}
      </span>

      <div aria-hidden="true" className="mb-4 flex gap-2 overflow-hidden">
        {CHIP_WIDTHS.map((w, i) => (
          <div key={i} className="st-pulse h-8 shrink-0 rounded-lg" style={{ width: w }} />
        ))}
      </div>

      <div aria-hidden="true" className="st-pulse mb-4 h-[14px] w-[90px] rounded" />

      <div aria-hidden="true" className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="st-pulse aspect-video rounded-xl" />
            <div className="st-pulse mt-3 h-[18px] w-[85%] rounded" />
            <div className="st-pulse mt-2 h-[14px] w-[55%] rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
