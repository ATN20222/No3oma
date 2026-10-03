import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGsap } from './gsap';
import { resetReveals, scanReveals } from './reveal';
import { shouldShowIntro } from './intro';
import { MotionContext } from './motion-context';

export default function MotionProvider({ children }) {
  const location = useLocation();
  const [engine, setEngine] = useState(null);
  const [intro] = useState(() => shouldShowIntro());

  useEffect(() => {
    let alive = true;

    const refresh = (bundle) => {
      scanReveals(document, bundle.gsap);
      bundle.ScrollTrigger.refresh();
    };

    getGsap().then((bundle) => {
      if (!alive || !bundle) return;
      refresh(bundle);
      setEngine(bundle);

      if (document.readyState === 'complete') return;
      window.addEventListener('load', () => refresh(bundle), { once: true });
    });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!engine) return undefined;
    const frame = requestAnimationFrame(() => {
      resetReveals(document, engine.gsap);
      scanReveals(document, engine.gsap);
      engine.ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.search, engine]);

  const value = useMemo(() => ({ engine, intro }), [engine, intro]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
