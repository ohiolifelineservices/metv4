import type { MetadataRoute } from "next"
import { getAllCitySlugs, getAllStateSlugs } from "@/lib/city-data"
import { getCanonicalCityPath } from "@/lib/canonical-map"

const BASE = "https://metroconet.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/plans-pricing`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/promotions`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/check-availability`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/why-metronet`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/metronet-state`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/support`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact-us`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/careers`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const statePages: MetadataRoute.Sitemap = getAllStateSlugs().map((slug) => ({
    url: `${BASE}/metronet-state/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Use the canonical URL family for each city (some are /metronet/, most are /city/)
  const slugsSeen = new Set<string>()
  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs()
    .filter((slug) => {
      if (slugsSeen.has(slug)) return false
      slugsSeen.add(slug)
      return true
    })
    .map((slug) => ({
      url: `${BASE}${getCanonicalCityPath(slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return [...staticPages, ...statePages, ...cityPages]
}
