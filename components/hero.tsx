'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { SITE } from '@/lib/site'
import { scrollToId } from '@/components/smooth-scroll'
import { SparkleIcon, MapPinIcon, StarIcon } from '@/components/icons'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const imageWrap = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 'playing' = preloader showing this load → wait for it; 'done'/'null' → animate quickly
      const delay = sessionStorage.getItem('lamona-preloader') === 'playing' ? 0.85 : 0.15
      const tl = gsap.timeline({ delay })

      if (imageWrap.current) {
        tl.fromTo(
          imageWrap.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
          },
        )
      }

      const words = titleRef.current?.querySelectorAll('.word span')
      if (words && words.length) {
        tl.fromTo(
          words,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.08,
          },
          '-=0.9',
        )
      }

      tl.fromTo(
        '[data-hero-fade]',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
        '-=0.5',
      )
    }, root)

    return () => ctx.revert()
  }, [])

  const titleWords = ['Dulces', 'que', 'cuentan', 'historias']

  return (
    <section
      ref={root}
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 md:grid-cols-2 md:gap-10 md:px-8">
        {/* Text */}
        <div className="order-2 md:order-1">
          <div
            data-hero-fade
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-gold"
          >
            <SparkleIcon className="h-3.5 w-3.5" />
            Pastelería artesanal · {SITE.city.split(',')[0]}
          </div>

          <h1
            ref={titleRef}
            className="font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl"
          >
            {titleWords.map((w, i) => (
              <span
                key={i}
                className="word mr-[0.25em] inline-block overflow-hidden align-bottom"
              >
                <span className={`inline-block ${i === 3 ? 'text-gold italic' : ''}`}>
                  {w}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            {SITE.tagline}. Tartas, cupcakes y galletas hechas a mano en{' '}
            {SITE.city}, para celebrar cada momento especial.
          </p>

          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/catalogo"
              className="rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-105"
            >
              Ver el catálogo
            </Link>
            <button
              onClick={() => scrollToId('categorias')}
              className="rounded-full border border-gold px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Explorar categorías
            </button>
          </div>

          <div
            data-hero-fade
            className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </span>
              5,0 en Google
            </span>
            <span className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4 text-gold" />
              {SITE.city}
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2">
          <div
            ref={imageWrap}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] shadow-xl md:aspect-[4/5]"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <img
              src="/images/ig-tarta-corazon.png"
              alt="Tarta corazón artesanal decorada de Lamona Pastelería"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
