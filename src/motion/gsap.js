let bundle = null;
let pending = null;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * GSAP is loaded lazily and only in the browser so server-side rendering
 * (and the pre-hydration render) never touches animation internals.
 */
export function getGsap() {
  if (!isBrowser()) return Promise.resolve(null);
  if (bundle) return Promise.resolve(bundle);
  if (!pending) {
    pending = Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        bundle = { gsap, ScrollTrigger };
        return bundle;
      })
      .catch(() => {
        pending = null;
        return null;
      });
  }
  return pending;
}

export function prefersReducedMotion() {
  if (!isBrowser() || typeof window.matchMedia !== 'function') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
