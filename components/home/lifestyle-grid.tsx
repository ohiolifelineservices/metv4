import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { IMAGES } from "@/lib/media"

const USE_CASES = [
  { title: "Work from home", desc: "Stable video calls and fast file uploads, even when the whole house is online.", image: IMAGES.remoteWork1 },
  { title: "Gaming", desc: "Low, consistent latency for competitive play and fast game downloads.", image: IMAGES.gaming1 },
  { title: "Streaming", desc: "Multiple 4K streams at once without buffering, on every screen in the house.", image: IMAGES.familyStreaming },
  { title: "Connected homes", desc: "Cameras, hubs, and smart devices stay online without slowing each other down.", image: IMAGES.smartHome },
]

export function LifestyleGrid() {
  return (
    <section className="py-16 sm:py-14 border-t border-white/5" data-testid="lifestyle-grid-section">
      <div className="container">
        <SectionHeading
          eyebrow="Built for how you live"
          title="One connection, every screen"
          copy="Symmetrical fiber bandwidth means the household doesn't have to take turns. Work, play, stream, and monitor at the same time."
          className="mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <div className="group relative rounded-[26px] overflow-hidden aspect-[3/4] border border-white/10 hover:border-mc-purple/50 transition-colors duration-500" data-testid={`lifestyle-card-${i}`}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-white font-display font-bold text-lg mb-1.5">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
