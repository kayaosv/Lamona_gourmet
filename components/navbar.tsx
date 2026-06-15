'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useCart, selectTotalItems } from '@/lib/cart-store'
import { buildWhatsAppUrl, SITE } from '@/lib/site'
import { scrollToId } from '@/components/smooth-scroll'
import { CartIcon, WhatsAppIcon, MenuIcon, CloseIcon } from '@/components/icons'

const links = [
  { id: 'categorias', label: 'Categorías' },
  { path: '/catalogo', label: 'Catálogo' },
  { id: 'nosotras', label: 'Nosotras' },
  { id: 'galeria', label: 'Galería' },
  { id: 'contacto', label: 'Contacto' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const totalItems = useCart(selectTotalItems)
  const openCart = useCart((s) => s.open)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  // GSAP entrance animation when menu opens
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power3.out' })
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 text-left"
          aria-label="Ir al inicio"
        >
          <img
            src="/images/logo-lamona.jpg"
            alt="Logo Lamona"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-gold/30"
          />
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              {SITE.name}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.25em] text-gold sm:inline">
              Pastelería
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) =>
            'path' in l ? (
              <Link
                key={l.path}
                href={l.path}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </button>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppUrl('Hola Lamona, me gustaría hacer un pedido.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir
          </a>

          <button
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold"
            aria-label="Abrir carrito"
          >
            <CartIcon className="h-5 w-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-xs font-semibold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden"
            aria-label="Menú"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
        style={{ display: menuOpen ? 'block' : 'none' }}
      >
        <div className="flex flex-col px-4 py-2">
          {links.map((l) =>
            'path' in l ? (
              <Link
                key={l.path}
                href={l.path}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-left text-base text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="block w-full py-3 text-left text-base text-foreground"
              >
                {l.label}
              </button>
            ),
          )}
        </div>
      </div>
    </header>
  )
}
