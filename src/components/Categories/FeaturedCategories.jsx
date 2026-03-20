import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCategories.css';

const categories = [
  {
    name: 'Rings',
    sub: 'Gold & Diamond',
    image: '/ragipanis imgs/rings/ring1.jpg',
    link: '/shop/Rings',
    num: '01',
  },
  {
    name: 'Necklaces',
    sub: 'Bridal & Daily',
    image: '/ragipanis imgs/Necklaces/necklace1.jpg',
    link: '/shop/Necklaces',
    num: '02',
  },
  {
    name: 'Earrings',
    sub: 'Jhumkas & Studs',
    image: '/ragipanis imgs/earrings/earring1.jpg',
    link: '/shop/Earrings',
    num: '03',
  },
  {
    name: 'Bracelets',
    sub: 'Bangles & Chains',
    image: '/ragipanis imgs/bracelets/bracelet1.jpg',
    link: '/shop/Bracelets',
    num: '04',
  },
];

const FeaturedCategories = () => (
  <div className="cat-grid">
    {categories.map(c => (
      <Link key={c.name} to={c.link} className="cat-card">
        <span className="cat-number">{c.num}</span>
        <div className="cat-img-wrap">
          <img src={c.image} alt={c.name} loading="lazy"
            onError={e => { e.target.src = '/banner1.png'; }} />
          <div className="cat-overlay" />
        </div>
        <div className="cat-label">
          <span className="cat-sub">{c.sub}</span>
          <h3>{c.name}</h3>
          <div className="cat-bottom-line" />
          <span className="cat-cta">Explore Collection</span>
        </div>
      </Link>
    ))}
  </div>
);

export default FeaturedCategories;
