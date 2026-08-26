// Honest baseline content for lower-evidence market pages.
// Priority markets with historical GSC visibility use explicit, intent-aware copy from
// priority-city-content.ts. Lower-evidence markets deliberately do NOT use hash-selected
// or pseudo-random paragraph variants to manufacture uniqueness.

export function cityIntro(city: string, state: string, abbr: string): string {
  return `Shopping for new Metronet service in ${city}, ${abbr}? Compare the current 500 Mbps, 1 Gig, and 2 Gig plans, with pricing starting at $60/mo with AutoPay, then review the current new-customer offer before deciding whether to order. Serviceability is still tied to the exact address, so the market page gives you the shopping information without pretending every home in ${city} has the same availability.`
}

export function cityAngle(city: string): { heading: string; body: string } {
  return {
    heading: `Choosing the right Metronet plan in ${city}`,
    body: `Use your household's busiest period as the comparison point. 500 Mbps is the lowest-priced current tier at $60/mo with AutoPay and gives many smaller households substantial capacity for everyday streaming, browsing, calls, gaming, and connected devices. The 1 Gig plan is $70/mo and is positioned as the mainstream choice when several people are online at once. The 2 Gig plan is $80/mo and adds more headroom for heavier simultaneous use. The best value is the tier that fits how your home actually uses the connection, not automatically the largest number.`,
  }
}

export function cityAvailabilityNote(city: string): string {
  return `Metronet availability in ${city} is address-specific. You can compare published plans, prices, and the current promotion without entering a ZIP code first, but the city name alone does not guarantee that every street or property is serviceable. Use the availability tool when location is your next question; the exact service address is also captured during the order process.`
}

export function citySecondaryContent(city: string, state: string): { heading: string; body: string } {
  return {
    heading: `From plan comparison to a new-service order in ${city}`,
    body: `When you choose a plan, the order form carries that selection into the request so you do not have to start over. You provide the ${city} service address and customer contact information, then choose a preferred installation date and time window. If you open Order Now before selecting a tier, 1 Gig is preselected and you can switch plans in the form. If you are still researching, the FAQs, promotion details, availability tool, and other ${state} market links remain available without forcing you into the order flow.`,
  }
}

export function cityFaqs(city: string, state: string, abbr: string) {
  return [
    {
      question: `Is Metronet fiber available throughout ${city}?`,
      answer: `Coverage can vary by street and address within ${city}. Enter your zip code in the availability checker to confirm your area, and your exact street address is verified during the ordering process.`,
    },
    {
      question: `What Metronet plans are available in ${city}, ${abbr}?`,
      answer: `Metroconet offers Metronet's current lineup in ${city}: 500 Mbps at $60/mo, 1 Gig at $70/mo, and 2 Gig at $80/mo, all with AutoPay. Every plan is symmetrical fiber with unlimited data and no annual contract.`,
    },
    {
      question: `How much does Metronet internet cost in ${city}?`,
      answer: `Pricing in ${city} matches Metronet's standard residential pricing: $60/mo for 500 Mbps, $70/mo for 1 Gig, and $80/mo for 2 Gig with AutoPay. First Month Free is available for eligible new customers.`,
    },
    {
      question: `Which Metronet plan is best for a ${city} home?`,
      answer: `1 Gig is the mainstream choice for most ${city} households running multiple devices, 4K streaming, gaming, and remote work. 500 Mbps suits one or two light users, and 2 Gig is worth the extra $10/mo for large households, heavy uploads, or smart-home setups.`,
    },
    {
      question: `How do I order Metronet service in ${city}?`,
      answer: `Choose a plan on this page and click Order Now. You'll enter your ${city} service address and pick a preferred install date and time window, and a confirmation follows by email.`,
    },
    {
      question: `Is there a data cap or contract on Metronet plans in ${city}?`,
      answer: `No. Every current Metronet residential plan includes unlimited data with no overage charges, and no annual contract is required.`,
    },
    {
      question: `Is Metroconet the same company as Metronet?`,
      answer: `No. Metroconet is an independent authorized retailer for new Metronet service in ${city} and across ${state}. Metronet is the fiber provider. Existing Metronet customers should contact official Metronet Customer Care for billing or technical support.`,
    },
    {
      question: `What is included with Metronet installation in ${city}?`,
      answer: `Installation includes the fiber line to your home and a fiber gateway (Wi-Fi router) at no additional equipment cost. You pick your preferred install date and time window, and a technician handles the full setup.`,
    },
  ]
}

export function stateIntroLong(state: string, marketCount: number, majorMarkets: string[]): string {
  const marketList = majorMarkets.slice(0, 5).join(", ")
  return `Metronet operates a fiber-optic network across ${marketCount} ${
    marketCount === 1 ? "market" : "markets"
  } in ${state}, including ${marketList}. Residential plans are available at 500 Mbps, 1 Gig, or 2 Gig with unlimited data and no annual contract requirement. Metroconet is an independent authorized retailer for new Metronet service, which means you can compare those plans and place a new ${state} service order online.`
}
