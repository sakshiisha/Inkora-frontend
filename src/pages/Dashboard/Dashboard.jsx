import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import Loader from '../../components/common/Loader'
import { useAuth } from '../../context/AuthContext'
import { blogService } from '../../services/blogService'

export default function Dashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        const data = await blogService.getMyBlogs()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMyPosts()
  }, [])

  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status === 'draft').length

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 px-8 py-10 max-w-5xl">
        <h1 className="font-display font-extrabold text-3xl text-ink mb-1">
          Welcome back{user?.name ? `, ${user.name}` : ''} 👋
        </h1>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}