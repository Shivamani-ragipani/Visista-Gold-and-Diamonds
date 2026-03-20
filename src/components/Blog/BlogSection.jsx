import React from 'react';
import './BlogSection.css';

const tips = [
  {
    id: 1,
    title: 'How to Care for Your 22K Gold Jewellery',
    tag: 'Gold Care',
    image: '/banner4.png',
    date: 'March 2025',
    excerpt: 'Simple steps to keep your hallmarked gold pieces shining bright for generations — cleaning, storage, and when to visit a jeweller.',
  },
  {
    id: 2,
    title: 'Choosing the Perfect Telugu Bridal Set',
    tag: 'Bridal Guide',
    image: '/banner1.png',
    date: 'February 2025',
    excerpt: 'A complete guide for brides and families: necklace weights, bangle sizes, haram styles and how to mix Polki with diamonds.',
  },
  {
    id: 3,
    title: 'Natural Diamonds vs Synthetic: What You Need to Know',
    tag: 'Diamond Guide',
    image: '/banner3.png',
    date: 'January 2025',
    excerpt: 'We explain the difference and why every Visista diamond comes with a GIA certificate so you can buy with complete confidence.',
  },
];

const BlogSection = () => (
  <div className="blog-grid">
    {tips.map(tip => (
      <div key={tip.id} className="blog-card">
        <div className="blog-img">
          <div
            className="blog-img-inner"
            style={{ backgroundImage: `url(${tip.image})` }}
          />
        </div>
        <div className="blog-body">
          <div className="blog-meta">
            <span className="blog-date">{tip.date}</span>
            <span className="blog-tag">{tip.tag}</span>
          </div>
          <h3>{tip.title}</h3>
          <p>{tip.excerpt}</p>
          <a
            href={`https://wa.me/917947134680?text=${encodeURIComponent('Hi! I have a question about: ' + tip.title)}`}
            target="_blank"
            rel="noreferrer"
            className="blog-link"
          >
            Ask Us Directly
          </a>
        </div>
      </div>
    ))}
  </div>
);

export default BlogSection;
