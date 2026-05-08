'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'ultradark' | 'blue' | 'love'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const THEME_STORAGE_KEY = 'portfolio-app-theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
    if (savedTheme) {
      setThemeState(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
    setMounted(true)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {!mounted ? (
        <div style={{ visibility: 'hidden' }}>{children}</div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
