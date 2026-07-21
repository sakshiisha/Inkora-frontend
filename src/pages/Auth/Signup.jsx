import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(form.name, form.email, form.password)
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
        <p className="text-xs text-white/50 mt-auto pt-12">© 2026 Inkwell</p>
      </div>

      <div className="flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex gap-1 mb-8 bg-surface rounded-full p-1 w-fit">
            <Link to="/signup" className="px-5 py-2 rounded-full bg-white font-semibold text-sm shadow">Sign up</Link>
            <Link to="/login" className="px-5 py-2 rounded-full text-sm text-ink-mid">Log in</Link>
          </div>

          <h2 className="font-display font-extrabold text-3xl mb-2">Create your account</h2>
          <p className="text-ink-mid mb-8">Join 28,000+ writers on Inkwell.</p>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <label className="text-sm font-medium text-ink mb-1 block">Your name</label>
          <input
            required
            value={form.name}
            onChange={update('name')}
            placeholder="Ada Lovelace"
            className="ink-input mb-4"
          />

          <label className="text-sm font-medium text-ink mb-1 block">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            placeholder="ada@inkwell.so"
            className="ink-input mb-4"
          />

          <label className="text-sm font-medium text-ink mb-1 block">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={update('password')}
            className="ink-input mb-6"
          />

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Creating account...' : 'Create account →'}
          </button>

          <p className="text-sm text-ink-mid text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-orange font-semibold">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}