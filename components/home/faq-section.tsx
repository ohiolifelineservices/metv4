import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HOME_FAQS as FAQS } from "@/lib/home-faqs"

export function HomeFAQ() {
  return (
    <section className="relative py-16 sm:py-14 border-t border-white/5 overflow-hidden" data-testid="home-faq-section">
      <div className="bloom bloom-teal w-[420px] h-[420px] top-20 -left-40 opacity-40" aria-hidden="true" />
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <p className="text-mc-yellow font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-[1.1]">
                Metronet internet questions, answered
              </h2>
              <p className="text-white/60 leading-relaxed mt-5">
                The things people actually ask before switching to fiber — pricing, availability, contracts, and what
                installation involves.
              </p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8">
            <ScrollReveal>
              <Accordion type="single" collapsible className="w-full" data-testid="home-faq-accordion">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`faq-item-${i}`}>
                    <AccordionTrigger className="text-left text-white font-display font-semibold hover:text-mc-purple py-5">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-white/60 leading-relaxed pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
