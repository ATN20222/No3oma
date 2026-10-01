import './QuantitySelector.css';

export default function QuantitySelector({ value = 1, onChange, min = 1, max = 99, label }) {
  return (
    <div className="qty" role="group" aria-label={label || 'Quantity'}>
      <button type="button" className="qty__btn" onClick={() => onChange(Math.max(min, value - 1))} aria-label="decrease" disabled={value <= min}>
        −
      </button>
      <input type="number" className="qty__input" value={value} min={min} max={max} onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))} aria-label={label || 'Quantity'} />
      <button type="button" className="qty__btn" onClick={() => onChange(Math.min(max, value + 1))} aria-label="increase" disabled={value >= max}>
        +
      </button>
    </div>
  );
}
