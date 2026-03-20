import React from 'react';
import { FaGem, FaAward, FaShieldAlt, FaLeaf, FaHandshake, FaStar } from 'react-icons/fa';
import './BrandSlider.css';

const badges = [
  { icon: <FaAward />, title: 'BIS Hallmarked', sub: '22K & 24K Gold' },
  { icon: <FaGem />, title: 'GIA Certified', sub: 'Natural Diamonds' },
  { icon: <FaShieldAlt />, title: 'Authentic Polki', sub: 'Heritage Craftsmanship' },
  { icon: <FaStar />, title: 'JustDial Top Rated', sub: 'Hyderabad' },
  { icon: <FaHandshake />, title: 'Trusted Brand', sub: 'Generations of Families' },
  { icon: <FaLeaf />, title: 'Conflict-Free', sub: 'Ethical Sourcing' },
];

const BrandSlider = () => (
  <div className="trust-section">
    <p className="trust-heading">Why Hyderabad Trusts Visista</p>
    <div className="trust-badges">
      {badges.map((b, i) => (
        <div key={i} className="trust-badge">
          <div className="tb-icon">{b.icon}</div>
          <div>
            <strong>{b.title}</strong>
            <span>{b.sub}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BrandSlider;
