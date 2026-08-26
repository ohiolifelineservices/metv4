import type { Metadata } from "next"
import { PRIORITY_MARKET_SLUGS } from "@/lib/city-data"

const SITE_URL = "https://metroconet.com"
const OG_IMAGE = "/og-image.png"

const TOP_CITY_DESCRIPTIONS: Record<string, (city: string, abbr: string) => string> = {
  bloomington: (city, abbr) =>
    `Shopping for Metronet in ${city}, ${abbr}? Plans start at $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Order online today.`,
  lexington: (city, abbr) =>
    `Compare Metronet internet plans in ${city}, ${abbr} from $60/mo. Choose 500 Mbps, 1 Gig or 2 Gig and get your first month FREE on eligible new service.`,
  ames: (city, abbr) =>
    `Get Metronet internet in ${city}, ${abbr} from $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Order new service online today.`,
  davenport: (city, abbr) =>
    `Shop Metronet plans in ${city}, ${abbr} from $60/mo. Compare 500 Mbps, 1 Gig and 2 Gig. First month FREE for eligible new customers. Order online.`,
  fayetteville: (city, abbr) =>
    `Looking for Metronet in ${city}, ${abbr}? Plans start at $60/mo with speeds up to 2 Gig. Get your first month FREE on eligible new service.`,
  lafayette: (city, abbr) =>
    `Compare Metronet fiber plans in ${city}, ${abbr} from $60/mo. Get speeds up to 2 Gig plus your first month FREE on eligible new service.`,
  hickory: (city, abbr) =>
    `Metronet plans in ${city}, ${abbr} start at $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Order new service online.`,
  bryan: (city, abbr) =>
    `Ready for Metronet in ${city}, ${abbr}? Compare plans from $60/mo, speeds up to 2 Gig and the current first month FREE offer for new service.`,
  indianapolis: (city, abbr) =>
    `Shop Metronet internet in ${city}, ${abbr}. Plans start at $60/mo with speeds up to 2 Gig, plus first month FREE for eligible new customers.`,
  waterloo: (city, abbr) =>
    `See Metronet plans in ${city}, ${abbr} from $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Order online today.`,
  tallahassee: (city, abbr) =>
    `Looking for Metronet in ${city}, ${abbr}? See plans from $60/mo, speeds up to 2 Gig and the current first month FREE offer for eligible new customers.`,
  lansing: (city, abbr) =>
    `Compare Metronet internet in ${city}, ${abbr} from $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Order online today.`,
}

const PRIORITY_CITY_VARIANTS = [
  (city: string, abbr: string) =>
    `Metronet plans in ${city}, ${abbr} start at $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Order online today.`,
  (city: string, abbr: string) =>
    `Get your first month FREE on eligible new Metronet service in ${city}, ${abbr}. Plans start at $60/mo with speeds up to 2 Gig. Shop plans online.`,
  (city: string, abbr: string) =>
    `Shop Metronet in ${city}, ${abbr} with speeds up to 2 Gig and plans from $60/mo. First month FREE for eligible new customers. Order online today.`,
  (city: string, abbr: string) =>
    `Compare Metronet 500 Mbps, 1 Gig and 2 Gig plans in ${city}, ${abbr}, starting at $60/mo. Get your first month FREE on eligible new service.`,
  (city: string, abbr: string) =>
    `Ready for Metronet in ${city}, ${abbr}? Plans start at $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Order online today.`,
  (city: string, abbr: string) =>
    `Metronet fiber in ${city}, ${abbr}: plans from $60/mo, speeds up to 2 Gig and a WiFi router included. First month FREE for eligible new customers.`,
]

const SECONDARY_CITY_VARIANTS = [
  (city: string, abbr: string) =>
    `See Metronet plans in ${city}, ${abbr} from $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Compare plans and order online.`,
  (city: string, abbr: string) =>
    `Shop Metronet internet in ${city}, ${abbr}. Plans start at $60/mo, speeds reach up to 2 Gig and eligible new customers get their first month FREE.`,
  (city: string, abbr: string) =>
    `Compare Metronet fiber in ${city}, ${abbr}: 500 Mbps, 1 Gig and 2 Gig plans from $60/mo, plus first month FREE for eligible new service.`,
  (city: string, abbr: string) =>
    `Metronet in ${city}, ${abbr} starts at $60/mo with speeds up to 2 Gig. Get your first month FREE on eligible new service and order online today.`,
]

function stableVariantIndex(value: string, count: number): number {
  let total = 0
  for (let i = 0; i < value.length; i += 1) total += value.charCodeAt(i) * (i + 1)
  return total % count
}

export function cityMetadata(slug: string, city: string, abbr: string, canonicalPath: string): Metadata {
  const title = `Metronet ${city}, ${abbr} | Plans from $60 | FREE Month`
  const explicit = TOP_CITY_DESCRIPTIONS[slug]
  const priorityIndex = PRIORITY_MARKET_SLUGS.indexOf(slug)
  const description = explicit
    ? explicit(city, abbr)
    : priorityIndex >= 0
      ? PRIORITY_CITY_VARIANTS[priorityIndex % PRIORITY_CITY_VARIANTS.length](city, abbr)
      : SECONDARY_CITY_VARIANTS[stableVariantIndex(slug, SECONDARY_CITY_VARIANTS.length)](city, abbr)

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `Metronet internet plans in ${city}, ${abbr}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  }
}

const STATE_DESCRIPTION_VARIANTS = [
  (state: string) =>
    `Shop Metronet fiber in ${state} from $60/mo. Get your first month FREE, compare speeds up to 2 Gig, find your city and order new service online.`,
  (state: string) =>
    `Looking for Metronet in ${state}? Compare plans from $60/mo with speeds up to 2 Gig and first month FREE for eligible new customers. Find your city.`,
  (state: string) =>
    `Compare Metronet internet plans in ${state} from $60/mo. Choose speeds up to 2 Gig, get your first month FREE as an eligible new customer and order new service online.`,
  (state: string) =>
    `Metronet fiber plans in ${state} start at $60/mo with speeds up to 2 Gig. First month FREE for eligible new customers. Find your city and shop plans.`,
]

export function stateMetadata(slug: string, state: string): Metadata {
  const title = `Metronet ${state} | Fiber Plans from $60 | FREE Month`
  const description = STATE_DESCRIPTION_VARIANTS[stableVariantIndex(slug, STATE_DESCRIPTION_VARIANTS.length)](state)
  const canonical = `${SITE_URL}/metronet-state/${slug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `Metronet internet plans in ${state}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  }
}

export function staticPageMetadata(title: string, description: string, canonicalPath: string): Metadata {
  const canonical = `${SITE_URL}${canonicalPath}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Metronet internet plans and pricing" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  }
}
