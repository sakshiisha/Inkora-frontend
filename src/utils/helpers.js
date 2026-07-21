export function estimateReadTime(text = '') {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  return Math.max(1, Math.round(words / 200))
}

export function truncate(text = '', max = 140) {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

export function initials(name = '') {
  return name.trim().charAt(0).toUpperCase()
}