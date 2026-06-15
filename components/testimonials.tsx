'use client'

import { useEffect, useState } from 'react'
import { StarIcon } from '@/components/icons'

const testimonials = [
  {
    name: 'María G.',
    text: 'La tarta de Red Velvet fue el centro de la fiesta. Sabor espectacular y un acabado precioso. ¡Repetiremos seguro!',
  },
  {
    name: 'Carlos R.',
    text: 'Pedí galletas personalizadas para un bautizo y superaron mis expectativas. Atención por WhatsApp rapidísima.',
  },
  {
    name: 'Lucía M.',
    text: 'Los cupcakes estaban esponjosos y nada empalagosos. Se nota que está todo hecho a mano con cariño.',
  },
  {
    name: 'Ana P.',
    text: 'Encargué una tarta de cumpleaños con un mensaje especial y quedó perfecta. Detallistas y muy profesionales.',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5000,
    )
    return () => clearInterval(id)
  }, [])

  const current = testimonials[index]

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <span className="text-xs uppercase tracking-[0.22em] text-gold">
          Testimonios
        </span>
        <div className="mt-3 flex justify-center text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-5 w-5" />
          ))}
        </div>

        <blockquote
          key={index}
          className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <p className="font-serif text-2xl font-medium leading-snug text-foreground text-balance sm:text-3xl">
            “{current.text}”
          </p>
          <footer className="mt-5 text-sm font-medium text-muted-foreground">
            — {current.name}
          </footer>
        </blockquote>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ver testimonio ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-gold' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
