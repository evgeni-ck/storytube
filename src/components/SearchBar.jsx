import { useEffect, useRef } from 'react'
import { Icon } from './Icon.jsx'
import { T } from '../strings.js'

export function SearchBar({ value, onChange }) {
  const ref = useRef(null)

  // "/" focuses search, Escape clears it — but never while the user is already
  // typing somewhere.
  useEffect(() => {
    function onKey(e) {
      const el = document.activeElement
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
      if (e.key === '/' && !typing) {
        e.preventDefault()
        ref.current?.focus()
      } else if (e.key === 'Escape' && el === ref.current) {
        onChange('')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onChange])

  return (
    // min-w-0 is load-bearing: without it this flex child refuses to shrink
    // below its content width and shoves the theme toggle off a 375px screen.
    // The wrapper owns the border and the focus state; the input is stripped
    // bare by .st-input so no second ring can draw inside the rounded edge.
    // max-w keeps it YouTube-like: a centred pill, not a full-width bar.
    <div className="group mx-auto flex h-[40px] w-full min-w-0 max-w-[640px] items-center rounded-full border border-search-edge bg-search pl-4 transition-colors focus-within:border-search-focus">
      <span className="text-search-placeholder transition-colors group-focus-within:text-search-ink">
        <Icon name="search" size={16} />
      </span>
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={T.searchPlaceholder}
        aria-label={T.searchLabel}
        className="st-input h-full min-w-0 flex-1 pl-2.5 pr-4 text-[16px] text-search-ink placeholder:text-search-placeholder"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={T.clear}
          className="mr-1 flex size-8 shrink-0 items-center justify-center rounded-full text-search-ink hover:bg-chrome-hover focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  )
}
