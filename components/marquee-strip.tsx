import Marquee from "react-fast-marquee"

const ITEMS = [
  "100% FIBER NETWORK",
  "SYMMETRICAL UPLOAD SPEEDS",
  "NO DATA CAPS",
  "NO ANNUAL CONTRACT",
  "FIRST MONTH FREE",
  "ORDER ONLINE IN MINUTES",
]

export function MarqueeStrip() {
  return (
    <div className="bg-mc-purple py-3.5 border-y border-black/30 relative z-10" data-testid="marquee-strip">
      <Marquee gradient={false} speed={42} pauseOnHover>
        {ITEMS.concat(ITEMS).map((item, i) => (
          <span key={i} className="text-white font-display font-bold text-xs sm:text-sm uppercase tracking-[0.2em] px-7 flex items-center gap-7">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-mc-yellow" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
