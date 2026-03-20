import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    tag: 'Telugu Bridal Collection',
    title: 'Crafted for the\nBride in You',
    subtitle: 'Exquisite gold and diamond jewellery for your most treasured moments',
    image: '/banner4.png',
    link: '/shop',
    cta: 'Explore Bridal',
  },
  {
    id: 2,
    tag: 'Natural Diamonds',
    title: 'Brilliance That\nLasts Forever',
    subtitle: 'Certified natural diamonds set in 22K and 18K gold',
    image: '/banner1.png',
    link: '/shop',
    cta: 'Discover Diamonds',
  },
  {
    id: 3,
    tag: 'Polki & Heritage Gold',
    title: 'Heritage Elegance\nReborn',
    subtitle: 'Traditional Polki craftsmanship meets contemporary design',
    image: '/banner3.png',
    link: '/shop',
    cta: 'Shop Polki',
  },
  {
    id: 4,
    tag: 'Exclusive Gold Collections',
    title: 'Pure Gold,\nPure Legacy',
    subtitle: 'Hallmarked 22K & 24K gold jewellery — for every occasion',
    image: '/banner2.png',
    link: '/shop/Necklaces',
    cta: 'Browse Gold',
  },
];

const HeroSlider = () => {
  const [active, setActive]       = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length);
    }, 5800);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setActive(idx);
    startTimer();
    setTimeout(() => setAnimating(false), 700);
  };

  const goNext = () => goTo((active + 1) % slides.length);
  const goPrev = () => goTo((active - 1 + slides.length) % slides.length);

  return (
    <div className="hero-slider">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`hero-slide${i === active ? ' active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-overlay" />
          <div className="container hero-content-wrap">
            <div className="hero-content">
              <div className="hero-tag">{slide.tag}</div>
              <div className="hero-divider" />
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-sub">{slide.subtitle}</p>
              <div className="hero-actions">
                <Link to={slide.link} className="btn btn-primary btn-lg">
                  {slide.cta}
                </Link>
                <a
                  href="https://wa.me/917947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20Visista%20Gold%20and%20Diamonds%20jewellery%20collections."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="hero-arrow prev" onClick={goPrev} aria-label="Previous">&#8592;</button>
      <button className="hero-arrow next" onClick={goNext} aria-label="Next">&#8594;</button>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === active ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero-counter">
        <strong>0{active + 1}</strong> / 0{slides.length}
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </div>
  );
};

export default HeroSlider;
