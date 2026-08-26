"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches

    // Keep native scrolling on touch devices and for users who prefer less motion.
    if (prefersReducedMotion || isTouchDevice) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const handleScrollLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail
      if (locked) lenis.stop()
      else lenis.start()
    }
    window.addEventListener("metroconet:scroll-lock", handleScrollLock)

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener("metroconet:scroll-lock", handleScrollLock)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
