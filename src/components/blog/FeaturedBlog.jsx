import { Link } from 'react-router-dom'

export default function FeaturedBlog({ post }) {
  if (!post) return null

  const authorName = post?.User?.name || post?.author || 'Anonymous'
  const firstLetter = authorName ? authorName.charAt(0).toUpperCase() : '?'
  const image = post?.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900'
  const excerpt = post?.excerpt || (post?.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...' : '')

  return (
    <section className="max-w-6xl mx-auto px-6 mt-12">
      <h2 className="font-display font-extrabold text-lg text-ink mb-4">✦ Featured post</h2>

      <div className="ink-card grid md:grid-cols-2 gap-0 overflow-hidden">
        <div className="h-64 md:h-full">
          <img src={image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <div className="flex gap-2 mb-4">
            <span className="badge badge-orange">{(post.category || 'Essay').toUpperCase()}</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ink mb-4 leading-tight">
            {post.title}
          </h3>
          <p className="text-ink-mid mb-6">{excerpt}</p>

          <div className="flex items-center justify-between pt-4 border-t border-[#EDE8DF]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-orange">
                {firstLetter}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{authorName}</p>
                <p className="text-xs text-ink-light">{post.readTime}</p>
              </div>
            </div>
            <Link to={`/blog/${post.id}`} className="text-orange font-bold text-sm">
              Read →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}