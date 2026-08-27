"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin } from "lucide-react"
import { AvailabilityWidget } from "@/components/availability-widget"

// Homepage-only availability bar, restored to its original position directly
// beneath the main navigation.
export function AvailabilityBar() {
  const pathname = usePathname()
  if (pathname !== "/") return null

  return (
    <div className="hidden sm:block sticky top-[74px] z-40 border-b border-white/10 bg-mc-gray/95 backdrop-blur-xl" data-testid="availability-bar">
      <div className="container py-2.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_440px_minmax(0,1fr)] lg:gap-4">
          <div className="flex items-center gap-2 shrink-0 lg:justify-self-end">
            <MapPin size={15} className="text-mc-purple" />
            <span className="text-white text-sm font-display font-semibold whitespace-nowrap">Check Availability</span>
          </div>
          <div className="w-full sm:w-[420px] lg:w-full">
            <AvailabilityWidget variant="bar" />
          </div>
          <Link
            href="/check-availability"
            data-testid="availability-bar-all-cities-link"
            className="hidden sm:block text-xs text-white/50 hover:text-white whitespace-nowrap transition-colors lg:justify-self-start"
          >
            View all cities
          </Link>
        </div>
      </div>
    </div>
  )
}
