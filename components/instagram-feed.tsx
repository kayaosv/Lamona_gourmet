'use client'

import { useRef } from 'react'
import { SITE } from '@/lib/site'
import { InstagramIcon } from '@/components/icons'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

const feed = [
  '/images/ig-tarta-corazon.png',
  '/images/ig-pavlova.png',
  '/images/ig-redvelvet.png',
  '/images/ig-eclairs.png',
  '/images/ig-brownies.png',
  '/images/ig-croissants.png',
  '/images/ig-pan.png',
  '/images/footer_lamona.png',
]

export function InstagramFeed() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto mb-8 flex max-w-7xl flex-col items-center gap-2 px-4 text-center md:px-8">
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-serif text-2xl font-semibold text-foreground transition-colors hover:text-gold"
        >
          <InstagramIcon className="h-6 w-6 text-gold" />@{SITE.instagram}
        </a>
        <p className="text-sm text-muted-foreground">
          Síguenos para no perderte ninguna novedad
        </p>
      </div>

      {/* Mobile + tablet: scrollable strip with arrows */}
      <div className="relative md:hidden">
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2"
        >
          {feed.map((src, i) => (
            <a
              key={i}
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-44 w-44 flex-shrink-0 overflow-hidden rounded-xl sm:h-56 sm:w-56"
            >
              <img
                src={src || '/placeholder.svg'}
                alt={`Publicación de Instagram de ${SITE.fullName}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-background opacity-0 transition-all duration-300 group-hover:bg-foreground/30 group-hover:opacity-100">
                <InstagramIcon className="h-7 w-7" />
              </span>
            </a>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:border-gold"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:border-gold"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop: grid filling full width */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-4 md:px-8 lg:grid-cols-8 mx-auto max-w-7xl">
        {feed.map((src, i) => (
          <a
            key={i}
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={src || '/placeholder.svg'}
              alt={`Publicación de Instagram de ${SITE.fullName}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-background opacity-0 transition-all duration-300 group-hover:bg-foreground/30 group-hover:opacity-100">
              <InstagramIcon className="h-7 w-7" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
