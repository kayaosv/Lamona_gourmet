'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from './products'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit: string
  image: string
  note?: string
}

export type DeliveryType = 'recogida' | 'envio'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  date: string
  delivery: DeliveryType
  open: () => void
  close: () => void
  toggle: () => void
  setDate: (date: string) => void
  setDelivery: (delivery: DeliveryType) => void
  addItem: (product: Product, quantity?: number, note?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      date: '',
      delivery: 'recogida',
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      setDate: (date) => set({ date }),
      setDelivery: (delivery) => set({ delivery }),
      addItem: (product, quantity = 1, note) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === product.id && (i.note ?? '') === (note ?? ''),
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                unit: product.unit,
                image: product.image,
                note: note || undefined,
              },
            ],
          }
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'lamona-cart',
      partialize: (state) => ({
        items: state.items,
        date: state.date,
        delivery: state.delivery,
      }),
    },
  ),
)

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
