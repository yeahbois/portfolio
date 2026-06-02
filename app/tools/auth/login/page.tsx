'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ToolsLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/tools/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/tools/delf-dalf') // Default redirect
      } else {
        setError(data.error || 'Login failed')
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
          <span className="mr-2">&gt;</span> SYSTEM_AUTH.LOGIN
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
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
            {loading ? 'AUTHENTICATING...' : 'EXECUTE_LOGIN'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-outline/30 text-center">
          <p className="text-sm opacity-60">
            No credentials?{' '}
            <Link href="/tools/auth/register" className="text-primary hover:underline">
              REGISTER_NEW_NODE
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
