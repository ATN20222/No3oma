import { useMemo, useState } from 'react';
import { products } from '../data/products';

export default function useProducts() {
  const [loading] = useState(false);
  const [error] = useState(null);

  const byCategory = (categoryId) =>
    products.filter((p) => p.category === categoryId);

  const byId = (id) => products.find((p) => p.id === Number(id));

  const related = (product, limit = 4) =>
    products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

  const search = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q),
    );
  };

  const featured = useMemo(() => products.slice(0, 4), []);
  const newArrivals = useMemo(() => products.slice(2, 6), []);
  const bestSellers = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [],
  );

  return { products, loading, error, byCategory, byId, related, search, featured, newArrivals, bestSellers };
}
