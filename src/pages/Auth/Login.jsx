import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="hidden md:flex flex-col justify-center bg-ink text-white p-16">
        <div className="flex items-center gap-2 mb-12">
          <span className="text-2xl">🍂</span>
          <span className="font-display font-extrabold text-xl">Inkwell</span>
        </div>
        <p className="text-orange font-bold text-sm mb-2 tracking-wide">WHY WRITERS CHOOSE INKWELL</p>
        <h2 className="font-display font-extrabold text-4xl mb-8 leading-tight">
          Write once.<br />Be read <span className="text-orange">everywhere.</span>
        </h2>
        {[
          ['No algorithm tax', 'Your readers see what you publish — always.'],
          ['Own your voice', 'No brand deals forced on you, ever.'],
          ['Free forever', 'Seriously. No paywalls to get started.'],
        ].map(([title, desc]) => (
          <div key={title} className="flex gap-3 mb-6">
            <span className="w-6 h-6 rounded-full bg-orange flex items-center justify-center text-xs">✓</span>
            <div>
              <p className="font-bold">{title}</p>
              <p className="text-sm text-white/70">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="font-display font-extrabold text-3xl mb-2">Welcome back</h2>
          <p className="text-ink-mid mb-8">Log in to keep writing.</p>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <label className="text-sm font-medium text-ink mb-1 block">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@inkwell.so"
            className="ink-input mb-4"
          />

          <label className="text-sm font-medium text-ink mb-1 block">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ink-input mb-6"
          />

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <p className="text-sm text-ink-mid text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange font-semibold">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}