import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaPhone, FaWhatsapp, FaClock,
  FaInstagram, FaCheckCircle
} from 'react-icons/fa';
import branches from '../data/branches';
import './ContactPage.css';

const ContactPage = () => {
  const [form,     setForm]     = useState({ name: '', email: '', phone: '', branch: '', message: '' });
  const [sent,     setSent]     = useState(false);
  const [activeMap,setActiveMap] = useState(0);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const msg = encodeURIComponent(
      `Hi! I have an enquiry from your website.\n\nName: ${form.name}\nPhone: ${form.phone || 'Not provided'}\nEmail: ${form.email || 'Not provided'}\nPreferred Branch: ${form.branch || 'Any showroom'}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/447947134680?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 7000);
    setForm({ name: '', email: '', phone: '', branch: '', message: '' });
  };

  return (
    <div className="contact-page">

      {/* ── Page Header ─────────────────────────────── */}
      <div className="page-header">
        <div className="container">
          <h1>Contact <em>Us</em></h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Contact
          </p>
        </div>
      </div>

      {/* ── Branch Cards ────────────────────────────── */}
      <section className="section-sm bg-cream">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <span className="section-label">Our Showrooms</span>
            <h2 className="section-title">Find Us in Hyderabad</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">Three premium locations across the city</p>
          </div>

          <div className="contact-branches-grid">
            {branches.map(b => (
              <div key={b.id} className="contact-branch-card">
                <h3>{b.name}</h3>
                <ul>
                  <li><FaMapMarkerAlt className="ci" /><span>{b.address}</span></li>
                  <li><FaPhone className="ci" /><a href={`tel:${b.phone}`}>{b.phone}</a></li>
                  <li><FaClock className="ci" /><span>{b.timings}</span></li>
                </ul>
                <div className="cb-actions">
                  <a href={b.mapUrl} target="_blank" rel="noreferrer"
                     className="btn btn-outline-gold btn-sm">
                    <FaMapMarkerAlt /> Directions
                  </a>
                  <a
                    href={`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(
                      `Hi! I'd like to enquire about visiting your ${b.name} showroom.`
                    )}`}
                    target="_blank" rel="noreferrer"
                    className="btn-wa-sm"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">

            {/* Form */}
            <div className="contact-form-wrap">
              <h2 className="contact-form-title">Send Us a Message</h2>
              <p className="contact-form-sub">
                We'll respond via WhatsApp within a few hours. For urgent queries, call us directly.
              </p>

              {sent ? (
                <div className="contact-success">
                  <FaCheckCircle style={{ fontSize: 40, color: '#25D366' }} />
                  <h3>Message Sent!</h3>
                  <p>You've been redirected to WhatsApp. We'll respond shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        name="name" value={form.name}
                        onChange={handleChange} required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        name="phone" value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        name="email" type="email" value={form.email}
                        onChange={handleChange} placeholder="Optional"
                      />
                    </div>
                    <div className="form-group">
                      <label>Preferred Showroom</label>
                      <select name="branch" value={form.branch} onChange={handleChange}>
                        <option value="">Any showroom</option>
                        {branches.map(b => (
                          <option key={b.id} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} rows={5} required
                      placeholder="Tell us how we can help — bridal enquiry, gold rates, diamond consultation, custom design..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-whatsapp"
                    style={{ padding: '16px 32px', fontSize: 12, letterSpacing: 2, justifyContent: 'center' }}
                  >
                    <FaWhatsapp style={{ fontSize: 16 }} />
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="contact-info-wrap">
              <div className="contact-info-item">
                <div className="ci-icon"><FaPhone /></div>
                <div>
                  <h4>Phone</h4>
                  <p><a href="tel:07947134680">07947 134 680</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="ci-icon"><FaWhatsapp /></div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>
                    <a href="https://wa.me/447947134680" target="_blank" rel="noreferrer">
                      Chat with us on WhatsApp
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="ci-icon"><FaInstagram /></div>
                <div>
                  <h4>Instagram</h4>
                  <p>
                    <a href="https://www.instagram.com/visistagoldanddiamonds_/" target="_blank" rel="noreferrer">
                      @visistagoldanddiamonds_
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="ci-icon"><FaClock /></div>
                <div>
                  <h4>Showroom Hours</h4>
                  <p>Monday – Saturday: 10:00 AM – 8:00 PM<br />Sunday: By Appointment</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="ci-icon"><FaMapMarkerAlt /></div>
                <div>
                  <h4>Locations</h4>
                  <p>Jubilee Hills · Kothapet · Secunderabad (RP Road)<br />Hyderabad, Telangana</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Map Section ──────────────────────────────── */}
      <section className="contact-map-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Showroom Locations</span>
            <h2 className="section-title">Find Our Showrooms</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">Select a branch to view its location</p>
          </div>

          <div className="map-tabs">
            {branches.map((b, i) => (
              <button
                key={b.id}
                className={`map-tab${activeMap === i ? ' active' : ''}`}
                onClick={() => setActiveMap(i)}
              >
                {b.name}
              </button>
            ))}
          </div>

          <iframe
            className="map-frame"
            src={branches[activeMap].mapEmbed}
            title={`${branches[activeMap].name} location`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
