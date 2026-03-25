'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface DebtSliderProps {
  initialValue?: number
  onSubmit: (value: number) => void
}

const MIN = 5000
const MAX = 100000
const STEP = 500
const DEFAULT = 15000

export function DebtSlider({ initialValue = DEFAULT, onSubmit }: DebtSliderProps) {
  const [value, setValue] = React.useState(initialValue)
  const sliderRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (sliderRef.current) {
      const pct = ((value - MIN) / (MAX - MIN)) * 100
      sliderRef.current.style.setProperty('--progress', `${pct}%`)
    }
  }, [value])

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full has-sticky-button">
        {/* Step label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Step 1 of 3
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-2"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          How much total debt are you carrying?
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Credit cards, personal loans, medical bills.
        </p>

        {/* Large number display */}
        <div className="animate-fade-in-up w-full text-center py-4 mb-6" style={{ animationDelay: '500ms' }}>
          <span style={{ color: '#1B2A4A' }}>
            <AnimatedCounter
              value={value}
              prefix="$"
              className="font-display text-5xl md:text-6xl font-bold tracking-tight"
              duration={200}
            />
          </span>
        </div>

        {/* Slider */}
        <div className="animate-fade-in-up w-full px-1 mb-2" style={{ animationDelay: '600ms' }}>
          <input
            ref={sliderRef}
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="debt-slider w-full"
            aria-label="Debt amount"
          />
        </div>
        <div className="w-full flex justify-between mb-8" style={{ fontSize: '12px', color: '#999999' }}>
          <span>$5,000</span>
          <span>$100,000</span>
        </div>

        {/* CTA */}
        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon onClick={() => onSubmit(value)}>
            Continue
          </Button>
        </StickyButtonContainer>
      </div>
    </div>
  )
}

export default DebtSlider
