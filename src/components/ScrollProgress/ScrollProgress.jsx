import { useEffect, useRef } from 'react';
import { getGsap, prefersReducedMotion } from '../../motion/gsap';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return undefined;
    if (prefersReducedMotion()) return undefined;

    let trigger = null;
    let cancelled = false;

    getGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !gsap) return;
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' });
      trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          gsap.set(barRef.current, { scaleX: self.progress });
        },
      });
    });

    return () => {
      cancelled = true;
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" ref={barRef} />
    </div>
  );
}
