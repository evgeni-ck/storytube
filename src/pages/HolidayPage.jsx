import { useEffect, useRef } from 'react'
import { BackButton } from '../components/BackButton.jsx'
import { Thumb } from '../components/Thumb.jsx'
import { PhotoFigure } from '../components/PhotoFigure.jsx'
import { RelatedList } from '../components/RelatedList.jsx'
import { SkeletonDetail } from '../components/SkeletonDetail.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { Chip } from '../components/Chip.jsx'
import { CATEGORY_DOT } from '../lib/categories.js'
import { formatLong, isMovable } from '../lib/dates.js'
import { relatedTo } from '../lib/holidays.js'
import { T } from '../strings.js'

export function HolidayPage({ holiday, sorted, loading, onFilterCategory }) {
  const heading = useRef(null)

  // Move focus to the title so screen readers announce the new page and a
  // keyboard user's next Tab starts from the content, not the header.
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [holiday?.slug])

  if (!holiday) {
    if (loading) return <SkeletonDetail />
    return (
      <>
        <BackButton />
        <EmptyState title={T.notFound} hint={T.notFoundHint} />
      </>
    )
  }

  const { next } = holiday
  const yearsAgo = holiday.year ? next.start.getFullYear() - holiday.year : null

  return (
    <article className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
      <div className="min-w-0">
        <BackButton />

        <Thumb src={holiday.thumbnail} alt="" category={holiday.category} eager />

        <h1
          ref={heading}
          tabIndex={-1}
          className="m-0 mt-4 text-[24px]/[32px] font-bold text-ink outline-none sm:text-[28px]/[36px]"
        >
          {holiday.title}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-ink-2">
          <span className="font-medium text-ink">{formatLong(next.start)}</span>
          {isMovable(holiday.date) && <span>· {T.movableNote}</span>}
          {yearsAgo !== null && (
            <span>
              · {holiday.year} г. ({T.yearsAgo(yearsAgo)})
            </span>
          )}
          <Chip onClick={() => onFilterCategory(holiday.category)} label={T.filterBy(holiday.categoryLabel)}>
            <span className={`inline-block size-2 rounded-full ${CATEGORY_DOT[holiday.category] ?? ''}`} />
            {holiday.categoryLabel}
          </Chip>
        </div>

        <p className="m-0 mt-5 text-[19px]/[30px] text-ink">{holiday.summary}</p>

        {holiday.sections.map((s) => (
          <section key={s.heading} className="mt-6">
            <h2 className="m-0 mb-2 text-[20px]/[28px] font-bold text-ink">{s.heading}</h2>
            <p className="m-0 whitespace-pre-line text-[18px]/[30px] text-ink">{s.text}</p>
          </section>
        ))}

        {holiday.funFact && (
          <aside className="mt-8 rounded-xl border-l-4 border-accent bg-card p-4">
            <h2 className="m-0 mb-1 text-[17px] font-bold text-ink">{T.funFact}</h2>
            <p className="m-0 text-[17px]/[28px] text-ink">{holiday.funFact}</p>
          </aside>
        )}

        {holiday.photos.length > 0 && (
          <section className="mt-8">
            <h2 className="m-0 mb-3 text-[20px] font-bold text-ink">{T.photos}</h2>
            <div className="flex flex-col gap-4">
              {holiday.photos.map((p) => (
                <PhotoFigure key={p.src} photo={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="mt-10 lg:mt-0">
        <RelatedList holidays={relatedTo(holiday, sorted)} />
      </aside>
    </article>
  )
}
