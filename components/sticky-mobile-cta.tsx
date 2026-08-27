"use client"

import { useOrderForm } from "@/components/order-form-context"
import { getPopularPlan } from "@/lib/commercial-data"
import Link from "next/link"

export function StickyMobileCTA() {
  const { openOrderForm } = useOrderForm()
  const plan = getPopularPlan()

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3"
      data-testid="sticky-mobile-cta"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link href="/plans-pricing" className="flex-1 text-center border border-white/20 text-white text-sm font-display font-semibold py-3 rounded-full" data-testid="sticky-cta-plans">
        View Plans
      </Link>
      <button
        onClick={() => openOrderForm(plan)}
        data-testid="sticky-cta-order-now"
        className="flex-1 text-center bg-mc-green text-black text-sm font-display font-bold py-3 rounded-full hover:bg-mc-green/90 transition-colors"
      >
        Order Now
      </button>
    </div>
  )
}
