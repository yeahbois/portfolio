'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 border-b border-outline/20 bg-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tighter text-foreground glitch-effect">
                DHARMakala
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono border border-outline px-1 text-on-surface-variant">
                v2.5.6
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#projects" className="text-sm font-mono hover:text-primary transition-colors flex items-center">
              <span className="mr-1 text-[10px] opacity-50">01.</span> PROJECTS
            </Link>
            <Link href="#experience" className="text-sm font-mono hover:text-primary transition-colors flex items-center">
              <span className="mr-1 text-[10px] opacity-50">02.</span> EXPERIENCE
            </Link>
            <Link href="#skills" className="text-sm font-mono hover:text-primary transition-colors flex items-center">
              <span className="mr-1 text-[10px] opacity-50">03.</span> SKILLS
            </Link>
            <Link
              href="/resume"
              className="px-4 py-1 border border-primary text-primary text-sm font-mono hover:bg-primary hover:text-on-primary transition-all"
            >
              RESUME.PDF
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2"
            >
              <span className="material-symbols-outlined">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-outline/20 px-4 pt-2 pb-6 flex flex-col space-y-4">
          <Link href="#projects" onClick={() => setIsOpen(false)} className="text-sm font-mono py-2 border-b border-outline/10">
            [01] PROJECTS
          </Link>
          <Link href="#experience" onClick={() => setIsOpen(false)} className="text-sm font-mono py-2 border-b border-outline/10">
            [02] EXPERIENCE
          </Link>
          <Link href="#skills" onClick={() => setIsOpen(false)} className="text-sm font-mono py-2 border-b border-outline/10">
            [03] SKILLS
          </Link>
          <Link
            href="/resume"
            className="text-sm font-mono py-2 text-primary"
          >
            [04] RESUME.PDF
          </Link>
        </div>
      )}
    </nav>
  )
}
