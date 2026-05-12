'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Blog {
  title: string;
  date: string;
  images?: string[];
  content: string;
}

export default function BlogDetail({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = use(params)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (blogId === 'dashboard') return;
    fetch(`/api/blogs?id=${blogId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(data => {
        setBlog(data)
        setLoading(false)
      })
      .catch(() => {
        router.push('/blogs/dashboard')
      })
  }, [blogId, router])

  if (blogId === 'dashboard') return null;
  if (loading || !blog) return <div className="p-10 font-mono text-sm animate-pulse">FETCHING_BLOG_CONTENT.SYS...</div>

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/blogs/dashboard" className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-primary transition-all mb-8 inline-block">
          &lt; RETURN_TO_BLOGS
        </Link>

        <article>
          <header className="mb-12">
            <span className="text-[10px] opacity-40 uppercase mb-2 block tracking-[0.3em]">
              {new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">{blog.title}</h1>
          </header>

          {blog.images && blog.images.length > 0 && (
            <div className="mb-12 space-y-4">
              {blog.images.map((img: string, idx: number) => (
                <div key={idx} className="ascii-border p-2 bg-surface/30">
                  <img src={img} alt={`${blog.title} ${idx + 1}`} className="w-full grayscale hover:grayscale-0 transition-all duration-1000" />
                </div>
              ))}
            </div>
          )}

          <div className="prose prose-invert max-w-none prose-sm md:prose-base leading-loose opacity-80 whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>

        <div className="mt-20 pt-8 border-t border-outline/10 text-center">
            <div className="text-[10px] opacity-30 uppercase tracking-[0.5em]">End of Entry</div>
        </div>
      </div>
    </div>
  )
}
