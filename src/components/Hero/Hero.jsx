import heroImage from '../../assets/hero.png';
import './Hero.css';

const highlights = [
  'فراش فاخر',
  'ملاءات مريحة',
  'أستيل عربي أنيق',
];

function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="row hero__row align-center">
          <div className="col-12 col-lg-6">
            <div className="hero__content">
              <p className="hero__eyebrow">منزل هادئ • راحة يومية</p>
              <h1>أقمشة وملاءات تعشّقها غرفة النوم.</h1>
              <p className="hero__text">
                اكتشف مجموعات الفراش والوسائد والملاءات المصممة لتمنح منزلك إحساسًا دافئًا
                وعصريًا، مع جودة تعيش معها كل ليلة.
              </p>

              <div className="hero__actions">
                <a href="#" className="hero__cta primary">تسوق الآن</a>
                <a href="#" className="hero__cta secondary">استكشف المجموعة</a>
              </div>

              <ul className="hero__highlights" aria-label="مزايا المنتج">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="hero__visual" aria-label="عرض المنتج">
              <div className="hero__image-wrap">
                <img src={heroImage} alt="مجموعة من أغطية الفراش والوسائد داخل غرفة نوم أنيقة" />
              </div>

              <div className="hero__badge hero__badge--top">
                <span>جودة مضمونة</span>
              </div>

              <div className="hero__badge hero__badge--bottom">
                <strong>مجموعات</strong>
                <span>فراش فاخر</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
