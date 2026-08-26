"use client"

import { Check } from "lucide-react"
import { PLANS, CURRENT_PROMOTION, PRICE_DISCLAIMER, type Plan } from "@/lib/commercial-data"
import { useOrderForm } from "@/components/order-form-context"
import { trackEvent } from "@/components/google-analytics"
import { cn } from "@/lib/utils"

export function PlanCards({ compact = false }: { compact?: boolean }) {
  const { openOrderForm } = useOrderForm()

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 md:items-start" data-testid="plan-cards-grid">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            compact={compact}
            onOrder={() => { trackEvent("select_plan", { plan: plan.name }); openOrderForm(plan) }}
          />
        ))}
      </div>
      <p className="text-center text-white/40 text-xs mt-7 max-w-xl mx-auto" data-testid="price-disclaimer">
        {PRICE_DISCLAIMER}
      </p>
    </div>
  )
}

function PlanCard({ plan, compact, onOrder }: { plan: Plan; compact: boolean; onOrder: () => void }) {
  return (
    <div
      data-testid={`plan-card-${plan.id}`}
      className={cn(
        "relative rounded-[28px] p-8 flex flex-col glass-card-hover",
        plan.popular
          ? "border border-mc-purple/70 bg-[linear-gradient(165deg,rgba(150,77,255,0.28)_0%,rgba(33,33,69,0.85)_55%,rgba(0,0,0,0.9)_100%)] shadow-[0_30px_80px_-30px_rgba(150,77,255,0.7)] md:-mt-4 md:pb-11 z-10"
          : "glass-card",
      )}
    >
      {plan.popular && (
        <>
          <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mc-purple to-transparent" />
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-mc-purple text-white text-[10px] font-display font-bold uppercase tracking-[0.16em] px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
            Most Popular
          </span>
        </>
      )}

      <span className="inline-block w-fit bg-mc-yellow text-black text-[10px] font-display font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full mb-5">
        {CURRENT_PROMOTION.badge}
      </span>

      <h3 className="text-[2rem] font-display font-extrabold text-white leading-none">{plan.speed}</h3>
      <p className="text-white/45 text-sm mt-2 mb-6">{plan.tagline}</p>

      <div className="flex items-baseline gap-1.5">
        <span className="text-5xl font-display font-extrabold text-gradient-green">{plan.priceLabel}</span>
        <span className="text-white/50 text-sm font-medium">/mo</span>
      </div>
      <p className="text-white/35 text-xs mt-1.5 mb-6">with AutoPay</p>

      <p className="text-white/70 text-sm leading-relaxed mb-7">{plan.bestFor}</p>

      {!compact && (
        <ul className="space-y-3 mb-9 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
              <Check size={15} className="text-mc-green shrink-0 mt-1" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onOrder}
        data-testid={`plan-card-order-button-${plan.id}`}
        className={cn(
          "btn-shine w-full py-4 rounded-full font-display font-bold text-sm transition-colors duration-300 mt-auto",
          plan.popular
            ? "bg-mc-purple text-white hover:bg-mc-green hover:text-black"
            : "bg-white/[0.08] border border-white/15 text-white hover:bg-mc-purple hover:border-mc-purple",
        )}
      >
        Choose {plan.speed}
      </button>
    </div>
  )
}
