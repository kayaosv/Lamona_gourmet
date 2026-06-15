'use client'

import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { SectionHeading } from '@/components/section-heading'
import { CloseIcon } from '@/components/icons'

const images = [
  { src: '/images/ig-tarta-corazon.png', alt: 'Tarta corazón rosa decorada a mano' },
  { src: '/images/ig-pavlova.png', alt: 'Pavlova con frutos rojos frescos' },
  { src: '/images/ig-redvelvet.png', alt: 'Porciones de red velvet con crema' },
  { src: '/images/ig-eclairs.png', alt: 'Éclairs glaseados con crumble' },
  { src: '/images/ig-brownies.png', alt: 'Porciones de pastel de chocolate' },
  { src: '/images/footer_lamona.png', alt: 'Galletas artesanales en tarros de cristal' },
]

export function Gallery() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.08 })
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="galeria" className="bg-secondary/40 py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Galería"
          title="Creaciones que enamoran"
          description="Una muestra de lo que hemos horneado para clientes como tú."
        />

        <div className="mt-12 columns-1 gap-4 [column-fill:_balance] sm:columns-2 md:columns-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              data-reveal
              onClick={() => setActive(i)}
              className={`mb-4 block w-full overflow-hidden rounded-2xl shadow-sm ${
                i % 3 === 0 ? 'aspect-[3/4]' : i % 2 === 0 ? 'aspect-square' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={img.src || '/placeholder.svg'}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground"
            aria-label="Cerrar"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <img
            src={images[active].src || '/placeholder.svg'}
            alt={images[active].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
