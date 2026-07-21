import { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import { useAuth } from '../../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
  })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 px-8 py-10 max-w-2xl">
        <h1 className="font-display font-extrabold text-3xl text-ink mb-1">Your profile</h1>
        <p className="text-ink-mid mb-8">Manage how you appear on Inkwell.</p>

        <div className="ink-card p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-orange flex items-center justify-center text-white text-2xl font-bold">
              {form.name ? form.name[0].toUpperCase() : '?'}
            </div>
            <button className="btn-ghost">Change photo</button>
          </div>

          <label className="text-sm font-medium text-ink mb-1 block">Name</label>
          <input value={form.name} onChange={update('name')} className="ink-input mb-4" />

          <label className="text-sm font-medium text-ink mb-1 block">Email</label>
          <input value={form.email} onChange={update('email')} className="ink-input mb-4" />

          <label className="text-sm font-medium text-ink mb-1 block">Bio</label>
          <textarea
            value={form.bio}
            onChange={update('bio')}
            rows={4}
            placeholder="Tell readers a bit about yourself..."
            className="ink-input resize-none mb-6"
          />

          <button className="btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  )
}