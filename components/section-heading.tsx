import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

const ACCENTS = {
  green: "text-mc-green",
  purple: "text-mc-purple",
  teal: "text-mc-teal",
  yellow: "text-mc-yellow",
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  accent = "purple",
  className,
  center = false,
}: {
  eyebrow: string
  title: React.ReactNode
  copy?: React.ReactNode
  accent?: keyof typeof ACCENTS
  className?: string
  center?: boolean
}) {
  return (
    <ScrollReveal className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <p className={cn("font-display font-bold text-xs uppercase tracking-[0.2em] mb-4", ACCENTS[accent])}>{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-display font-extrabold text-white leading-[1.08]">{title}</h2>
      {copy && <p className="text-white/60 leading-relaxed mt-5">{copy}</p>}
    </ScrollReveal>
  )
}
