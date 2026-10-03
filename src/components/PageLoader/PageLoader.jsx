import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getGsap, prefersReducedMotion } from '../../motion/gsap';
import { markIntroSeen } from '../../motion/intro';
import Icon from '../Icon/Icon';
import './PageLoader.css';

export default function PageLoader({ show }) {
  const { t } = useTranslation();
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const [dismissed, setDismissed] = useState(!show);

  useEffect(() => {
    if (!show || !rootRef.current) return undefined;

    const root = rootRef.current;
    markIntroSeen();
    let cancelled = false;
    let timeline = null;

    const finish = () => {
      if (cancelled) return;
      setDismissed(true);
      window.dispatchEvent(new CustomEvent('naouma:ready'));
    };

    if (prefersReducedMotion() || typeof requestAnimationFrame === 'undefined') {
      const timer = window.setTimeout(finish, 120);
      return () => window.clearTimeout(timer);
    }

    getGsap().then((bundle) => {
      const { gsap } = bundle || {};
      if (cancelled || !gsap) {
        finish();
        return;
      }

      const mark = root.querySelector('.preload__mark');
      const word = root.querySelector('.preload__word');
      const meta = root.querySelector('.preload__meta');

      timeline = gsap.timeline({ onComplete: finish });

      timeline
        .fromTo(
          root.querySelectorAll('.preload__orb'),
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.12 },
        )
        .fromTo(mark, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.7')
        .fromTo(
          word ? word.querySelectorAll('em') : [],
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.06 },
          '-=0.5',
        )
        .fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.45')
        .fromTo(barRef.current, { scaleX: 0.06 }, { scaleX: 1, duration: 0.95, ease: 'power2.inOut' }, '-=0.5')
        .to(mark, { rotate: 360, duration: 0.9, ease: 'power2.inOut' }, '-=0.75')
        .to([mark, word, meta, barRef.current], { opacity: 0, duration: 0.4, ease: 'power1.in' }, '-=0.1')
        .to(root, { autoAlpha: 0, duration: 0.55, ease: 'power2.inOut' }, '-=0.35');
    });

    return () => {
      cancelled = true;
      if (timeline) timeline.kill();
    };
  }, [show]);

  if (dismissed) return null;

  return (
    <div className="preload" ref={rootRef} role="status" aria-live="polite" aria-label={t('brandTag')}>
      <div className="preload__field" aria-hidden="true">
        <span className="preload__orb preload__orb--1" />
        <span className="preload__orb preload__orb--2" />
        <span className="preload__orb preload__orb--3" />
      </div>

      <div className="preload__inner">
        <span className="preload__mark" aria-hidden="true">
          <Icon name="sparkles" size={22} />
        </span>

        <p className="preload__word">
          <em>N</em>
          <em>a</em>
          <em>o</em>
          <em>u</em>
          <em>m</em>
          <em>a</em>
        </p>

        <p className="preload__meta">{t('preload.tagline')}</p>

        <span className="preload__track" aria-hidden="true">
          <span className="preload__bar" ref={barRef} />
        </span>
      </div>
    </div>
  );
}
