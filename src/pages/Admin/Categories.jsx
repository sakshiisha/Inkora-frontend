// src/pages/Admin/AdminDashboard.jsx
const STATS = [
  { label: 'Total users', value: '2,481', color: 'badge-orange' },
  { label: 'Total posts', value: '8', color: 'badge-purple' },
  { label: 'Published today', value: '3', color: 'badge-green' },
]

export default function AdminDashboard() {
  return (
    <div className="px-8 py-10">
      <h1 className="font-display font-extrabold text-3xl text-ink mb-8">Overview</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="ink-card p-5">
            <span className={`badge ${s.color} mb-3`}>{s.label}</span>
            <p className="font-display font-extrabold text-3xl text-ink">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}