"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight } from "lucide-react"
import { useOrderForm } from "@/components/order-form-context"
import { BRAND } from "@/lib/media"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/plans-pricing", label: "Plans & Pricing" },
  { href: "/check-availability", label: "Check Availability" },
  { href: "/promotions", label: "Promotions" },
  { href: "/metronet-state", label: "Service Areas" },
  { href: "/why-metronet", label: "Why Metronet" },
  { href: "/support", label: "Support" },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { openOrderForm } = useOrderForm()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-500",
        scrolled ? "bg-black/85 backdrop-blur-2xl border-b border-white/10" : "bg-gradient-to-b from-black/80 to-transparent border-b border-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-[74px] gap-6">
        <Link href="/" className="flex items-center shrink-0 group" data-testid="nav-logo">
          <Image
            src={BRAND.resellerLogo}
            alt="Metronet Authorized Reseller"
            width={168}
            height={56}
            priority
            className="h-8 w-auto transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.href.replace(/\//g, "")}`}
                className={cn(
                  "relative px-3.5 py-2 text-[13px] font-medium tracking-tight transition-colors group",
                  active ? "text-white" : "text-white/65 hover:text-white",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-mc-purple to-mc-teal origin-left transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <button
            onClick={() => openOrderForm()}
            data-testid="nav-order-now-button"
            className="btn-shine group flex items-center gap-2 bg-mc-purple text-white font-display font-bold text-sm px-6 py-2.5 rounded-full hover:bg-mc-green hover:text-black transition-colors duration-300"
          >
            Order Now
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle" aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl px-6 py-4 flex flex-col gap-1" data-testid="mobile-menu">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              data-testid={`mobile-nav-link-${link.href.replace(/\//g, "")}`}
              className="py-3 text-white/80 border-b border-white/5 text-base"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { setOpen(false); openOrderForm() }}
            data-testid="mobile-nav-order-now-button"
            className="mt-4 bg-mc-purple text-white font-display font-bold py-3.5 rounded-full"
          >
            Order Now
          </button>
        </div>
      )}
    </header>
  )
}
