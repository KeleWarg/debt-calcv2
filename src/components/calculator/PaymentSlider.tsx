'use client'

import * as React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { formatCurrency } from '@/lib/utils'

interface PaymentSliderProps {
  initialValue?: number
  debtAmount: number
  interestRate: number
  onSubmit: (value: number) => void
}

const MIN = 100
const MAX = 2000
const STEP = 25
const DEFAULT = 350

export function PaymentSlider({
  initialValue = DEFAULT,
  debtAmount,
  interestRate,
  onSubmit,
}: PaymentSliderProps) {
  const [value, setValue] = React.useState(initialValue)
  const sliderRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (sliderRef.current) {
      const pct = ((value - MIN) / (MAX - MIN)) * 100
      sliderRef.current.style.setProperty('--progress', `${pct}%`)
    }
  }, [value])

  const monthlyInterest = debtAmount * (interestRate / 100 / 12)
  const principalPortion = Math.max(0, value - monthlyInterest)
  const isMinPaymentTrap = value <= monthlyInterest

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full has-sticky-button">
        {/* Step label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Step 3 of 3
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-2"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          How much are you paying per month?
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Your total monthly payment across all debts.
        </p>

        {/* Large number display */}
        <div className="animate-fade-in-up w-full text-center py-4 mb-6" style={{ animationDelay: '500ms' }}>
          <span style={{ color: '#1B2A4A' }}>
            <AnimatedCounter
              value={value}
              prefix="$"
              suffix="/mo"
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
            aria-label="Monthly payment"
          />
        </div>
        <div className="w-full flex justify-between mb-6" style={{ fontSize: '12px', color: '#999999' }}>
          <span>$100/mo</span>
          <span>$2,000/mo</span>
        </div>

        {/* Warning / info box */}
        <div
          className="animate-fade-in-up w-full mb-8"
          style={{
            animationDelay: '700ms',
            backgroundColor: '#FFFBEB',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          {isMinPaymentTrap ? (
            <div className="flex gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#92400E' }} />
              <p style={{ fontSize: '14px', color: '#92400E' }}>
                Your payment may not even cover monthly interest. This is the minimum payment trap.
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '14px', color: '#92400E' }}>
              At {formatCurrency(value)}/mo, roughly{' '}
              <span className="font-semibold">{formatCurrency(Math.round(monthlyInterest))}</span>{' '}
              goes to interest each month. Only{' '}
              <span className="font-semibold">{formatCurrency(Math.round(principalPortion))}</span>{' '}
              reduces your balance.
            </p>
          )}
        </div>

        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon onClick={() => onSubmit(value)}>
            Show My Debt-Free Date
          </Button>
        </StickyButtonContainer>
      </div>
    </div>
  )
}

export default PaymentSlider
