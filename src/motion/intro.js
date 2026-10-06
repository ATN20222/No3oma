const KEY = 'no3oma.intro.seen';

export function shouldShowIntro() {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(KEY) !== 'true';
  } catch {
    return true;
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(KEY, 'true');
  } catch {
    /* private mode: show the intro again next time */
  }
}
