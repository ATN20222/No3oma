import { useTranslation } from 'react-i18next';
import useToast from '../../hooks/useToast';
import Icon from '../Icon/Icon';
import './Toast.css';

export default function Toast() {
  const { toasts, dismiss } = useToast();
  const { t } = useTranslation();
  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((item) => (
        <div key={item.id} className={`toast toast--${item.tone}`}>
          <span>{item.message}</span>
          <button
            type="button"
            className="toast__close"
            onClick={() => dismiss(item.id)}
            aria-label={t('common.close')}
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
