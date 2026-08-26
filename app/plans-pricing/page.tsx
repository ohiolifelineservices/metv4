import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import Link from "next/link"
import { PlanCards } from "@/components/plan-cards"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { PromoBadge } from "@/components/promo-badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqSchema, breadcrumbSchema } from "@/lib/schema-data"
import { PLANS } from "@/lib/commercial-data"
import { Wifi, Gamepad2, Video, Home, Cloud, Users, ArrowRight } from "lucide-react"

export const metadata: Metadata = staticPageMetadata(
  "Metronet Plans & Pricing | $60–$80 | FREE Month",
  "Compare Metronet plans at $60, $70 and $80/mo. Get your first month FREE and a WiFi router included. Pick 500 Mbps, 1 Gig or 2 Gig and order online.",
  "/plans-pricing",
)

const FIT_CARDS = [
  { icon: Users, title: "1–3 people, light use", plan: "500 Mbps handles browsing, HD streaming, and video calls comfortably.", pick: "500 Mbps" },
  { icon: Gamepad2, title: "Gamers & streamers", plan: "1 Gig keeps latency low and uploads fast while others are online.", pick: "1 Gig" },
  { icon: Home, title: "Large households", plan: "1 Gig or 2 Gig absorbs a dozen-plus connected devices without slowdown.", pick: "1 Gig / 2 Gig" },
  { icon: Video, title: "Remote work & video calls", plan: "Symmetrical upload on every plan keeps calls clear and screen shares smooth.", pick: "Any plan" },
  { icon: Cloud, title: "Cloud backups & big files", plan: "2 Gig is built for large uploads, photo/video sync, and heavy cloud work.", pick: "2 Gig" },
  { icon: Wifi, title: "Smart homes, many devices", plan: "2 Gig gives headroom as you add cameras, hubs, and IoT devices over time.", pick: "2 Gig" },
]

const SPEC_ROWS = [
  { label: "Monthly price with AutoPay", values: ["$60/mo", "$70/mo", "$80/mo"] },
  { label: "Download speed", values: ["500 Mbps", "1 Gig", "2 Gig"] },
  { label: "Upload speed", values: ["500 Mbps", "1 Gig", "2 Gig"] },
  { label: "Symmetrical", values: ["Yes", "Yes", "Yes"] },
  { label: "Data cap", values: ["None", "None", "None"] },
  { label: "Annual contract", values: ["Not required", "Not required", "Not required"] },
  { label: "Best for", values: ["1–3 light users", "Most households", "Power users"] },
]

const FAQS = [
  { question: "How much does Metronet internet cost per month?", answer: "Current Metronet residential pricing through Metroconet is $60/mo for 500 Mbps, $70/mo for 1 Gig, and $80/mo for 2 Gig, all with AutoPay enrollment. First Month Free is available for eligible new customers." },
  { question: "What's the difference between 500 Mbps, 1 Gig, and 2 Gig?", answer: "All three run on the same 100% fiber network with symmetrical upload and download speeds. The difference is total bandwidth: 500 Mbps suits light households, 1 Gig is the mainstream choice for most homes, and 2 Gig is best for power users and large households that want extra headroom." },
  { question: "Is 2 Gig worth the extra cost over 1 Gig?", answer: "2 Gig is only $10/month more than 1 Gig. If your household runs many simultaneous devices, does large uploads, or wants maximum future headroom, it's an easy upgrade. If you mostly stream and browse, 1 Gig is plenty." },
  { question: "Does AutoPay change my price?", answer: "Listed pricing requires AutoPay enrollment. If you'd prefer not to use AutoPay, ask about pricing without it when you place your order." },
  { question: "Are there data caps or overage fees?", answer: "No. Every current Metronet plan includes unlimited data with no caps, no throttling, and no overage charges." },
  { question: "Is there a contract or early termination fee?", answer: "No annual contract is required on any current Metronet residential plan." },
  { question: "Is equipment included?", answer: "A fiber gateway/router is included with installation so your home is Wi-Fi ready from day one." },
  { question: "Can I change plans later?", answer: "Yes. Because there's no annual contract, you can move between speed tiers as your household needs change." },
  { question: "How do I know which plan is right for my home?", answer: "Count simultaneous heavy users, not devices. One or two light users do fine on 500 Mbps. Three or more people streaming, gaming, and working at once are best served by 1 Gig. Households with heavy uploads, a home business, or a large smart-home setup should look at 2 Gig." },
  { question: "How do I order?", answer: "Choose a plan on this page, click through to the order form, enter your service address, and pick a preferred install date and time window. A confirmation follows by email." },
]

export default function PlansPricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://metroconet.com" }, { name: "Plans & Pricing", url: "https://metroconet.com/plans-pricing" }])) }} />

      <section className="relative pt-14 pb-10 overflow-hidden" data-testid="plans-pricing-hero">
        <div className="absolute inset-0 tech-grid -z-10 opacity-70" aria-hidden="true" />
        <div className="bloom bloom-purple w-[560px] h-[560px] -top-52 -left-32 opacity-60" aria-hidden="true" />
        <div className="container relative">
          <PromoBadge className="mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white max-w-3xl leading-[1.03]">
            Metronet internet <span className="text-gradient-purple">plans &amp; pricing</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
            Compare the three current fiber speeds, choose the plan that fits your household, and order online.
            First Month Free is available for eligible new customers; offer availability and eligibility may vary by service address.
          </p>
        </div>
      </section>

      <section className="pb-16 pt-4" data-testid="plans-pricing-cards-section">
        <div className="container">
          <PlanCards />
        </div>
      </section>

      <section className="py-16 border-t border-white/5" data-testid="plans-spec-table-section">
        <div className="container">
          <SectionHeading
            eyebrow="Side by side"
            accent="green"
            className="mb-12"
            title="Full Metronet plan comparison"
            copy="The same network, the same terms — only the bandwidth changes."
          />
          <ScrollReveal>
            <div className="overflow-x-auto rounded-[28px] glass-card">
              <table className="w-full text-left min-w-[680px]" data-testid="plan-spec-table">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-white/40 text-[11px] uppercase tracking-[0.16em] font-display font-semibold">Feature</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className="p-5 text-white text-sm font-display font-bold">
                        {p.speed}
                        {p.popular && <span className="ml-2 text-[9px] uppercase tracking-wider text-mc-purple">Popular</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SPEC_ROWS.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 1 ? "bg-white/[0.02]" : ""}>
                      <td className="p-5 text-white/60 text-sm">{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="p-5 text-white text-sm font-medium">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 border-t border-white/5" data-testid="plans-fit-section">
        <div className="container">
          <SectionHeading
            eyebrow="Which speed fits your home?"
            className="mb-14"
            title="Match your plan to how you actually use the internet"
            copy="Bandwidth needs come from simultaneous heavy users, not device counts. Here's the honest mapping."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FIT_CARDS.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.06}>
                <div className="glass-card glass-card-hover rounded-[26px] p-7 h-full" data-testid={`fit-card-${card.title.slice(0, 10)}`}>
                  <card.icon className="text-mc-teal mb-5" size={26} />
                  <h3 className="text-white font-display font-bold mb-2">{card.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{card.plan}</p>
                  <span className="inline-block text-[10px] font-display font-bold uppercase tracking-[0.14em] text-mc-green border border-mc-green/35 bg-mc-green/10 rounded-full px-3 py-1">
                    Pick: {card.pick}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5" data-testid="plans-details-section">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <ScrollReveal className="prose-mc">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-[1.1] mb-7">
                What you should know before ordering Metronet fiber
              </h2>
              <p>
                Metronet pricing is refreshingly simple compared to most internet providers: three speed tiers, a flat
                monthly rate with AutoPay, no data caps, and no annual contract on any plan. There is no complicated
                bundle math and no promotional rate that quietly triples in month thirteen of a two-year agreement.
              </p>

              <h3>Symmetrical speeds are the real product</h3>
              <p>
                Every plan on this page gives you the same upload speed as download speed. On cable internet, a
                &ldquo;gigabit&rdquo; plan typically ships with an upload speed somewhere between 20 and 50 Mbps. That
                gap is why video calls compress, cloud backups crawl, and large file uploads take an afternoon. With
                Metronet fiber, <strong>1 Gig down means 1 Gig up</strong>, and that changes the day-to-day experience
                far more than the headline download number does.
              </p>

              <h3>Equipment and installation</h3>
              <p>
                A fiber gateway/router is included with installation, so your home is Wi-Fi ready from day one. When you
                order, you choose a preferred install date and time window, and a confirmation follows by email. A
                technician brings the fiber line into the home, installs the gateway, and gets your network live.
              </p>

              <h3>Billing, contracts, and changing plans</h3>
              <p>
                Listed pricing requires AutoPay enrollment. No annual contract is required, which also means there is no
                early termination fee tying you to a speed tier. If your household grows into more bandwidth — a new
                remote job, a gaming teenager, a smart-home build-out — you can move up without renegotiating a contract.
              </p>

              <h3>Availability comes before pricing</h3>
              <p>
                Fiber is built street by street, so the first question is always whether Metronet has reached your
                address. Use the <Link href="/check-availability">availability checker</Link> before you get attached to
                a plan, or browse <Link href="/metronet-state">service areas by state</Link> to see the markets where
                Metronet fiber is live today.
              </p>

              <h3>The current offer</h3>
              <p>
                <strong>First Month Free</strong> is available for eligible new customers. Offer availability and
                eligibility may vary by service address and are confirmed during ordering. See the{" "}
                <Link href="/promotions">promotions page</Link> for the active offer details.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.08}>
              <h2 className="text-2xl font-display font-extrabold text-white mb-6">Frequently asked questions</h2>
              <Accordion type="single" collapsible data-testid="plans-faq-accordion">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`plans-faq-item-${i}`}>
                    <AccordionTrigger className="text-left text-white font-display font-semibold hover:text-mc-purple text-sm py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-white/60 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link href="/check-availability" data-testid="plans-availability-cta" className="inline-flex items-center gap-2 mt-9 border border-white/20 text-white font-display font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors">
                Check availability at my address <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
