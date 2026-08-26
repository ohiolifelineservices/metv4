import Image from "next/image"
import { Check, X } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { IMAGES } from "@/lib/media"

const ROWS = [
  { label: "Connection to your home", fiber: "100% fiber-optic", cable: "Copper coaxial" },
  { label: "Upload speed", fiber: "Symmetrical — equal to download", cable: "A small fraction of download" },
  { label: "Video calls & large uploads", fiber: "Consistently strong", cable: "Degrades during peak hours" },
  { label: "Many devices at once", fiber: "Stays consistent", cable: "Slows down under load" },
  { label: "Data caps", fiber: "None on any plan", cable: "Often capped with overages" },
  { label: "Annual contract", fiber: "Not required", cable: "Frequently required" },
]

export function FiberComparison() {
  return (
    <section className="relative py-16 sm:py-14 border-t border-white/5 overflow-hidden" data-testid="fiber-comparison-section">
      <div className="absolute inset-0 -z-10 opacity-[0.22]">
        <Image src={IMAGES.fiberAbstract} alt="" fill sizes="100vw" className="object-cover" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
      </div>

      <div className="container relative">
        <SectionHeading
          eyebrow="Fiber vs. cable"
          accent="teal"
          className="mb-14"
          title="Why fiber internet actually feels different"
          copy="Cable internet splits a shared copper line and gives you a fast download with a slow upload. Metronet fiber runs light through glass all the way to the home, with upload speed equal to download on every plan."
        />

        <ScrollReveal>
          <div className="overflow-x-auto rounded-[28px] glass-card">
            <table className="w-full text-left min-w-[640px]" data-testid="comparison-table">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-6 text-white/40 text-[11px] uppercase tracking-[0.16em] font-display font-semibold">Category</th>
                  <th className="p-6 text-mc-green text-[11px] uppercase tracking-[0.16em] font-display font-semibold">Metronet Fiber</th>
                  <th className="p-6 text-white/40 text-[11px] uppercase tracking-[0.16em] font-display font-semibold">Traditional Cable</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 1 ? "bg-white/[0.02]" : ""}>
                    <td className="p-6 text-white/85 text-sm font-medium">{row.label}</td>
                    <td className="p-6 text-white text-sm">
                      <span className="flex items-center gap-2.5"><Check size={16} className="text-mc-green shrink-0" />{row.fiber}</span>
                    </td>
                    <td className="p-6 text-white/45 text-sm">
                      <span className="flex items-center gap-2.5"><X size={16} className="text-mc-gray shrink-0" />{row.cable}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
