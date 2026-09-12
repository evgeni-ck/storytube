// Hover and active are BRANCHED, never stacked. Layering a hover: variant over
// a selected variant leaves both rules at equal specificity, so a selected chip
// can pick up the grey hover fill while keeping inverted text. YouTube chips:
// 8px radius, no border, 32px tall, selected = inverted ink.
const BASE =
  'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function Chip({ active, onClick, children, label, outlined = false, expanded }) {
  const skin = active
    ? 'bg-chip-active text-chip-active-label'
    : outlined
      ? 'border border-edge bg-transparent text-ink-2 hover:text-ink'
      : 'bg-chip text-ink hover:bg-chip-hover'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={expanded === undefined ? active : undefined}
      aria-expanded={expanded}
      aria-label={label}
      className={`${BASE} ${skin}`}
    >
      {children}
    </button>
  )
}
