import Link from "next/link"
import Image from "next/image"
import { states, stateToSlug } from "@/lib/city-data"
import { SUPPORT_PHONE } from "@/lib/commercial-data"
import { BRAND } from "@/lib/media"

export function Footer() {
  const stateNames = Object.keys(states)

  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden" data-testid="site-footer">
      <div className="bloom bloom-purple w-[520px] h-[520px] -bottom-72 left-1/2 -translate-x-1/2 opacity-40" aria-hidden="true" />
      <div className="container relative">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 pb-14">
          <div className="col-span-2">
            <Link href="/" data-testid="footer-logo">
              <Image src={BRAND.resellerLogo} alt="Metronet Authorized Reseller" width={200} height={67} className="h-9 w-auto mb-5" />
            </Link>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed mb-6">
              Metroconet is an independent authorized retailer for new Metronet service. We help you compare fiber
              internet plans, check availability, and start new Metronet service online.
            </p>
          </div>

          <div>
            <p className="text-white font-display font-semibold mb-4 text-xs uppercase tracking-[0.16em]">Shop</p>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="/plans-pricing" className="hover:text-white transition-colors" data-testid="footer-link-plans">Plans &amp; Pricing</Link></li>
              <li><Link href="/promotions" className="hover:text-white transition-colors" data-testid="footer-link-promotions">Promotions</Link></li>
              <li><Link href="/why-metronet" className="hover:text-white transition-colors" data-testid="footer-link-why">Why Metronet</Link></li>
              <li><Link href="/check-availability" className="hover:text-white transition-colors" data-testid="footer-link-availability">Check Availability</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-display font-semibold mb-4 text-xs uppercase tracking-[0.16em]">Company</p>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="/support" className="hover:text-white transition-colors" data-testid="footer-link-support">Support &amp; FAQ</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition-colors" data-testid="footer-link-contact">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors" data-testid="footer-link-careers">Careers</Link></li>
              <li><Link href="/metronet-state" className="hover:text-white transition-colors" data-testid="footer-link-service-areas">Service Areas</Link></li>
            </ul>
          </div>

          <div className="col-span-2">
            <p className="text-white font-display font-semibold mb-4 text-xs uppercase tracking-[0.16em]">Service Areas</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/50">
              {stateNames.map((s) => (
                <li key={s}>
                  <Link href={`/metronet-state/${stateToSlug(s)}`} className="hover:text-white transition-colors" data-testid={`footer-link-state-${stateToSlug(s)}`}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <p className="text-white/40 text-xs max-w-2xl leading-relaxed">
            Metroconet is an independent authorized retailer for new Metronet service and is not Metronet, Inc.
            Existing Metronet customers needing billing, outage, or technical support should contact official
            Metronet Customer Care at {SUPPORT_PHONE}.
          </p>
          <div className="flex gap-6 text-xs text-white/40 shrink-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors" data-testid="footer-link-privacy">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors" data-testid="footer-link-terms">Terms &amp; Conditions</Link>
          </div>
        </div>
        <p className="text-white/30 text-xs mt-6">&copy; {new Date().getFullYear()} Metroconet. All rights reserved.</p>
      </div>
    </footer>
  )
}
