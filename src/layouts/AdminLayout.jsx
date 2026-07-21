import { Outlet, NavLink } from 'react-router-dom'

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/users', label: 'Users', icon: '👥' },
  { to: '/admin/blogs', label: 'Blogs', icon: '📚' },
  { to: '/admin/categories', label: 'Categories', icon: '🏷️' },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 bg-ink text-white px-4 py-8">
        <div className="flex items-center gap-2 mb-10 px-2">
          <span className="text-2xl">🍂</span>
          <span className="font-display font-extrabold text-lg">Inkwell Admin</span>
        </div>
        <nav className="flex flex-col gap-1">
          {ADMIN_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive ? 'bg-orange text-white' : 'text-white/70 hover:bg-white/10'
                }`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-cream page-fade">
        <Outlet />
      </main>
    </div>
  )
}