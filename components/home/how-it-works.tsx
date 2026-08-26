import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { IMAGES } from "@/lib/media"

const STEPS = [
  {
    n: "01",
    title: "Check your address",
    body: "Enter your zip code to confirm Metronet fiber is available where you live. If it isn't live yet, join the waitlist and we'll flag your area.",
  },
  {
    n: "02",
    title: "Pick your speed",
    body: "Choose 500 Mbps, 1 Gig, or 2 Gig. Every plan is symmetrical fiber with unlimited data and no annual contract, so you can move up or down later.",
  },
  {
    n: "03",
    title: "Order online in minutes",
    body: "Complete your order, choose a preferred install date and time window, and get an email confirmation. No store visit, no phone queue.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-16 sm:py-14 border-t border-white/5 overflow-hidden" data-testid="how-it-works-section">
      <div className="bloom bloom-purple w-[460px] h-[460px] top-10 -right-40 opacity-50" aria-hidden="true" />
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="text-mc-green font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">How ordering works</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-extrabold text-white leading-[1.06] mb-6">
                Three steps from zip code to install date
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Metroconet handles the ordering side of new Metronet service. You compare plans, place the order, and
                pick your install window — all online, in one sitting.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                <Image src={IMAGES.installTech} alt="Fiber internet technician installing a home fiber connection" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <ol className="space-y-4">
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.n} delay={i * 0.08}>
                  <li className="glass-card glass-card-hover rounded-3xl p-8 flex gap-6" data-testid={`how-step-${step.n}`}>
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-transparent [-webkit-text-stroke:1px_rgba(150,77,255,0.75)] shrink-0 leading-none">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-white font-display font-bold text-lg sm:text-xl mb-2">{step.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
