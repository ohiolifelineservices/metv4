import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { breadcrumbSchema } from "@/lib/schema-data"

export const metadata: Metadata = staticPageMetadata(
  "Internet Sales Careers | Fiber Customer Acquisition",
  "Explore future opportunities in internet sales, customer acquisition, lifecycle marketing and conversion-focused web work.",
  "/careers",
)

export default function CareersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://metroconet.com" }, { name: "Careers", url: "https://metroconet.com/careers" }])) }} />

      <section className="relative pt-14 pb-16 overflow-hidden" data-testid="careers-page">
        <div className="absolute inset-0 tech-grid -z-10 opacity-60" aria-hidden="true" />
        <div className="bloom bloom-teal w-[440px] h-[440px] -top-44 right-0 opacity-45" aria-hidden="true" />
        <div className="container relative max-w-3xl">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.03] mb-7">
              Careers at <span className="text-gradient-purple">Metroconet</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal className="prose-mc">
            <p>
              Metroconet is an independent authorized retailer for new Metronet fiber internet service. Our work sits at
              the point where a household decides to switch: making plans easy to compare, availability easy to confirm,
              and ordering fast enough to finish in one sitting.
            </p>
            <p>
              We don&apos;t have open roles posted right now. If you work in inside sales, customer acquisition,
              lifecycle marketing, or conversion-focused web work and want to be considered when we do, reach out through
              our <Link href="/contact-us">contact page</Link>.
            </p>
            <h3>What we care about</h3>
            <ul>
              <li>Telling customers the truth about pricing, coverage, and what fiber actually changes</li>
              <li>Removing steps between a question and an answer</li>
              <li>Treating existing-customer support requests with respect and routing them to the right place</li>
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
