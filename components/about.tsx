'use client'

import { useReveal } from '@/hooks/use-reveal'
import { SITE } from '@/lib/site'

const values = [
  { title: 'Hecho a mano', text: 'Cada pieza se elabora artesanalmente, sin prisas.' },
  { title: 'Ingredientes de verdad', text: 'Materia prima de calidad y de proximidad.' },
  { title: 'A tu medida', text: 'Personalizamos sabores, colores y mensajes.' },
]

export function About() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12 })

  return (
    <section id="nosotras" className="bg-background py-20 md:py-28">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8"
      >
        <div data-reveal className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-xl">
            <img
              src="/images/ig-croissants.png"
              alt="Un día en nuestra cocina — obrador de Lamona Pastelería"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-border bg-card px-6 py-4 shadow-lg sm:block">
            <p className="font-serif text-3xl font-semibold text-gold">+5 años</p>
            <p className="text-xs text-muted-foreground">endulzando Sevilla</p>
          </div>
        </div>

        <div>
          <span data-reveal className="text-xs uppercase tracking-[0.22em] text-gold">
            Sobre nosotras
          </span>
          <h2
            data-reveal
            className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance sm:text-5xl"
          >
            Pastelería para acompañar tus momentos
          </h2>
          <p
            data-reveal
            className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty"
          >
            {SITE.fullName} nació en {SITE.city} de las ganas de convertir lo
            cotidiano en algo especial. Horneamos cada tarta, cupcake y galleta
            con mimo, cuidando el sabor tanto como el detalle, para que tus
            celebraciones tengan siempre un final dulce.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                data-reveal
                className="rounded-xl border border-border bg-card p-4"
              >
                <h3 className="font-medium text-foreground">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
