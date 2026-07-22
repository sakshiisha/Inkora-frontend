import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import { blogService } from '../../services/blogService'
import { useAuth } from '../../context/AuthContext'

export default function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await blogService.getById(id)
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const isOwner = user && post?.User?.id === user.id

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await blogService.delete(id)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  if (loading) return <Loader label="Loading post..." />

  if (error || !post) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4">Post not found.</p>
        <Link to="/explore" className="btn-primary">Back to Explore</Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-4">
        <span className="badge badge-orange">{post.category?.toUpperCase()}</span>

        {isOwner && (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-red-500 text-sm font-semibold hover:text-red-600"
          >
            Delete post
          </button>
        )}
      </div>

      <h1 className="font-display font-extrabold text-4xl mb-4">{post.title}</h1>
      <p className="text-ink-light mb-8">
        {post.User?.name || 'Anonymous'} · {post.readTime}
      </p>
      {post.image && (
        <img src={post.image} alt={post.title} className="rounded-2xl w-full mb-8" />
      )}
      <div
        className="text-lg leading-relaxed text-ink-mid rich-editor"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Delete confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-display font-extrabold text-lg text-ink mb-2">Delete this post?</h3>
            <p className="text-sm text-ink-mid mb-6">
              This action can't be undone. The post will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirm(false)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}