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
  getAllStateSlugs, slugToState, getCitiesForState, cityToSlug,
  getStateAbbreviation, getStateContent, PRIORITY_MARKET_SLUGS,
} from "@/lib/city-data"
import { stateIntroLong } from "@/lib/city-content"
import { breadcrumbSchema, localServiceSchema, faqSchema } from "@/lib/schema-data"
import { getCanonicalCityPath } from "@/lib/canonical-map"
import { PLANS, CURRENT_PROMOTION } from "@/lib/commercial-data"
import { stateMetadata } from "@/lib/seo-metadata"
import { ArrowRight } from "lucide-react"

export async function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const state = slugToState(slug)
  const cities = getCitiesForState(state)
  if (cities.length === 0) return {}
  return stateMetadata(slug, state)
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const state = slugToState(slug)
  const cities = getCitiesForState(state)
  if (cities.length === 0) return notFound()

  const content = getStateContent(state)
  const abbr = getStateAbbreviation(state)
  const priorityFirst = cities
    .filter((c) => PRIORITY_MARKET_SLUGS.includes(cityToSlug(c, state)))
    .concat(cities)
    .filter((v, i, a) => a.indexOf(v) === i)

  const topMarkets = priorityFirst.slice(0, 8)

  const faqs = [
    { question: `Where is Metronet fiber available in ${state}?`, answer: `Metronet fiber is live in ${cities.length} ${state} ${cities.length === 1 ? "market" : "markets"}, including ${content.majorMarkets.slice(0, 4).join(", ")}. Coverage is built street by street, so confirm your exact address before ordering.` },
    { question: `How much does Metronet internet cost in ${state}?`, answer: `Pricing is consistent across ${state}: $60/mo for 500 Mbps, $70/mo for 1 Gig, and $80/mo for 2 Gig, all with AutoPay. First Month Free is available for eligible new customers.` },
    { question: `Are Metronet speeds the same everywhere in ${state}?`, answer: `Metronet offers 500 Mbps, 1 Gig, and 2 Gig fiber plans across ${state} markets. Plans include unlimited data and no annual contract. Availability and specific plan options may vary by address.` },
    { question: `Is there a data cap or contract in ${state}?`, answer: `No. All current Metronet residential plans include unlimited data with no overage charges, and no annual contract is required.` },
    { question: `How do I order Metronet service in ${state}?`, answer: `Find your city below or use the availability checker, choose a speed, and complete the order online. You'll pick a preferred install date and time window and receive an email confirmation.` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://metroconet.com" },
        { name: "Service Areas", url: "https://metroconet.com/metronet-state" },
        { name: state, url: `https://metroconet.com/metronet-state/${slug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema(state, "State")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <section className="relative pt-12 pb-10 overflow-hidden" data-testid="state-hero">
        <div className="absolute inset-0 tech-grid -z-10 opacity-60" aria-hidden="true" />
        <div className="bloom bloom-teal w-[520px] h-[520px] -top-52 right-0 opacity-50" aria-hidden="true" />
        <div className="container relative">
          <p className="text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-white">Home</Link>
            {" / "}
            <Link href="/metronet-state" className="hover:text-white">Service Areas</Link>
            {" / "}
            <span className="text-white/70">{state}</span>
          </p>
          <PromoBadge className="mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-display font-extrabold text-white max-w-3xl leading-[1.04]" data-testid="state-heading">
            Metronet Fiber Internet in <span className="text-gradient-purple">{state}</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
            Plans from {PLANS[0].priceLabel}/mo with AutoPay and speeds up to {PLANS[PLANS.length - 1].speed}. {CURRENT_PROMOTION.headline} Available in {cities.length} {cities.length === 1 ? "city" : "cities"} across {state}.
          </p>
          <HeroConversionCtas plansHref="#plans" findCityHref="#markets" />
        </div>
      </section>

      <section id="plans" className="py-14 border-t border-white/5 scroll-mt-28" data-testid="state-plans-section">
        <div className="container">
          <SectionHeading
            eyebrow={`${state} pricing`}
            accent="green"
            className="mb-12"
            title={`Metronet plans available across ${state}`}
            copy="Standard residential plans and pricing across Metronet's service areas."
          />
          <PlanCards />
        </div>
      </section>

      <section id="markets" className="py-14 border-t border-white/5 scroll-mt-28" data-testid="state-markets-section">
        <div className="container">
          <ScrollReveal className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {state} service areas <span className="text-white/40 text-base font-normal">({cities.length} {cities.length === 1 ? "market" : "markets"})</span>
            </h2>
            <p className="text-white/50 text-sm mt-3 max-w-2xl">
              Open your city for local plans, pricing, and availability details. Coverage is built street by street, so
              confirm your exact address before ordering.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {topMarkets.map((c, i) => (
              <ScrollReveal key={c} delay={i * 0.04}>
                <Link href={getCanonicalCityPath(cityToSlug(c, state))} data-testid={`state-top-market-${cityToSlug(c, state)}`} className="group glass-card glass-card-hover rounded-2xl px-6 py-5 flex items-center justify-between">
                  <span>
                    <span className="block text-white font-display font-bold text-sm">{c}, {abbr}</span>
                    <span className="block text-white/40 text-xs mt-0.5">Plans &amp; availability</span>
                  </span>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-mc-purple group-hover:translate-x-1 transition-all" />
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5" data-testid="state-city-list">
            {priorityFirst.map((c) => (
              <Link key={c} href={getCanonicalCityPath(cityToSlug(c, state))} data-testid={`state-city-link-${cityToSlug(c, state)}`} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-white/70 text-sm hover:border-mc-purple hover:bg-mc-purple/10 hover:text-white transition-colors">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/5" data-testid="state-content-section">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <ScrollReveal className="prose-mc">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-[1.15] mb-6">
                Shopping for fiber internet in {state}
              </h2>
              <p>{stateIntroLong(state, cities.length, content.majorMarkets)}</p>

              <h3>What you get on every {state} plan</h3>
              <ul>
                {PLANS.map((p) => (
                  <li key={p.id}><strong>{p.speed} — {p.priceLabel}/mo with AutoPay.</strong> {p.bestFor}.</li>
                ))}
                <li>Symmetrical upload and download on all three tiers</li>
                <li>Unlimited data with no overage charges</li>
                <li>No annual contract requirement</li>
                <li>Fiber gateway/router included with installation</li>
              </ul>

              <h3>Availability varies by street, not just by city</h3>
              <p>
                Fiber requires a physical line to each home, so Metronet builds out block by block within a market. Two
                addresses in the same {state} neighborhood can have different answers today. Use the{" "}
                <Link href="/check-availability">availability checker</Link> to confirm your area, and your exact street
                address is verified during ordering. If your block isn&apos;t live yet, the waitlist records your area.
              </p>

              <h3>Ordering new Metronet service in {state}</h3>
              <p>
                Metroconet is an independent authorized retailer for new Metronet service. You compare speeds, place the
                order online, and choose a preferred install date and time window — no store visit and no phone queue.
                Existing Metronet customers who need billing or technical support should contact official Metronet
                Customer Care, listed on our <Link href="/support">support page</Link>.
              </p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.08}>
              <h2 className="text-2xl font-display font-extrabold text-white mb-5">{state} FAQs</h2>
              <Accordion type="single" collapsible data-testid="state-faq-accordion">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`state-faq-item-${i}`}>
                    <AccordionTrigger className="text-left text-white font-display font-semibold hover:text-mc-purple text-sm py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-white/60 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link href="/plans-pricing" className="btn-shine inline-flex items-center gap-2 bg-mc-purple text-white font-display font-bold px-8 py-4 rounded-full mt-9 hover:bg-mc-green hover:text-black transition-colors" data-testid="state-bottom-cta">
                View Plans &amp; Order Now <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
