import { href } from '../hooks/useHashRoute.js'
import { T } from '../strings.js'

// Red plate + white play triangle, then the wordmark. It is a link home so the
// YouTube habit of "click the logo to go back to the feed" works here too.
// Metrics are mirrored by the static shell in index.html.
export function Logo() {
  return (
    <a
      href={href.home}
      aria-label={T.backToAll}
      className="flex shrink-0 items-center gap-1.5 rounded text-chrome-ink no-underline select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg width="30" height="21" viewBox="0 0 30 21" aria-hidden="true" className="block">
        <rect width="30" height="21" rx="6" fill="#ff0000" />
        <path d="M12 6l8 4.5-8 4.5z" fill="#ffffff" />
      </svg>
      {/* Hidden on the narrowest screens so logo + search + toggle fit one row
          at 375px; the play plate alone still reads as the brand. */}
      <span className="hidden text-[20px] font-bold tracking-[-0.5px] sm:inline">
        {T.siteName}
      </span>
    </a>
  )
}
