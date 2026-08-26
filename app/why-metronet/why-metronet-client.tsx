"use client"

import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useOrderForm } from "@/components/order-form-context"
import { getPopularPlan } from "@/lib/commercial-data"
import { IMAGES } from "@/lib/media"
import { ArrowRight } from "lucide-react"

const CHAPTERS = [
  {
    n: "01",
    title: "It's 100% fiber, not copper",
    body: "Metronet's network runs fiber-optic cable all the way to your home, not just to a box down the street. Data travels as light through glass rather than electricity through copper — faster, more consistent, and far less prone to interference than the coaxial cable behind most cable internet. It also means your speed doesn't degrade the further you sit from the neighborhood node.",
    image: IMAGES.fiberAbstract,
  },
  {
    n: "02",
    title: "Upload speed matches download speed",
    body: "Cable internet gives you a fast download and a slow upload — often a twentieth of the headline number. Fiber is symmetrical: your upload speed equals your download speed. That's the difference between a video call that freezes and one that doesn't, a cloud backup that finishes overnight instead of over a weekend, and a 4K file that uploads in seconds instead of minutes.",
    image: IMAGES.remoteWork2,
  },
  {
    n: "03",
    title: "Every device, at the same time",
    body: "Streaming in the living room, a video call in the office, a console in the basement, cameras out front — fiber bandwidth doesn't get divided up the way shared cable does under neighborhood load. More devices doesn't mean more slowdown, and evening peak hours don't turn into a bandwidth negotiation between family members.",
    image: IMAGES.gaming2,
  },
  {
    n: "04",
    title: "Built for how you actually work and play",
    body: "Remote work depends on stable uploads for calls and file sharing. Competitive gaming depends on low, consistent latency rather than a big peak number. Streaming depends on sustained bandwidth across multiple screens. Fiber is the common thread underneath all three — which is why it's the connection type new-build neighborhoods are wired for.",
    image: IMAGES.familyStreaming,
  },
  {
    n: "05",
    title: "Simple installation, no long-term lock-in",
    body: "You choose a preferred install date and time window when you order. A technician brings the fiber line to the home, installs the included fiber gateway, and gets your Wi-Fi running. No annual contract is required on any plan, so you're not signing a multi-year agreement to get the advertised rate.",
    image: IMAGES.installTech,
  },
  {
    n: "06",
    title: "Pricing that doesn't reset in month thirteen",
    body: "Metronet residential pricing is $60/mo for 500 Mbps, $70/mo for 1 Gig, and $80/mo for 2 Gig with AutoPay — with unlimited data included rather than sold as an add-on. There's no data cap to trip, no overage line item, and no promotional rate quietly expiring into a much higher bill.",
    image: IMAGES.heroFamily,
  },
]

export default function WhyMetronetClient() {
  const { openOrderForm } = useOrderForm()
  const plan = getPopularPlan()

  return (
    <>
      <section className="relative pt-14 pb-12 overflow-hidden" data-testid="why-metronet-hero">
        <div className="absolute inset-0 tech-grid -z-10 opacity-60" aria-hidden="true" />
        <div className="bloom bloom-purple w-[560px] h-[560px] -top-52 -left-32 opacity-55" aria-hidden="true" />
        <div className="container relative">
          <p className="text-mc-green font-display font-bold text-xs uppercase tracking-[0.2em] mb-5">Fiber, explained</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.02] max-w-3xl">
            Why Metronet fiber is <span className="text-gradient-purple">worth switching to</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mt-7 leading-relaxed">
            A plain-language look at what fiber actually changes about your internet — written for people deciding
            whether it&apos;s worth the switch, not for people who already know what symmetrical bandwidth means.
          </p>
        </div>
      </section>

      <div data-testid="why-metronet-chapters">
        {CHAPTERS.map((chapter, i) => (
          <section key={chapter.n} className="py-12 sm:py-16 border-t border-white/5" data-testid={`chapter-${chapter.n}`}>
            <div className="container">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <ScrollReveal>
                  <span className="font-display font-extrabold text-6xl sm:text-7xl text-transparent [-webkit-text-stroke:1px_rgba(150,77,255,0.75)] leading-none">{chapter.n}</span>
                  <h2 className="text-2xl sm:text-[2rem] font-display font-extrabold text-white mt-5 mb-5 leading-[1.15]">{chapter.title}</h2>
                  <p className="text-white/60 leading-[1.85]">{chapter.body}</p>
                </ScrollReveal>
                <ScrollReveal delay={0.08}>
                  <div className="relative aspect-[4/3] rounded-[26px] overflow-hidden border border-white/10">
                    <Image src={chapter.image} alt={chapter.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="relative py-16 border-t border-white/5 text-center overflow-hidden" data-testid="why-metronet-cta">
        <div className="bloom bloom-purple w-[600px] h-[600px] -bottom-80 left-1/2 -translate-x-1/2 opacity-70" aria-hidden="true" />
        <div className="container relative">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-8 max-w-2xl mx-auto leading-[1.05]">Ready to make the switch?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => openOrderForm(plan)} data-testid="why-metronet-order-button" className="btn-shine bg-mc-purple text-white font-display font-bold px-9 py-4 rounded-full hover:bg-mc-green hover:text-black transition-colors">
              Order Now
            </button>
            <Link href="/plans-pricing" data-testid="why-metronet-plans-link" className="flex items-center gap-2 border border-white/25 text-white font-display font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              View Plans &amp; Pricing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
