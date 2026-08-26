// Per-market canonical URL preference derived from the historical GSC Pages export.
// Most markets use /city/[slug]. These legacy /metronet/[slug] URLs are preserved
// where that URL family historically won or was the only meaningful GSC URL.

export const METRONET_CANONICAL_SLUGS = new Set([
  "tallahassee",
  "fayetteville",
  "lansing",
  "sioux-city",
  "omaha",
  "rochester",
  "naperville",
  "west-des-moines",
  "piqua",
  "new-castle",
  "la-crosse",
  "ormond-beach",
  "okemos",
  "shakopee",
  "wabash",
  "beavercreek",
  "saint-peter",
  "mayer",
  "thorntown",
  "northfield",
  "chanhassen",
  "saint-paul",
  "grimes",
  "elysian",
  "toledo",
  "jordan",
  "elburn",
  "holt",
  "englewood",
  "havelock",
  "west-milton",
  "plano",
  "byron",
  "new-germany",
  "stewartville",
  "brookville",
  "brownsdale",
  "le-roy",
  "la-fontaine",
  "pendleton",
  "henderson",
  "kenyon",
])

// Old undifferentiated slugs that now need state-qualified city slugs.
// Le Roy is the exception: the historical Illinois winner remains /metronet/le-roy.
export const COLLISION_REDIRECTS: Record<string, string> = {
  hampton: "hampton-ia",
  geneva: "geneva-il",
  "le-roy": "le-roy-il",
}

// Generated city slugs whose canonical URL is a different historical slug.
const CANONICAL_PATH_OVERRIDES: Record<string, string> = {
  "le-roy-il": "/metronet/le-roy",
}

/** Return the one canonical/indexable path for a generated city slug. */
export function getCanonicalCityPath(slug: string): string {
  if (CANONICAL_PATH_OVERRIDES[slug]) return CANONICAL_PATH_OVERRIDES[slug]
  return METRONET_CANONICAL_SLUGS.has(slug) ? `/metronet/${slug}` : `/city/${slug}`
}

/** Resolve an old ambiguous base slug to the generated state-qualified slug. */
export function resolveCollisionSlug(slug: string): string {
  return COLLISION_REDIRECTS[slug] || slug
}
