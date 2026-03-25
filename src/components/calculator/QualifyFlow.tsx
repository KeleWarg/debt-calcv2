'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const BLUE = '#0066CC'
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

// ── Shared option button matching FA style ──

interface OptionProps {
  label: string
  sub?: string
  letter: string
  selected: boolean
  delay: number
  onClick: () => void
}

function FaOption({ label, sub, letter, selected, delay, onClick }: OptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'animate-fade-in-up flex items-center gap-3 w-full bg-white border rounded-lg text-left',
        'cursor-pointer transition-all duration-200',
        selected
          ? 'border-[#0066CC] bg-[#F0F7FF] shadow-sm'
          : 'border-[#E8E8E8] hover:bg-[#F0F7FF]'
      )}
      style={{ animationDelay: `${delay}ms`, height: '56px', paddingLeft: '16px', paddingRight: '16px' }}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full flex-shrink-0 text-sm font-semibold transition-colors duration-200',
          selected
            ? 'bg-[#0066CC] text-white'
            : 'bg-[#F2F2F2] text-neutral-500'
        )}
        style={{ width: '28px', height: '28px' }}
      >
        {letter}
      </div>
      <div>
        <span style={{ fontSize: '16px', color: '#1B2A4A', display: 'block' }}>{label}</span>
        {sub && <span style={{ fontSize: '12px', color: '#999999', display: 'block', marginTop: '1px' }}>{sub}</span>}
      </div>
    </button>
  )
}

// ── Debt Type Screen ──

interface DebtTypeScreenProps {
  onSelect: (value: string) => void
}

const DEBT_OPTIONS = [
  { id: 'credit-card', label: 'Credit card debt', sub: 'Most common — highest approval rates' },
  { id: 'medical', label: 'Medical bills', sub: 'Often eligible for hardship programs' },
  { id: 'personal', label: 'Personal loans', sub: 'Unsecured loans may qualify' },
  { id: 'mixed', label: 'A mix of several types', sub: 'We\'ll sort it out in the next step' },
]

export function CalcDebtType({ onSelect }: DebtTypeScreenProps) {
  const [selected, setSelected] = React.useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelected(id)
    setTimeout(() => onSelect(id), 400)
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Eligibility check
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-2"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          What makes up <span style={{ color: BLUE }}>most of your debt?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Different debt types qualify for different programs.
        </p>

        <div className="w-full flex flex-col" style={{ gap: '12px' }}>
          {DEBT_OPTIONS.map((opt, i) => (
            <FaOption
              key={opt.id}
              label={opt.label}
              sub={opt.sub}
              letter={LETTERS[i]}
              selected={selected === opt.id}
              delay={500 + i * 100}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Hardship Screen ──

interface HardshipScreenProps {
  onSelect: (value: string) => void
}

const HARDSHIP_OPTIONS = [
  { id: 'yes', label: 'Yes — I\'m falling behind on payments' },
  { id: 'somewhat', label: 'Somewhat — I\'m current but it\'s tight' },
  { id: 'soon', label: 'Not yet — but I can see it coming' },
]

export function CalcHardship({ onSelect }: HardshipScreenProps) {
  const [selected, setSelected] = React.useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelected(id)
    setTimeout(() => onSelect(id), 400)
  }

  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Eligibility check
        </p>

        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-2"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          Are you experiencing <span style={{ color: BLUE }}>financial hardship?</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          This isn&apos;t a judgment — hardship status increases eligibility.
        </p>

        <div className="w-full flex flex-col" style={{ gap: '12px' }}>
          {HARDSHIP_OPTIONS.map((opt, i) => (
            <FaOption
              key={opt.id}
              label={opt.label}
              letter={LETTERS[i]}
              selected={selected === opt.id}
              delay={500 + i * 100}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
