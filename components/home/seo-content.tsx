import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PLANS } from "@/lib/commercial-data"
import { cities, states } from "@/lib/city-data"

export function HomeSeoContent() {
  const stateCount = Object.keys(states).length

  return (
    <section className="py-16 sm:py-14 border-t border-white/5" data-testid="home-seo-content">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-8">
            <ScrollReveal>
              <p className="text-mc-purple font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">The full picture</p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-[1.1] mb-8">
                A buyer&apos;s guide to Metronet fiber internet plans, pricing, and availability
              </h2>
            </ScrollReveal>

            <ScrollReveal className="prose-mc">
              <p>
                Metronet is a 100% fiber-optic internet provider serving residential customers across the Midwest and
                Southeast. <strong>Metroconet is an independent authorized retailer for new Metronet service</strong> —
                we help households compare Metronet internet plans, confirm fiber availability at a specific address,
                and place a new service order online without a store visit or a phone queue.
              </p>
              <p>
                Metronet fiber is currently available in <strong>{cities.length}+ markets across {stateCount} states</strong>,
                including major metros like Indianapolis, Lexington, Des Moines, Omaha, Grand Rapids, Lansing, Dayton,
                Rochester, Fayetteville, and Tallahassee, alongside dozens of smaller communities where fiber arrived
                before the national carriers.
              </p>

              <h3>Metronet internet plans and pricing at a glance</h3>
              <p>
                There are three current residential Metronet plans, and all three run over the same fiber network with
                the same symmetrical speed profile, the same unlimited data policy, and the same no-annual-contract
                terms. The only difference is total bandwidth.
              </p>
              <ul>
                {PLANS.map((plan) => (
                  <li key={plan.id}>
                    <strong>{plan.speed} — {plan.priceLabel}/mo with AutoPay.</strong> {plan.bestFor}.
                  </li>
                ))}
              </ul>
              <p>
                The practical takeaway for most shoppers: <strong>1 Gig at $70/mo is the mainstream choice</strong> for a
                typical household running multiple 4K streams, video calls, game consoles, and smart-home devices.
                500 Mbps is genuinely sufficient for one or two light users, and 2 Gig costs only $10/mo more than 1 Gig,
                which makes it an easy upgrade for large households, home offices with heavy upload needs, or anyone who
                wants headroom for the next five years of connected devices.
              </p>

              <h3>Why symmetrical upload speed matters more than the headline number</h3>
              <p>
                Cable internet advertises a big download figure and quietly delivers an upload speed that is often a
                twentieth of it. That asymmetry is exactly what breaks during a workday: your video call compresses,
                your cloud backup crawls, your screen share stutters, and a 4K clip takes twenty minutes to upload.
                Fiber is symmetrical by design, so <strong>1 Gig down means 1 Gig up</strong>. If you work from home,
                stream to an audience, back up photos and video, or run security cameras, symmetrical upload is usually
                the single biggest quality-of-life difference you will notice after switching.
              </p>

              <h3>How to check Metronet fiber availability at your address</h3>
              <p>
                Fiber is built out street by street, so two homes on opposite sides of the same road can have different
                answers. Enter your zip code in the{" "}
                <Link href="/check-availability">availability checker</Link> to see whether your area is inside a served
                Metronet market. Final serviceability is confirmed against your exact street address during the order
                process. If your area isn&apos;t live yet, you can join the waitlist so you hear about it when
                construction reaches you.
              </p>

              <h3>What installation actually involves</h3>
              <p>
                You choose a preferred install date and time window when you place your order, and a confirmation
                follows by email. A technician brings the fiber line to the home, installs the fiber gateway, and gets
                your Wi-Fi running. Because there is no annual contract on any plan, you are not locking yourself into
                a multi-year agreement to get promotional pricing.
              </p>

              <h3>Current promotion: First Month Free</h3>
              <p>
                Metroconet&apos;s current featured offer is{" "}
                <strong>First Month Free for eligible new customers</strong> on new Metronet service. Offer availability
                and eligibility can vary by service address, and eligibility is confirmed during the ordering process.
                See the <Link href="/promotions">promotions page</Link> for the active offer, or go straight to{" "}
                <Link href="/plans-pricing">plans and pricing</Link> to order.
              </p>

              <h3>Is Metroconet the same company as Metronet?</h3>
              <p>
                No. Metronet is the fiber network operator and service provider. Metroconet is an{" "}
                <strong>independent authorized retailer</strong> that sells new Metronet service. If you are already a
                Metronet customer and need help with billing, an outage, or technical support, contact official Metronet
                Customer Care — details are on our <Link href="/support">support page</Link>. If you are starting new
                service, Metroconet is where you compare and order.
              </p>
            </ScrollReveal>
          </div>

          <aside className="lg:col-span-4">
            <ScrollReveal delay={0.1}>
              <div className="glass-card rounded-[26px] p-8 lg:sticky lg:top-28">
                <p className="text-white/40 text-[11px] uppercase tracking-[0.18em] mb-5">Quick answers</p>
                <dl className="space-y-6">
                  {[
                    { q: "Starting price", a: `${PLANS[0].priceLabel}/mo with AutoPay for ${PLANS[0].speed}` },
                    { q: "Most popular plan", a: "1 Gig at $70/mo with AutoPay" },
                    { q: "Fastest plan", a: "2 Gig at $80/mo with AutoPay" },
                    { q: "Data cap", a: "None on any plan" },
                    { q: "Contract", a: "No annual contract required" },
                    { q: "Current offer", a: "First Month Free for eligible new customers" },
                  ].map((item) => (
                    <div key={item.q}>
                      <dt className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.q}</dt>
                      <dd className="text-white font-display font-semibold text-sm">{item.a}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/plans-pricing"
                  data-testid="seo-sidebar-cta"
                  className="btn-shine block text-center mt-8 bg-mc-purple text-white font-display font-bold text-sm py-3.5 rounded-full hover:bg-mc-green hover:text-black transition-colors"
                >
                  Compare Plans &amp; Order
                </Link>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
