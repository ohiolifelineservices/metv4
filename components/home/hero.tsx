"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { PromoBadge } from "@/components/promo-badge"
import { PLANS } from "@/lib/commercial-data"
import { IMAGES } from "@/lib/media"

const BENEFITS = ["100% fiber network", "Symmetrical upload speeds", "No data caps", "No annual contract"]

export function Hero() {
  const entry = PLANS[0]
  const top = PLANS[PLANS.length - 1]

  return (
    <section className="relative min-h-[78vh] flex items-center overflow-hidden" data-testid="home-hero">
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.heroFamily}
          alt="Family relaxing at home with connected devices"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="bloom bloom-purple w-[560px] h-[560px] -top-48 -left-40 opacity-60" aria-hidden="true" />

      <div className="container relative z-10 py-16 lg:py-20">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <PromoBadge />
          </div>

          <h1 className="font-display font-extrabold text-white leading-[0.94] text-5xl sm:text-6xl lg:text-7xl">
            <span className="text-gradient-purple">Metronet</span>{" "}
            <span className="font-light">Fiber</span>
            <span className="block font-light">Internet</span>
          </h1>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mt-6">
            Symmetrical speeds up to <span className="text-mc-yellow font-semibold">{top.speed}</span> from{" "}
            <span className="text-mc-yellow font-semibold">{entry.priceLabel}/mo</span> with AutoPay —{" "}
            <span className="text-mc-yellow font-semibold">unlimited data</span>,{" "}
            <span className="text-mc-yellow font-semibold">no contracts</span>.{" "}
            <span className="text-mc-yellow font-semibold">First month free</span> for eligible new customers.
          </p>

          <Link
            href="/plans-pricing"
            data-testid="hero-get-started-button"
            className="btn-shine group inline-flex items-center gap-2.5 bg-mc-purple text-white font-display font-bold px-9 py-4 rounded-full text-base hover:bg-mc-green hover:text-black transition-colors duration-300 shadow-[0_18px_50px_-18px_rgba(150,77,255,0.9)] mt-8"
          >
            Get Started Today
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mt-9 max-w-lg">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-white/85 text-sm">
                <CheckCircle size={16} className="text-mc-green shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
