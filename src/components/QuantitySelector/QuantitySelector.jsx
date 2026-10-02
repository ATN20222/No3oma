import { useTranslation } from 'react-i18next';
import './QuantitySelector.css';

export default function QuantitySelector({ value = 1, onChange, min = 1, max = 99, label }) {
  const { t } = useTranslation();
  const name = label || t('common.quantity');

  return (
    <div className="qty" role="group" aria-label={name}>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={t('common.decrease')}
        disabled={value <= min}
      >
        −
      </button>

      <input
        type="number"
        className="qty__input"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
        aria-label={name}
      />

      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label={t('common.increase')}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
