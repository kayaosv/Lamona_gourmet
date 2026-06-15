'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  useCart,
  selectTotalItems,
  selectTotalPrice,
  type DeliveryType,
} from '@/lib/cart-store'
import { buildWhatsAppUrl, SITE } from '@/lib/site'
import {
  CloseIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  WhatsAppIcon,
  CartIcon,
} from '@/components/icons'

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen)
  const close = useCart((s) => s.close)
  const items = useCart((s) => s.items)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const clearCart = useCart((s) => s.clearCart)
  const totalItems = useCart(selectTotalItems)
  const totalPrice = useCart(selectTotalPrice)
  const date = useCart((s) => s.date)
  const setDate = useCart((s) => s.setDate)
  const delivery = useCart((s) => s.delivery)
  const setDelivery = useCart((s) => s.setDelivery)

  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => setMounted(true), [])

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      setVisible(true)
    } else if (visible) {
      // play close animation then unmount
      const tl = gsap.timeline({ onComplete: () => setVisible(false) })
      if (panelRef.current)
        tl.to(panelRef.current, {
          xPercent: 100,
          duration: 0.3,
          ease: 'power3.in',
        })
      if (overlayRef.current)
        tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.25 }, '<')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (visible && isOpen) {
      const tl = gsap.timeline()
      if (overlayRef.current)
        tl.fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25 },
        )
      if (panelRef.current)
        tl.fromTo(
          panelRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.3, ease: 'power3.out' },
          '<',
        )
    }
  }, [visible, isOpen])

  // lock body scroll
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!mounted || !visible) return null

  const buildMessage = () => {
    const lines: string[] = []
    lines.push('🛒 *Pedido Lamona Pastelería*')
    lines.push('')
    items.forEach((i) => {
      lines.push(`• ${i.name} (x${i.quantity}) — ${i.price * i.quantity}€`)
      if (i.note) lines.push(`   ✏️ ${i.note}`)
    })
    lines.push('')
    lines.push(`📦 *Total: ${totalPrice}€*`)
    if (date) lines.push(`📅 Fecha deseada: ${formatDate(date)}`)
    lines.push(
      `📍 Entrega: ${delivery === 'recogida' ? 'Recogida en tienda' : 'Envío a domicilio'}`,
    )
    lines.push('')
    lines.push('¡Gracias! Espero vuestra respuesta 🤍')
    return lines.join('\n')
  }

  const checkout = () => {
    if (items.length === 0) return
    window.open(buildWhatsAppUrl(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Carrito">
      <div
        ref={overlayRef}
        onClick={close}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Tu pedido
            </h2>
            <p className="text-xs text-muted-foreground">
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
            </p>
          </div>
          <button
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
            aria-label="Cerrar carrito"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-gold">
              <CartIcon className="h-7 w-7" />
            </div>
            <p className="text-muted-foreground">
              Tu carrito está vacío. Añade algún dulce para empezar.
            </p>
            <button
              onClick={close}
              className="rounded-full border border-gold px-6 py-2.5 text-sm font-medium text-foreground hover:bg-gold hover:text-primary-foreground"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li
                    key={item.id + (item.note ?? '')}
                    className="flex gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium leading-tight text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.price}€ / {item.unit}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>

                      {item.note && (
                        <p className="mt-1 line-clamp-2 rounded-md bg-secondary px-2 py-1 text-xs italic text-muted-foreground">
                          {item.note}
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-secondary"
                            aria-label="Quitar uno"
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-secondary"
                            aria-label="Añadir uno"
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-semibold text-foreground">
                          {item.price * item.quantity}€
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={clearCart}
                className="mt-4 text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Footer / checkout */}
            <div className="border-t border-border px-5 py-4">
              <div className="mb-3 grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                  Fecha deseada
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                  Entrega
                  <select
                    value={delivery}
                    onChange={(e) =>
                      setDelivery(e.target.value as DeliveryType)
                    }
                    className="rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
                  >
                    <option value="recogida">Recogida en tienda</option>
                    <option value="envio">Envío a domicilio</option>
                  </select>
                </label>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-serif text-2xl font-semibold text-foreground">
                  {totalPrice}€
                </span>
              </div>

              <button
                onClick={checkout}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar pedido por WhatsApp
              </button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Te responderemos para confirmar disponibilidad y pago. Sin
                compromiso.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function formatDate(value: string) {
  try {
    const d = new Date(value + 'T00:00:00')
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return value
  }
}
