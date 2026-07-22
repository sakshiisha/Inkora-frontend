import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import { useAuth } from '../../context/AuthContext'
import { blogService } from '../../services/blogService'

export default function Dashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  useEffect(() => {
    fetchMyPosts()
  }, [])

  async function fetchMyPosts() {
    try {
      setLoading(true)
      const data = await blogService.getMyBlogs()
      setPosts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await blogService.delete(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setDeletingId(null)
      setConfirmDeleteId(null)
    }
  }

  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status === 'draft').length

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display font-extrabold text-3xl text-ink">
          Welcome back{user?.name ? `, ${user.name}` : ''} 👋
        </h1>
        <Link to="/profile" className="btn-ghost flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-orange flex items-center justify-center text-white text-xs font-bold">
            {user?.name ? user.name[0].toUpperCase() : '?'}
          </span>
          My Profile
        </Link>
      </div>
      <p className="text-ink-mid mb-8">Here's how your writing is doing.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="ink-card p-5">
          <span className="badge badge-orange mb-3">Published</span>
          <p className="font-display font-extrabold text-3xl text-ink">{published}</p>
        </div>
        <div className="ink-card p-5">
          <span className="badge badge-purple mb-3">Drafts</span>
          <p className="font-display font-extrabold text-3xl text-ink">{drafts}</p>
        </div>
        <div className="ink-card p-5">
          <span className="badge badge-green mb-3">Total posts</span>
          <p className="font-display font-extrabold text-3xl text-ink">{posts.length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-extrabold text-xl text-ink">Your posts</h2>
        <Link to="/write" className="btn-outline-orange">+ New post</Link>
      </div>

      {loading && <Loader label="Loading your posts..." />}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <div className="ink-card p-10 text-center">
          <p className="text-ink-mid mb-4">You haven't written anything yet.</p>
          <Link to="/write" className="btn-primary">Write your first post</Link>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="ink-card divide-y divide-[#EDE8DF]">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-5">
              <div>
                <p className="font-semibold text-ink">{post.title}</p>
                <p className="text-sm text-ink-light">{post.readTime}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="badge badge-surface">{post.category}</span>
                <span className={`badge ${post.status === 'published' ? 'badge-green' : 'badge-yellow'}`}>
                  {post.status}
                </span>
                <Link to={`/blog/${post.id}`} className="text-orange text-sm font-semibold">
                  View →
                </Link>
                <button
                  onClick={() => setConfirmDeleteId(post.id)}
                  className="text-red-500 text-sm font-semibold hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-display font-extrabold text-lg text-ink mb-2">Delete this post?</h3>
            <p className="text-sm text-ink-mid mb-6">
              This action can't be undone. The post will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition disabled:opacity-60"
              >
                {deletingId === confirmDeleteId ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}