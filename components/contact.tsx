'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { buildWhatsAppUrl, SITE } from '@/lib/site'
import {
  WhatsAppIcon,
  InstagramIcon,
  MapPinIcon,
} from '@/components/icons'

export function Contact() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 })
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hola ${SITE.name}, soy ${name || 'un cliente'}.\n\n${message || 'Me gustaría más información.'}`
    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contacto" className="bg-secondary/40 py-20 md:py-28">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8"
      >
        <div data-reveal>
          <span className="text-xs uppercase tracking-[0.22em] text-gold">
            Contacto
          </span>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            Hagamos tu próximo dulce
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Cuéntanos qué necesitas y te responderemos por WhatsApp con
            disponibilidad y presupuesto. Para encargos especiales, escríbenos
            con unos días de antelación.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={buildWhatsAppUrl('Hola Lamona, me gustaría hacer un pedido.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-whatsapp"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-whatsapp text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-medium text-foreground">
                  WhatsApp directo
                </span>
                <span className="text-sm text-muted-foreground">
                  Pide y resuelve dudas al instante
                </span>
              </span>
            </a>

            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-gold"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-foreground">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-medium text-foreground">
                  @{SITE.instagram}
                </span>
                <span className="text-sm text-muted-foreground">
                  Mira nuestras últimas creaciones
                </span>
              </span>
            </a>

            <a
              href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd126fceb0520901:0xc51356cf1082e4b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-gold"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-primary-foreground">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-medium text-foreground">
                  {SITE.city}
                </span>
                <span className="text-sm text-muted-foreground">
                  Recogida en tienda · Ver en Google Maps →
                </span>
              </span>
            </a>
          </div>
        </div>

        <div data-reveal className="flex flex-col gap-4">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Escríbenos
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
                Nombre
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
                Mensaje
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Cuéntanos qué te gustaría pedir..."
                  className="resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
                />
              </label>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar por WhatsApp
              </button>
            </div>
          </form>

          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Ubicación de Lamona Pastelería"
              src="https://maps.google.com/maps?cid=887549343585283659&output=embed&hl=es&z=16"
              className="h-56 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd126fceb0520901:0xc51356cf1082e4b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
          >
            <MapPinIcon className="h-4 w-4 text-gold" />
            Abrir en Google Maps →
          </a>
        </div>
      </div>
    </section>
  )
}
