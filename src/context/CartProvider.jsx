import { useMemo, useReducer } from 'react';
import { CartContext, cartReducer } from './CartContext';

export default function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const value = useMemo(
    () => ({
      items,
      addItem: (product, quantity) => dispatch({ type: 'add', product, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      updateQuantity: (id, quantity) => dispatch({ type: 'update', id, quantity }),
      clearCart: () => dispatch({ type: 'clear' }),
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    [items],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
