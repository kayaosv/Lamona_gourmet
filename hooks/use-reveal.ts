'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { stagger?: number; y?: number; selector?: string } = {},
) {
  const ref = useRef<T>(null)
  const { stagger = 0.1, y = 40, selector = '[data-reveal]' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.registerPlugin(ScrollTrigger)
    const targets = el.querySelectorAll(selector)
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      const rect = el.getBoundingClientRect()
      // If the section is already in or above the viewport, animate immediately
      const alreadyVisible = rect.top < window.innerHeight * 0.9

      if (alreadyVisible) {
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger,
            delay: 0.05,
          },
        )
      } else {
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          },
        )
      }
    }, el)

    return () => ctx.revert()
  }, [stagger, y, selector])

  return ref
}
