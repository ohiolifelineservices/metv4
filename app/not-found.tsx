import Link from "next/link"
import Image from "next/image"
import { BRAND } from "@/lib/media"

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden" data-testid="not-found-page">
      <div className="bloom bloom-purple w-[520px] h-[520px] -top-32 left-1/2 -translate-x-1/2 opacity-60" aria-hidden="true" />
      <Image src={BRAND.resellerLogo} alt="Metronet Authorized Reseller" width={200} height={67} className="h-10 w-auto mb-9" />
      <p className="text-mc-purple font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-5">Page not found</h1>
      <p className="text-white/60 max-w-md mb-9 leading-relaxed">
        This page moved or never existed. Check current plans and pricing, or see if Metronet fiber is available at your
        address.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/plans-pricing" className="btn-shine bg-mc-purple text-white font-display font-bold px-8 py-3.5 rounded-full hover:bg-mc-green hover:text-black transition-colors" data-testid="not-found-plans-link">
          View Plans &amp; Pricing
        </Link>
        <Link href="/check-availability" className="border border-white/20 text-white font-display font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors" data-testid="not-found-availability-link">
          Check Availability
        </Link>
      </div>
    </div>
  )
}
