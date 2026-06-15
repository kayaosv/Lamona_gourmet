import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lamona Pastelería | Tartas y dulces artesanales en Sevilla',
  description:
    'Pastelería artesanal en Sevilla. Tartas, cupcakes, galletas decoradas y dulces hechos a mano. Haz tu pedido fácilmente por WhatsApp.',
  generator: 'v0.app',
  keywords: [
    'pastelería Sevilla',
    'tartas personalizadas',
    'cupcakes',
    'galletas decoradas',
    'Lamona',
    'repostería artesanal',
  ],
  openGraph: {
    title: 'Lamona Pastelería',
    description: 'Pastelería para acompañar tus momentos. Sevilla, España.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf5f0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
