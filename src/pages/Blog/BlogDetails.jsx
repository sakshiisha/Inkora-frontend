import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import { blogService } from '../../services/blogService'

export default function BlogDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
      <span className="badge badge-orange mb-4">{post.category?.toUpperCase()}</span>
      <h1 className="font-display font-extrabold text-4xl mb-4">{post.title}</h1>
      <p className="text-ink-light mb-8">
        {post.User?.name || 'Anonymous'} · {post.readTime}
      </p>
      {post.image && (
        <img src={post.image} alt={post.title} className="rounded-2xl w-full mb-8" />
      )}
      <p className="text-lg leading-relaxed text-ink-mid whitespace-pre-line">
        {post.content}
      </p>
    </article>
  )
}