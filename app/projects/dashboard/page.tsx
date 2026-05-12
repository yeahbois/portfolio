'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface PublicProject {
  id: string;
  name: string;
  images: string[];
  description: string;
  creator: string;
  status_percentage: number;
}

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<PublicProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public_projects')
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-10 font-mono text-sm animate-pulse">LOADING_PROJECTS.SYS...</div>

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-outline/20 pb-6">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">PUBLIC_PROJECTS</h1>
          <p className="text-sm opacity-50 uppercase tracking-widest">Legasi Pemenang & Inovasi Teknologi</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <div className="ascii-border bg-surface/30 p-6 hover:bg-surface/50 transition-all group h-full flex flex-col">
                {project.images && project.images[0] && (
                  <div className="aspect-video mb-4 overflow-hidden border border-outline/10">
                    <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.name}</h2>
                <p className="text-xs opacity-60 line-clamp-3 mb-4 flex-grow">{project.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline/10">
                  <span className="text-[10px] uppercase tracking-tighter opacity-40">{project.creator}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-1 bg-outline/20">
                      <div className="h-full bg-primary" style={{ width: `${project.status_percentage}%` }}></div>
                    </div>
                    <span className="text-[10px]">{project.status_percentage}%</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 opacity-30 italic">
            NO_PUBLIC_PROJECTS_FOUND.EXE
          </div>
        )}
      </div>
    </div>
  )
}
