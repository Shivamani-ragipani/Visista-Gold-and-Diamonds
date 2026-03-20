import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  const [visible,  setVisible]  = useState(false);
  const [tooltip,  setTooltip]  = useState(true);

  /* Show button after slight scroll */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Auto-hide tooltip after 6 s */
  useEffect(() => {
    const t = setTimeout(() => setTooltip(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`fwa-wrap${visible ? ' fwa-show' : ''}`} aria-label="WhatsApp quick contact">
      {tooltip && (
        <div className="fwa-tooltip">
          <button
            className="fwa-tooltip-close"
            onClick={() => setTooltip(false)}
            aria-label="Close tooltip"
          >
            <FaTimes />
          </button>
          <p>Chat with us on WhatsApp!</p>
          <span>We reply within minutes ✦</span>
        </div>
      )}
      <a
        href="https://wa.me/917947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20Visista%20Gold%20and%20Diamonds%20jewellery."
        target="_blank"
        rel="noreferrer"
        className="fwa-btn"
        aria-label="Chat on WhatsApp"
        onClick={() => setTooltip(false)}
      >
        <FaWhatsapp aria-hidden="true" />
        <span className="fwa-label">WhatsApp</span>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
