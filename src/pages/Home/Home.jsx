import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import FeaturedBlog from '../../components/blog/FeaturedBlog'
import BlogCard from '../../components/blog/BlogCard'
import CategoryCard from '../../components/blog/CategoryCard'
import SearchBar from '../../components/blog/SearchBar'
import { POSTS } from '../../data/posts'

export default function Home() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const featured = POSTS.find((p) => p.featured)

  const filtered = useMemo(() => {
    return POSTS.filter((p) => {
      const matchesCat = category === 'All' || p.category === category
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.author.toLowerCase().includes(query.toLowerCase())
      return matchesCat && matchesQuery
    })
  }, [category, query])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 text-center">
        <div className="blob w-72 h-72 bg-orange-pale -top-10 -left-10" />
        <div className="blob w-72 h-72 bg-yellow-pale top-20 right-0" />

        <div className="relative max-w-3xl mx-auto fade-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="sticker sticker-new">✦ New platform</span>
            <span className="text-sm text-ink-mid">Join 28,000+ writers sharing their work</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-tight text-ink mb-6">
            Your thoughts deserve a{' '}
            <span className="doodle-underline text-orange">
              great home.
              <svg viewBox="0 0 200 10"><path d="M2,6 Q50,0 100,6 T198,6" /></svg>
            </span>
          </h1>

          <p className="text-lg text-ink-mid mb-8 max-w-xl mx-auto">
            Inkwell is the no-fuss place to write, read, and discover ideas that actually
            matter — straight from real people, not algorithms.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link to="/write" className="btn-primary">Start writing for free →</Link>
            <Link to="/explore" className="btn-ghost">Explore posts</Link>
          </div>
        </div>
      </section>

      <FeaturedBlog post={featured} />

      {/* Latest stories */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-extrabold text-2xl text-ink">Latest stories</h2>
          <button className="btn-outline-orange">See all →</button>
        </div>

        <div className="mb-6">
          <CategoryCard active={category} onSelect={setCategory} />
        </div>

        <div className="mb-8 max-w-md">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange mt-20 py-20 text-center text-white">
        <h2 className="font-display font-extrabold text-4xl mb-4">Ready to share your story?</h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90">
          No followers needed. No algorithm to please. Just you, your ideas, and an
          audience that actually wants to read.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-white text-orange font-extrabold font-display px-8 py-3 rounded-full"
        >
          Create your free account →
        </Link>
      </section>
    </div>
  )
}