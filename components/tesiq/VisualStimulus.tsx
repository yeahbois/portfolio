'use client'

import React from 'react'

interface VisualStimulusProps {
  stimulus?: {
    type: 'text' | 'table' | 'svg-matrix' | 'svg-shape' | 'memory-grid' | 'memory-words'
    data?: any
  }
}

export default function VisualStimulus({ stimulus }: VisualStimulusProps) {
  if (!stimulus) return null

  if (stimulus.type === 'svg-matrix') {
    return (
      <div className="my-6 p-4 border border-outline/30 bg-surface/50 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-primary font-bold">
          <span>[MATRIKS_SPASIAL_3x3 // RAVEN_STYLE]</span>
          <span>CFIT_STD</span>
        </div>
        <div className="grid grid-cols-3 gap-2 aspect-square max-w-[280px] mx-auto bg-background/50 p-2 border border-outline/20">
          {/* Cell 1: Vertical line */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="3">
              <line x1="30" y1="10" x2="30" y2="50" />
            </svg>
          </div>
          {/* Cell 2: Horizontal line */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="3">
              <line x1="10" y1="30" x2="50" y2="30" />
            </svg>
          </div>
          {/* Cell 3: Cross (+) */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="3">
              <line x1="30" y1="10" x2="30" y2="50" />
              <line x1="10" y1="30" x2="50" y2="30" />
            </svg>
          </div>

          {/* Cell 4: Diagonal (\) */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="3">
              <line x1="12" y1="12" x2="48" y2="48" />
            </svg>
          </div>
          {/* Cell 5: Diagonal (/) */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="3">
              <line x1="48" y1="12" x2="12" y2="48" />
            </svg>
          </div>
          {/* Cell 6: Cross X */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="3">
              <line x1="12" y1="12" x2="48" y2="48" />
              <line x1="48" y1="12" x2="12" y2="48" />
            </svg>
          </div>

          {/* Cell 7: Cross (+) with circle */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="2.5">
              <circle cx="30" cy="30" r="22" fill="none" />
              <line x1="30" y1="12" x2="30" y2="48" />
              <line x1="12" y1="30" x2="48" y2="30" />
            </svg>
          </div>
          {/* Cell 8: Cross (X) with circle */}
          <div className="border border-outline/40 flex items-center justify-center p-2 bg-surface/40 aspect-square">
            <svg viewBox="0 0 60 60" className="w-full h-full stroke-foreground" strokeWidth="2.5">
              <circle cx="30" cy="30" r="22" fill="none" />
              <line x1="15" y1="15" x2="45" y2="45" />
              <line x1="45" y1="15" x2="15" y2="45" />
            </svg>
          </div>
          {/* Cell 9: Target (?) */}
          <div className="border-2 border-dashed border-primary flex items-center justify-center p-2 bg-primary/10 aspect-square animate-pulse">
            <span className="text-2xl font-black text-primary font-mono">?</span>
          </div>
        </div>
        <p className="text-[10px] font-mono text-center text-on-surface/70 mt-3">
          Tentukan bentuk pola geometris yang melengkapi kotak tanda tanya (?)
        </p>
      </div>
    )
  }

  if (stimulus.type === 'svg-shape') {
    return (
      <div className="my-6 p-4 border border-outline/30 bg-surface/50 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-primary font-bold">
          <span>[JARING_JARING_KUBUS_3D // FOLDING_NET]</span>
          <span>SPATIAL_STD</span>
        </div>
        <div className="max-w-[220px] mx-auto py-2">
          {/* Row 1: Top face */}
          <div className="flex justify-center">
            <div className="w-12 h-12 border border-outline/50 flex items-center justify-center bg-surface font-mono font-bold text-sm">
              ●
            </div>
          </div>
          {/* Row 2: Left, Center, Right faces */}
          <div className="flex justify-center">
            <div className="w-12 h-12 border border-outline/50 flex items-center justify-center bg-surface font-mono font-bold text-sm">
              □
            </div>
            <div className="w-12 h-12 border border-outline/50 flex items-center justify-center bg-surface font-mono font-bold text-sm">
              ↑
            </div>
            <div className="w-12 h-12 border border-outline/50 flex items-center justify-center bg-surface font-mono font-bold text-sm">
              ▲
            </div>
          </div>
          {/* Row 3: Bottom face */}
          <div className="flex justify-center">
            <div className="w-12 h-12 border border-outline/50 flex items-center justify-center bg-surface font-mono font-bold text-sm">
              ★
            </div>
          </div>
          {/* Row 4: End face */}
          <div className="flex justify-center">
            <div className="w-12 h-12 border border-outline/50 flex items-center justify-center bg-surface font-mono font-bold text-sm">
              ✕
            </div>
          </div>
        </div>
        <p className="text-[10px] font-mono text-center text-on-surface/70 mt-3">
          Visualisasi proyeksi lipatan rusuk kubus 3D
        </p>
      </div>
    )
  }

  if (stimulus.type === 'memory-grid') {
    return (
      <div className="my-6 p-4 border border-outline/30 bg-surface/50 max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-primary font-bold">
          <span>[KISI_MEMORI_SPASIAL_4x4]</span>
          <span>VISUAL_BUFFER</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 p-2 bg-background border border-outline/20">
          {Array.from({ length: 16 }).map((_, idx) => {
            const row = Math.floor(idx / 4) + 1
            const col = (idx % 4) + 1
            const isActive =
              (row === 1 && col === 3) ||
              (row === 2 && col === 1) ||
              (row === 3 && col === 4) ||
              (row === 4 && col === 2)
            return (
              <div
                key={idx}
                className={`aspect-square flex items-center justify-center border text-[9px] font-mono ${
                  isActive
                    ? 'bg-primary text-on-primary border-primary font-bold'
                    : 'bg-surface/20 border-outline/20 text-on-surface/40'
                }`}
              >
                {row},{col}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}

