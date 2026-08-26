// Centralized, single source of truth for Metroconet's current commercial
// offering. Update pricing/promotions here — every page consumes this data.

export const ORDER_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyUAIeLf5c-3B0nAZy40SwO7kkbvs21bbzuHOCmCR9W1ZYAmEUacUiVXpZAoNy6FR-olQ/exec"

export const SUPPORT_PHONE = "1-877-407-3224"

export type Plan = {
  id: string
  name: string
  speed: string
  price: number
  priceLabel: string
  tagline: string
  popular?: boolean
  bestFor: string
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: "500mb",
    name: "500 Mbps",
    speed: "500 Mbps",
    price: 60,
    priceLabel: "$60",
    tagline: "Everyday fiber speed",
    bestFor: "1–3 devices, browsing, HD streaming, video calls",
    features: [
      "500 Mbps symmetrical upload & download",
      "100% fiber-optic connection",
      "No data caps",
      "No annual contract",
    ],
  },
  {
    id: "1gig",
    name: "1 Gig",
    speed: "1 Gig",
    price: 70,
    priceLabel: "$70",
    tagline: "The mainstream choice",
    popular: true,
    bestFor: "Most households — multiple devices, 4K streaming, gaming, remote work",
    features: [
      "1 Gig symmetrical upload & download",
      "100% fiber-optic connection",
      "No data caps",
      "No annual contract",
      "Best value for most homes",
    ],
  },
  {
    id: "2gig",
    name: "2 Gig",
    speed: "2 Gig",
    price: 80,
    priceLabel: "$80",
    tagline: "Only $10 more than 1 Gig",
    bestFor: "Power users, large households, heavy uploads, smart-home hubs",
    features: [
      "2 Gig symmetrical upload & download",
      "100% fiber-optic connection",
      "No data caps",
      "No annual contract",
      "Priced just $10/mo above 1 Gig",
    ],
  },
]

export const CURRENT_PROMOTION = {
  name: "First Month Free",
  headline: "First Month Free for eligible new customers.",
  disclaimer: "Offer availability and eligibility may vary by service address.",
  badge: "First Month Free",
}

export const PRICE_DISCLAIMER = "Pricing requires AutoPay. Offer availability and eligibility may vary by service address."

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

export function getPopularPlan(): Plan {
  return PLANS.find((p) => p.popular) || PLANS[1]
}
