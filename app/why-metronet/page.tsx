import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/seo-metadata"
import WhyMetronetClient from "./why-metronet-client"
import { breadcrumbSchema } from "@/lib/schema-data"

export const metadata: Metadata = staticPageMetadata(
  "Why Metronet? | Fiber Plans from $60",
  "See why households choose Metronet fiber, compare speeds up to 2 Gig and view plans starting at $60/mo. First month FREE for eligible new customers.",
  "/why-metronet",
)

export default function WhyMetronetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://metroconet.com" }, { name: "Why Metronet", url: "https://metroconet.com/why-metronet" }])) }} />
      <WhyMetronetClient />
    </>
  )
}
