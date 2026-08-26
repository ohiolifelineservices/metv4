import type { Metadata } from "next"
import { Outfit, Manrope } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/lib/smooth-scroll"
import { GoogleAnalytics } from "@/components/google-analytics"
import { Navigation } from "@/components/navigation"
import { AvailabilityBar } from "@/components/availability-bar"
import { Footer } from "@/components/footer"
import { StickyMobileCTA } from "@/components/sticky-mobile-cta"
import { OrderFormProvider } from "@/components/order-form-context"
import { Toaster } from "@/components/ui/sonner"
import { organizationSchema, websiteSchema } from "@/lib/schema-data"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["400", "500", "600", "700", "800"] })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://metroconet.com"),
  title: "Metronet Internet | Plans from $60 | FREE Month",
  description:
    "Shop Metronet internet plans from $60/mo with speeds up to 2 Gig. Get your first month FREE and a WiFi router included. Order new service online today.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Metronet internet plans and pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable} dark`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <GoogleAnalytics />
        <SmoothScrollProvider>
          <OrderFormProvider>
            <div className="grain-overlay" aria-hidden="true" />
            <Navigation />
            <AvailabilityBar />
            <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
            <Footer />
            <StickyMobileCTA />
            <Toaster />
          </OrderFormProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
