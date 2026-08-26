import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "https://metroconet.com/privacy-policy" },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-12 pb-16" data-testid="privacy-policy-page">
      <div className="container max-w-2xl prose-invert">
        <h1 className="text-4xl font-display font-extrabold text-white mb-6">Privacy Policy</h1>
        <div className="text-white/60 space-y-5 text-sm leading-relaxed">
          <p>
            Metroconet (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is an independent authorized retailer for new
            Metronet service. This page describes the information processed through this website and how it is used.
          </p>

          <h2 className="text-white font-display font-bold text-xl pt-3">Information you provide</h2>
          <p>
            When you use the order form, we process the information you submit, which can include your first and last
            name, service address, ZIP code, phone number, email address, date of birth, selected internet plan,
            preferred installation date and time window, and any promo code you enter. This information is used to
            process your request for new Metronet service and send the order through the site&apos;s order-submission system.
          </p>
          <p>
            If you submit a service-interest or waitlist form, we may process the name, email address, phone number,
            service address, and ZIP code you provide so the request can be recorded and followed up on.
          </p>

          <h2 className="text-white font-display font-bold text-xl pt-3">Analytics and approximate location</h2>
          <p>
            The site uses Google Analytics 4 to measure site usage and conversion activity, including interactions such
            as plan selections, order-form opens, order submissions, and ZIP searches. The order form also performs a
            best-effort IP-based lookup to attach an approximate city and region to an order as a lead-quality signal.
            This lookup is not used to determine whether you may place an order.
          </p>

          <h2 className="text-white font-display font-bold text-xl pt-3">Services that receive or process data</h2>
          <p>
            Order and service-interest submissions are sent through a Google Apps Script endpoint used by Metroconet to
            receive those requests. Site analytics are processed through Google Analytics. The order form may query
            third-party IP geolocation services, currently including ipwho.is, ipapi.co, and geojs.io, to obtain the
            approximate city and region described above.
          </p>

          <h2 className="text-white font-display font-bold text-xl pt-3">How information is used</h2>
          <p>
            Information submitted through the site is used to facilitate requests for new Metronet service, maintain
            the shopping and ordering experience, measure site performance, and understand conversion activity. We do
            not sell personal information submitted through these forms.
          </p>

          <p>
            If you have questions about this policy, please contact us through our Contact Us page.
          </p>
        </div>
      </div>
    </section>
  )
}
