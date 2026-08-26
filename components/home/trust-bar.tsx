import Image from "next/image"
import { ShieldCheck, Zap, Infinity as InfinityIcon, CalendarCheck } from "lucide-react"
import { BRAND } from "@/lib/media"

const POINTS = [
  { Icon: ShieldCheck, title: "Authorized reseller", copy: "Orders are placed for real Metronet fiber service." },
  { Icon: Zap, title: "Symmetrical fiber", copy: "Upload speed equals download speed on every plan." },
  { Icon: InfinityIcon, title: "Unlimited data", copy: "No caps, no throttling, no overage charges." },
  { Icon: CalendarCheck, title: "You pick install", copy: "Choose your preferred install date and time window." },
]

export function TrustBar() {
  return (
    <section className="relative border-y border-white/10 bg-mc-navy/25" data-testid="trust-bar">
      <div className="container py-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          <div className="flex items-center gap-4 shrink-0 lg:pr-10 lg:border-r lg:border-white/10">
            <Image src={BRAND.resellerLogo} alt="Metronet Authorized Reseller" width={180} height={60} className="h-10 w-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
            {POINTS.map(({ Icon, title, copy }) => (
              <div key={title} className="flex items-start gap-3" data-testid={`trust-point-${title.split(" ")[0].toLowerCase()}`}>
                <Icon size={20} className="text-mc-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-display font-semibold text-sm">{title}</p>
                  <p className="text-white/50 text-xs leading-relaxed mt-1">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
