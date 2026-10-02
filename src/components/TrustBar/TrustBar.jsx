import { useTranslation } from 'react-i18next';
import Icon from '../Icon/Icon';
import './TrustBar.css';

export default function TrustBar() {
  const { t } = useTranslation();
  const items = [
    { icon: 'truck', title: 'trust.shippingTitle', text: 'trust.shippingText' },
    { icon: 'refresh', title: 'trust.returnsTitle', text: 'trust.returnsText' },
    { icon: 'shield', title: 'trust.qualityTitle', text: 'trust.qualityText' },
    { icon: 'headset', title: 'trust.supportTitle', text: 'trust.supportText' },
  ];

  return (
    <section className="trust" aria-label={t('trust.title')}>
      <div className="container">
        <ul className="trust__grid">
          {items.map((i) => (
            <li className="trust__item" key={i.icon}>
              <span className="trust__icon">
                <Icon name={i.icon} size={22} />
              </span>
              <span>
                <span className="trust__title">{t(i.title)}</span>
                <span className="trust__text">{t(i.text)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
