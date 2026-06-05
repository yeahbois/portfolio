'use client'

import Link from 'next/link'

export default function DelfDalfComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 font-mono bg-background">
      <div className="max-w-2xl w-full ascii-border p-12 bg-surface/30 relative overflow-hidden group">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <span className="text-8xl font-black">FR_B2_C1</span>
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] mb-8 animate-pulse">
            SYSTEM_STATUS: ENCRYPTED
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
            DELF_DALF.<span className="text-primary">CORE</span>
          </h1>

          <div className="h-[1px] w-24 bg-primary mx-auto mb-8"></div>

          <p className="text-on-surface/70 leading-relaxed mb-12 max-w-md mx-auto">
            The linguistic analysis modules for French proficiency (CEFR B2/C1) are currently undergoing recalibration. Access is restricted until the next deployment cycle.
          </p>

          <div className="grid grid-cols-1 gap-4 mb-12 max-w-xs mx-auto">
            <div className="flex items-center space-x-3 text-xs opacity-50">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span>ESTIMATED_RESTORATION: [PENDING]</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 border border-outline/30 hover:border-primary hover:text-primary transition-all text-xs tracking-widest uppercase"
            >
              Return_To_Root.exe
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-primary text-on-primary hover:opacity-90 transition-all text-xs tracking-widest uppercase font-bold"
            >
              Access_Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom decorative bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
    </div>
  )
}
