import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogoutClick = () => {
    setMenuOpen(false)
    setShowConfirm(true)
  }

  const confirmLogout = () => {
    logout()
    setShowConfirm(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="border-b border-[#EDE8DF] bg-[#FFFBF0]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="text-2xl">🍂</span>
            <span className="font-display font-extrabold text-xl text-ink">Inkora</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Explore
            </NavLink>
            <NavLink to="/write" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Write
            </NavLink>
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white text-sm font-bold">
                    {user.name ? user.name[0].toUpperCase() : '?'}
                  </div>
                  <span className="text-sm text-ink font-medium">{user.name}</span>
                </Link>
                <button onClick={handleLogoutClick} className="btn-ghost">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost">Sign in</Link>
                <Link to="/signup" className="btn-primary">Get started</Link>
              </>
            )}
          </div>

          {/* Mobile: hamburger button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#EDE8DF]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#EDE8DF] bg-[#FFFBF0] px-4 py-4 flex flex-col gap-1">
            <NavLink
              to="/explore"
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-orange-pale text-orange' : 'text-ink-mid'}`
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/write"
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-orange-pale text-orange' : 'text-ink-mid'}`
              }
            >
              Write
            </NavLink>

            <div className="border-t border-[#EDE8DF] my-2" />

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-mid"
                >
                  <div className="w-7 h-7 rounded-full bg-orange flex items-center justify-center text-white text-xs font-bold">
                    {user.name ? user.name[0].toUpperCase() : '?'}
                  </div>
                  {user.name}
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink-mid"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 px-3 pt-1">
                <Link to="/login" onClick={closeMenu} className="btn-ghost flex-1 justify-center">
                  Sign in
                </Link>
                <Link to="/signup" onClick={closeMenu} className="btn-primary flex-1 justify-center">
                  Get started
                </Link>
              </div>
            )}
          </div>
        )}
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