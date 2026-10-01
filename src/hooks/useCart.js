import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
