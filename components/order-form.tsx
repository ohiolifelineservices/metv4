"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Loader2, CalendarIcon } from "lucide-react"
import Image from "next/image"
import { BRAND } from "@/lib/media"
import { PLANS, ORDER_ENDPOINT } from "@/lib/commercial-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, parse, isValid, startOfDay, startOfMonth } from "date-fns"
import { trackEvent } from "@/components/google-analytics"

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: { name: string; price: string } | null
}

// Preserved from the original implementation: best-effort geo lookup used
// only as a lead-quality signal in the order payload, not for gating.
async function resolveIpGeoLocation(): Promise<string> {
  const apis: { url: string; parse: (j: Record<string, string>) => string }[] = [
    { url: "https://ipwho.is/?fields=success,city,region", parse: (j) => [j.city, j.region].filter(Boolean).join(", ") },
    { url: "https://ipapi.co/json/", parse: (j) => [j.city, j.region].filter(Boolean).join(", ") },
    { url: "https://get.geojs.io/v1/ip/geo.json", parse: (j) => [j.city, j.region].filter(Boolean).join(", ") },
  ]
  for (const api of apis) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3500)
    try {
      const res = await fetch(api.url, { signal: controller.signal })
      if (!res.ok) continue
      const json = await res.json()
      const location = api.parse(json)
      if (location) return location
    } catch {
      // try next provider
    } finally {
      clearTimeout(timeout)
    }
  }
  return ""
}

export default function OrderForm({ isOpen, onClose, selectedPlan }: OrderFormProps) {
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [installDate, setInstallDate] = useState<Date>()
  const [calendarOpen, setCalendarOpen] = useState(false)
  // When opened from nav without a plan, let the user pick one (default: 1 Gig)
  const defaultPlan = PLANS.find((p) => p.popular) || PLANS[1]
  const [pickedPlanId, setPickedPlanId] = useState(defaultPlan.id)
  const activePlan = selectedPlan
    ? selectedPlan
    : (() => {
        const p = PLANS.find((pl) => pl.id === pickedPlanId) || defaultPlan
        return { name: p.name, price: p.price }
      })()
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", serviceAddress: "", zipCode: "",
    phoneNumber: "", email: "", dateOfBirth: "", preferredInstallTime: "", promoCode: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const ipGeoPromiseRef = useRef<Promise<string> | null>(null)
  const orderOpenTrackedRef = useRef(false)
  const installTimeTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      orderOpenTrackedRef.current = false
      ipGeoPromiseRef.current = null
      return
    }
    if (orderOpenTrackedRef.current) return

    orderOpenTrackedRef.current = true
    ipGeoPromiseRef.current = resolveIpGeoLocation()
    trackEvent("order_form_open", { plan: activePlan.name })
  }, [isOpen, activePlan.name])

  // Keep the underlying page completely fixed while the order form is open.
  // The site uses Lenis for desktop smooth scrolling, so body overflow alone is
  // not sufficient; the dialog is also marked data-lenis-prevent below.
  useEffect(() => {
    if (!isOpen) return

    const body = document.body
    const html = document.documentElement
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = html.style.overflow

    body.style.overflow = "hidden"
    html.style.overflow = "hidden"
    window.dispatchEvent(new CustomEvent("metroconet:scroll-lock", { detail: true }))

    return () => {
      body.style.overflow = previousBodyOverflow
      html.style.overflow = previousHtmlOverflow
      window.dispatchEvent(new CustomEvent("metroconet:scroll-lock", { detail: false }))
    }
  }, [isOpen])

  // Keep the modal matched to the *visible* viewport on phones. Android/iOS
  // keyboards can shrink the usable area without behaving like a normal desktop
  // viewport resize, so visualViewport is the most reliable source here.
  useEffect(() => {
    if (!isOpen || !window.visualViewport) return

    const root = document.documentElement
    const viewport = window.visualViewport
    const syncVisualViewport = () => {
      root.style.setProperty("--order-vv-height", `${viewport.height}px`)
      root.style.setProperty("--order-vv-offset", `${viewport.offsetTop}px`)
    }

    syncVisualViewport()
    viewport.addEventListener("resize", syncVisualViewport)
    viewport.addEventListener("scroll", syncVisualViewport)

    return () => {
      viewport.removeEventListener("resize", syncVisualViewport)
      viewport.removeEventListener("scroll", syncVisualViewport)
      root.style.removeProperty("--order-vv-height")
      root.style.removeProperty("--order-vv-offset")
    }
  }, [isOpen])

  const bringControlIntoView = useCallback((control: HTMLElement, smooth = true) => {
    const modal = document.querySelector<HTMLElement>('[data-testid="order-form-modal"]')
    if (!modal || !modal.contains(control)) return

    // Wait for the on-screen keyboard / browser chrome to finish resizing.
    window.setTimeout(() => {
      const modalRect = modal.getBoundingClientRect()
      const controlRect = control.getBoundingClientRect()
      const isPhone = window.matchMedia("(max-width: 639px)").matches
      const safeTop = modalRect.top + (isPhone ? 72 : 28)
      const safeBottom = modalRect.bottom - (isPhone ? 22 : 28)

      if (controlRect.top >= safeTop && controlRect.bottom <= safeBottom) return

      const targetTop = modal.scrollTop + (controlRect.top - modalRect.top) - (isPhone ? 86 : 36)
      modal.scrollTo({
        top: Math.max(0, targetTop),
        behavior: smooth ? "smooth" : "auto",
      })
    }, isPhoneKeyboardLikelyOpen() ? 180 : 40)
  }, [])

  const isPhoneKeyboardLikelyOpen = () => {
    if (!window.visualViewport) return false
    return window.innerHeight - window.visualViewport.height > 120
  }

  useEffect(() => {
    if (!isOpen || !window.visualViewport) return
    const viewport = window.visualViewport
    const keepActiveControlVisible = () => {
      const active = document.activeElement
      if (active instanceof HTMLElement) bringControlIntoView(active, false)
    }
    viewport.addEventListener("resize", keepActiveControlVisible)
    return () => viewport.removeEventListener("resize", keepActiveControlVisible)
  }, [isOpen, bringControlIntoView])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    const dobDate = parse(formData.dateOfBirth, "MM/dd/yyyy", new Date())
    if (!isValid(dobDate)) newErrors.dateOfBirth = "Please enter a valid date of birth (MM/DD/YYYY)"
    if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) newErrors.phoneNumber = "Please enter a valid 10-digit phone number"
    if (!/^\d{5}$/.test(formData.zipCode)) newErrors.zipCode = "Please enter a valid 5-digit zip code"
    setErrors(newErrors)
    const valid = Object.keys(newErrors).length === 0
    if (!valid) {
      const firstInvalidName = Object.keys(newErrors)[0]
      window.setTimeout(() => {
        const field = document.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)
        field?.focus({ preventScroll: true })
        if (field) bringControlIntoView(field)
      }, 0)
    }
    return valid
  }

  const handleDateOfBirthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "")
    let formatted = input
    if (input.length > 2) formatted = `${input.slice(0, 2)}/${input.slice(2)}`
    if (input.length > 4) formatted = `${formatted.slice(0, 5)}/${input.slice(4, 8)}`
    setFormData((prev) => ({ ...prev, dateOfBirth: formatted }))
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return
    const form = event.currentTarget
    const fd = new FormData(form)
    const formProps = Object.fromEntries(fd)

    const dataToSend: Record<string, string> = {
      timestamp: new Date().toISOString(),
      order: `${activePlan.name} - $${activePlan.price}`,
      firstName: String(formProps.firstName || ""),
      lastName: String(formProps.lastName || ""),
      serviceAddress: String(formProps.serviceAddress || ""),
      zipCode: String(formProps.zipCode || ""),
      phoneNumber: String(formProps.phoneNumber || ""),
      email: String(formProps.email || ""),
      dateOfBirth: String(formProps.dateOfBirth || ""),
      preferredInstallDate: installDate ? format(installDate, "yyyy-MM-dd") : "",
      preferredInstallTime: String(formProps.preferredInstallTime || ""),
      promoCode: String(formProps.promoCode || "None"),
      addPhoneService: "No",
      geoLocation: "",
    }

    if (ipGeoPromiseRef.current) {
      dataToSend.geoLocation = await Promise.race<string>([
        ipGeoPromiseRef.current,
        new Promise<string>((r) => setTimeout(() => r(""), 3000)),
      ])
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(ORDER_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (response.type === "opaque" || response.ok) {
        trackEvent("order_submitted", { plan: activePlan.name })
        setConfirmationMessage("Thank you for your order. Your installation date/time will be confirmed via email.")
        form.reset()
        setInstallDate(undefined)
        setFormData({
          firstName: "", lastName: "", serviceAddress: "", zipCode: "",
          phoneNumber: "", email: "", dateOfBirth: "", preferredInstallTime: "", promoCode: "",
        })
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      setConfirmationMessage(
        "There was an error submitting your order. Please try again in a moment.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const today = new Date()
  const minInstallDate = startOfDay(addDays(today, 2))
  const maxInstallDate = addDays(minInstallDate, 13)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        data-testid="order-form-modal"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        className="sm:max-w-[620px] bg-[#0b0b16] border-white/12 text-white top-[calc(var(--order-vv-offset,0px)+0.5rem)] translate-y-0 h-[calc(var(--order-vv-height,100dvh)-1rem)] max-h-none sm:top-[50%] sm:translate-y-[-50%] sm:h-auto sm:max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y rounded-[22px] sm:rounded-[26px] p-4 sm:p-6 gap-3 sm:gap-4"
      >
        <DialogHeader>
          <Image src={BRAND.resellerLogo} alt="Metronet Authorized Reseller" width={150} height={50} className="h-7 w-auto mx-auto mb-2" />
          <DialogTitle className="text-2xl sm:text-3xl font-display font-extrabold text-center text-white">
            {selectedPlan ? `Order ${selectedPlan.name}` : "Start Your Order"}
          </DialogTitle>
          <p className="text-center text-mc-green font-display font-bold text-lg">${activePlan.price}/mo with AutoPay</p>
          <p className="text-center text-white/40 text-xs pt-1">First Month Free for eligible new customers &bull; No annual contract</p>
        </DialogHeader>
        {!selectedPlan && !confirmationMessage && (
          <div className="flex gap-2 justify-center pb-2" data-testid="order-plan-selector">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                data-testid={`plan-option-${p.id}`}
                onClick={() => setPickedPlanId(p.id)}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-center transition-all ${
                  pickedPlanId === p.id
                    ? "border-mc-purple bg-mc-purple/15 text-white"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20"
                }`}
              >
                <span className="block font-display font-bold text-sm">{p.speed}</span>
                <span className="block text-xs mt-0.5 text-mc-green font-semibold">${p.price}/mo</span>
              </button>
            ))}
          </div>
        )}
        {confirmationMessage ? (
          <div className="text-center py-6" data-testid="order-form-confirmation">
            <p className="text-white/90">{confirmationMessage}</p>
            <Button data-testid="order-form-close-button" onClick={onClose} className="mt-6 bg-mc-purple hover:bg-mc-purple/80 rounded-full">
              Close
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            onFocusCapture={(event) => {
              const target = event.target
              if (target instanceof HTMLElement) bringControlIntoView(target)
            }}
            className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 sm:[&>div]:gap-1.5"
          >
            <div>
              <Label htmlFor="firstName" className="text-white/80 text-sm">First Name</Label>
              <Input id="firstName" name="firstName" required autoComplete="given-name" enterKeyHint="next" data-testid="order-form-first-name" className="bg-black/40 text-white border-mc-gray/50" />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white/80 text-sm">Last Name</Label>
              <Input id="lastName" name="lastName" required autoComplete="family-name" enterKeyHint="next" data-testid="order-form-last-name" className="bg-black/40 text-white border-mc-gray/50" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="serviceAddress" className="text-white/80 text-sm">Service Address</Label>
              <Input id="serviceAddress" name="serviceAddress" required autoComplete="street-address" enterKeyHint="next" data-testid="order-form-address" className="bg-black/40 text-white border-mc-gray/50" />
            </div>
            <div>
              <Label htmlFor="zipCode" className="text-white/80 text-sm">Zip Code</Label>
              <Input
                id="zipCode" name="zipCode" required inputMode="numeric" autoComplete="postal-code" enterKeyHint="next" maxLength={5} data-testid="order-form-zip"
                onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                className="bg-black/40 text-white border-mc-gray/50"
              />
              {errors.zipCode && <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>}
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-white/80 text-sm">Phone Number</Label>
              <Input
                id="phoneNumber" name="phoneNumber" type="tel" required inputMode="tel" autoComplete="tel" enterKeyHint="next" data-testid="order-form-phone"
                onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                className="bg-black/40 text-white border-mc-gray/50"
              />
              {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-white/80 text-sm">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" enterKeyHint="next" data-testid="order-form-email" className="bg-black/40 text-white border-mc-gray/50" />
            </div>
            <div>
              <Label htmlFor="dateOfBirth" className="text-white/80 text-sm">Date of Birth</Label>
              <Input
                id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleDateOfBirthChange}
                placeholder="MM/DD/YYYY" required inputMode="numeric" autoComplete="bday" enterKeyHint="next" maxLength={10} data-testid="order-form-dob"
                className="bg-black/40 text-white border-mc-gray/50"
              />
              {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
            </div>
            <div className="col-span-1 min-w-0">
              <Label className="text-white/80 text-sm"><span className="sm:hidden">Install Date</span><span className="hidden sm:inline">Preferred Install Date</span></Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button" variant="outline" data-testid="order-form-install-date"
                    className="w-full min-w-0 h-auto min-h-11 justify-start text-left font-normal bg-black/40 text-white border-mc-gray/50 hover:bg-black/60 hover:text-white py-2.5 overflow-hidden"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="min-w-0 truncate sm:hidden">{installDate ? format(installDate, "EEE, MMM d") : "Pick date"}</span>
                    <span className="hidden min-w-0 whitespace-nowrap sm:inline">{installDate ? format(installDate, "EEE, MMM d, yyyy") : "Pick a date"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  data-lenis-prevent
                  align="center"
                  sideOffset={8}
                  className="w-[calc(100vw-0.75rem)] max-w-[382px] sm:w-auto sm:max-w-none overflow-hidden rounded-2xl border border-white/15 bg-[#15152b] p-0 shadow-2xl shadow-black/50"
                >
                  <div className="border-b border-white/10 px-4 py-3.5">
                    <p className="text-sm font-semibold text-white">Choose an installation date</p>
                  </div>
                  <Calendar
                    mode="single" selected={installDate}
                    defaultMonth={installDate || minInstallDate}
                    startMonth={startOfMonth(minInstallDate)}
                    endMonth={startOfMonth(maxInstallDate)}
                    showOutsideDays
                    formatters={{ formatWeekdayName: (date) => format(date, "EEE") }}
                    modifiers={{
                      available: (date) => date >= minInstallDate && date <= maxInstallDate,
                      unavailable: (date) => date < minInstallDate || date > maxInstallDate,
                    }}
                    onSelect={(date) => {
                      setInstallDate(date)
                      setCalendarOpen(false)
                      window.setTimeout(() => {
                        installTimeTriggerRef.current?.focus({ preventScroll: true })
                        if (installTimeTriggerRef.current) bringControlIntoView(installTimeTriggerRef.current)
                      }, 80)
                    }}
                    disabled={(date) => date < minInstallDate || date > maxInstallDate}
                    autoFocus
                    className="p-3 sm:p-4 [--cell-size:2.75rem] sm:[--cell-size:3rem] bg-transparent text-white [&_.rdp-month_caption]:text-lg [&_.rdp-month_caption]:font-bold [&_.rdp-caption_label]:text-white [&_.rdp-weekday]:text-[11px] sm:[&_.rdp-weekday]:text-xs [&_.rdp-weekday]:font-semibold [&_.rdp-weekday]:uppercase [&_.rdp-weekday]:tracking-[0.08em] [&_.rdp-weekday]:text-white/55 [&_.rdp-week]:mt-1.5 [&_.rdp-day]:p-0.5 [&_.rdp-day_button]:text-[15px] [&_.rdp-button_previous]:rounded-xl [&_.rdp-button_previous]:text-white [&_.rdp-button_previous]:hover:bg-white/10 [&_.rdp-button_next]:rounded-xl [&_.rdp-button_next]:text-white [&_.rdp-button_next]:hover:bg-white/10"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="col-span-1 min-w-0">
              <Label className="text-white/80 text-sm"><span className="sm:hidden">Install Time</span><span className="hidden sm:inline">Preferred Install Time</span></Label>
              <Select name="preferredInstallTime" onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, preferredInstallTime: value }))
                window.setTimeout(() => {
                  const submit = document.querySelector<HTMLElement>('[data-testid="order-form-submit-button"]')
                  if (submit) bringControlIntoView(submit)
                }, 80)
              }}>
                <SelectTrigger ref={installTimeTriggerRef} data-testid="order-form-install-time" className="h-11 w-full min-w-0 bg-black/40 text-white border-mc-gray/50">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent className="bg-mc-navy text-white border-mc-gray/50">
                  <SelectItem value="8am-10am">8 AM - 10 AM</SelectItem>
                  <SelectItem value="10am-12pm">10 AM - 12 PM</SelectItem>
                  <SelectItem value="12pm-3pm">12 PM - 3 PM</SelectItem>
                  <SelectItem value="3pm-5pm">3 PM - 5 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="promoCode" className="text-white/80 text-sm">Promo Code (Optional)</Label>
              <Input id="promoCode" name="promoCode" autoComplete="off" enterKeyHint="done" placeholder="Enter promo code if you have one" data-testid="order-form-promo-code" className="bg-black/40 text-white border-mc-gray/50" />
            </div>
            <Button
              type="submit" disabled={isSubmitting} data-testid="order-form-submit-button"
              className="col-span-2 w-full bg-mc-green text-black font-display font-bold rounded-full py-6 hover:brightness-110"
            >
              {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>) : "Submit Order"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
