import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogoutClick = () => setShowConfirm(true)

  const confirmLogout = () => {
    logout()
    setShowConfirm(false)
    navigate('/')
  }

  return (
    <>
      <header className="border-b border-[#EDE8DF] bg-[#FFFBF0]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="#" className="flex items-center gap-2">
            <span className="text-2xl">🍂</span>
            <span className="font-display font-extrabold text-xl text-ink">Inkwell</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Explore
            </NavLink>
            <NavLink to="/write" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Write
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white text-sm font-bold">
                    {user.name ? user.name[0].toUpperCase() : '?'}
                  </div>
                  <span className="text-sm text-ink font-medium hidden sm:inline">{user.name}</span>
                </Link>
                <button onClick={handleLogoutClick} className="btn-ghost">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn-ghost">Sign in</Link>
                <Link to="/signup" className="btn-primary">Get started</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Logout confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-display font-extrabold text-lg text-ink mb-2">Log out of Inkwell?</h3>
            <p className="text-sm text-ink-mid mb-6">
              You'll need to sign in again to write or manage your posts.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirm(false)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-5 py-2 rounded-full bg-orange text-white text-sm font-bold hover:bg-orange-light transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}