import React from 'react';
import { Link } from 'react-router-dom';
import { FaGem, FaAward, FaHeart, FaHandshake, FaInstagram, FaWhatsapp, FaPhone } from 'react-icons/fa';
import BrandSlider from '../components/BrandSlider/BrandSlider';
import './AboutPage.css';

const values = [
  { icon: <FaGem />,       title: 'Certified Quality',    text: 'Every piece is BIS Hallmarked. Our diamonds are GIA-certified natural stones — no compromise, ever.' },
  { icon: <FaAward />,     title: 'Generations of Trust', text: 'Trusted by Telugu families across Hyderabad for bridal sets, gifting, and heirloom jewellery.' },
  { icon: <FaHeart />,     title: 'Crafted with Love',    text: 'Our artisans pour tradition and precision into every Polki, gold, and diamond creation.' },
  { icon: <FaHandshake />, title: 'Personalised Service', text: 'Visit any of our 3 showrooms — our staff will guide you like family, not a sales counter.' },
];

const stats = [
  { num: '500+', label: 'Bridal Sets Delivered' },
  { num: '15+',  label: 'Years of Excellence'   },
  { num: '3',    label: 'Premium Showrooms'      },
  { num: '4.9★', label: 'Customer Rating'        },
];

const AboutPage = () => (
  <div className="about-page">

    {/* ── Header ──────────────────────────────────── */}
    <div className="page-header">
      <div className="container">
        <h1>About <em>Visista Gold &amp; Diamonds</em></h1>
        <p className="breadcrumb">
          <Link to="/">Home</Link> / About Us
        </p>
      </div>
    </div>

    {/* ── Story ───────────────────────────────────── */}
    <section className="section">
      <div className="container about-story">
        <div className="about-story-text">
          <span className="section-label">Our Story</span>
          <h2 className="section-title">Hyderabad's Home for<br />Bridal Jewellery</h2>
          <div className="gold-divider gold-divider-left" />
          <p>
            Visista Gold and Diamonds was born from a deep-rooted passion for Telugu bridal traditions
            and the timeless beauty of gold and diamond jewellery. With showrooms in Jubilee Hills,
            Kothapet, and Secunderabad, we bring the finest craftsmanship to brides and families
            across Hyderabad.
          </p>
          <p>
            Our collection spans 22K and 24K hallmarked gold, GIA-certified natural diamonds, and
            traditional Polki jewellery — all crafted by skilled artisans who honour centuries of
            South Indian goldsmithing heritage.
          </p>
          <p>
            We believe jewellery is not just an accessory — it is a legacy. Every piece we create
            is designed to be passed down through generations, carrying the stories of the families
            who wore it.
          </p>
          <div className="about-ctas">
            <Link to="/shop" className="btn btn-primary">Explore Collections</Link>
            <a
              href="https://wa.me/917947134680?text=Hi!%20I%20would%20like%20to%20book%20a%20consultation%20at%20Visista%20Gold%20and%20Diamonds."
              target="_blank" rel="noreferrer"
              className="btn btn-dark"
            >
              <FaWhatsapp /> Book Appointment
            </a>
          </div>
        </div>

        <div className="about-story-img">
          <img
            src="/showroom.png"
            alt="Visista Gold showroom"
            onError={e => { e.target.src = '/banner1.png'; }}
          />
          <div className="about-img-badge">
            <span className="badge-num">3</span>
            <span className="badge-text">Showrooms<br />in Hyderabad</span>
          </div>
        </div>
      </div>
    </section>

    {/* ── Stats ───────────────────────────────────── */}
    <div className="stats-strip">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">
              {s.num.includes('★')
                ? <>{s.num.replace('★','')}<span style={{color:'var(--gold)'}}>★</span></>
                : s.num.includes('+')
                  ? <>{s.num.replace('+','')}<span style={{color:'var(--gold)'}}>+</span></>
                  : s.num
              }
            </div>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Values ──────────────────────────────────── */}
    <section className="section bg-cream">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Promise</span>
          <h2 className="section-title">Why Choose Visista</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Four pillars that define everything we do</p>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Trust Badges ────────────────────────────── */}
    <section className="section-sm">
      <div className="container">
        <BrandSlider />
      </div>
    </section>

    {/* ── CTA Band ────────────────────────────────── */}
    <div
      style={{
        background: 'linear-gradient(135deg, var(--maroon-deep), var(--maroon), #3D1520)',
        padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.1) 0%, transparent 60%)'
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-label">Visit Us Today</span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,44px)',
          color: 'var(--white)', fontWeight: 700, marginBottom: 14, lineHeight: 1.2
        }}>
          Experience Visista in Person
        </h2>
        <p style={{
          fontFamily: 'var(--font-elegant)', fontSize: 18, fontStyle: 'italic',
          color: 'rgba(255,255,255,0.6)', marginBottom: 36
        }}>
          Three premium showrooms across Hyderabad — walk in and let us guide you
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:07947134680" className="btn btn-primary">
            <FaPhone /> Call Us Now
          </a>
          <a
            href="https://wa.me/917947134680?text=Hi!%20I'd%20like%20to%20visit%20a%20Visista%20showroom."
            target="_blank" rel="noreferrer"
            className="btn btn-whatsapp"
          >
            <FaWhatsapp /> WhatsApp Us
          </a>
          <a
            href="https://www.instagram.com/visistagoldanddiamonds_/"
            target="_blank" rel="noreferrer"
            className="btn btn-secondary"
          >
            <FaInstagram /> Follow on Instagram
          </a>
        </div>
      </div>
    </div>

  </div>
);

export default AboutPage;
