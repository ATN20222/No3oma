import { useState } from 'react';
import './SmartImage.css';

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='750' viewBox='0 0 600 750'%3E%3Crect width='600' height='750' fill='%23F7F2EA'/%3E%3Cg fill='none' stroke='%23DACDBB' stroke-width='3'%3E%3Crect x='200' y='270' width='200' height='150' rx='6'/%3E%3Cpath d='M170 500h260M170 500v40M430 500v40'/%3E%3C/g%3E%3Ctext x='300' y='620' font-family='sans-serif' font-size='22' fill='%23A8823C' text-anchor='middle'%3ENaouma%3C/text%3E%3C/svg%3E";

export default function SmartImage({ src, alt, className = '', ratio, ...rest }) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed || !src ? PLACEHOLDER : src}
      alt={alt}
      className={`smart-image ${className}`}
      onError={() => setFailed(true)}
      style={ratio ? { aspectRatio: ratio } : undefined}
      {...rest}
    />
  );
}
