import { Icon } from './Icon.jsx'
import { T } from '../strings.js'

/** A downloaded public-domain / CC photo with its caption and credit line. */
export function PhotoFigure({ photo }) {
  return (
    <figure className="m-0 overflow-hidden rounded-xl bg-card">
      <img
        src={`${import.meta.env.BASE_URL}${photo.src}`}
        alt={photo.alt ?? photo.caption}
        loading="lazy"
        decoding="async"
        className="block max-h-[480px] w-full object-contain"
      />
      <figcaption className="px-4 py-3 text-[14px]/[20px] text-ink-2">
        <span className="text-ink">{photo.caption}</span>
        <span className="mt-1 block text-[13px]">
          {photo.credit}
          {photo.license && ` · ${photo.license}`}
          {photo.sourceUrl && (
            <>
              {' · '}
              <a
                href={photo.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-ink-2 underline hover:text-ink"
              >
                {T.photoSource}
                <Icon name="external" size={12} />
              </a>
            </>
          )}
        </span>
      </figcaption>
    </figure>
  )
}
