import { useTranslation } from 'react-i18next';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import SmartImage from '../SmartImage/SmartImage';
import Icon from '../Icon/Icon';
import './CartItem.css';

export default function CartItem({ item, onUpdate, onRemove }) {
  const { t, i18n } = useTranslation();
  const name = i18n.language === 'ar' ? item.name : item.nameEn;

  return (
    <div className="cart-item">
      <SmartImage className="cart-item__image" src={item.image} alt={name} />

      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
        <p className="cart-item__variant">
          {item.variant || (i18n.language === 'ar' ? item.categoryName : item.categoryNameEn)}
        </p>
        <button type="button" className="cart-item__remove" onClick={() => onRemove(item.id)}>
          <Icon name="trash" size={14} />
          {t('common.remove')}
        </button>
      </div>

      <div className="cart-item__qty">
        <QuantitySelector
          value={item.quantity}
          onChange={(q) => onUpdate(item.id, q)}
          label={t('common.quantity')}
        />
      </div>

      <div className="cart-item__price">
        <strong>{item.price * item.quantity} EGP</strong>
        {item.quantity > 1 && <small>{item.price} EGP × {item.quantity}</small>}
      </div>
    </div>
  );
}
