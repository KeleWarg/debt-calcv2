'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui'
import { formatCurrency, formatPhoneNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

const BLUE = '#0066CC'

const piiSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(14, 'Please enter a valid phone number'),
})

type PIIFormValues = z.infer<typeof piiSchema>

interface CalcPIIProps {
  debtAmount: number
  potentialSavings: number
  onSubmit: (data: PIIFormValues) => void
}

export function CalcPII({ debtAmount, potentialSavings, onSubmit }: CalcPIIProps) {
  const [loading, setLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PIIFormValues>({
    resolver: zodResolver(piiSchema),
  })

  const onFormSubmit = async (data: PIIFormValues) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    onSubmit(data)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phone', formatted, { shouldValidate: true })
  }

  const confidenceItems = [
    `${formatCurrency(debtAmount)} in debt · Potential savings: ${formatCurrency(potentialSavings)}`,
    'Based on your answers, you\'re likely eligible',
    'Average first call is within 48 hours',
  ]

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        {/* Section label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Almost done
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          Where should we send <span style={{ color: BLUE }}>your free report?</span>
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Get your personalized debt-free timeline with program recommendations.
        </p>

        {/* Confidence items */}
        <div className="animate-fade-in-up mb-6" style={{ animationDelay: '500ms' }}>
          {confidenceItems.map((text) => (
            <div key={text} className="flex items-center gap-2" style={{ height: '32px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <circle cx="8" cy="8" r="8" fill="#0B6E4F" />
                <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '14px', color: '#1B2A4A' }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
          {(['firstName', 'lastName', 'email', 'phone'] as const).map((field, i) => {
            const labels: Record<string, string> = {
              firstName: 'First name',
              lastName: 'Last name',
              email: 'Email',
              phone: 'Phone',
            }
            const types: Record<string, string> = {
              firstName: 'text',
              lastName: 'text',
              email: 'email',
              phone: 'tel',
            }
            const placeholders: Record<string, string> = {
              firstName: 'First name',
              lastName: 'Last name',
              email: 'you@example.com',
              phone: '(555) 123-4567',
            }
            const error = errors[field]?.message
            const isPhone = field === 'phone'

            return (
              <div key={field} className="animate-fade-in-up mb-4" style={{ animationDelay: `${600 + i * 80}ms` }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#1B2A4A', display: 'block', marginBottom: '6px' }}>
                  {labels[field]}
                </label>
                <input
                  type={types[field]}
                  placeholder={placeholders[field]}
                  className={cn(
                    'w-full bg-white outline-none transition-colors duration-150 border',
                    error ? 'border-[#EB4015] focus:border-[#EB4015]' : 'border-[#E0E0E0] focus:border-[#0066CC]'
                  )}
                  style={{ height: '48px', borderRadius: '8px', padding: '0 16px', fontSize: '16px', color: '#1B2A4A' }}
                  {...register(field, isPhone ? { onChange: handlePhoneChange } : undefined)}
                />
                {error && <p className="mt-1" style={{ fontSize: '13px', color: '#EB4015' }}>{error}</p>}
              </div>
            )
          })}

          <div className="animate-fade-in-up mt-6" style={{ animationDelay: '900ms' }}>
            <Button type="submit" fullWidth showTrailingIcon loading={loading}>
              Get My Free Report
            </Button>
          </div>
        </form>

        {/* Security badge */}
        <div className="animate-fade-in-up flex items-center justify-center gap-1.5 mt-4 w-full" style={{ animationDelay: '900ms' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="6" width="8" height="6" rx="1" stroke="#999999" strokeWidth="1.2" />
            <path d="M5 6V4a2 2 0 1 1 4 0v2" stroke="#999999" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '12px', color: '#999999' }}>
            256-Bit Encrypted &nbsp;&bull;&nbsp; Never Sold or Shared
          </span>
        </div>

        <p className="animate-fade-in-up w-full text-center mt-4" style={{ animationDelay: '900ms', fontSize: '11px', color: '#999999', lineHeight: '1.4' }}>
          By continuing, you agree to be connected with a debt relief specialist. No obligation.
          Free consultation. You can opt out at any time.
        </p>
      </div>
    </div>
  )
}

export default CalcPII
