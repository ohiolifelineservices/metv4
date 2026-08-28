import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/home/hero"
import { TrustBar } from "@/components/home/trust-bar"
import { MarqueeStrip } from "@/components/marquee-strip"
import { PlanCards } from "@/components/plan-cards"
import { FiberComparison } from "@/components/home/fiber-comparison"
import { HowItWorks } from "@/components/home/how-it-works"
import { LifestyleGrid } from "@/components/home/lifestyle-grid"
import { ServiceAreasTeaser } from "@/components/home/service-areas-teaser"
import { HomeSeoContent } from "@/components/home/seo-content"
import { HomeFAQ } from "@/components/home/faq-section"
import { SectionHeading } from "@/components/section-heading"
import { ScrollReveal } from "@/components/scroll-reveal"
import { faqSchema } from "@/lib/schema-data"
import { HOME_FAQS } from "@/lib/home-faqs"

export const metadata: Metadata = staticPageMetadata(
  "Metronet Internet | Plans from $60 | First Month FREE",
  "Shop Metronet internet plans from $60/mo with speeds up to 2 Gig. Get your first month FREE and a WiFi router included. Order new service online today.",
  "/",
)

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS.map((f) => ({ question: f.q, answer: f.a })))) }} />

      <Hero />
      <TrustBar />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="home-plans-section">
        <div className="bloom bloom-purple w-[520px] h-[520px] -top-40 left-1/2 -translate-x-1/2 opacity-60" aria-hidden="true" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Plans & pricing"
            accent="green"
            className="mb-12"
            title="Choose your fiber speed"
            copy="Every plan is 100% fiber with symmetrical upload and download, unlimited data, and no annual contract. 1 Gig is the mainstream pick for most households — and 2 Gig is only $10 more."
          />
          <PlanCards />
          <ScrollReveal className="text-center mt-12">
            <Link href="/plans-pricing" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-display font-semibold text-sm" data-testid="home-see-full-plans-link">
              See the full plan comparison &amp; FAQs <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeStrip />
      <FiberComparison />
      <HowItWorks />
      <LifestyleGrid />
      <ServiceAreasTeaser />
      <HomeSeoContent />
      <HomeFAQ />

      <section className="relative py-20 sm:py-16 border-t border-white/5 overflow-hidden" data-testid="home-final-cta">
        <div className="bloom bloom-purple w-[700px] h-[700px] -bottom-96 left-1/2 -translate-x-1/2 opacity-80" aria-hidden="true" />
        <div className="container relative text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.02] max-w-3xl mx-auto mb-6">
            Ready for internet that <span className="text-gradient-purple">uploads as fast as it downloads</span>?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            First Month Free for eligible new customers. Order new Metronet fiber service online and pick your own
            install window.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/plans-pricing" data-testid="final-cta-plans-link" className="btn-shine inline-flex items-center gap-2 bg-mc-purple text-white font-display font-bold px-9 py-4 rounded-full hover:bg-mc-green hover:text-black transition-colors duration-300">
              View Plans &amp; Order Now <ArrowRight size={18} />
            </Link>
            <Link href="/check-availability" data-testid="final-cta-availability-link" className="inline-flex items-center gap-2 border border-white/25 text-white font-display font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              Check My Address
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
