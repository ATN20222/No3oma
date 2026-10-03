import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import Rating from '../Rating/Rating';
import SmartImage from '../SmartImage/SmartImage';
import Icon from '../Icon/Icon';
import { getGsap, prefersReducedMotion } from '../../motion/gsap';
import './Hero.css';

const heroImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80';
const insetImage = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';

export default function Hero() {
  const { t } = useTranslation();
  const rootRef = useRef(null);
  const highlights = t('hero.highlights', { returnObjects: true });
  const icons = ['sparkles', 'shield', 'truck'];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    let timeline = null;
    let parallax = null;
    let onPointerMove = null;
    let cancelled = false;

    getGsap().then(({ gsap }) => {
      if (cancelled || !gsap) return;

      const play = () => {
        const intro = root.querySelectorAll('[data-hero]');
        const points = root.querySelectorAll('.hero__highlights li');
        if (intro.length === 0) return;

        timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        timeline
          .from(intro, { autoAlpha: 0, y: 34, duration: 0.85, stagger: 0.09 })
          .from(points, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.07 }, '-=0.4');
      };

      if (document.querySelector('.preload')) {
        window.addEventListener('naouma:ready', play, { once: true });
      } else {
        play();
      }

      const visual = root.querySelector('.hero__visual');
      if (visual && window.innerWidth >= 768) {
        parallax = gsap.to(visual, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      }

      onPointerMove = (event) => {
        // Touch devices and narrow screens get no pointer parallax: on a phone it
        // only adds jank and can push the floating cards past the viewport edge.
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const width = window.innerWidth;
        if (width < 768) return;
        const scale = Math.min(1, width / 1200);
        const { clientX, clientY } = event;
        const x = (clientX / width - 0.5) * scale;
        const y = (clientY / window.innerHeight - 0.5) * scale;
        gsap.to('.hero__inset', { x: x * -16, y: y * -12, duration: 0.9, ease: 'power2.out' });
        gsap.to('.hero__chip', { x: x * 12, y: y * 10, duration: 0.9, ease: 'power2.out' });
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
    });

    return () => {
      cancelled = true;
      if (timeline) {
        timeline.kill();
        getGsap().then((bundle) => {
          if (!bundle) return;
          bundle.gsap.set(root.querySelectorAll('[data-hero], .hero__highlights li'), {
            clearProps: 'all',
          });
        });
      }
      if (parallax) parallax.kill();
      if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <section className="hero" ref={rootRef}>
      <div className="container hero__inner">
        <div className="row hero__row align-center g-0">
          <div className="col-12 col-lg-5 hero__col-text">
            <div className="hero__content">
              <p className="u-eyebrow" data-hero>
                {t('hero.eyebrow')}
              </p>
              <h1 className="hero__title" data-hero>
                {t('hero.title')}
              </h1>
              <p className="hero__text" data-hero>
                {t('hero.text')}
              </p>

              <div className="hero__actions" data-hero>
                <Button as={Link} to="/shop" variant="primary" size="lg">
                  {t('hero.ctaPrimary')}
                </Button>
                <Button as={Link} to="/category/bedSets" variant="outline" size="lg">
                  {t('hero.ctaSecondary')}
                </Button>
              </div>

              <ul className="hero__highlights">
                {highlights.map((h, i) => (
                  <li key={h}>
                    <Icon name={icons[i] || 'check'} size={17} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-7 hero__col-media">
            <div className="hero__visual">
              <Link to="/shop" className="hero__main" data-hero>
                <SmartImage src={heroImage} alt={t('hero.visualAlt')} />
              </Link>

              <Link to="/category/blankets" className="hero__inset" data-hero>
                <SmartImage src={insetImage} alt={t('hero.insetAlt')} />
                <span className="hero__inset-caption">
                  <Rating value={4.8} size={12} showValue={false} />
                  <span className="hero__inset-text">{t('hero.insetText')}</span>
                </span>
              </Link>

              <span className="hero__chip" data-hero>
                <Icon name="gift" size={15} />
                {t('hero.chip')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
