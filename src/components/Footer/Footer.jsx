import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhone, FaInstagram, FaMapMarkerAlt, FaWhatsapp,
  FaClock, FaHeart
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer">

    {/* ── Announcement Band ──────────────────────────── */}
    <div className="footer-top-band">
      <div className="container footer-top-band-inner">
        <div className="footer-band-item">
          <FaPhone /><span>07947 134 680</span>
        </div>
        <div className="footer-band-item">
          <FaMapMarkerAlt /><span>3 Showrooms — Jubilee Hills · Kothapet · Secunderabad</span>
        </div>
        <div className="footer-band-item">
          <FaClock /><span>Mon–Sat: 10 AM – 8 PM</span>
        </div>
      </div>
    </div>

    {/* ── Main Footer ────────────────────────────────── */}
    <div className="footer-main">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-main">VISISTA</span>
              <span className="footer-logo-sub">Gold &amp; Diamonds</span>
            </Link>
            <div className="footer-col-divider" />
            <p className="footer-tagline">
              Hyderabad's most trusted name in Telugu Bridal jewellery,
              Natural Diamonds, 22K &amp; 24K Gold, and Polki —
              serving generations of families.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/visistagoldanddiamonds_/"
                target="_blank" rel="noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/447947134680"
                target="_blank" rel="noreferrer"
                className="footer-social-link"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="tel:07947134680"
                className="footer-social-link"
                aria-label="Phone"
              >
                <FaPhone />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-heading">Collections</h4>
            <ul>
              <li><Link to="/shop/Rings">Rings</Link></li>
              <li><Link to="/shop/Necklaces">Necklaces</Link></li>
              <li><Link to="/shop/Earrings">Earrings</Link></li>
              <li><Link to="/shop/Bracelets">Bracelets &amp; Bangles</Link></li>
              <li><Link to="/shop">Bridal Sets</Link></li>
              <li><Link to="/shop">Polki Collection</Link></li>
              <li><Link to="/shop">Diamond Collection</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Information</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li>
                <a
                  href="https://www.justdial.com/search?q=Visista+Gold+%26+Diamonds+Hyderabad"
                  target="_blank" rel="noreferrer"
                >
                  JustDial Reviews
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447947134680?text=Hi!%20I%20would%20like%20to%20book%20a%20consultation."
                  target="_blank" rel="noreferrer"
                >
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Visit Us</h4>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt className="fc-icon" />
                <span>
                  Jubilee Hills, Kothapet &amp; Secunderabad<br />
                  Hyderabad, Telangana
                </span>
              </li>
              <li>
                <FaPhone className="fc-icon" />
                <a href="tel:07947134680">07947 134 680</a>
              </li>
              <li>
                <FaWhatsapp className="fc-icon" />
                <a href="https://wa.me/447947134680" target="_blank" rel="noreferrer">
                  WhatsApp Enquiry
                </a>
              </li>
              <li>
                <FaInstagram className="fc-icon" />
                <a href="https://www.instagram.com/visistagoldanddiamonds_/" target="_blank" rel="noreferrer">
                  @visistagoldanddiamonds_
                </a>
              </li>
              <li>
                <FaClock className="fc-icon" />
                <span>Mon–Sat: 10:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    {/* ── Bottom Bar ─────────────────────────────────── */}
    <div className="footer-bottom">
      <div className="container footer-bottom-inner">
        <span>© {new Date().getFullYear()} Visista Gold and Diamonds. All rights reserved.</span>
        <span className="made-with">
          Made with <FaHeart className="heart" /> in Hyderabad
        </span>
        <div className="footer-bottom-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="https://wa.me/447947134680" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
