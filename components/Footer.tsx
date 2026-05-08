'use client'

import { useTheme } from './ThemeProvider'

type Theme = 'light' | 'dark' | 'ultradark' | 'blue' | 'love'

export default function Footer() {
  const { setTheme } = useTheme()

  const themes: { name: Theme; color: string; label: string }[] = [
    { name: 'light', color: '#173bab', label: 'DEFAULT' },
    { name: 'dark', color: '#5865F2', label: 'DARK' },
    { name: 'ultradark', color: '#00ff00', label: 'MATRIX' },
    { name: 'blue', color: '#A5B4FC', label: 'BLUE' },
    { name: 'love', color: '#FFB6C1', label: 'LOVE' },
  ]

  return (
    <footer className="w-full bg-surface border-t border-outline/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

        {/* Theme Selector Section */}
        <div className="mb-16 flex flex-col items-center">
          <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase mb-10 opacity-50 text-center">
            {'// SYSTEM_THEME_SELECTOR'}
          </h4>
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className="flex flex-col items-center group"
              >
                <div
                  style={{ backgroundColor: t.color }}
                  className="w-10 h-10 shadow-lg border border-outline/20 group-hover:scale-110 transition-transform ring-1 ring-offset-4 ring-transparent group-hover:ring-outline/50"
                ></div>
                <span className="text-[8px] mt-3 font-mono tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-black tracking-tighter text-foreground">
              cellolienrt
            </span>
            <p className="text-[10px] font-mono mt-2 opacity-50 max-w-xs text-center md:text-left">
              SENIOR MULTIPURPOSE DEVELOPER // {new Date().getFullYear()} // BUILT WITH NEXT.JS & SUPABASE
            </p>
          </div>

          <div className="flex space-x-6 text-[10px] font-mono tracking-widest">
            <a href="#" className="hover:text-primary transition-colors text-on-surface-variant hover:text-foreground">GH.DAT</a>
            <a href="#" className="hover:text-primary transition-colors text-on-surface-variant hover:text-foreground">LI.DAT</a>
            <a href="#" className="hover:text-primary transition-colors text-on-surface-variant hover:text-foreground">TW.DAT</a>
            <a href="#" className="hover:text-primary transition-colors text-on-surface-variant hover:text-foreground">IG.DAT</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-outline/10 flex flex-col items-center">
          <p className="text-[9px] font-mono opacity-30 text-center">
            © {new Date().getFullYear()} MARCELLO LIENARTA. ALL RIGHTS RESERVED.
            <br />
            [SYSTEM_STATUS: OPERATIONAL] [ENCRYPTION: AES-256]
          </p>
        </div>
      </div>
    </footer>
  )
}
