import { useCallback, useEffect, useState } from 'react'

const KEY = 'theme'

function readStored() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

/**
 * The inline script in index.html has already put the right class on <html>
 * before paint, so this hook adopts that class as its initial state rather than
 * deciding the theme a second time (which would cause a flash).
 */
export function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(KEY, dark ? 'dark' : 'light')
    } catch {
      /* storage blocked — the class still applies for this session */
    }
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])

  return { dark, toggle, stored: readStored }
}
