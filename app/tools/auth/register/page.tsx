'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ToolsRegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/tools/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, nickname }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/tools/auth/login')
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-mono">
      <div className="max-w-md w-full ascii-border p-8 bg-background">
        <h1 className="text-2xl font-bold mb-6 text-primary flex items-center">
          <span className="mr-2">&gt;</span> SYSTEM_AUTH.REGISTER
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 opacity-70">SYSTEM_NAME (NICKNAME)</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-surface border border-outline p-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="Neo"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">IDENTIFIER (USERNAME)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface border border-outline p-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="root@user"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">ACCESS_KEY (PASSWORD)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-outline p-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm border border-red-500/30 p-2 bg-red-500/10">
              [!] ERROR: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'INITIALIZING...' : 'CREATE_ACCOUNT'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-outline/30 text-center">
          <p className="text-sm opacity-60">
            Already have a node?{' '}
            <Link href="/tools/auth/login" className="text-primary hover:underline">
              LOGIN_EXISTING_NODE
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
