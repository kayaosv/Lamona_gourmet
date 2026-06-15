'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-store'
import { PlusIcon, MinusIcon, SparkleIcon } from '@/components/icons'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem)
  const openCart = useCart((s) => s.open)
  const [qty, setQty] = useState(1)
  const [customizing, setCustomizing] = useState(false)
  const [note, setNote] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleAdd = () => {
    addItem(product, qty, customizing ? note.trim() : undefined)
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' },
      )
    }
    setQty(1)
    setNote('')
    setCustomizing(false)
    openCart()
  }

  return (
    <div
      ref={cardRef}
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.customizable && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-gold backdrop-blur">
            <SparkleIcon className="h-3 w-3" />
            Personalizable
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-serif text-2xl font-semibold text-foreground">
              {product.price}€
            </span>
            <span className="ml-1 text-xs text-muted-foreground">
              / {product.unit}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-secondary"
              aria-label="Reducir cantidad"
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-secondary"
              aria-label="Aumentar cantidad"
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {product.customizable && (
          <button
            onClick={() => setCustomizing((v) => !v)}
            className="mt-3 self-start text-xs font-medium text-gold underline-offset-2 hover:underline"
          >
            {customizing ? 'Quitar personalización' : '+ Personalizar'}
          </button>
        )}

        {customizing && (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='Ej: "Feliz cumpleaños Ana", sin gluten, color rosa...'
            rows={2}
            className="mt-2 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
          />
        )}

        <button
          ref={btnRef}
          onClick={handleAdd}
          className="mt-4 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-gold hover:text-primary-foreground"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}
