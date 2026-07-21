import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/dashboard', label: 'Overview', icon: '📊' },
  { to: '/profile', label: 'Profile', icon: '👤' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-[#EDE8DF] min-h-screen px-4 py-8 hidden md:block">
      <div className="flex items-center gap-2 mb-10 px-2">
        <span className="text-2xl">🍂</span>
        <span className="font-display font-extrabold text-lg text-ink">Inkwell</span>
      </div>

      <nav className="flex flex-col gap-1">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive ? 'bg-orange-pale text-orange' : 'text-ink-mid hover:bg-surface'
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}