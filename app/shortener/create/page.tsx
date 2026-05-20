'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ShortenerCreate() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/shortener/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (res.ok) {
        const shortUrl = `${window.location.origin}/s/${json.slug}`
        setResult(shortUrl)
      } else {
        setError(json.error || 'Something went wrong')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full ascii-border bg-surface p-8">
        <h1 className="text-2xl font-bold mb-6 tracking-tighter uppercase">URL_SHORTENER_v1.0</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase opacity-50 block mb-1">Target_URL</label>
            <input
              name="long_url"
              type="url"
              placeholder="https://example.com/very-long-url"
              className="w-full p-3 bg-background border border-outline/20 focus:border-primary outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase opacity-50 block mb-1">Desired_Slug (Optional)</label>
            <input
              name="slug"
              placeholder="my-cool-link"
              className="w-full p-3 bg-background border border-outline/20 focus:border-primary outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase opacity-50 block mb-1">Admin_Passcode</label>
            <input
              name="passcode"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-background border border-outline/20 focus:border-primary outline-none text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 text-xs tracking-widest uppercase hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {loading ? 'GENERATING...' : 'GENERATE_SHORT_URL.EXE'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-4 border border-primary/30 bg-primary/5">
            <p className="text-[10px] uppercase opacity-50 mb-1">Success! Generated URL:</p>
            <a href={result} target="_blank" rel="noopener noreferrer" className="text-primary break-all underline text-sm">
              {result}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 border border-red-500/30 bg-red-500/5">
            <p className="text-[10px] uppercase text-red-500 mb-1">Error_Logged:</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 flex justify-between text-[10px]">
          <button onClick={() => router.push('/')} className="opacity-50 hover:opacity-100 underline">RETURN_TO_HOME</button>
          <button onClick={() => router.push('/shortener/dashboard')} className="opacity-50 hover:opacity-100 underline">ADMIN_DASHBOARD</button>
        </div>
      </div>
    </div>
  )
}
