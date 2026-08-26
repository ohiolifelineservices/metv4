import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  METRONET_CANONICAL_SLUGS,
  getCanonicalCityPath,
  resolveCollisionSlug,
} from "./lib/canonical-map"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const metronetMatch = pathname.match(/^\/metronet\/([^/]+)\/?$/)
  if (metronetMatch) {
    const slug = metronetMatch[1]

    // Historical /metronet/ winners stay live, including /metronet/le-roy.
    if (METRONET_CANONICAL_SLUGS.has(slug)) {
      return NextResponse.next()
    }

    const resolvedSlug = resolveCollisionSlug(slug)
    const canonicalPath = getCanonicalCityPath(resolvedSlug)
    if (canonicalPath !== pathname.replace(/\/$/, "")) {
      const url = request.nextUrl.clone()
      url.pathname = canonicalPath
      return NextResponse.redirect(url, 301)
    }
  }

  const cityMatch = pathname.match(/^\/city\/([^/]+)\/?$/)
  if (cityMatch) {
    const slug = cityMatch[1]
    const resolvedSlug = resolveCollisionSlug(slug)
    const canonicalPath = getCanonicalCityPath(resolvedSlug)

    if (canonicalPath !== pathname.replace(/\/$/, "")) {
      const url = request.nextUrl.clone()
      url.pathname = canonicalPath
      return NextResponse.redirect(url, 301)
    }
  }

  if (pathname === "/5-gig" || pathname === "/5gig" || pathname === "/home-phone") {
    const url = request.nextUrl.clone()
    url.pathname = "/plans-pricing"
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/metronet/:path*", "/city/:path*", "/5-gig", "/5gig", "/home-phone"],
}
