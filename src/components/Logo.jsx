import { href } from '../hooks/useHashRoute.js'
import { T } from '../strings.js'

// A calendar whose page is the Bulgarian tricolour, then the wordmark. The
// outline and rings use currentColor so the mark stays legible on both the
// white and the near-black masthead. It links home so the YouTube habit of
// "click the logo to go back to the feed" works here too. Metrics are
// mirrored by the static shell in index.html.
export function Logo() {
  return (
    <a
      href={href.home}
      aria-label={T.backToAll}
      className="flex shrink-0 items-center gap-2 rounded text-chrome-ink no-underline select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg width="30" height="24" viewBox="0 0 30 24" aria-hidden="true" className="block">
        <defs>
          <clipPath id="st-logo-clip">
            <rect x="1.5" y="4" width="27" height="18.5" rx="4" />
          </clipPath>
        </defs>
        <g clipPath="url(#st-logo-clip)">
          <rect x="1.5" y="4" width="27" height="6.5" fill="#ffffff" />
          <rect x="1.5" y="10.5" width="27" height="6" fill="#00966e" />
          <rect x="1.5" y="16.5" width="27" height="6" fill="#d62612" />
        </g>
        <rect x="1.5" y="4" width="27" height="18.5" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="8" y="1" width="3" height="6" rx="1.5" fill="currentColor" />
        <rect x="19" y="1" width="3" height="6" rx="1.5" fill="currentColor" />
      </svg>
      {/* Hidden on the narrowest screens so logo + search + toggle fit one row
          at 375px; the calendar mark alone still reads as the brand. */}
      <span className="hidden text-[20px] font-bold tracking-[-0.5px] sm:inline">
        {T.siteName}
      </span>
    </a>
  )
}
