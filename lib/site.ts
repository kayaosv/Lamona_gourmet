export const WHATSAPP_NUMBER = '34603639059'

export const SITE = {
  name: 'Lamona',
  fullName: 'Lamona Pastelería',
  tagline: 'Pastelería para acompañar tus momentos',
  city: 'Sevilla, España',
  instagram: 'lamonna__',
  instagramUrl: 'https://www.instagram.com/lamonna__/',
  linktree: 'lamonatortas',
  whatsappNumber: WHATSAPP_NUMBER,
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
