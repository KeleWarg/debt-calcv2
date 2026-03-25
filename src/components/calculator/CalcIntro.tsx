'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { LottieIcon } from '@/components/ui/LottieIcon'
import relaxAnimation from '../../../public/Relax.json'

interface CalcIntroProps {
  onStart: () => void
}

export function CalcIntro({ onStart }: CalcIntroProps) {
  return (
    <div className="w-full max-w-[555px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-4 sm:pb-8">
      <div className="flex flex-col items-center w-full text-center">
        {/* Lottie animation */}
        <div className="animate-fade-in-up mb-4" style={{ width: '160px', height: '160px', animationDelay: '200ms' }}>
          <LottieIcon animationData={relaxAnimation} className="w-full h-full" />
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-3"
          style={{ animationDelay: '300ms', color: '#1B2A4A' }}
        >
          What year will you
          <br />
          be debt-free?
        </h1>

        {/* Subtext */}
        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '400ms', fontSize: '15px', color: '#666666' }}
        >
          Most people have never calculated it.
          <br />
          The answer is usually worse than they think.
        </p>

        {/* Example box */}
        <div
          className="animate-fade-in-up w-full text-left mb-8"
          style={{
            animationDelay: '500ms',
            backgroundColor: '#F5F5F7',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div className="flex items-start gap-3">
            <Image
              src="/clock-icon.png"
              alt="Clock"
              width={64}
              height={64}
              unoptimized
              className="flex-shrink-0 animate-float"
            />
            <p style={{ fontSize: '14px', color: '#1B2A4A', lineHeight: '1.6' }}>
              The average American with $15,000 in credit card debt could be debt-free by{' '}
              <span className="font-bold" style={{ color: '#0C7663' }}>2028</span> with the right
              program instead of{' '}
              <span className="font-bold" style={{ color: '#EB4015' }}>2049</span> on minimum payments.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up w-full" style={{ animationDelay: '600ms' }}>
          <Button fullWidth showTrailingIcon onClick={onStart}>
            Calculate My Date
          </Button>
        </div>

        {/* Trust stats */}
        <div className="animate-fade-in-up w-full mt-6" style={{ animationDelay: '700ms' }}>
          <div className="flex items-center justify-center gap-2">
            <Image src="/icon-shield.png" alt="Shield" width={28} height={28} unoptimized />
            <p className="text-sm text-neutral-500">See your timeline for free. Takes 10 seconds</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalcIntro
