import { useEffect, useState } from 'react'

/**
 * Loads holidays.json from the deployed base path. The BASE_URL prefix
 * matters: a bare "/holidays.json" 404s once the site is served from a Pages
 * subpath.
 */
export function useHolidays() {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()

    // ?v=<build id> gives each deploy its own URL, so a cached copy from a
    // previous deploy can never win. Between deploys the URL is stable, so it
    // still caches normally.
    fetch(`${import.meta.env.BASE_URL}holidays.json?v=${__BUILD_ID__}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        const categories = Array.isArray(json.categories) ? json.categories : []
        const labels = new Map(categories.map((c) => [c.id, c.label]))
        // Drop entries whose category is not in the vocabulary, so a typo in
        // the data can't invent a chip that the filter row would never show.
        const holidays = (Array.isArray(json.holidays) ? json.holidays : [])
          .filter((h) => labels.has(h.category) && h.slug && h.date)
          .map((h) => ({
            ...h,
            categoryLabel: labels.get(h.category),
            durationDays: h.durationDays ?? 1,
            keywords: h.keywords ?? [],
            sections: h.sections ?? [],
            photos: h.photos ?? [],
          }))
        setState({ data: { categories, holidays }, loading: false, error: null })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState({ data: null, loading: false, error: err })
      })

    return () => controller.abort()
  }, [])

  return state
}

/**
 * True only once `active` has stayed true for `delay` ms. The local fetch
 * usually resolves in a few dozen ms, and a skeleton that flashes for one frame
 * reads as a glitch rather than as loading.
 */
export function useDelayed(active, delay = 150) {
  const [elapsed, setElapsed] = useState(false)

  useEffect(() => {
    if (!active) return
    const id = setTimeout(() => setElapsed(true), delay)
    return () => clearTimeout(id)
  }, [active, delay])

  // Derived rather than stored, so `active` going false needs no setState in
  // the effect. `elapsed` is never reset, which is fine here because the fetch
  // runs once per mount.
  return active && elapsed
}
