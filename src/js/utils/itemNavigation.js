export function slugify(input = ''){
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function getPreferredIdentifier(item){
  // Prefer backend-ready identifiers when present
  // mal_id is the primary identifier for Jikan API
  if (item?.mal_id) return String(item.mal_id)
  if (item?.id) return String(item.id)
  if (item?.slug) return String(item.slug)
  return slugify(item?.name || 'unknown')
}

export function buildItemDetailsPath(item){
  const idOrSlug = getPreferredIdentifier(item)
  return `/details/${idOrSlug}`
}

export function buildReadPath(item, chapter){
  const idOrSlug = getPreferredIdentifier(item)
  const safeChapter = Number.isFinite(Number(chapter)) && Number(chapter) > 0 ? Number(chapter) : 1
  return `/read/${idOrSlug}/${safeChapter}`
}