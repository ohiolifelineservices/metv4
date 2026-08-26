import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SUPPORT_PHONE } from "@/lib/commercial-data"
import { breadcrumbSchema, faqSchema } from "@/lib/schema-data"
import { PhoneCall, ArrowRight, ShoppingCart, LifeBuoy } from "lucide-react"

export const metadata: Metadata = staticPageMetadata(
  "Metronet Support | New Orders & Customer Care Info",
  "Ordering new Metronet service? Compare plans and order online. Existing customers can find official Metronet billing, outage and technical support information.",
  "/support",
)

const FAQS = [
  { question: "I'm a new customer — how do I order Metronet service?", answer: "Compare plans on the Plans & Pricing page, choose a speed, and complete the order online. You'll enter your service address and pick a preferred install date and time window, and a confirmation follows by email." },
  { question: "I'm an existing Metronet customer with a billing or outage issue. Who do I contact?", answer: `Contact official Metronet Customer Care at ${SUPPORT_PHONE}. Metroconet is an independent authorized retailer for new service and does not manage existing Metronet accounts, billing, or technical support.` },
  { question: "Can Metroconet change my current Metronet plan?", answer: "No. Plan changes on an existing account are handled by Metronet directly through official Metronet Customer Care." },
  { question: "How do I check availability at my address?", answer: "Use the availability checker on the Check Availability page. Coverage is built street by street, so your exact address is verified during the ordering process." },
  { question: "What happens after I place an order?", answer: "You'll receive an email confirmation with your selected plan and install window. A technician brings the fiber line to your home and installs the included fiber gateway." },
  { question: "Is equipment included?", answer: "Yes. A fiber gateway/router is included with installation so your home is Wi-Fi ready from day one." },
  { question: "Is there a contract or data cap?", answer: "No annual contract is required on any current Metronet residential plan, and every plan includes unlimited data with no overage charges." },
  { question: "How do I reschedule an install date?", answer: "Reply to your order confirmation email with your preferred new date and time window so the install can be updated." },
]

export default function SupportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://metroconet.com" }, { name: "Support", url: "https://metroconet.com/support" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      <section className="relative pt-14 pb-12 overflow-hidden" data-testid="support-page">
        <div className="absolute inset-0 tech-grid -z-10 opacity-60" aria-hidden="true" />
        <div className="bloom bloom-purple w-[480px] h-[480px] -top-48 -left-24 opacity-50" aria-hidden="true" />
        <div className="container relative max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.03] mb-6">
              Support &amp; <span className="text-gradient-purple">FAQ</span>
            </h1>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              Metroconet handles new Metronet service orders. Existing Metronet accounts — billing, outages, and
              technical support — are handled by Metronet directly. Here&apos;s where to go for each.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <ScrollReveal>
              <div className="glass-card rounded-[26px] p-8 h-full" data-testid="support-new-customers">
                <ShoppingCart className="text-mc-green mb-5" size={26} />
                <h2 className="text-xl font-display font-bold text-white mb-3">New to Metronet?</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-7">
                  Metroconet helps you compare plans and pricing, confirm availability at your address, and place a new
                  Metronet service order online — including choosing your install window.
                </p>
                <Link href="/plans-pricing" data-testid="support-view-plans-link" className="btn-shine inline-flex items-center gap-2 bg-mc-purple text-white font-display font-bold px-6 py-3.5 rounded-full hover:bg-mc-green hover:text-black transition-colors">
                  View Plans &amp; Order Now <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="glass-card rounded-[26px] p-8 h-full" data-testid="support-existing-customers">
                <LifeBuoy className="text-mc-teal mb-5" size={26} />
                <h2 className="text-xl font-display font-bold text-white mb-3">Already a Metronet customer?</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-7">
                  For billing, outages, technical support, or account changes, contact official Metronet Customer Care
                  directly. Metroconet is an independent authorized retailer and does not manage existing accounts.
                </p>
                <a href={`tel:${SUPPORT_PHONE}`} data-testid="support-phone-link" className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold px-6 py-3.5 rounded-full hover:bg-white/10 transition-colors text-sm">
                  <PhoneCall size={16} /> Metronet Customer Care: {SUPPORT_PHONE}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/5" data-testid="support-faq-section">
        <div className="container max-w-3xl">
          <ScrollReveal className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Frequently asked questions</h2>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion type="single" collapsible data-testid="support-faq-accordion">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`support-faq-item-${i}`}>
                  <AccordionTrigger className="text-left text-white font-display font-semibold hover:text-mc-purple py-5">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
          <ScrollReveal className="mt-10">
            <p className="text-white/50 text-sm">
              Still need help with a new order? <Link href="/contact-us" className="text-mc-purple hover:text-white underline underline-offset-4">Contact Metroconet</Link>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
