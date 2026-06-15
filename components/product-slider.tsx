'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { products } from '@/lib/products'
import { useCart } from '@/lib/cart-store'
import { SectionHeading } from '@/components/section-heading'
import { PlusIcon, SparkleIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

const featured = products.filter((p) =>
  ['red-velvet', 'chocolate', 'cupcakes-vainilla', 'galletas-deco', 'cheesecake'].includes(p.id),
)

export function ProductSlider() {
  const addItem = useCart((s) => s.addItem)
  const openCart = useCart((s) => s.open)
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement[]>([])
  const imagesRef = useRef<HTMLDivElement[]>([])
  const textsRef = useRef<HTMLDivElement[]>([])
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHovering = useRef(false)

  const goTo = (i: number) => {
    if (!trackRef.current) return
    const next = (i + featured.length) % featured.length
    setActive(next)

    const slides = slidesRef.current
    if (!slides[next]) return

    gsap.to(trackRef.current, {
      x: () => -slides[next].offsetLeft,
      duration: 0.8,
      ease: 'power4.inOut',
    })

    imagesRef.current.forEach((img, idx) => {
      const offset = idx - next
      gsap.to(img, {
        x: offset * 80,
        duration: 0.8,
        ease: 'power4.inOut',
      })
    })

    textsRef.current.forEach((txt, idx) => {
      const offset = idx - next
      gsap.to(txt, {
        x: -offset * 30,
        opacity: idx === next ? 1 : 0.4,
        duration: 0.7,
        ease: 'power3.out',
      })
    })
  }

  const goNext = () => goTo(active + 1)
  const goPrev = () => goTo(active - 1)

  const addToCart = (product: (typeof featured)[number]) => {
    addItem(product, 1)
    openCart()
  }

  useEffect(() => {
    const startAuto = () => {
      autoRef.current = setInterval(() => {
        if (!isHovering.current) goNext()
      }, 4000)
    }
    startAuto()
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Destacados"
          title="Nuestros más vendidos"
          description="Los favoritos de nuestros clientes. Pide el tuyo con un solo clic."
        />
      </div>

      <div
        className="relative mt-12"
        onMouseEnter={() => { isHovering.current = true }}
        onMouseLeave={() => { isHovering.current = false }}
      >
        <div className="mx-auto max-w-7xl overflow-hidden px-4 md:px-8">
          <div ref={trackRef} className="flex">
            {featured.map((product, i) => (
              <div
                key={product.id}
                ref={(el) => { if (el) slidesRef.current[i] = el }}
                className="flex w-full flex-shrink-0 flex-col gap-8 md:flex-row md:items-center"
              >
                <div
                  ref={(el) => { if (el) imagesRef.current[i] = el }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] md:w-1/2"
                >
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  {product.customizable && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-gold backdrop-blur">
                      <SparkleIcon className="h-3.5 w-3.5" />
                      Personalizable
                    </span>
                  )}
                </div>

                <div
                  ref={(el) => { if (el) textsRef.current[i] = el }}
                  className="md:w-1/2 md:pl-8"
                >
                  <span className="text-xs uppercase tracking-[0.22em] text-gold">
                    {product.category === 'tartas'
                      ? 'Tarta artesanal'
                      : product.category === 'galletas'
                        ? 'Galletas artesanales'
                        : product.category === 'cupcakes'
                          ? 'Cupcakes'
                          : 'Dulces artesanales'}
                  </span>
                  <h3 className="mt-2 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="font-serif text-3xl font-semibold text-foreground">
                      {product.price}€
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {product.unit}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-all hover:bg-gold hover:text-primary-foreground hover:scale-[1.02]"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 p-3 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card md:flex"
          aria-label="Anterior"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 p-3 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card md:flex"
          aria-label="Siguiente"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <div className="mt-8 flex justify-center gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al producto ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-8 bg-gold' : 'w-2 bg-border hover:bg-gold/50'
              }`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 rounded-full border border-gold px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Ver catálogo completo →
          </Link>
        </div>
      </div>
    </section>
  )
}
