import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Priya Venkatesh',
    role: 'Bridal Customer',
    initials: 'PV',
    stars: 5,
    text: 'We purchased our entire bridal set from Visista — the craftsmanship on the necklace and bangles was absolutely breathtaking. The staff was patient and knowledgeable. Highly recommended for Telugu bridal jewellery!',
  },
  {
    id: 2,
    name: 'Dhanalaxmi Reddy',
    role: 'Verified Buyer',
    initials: 'DR',
    stars: 5,
    text: 'Bought diamond earrings from the Jubilee Hills branch — certified natural diamonds at a very fair price. The quality exceeded my expectations and the packaging was luxurious. Will definitely shop again!',
  },
  {
    id: 3,
    name: 'Swetha Chary',
    role: 'Loyal Customer',
    initials: 'SC',
    stars: 5,
    text: 'The Polki necklace I ordered is a true work of art. Visista Gold and Diamonds has the most beautiful traditional designs in Hyderabad. Customer service is fantastic and the WhatsApp booking is so convenient.',
  },
  {
    id: 4,
    name: 'Anitha Srinivas',
    role: 'Regular Customer',
    initials: 'AS',
    stars: 5,
    text: 'Visited the Kothapet showroom for an anniversary gift. The collection was outstanding — from classic gold to modern diamond pieces. The staff made us feel so welcome. Excellent experience!',
  },
];

const badges = [
  { num: '500+', label: 'Bridal Sets Sold' },
  { num: '15+', label: 'Years of Trust' },
  { num: '3', label: 'Premium Showrooms' },
  { num: '4.9★', label: 'Customer Rating' },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive(p => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div>
      <div className="testimonials-outer">
        <div className="testimonials-track">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-card${i === active ? ' active' : ''}`}>
              <FaQuoteLeft className="quote-icon" />
              <div className="t-stars">
                {Array.from({ length: t.stars }).map((_, j) => <FaStar key={j} />)}
              </div>
              <p className="t-text">{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span className="t-author-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-nav">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`t-dot${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="trust-badges">
        {badges.map((b, i) => (
          <div key={i} className="trust-badge">
            <div className="trust-badge-num">
              {b.num.includes('★')
                ? <>{b.num.replace('★', '')}<span>★</span></>
                : b.num.includes('+')
                  ? <>{b.num.replace('+', '')}<span>+</span></>
                  : b.num
              }
            </div>
            <div className="trust-badge-label">{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
