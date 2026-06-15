'use client'

import { SITE } from '@/lib/site'
import { scrollToId } from '@/components/smooth-scroll'
import { InstagramIcon } from '@/components/icons'

export function Footer() {
  return (
    <footer className="bg-foreground py-12 text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center md:px-8">
        <button
          onClick={() => scrollToId('inicio')}
          className="font-serif text-3xl font-semibold"
        >
          {SITE.name}
        </button>
        <p className="max-w-sm text-sm text-background/70 text-pretty">
          {SITE.tagline}. {SITE.city}.
        </p>
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-2 text-sm text-background transition-colors hover:bg-background/10"
        >
          <InstagramIcon className="h-4 w-4" />@{SITE.instagram}
        </a>
        <p className="text-xs text-background/50">
          © {new Date().getFullYear()} {SITE.fullName}. Hecho con cariño en
          Sevilla.
        </p>
      </div>
    </footer>
  )
}
