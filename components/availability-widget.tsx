"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, X, CheckCircle2, Search } from "lucide-react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { ORDER_ENDPOINT } from "@/lib/commercial-data"
import { trackEvent } from "@/components/google-analytics"



function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "auto" }
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="glass-panel rounded-[26px] shadow-[0_40px_100px_-30px_rgba(150,77,255,0.55)] w-full max-w-md relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="availability-modal"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white" aria-label="Close popup" data-testid="availability-modal-close">
          <X size={22} />
        </button>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  )
}

export function AvailabilityWidget({ compact = false, variant = "default" }: { compact?: boolean; variant?: "default" | "bar" }) {
  const [zipCode, setZipCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const checkAvailability = useCallback(() => {
    if (zipCode.trim() === "") { setErrorMessage("Please enter a zip code."); return }
    if (zipCode.length !== 5 || !/^\d+$/.test(zipCode)) { setErrorMessage("Please enter a valid 5-digit zip code."); return }

    setErrorMessage("")
    setIsLoading(true)
    trackEvent("zip_search", { zip: zipCode })

    setTimeout(() => {
      setIsAvailable(true)
      setShowPopup(true)
      setIsLoading(false)
    }, 700)
  }, [zipCode])

  const isBar = variant === "bar"

  return (
    <div className={isBar ? "w-full" : compact ? "w-full" : "max-w-xl mx-auto"} data-testid="availability-widget">
      <div className={isBar ? "flex gap-2" : "flex flex-col sm:flex-row gap-3"}>
        <div className="relative flex-1">
          <Search className={isBar ? "absolute left-3 top-1/2 -translate-y-1/2 text-white/40" : "absolute left-4 top-1/2 -translate-y-1/2 text-mc-gray"} size={isBar ? 15 : 18} />
          <Input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
            onKeyDown={(e) => e.key === "Enter" && checkAvailability()}
            placeholder="Enter your zip code"
            maxLength={5}
            data-testid="zip-input"
            suppressHydrationWarning
            className={isBar
              ? "w-full bg-white/[0.06] border-white/15 text-white placeholder-white/40 text-sm h-9 pl-9 rounded-full"
              : "w-full bg-white/[0.04] border-white/15 text-white placeholder-white/40 text-base py-6 pl-11 rounded-full focus-visible:ring-mc-purple backdrop-blur"}
          />
        </div>
        <Button
          onClick={checkAvailability}
          disabled={isLoading}
          data-testid="zip-check-button"
          className={isBar
            ? "bg-mc-green text-black font-display font-bold text-sm h-9 px-5 rounded-full hover:brightness-110 whitespace-nowrap"
            : "btn-shine bg-mc-purple hover:bg-mc-green hover:text-black text-white whitespace-nowrap text-base py-6 px-7 font-display font-bold rounded-full transition-colors duration-300"}
        >
          {isLoading ? <Loader2 className={isBar ? "h-4 w-4 animate-spin" : "h-5 w-5 animate-spin"} /> : isBar ? "Check" : "Check Availability"}
        </Button>
      </div>
      {errorMessage && <p className={isBar ? "text-red-400 mt-1 text-xs" : "text-red-400 mt-3 text-sm"} data-testid="zip-error-message">{errorMessage}</p>}

      {isMounted && showPopup && createPortal(
        <Modal onClose={() => setShowPopup(false)}>
          {isAvailable ? (
            <>
              <CheckCircle2 className="text-mc-green mb-3" size={40} />
              <h3 className="text-2xl font-display font-bold mb-2 text-white" data-testid="availability-result-title">
                Fiber is available!
              </h3>
              <p className="mb-6 text-white/70">Great news — Metronet fiber service is available in your zip code.</p>
              <Link href="/plans-pricing">
                <Button
                  onClick={() => setShowPopup(false)}
                  data-testid="availability-view-plans-button"
                  className="bg-mc-green text-black font-display font-bold py-4 rounded-full w-full hover:brightness-110"
                >
                  View Plans &amp; Order
                </Button>
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-display font-bold mb-2 text-white" data-testid="availability-result-title">
                Not yet available
              </h3>
              <p className="text-white/70 mb-4 text-sm">
                Metronet is expanding fast. Join the list for priority installation and offers when fiber reaches your area.
              </p>
              <div className="max-h-[300px] overflow-y-auto pr-1">
                <InlineWaitlistForm zipCode={zipCode} />
              </div>
            </>
          )}
        </Modal>,
        document.body,
      )}
    </div>
  )
}

function InlineWaitlistForm({ zipCode }: { zipCode: string }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formatTimestamp = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
      hour12: true, timeZone: "America/New_York",
    }
    return new Intl.DateTimeFormat("en-US", options).format(date).replace(",", " -") + " EST"
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const dataToSend = { ...formData, zipCode, timestamp: formatTimestamp(new Date()) }
      const response = await fetch(ORDER_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dataToSend, formType: "noServiceAvailability" }),
      })
      if (response.type === "opaque" || response.ok) {
        setFormData({ name: "", email: "", phone: "", address: "" })
        setShowThankYou(true)
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      // Silently fail — lead capture is best-effort, not conversion-critical
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showThankYou) {
    return (
      <div className="text-center py-4" data-testid="waitlist-thank-you">
        <h4 className="text-lg font-display font-semibold mb-2 text-white">Thank you!</h4>
        <p className="text-white/70 text-sm">We'll notify you when Metronet becomes available in your area.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="wl-name" className="text-white/70 text-xs">Name</Label>
        <Input id="wl-name" name="name" value={formData.name} onChange={handleChange} required data-testid="waitlist-name" className="bg-black/40 text-white border-mc-gray/40" />
      </div>
      <div>
        <Label htmlFor="wl-email" className="text-white/70 text-xs">Email</Label>
        <Input id="wl-email" name="email" type="email" value={formData.email} onChange={handleChange} required data-testid="waitlist-email" className="bg-black/40 text-white border-mc-gray/40" />
      </div>
      <div>
        <Label htmlFor="wl-phone" className="text-white/70 text-xs">Phone</Label>
        <Input id="wl-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required data-testid="waitlist-phone" className="bg-black/40 text-white border-mc-gray/40" />
      </div>
      <div>
        <Label htmlFor="wl-address" className="text-white/70 text-xs">Address</Label>
        <Input id="wl-address" name="address" value={formData.address} onChange={handleChange} required data-testid="waitlist-address" className="bg-black/40 text-white border-mc-gray/40" />
      </div>
      <Button type="submit" disabled={isSubmitting} data-testid="waitlist-submit" className="w-full bg-mc-purple hover:bg-mc-teal rounded-full">
        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : "Join the List"}
      </Button>
    </form>
  )
}
