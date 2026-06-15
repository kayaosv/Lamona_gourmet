'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SITE } from '@/lib/site'
import { DURATION } from '@/lib/animation'

export function PageTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const state = sessionStorage.getItem('lamona-preloader')

    if (state === 'done') {
      // Already shown in a previous navigation this session — skip entirely
      el.style.display = 'none'
      setDone(true)
      return
    }

    // Mark as playing so Hero knows to use the longer delay
    sessionStorage.setItem('lamona-preloader', 'playing')

    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        sessionStorage.setItem('lamona-preloader', 'done')
        setDone(true)
      },
    })

    tl.to(el.querySelector('[data-curtain-logo]'), {
      autoAlpha: 0,
      y: -16,
      duration: 0.35,
      ease: 'power2.in',
    })

    tl.to(overlayRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: DURATION.large,
      ease: 'power4.inOut',
    }, '-=0.1')

    tl.set(el, { display: 'none' })
  }, [])

  if (done) return null

  return (
    <div ref={ref} className="fixed inset-0 z-[100] pointer-events-none">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
        <div data-curtain-logo className="flex flex-col items-center gap-3">
          <p className="font-serif text-6xl font-semibold tracking-tight text-foreground">
            {SITE.name}
          </p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
            Pastelería artesanal
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-px w-8 bg-gold/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-pulse" />
            <span className="h-px w-8 bg-gold/40" />
          </div>
        </div>
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-foreground"
        style={{ clipPath: 'inset(0 0 0% 0)' }}
      />
    </div>
  )
}
