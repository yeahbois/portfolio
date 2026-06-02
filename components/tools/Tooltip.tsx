'use client'

import { useState, useRef } from 'react'

interface TooltipProps {
  word: string
  definition?: string
  phonetic?: string
  partOfSpeech?: string
  children: React.ReactNode
}

export default function Tooltip({ word, definition, phonetic, partOfSpeech, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true)
    updatePosition(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    // For mobile or toggle
    setIsVisible(!isVisible)
    updatePosition(e.clientX, e.clientY)
  }

  const updatePosition = (clientX: number, clientY: number) => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()
      let x = clientX + 10
      let y = clientY + 10

      // Keep within viewport
      if (x + rect.width > window.innerWidth) x = clientX - rect.width - 10
      if (y + rect.height > window.innerHeight) y = clientY - rect.height - 10

      setPosition({ x, y })
    }
  }

  return (
    <>
      <span
        className="relative border-b border-dotted border-primary cursor-help inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
        {isVisible && (
          <div
            ref={tooltipRef}
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              zIndex: 1000
            }}
            className="hidden md:block bg-surface border border-primary p-3 shadow-xl max-w-xs pointer-events-none font-mono text-xs"
          >
            <div className="text-primary font-bold mb-1">{word.toUpperCase()} {phonetic && <span className="text-foreground opacity-50 font-normal ml-1">[{phonetic}]</span>}</div>
            <div className="text-[10px] opacity-70 italic mb-2">{partOfSpeech}</div>
            <div className="text-foreground">{definition || 'Fetching definition...'}</div>
          </div>
        )}
      </span>

      {/* Mobile Bottom Sheet */}
      {isVisible && (
        <div className="md:hidden fixed inset-0 z-[2000] flex items-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsVisible(false)}></div>
          <div className="relative w-full bg-surface border-t border-primary p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-primary font-bold text-lg">{word.toUpperCase()}</div>
                {phonetic && <div className="text-foreground opacity-50">[{phonetic}]</div>}
                <div className="text-xs opacity-70 italic mt-1">{partOfSpeech}</div>
              </div>
              <button onClick={() => setIsVisible(false)} className="text-primary p-2">
                CLOSE [X]
              </button>
            </div>
            <div className="text-foreground mb-6 font-mono">{definition || 'Fetching definition...'}</div>
            <div className="text-[10px] opacity-40 border-t border-outline/20 pt-4">
              SYSTEM_ACTION: Click outside to dismiss.
            </div>
          </div>
        </div>
      )}
    </>
  )
}
