import { Icon } from './Icon.jsx'
import { href } from '../hooks/useHashRoute.js'
import { T } from '../strings.js'

export function BackButton() {
  return (
    <a
      href={href.home}
      className="mb-4 inline-flex h-9 items-center gap-2 rounded-full bg-chip pl-3 pr-4 text-[14px] font-medium text-ink no-underline transition-colors hover:bg-chip-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Icon name="arrowLeft" size={18} />
      {T.back}
    </a>
  )
}
