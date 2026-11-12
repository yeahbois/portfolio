'use client'

import React from 'react'
import { SUBTESTS_DATA } from '@/lib/tesiq/subtestsData'

export default function RadarChart() {
  const subtests = Object.values(SUBTESTS_DATA)
  const total = subtests.length
  const size = 380
  const center = size / 2
  const radius = size * 0.38

  // Score mapping: Scale 80 to 135 to radius 0 to radius
  const minScore = 80
  const maxScore = 135
  const getRadiusForScore = (score: number) => {
    const clamped = Math.max(minScore, Math.min(maxScore, score))
    return ((clamped - minScore) / (maxScore - minScore)) * radius
  }

  const getCoordinates = (index: number, r: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2
    const x = center + r * Math.cos(angle)
    const y = center + r * Math.sin(angle)
    return { x, y }
  }

  // Levels for background grid (90, 105, 120, 135)
  const gridLevels = [90, 105, 120, 135]

  // Points for Current Score Polygon
  const currentPoints = subtests
    .map((s, i) => {
      const r = getRadiusForScore(s.currentScore)
      const { x, y } = getCoordinates(i, r)
      return `${x},${y}`
    })
    .join(' ')

  // Points for Target Score Polygon
  const targetPoints = subtests
    .map((s, i) => {
      const r = getRadiusForScore(s.targetScore)
      const { x, y } = getCoordinates(i, r)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-[400px] aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible font-mono">
          {/* Background concentric polygons */}
          {gridLevels.map((lvl) => {
            const r = getRadiusForScore(lvl)
            const pts = Array.from({ length: total })
              .map((_, i) => {
                const { x, y } = getCoordinates(i, r)
                return `${x},${y}`
              })
              .join(' ')
            return (
              <g key={lvl}>
                <polygon
                  points={pts}
                  fill="none"
                  stroke="var(--outline)"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={center + 4}
                  y={center - r + 3}
                  fontSize="8"
                  fill="var(--outline)"
                  opacity="0.6"
                >
                  {lvl}
                </text>
              </g>
            )
          })}

          {/* Spokes from center */}
          {subtests.map((_, i) => {
            const { x, y } = getCoordinates(i, radius)
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="var(--outline)"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            )
          })}

          {/* Target Score Area (Dashed Green/Primary) */}
          <polygon
            points={targetPoints}
            fill="var(--secondary)"
            fillOpacity="0.12"
            stroke="var(--secondary)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Current Score Area (Solid) */}
          <polygon
            points={currentPoints}
            fill="var(--primary)"
            fillOpacity="0.28"
            stroke="var(--primary)"
            strokeWidth="2"
          />

          {/* Current Score Dots */}
          {subtests.map((s, i) => {
            const r = getRadiusForScore(s.currentScore)
            const { x, y } = getCoordinates(i, r)
            return (
              <g key={s.id}>
                <circle cx={x} cy={y} r="4" fill="var(--primary)" stroke="var(--background)" strokeWidth="1.5" />
              </g>
            )
          })}

          {/* Outer Labels */}
          {subtests.map((s, i) => {
            const labelRadius = radius + 26
            const { x, y } = getCoordinates(i, labelRadius)
            const isLeft = x < center - 10
            const isRight = x > center + 10
            const anchor = isLeft ? 'end' : isRight ? 'start' : 'middle'

            return (
              <g key={`label-${s.id}`}>
                <text
                  x={x}
                  y={y}
                  textAnchor={anchor}
                  fontSize="9"
                  fill="var(--foreground)"
                  fontWeight="bold"
                  className="tracking-tighter"
                >
                  {s.shortName}
                </text>
                <text
                  x={x}
                  y={y + 11}
                  textAnchor={anchor}
                  fontSize="8"
                  fill={s.currentScore < 100 ? '#ef4444' : 'var(--primary)'}
                  fontWeight="bold"
                >
                  [{s.currentScore} → {s.targetScore}]
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-primary/40 border border-primary inline-block"></span>
          <span className="text-foreground">Skor Riil Saat Ini</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-secondary/30 border border-secondary border-dashed inline-block"></span>
          <span className="text-foreground">Skor Target (115 - 128+)</span>
        </div>
      </div>
    </div>
  )
}

