"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Content ships visible in the server-rendered HTML. The hidden state is only
// applied after mount, and a safety timer force-reveals everything so content
// can never be permanently invisible to a user or a crawler.
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static")

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    setPhase("hidden")
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase("shown")
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    observer.observe(el)
    const safety = window.setTimeout(() => setPhase("shown"), 2000)
    return () => {
      observer.disconnect()
      window.clearTimeout(safety)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        phase === "hidden" && "opacity-0 translate-y-8",
        phase !== "hidden" && "opacity-100 translate-y-0",
        className,
      )}
      style={phase === "shown" ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
