import { createContext } from 'react';

export const CartContext = createContext(null);

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product, quantity = 1 } = action;
      const existing = state.find((i) => i.id === product.id);
      if (existing) {
        return state.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...state, { ...product, quantity }];
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'update':
      return state.map((i) =>
        i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i,
      );
    case 'clear':
      return [];
    default:
      return state;
  }
}
