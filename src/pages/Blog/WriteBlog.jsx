import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogService } from '../../services/blogService'

const CATEGORIES = ['Essay', 'Lifestyle', 'Tech', 'Career', 'Learning', 'Culture', 'Food', 'Travel']

export default function WriteBlog() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('Essay')
  const [image, setImage] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const words = body.trim() ? body.trim().split(/\s+/).length : 0
  const readTime = Math.max(1, Math.round(words / 200))

  const handlePublish = async (status) => {
    if (!title.trim() || !body.trim()) {
      setError('Please add a title and some content first.')
      return
    }
    setError('')
    setSaving(true)
    try {
      const blog = await blogService.create({
        title,
        content: body,
        category,
        status,
        image: image.trim() || undefined,
        readTime: `${readTime} min read`,
      })
      navigate(`/blog/${blog.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="border-b border-[#EDE8DF] px-6 py-4 flex items-center justify-between">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="ink-input w-auto py-2"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <span className="text-sm text-ink-light">
          {words} words · ~{readTime} min read
        </span>

        <div className="flex gap-3">
          <button onClick={() => handlePublish('draft')} disabled={saving} className="btn-ghost">
            Save draft
          </button>
          <button onClick={() => handlePublish('published')} disabled={saving} className="btn-primary">
            {saving ? 'Publishing...' : 'Publish +'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-6">
            {error}
          </p>
        )}

        <label className="text-sm font-medium text-ink mb-1 block">Cover image URL (optional)</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="ink-input mb-4"
        />
        {image && (
          <img src={image} alt="preview" className="w-full h-48 object-cover rounded-xl mb-6" />
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your post title..."
          className="w-full font-display font-extrabold text-4xl text-ink outline-none bg-transparent mb-6 placeholder:text-ink-light"
        />
        <div className="squiggle mb-6" />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start writing your post here..."
          className="editor-area"
        />
      </div>
    </div>
  )
}