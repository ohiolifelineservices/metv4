// Structured data for the entities actually represented on the site.
// Metroconet is the retailer/seller. Metronet is the internet service provider.

import { PLANS } from "./commercial-data"

const METROCONET_ORGANIZATION = {
  "@type": "Organization",
  name: "Metroconet",
  url: "https://metroconet.com",
  description: "Independent authorized retailer for new Metronet service.",
}

const METRONET_PROVIDER = {
  "@type": "Organization",
  name: "Metronet",
  url: "https://www.metronet.com",
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}

export function localServiceSchema(areaServed: string, level: "City" | "State") {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Metronet Fiber Internet",
    provider: METRONET_PROVIDER,
    serviceType: "Fiber internet service",
    areaServed: {
      "@type": level === "City" ? "City" : "State",
      name: areaServed,
    },
    offers: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price,
      priceCurrency: "USD",
      seller: METROCONET_ORGANIZATION,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price,
        priceCurrency: "USD",
        unitText: "MONTH",
        description: "Price with AutoPay",
      },
    })),
  }
}

export const organizationSchema = {
  "@context": "https://schema.org",
  ...METROCONET_ORGANIZATION,
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Order Metronet",
  url: "https://metroconet.com",
  publisher: METROCONET_ORGANIZATION,
  description: "Independent authorized retailer for new Metronet service.",
}
