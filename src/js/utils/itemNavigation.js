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
  if (item?.id) return String(item.id)
  if (item?.slug) return String(item.slug)
  return slugify(item?.name || 'unknown')
}

export function buildItemDetailsPath(item){
  const idOrSlug = getPreferredIdentifier(item)
  return `/details/${idOrSlug}`
}
