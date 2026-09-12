import { formatShort } from '../lib/dates.js'
import { T } from '../strings.js'

// Sits where YouTube puts the video duration: bottom-right of the thumbnail.
// Red when the holiday is happening today so it jumps out of the grid.
export function DateBadge({ date, isToday }) {
  return (
    <span
      className={`absolute right-2 bottom-2 rounded px-1.5 py-0.5 text-[12px] font-medium ${
        isToday ? 'bg-accent text-on-accent' : 'bg-badge text-white'
      }`}
    >
      {isToday ? T.today : formatShort(date)}
    </span>
  )
}
