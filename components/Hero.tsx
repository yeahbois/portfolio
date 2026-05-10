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
          <p className="font-mono text-primary text-sm mb-2 opacity-90 tracking-widest">
            {'>'} INITIALIZING_SYSTEM_CORE...
          </p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">
            MARCELLO <br />
            <span className="text-on-surface-variant">LIENARTA</span>
          </h1>
        </div>

        <div className="max-w-2xl grid">
          <p className="text-lg md:text-xl font-mono leading-relaxed text-on-surface [grid-area:1/1] invisible" aria-hidden="true">
            {fullText}
            <span className="bg-primary ml-1 w-2 h-6 inline-block align-middle"></span>
          </p>
          <p className="text-lg md:text-xl font-mono leading-relaxed text-on-surface [grid-area:1/1]">
            {text}
            <span className="animate-pulse bg-primary ml-1 w-2 h-6 inline-block align-middle"></span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-on-primary font-mono text-sm border border-primary hover:bg-transparent hover:text-primary transition-all flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" className="mr-2"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0-33-23.5-56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40 56-56-103-104 103-104-56-56-160 160 160 160Zm180 0h80l100-320h-80L480-280Zm224 0 160-160-160-160-56 56 103 104-103 104 56 56Z"/></svg>
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

      <div className="mt-20 border border-outline/20 p-4 bg-surface/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-[8px] font-mono opacity-40 select-none">
          SECURED_CONNECTION_TLS_1.3
        </div>
        <div className="flex items-center space-x-2 mb-4 border-b border-outline/20 pb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          <span className="text-[10px] font-mono opacity-60 ml-2">bash --session --80x24</span>
        </div>
        <div className="font-mono text-xs md:text-sm space-y-1 opacity-90">
          <p className="text-green-500">$ whoami</p>
          <p>MARCELLO LIENARTA</p>
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
