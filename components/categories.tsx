'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { categories, type CategoryId } from '@/lib/products'
import { useReveal } from '@/hooks/use-reveal'
import { SectionHeading } from '@/components/section-heading'

function CategoryCard({
  name,
  description,
  image,
  onSelect,
}: {
  name: string
  description: string
  image: string
  onSelect: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  return (
    <button
      ref={ref}
      data-reveal
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onSelect}
      className="group relative h-72 overflow-hidden rounded-2xl text-left shadow-sm transition-shadow duration-300 hover:shadow-xl sm:h-80"
      style={{ transition: 'transform 0.25s ease-out, box-shadow 0.3s ease' }}
    >
      <img
        src={image || '/placeholder.svg'}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-background">
        <p className="text-xs uppercase tracking-[0.18em] text-background/70">
          {description}
        </p>
        <h3 className="mt-1 font-serif text-2xl font-semibold">{name}</h3>
        <span className="mt-3 inline-block text-sm font-medium text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Ver productos →
        </span>
      </div>
    </button>
  )
}

export function Categories() {
  const router = useRouter()
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12 })

  const goToCategory = (id: CategoryId) => {
    router.push(`/catalogo?categoria=${id}`)
  }

  return (
    <section id="categorias" className="bg-background py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Nuestras especialidades"
          title="Algo dulce para cada ocasión"
          description="Elige una categoría y descubre todo lo que horneamos a mano cada día."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              name={c.name}
              description={c.description}
              image={c.image}
              onSelect={() => goToCategory(c.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
