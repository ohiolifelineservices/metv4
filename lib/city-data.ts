// Real Metronet service-area geographic inventory used throughout the site.
// This list drives /city/[slug] and /metronet/[slug] routes.

export const states = {
  Colorado: ["Colorado Springs"],
  Florida: [
    "Altamonte Springs", "Apopka", "Daytona Beach", "Flagler Beach", "Longwood",
    "Maitland", "Orlando", "Ormond Beach", "Palm Coast", "Port Orange",
    "South Daytona", "Tallahassee",
  ],
  Iowa: [
    "Altoona", "Ames", "Ankeny", "Bettendorf", "Clive", "Coralville", "Davenport",
    "Des Moines", "Gilbert", "Grimes", "Hampton", "Iowa City", "Iowa Falls",
    "Jewell", "Johnston", "Le Claire", "Mason City", "Nevada", "Norwalk",
    "Pleasant Hill", "Polk City", "Sheffield", "Sioux City", "Urbandale",
    "Waterloo", "West Des Moines",
  ],
  Illinois: [
    "Batavia", "Bloomington", "Bristol", "Carbon Cliff", "Colona", "Cortland",
    "DeKalb", "East Moline", "Elburn", "Elgin", "Geneva", "Genoa", "Hampton",
    "Le Roy", "Milan", "Moline", "Montgomery", "Naperville", "Normal",
    "North Aurora", "Oswego", "Plainfield", "Plano", "Rock Island", "Romeoville",
    "Sandwich", "St Charles", "Sugar Grove", "Sycamore", "Yorkville",
  ],
  Indiana: [
    "Bargersville", "Carmel", "Connersville", "Crawfordsville", "Fishers",
    "Franklin", "Granger", "Greencastle", "Greenwood", "Hanover", "Huntington",
    "Indianapolis", "La Fontaine", "Lafayette", "Lebanon", "Madison", "Marion",
    "New Castle", "New Whiteland", "Noblesville", "North Manchester",
    "North Vernon", "Osceola", "Pendleton", "Roanoke", "Seymour", "South Bend",
    "Thorntown", "Vincennes", "Wabash", "Warsaw", "West Lafayette", "Westfield",
    "Zionsville",
  ],
  Kentucky: ["Berea", "Lexington", "Midway", "Nicholasville", "Paint Lick", "Richmond", "Versailles", "Wilmore"],
  Michigan: [
    "Ann Arbor", "Climax", "Detroit", "Dimondale", "East Lansing", "Galesburg",
    "Grand Ledge", "Grand Rapids", "Haslett", "Holt", "Hudsonville",
    "Huntington Woods", "Jenison", "Kalamazoo", "Lansing", "Mattawan", "Okemos",
    "Portage", "Scotts", "Wyoming", "Ypsilanti",
  ],
  Minnesota: [
    "Adams", "Albertville", "Austin", "Belle Plaine", "Blooming Prairie",
    "Brownsdale", "Byron", "Cannon Falls", "Carver", "Chanhassen",
    "Clarks Grove", "Cleveland", "Cologne", "Delano", "Dexter", "Dundas",
    "Eagle Lake", "Elko New Market", "Ellendale", "Elysian", "Excelsior",
    "Eyota", "Faribault", "Geneva", "Glenville", "Hamburg", "Hayfield",
    "Hayward", "Henderson", "Hollandale", "Jordan", "Kasota", "Kenyon",
    "Kilkenny", "Lakeville", "Le Center", "Le Roy", "Le Sueur", "Lyle",
    "Madison Lake", "Mankato", "Mayer", "Nerstrand", "New Germany",
    "New Richland", "Northfield", "Norwood Young America", "Oakland",
    "Owatonna", "Prior Lake", "Rochester", "Rosemount", "Saint Paul",
    "Saint Peter", "Shakopee", "Stewartville", "Victoria", "Waconia",
    "Waseca", "Watertown", "Waterville", "Winsted", "Zumbro Falls",
  ],
  "North Carolina": [
    "Ayden", "Fayetteville", "Greenville", "Grimesland", "Havelock", "Hickory",
    "Hope Mills", "Jacksonville", "Linden", "Midway Park", "New Bern",
    "Parkton", "Raeford", "Rocky Mount", "Winterville",
  ],
  Nebraska: ["Bennington", "Elkhorn", "Omaha"],
  Ohio: [
    "Beavercreek", "Beavercreek Township", "Bellbrook", "Brookville", "Clayton",
    "Dayton", "Englewood", "Fairborn", "Findlay", "Medway", "New Carlisle",
    "Piqua", "Tipp City", "Toledo", "Troy", "Vandalia", "West Milton",
  ],
  Texas: ["Bryan"],
  Virginia: ["Norfolk"],
  Wisconsin: ["La Crosse", "Onalaska"],
} as const

export const cities = Object.values(states).flat()

// Top-performing historical markets identified from Search Console evidence
export const PRIORITY_MARKET_SLUGS = [
  "bloomington", "lexington", "ames", "davenport", "fayetteville", "lafayette",
  "hickory", "bryan", "indianapolis", "waterloo", "tallahassee", "lansing",
  "norfolk", "carmel", "des-moines", "west-lafayette", "jacksonville",
  "palm-coast", "normal", "ankeny", "dayton", "nicholasville",
  "colorado-springs", "mason-city", "sioux-city", "richmond", "greenwood",
  "bettendorf", "lakeville", "omaha", "fishers", "owatonna", "austin",
  "new-bern", "westfield", "troy", "urbandale", "raeford", "rochester",
  "naperville", "iowa-city", "grand-rapids", "moline", "climax", "geneva-il",
  "sugar-grove", "altoona", "coralville", "batavia", "seymour", "huntington",
  "waconia", "noblesville", "franklin", "berea", "elgin", "st-charles",
  "findlay", "greenville", "lebanon", "versailles", "faribault", "vincennes",
  "east-lansing", "apopka", "west-des-moines", "hope-mills", "plainfield",
  "daytona-beach", "la-crosse", "norwalk", "piqua", "winterville",
  "port-orange", "ann-arbor", "johnston", "oswego", "new-castle", "vandalia",
  "mankato", "waseca", "linden", "flagler-beach", "colona", "south-daytona",
  "north-aurora", "granger", "fairborn", "pleasant-hill", "madison",
]

// --- State abbreviations (must be defined before slug maps) ---

const STATE_ABBREVIATIONS: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA",
  Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
  Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS",
  Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK",
  Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI",
  Wyoming: "WY", "District of Columbia": "DC",
}

export function getStateAbbreviation(state: string): string {
  return STATE_ABBREVIATIONS[state] || state
}

// --- Slug resolution with collision handling ---

const _SLUG_MAP = new Map<string, string>()
const _REVERSE_SLUG_MAP = new Map<string, { city: string; state: string }>()

;(function buildSlugMaps() {
  const baseSlugs = new Map<string, Array<{ city: string; state: string }>>()
  for (const [state, cs] of Object.entries(states)) {
    for (const city of cs as readonly string[]) {
      const base = city.toLowerCase().replace(/\s+/g, "-")
      if (!baseSlugs.has(base)) baseSlugs.set(base, [])
      baseSlugs.get(base)!.push({ city, state })
    }
  }
  for (const [base, entries] of baseSlugs) {
    if (entries.length === 1) {
      const { city, state } = entries[0]
      _SLUG_MAP.set(`${city}:${state}`, base)
      _REVERSE_SLUG_MAP.set(base, { city, state })
    } else {
      for (const { city, state } of entries) {
        const slug = `${base}-${getStateAbbreviation(state).toLowerCase()}`
        _SLUG_MAP.set(`${city}:${state}`, slug)
        _REVERSE_SLUG_MAP.set(slug, { city, state })
      }
    }
  }
})()

/** Base slugs that map to multiple cities (for redirect handling) */
export const COLLISION_BASE_SLUGS = ["hampton", "geneva", "le-roy"]

export function cityToSlug(city: string, state?: string): string {
  if (state) {
    const key = `${city}:${state}`
    if (_SLUG_MAP.has(key)) return _SLUG_MAP.get(key)!
  }
  for (const [key, slug] of _SLUG_MAP) {
    if (key.startsWith(`${city}:`)) return slug
  }
  return city.toLowerCase().replace(/\s+/g, "-")
}

export function slugToCity(slug: string): string {
  const entry = _REVERSE_SLUG_MAP.get(slug)
  if (entry) return entry.city
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

export function getAllCitySlugs(): string[] {
  return Array.from(_REVERSE_SLUG_MAP.keys())
}

export function getAllCitiesWithStates(): Array<{ city: string; state: string }> {
  return Array.from(_REVERSE_SLUG_MAP.values())
}

export function getStateForCity(cityName: string): string | undefined {
  for (const [state, stateCities] of Object.entries(states)) {
    if ((stateCities as readonly string[]).includes(cityName)) return state
  }
  return undefined
}

/** Get state for a specific slug (handles collision-disambiguated slugs) */
export function getStateForSlug(slug: string): string | undefined {
  const entry = _REVERSE_SLUG_MAP.get(slug)
  return entry?.state
}

export function getCitiesForState(state: string): string[] {
  return (states as Record<string, readonly string[]>)[state]?.slice() || []
}

export function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/\s+/g, "-")
}

export function slugToState(slug: string): string {
  for (const state of Object.keys(states)) {
    if (stateToSlug(state) === slug) return state
  }
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

export function getAllStateSlugs(): string[] {
  return Object.keys(states).map(stateToSlug)
}

export function getStateContent(stateName: string) {
  const cityList = getCitiesForState(stateName)
  return {
    description: `Metronet offers 100% fiber internet service in ${cityList.length} ${
      cityList.length === 1 ? "market" : "markets"
    } across ${stateName}. Every plan runs on the same fiber-optic network with symmetrical upload and download speeds, no data caps, and no long-term contracts.`,
    majorMarkets: cityList
      .filter((c) => PRIORITY_MARKET_SLUGS.includes(cityToSlug(c, stateName)))
      .slice(0, 6)
      .concat(cityList.slice(0, 6))
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 6),
    totalMarkets: cityList.length,
  }
}
