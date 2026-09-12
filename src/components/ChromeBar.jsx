import { Logo } from './Logo.jsx'
import { SearchBar } from './SearchBar.jsx'
import { ThemeToggle } from './ThemeToggle.jsx'

/**
 * Follows the theme like YouTube's masthead (white in light, near-black in
 * dark). Sticky so the search stays reachable while scrolling a long list.
 */
export function ChromeBar({ query, onQuery, dark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-20 flex h-[56px] items-center gap-3 bg-chrome px-4 sm:gap-6">
      <Logo />
      <SearchBar value={query} onChange={onQuery} />
      <ThemeToggle dark={dark} onToggle={onToggleTheme} />
    </header>
  )
}
