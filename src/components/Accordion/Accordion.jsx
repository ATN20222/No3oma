import { useState } from 'react';
import './Accordion.css';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div className="accordion__item" key={item.q}>
          <h3>
            <button
              type="button"
              className="accordion__trigger"
              aria-expanded={open === i}
              aria-controls={`acc-panel-${i}`}
              id={`acc-trigger-${i}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              {item.q}
              <span className="accordion__icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
          </h3>
          {open === i && (
            <div className="accordion__panel" id={`acc-panel-${i}`} role="region" aria-labelledby={`acc-trigger-${i}`}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
