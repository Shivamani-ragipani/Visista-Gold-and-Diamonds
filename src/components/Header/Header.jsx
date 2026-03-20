import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaPhone, FaInstagram, FaWhatsapp, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled,  setIsScrolled] = useState(false);
  const [cartCount,   setCartCount]  = useState(0);
  const navRef = useRef(null);

  /* Cart count from localStorage */
  useEffect(() => {
    const update = () => {
      const count = JSON.parse(localStorage.getItem('cartCount')) || 0;
      setCartCount(count);
    };
    update();
    window.addEventListener('cartCountUpdated', update);
    return () => window.removeEventListener('cartCountUpdated', update);
  }, []);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Top bar */}
      <div className="top-bar" role="complementary" aria-label="Contact information">
        <div className="container">
          <span className="top-phone">
            <FaPhone className="top-icon" aria-hidden="true" />
            <a href="tel:917947134680" aria-label="Call us">07947 134 680</a>
          </span>
          <span className="top-brand" aria-hidden="true">
            ✦ Telugu Bridal · Gold · Natural Diamonds · Polki ✦
          </span>
          <a
            href="https://www.instagram.com/visistagoldanddiamonds_/"
            target="_blank"
            rel="noreferrer"
            className="top-insta"
            aria-label="Follow us on Instagram"
          >
            <FaInstagram aria-hidden="true" />
            <span className="top-insta-handle">@visistagoldanddiamonds_</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className={`header${isScrolled ? ' scrolled' : ''}`} role="banner">
        <div className="container header-inner">

          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu} aria-label="Visista Gold and Diamonds - Home">
            <span className="logo-main">VISISTA</span>
            <span className="logo-sub">Gold &amp; Diamonds</span>
          </Link>

         <nav
  ref={navRef}
  id="main-nav"
  className={`main-nav${isMenuOpen ? ' open' : ''}`}
  aria-label="Main navigation"
>
            {/* Mobile nav close button */}
            <button
              className="mobile-nav-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            {/* Mobile nav brand */}
            <div className="mobile-nav-brand" aria-hidden="true">
              <span className="mnb-main">VISISTA</span>
              <span className="mnb-sub">Gold &amp; Diamonds</span>
            </div>

            <ul role="menubar">
              <li role="none">
                <NavLink to="/" end onClick={closeMenu} role="menuitem">Home</NavLink>
              </li>
              <li className="has-dropdown" role="none">
                <NavLink to="/shop" onClick={closeMenu} role="menuitem">Collections</NavLink>
                <div className="dropdown-menu" role="menu" aria-label="Collections submenu">
                  <div className="dropdown-content">
                    <div className="dropdown-column">
                      <h4>By Category</h4>
                      <ul>
                        <li><Link to="/shop/Rings"     onClick={closeMenu}>Rings</Link></li>
                        <li><Link to="/shop/Necklaces" onClick={closeMenu}>Necklaces</Link></li>
                        <li><Link to="/shop/Earrings"  onClick={closeMenu}>Earrings</Link></li>
                        <li><Link to="/shop/Bracelets" onClick={closeMenu}>Bracelets</Link></li>
                      </ul>
                    </div>
                    <div className="dropdown-column">
                      <h4>By Collection</h4>
                      <ul>
                        <li><Link to="/shop" onClick={closeMenu}>Gold Collection</Link></li>
                        <li><Link to="/shop" onClick={closeMenu}>Diamond Collection</Link></li>
                        <li><Link to="/shop" onClick={closeMenu}>Bridal Collection</Link></li>
                        <li><Link to="/shop" onClick={closeMenu}>Polki Collection</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li role="none">
                <NavLink to="/about"   onClick={closeMenu} role="menuitem">About</NavLink>
              </li>
              <li role="none">
                <NavLink to="/contact" onClick={closeMenu} role="menuitem">Contact</NavLink>
              </li>
            </ul>

            {/* Mobile-only bottom actions inside nav */}
            <div className="mobile-nav-footer">
              <a
                href="https://wa.me/917947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20Visista%20Gold%20and%20Diamonds%20jewellery."
                target="_blank"
                rel="noreferrer"
                className="mobile-nav-wa"
                onClick={closeMenu}
                aria-label="WhatsApp enquiry"
              >
                <FaWhatsapp aria-hidden="true" /> WhatsApp Enquiry
              </a>
              <a href="tel:07947134680" className="mobile-nav-call" onClick={closeMenu}>
                <FaPhone aria-hidden="true" /> 07947 134 680
              </a>
            </div>
          </nav>

          {/* Overlay */}
          {isMenuOpen && (
            <div
              className="nav-overlay"
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}

          {/* Actions */}
          <div className="header-actions">
            <a
              href="https://wa.me/917947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20Visista%20Gold%20and%20Diamonds%20jewellery."
              target="_blank"
              rel="noreferrer"
              className="header-wa-btn"
              aria-label="WhatsApp enquiry"
            >
              <FaWhatsapp aria-hidden="true" /> Enquire
            </a>

            <Link to="/cart" className="cart-btn" aria-label={`Cart, ${cartCount} items`}>
              <FaShoppingCart aria-hidden="true" />
              {cartCount > 0 && (
                <span className="cart-count" aria-live="polite">{cartCount}</span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className={`hamburger${isMenuOpen ? ' open' : ''}`}
              onClick={() => setIsMenuOpen(v => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="main-nav"
            >
              <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            </button>
          </div>

        </div>
      </header>
    </>
  );
};

export default Header;
