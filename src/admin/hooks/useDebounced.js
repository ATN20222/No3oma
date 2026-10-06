import { useEffect, useRef, useState } from 'react';

/**
 * Debounced mirror of a value — used for every type-ahead search box so we do
 * not refetch on each keystroke.
 */
export default function useDebounced(value, delay = 280) {
  const [debounced, setDebounced] = useState(value);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer.current);
  }, [value, delay]);

  return debounced;
}
