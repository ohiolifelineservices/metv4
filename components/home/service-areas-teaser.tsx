import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { states, stateToSlug, cityToSlug, cities, getStateAbbreviation } from "@/lib/city-data"
import { getCanonicalCityPath } from "@/lib/canonical-map"

export function ServiceAreasTeaser() {
  const entries = Object.entries(states)
  const stateCount = entries.length

  return (
    <section className="relative py-16 sm:py-14 border-t border-white/5 overflow-hidden" data-testid="service-areas-teaser">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a0a1e] via-black to-[#0a1a1a] opacity-80" />

      <div className="container relative">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
          <div className="max-w-2xl">
            <p className="text-mc-teal font-display font-bold text-xs uppercase tracking-[0.2em] mb-3">Where Metronet serves</p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-[1.08]">
              Metronet fiber internet in {cities.length}+ cities across {stateCount} states
            </h2>
            <p className="text-white/60 leading-relaxed mt-4">
              Fiber is built street by street, so availability can differ between two addresses in the same town. Find
              your city below.
            </p>
          </div>
          <Link href="/metronet-state" className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-display font-semibold shrink-0" data-testid="service-areas-see-all">
            All service areas <ArrowRight size={16} />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="service-areas-state-city-grid">
          {entries.map(([state, stateCities], i) => (
            <ScrollReveal key={state} delay={i * 0.03}>
              <div className="glass-card rounded-[22px] p-6 h-full">
                <Link
                  href={`/metronet-state/${stateToSlug(state)}`}
                  data-testid={`home-state-link-${stateToSlug(state)}`}
                  className="flex items-baseline justify-between gap-2 text-white font-display font-bold text-base border-b border-white/10 pb-3 mb-3 hover:text-mc-purple transition-colors"
                >
                  <span>Metronet {state}</span>
                  <span className="text-white/35 text-xs font-normal shrink-0">{stateCities.length} {stateCities.length === 1 ? "city" : "cities"}</span>
                </Link>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {stateCities.slice(0, 8).map((city) => {
                    const slug = cityToSlug(city, state)
                    return (
                      <li key={city}>
                        <Link
                          href={getCanonicalCityPath(slug)}
                          data-testid={`home-city-link-${slug}`}
                          className="flex items-center text-white/55 hover:text-white text-[13px] py-0.5 transition-colors"
                        >
                          <ChevronRight size={12} className="text-mc-purple mr-1 shrink-0" />
                          {city}
                        </Link>
                      </li>
                    )
                  })}
                  {stateCities.length > 8 && (
                    <li className="col-span-2">
                      <Link
                        href={`/metronet-state/${stateToSlug(state)}`}
                        className="flex items-center text-mc-purple hover:text-white text-[13px] font-medium py-0.5 transition-colors"
                      >
                        <ChevronRight size={12} className="mr-1 shrink-0" />
                        All {stateCities.length} {getStateAbbreviation(state)} cities
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
