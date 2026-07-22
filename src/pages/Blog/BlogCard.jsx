import { Link } from 'react-router-dom'
import { CATEGORY_COLORS } from '../../utils/constants'

function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function BlogCard({ post }) {
  const authorName = post?.User?.name || post?.author || 'Anonymous'
  const image = post?.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900'
  const firstLetter = authorName ? authorName.charAt(0).toUpperCase() : '?'

  const cleanExcerpt = stripHtml(post.excerpt || post.content || '').slice(0, 150)

  return (
    <Link to={`/blog/${post.id}`} className="ink-card block">
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5">
        <span className={`badge ${CATEGORY_COLORS[post.category] || 'badge-surface'} mb-3`}>
          {post.category}
        </span>
        <h3 className="font-display font-extrabold text-lg text-ink mb-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-ink-mid line-clamp-3 mb-4">{cleanExcerpt}</p>

        <div className="flex items-center gap-2 pt-3 border-t border-[#EDE8DF]">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-orange">
            {firstLetter}
          </div>
          <span className="text-sm text-ink font-medium">{authorName}</span>
          <span className="text-sm text-ink-light">· {post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}