import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "https://metroconet.com/terms-and-conditions" },
}

export default function TermsPage() {
  return (
    <section className="pt-12 pb-16" data-testid="terms-page">
      <div className="container max-w-2xl">
        <h1 className="text-4xl font-display font-extrabold text-white mb-6">Terms &amp; Conditions</h1>
        <div className="text-white/60 space-y-4 text-sm leading-relaxed">
          <p>Metroconet is an independent authorized retailer for new Metronet service and is not Metronet, Inc. By placing an order through this website, you authorize Metroconet to submit your information to Metronet to process a new service request.</p>
          <p>Plan pricing, speeds, and promotions displayed on this site reflect current offers at the time of publication and are subject to change. Final pricing, eligibility, and availability are confirmed by Metronet at the time of installation.</p>
          <p>Existing Metronet customers should direct billing, outage, and technical support inquiries to official Metronet Customer Care rather than Metroconet.</p>
        </div>
      </div>
    </section>
  )
}
