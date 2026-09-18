import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from './data/products';

export type CartItem = { product: Product; size: string; color: string; quantity: number };

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  removeFromCart: (id: string, size: string) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('nerissa-cart') || '[]'); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('nerissa-wishlist') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('nerissa-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('nerissa-wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const value = useMemo(() => ({
    cart,
    wishlist,
    addToCart: (product: Product, size: string, color: string, quantity = 1) => setCart(current => {
      const existing = current.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) return current.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { product, size, color, quantity }];
    }),
    updateQuantity: (id: string, size: string, quantity: number) => setCart(current =>
      quantity < 1 ? current.filter(item => !(item.product.id === id && item.size === size)) :
        current.map(item => item.product.id === id && item.size === size ? { ...item, quantity } : item)),
    removeFromCart: (id: string, size: string) => setCart(current => current.filter(item => !(item.product.id === id && item.size === size))),
    toggleWishlist: (id: string) => setWishlist(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]),
    isWishlisted: (id: string) => wishlist.includes(id),
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
  }), [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside StoreProvider');
  return value;
}