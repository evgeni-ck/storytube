import { useState } from 'react'
import { Icon } from './Icon.jsx'
import { CATEGORY_SKIN } from '../lib/categories.js'

/**
 * 16:9 illustration. Paths in the data are relative ("img/x.svg") and get the
 * deploy base prefixed here, so the same JSON works at / and at /storytube/.
 * A missing file falls back to a category-coloured block, which keeps the
 * grid intact while the art is still being drawn.
 */
export function Thumb({ src, alt, category, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const shell = `relative aspect-video w-full overflow-hidden rounded-xl bg-chip ${className}`

  if (!src || failed) {
    return (
      <div className={`${shell} flex items-center justify-center ${CATEGORY_SKIN[category] ?? ''}`}>
        <Icon name="image" size={40} className="opacity-70" />
      </div>
    )
  }

  return (
    <div className={shell}>
      <img
        src={`${import.meta.env.BASE_URL}${src}`}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className="block size-full object-cover"
      />
    </div>
  )
}
