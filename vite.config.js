import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// On GitHub Actions, GITHUB_REPOSITORY is "owner/repo" — derive the Pages
// subpath from it so renaming the repo never needs a config edit. Locally the
// var is unset and the app is served from the root.
//
// Two cases are served from the root instead of a subpath: a user/org site
// (<name>.github.io) and any custom domain. Detect the first; for a custom
// domain set BASE_PATH=/ in the workflow env.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserSite = repo?.toLowerCase().endsWith('.github.io')
const base = process.env.BASE_PATH ?? (repo && !isUserSite ? `/${repo}/` : '/')

// Stamped onto the holidays.json request so every deploy fetches a fresh URL.
// Vite content-hashes JS and CSS already, but a file served straight out of
// public/ keeps one URL forever and would otherwise come from cache.
const buildId = process.env.GITHUB_SHA?.slice(0, 8) ?? Date.now().toString(36)

export default defineConfig({
  base,
  define: { __BUILD_ID__: JSON.stringify(buildId) },
  plugins: [react(), tailwindcss()],
})
