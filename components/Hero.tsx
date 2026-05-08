'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [text, setText] = useState('')
  const fullText = "I'm a senior multipurpose developer with 5 years of experience building scalable systems and futuristic interfaces."

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(timer)
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex flex-col space-y-6">
        <div>
          <p className="font-mono text-primary text-sm mb-2 opacity-80 tracking-widest">
            {'>'} INITIALIZING_SYSTEM_CORE...
          </p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">
            DHARMANDALA <br />
            <span className="text-on-surface-variant">SANDHYAKALA</span>
          </h1>
        </div>

        <div className="max-w-2xl">
          <p className="text-lg md:text-xl font-mono leading-relaxed text-on-surface/80">
            {text}
            <span className="animate-pulse bg-primary ml-1 w-2 h-6 inline-block align-middle"></span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-on-primary font-mono text-sm border border-primary hover:bg-transparent hover:text-primary transition-all flex items-center"
          >
            <span className="material-symbols-outlined text-sm mr-2">terminal</span>
            VIEW_PROJECTS
          </a>
          <a
            href="#experience"
            className="px-8 py-3 border border-outline/30 text-on-surface-variant font-mono text-sm hover:border-primary hover:text-primary transition-all"
          >
            EXECUTE_RECON
          </a>
        </div>
      </div>

      <div className="mt-20 border border-outline/10 p-4 bg-surface/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-[8px] font-mono opacity-20 select-none">
          SECURED_CONNECTION_TLS_1.3
        </div>
        <div className="flex items-center space-x-2 mb-4 border-b border-outline/10 pb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          <span className="text-[10px] font-mono opacity-40 ml-2">bash --session --80x24</span>
        </div>
        <div className="font-mono text-xs md:text-sm space-y-1 opacity-70">
          <p className="text-green-500">$ whoami</p>
          <p>dharmandala_sandhyakala</p>
          <p className="text-green-500">$ location</p>
          <p>jakarta, id_sea</p>
          <p className="text-green-500">$ status</p>
          <p>available_for_new_missions</p>
          <p className="text-green-500">$ _</p>
        </div>
      </div>
    </section>
  )
}
