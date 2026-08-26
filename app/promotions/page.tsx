import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import Link from "next/link"
import { PLANS, CURRENT_PROMOTION } from "@/lib/commercial-data"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { breadcrumbSchema, faqSchema } from "@/lib/schema-data"
import { Gift, ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = staticPageMetadata(
  "Metronet Deals | First Month FREE | Plans from $60",
  "Get your first month FREE on eligible new Metronet service. Plans start at $60/mo with speeds up to 2 Gig and a WiFi router included. Shop plans online.",
  "/promotions",
)

const FAQS = [
  { question: "What is the current Metronet promotion?", answer: "Metroconet's current featured offer is First Month Free for eligible new customers ordering new Metronet service. Offer availability and eligibility may vary by service address." },
  { question: "Who qualifies for First Month Free?", answer: "The offer is for eligible new customers. Offer availability and eligibility may vary by service address, and eligibility is confirmed during the ordering process." },
  { question: "Does the promotion require a contract?", answer: "No annual contract is required on any current Metronet residential plan, including orders placed with the current promotion." },
  { question: "Which plan should I choose?", answer: "Choose the speed that best fits your household first. 1 Gig at $70/mo with AutoPay is the mainstream choice for most households; promotion eligibility is confirmed during the ordering process." },
  { question: "How long will this offer be available?", answer: "Promotions and pricing can change. This page reflects Metroconet's current active offer for new Metronet service — check back here for the latest." },
  { question: "How is promotion eligibility confirmed?", answer: "Offer availability and eligibility may vary by service address and are confirmed during the ordering process." },
]

const WHY_NOW = [
  "First Month Free is available for eligible new customers, subject to service-address eligibility",
  "No annual contract, so the offer isn't tied to a multi-year commitment",
  "Unlimited data on every plan — the promotion doesn't come with a usage catch",
  "Fiber gateway/router included with installation",
  "You choose your own install date and time window",
]

export default function PromotionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://metroconet.com" }, { name: "Promotions", url: "https://metroconet.com/promotions" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      <section className="relative pt-14 pb-16 overflow-hidden" data-testid="promotions-hero">
        <div className="absolute inset-0 tech-grid -z-10 opacity-60" aria-hidden="true" />
        <div className="bloom w-[560px] h-[560px] -top-56 left-1/4 opacity-45 bg-[rgba(255,255,0,0.14)]" aria-hidden="true" />
        <div className="container relative grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <ScrollReveal className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 bg-mc-yellow text-black font-display font-bold text-xs uppercase tracking-[0.14em] px-4 py-2 rounded-full mb-7">
              <Gift size={14} /> Current Offer
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white max-w-3xl leading-[0.98]">
              {CURRENT_PROMOTION.name}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mt-7 leading-relaxed">
              {CURRENT_PROMOTION.headline} Compare current Metronet plans, choose the speed that fits your home, and confirm
              offer eligibility during the ordering process.
            </p>
            <p className="text-white/40 text-sm max-w-xl mt-4">{CURRENT_PROMOTION.disclaimer}</p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/plans-pricing" data-testid="promotions-view-plans-button" className="btn-shine inline-flex items-center gap-2 bg-mc-purple text-white font-display font-bold px-9 py-4 rounded-full hover:bg-mc-green hover:text-black transition-colors">
                View Plans &amp; Order Now <ArrowRight size={18} />
              </Link>
              <Link href="/check-availability" data-testid="promotions-availability-button" className="inline-flex items-center gap-2 border border-white/25 text-white font-display font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
                Check Availability
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-5">
            <div className="relative glass-card rounded-[28px] p-9 border-mc-yellow/25" data-testid="promo-offer-ticket">
              <span className="absolute -top-3 left-9 bg-mc-yellow text-black text-[10px] font-display font-bold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full">
                New customers
              </span>
              <p className="text-white/40 text-[11px] uppercase tracking-[0.18em] mb-3">Eligible new customers</p>
              <p className="font-display font-extrabold text-gradient-green text-5xl sm:text-6xl leading-[0.95]">
                First Month Free
              </p>
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                First Month Free for eligible new customers ordering new Metronet service. Offer availability and
                eligibility may vary by service address and are confirmed during the ordering process.
              </p>
              <div className="h-px bg-white/10 my-7" />
              <ul className="space-y-3">
                {["No annual contract required", "Unlimited data included", "Eligibility confirmed at checkout"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/75">
                    <Check size={15} className="text-mc-green shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 border-t border-white/5" data-testid="promotions-plans-section">
        <div className="container">
          <SectionHeading
            eyebrow="Current offer"
            accent="yellow"
            className="mb-12"
            title="Compare plans with the current offer in mind"
            copy="Eligible new customers can take advantage of the First Month Free offer. Eligibility and availability may vary by service address."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="promotions-plan-summary-grid">
            {PLANS.map((plan, i) => (
              <ScrollReveal key={plan.id} delay={i * 0.07}>
                <div className="glass-card glass-card-hover rounded-[26px] p-8" data-testid={`promo-plan-${plan.id}`}>
                  <h3 className="text-2xl font-display font-bold text-white">{plan.speed}</h3>
                  <p className="text-gradient-green font-display font-extrabold text-4xl mt-3">{plan.priceLabel}<span className="text-sm text-white/50 font-medium">/mo</span></p>
                  <p className="text-white/35 text-xs mb-5">with AutoPay</p>
                  <p className="text-white/60 text-sm leading-relaxed">Current price: {plan.priceLabel}/mo with AutoPay. If you qualify for the current promotion, offer details are confirmed during ordering.</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5" data-testid="promotions-details-section">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <ScrollReveal className="prose-mc">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-[1.1] mb-7">
                Metronet deals, explained without the asterisk maze
              </h2>
              <p>
                Most internet promotions work by hiding the real cost. A low headline rate for twelve months, a
                two-year agreement, an equipment rental line item, a data cap with overage charges, and a price that
                jumps once the promotional window closes. That structure is why so many households feel misled by their
                internet bill.
              </p>
              <p>
                Metroconet&apos;s current featured offer is <strong>First Month Free for eligible new customers</strong>
                ordering new Metronet service. Offer availability and eligibility may vary by service address and are
                confirmed during ordering. Compare current plan prices on the{" "}
                <Link href="/plans-pricing">plans and pricing page</Link>.
              </p>

              <h3>Offer details</h3>
              <p>
                First Month Free is available for eligible new customers ordering new Metronet service through
                Metroconet. Offer availability and eligibility may vary by service address, and final eligibility is
                confirmed during the ordering process. This is Metroconet&apos;s current featured promotion — pricing
                and offers can change, so this page is the place to check for the active offer.
              </p>

              <h3>What makes this worth acting on</h3>
              <ul>
                {WHY_NOW.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>

              <h3>Existing Metronet customers</h3>
              <p>
                Promotions on this page apply to new Metronet service orders. If you are already a Metronet customer and
                need help with billing, an outage, or account changes, contact official Metronet Customer Care — details
                are on our <Link href="/support">support page</Link>. Metroconet is an independent authorized retailer
                and does not manage existing accounts.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.08}>
              <div className="glass-card rounded-[26px] p-8 mb-10">
                <p className="text-white/40 text-[11px] uppercase tracking-[0.18em] mb-5">Included on every plan</p>
                <ul className="space-y-3">
                  {["Unlimited data", "Symmetrical upload speeds", "No annual contract", "Fiber gateway included", "You choose the install window"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/75">
                      <Check size={15} className="text-mc-green shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <h2 className="text-2xl font-display font-extrabold text-white mb-5">Promotion FAQs</h2>
              <Accordion type="single" collapsible data-testid="promotions-faq-accordion">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`promotions-faq-item-${i}`}>
                    <AccordionTrigger className="text-left text-white font-display font-semibold hover:text-mc-purple text-sm py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-white/60 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link href="/plans-pricing" data-testid="promotions-bottom-cta" className="btn-shine inline-flex items-center gap-2 bg-mc-purple text-white font-display font-bold px-8 py-4 rounded-full mt-9 hover:bg-mc-green hover:text-black transition-colors">
                Claim the offer <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
