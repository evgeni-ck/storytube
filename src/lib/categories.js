// Literal class strings keyed by category id. Tailwind v4 only emits classes
// it can see in source, so these must never be assembled from data.
export const CATEGORY_SKIN = {
  official: 'bg-emerald-600 text-white',
  memorial: 'bg-slate-600 text-white',
  folk: 'bg-amber-500 text-white',
  world: 'bg-sky-600 text-white',
}

// Small coloured dot beside the category name on cards and detail pages.
export const CATEGORY_DOT = {
  official: 'bg-emerald-500',
  memorial: 'bg-slate-400',
  folk: 'bg-amber-400',
  world: 'bg-sky-500',
}
