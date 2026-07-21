
import { CATEGORIES } from '../../utils/constants'

export default function CategoryCard({ active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`tag ${active === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}