// src/pages/Admin/Blogs.jsx
import { POSTS } from '../../data/posts'

export default function Blogs() {
  return (
    <div className="px-8 py-10">
      <h1 className="font-display font-extrabold text-3xl text-ink mb-8">Blogs</h1>
      <div className="ink-card divide-y divide-[#EDE8DF]">
        {POSTS.map((post) => (
          <div key={post.id} className="flex items-center justify-between p-5">
            <div>
              <p className="font-semibold text-ink">{post.title}</p>
              <p className="text-sm text-ink-light">{post.author} · {post.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge badge-surface">{post.category}</span>
              <button className="btn-ghost !py-1 !px-3 text-xs">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}