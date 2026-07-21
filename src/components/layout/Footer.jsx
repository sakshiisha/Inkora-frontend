import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#FFFBF0] border-t border-[#EDE8DF] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍂</span>
          <span className="font-display font-extrabold text-ink">Inkwell</span>
        </div>
        <p className="text-sm text-ink-mid">
          © 2026 Inkwell · Made with ♥ for curious people
        </p>
        <div className="flex gap-6 text-sm text-ink-mid">
          <Link to="/about" className="hover:text-orange">About</Link>
          <Link to="/guidelines" className="hover:text-orange">Guidelines</Link>
          <Link to="/privacy" className="hover:text-orange">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}