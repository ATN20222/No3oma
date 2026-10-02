import { useCallback, useMemo, useState } from 'react';
import { WishlistContext } from './WishlistContext';

export default function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  const toggle = useCallback((id) => {
    setItems((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }, []);

  const value = useMemo(
    () => ({
      items,
      toggle,
      has: (id) => items.includes(id),
      count: items.length,
      clear: () => setItems([]),
    }),
    [items, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
