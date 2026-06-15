'use client'

import { useMemo, useState } from 'react'
import { products, categories, type CategoryId } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'

type Filter = CategoryId | 'todos'

export function Products() {
  const [filter, setFilter] = useState<Filter>('todos')
  const visible = useMemo(
    () =>
      filter === 'todos'
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  )

  const tabs: { id: Filter; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.name })),
  ]

  return (
    <section id="productos" className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Catálogo"
          title="Elige tus favoritos"
          description="Añade al carrito y, cuando termines, envíanos el pedido por WhatsApp."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                filter === t.id
                  ? 'bg-foreground text-background'
                  : 'border border-border bg-card text-muted-foreground hover:border-gold hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
