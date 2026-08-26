export function PromoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      data-testid="promo-badge-first-month-free"
      className={`inline-flex items-center gap-1.5 bg-mc-yellow text-black font-display font-bold text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full ${className}`}
    >
      First Month Free
    </span>
  )
}
