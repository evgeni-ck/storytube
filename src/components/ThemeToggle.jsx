import { Icon } from './Icon.jsx'
import { T } from '../strings.js'

export function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? T.toLight : T.toDark}
      className="flex size-10 shrink-0 items-center justify-center rounded-full text-chrome-ink transition-colors hover:bg-chrome-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
    >
      <Icon name={dark ? 'sun' : 'moon'} size={20} />
    </button>
  )
}
