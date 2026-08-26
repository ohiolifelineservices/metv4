import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { states, stateToSlug, getStateAbbreviation, cities, PRIORITY_MARKET_SLUGS, cityToSlug, slugToCity } from "@/lib/city-data"
import { getCanonicalCityPath } from "@/lib/canonical-map"
import { breadcrumbSchema } from "@/lib/schema-data"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = staticPageMetadata(
  "Metronet Service Areas | Plans from $60 | FREE Month",
  "Find Metronet service in your city and compare fiber plans from $60/mo. Speeds up to 2 Gig plus first month FREE for eligible new customers.",
  "/metronet-state",
)

export default function ServiceAreasIndexPage() {
  const entries = Object.entries(states)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://metroconet.com" }, { name: "Service Areas", url: "https://metroconet.com/metronet-state" }])) }} />

      <section className="relative pt-14 pb-12 overflow-hidden" data-testid="service-areas-index">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1a0a3e] via-[#0d1b3e] to-[#0a2e2e] opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/90 to-black" />
        <div className="container relative">
          <ScrollReveal className="max-w-3xl">
            <p className="text-mc-teal font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">Coverage</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.02]">
              Metronet <span className="text-gradient-purple">service areas</span>
            </h1>
            <p className="text-white/65 text-base sm:text-lg mt-6 leading-relaxed">
              Metronet fiber internet is live in {cities.length}+ markets across {entries.length} states. Choose your
              state to see every market, then open your city for local plans, pricing, and availability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20" data-testid="service-areas-state-grid">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {entries.map(([state, stateCities], i) => (
              <ScrollReveal key={state} delay={i * 0.04}>
                <Link
                  href={`/metronet-state/${stateToSlug(state)}`}
                  data-testid={`state-index-link-${stateToSlug(state)}`}
                  className="group glass-card glass-card-hover rounded-[24px] p-7 flex items-center justify-between h-full"
                >
                  <div>
                    <h2 className="text-white font-display font-bold text-lg">{state}</h2>
                    <p className="text-white/40 text-sm mt-1">
                      {stateCities.length} {stateCities.length === 1 ? "market" : "markets"} &bull; {getStateAbbreviation(state)}
                    </p>
                  </div>
                  <ArrowRight className="text-white/35 group-hover:text-mc-purple group-hover:translate-x-1 transition-all shrink-0" size={20} />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/5" data-testid="service-areas-popular-markets">
        <div className="container">
          <SectionHeading
            eyebrow="Popular markets"
            accent="green"
            className="mb-10"
            title="Most-searched Metronet cities"
            copy="Jump straight to a market page for local plans, pricing, and availability."
          />
          <div className="flex flex-wrap gap-2.5">
            {PRIORITY_MARKET_SLUGS.slice(0, 40).map((slug) => (
              <Link key={slug} href={getCanonicalCityPath(slug)} data-testid={`popular-market-${slug}`} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-white/70 text-sm hover:border-mc-purple hover:bg-mc-purple/10 hover:text-white transition-colors">
                {slugToCity(slug)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/5" data-testid="service-areas-content">
        <div className="container max-w-3xl">
          <ScrollReveal className="prose-mc">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-[1.15] mb-6">
              How Metronet coverage expands
            </h2>
            <p>
              Metronet is a fiber-to-the-home provider, which means the network is physically built out street by street
              rather than broadcast over existing copper or wireless infrastructure. That is why coverage grows
              neighborhood by neighborhood inside a market, and why a city can appear on this list while a specific
              address within it still needs verification.
            </p>
            <p>
              Markets on the network offer residential fiber plans at 500 Mbps, 1 Gig, and 2 Gig with
              unlimited data and no annual contract. See <Link href="/plans-pricing">plans and pricing</Link> for the
              full comparison.
            </p>
            <p>
              To confirm your own address, use the <Link href="/check-availability">availability checker</Link>. If your
              area isn&apos;t live yet, joining the waitlist records the demand so you hear about it when construction
              reaches your block.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
