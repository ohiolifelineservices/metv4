"use client"

import { createContext, useContext, useState, useCallback } from "react"
import OrderForm from "@/components/order-form"
import type { Plan } from "@/lib/commercial-data"

type OrderFormContextType = {
  openOrderForm: (plan?: Plan | { name: string; price: number }) => void
}

const OrderFormContext = createContext<OrderFormContextType | null>(null)

export function OrderFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null)

  const openOrderForm = useCallback((plan?: Plan | { name: string; price: number }) => {
    if (plan) {
      setSelectedPlan({ name: plan.name, price: String(plan.price) })
    } else {
      setSelectedPlan(null)
    }
    setIsOpen(true)
  }, [])

  return (
    <OrderFormContext.Provider value={{ openOrderForm }}>
      {children}
      <OrderForm isOpen={isOpen} onClose={() => setIsOpen(false)} selectedPlan={selectedPlan} />
    </OrderFormContext.Provider>
  )
}

export function useOrderForm() {
  const ctx = useContext(OrderFormContext)
  if (!ctx) throw new Error("useOrderForm must be used within OrderFormProvider")
  return ctx
}
