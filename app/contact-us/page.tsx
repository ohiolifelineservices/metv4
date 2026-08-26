import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AvailabilityWidget } from "@/components/availability-widget"
import { SUPPORT_PHONE } from "@/lib/commercial-data"
import { breadcrumbSchema } from "@/lib/schema-data"
import { ArrowRight, ShoppingCart, MapPin, LifeBuoy } from "lucide-react"

export const metadata: Metadata = staticPageMetadata(
  "Metronet New Orders | Plans, Availability & Help",
  "Need help with new Metronet service? Compare plans, check availability or continue an order. Existing customers can find official Metronet Customer Care info.",
  "/contact-us",
)

export default function ContactUsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://metroconet.com" }, { name: "Contact Us", url: "https://metroconet.com/contact-us" }])) }} />

      <section className="relative pt-14 pb-12 overflow-hidden" data-testid="contact-us-page">
        <div className="absolute inset-0 tech-grid -z-10 opacity-60" aria-hidden="true" />
        <div className="bloom bloom-purple w-[480px] h-[480px] -top-48 -left-24 opacity-50" aria-hidden="true" />
        <div className="container relative max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.03] mb-6">
              Contact <span className="text-gradient-purple">Metroconet</span>
            </h1>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              Metroconet is an independent authorized retailer for new Metronet fiber internet service. Here&apos;s the
              fastest route depending on what you need.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {[
              { Icon: ShoppingCart, title: "Placing a new order", copy: "Compare speeds and order online in minutes, including your preferred install window.", href: "/plans-pricing", cta: "View Plans" },
              { Icon: MapPin, title: "Checking availability", copy: "Confirm whether Metronet fiber has reached your area, or join the waitlist.", href: "/check-availability", cta: "Check Address" },
              { Icon: LifeBuoy, title: "Existing account help", copy: `Billing, outages, and technical support are handled by Metronet Customer Care at ${SUPPORT_PHONE}.`, href: "/support", cta: "Support Info" },
            ].map(({ Icon, title, copy, href, cta }, i) => (
              <ScrollReveal key={title} delay={i * 0.07}>
                <div className="glass-card glass-card-hover rounded-[26px] p-7 h-full flex flex-col">
                  <Icon className="text-mc-green mb-5" size={24} />
                  <h2 className="text-white font-display font-bold text-lg mb-2">{title}</h2>
                  <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1">{copy}</p>
                  <Link href={href} className="inline-flex items-center gap-2 text-mc-purple hover:text-white font-display font-semibold text-sm transition-colors">
                    {cta} <ArrowRight size={15} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/5" data-testid="contact-availability-section">
        <div className="container max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-4">Start with your zip code</h2>
            <p className="text-white/60 mb-9 leading-relaxed">
              The quickest answer to most questions is whether fiber has reached your address. Check it here.
            </p>
            <div className="text-left">
              <AvailabilityWidget />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 border-t border-white/5">
        <div className="container max-w-3xl">
          <ScrollReveal className="prose-mc">
            <h2 className="text-2xl font-display font-extrabold text-white mb-5">Important note about who does what</h2>
            <p>
              Metroconet sells and supports <strong>new</strong> Metronet service orders. We are not Metronet, Inc., and
              we do not have access to existing Metronet accounts, billing systems, or the network operations that
              handle outages and technical issues.
            </p>
            <p>
              If you already have Metronet service and need help, contacting official Metronet Customer Care at{" "}
              {SUPPORT_PHONE} will always be faster than going through a retailer. Full details are on our{" "}
              <Link href="/support">support page</Link>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
