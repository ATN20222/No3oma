import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getGsap, prefersReducedMotion } from '../../motion/gsap';
import { markIntroSeen } from '../../motion/intro';
import BrandLogo from '../BrandLogo/BrandLogo';
import './PageLoader.css';

export default function PageLoader({ show }) {
  const { t, i18n } = useTranslation();
  const brand = t('brandName');
  const isRTL = i18n.dir() === 'rtl';
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
      window.dispatchEvent(new CustomEvent('no3oma:ready'));
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
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: isRTL ? 0.8 : 0.75,
            ease: 'power3.out',
            // One unit in Arabic, one per glyph in Latin — keep the total
            // reveal roughly the same length either way.
            stagger: isRTL ? 0 : 0.07,
          },
          '-=0.5',
        )
        .fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.45')
        .fromTo(barRef.current, { scaleX: 0.06 }, { scaleX: 1, duration: 0.95, ease: 'power2.inOut' }, '-=0.5')
        .to(mark, { scale: 1.06, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1 }, '-=0.75')
        .to([mark, word, meta, barRef.current], { opacity: 0, duration: 0.4, ease: 'power1.in' }, '-=0.1')
        .to(root, { autoAlpha: 0, duration: 0.55, ease: 'power2.inOut' }, '-=0.35');
    });

    return () => {
      cancelled = true;
      if (timeline) timeline.kill();
    };
  }, [show, brand, isRTL]);

  if (dismissed) return null;

  return (
    <div className="preload" ref={rootRef} role="status" aria-live="polite" aria-label={brand}>
      <div className="preload__field" aria-hidden="true">
        <span className="preload__orb preload__orb--1" />
        <span className="preload__orb preload__orb--2" />
        <span className="preload__orb preload__orb--3" />
      </div>

      <div className="preload__inner">
        <BrandLogo variant="loader" className="preload__mark" />

        <p className="preload__word" lang={i18n.language} dir={i18n.dir()}>
          {/* Arabic is cursive: splitting it into letters would break the
              joining shapes, so it animates as a single unit instead. */}
          {isRTL ? (
            <em className="preload__word-ar">{brand}</em>
          ) : (
            Array.from(brand).map((letter, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <em key={`${letter}-${index}`}>{letter}</em>
            ))
          )}
        </p>

        <p className="preload__meta">{t('preload.tagline')}</p>

        <span className="preload__track" aria-hidden="true">
          <span className="preload__bar" ref={barRef} />
        </span>
      </div>
    </div>
  );
}
