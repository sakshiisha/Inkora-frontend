export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="text-sm font-medium text-ink mb-1 block">{label}</label>
      )}
      <input className={`ink-input ${className}`} {...props} />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}