"use client"

import { useOrderForm } from "@/components/order-form-context"

export function HeroConversionCtas({
  plansHref = "#plans",
  findCityHref,
}: {
  plansHref?: string
  findCityHref?: string
}) {
  const { openOrderForm } = useOrderForm()
  return (
    <div className="mt-9">
      <div className="flex flex-wrap gap-3">
        <a
          href={plansHref}
          className="btn-shine inline-flex items-center justify-center bg-mc-purple text-white font-display font-bold px-8 py-4 rounded-full hover:bg-mc-green hover:text-black transition-colors"
          data-testid="hero-see-plans-button"
        >
          See Plans
        </a>
        <button
          type="button"
          onClick={() => openOrderForm()}
          className="inline-flex items-center justify-center border border-white/25 text-white font-display font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
          data-testid="hero-order-now-button"
        >
          Order Now
        </button>
      </div>
      {findCityHref && (
        <a
          href={findCityHref}
          className="inline-flex mt-4 text-sm font-display font-semibold text-white/60 hover:text-mc-purple transition-colors"
          data-testid="hero-find-city-link"
        >
          Find Your City →
        </a>
      )}
    </div>
  )
}
