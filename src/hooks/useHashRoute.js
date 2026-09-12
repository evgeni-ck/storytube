import { useSyncExternalStore } from 'react'

// Hash routing on purpose: GitHub Pages serves one index.html and knows
// nothing about client routes, so a path like /praznik/x would 404 on reload.
// The hash never reaches the server, and it leaves BASE_URL untouched.

function subscribe(cb) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

function snapshot() {
  return window.location.hash
}

export function parseRoute(hash) {
  const [seg, slug] = hash.replace(/^#\/?/, '').split('/')
  if (seg === 'praznik' && slug) {
    return { name: 'holiday', slug: decodeURIComponent(slug) }
  }
  return { name: 'home' }
}

export function useHashRoute() {
  return parseRoute(useSyncExternalStore(subscribe, snapshot, () => ''))
}

// Cards and the back button are real links built from these, so middle-click,
// copy-link and keyboard navigation all work without any onClick handler.
export const href = {
  home: '#/',
  holiday: (slug) => `#/praznik/${encodeURIComponent(slug)}`,
}
