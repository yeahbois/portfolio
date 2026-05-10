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
                cellolienrt
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono border border-outline px-1 text-foreground">
                v1.0.1
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#projects" className="text-sm font-mono hover:text-primary transition-colors flex items-center">
              <span className="mr-1 text-[10px] text-primary">01.</span> PROJECTS
            </Link>
            <Link href="#experience" className="text-sm font-mono hover:text-primary transition-colors flex items-center">
              <span className="mr-1 text-[10px] text-primary">02.</span> EXPERIENCE
            </Link>
            <Link href="#skills" className="text-sm font-mono hover:text-primary transition-colors flex items-center">
              <span className="mr-1 text-[10px] text-primary">03.</span> SKILLS
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
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
              )}
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
