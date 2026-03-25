'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'

interface RateSliderProps {
  initialValue?: number
  onSubmit: (value: number) => void
}

const MIN = 8
const MAX = 36
const STEP = 0.5
const DEFAULT = 24.0
const NATIONAL_AVG = 24.37

export function RateSlider({ initialValue = DEFAULT, onSubmit }: RateSliderProps) {
  const [value, setValue] = React.useState(initialValue)
  const [usedDefault, setUsedDefault] = React.useState(false)
  const sliderRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (sliderRef.current) {
      const pct = ((value - MIN) / (MAX - MIN)) * 100
      sliderRef.current.style.setProperty('--progress', `${pct}%`)
    }
  }, [value])

  const handleUseAverage = () => {
    setValue(NATIONAL_AVG)
    setUsedDefault(true)
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full has-sticky-button">
        {/* Step label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Step 2 of 3
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-2"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          What&apos;s your average interest rate?
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Check your latest statement. If you&apos;re not sure, 24% is the current national average.
        </p>

        {/* Large number display */}
        <div className="animate-fade-in-up w-full text-center py-4 mb-6" style={{ animationDelay: '500ms' }}>
          <span
            className="font-display text-5xl md:text-6xl font-bold tracking-tight"
            style={{ color: '#1B2A4A' }}
          >
            {value.toFixed(1)}%
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
            onChange={(e) => {
              setValue(Number(e.target.value))
              setUsedDefault(false)
            }}
            className="debt-slider w-full"
            aria-label="Interest rate"
          />
        </div>
        <div className="w-full flex justify-between mb-6" style={{ fontSize: '12px', color: '#999999' }}>
          <span>8.0%</span>
          <span>36.0%</span>
        </div>

        {/* "I don't know" escape */}
        {!usedDefault && (
          <button
            type="button"
            onClick={handleUseAverage}
            className="animate-fade-in-up w-full bg-white border rounded-lg text-left cursor-pointer transition-all duration-200 hover:bg-[#F0F7FF] mb-8"
            style={{
              animationDelay: '700ms',
              borderColor: '#E8E8E8',
              height: '52px',
              paddingLeft: '16px',
              paddingRight: '16px',
              fontSize: '14px',
              color: '#1B2A4A',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            I don&apos;t know my rate — use the average ({NATIONAL_AVG}%)
          </button>
        )}

        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon onClick={() => onSubmit(value)}>
            Continue
          </Button>
        </StickyButtonContainer>
      </div>
    </div>
  )
}

export default RateSlider
