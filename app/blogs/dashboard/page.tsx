'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Blog {
  id: string;
  title: string;
  date: string;
  images: string[];
  content: string;
}

export default function BlogsDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-10 font-mono text-sm animate-pulse">LOADING_BLOG_ENTRIES.SYS...</div>

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-outline/20 pb-6">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">PERSONAL_BLOG</h1>
          <p className="text-sm opacity-50 uppercase tracking-widest">Insights, Technology, and Development Journeys</p>
        </header>

        <div className="space-y-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <div className="ascii-border bg-surface/30 p-8 hover:bg-surface/50 transition-all group">
                <div className="flex flex-col md:flex-row gap-6">
                  {blog.images && blog.images[0] && (
                    <div className="w-full md:w-48 aspect-video overflow-hidden border border-outline/10">
                      <img src={blog.images[0]} alt={blog.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                  )}
                  <div className="flex-grow">
                    <span className="text-[10px] opacity-40 uppercase mb-2 block">{new Date(blog.date).toLocaleDateString()}</span>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{blog.title}</h2>
                    <p className="text-sm opacity-60 line-clamp-2 leading-relaxed">
                      {blog.content.replace(/[#*`]/g, '').substring(0, 200)}...
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-20 opacity-30 italic">
            NO_BLOG_POSTS_FOUND.EXE
          </div>
        )}
      </div>
    </div>
  )
}
