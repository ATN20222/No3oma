import { useTranslation } from 'react-i18next';
import Icon from '../Icon/Icon';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const { t } = useTranslation();
  return (
    <div className="announce">
      <div className="container announce__inner">
        <p className="announce__item">
          <Icon name="truck" size={15} />
          {t('announcement.shipping')}
        </p>
        <p className="announce__item announce__item--hide-sm">
          <Icon name="refresh" size={15} />
          {t('announcement.returns')}
        </p>
        <p className="announce__item announce__item--hide-sm">
          <Icon name="headset" size={15} />
          {t('announcement.support')}
        </p>
        <p className="announce__item announce__item--gold">{t('announcement.promo')}</p>
      </div>
    </div>
  );
}