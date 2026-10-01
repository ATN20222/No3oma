import { useCallback, useMemo, useRef, useState } from 'react';
import { ToastContext } from './ToastContext';

let nextId = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const notify = useCallback(
    (message, tone = 'success') => {
      const id = ++nextId;
      setToasts((list) => [...list, { id, message, tone }]);
      timers.current.set(id, setTimeout(() => dismiss(id), 3200));
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
