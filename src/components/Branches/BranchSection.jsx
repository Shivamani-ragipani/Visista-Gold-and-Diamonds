import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaClock } from 'react-icons/fa';
import branches from '../../data/branches';
import './BranchSection.css';

const BranchSection = () => (
  <section className="branch-section">
    <div className="container">
      <div className="section-header">
        <span className="section-label">Our Showrooms</span>
        <h2 className="section-title">Visit Us in Hyderabad</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">Three premium showrooms — experience our collections in person</p>
      </div>

      <div className="branch-grid">
        {branches.map((b, i) => (
          <div key={b.id} className="branch-card">
            <div className="branch-num">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="branch-name">{b.name}</h3>
            <span className="branch-city">{b.city}, Telangana</span>
            <div className="branch-divider" />
            <ul className="branch-info">
              <li>
                <FaMapMarkerAlt className="bi-icon" />
                <span>{b.address}</span>
              </li>
              <li>
                <FaPhone className="bi-icon" />
                <a href={`tel:${b.phone}`}>{b.phone}</a>
              </li>
              <li>
                <FaClock className="bi-icon" />
                <span>{b.timings}</span>
              </li>
            </ul>
            <div className="branch-actions">
              <a
                href={b.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-gold btn-sm"
              >
                <FaMapMarkerAlt /> Directions
              </a>
              <a
                href={`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(
                  `Hi! I'd like to enquire about jewellery at your ${b.name} showroom in Hyderabad.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="branch-cta-strip">
        <p>Can't visit in person? Explore and order online, we'll deliver to your door.</p>
        <a
          href="https://wa.me/447947134680?text=Hi!%20I%20would%20like%20to%20book%20a%20private%20jewellery%20consultation%20at%20Visista%20Gold%20and%20Diamonds."
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          <FaWhatsapp /> Book Private Consultation
        </a>
      </div>
    </div>
  </section>
);

export default BranchSection;
