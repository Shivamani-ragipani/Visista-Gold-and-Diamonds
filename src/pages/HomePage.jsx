import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone, FaInstagram, FaArrowRight } from 'react-icons/fa';
import './HomePage.css';
import HeroSlider        from '../components/HeroSlider/HeroSlider';
import FeaturedProducts  from '../components/Products/FeaturedProducts';
import LatestProducts    from '../components/Products/LatestProducts';
import Testimonials      from '../components/Testimonials/Testimonials';
import FeaturedCategories from '../components/Categories/FeaturedCategories';
import ServiceFeatures   from './ServiceFeatures';
import BranchSection     from '../components/Branches/BranchSection';
import BlogSection       from '../components/Blog/BlogSection';

const spotlights = [
  {
    label: 'Bridal Collection',
    title: 'Your Bridal\nDream Awaits',
    desc: 'Telugu bridal sets crafted in 22K gold, natural diamonds & Polki',
    bg: '/ragipanis imgs/Necklaces/necklace1.jpg',
    link: '/shop',
    cta: 'Explore Bridal',
  },
  {
    label: 'Diamond Collection',
    title: 'Diamonds\nFor Life',
    desc: 'GIA-certified natural diamonds in 18K & 22K gold settings',
    bg: '/ragipanis imgs/earrings/earring1.jpg',
    link: '/shop',
    cta: 'Shop Diamonds',
  },
  {
    label: 'Heritage Polki',
    title: 'Uncut Beauty,\nTimeless Art',
    desc: 'Authentic Polki jewellery — the uncut diamond masterpiece',
    bg: '/ragipanis imgs/rings/ring1.jpg',
    link: '/shop',
    cta: 'Discover Polki',
  },
];

const HomePage = () => (
  <div className="home-page">

    {/* ── Hero Slider ─────────────────────────────────── */}
    <HeroSlider />

    {/* ── Trust Bar ───────────────────────────────────── */}
    <ServiceFeatures />

    {/* ── Shop by Category ────────────────────────────── */}
    <section className="section bg-cream" aria-label="Shop by category">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Collections</span>
          <h2 className="section-title">Shop by Category</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            From everyday gold to rare Polki masterpieces
          </p>
        </div>
        <FeaturedCategories />
      </div>
    </section>

    {/* ── Bridal Banner ───────────────────────────────── */}
    <section className="bridal-banner" aria-label="Telugu Bridal Collection">
      <div className="bridal-inner">
        <span className="section-label">Telugu Bridal Collection</span>
        <h2 className="section-title-white">
          Made for Your Most<br />Precious Day
        </h2>
        <p className="bridal-sub">
          Timeless necklaces, maang tikka, jhumkas, bangles &amp; harams —<br />
          crafted in pure gold, natural diamonds &amp; Polki
        </p>
        <div className="bridal-ctas">
          <Link to="/shop" className="btn btn-primary btn-lg">
            Explore Bridal
          </Link>
          <a
            href="https://wa.me/447947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20Telugu%20Bridal%20Jewellery%20collections."
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-lg"
            aria-label="Book bridal consultation on WhatsApp"
          >
            <FaWhatsapp aria-hidden="true" /> Book Consultation
          </a>
        </div>
      </div>
    </section>

    {/* ── Featured Products ───────────────────────────── */}
    <section className="section" aria-label="Featured jewellery">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Curated For You</span>
          <h2 className="section-title">Featured Pieces</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Hand-selected jewellery of exceptional craftsmanship</p>
        </div>
        <FeaturedProducts />
        <div className="view-all-wrap">
          <Link to="/shop" className="btn btn-dark">
            View All Collections <FaArrowRight style={{ marginLeft: 4 }} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>

    {/* ── Spotlight Grid (3 collection cards) ─────────── */}
    <section className="section-sm bg-cream" aria-label="Collections by style">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Premium Selection</span>
          <h2 className="section-title">Collections by Style</h2>
          <div className="gold-divider" />
        </div>
        <div className="spotlight-grid">
          {spotlights.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              className="spotlight-card"
              style={{ backgroundImage: `url(${s.bg})` }}
              aria-label={`${s.label} – ${s.cta}`}
            >
              <div className="spotlight-overlay" aria-hidden="true" />
              <div className="spotlight-content">
                <span className="spotlight-label">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="spotlight-line" aria-hidden="true" />
                <span className="spotlight-cta">{s.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ── New Arrivals ─────────────────────────────────── */}
    <section className="section" aria-label="New arrivals">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Fresh Arrivals</span>
          <h2 className="section-title">New This Season</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">The latest additions to our exclusive collections</p>
        </div>
        <LatestProducts />
      </div>
    </section>

    {/* ── WhatsApp Band ────────────────────────────────── */}
    <div className="wa-band" role="complementary" aria-label="WhatsApp contact">
      <div className="container wa-band-inner">
        <div className="wa-band-text">
          <span className="section-label">Instant Enquiry</span>
          <h2>Chat With Us on WhatsApp</h2>
          <p>Get personalised recommendations, check availability or book a showroom visit</p>
        </div>
        <div className="wa-band-actions">
          <a
            href="https://wa.me/447947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20jewellery%20at%20Visista%20Gold%20and%20Diamonds."
            target="_blank"
            rel="noreferrer"
            className="btn-wa-large"
            aria-label="Start WhatsApp conversation"
          >
            <FaWhatsapp style={{ fontSize: 18 }} aria-hidden="true" />
            WhatsApp Enquiry
          </a>
          <a href="tel:07947134680" className="btn btn-secondary" aria-label="Call Visista Gold and Diamonds">
            <FaPhone aria-hidden="true" /> Call Us
          </a>
        </div>
      </div>
    </div>

    {/* ── Testimonials ─────────────────────────────────── */}
    <section className="section testimonials-section" aria-label="Customer testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Customer Stories</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Thousands of happy customers across Hyderabad</p>
        </div>
        <Testimonials />
      </div>
    </section>

    {/* ── Branches ─────────────────────────────────────── */}
    <BranchSection />

    {/* ── Blog / Articles ──────────────────────────────── */}
    <section className="section bg-ivory" aria-label="Jewellery journal">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Jewellery Journal</span>
          <h2 className="section-title">Stories & Inspiration</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Guides, care tips, and bridal jewellery inspiration</p>
        </div>
        <BlogSection />
      </div>
    </section>

    {/* ── Instagram CTA ────────────────────────────────── */}
    <section className="section-sm insta-cta-section" aria-label="Follow us on Instagram">
      <div className="container insta-cta-inner">
        <span className="section-label">Follow Our Journey</span>
        <h2 className="insta-cta-title">@visistagoldanddiamonds_</h2>
        <p className="insta-cta-sub">
          Daily jewellery inspiration, bridal looks &amp; behind-the-scenes craftsmanship
        </p>
        <a
          href="https://www.instagram.com/visistagoldanddiamonds_/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary insta-cta-btn"
          aria-label="Follow Visista Gold and Diamonds on Instagram"
        >
          <FaInstagram style={{ fontSize: 16 }} aria-hidden="true" />
          Follow on Instagram
        </a>
      </div>
    </section>

  </div>
);

export default HomePage;
