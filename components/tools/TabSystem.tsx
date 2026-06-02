'use client'

import { useState } from 'react'

interface Tab {
  id: string
  label: string
  component: React.ReactNode
}

interface TabSystemProps {
  tabs: Tab[]
  defaultTab?: string
}

export default function TabSystem({ tabs, defaultTab }: TabSystemProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)

  return (
    <div className="w-full flex flex-col">
      <div className="flex border-b border-outline/30 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-mono text-sm transition-colors relative whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {activeTab === tab.id && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-primary font-bold">&gt;</span>
            )}
            <span className={activeTab === tab.id ? 'ml-4' : ''}>
              {tab.label.toUpperCase()}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>
      <div className="flex-grow animate-in fade-in duration-300">
        {tabs.find(t => t.id === activeTab)?.component}
      </div>
    </div>
  )
}
