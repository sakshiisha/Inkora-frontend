import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogService } from '../../services/blogService'

const CATEGORIES = ['Essay', 'Lifestyle', 'Tech', 'Career', 'Learning', 'Culture', 'Food', 'Travel']

export default function WriteBlog() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Essay')
  const [image, setImage] = useState('')       // base64 preview / final image data
  const [imageName, setImageName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [words, setWords] = useState(0)
  const [isEmpty, setIsEmpty] = useState(true)

  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const editorRef = useRef(null)

  const readTime = Math.max(1, Math.round(words / 200))

  // ---- Gallery image upload (compressed before saving) ----
  const handlePickImage = () => fileInputRef.current?.click()

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image is too large (max 5MB).')
      return
    }

    setError('')

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        // Resize to max width 800px, compress to JPEG ~70% quality
        const canvas = document.createElement('canvas')
        const maxWidth = 800
        const scale = Math.min(1, maxWidth / img.width)
        canvas.width = img.width * scale
        canvas.height = img.height * scale

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
        setImage(compressedBase64)
        setImageName(file.name)
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImage('')
    setImageName('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ---- Rich text formatting (live, WYSIWYG) ----
  const focusEditor = () => editorRef.current?.focus()

  const applyFormat = (command, value = null) => {
    focusEditor()
    document.execCommand(command, false, value)
    handleEditorInput()
  }

  const toggleBold = () => applyFormat('bold')
  const toggleItalic = () => applyFormat('italic')
  const toggleHeading = () => applyFormat('formatBlock', 'H2')
  const toggleQuote = () => applyFormat('formatBlock', 'BLOCKQUOTE')
  const insertDivider = () => applyFormat('insertHorizontalRule')

  const handleEditorInput = () => {
    const el = editorRef.current
    if (!el) return
    const text = el.innerText || ''
    const trimmed = text.trim()
    setWords(trimmed ? trimmed.split(/\s+/).length : 0)
    setIsEmpty(trimmed.length === 0)
  }

  useEffect(() => {
    handleEditorInput()
  }, [])

  // ---- Publish / save ----
  const handlePublish = async (status) => {
    const html = editorRef.current?.innerHTML.trim() || ''
    const plain = editorRef.current?.innerText.trim() || ''

    if (!title.trim() || !plain) {
      setError('Please add a title and some content first.')
      return
    }
    setError('')
    setSaving(true)
    try {
      const blog = await blogService.create({
        title,
        content: html, // HTML content, keeps bold/italic/heading/quote/divider formatting
        category,
        status,
        image: image || undefined,
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
      {/* Top bar: category / word count / actions */}
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

      {/* Formatting toolbar row */}
      <div className="border-b border-[#EDE8DF] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleBold}
            className="w-9 h-9 rounded-lg border border-[#EDE8DF] font-bold text-ink hover:bg-[#F5F0E6] transition"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleItalic}
            className="w-9 h-9 rounded-lg border border-[#EDE8DF] italic text-ink hover:bg-[#F5F0E6] transition"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleHeading}
            className="w-9 h-9 rounded-lg border border-[#EDE8DF] font-semibold text-ink hover:bg-[#F5F0E6] transition"
            title="Heading"
          >
            H2
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleQuote}
            className="w-9 h-9 rounded-lg border border-[#EDE8DF] text-ink hover:bg-[#F5F0E6] transition"
            title="Quote"
          >
            "
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertDivider}
            className="w-9 h-9 rounded-lg border border-[#EDE8DF] text-ink hover:bg-[#F5F0E6] transition"
            title="Divider"
          >
            —
          </button>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#F5F0E6] text-sm text-ink-light">
          {category}
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-6">
            {error}
          </p>
        )}

        {/* ---- Cover image: upload from device gallery ---- */}
        <label className="text-sm font-medium text-ink mb-1 block">Cover image</label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {!image ? (
          <button
            type="button"
            onClick={handlePickImage}
            className="w-full border-2 border-dashed border-[#EDE8DF] rounded-xl py-8 mb-6 flex flex-col items-center justify-center gap-2 text-ink-light hover:bg-[#F5F0E6] transition"
          >
            <span className="text-2xl">🖼️</span>
            <span className="text-sm">Tap to upload a photo from your gallery</span>
            <span className="text-xs text-ink-light/70">JPG, PNG · up to 5MB</span>
          </button>
        ) : (
          <div className="relative mb-6">
            <img src={image} alt="preview" className="w-full h-48 object-cover rounded-xl" />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={handlePickImage}
                className="px-3 py-1 text-xs rounded-full bg-white/90 text-ink shadow hover:bg-white transition"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-1 text-xs rounded-full bg-white/90 text-red-500 shadow hover:bg-white transition"
              >
                Remove
              </button>
            </div>
            {imageName && <p className="text-xs text-ink-light mt-1">{imageName}</p>}
          </div>
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your post title..."
          className="w-full font-display font-extrabold text-4xl text-ink outline-none bg-transparent mb-6 placeholder:text-ink-light"
        />
        <div className="squiggle mb-6" />

        {/* ---- Live WYSIWYG editor: bold/italic/heading/quote show visually as you type ---- */}
        <div className="relative">
          {isEmpty && (
            <span className="absolute top-0 left-0 text-ink-light pointer-events-none select-none">
              Start writing your post here...
            </span>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            className="editor-area rich-editor"
          />
        </div>
      </div>

      {/* Minimal styling so WYSIWYG output matches the toolbar buttons */}
      <style>{`
        .rich-editor {
          outline: none;
          min-height: 300px;
          line-height: 1.75;
        }
        .rich-editor h2 {
          font-family: inherit;
          font-weight: 800;
          font-size: 1.5rem;
          margin: 1.25rem 0 0.5rem;
        }
        .rich-editor blockquote {
          border-left: 3px solid #D9CDBB;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #6B6355;
          font-style: italic;
        }
        .rich-editor hr {
          border: none;
          border-top: 1px solid #EDE8DF;
          margin: 1.5rem 0;
        }
        .rich-editor b, .rich-editor strong { font-weight: 700; }
        .rich-editor i, .rich-editor em { font-style: italic; }
      `}</style>
    </div>
  )
}