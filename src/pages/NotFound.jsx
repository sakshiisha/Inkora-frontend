// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display font-extrabold text-6xl text-orange mb-4">404</h1>
      <p className="text-ink-mid mb-6">This page doesn't exist.</p>
      <Link to="/" className="btn-primary">Back home</Link>
    </div>
  )
}