import Icon from '../Icon/Icon';
import './CheckoutSteps.css';

export default function CheckoutSteps({ steps, current = 1 }) {
  return (
    <ol className="steps" aria-label="Checkout progress" data-reveal="up">
      {steps.map((label, i) => {
        const n = i + 1;
        const state = n < current ? 'is-done' : n === current ? 'is-current' : 'is-todo';
        return (
          <li className={`steps__item ${state}`} key={label} aria-current={n === current ? 'step' : undefined}>
            <span className="steps__marker">
              {n < current ? <Icon name="check" size={14} strokeWidth={2.2} /> : <span className="steps__num">{n}</span>}
            </span>
            <span className="steps__label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
