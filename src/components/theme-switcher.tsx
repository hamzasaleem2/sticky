'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      className="flex items-center justify-center h-7 w-7 rounded-full border border-border bg-white text-text transition-all hover:border-main hover:scale-110 dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText dark:hover:border-main"
      onClick={() => setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')}
    >
      {theme === 'system' && <Monitor className="h-4 w-4" />}
      {theme === 'light' && <Sun className="h-4 w-4" />}
      {theme === 'dark' && <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}