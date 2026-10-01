import { useState } from 'react';
import './ProductGallery.css';

export default function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) return null;

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img src={images[active]} alt={`${alt} ${active + 1}`} />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`gallery__thumb ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
