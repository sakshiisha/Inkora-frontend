import { useState, useEffect, useMemo } from 'react'
import BlogCard from '../../components/blog/BlogCard'
import CategoryCard from '../../components/blog/CategoryCard'
import SearchBar from '../../components/blog/SearchBar'
import Loader from '../../components/common/Loader'
import { blogService } from '../../services/blogService'

export default function Explore() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const data = await blogService.getAll()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat = category === 'All' || p.category === category
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        (p.User?.name || '').toLowerCase().includes(query.toLowerCase())
      return matchesCat && matchesQuery
    })
  }, [category, query, posts])

  const topicCount = useMemo(
    () => new Set(posts.map((p) => p.category)).size,
    [posts]
  )

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-14 overflow-hidden">
      {/* Floating stars */}
      <svg
        className="floating-star star-1"
        style={{ top: '2%', right: '8%', width: 26, height: 26 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF5500"
        strokeWidth="1.5"
      >
        <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
      </svg>

      <svg
        className="floating-star star-2"
        style={{ top: '18%', right: '2%', width: 16, height: 16 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9B5DE5"
        strokeWidth="1.5"
      >
        <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
      </svg>

      <svg
        className="floating-star star-3"
        style={{ top: '8%', left: '3%', width: 20, height: 20 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFE566"
        strokeWidth="1.5"
      >
        <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
      </svg>

      <div className="fade-up mb-10">
        <span className="sticker sticker-trending mb-4 inline-flex">↑ Explore</span>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl text-ink mb-3">
          Discover great writing
        </h1>
        <p className="text-ink-mid text-lg">
          {posts.length} posts across {topicCount} topics
        </p>
      </div>

      <div className="max-w-xl mb-6 fade-up delay-1">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mb-10 fade-up delay-2">
        <CategoryCard active={category} onSelect={setCategory} />
      </div>

      {loading && <Loader label="Loading posts..." />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-ink-mid text-lg mb-2">No posts found.</p>
          <p className="text-ink-light text-sm">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  )
}