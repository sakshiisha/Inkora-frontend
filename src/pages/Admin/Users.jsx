// src/pages/Admin/Users.jsx
const MOCK_USERS = [
  { id: 1, name: 'Maya Chen', email: 'maya@inkwell.so', posts: 3 },
  { id: 2, name: 'Jordan Park', email: 'jordan@inkwell.so', posts: 2 },
  { id: 3, name: 'Priya Sharma', email: 'priya@inkwell.so', posts: 2 },
]

export default function Users() {
  return (
    <div className="px-8 py-10">
      <h1 className="font-display font-extrabold text-3xl text-ink mb-8">Users</h1>
      <div className="ink-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-ink-mid text-left">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Posts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDE8DF]">
            {MOCK_USERS.map((u) => (
              <tr key={u.id}>
                <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
                <td className="px-5 py-3 text-ink-mid">{u.email}</td>
                <td className="px-5 py-3">
                  <span className="badge badge-surface">{u.posts}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}