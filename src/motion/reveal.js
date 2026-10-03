import { prefersReducedMotion } from './gsap';

export const REVEAL_SELECTOR = '[data-reveal]';
const DONE_FLAG = 'data-reveal-ready';

const FROM = {
  up: { autoAlpha: 0, y: 30 },
  down: { autoAlpha: 0, y: -24 },
  left: { autoAlpha: 0, x: 42 },
  right: { autoAlpha: 0, x: -42 },
  fade: { autoAlpha: 0 },
  scale: { autoAlpha: 0, scale: 0.94 },
  mask: { autoAlpha: 0, y: 40, clipPath: 'inset(0% 0% 100% 0%)' },
  stagger: { autoAlpha: 0, y: 26 },
};

const DURATION = { mask: 1.1, scale: 0.85, fade: 0.8, stagger: 0.7 };

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
};

/**
 * Animates every `[data-reveal]` element inside `root` that has not run yet.
 * Content stays visible without JavaScript: the hidden state is only applied
 * by GSAP, and anything already on screen is animated immediately instead of
 * waiting for a scroll trigger.
 */
/**
 * Undo any in-flight reveal (route change, interrupted timeline) so content can
 * never be left invisible, then allow it to be animated again.
 */
export function resetReveals(root, gsap) {
  if (!root) return;

  Array.from(root.querySelectorAll(REVEAL_SELECTOR)).forEach((el) => {
    const children = Array.from(el.children);
    children.forEach((child) => gsap.killTweensOf(child));
    gsap.killTweensOf(el);
    gsap.set([el, ...children], { clearProps: 'all' });
    el.removeAttribute(DONE_FLAG);
  });
}

export function scanReveals(root, gsap) {
  if (!root) return 0;

  const nodes = Array.from(root.querySelectorAll(REVEAL_SELECTOR)).filter(
    (el) => el.getAttribute(DONE_FLAG) !== 'true',
  );
  if (nodes.length === 0) return 0;

  if (prefersReducedMotion()) {
    nodes.forEach((el) => el.setAttribute(DONE_FLAG, 'true'));
    return nodes.length;
  }

  nodes.forEach((el) => {
    el.setAttribute(DONE_FLAG, 'true');

    const requested = el.getAttribute('data-reveal');
    const type = FROM[requested] ? requested : 'up';
    const delay = Number(el.getAttribute('data-reveal-delay') || 0);
    const start = el.getAttribute('data-reveal-start') || 'top 88%';

    if (type === 'stagger') {
      const children = Array.from(el.children);
      if (children.length === 0) return;
      gsap.from(children, {
        ...FROM.stagger,
        duration: DURATION.stagger,
        delay,
        ease: 'power3.out',
        stagger: Number(el.getAttribute('data-reveal-stagger') || 0.07),
        ...(isInViewport(el)
          ? {}
          : { scrollTrigger: { trigger: el, start, once: true } }),
      });
      return;
    }

    gsap.from(el, {
      ...FROM[type],
      duration: DURATION[type] || 0.9,
      delay,
      ease: 'power3.out',
      ...(isInViewport(el) ? {} : { scrollTrigger: { trigger: el, start, once: true } }),
    });
  });

  return nodes.length;
}
