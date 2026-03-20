import React, { useState, useEffect } from 'react';
import { FaTimes, FaWhatsapp, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { buildWhatsAppMessage } from '../../utils/whatsapp';
import branches from '../../data/branches';
import './BuyNowModal.css';

const INITIAL = {
  fullName: '', phone: '', email: '',
  address: '', city: '', branch: '', notes: ''
};

const BuyNowModal = ({ product, cartItems, isOpen, onClose }) => {
  const [form,   setForm]   = useState(INITIAL);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const items = product
    ? [{ ...product, quantity: 1 }]
    : (cartItems || []);

  const subtotal = items.reduce((s, i) => s + (i.price?.min || i.price || 0) * i.quantity, 0);
  const total    = Math.round(subtotal * 1.03);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName = 'Full name is required';
    if (!form.phone.trim())     e.phone    = 'Phone number is required';
    else if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const url = buildWhatsAppMessage({ customer: form, cartItems: items, total });
    window.open(url, '_blank');
    onClose();
    setForm(INITIAL);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        {/* Header */}
        <div className="modal-header">
          <span className="modal-tag">Enquire / Order</span>
          <h2 className="modal-title">Complete Your Purchase</h2>
          <p className="modal-sub">Fill in your details — we'll confirm via WhatsApp</p>
        </div>

        {/* Order summary */}
        <div className="modal-summary">
          {items.map(item => (
            <div key={item.id} className="modal-item">
              <img
                src={item.image} alt={item.name}
                onError={e => { e.target.src = '/banner1.png'; }}
              />
              <div>
                <strong>{item.name}</strong>
                <span>{item.category} &nbsp;·&nbsp; Qty: {item.quantity}</span>
              </div>
              <span className="modal-price">
                ₹{((item.price?.min || item.price || 0) * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
          <div className="modal-total">
            <span>Total (incl. 3% GST)</span>
            <strong>₹{total.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit} noValidate>

          <div className="form-section-title">Your Details</div>

          <div className="form-row">
            <div className={`form-group${errors.fullName ? ' has-error' : ''}`}>
              <label><FaUser style={{fontSize:9}} /> Full Name <span className="req">*</span></label>
              <input
                name="fullName" value={form.fullName}
                onChange={handleChange} placeholder="Your full name"
              />
              {errors.fullName && <span className="form-error">⚠ {errors.fullName}</span>}
            </div>
            <div className={`form-group${errors.phone ? ' has-error' : ''}`}>
              <label><FaPhone style={{fontSize:9}} /> WhatsApp Number <span className="req">*</span></label>
              <input
                name="phone" value={form.phone}
                onChange={handleChange} placeholder="+91 98765 43210"
              />
              {errors.phone && <span className="form-error">⚠ {errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group${errors.email ? ' has-error' : ''}`}>
              <label><FaEnvelope style={{fontSize:9}} /> Email</label>
              <input
                name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="Optional"
              />
              {errors.email && <span className="form-error">⚠ {errors.email}</span>}
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                name="city" value={form.city}
                onChange={handleChange} placeholder="Hyderabad"
              />
            </div>
          </div>

          <div className="form-group">
            <label><FaMapMarkerAlt style={{fontSize:9}} /> Delivery Address</label>
            <input
              name="address" value={form.address}
              onChange={handleChange} placeholder="Your full address (optional)"
            />
          </div>

          <div className="form-section-title" style={{marginTop:8}}>Showroom &amp; Notes</div>

          <div className="form-group">
            <label>Preferred Showroom</label>
            <select name="branch" value={form.branch} onChange={handleChange}>
              <option value="">Select a showroom (optional)</option>
              {branches.map(b => (
                <option key={b.id} value={b.name}>{b.name} — {b.city}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Special Notes</label>
            <textarea
              name="notes" value={form.notes}
              onChange={handleChange} rows={3}
              placeholder="Custom sizing, occasion, design preferences..."
            />
          </div>

          <button type="submit" className="btn-whatsapp-full">
            <FaWhatsapp /> Confirm &amp; Send on WhatsApp
          </button>
          <p className="modal-form-note">
            You'll be redirected to WhatsApp with your full order details pre-filled
          </p>
        </form>
      </div>
    </div>
  );
};

export default BuyNowModal;
