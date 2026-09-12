import { T } from '../strings.js'

/** Shown when a detail page is deep-linked before holidays.json has arrived. */
export function SkeletonDetail() {
  return (
    <div aria-busy="true" className="max-w-[960px]">
      <span className="sr-only" role="status">
        {T.loading}
      </span>
      <div aria-hidden="true">
        <div className="st-pulse mb-4 h-9 w-[100px] rounded-full" />
        <div className="st-pulse aspect-video rounded-xl" />
        <div className="st-pulse mt-4 h-7 w-[70%] rounded" />
        <div className="st-pulse mt-3 h-4 w-[40%] rounded" />
        <div className="st-pulse mt-6 h-4 w-full rounded" />
        <div className="st-pulse mt-2 h-4 w-[92%] rounded" />
        <div className="st-pulse mt-2 h-4 w-[80%] rounded" />
      </div>
    </div>
  )
}
