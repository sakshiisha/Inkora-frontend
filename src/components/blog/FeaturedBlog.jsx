import { Link } from 'react-router-dom'

export default function FeaturedBlog({ post }) {
  if (!post) return null

  const authorName = post?.User?.name || post?.author || 'Anonymous'
  const firstLetter = authorName ? authorName.charAt(0).toUpperCase() : '?'
  const image = post?.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900'
  const excerpt = post?.excerpt || (post?.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...' : '')

  return (
    <section className="max-w-5xl mx-auto px-6 mt-10">
      <h2 className="font-display font-extrabold text-base text-ink mb-3">✦ Featured post</h2>

      <div className="ink-card grid md:grid-cols-2 gap-0 overflow-hidden max-h-80">
        <div className="h-48 md:h-full">
          <img src={image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 flex flex-col justify-center">
          <div className="flex gap-2 mb-3">
            <span className="badge badge-orange">{(post.category || 'Essay').toUpperCase()}</span>
          </div>
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink mb-3 leading-tight line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-ink-mid mb-4 line-clamp-2">{excerpt}</p>

          <div className="flex items-center justify-between pt-3 border-t border-[#EDE8DF]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-orange">
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