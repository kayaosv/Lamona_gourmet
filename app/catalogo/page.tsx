'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { products, categories, type CategoryId } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { CartDrawer } from '@/components/cart-drawer'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SparkleIcon } from '@/components/icons'

type Filter = CategoryId | 'todos'

function CatalogContent() {
  const searchParams = useSearchParams()
  const categoria = searchParams.get('categoria') as Filter | null
  const [filter, setFilter] = useState<Filter>(categoria && categories.some((c) => c.id === categoria) ? categoria : 'todos')

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
    <main className="min-h-svh pt-24">
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold">
              <SparkleIcon className="h-3.5 w-3.5" />
              Catálogo
            </span>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Todos nuestros dulces
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Explora nuestra selección de tartas, galletas, cupcakes y dulces
              artesanales. Añade al carrito y pide por WhatsApp cuando estés
              listo.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
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
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {visible.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-lg font-medium text-foreground">
                No hay productos en esta categoría
              </p>
              <button
                onClick={() => setFilter('todos')}
                className="rounded-full border border-gold px-6 py-2.5 text-sm font-medium text-foreground hover:bg-gold hover:text-primary-foreground"
              >
                Ver todos
              </button>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function CatalogoPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Suspense fallback={
        <main className="flex min-h-svh items-center justify-center pt-24">
          <p className="text-muted-foreground">Cargando catálogo...</p>
        </main>
      }>
        <CatalogContent />
      </Suspense>
      <Footer />
    </>
  )
}
