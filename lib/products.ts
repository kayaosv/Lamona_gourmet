export type CategoryId = 'tartas' | 'galletas' | 'cupcakes' | 'dulces'

export interface Category {
  id: CategoryId
  name: string
  description: string
  image: string
}

export interface Product {
  id: string
  name: string
  category: CategoryId
  description: string
  price: number
  unit: string
  image: string
  customizable: boolean
}

export const categories: Category[] = [
  {
    id: 'tartas',
    name: 'Tartas',
    description: 'Para celebrar a lo grande',
    image: '/images/cat-tartas.png',
  },
  {
    id: 'galletas',
    name: 'Galletas',
    description: 'Decoradas a mano',
    image: '/images/cat-galletas.png',
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    description: 'El detalle perfecto',
    image: '/images/cat-cupcakes.png',
  },
  {
    id: 'dulces',
    name: 'Dulces',
    description: 'Pequeños caprichos',
    image: '/images/cat-dulces.png',
  },
]

export const products: Product[] = [
  {
    id: 'red-velvet',
    name: 'Tarta Red Velvet',
    category: 'tartas',
    description: 'Bizcocho aterciopelado con frosting de queso crema. 8-10 raciones.',
    price: 24,
    unit: 'tarta',
    image: '/images/prod-red-velvet.png',
    customizable: true,
  },
  {
    id: 'chocolate',
    name: 'Tarta de Chocolate',
    category: 'tartas',
    description: 'Capas de bizcocho de cacao y ganache intenso. 8-10 raciones.',
    price: 26,
    unit: 'tarta',
    image: '/images/prod-chocolate.png',
    customizable: true,
  },
  {
    id: 'cheesecake',
    name: 'Tarta de Queso',
    category: 'tartas',
    description: 'Cremosa al horno con coulis de frutos rojos. 8-10 raciones.',
    price: 22,
    unit: 'tarta',
    image: '/images/prod-cheesecake.png',
    customizable: true,
  },
  {
    id: 'galletas-deco',
    name: 'Galletas Decoradas',
    category: 'galletas',
    description: 'Galletas de mantequilla decoradas con glasa real. Docena.',
    price: 18,
    unit: 'docena',
    image: '/images/prod-galletas-deco.png',
    customizable: true,
  },
  {
    id: 'cookies',
    name: 'Cookies Choco-Chip',
    category: 'galletas',
    description: 'Cookies americanas con pepitas de chocolate. Caja de 6.',
    price: 12,
    unit: 'caja de 6',
    image: '/images/prod-cookies.png',
    customizable: false,
  },
  {
    id: 'cupcakes-vainilla',
    name: 'Cupcakes Vainilla',
    category: 'cupcakes',
    description: 'Bizcocho de vainilla y buttercream suave. Caja de 6.',
    price: 18,
    unit: 'caja de 6',
    image: '/images/prod-cupcakes-vainilla.png',
    customizable: true,
  },
  {
    id: 'cupcakes-rv',
    name: 'Cupcakes Red Velvet',
    category: 'cupcakes',
    description: 'Red velvet con frosting de queso crema. Caja de 6.',
    price: 20,
    unit: 'caja de 6',
    image: '/images/prod-cupcakes-rv.png',
    customizable: true,
  },
  {
    id: 'tartaletas',
    name: 'Mini Tartaletas de Fruta',
    category: 'dulces',
    description: 'Crema pastelera y fruta fresca de temporada. Pack de 6.',
    price: 15,
    unit: 'pack de 6',
    image: '/images/prod-tartaletas.png',
    customizable: false,
  },
  {
    id: 'macarons',
    name: 'Macarons Surtidos',
    category: 'dulces',
    description: 'Macarons franceses en sabores variados. Caja de 9.',
    price: 16,
    unit: 'caja de 9',
    image: '/images/prod-macarons.png',
    customizable: false,
  },
]
