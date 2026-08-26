import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PlanCards } from "@/components/plan-cards"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { PromoBadge } from "@/components/promo-badge"
import { HeroConversionCtas } from "@/components/hero-conversion-ctas"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  getAllCitySlugs, slugToCity, getStateForCity, getStateForSlug, getCitiesForState,
  cityToSlug, getStateAbbreviation, stateToSlug, PRIORITY_MARKET_SLUGS,
} from "@/lib/city-data"
import { cityIntro, cityAngle, cityAvailabilityNote, cityFaqs, citySecondaryContent } from "@/lib/city-content"
import { getPriorityCityContent } from "@/lib/priority-city-content"
import { breadcrumbSchema, faqSchema, localServiceSchema } from "@/lib/schema-data"
import { getCanonicalCityPath } from "@/lib/canonical-map"
import { PLANS, CURRENT_PROMOTION } from "@/lib/commercial-data"
import { cityMetadata } from "@/lib/seo-metadata"
import { ArrowRight } from "lucide-react"

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const city = slugToCity(slug)
  const state = getStateForSlug(slug) || getStateForCity(city)
  if (!state) return {}
  const abbr = getStateAbbreviation(state)
  const canonical = getCanonicalCityPath(slug)
  return cityMetadata(slug, city, abbr, canonical)
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const city = slugToCity(slug)
  const state = getStateForSlug(slug) || getStateForCity(city)
  if (!state) return notFound()

  const abbr = getStateAbbreviation(state)
  const siblingCities = getCitiesForState(state).filter((c) => c !== city)
  const nearby = siblingCities
    .filter((c) => PRIORITY_MARKET_SLUGS.includes(cityToSlug(c, state)))
    .concat(siblingCities)
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 12)

  const priorityContent = getPriorityCityContent(slug)
  const intro = priorityContent?.intro ?? cityIntro(city, state, abbr)
  const angle = priorityContent?.angle ?? cityAngle(city)
  const secondary = priorityContent?.secondary ?? citySecondaryContent(city, state)
  const availabilityNote = priorityContent?.availability ?? cityAvailabilityNote(city)
  const faqs = cityFaqs(city, state, abbr)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://metroconet.com" },
        { name: state, url: `https://metroconet.com/metronet-state/${stateToSlug(state)}` },
        { name: city, url: `https://metroconet.com${getCanonicalCityPath(slug)}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema(`${city}, ${abbr}`, "City")) }} />

      <section className="relative pt-12 pb-10 overflow-hidden" data-testid="city-hero">
        <div className="absolute inset-0 tech-grid -z-10 opacity-60" aria-hidden="true" />
        <div className="bloom bloom-purple w-[520px] h-[520px] -top-52 -left-32 opacity-55" aria-hidden="true" />
        <div className="container relative">
          <p className="text-white/40 text-sm mb-5" data-testid="city-breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            {" / "}
            <Link href={`/metronet-state/${stateToSlug(state)}`} className="hover:text-white">{state}</Link>
            {" / "}
            <span className="text-white/70">{city}</span>
          </p>
          <PromoBadge className="mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-display font-extrabold text-white max-w-3xl leading-[1.04]" data-testid="city-heading">
            Metronet Fiber Internet in <span className="text-gradient-purple">{city}, {abbr}</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
            Plans from {PLANS[0].priceLabel}/mo with AutoPay and speeds up to {PLANS[PLANS.length - 1].speed}. {CURRENT_PROMOTION.headline}
          </p>
          <HeroConversionCtas plansHref="#plans" />
        </div>
      </section>

      <section id="plans" className="py-14 border-t border-white/5 scroll-mt-28" data-testid="city-plans-section">
        <div className="container">
          <SectionHeading
            eyebrow={`${city} plans`}
            accent="green"
            className="mb-12"
            title={`Metronet plans available in ${city}`}
            copy={`Pricing in ${city} matches Metronet's standard residential pricing. Every plan includes symmetrical speeds, unlimited data, and no annual contract.`}
          />
          <PlanCards />
        </div>
      </section>

      <section className="py-14 border-t border-white/5" data-testid="city-content-section">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <ScrollReveal className="prose-mc">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-[1.15] mb-6">
                Why choose Metronet fiber in {city}?
              </h2>
              <p>{intro}</p>

              <h3>{angle.heading}</h3>
              <p>{angle.body}</p>

              <h2>Fiber internet coverage in {city}, {abbr}</h2>
              <p>{availabilityNote}</p>
              <p>
                Availability is address-specific. If you want to check your location before ordering, use the{" "}
                <Link href="/check-availability">availability tool</Link>. You can still compare published plans and pricing
                without making availability a required first step.
              </p>

              <h2>Getting Metronet Internet in {city}</h2>
              <p>
                Start by choosing the speed that fits your household, then complete the online order with your {city}
                service address and preferred install date and time window. The order form keeps the selected plan with
                you so you can move from comparison to checkout without restarting the shopping process.
              </p>

              <h3>Current offer for new {city} customers</h3>
              <p>
                <strong>{CURRENT_PROMOTION.name}</strong> is available for eligible new customers ordering new Metronet service.
                {" "}{CURRENT_PROMOTION.disclaimer} See <Link href="/promotions">current promotions</Link> or compare the
                current speeds on the <Link href="/plans-pricing">plans and pricing page</Link>.
              </p>

              <h3>{secondary.heading}</h3>
              <p>{secondary.body}</p>

              <h3>Already a Metronet customer in {city}?</h3>
              <p>
                Metroconet is an independent authorized retailer for <em>new</em> Metronet service. For billing,
                outages, or technical support on an existing account, contact official Metronet Customer Care — details
                are on our <Link href="/support">support page</Link>.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.08}>
              <div className="glass-card rounded-[26px] p-8 mb-8">
                <p className="text-white/40 text-[11px] uppercase tracking-[0.18em] mb-5">{city} at a glance</p>
                <dl className="space-y-5">
                  {[
                    { q: "State", a: `${state} (${abbr})` },
                    { q: "Speeds available", a: PLANS.map((p) => p.speed).join(" · ") },
                    { q: "Starting price", a: `${PLANS[0].priceLabel}/mo with AutoPay` },
                    { q: "Most popular", a: "1 Gig at $70/mo" },
                    { q: "Data cap", a: "None" },
                    { q: "Contract", a: "None required" },
                    { q: "Current offer", a: "First Month Free (eligible new customers)" },
                  ].map((item) => (
                    <div key={item.q}>
                      <dt className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.q}</dt>
                      <dd className="text-white font-display font-semibold text-sm">{item.a}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/plans-pricing"
                  data-testid="city-sidebar-cta"
                  className="btn-shine block text-center mt-8 bg-mc-purple text-white font-display font-bold text-sm py-3.5 rounded-full hover:bg-mc-green hover:text-black transition-colors"
                >
                  Order Metronet in {city}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="py-14 border-t border-white/5" data-testid="city-nearby-markets">
          <div className="container">
            <ScrollReveal className="mb-8">
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">Other Metronet markets in {state}</h2>
              <p className="text-white/50 text-sm mt-2">
                Browse nearby service areas or see the full{" "}
                <Link href={`/metronet-state/${stateToSlug(state)}`} className="text-mc-purple hover:text-white underline underline-offset-4">{state} market list</Link>.
              </p>
            </ScrollReveal>
            <div className="flex flex-wrap gap-2.5">
              {nearby.map((c) => {
                const cSlug = cityToSlug(c, state)
                return (
                  <Link key={c} href={getCanonicalCityPath(cSlug)} data-testid={`nearby-city-${cSlug}`} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-white/70 text-sm hover:border-mc-purple hover:bg-mc-purple/10 hover:text-white transition-colors">
                    {c}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 border-t border-white/5" data-testid="city-faq-section">
        <div className="container max-w-3xl">
          <ScrollReveal className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Metronet in {city}: FAQs</h2>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`city-faq-item-${i}`}>
                  <AccordionTrigger className="text-left text-white font-display font-semibold hover:text-mc-purple py-5">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
          <Link href="/plans-pricing" data-testid="city-bottom-cta" className="btn-shine inline-flex items-center gap-2 bg-mc-purple text-white font-display font-bold px-8 py-4 rounded-full mt-10 hover:bg-mc-green hover:text-black transition-colors">
            View Plans &amp; Order Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
