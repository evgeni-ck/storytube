import { Chip } from './Chip.jsx'
import { Icon } from './Icon.jsx'
import { T } from '../strings.js'

export function CategoryChips({ categories, selected, onToggle, onReset, filtering }) {
  return (
    <div
      role="group"
      aria-label={T.filterGroup}
      // Single scrolling row on small screens, exactly like YouTube's chip bar;
      // the negative margin lets the row bleed to the screen edge.
      className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
    >
      <Chip active={!filtering} onClick={onReset}>
        {T.all}
      </Chip>

      {categories.map((c) => (
        <Chip key={c.id} active={selected.has(c.id)} onClick={() => onToggle(c.id)}>
          {c.label}
        </Chip>
      ))}

      {filtering && (
        <Chip outlined onClick={onReset}>
          <Icon name="x" size={14} />
          {T.clear}
        </Chip>
      )}
    </div>
  )
}
