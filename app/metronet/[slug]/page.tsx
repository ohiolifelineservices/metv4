// Serves city-level content for markets where /metronet/[slug] is the
// historically winning canonical URL per GSC evidence. Non-canonical slugs
// are redirected by middleware before they reach this component.

import { METRONET_CANONICAL_SLUGS, getCanonicalCityPath } from "@/lib/canonical-map"
import { slugToCity, getStateForSlug, getStateForCity, getStateAbbreviation } from "@/lib/city-data"
import { cityMetadata } from "@/lib/seo-metadata"

export { default } from "@/app/city/[slug]/page"

export async function generateStaticParams() {
  return Array.from(METRONET_CANONICAL_SLUGS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const city = slugToCity(slug)
  const state = getStateForSlug(slug) || getStateForCity(city)
  if (!state) return {}
  const abbr = getStateAbbreviation(state)
  const canonical = getCanonicalCityPath(slug)
  return cityMetadata(slug, city, abbr, canonical)
}
