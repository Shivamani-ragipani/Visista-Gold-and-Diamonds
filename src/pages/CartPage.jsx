import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import { getCart, saveCart, removeFromCart, updateCartQty, getCartTotal } from '../utils/whatsapp';
import BuyNowModal from '../components/BuyNowModal/BuyNowModal';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { setCartItems(getCart()); }, []);

  const refresh = () => setCartItems(getCart());

  const handleRemove = (id) => { removeFromCart(id); refresh(); };
  const handleQty    = (id, qty) => { updateCartQty(id, qty); refresh(); };
  const handleClear  = () => { saveCart([]); refresh(); };

  const subtotal = getCartTotal(cartItems);
  const gst      = Math.round(subtotal * 0.03);
  const total    = subtotal + gst;

  // Empty state
  if (!cartItems.length) {
    return (
      <div className="cart-empty-page">
        <div className="page-header">
          <div className="container">
            <h1>My Cart</h1>
          </div>
        </div>
        <div className="container cart-empty">
          <FaShoppingBag className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Discover our beautiful jewellery collections and add your favourites</p>
          <Link to="/shop" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <div className="container">
          <h1>My Cart</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / Cart
          </p>
        </div>
      </div>

      <div className="container cart-layout">

        {/* ── Items ─────────────────────────────────────── */}
        <div className="cart-items">
          <div className="cart-header-row">
            <h3 className="cart-count-title">
              {cartItems.length} Item{cartItems.length !== 1 ? 's' : ''} Selected
            </h3>
            <button className="clear-cart" onClick={handleClear}>Clear All</button>
          </div>

          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-img">
                <img
                  src={item.image} alt={item.name}
                  onError={e => { e.target.src = '/banner1.png'; }}
                />
              </Link>

              <div className="cart-item-info">
                <span className="cart-item-cat">{item.category}</span>
                <Link to={`/product/${item.id}`}>
                  <h4>{item.name}</h4>
                </Link>
                {item.metal && (
                  <span className="cart-item-meta">
                    {item.metal} · {item.carat}
                    {item.weight ? ` · ${item.weight}g` : ''}
                  </span>
                )}
                <div className="cart-item-price">
                  ₹{(item.price?.min || item.price || 0).toLocaleString('en-IN')}
                </div>
              </div>

              <div className="cart-item-qty">
                <button
                  onClick={() => handleQty(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQty(item.id, item.quantity + 1)}>
                  <FaPlus />
                </button>
              </div>

              <div className="cart-item-total">
                ₹{((item.price?.min || item.price || 0) * item.quantity).toLocaleString('en-IN')}
              </div>

              <button
                className="cart-remove"
                onClick={() => handleRemove(item.id)}
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <Link to="/shop" className="btn btn-outline-gold btn-sm" style={{ marginTop: 32, alignSelf: 'flex-start' }}>
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>

        {/* ── Summary ───────────────────────────────────── */}
        <div className="cart-summary">
          <div className="summary-header">Order Summary</div>

          <div className="summary-rows">
            {cartItems.map(item => (
              <div key={item.id} className="summary-row">
                <span style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.name} × {item.quantity}
                </span>
                <strong>
                  ₹{((item.price?.min || item.price || 0) * item.quantity).toLocaleString('en-IN')}
                </strong>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="summary-rows" style={{ marginBottom: 0 }}>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong style={{ color: 'rgba(255,255,255,0.8)' }}>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <div className="summary-row">
              <span>GST (3%)</span>
              <strong style={{ color: 'rgba(255,255,255,0.8)' }}>₹{gst.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total Amount</span>
            <span className="summary-total-amount">₹{total.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-checkout">
            <button
              className="btn btn-primary btn-checkout"
              onClick={() => setModalOpen(true)}
            >
              Proceed to Order
            </button>
            <a
              href="https://wa.me/447947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20placing%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ justifyContent: 'center' }}
            >
              <FaWhatsapp /> WhatsApp Enquiry
            </a>
          </div>

          <div className="summary-note">
            <FaWhatsapp />
            <span>You'll confirm your order via WhatsApp after checkout</span>
          </div>
        </div>

      </div>

      <BuyNowModal
        cartItems={cartItems}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CartPage;
