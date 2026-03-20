import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
   FaShoppingCart, FaWhatsapp,
   FaInfoCircle, FaWeight, FaSync, FaMinus, FaPlus
} from 'react-icons/fa';
import { allProducts } from '../../data/products';
import { addToCart as addToCartUtil } from '../../utils/whatsapp';
import { useGoldPrice } from '../../context/GoldPriceContext';
import { calculateProductPrice } from '../../services/goldPriceService';
import BuyNowModal from '../BuyNowModal/BuyNowModal';
import { StarRating } from '../Products/ProductCardShared';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { rates, loading: ratesLoading } = useGoldPrice();

  const [product,       setProduct]       = useState(null);
  const [related,       setRelated]       = useState([]);
  const [selectedImg,   setSelectedImg]   = useState(0);
  const [quantity,      setQuantity]      = useState(1);
  const [activeTab,     setActiveTab]     = useState('description');
  const [modalOpen,     setModalOpen]     = useState(false);
  const [cartAdded,     setCartAdded]     = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = allProducts.find(p => String(p.id) === String(id));
    setProduct(found || null);
    if (found) {
      // Update page title for SEO
      document.title = `${found.name} | Visista Gold and Diamonds Hyderabad`;
      setRelated(
        allProducts.filter(p => p.category === found.category && p.id !== found.id).slice(0, 4)
      );
    }
    return () => {
      document.title = 'Visista Gold and Diamonds | Telugu Bridal Jewellery Hyderabad';
    };
  }, [id]);

  if (!product) {
    return (
      <div className="pd-not-found">
        <div className="page-header"><div className="container"><h1>Product Not Found</h1></div></div>
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <p style={{ marginBottom: 24 }}>This product doesn't exist or has been removed.</p>
          <Link to="/shop" className="btn btn-primary">Browse All Collections</Link>
        </div>
      </div>
    );
  }

  const pricing = calculateProductPrice(product, rates);

  const handleAddToCart = () => {
    addToCartUtil({ ...product, price: { min: pricing.total } }, quantity);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="product-detail-page">
      {/* Page Header with breadcrumb */}
      <div className="page-header">
        <div className="container">
          <h1>{product.name}</h1>
          <nav aria-label="Breadcrumb">
            <p className="breadcrumb">
              <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /
              <Link to={'/shop/' + product.category}> {product.category}</Link> /
              <span> {product.name}</span>
            </p>
          </nav>
        </div>
      </div>

      {/* Main layout */}
      <div className="container section pd-layout">
        {/* ── Gallery ─────────────────────────────────── */}
        <div className="pd-gallery" aria-label="Product images">
          <div className="pd-main-img">
            <img
              src={images[selectedImg]}
              alt={`${product.name} – ${product.carat} ${product.metal}`}
              onError={e => { e.target.src = '/banner1.png'; }}
            />
            {product.collection && (
              <span className="pd-collection-tag" aria-label={`${product.collection} collection`}>
                {product.collection}
              </span>
            )}
            {product.isNew  && <span className="pd-badge new">New</span>}
            {product.isSale && <span className="pd-badge sale">Sale</span>}
          </div>
          {images.length > 1 && (
            <div className="pd-thumbnails" role="listbox" aria-label="Image thumbnails">
              {images.map((img, i) => (
                <button
                  key={i}
                  role="option"
                  aria-selected={i === selectedImg}
                  className={'pd-thumb' + (i === selectedImg ? ' active' : '')}
                  onClick={() => setSelectedImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    loading="lazy"
                    onError={e => { e.target.src = '/banner1.png'; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info Panel ──────────────────────────────── */}
        <div className="pd-info-panel">
          <span className="pd-cat">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>

          {product.rating > 0 && (
            <div className="pd-rating" aria-label={`Rating: ${product.rating} out of 5`}>
              <StarRating rating={product.rating} />
              <span>{product.rating} / 5</span>
            </div>
          )}

          {/* ── Price Block ─────────────────────────── */}
          <div className="pd-price-block" aria-live="polite" aria-label="Price information">
            {ratesLoading ? (
              <div className="pd-price-loading">
                <FaSync className="spin" aria-hidden="true" /> Calculating live price…
              </div>
            ) : (
              <>
                <div className="pd-total-price">
                  ₹{pricing.total.toLocaleString('en-IN')}
                  <span className="pd-gst-note">incl. 3% GST</span>
                </div>

                <button
                  className="breakdown-toggle"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  aria-expanded={showBreakdown}
                >
                  <FaInfoCircle aria-hidden="true" /> {showBreakdown ? 'Hide' : 'View'} Price Breakdown
                </button>

                {showBreakdown && (
                  <div className="price-breakdown" role="region" aria-label="Price breakdown">
                    <div className="pb-row">
                      <span>Gold Rate ({pricing.karatKey})</span>
                      <span>₹{pricing.ratePerGm.toLocaleString('en-IN')}/g</span>
                    </div>
                    <div className="pb-row">
                      <span>Weight</span>
                      <span>{pricing.weight}g</span>
                    </div>
                    <div className="pb-row">
                      <span>Gold Value</span>
                      <span>₹{pricing.goldValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pb-row">
                      <span>Making Charges</span>
                      <span>₹{pricing.makingCharges.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pb-divider" />
                    <div className="pb-row">
                      <span>Subtotal</span>
                      <span>₹{pricing.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pb-row">
                      <span>GST (3%)</span>
                      <span>₹{pricing.gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pb-divider" />
                    <div className="pb-row pb-total">
                      <span>Total Price</span>
                      <strong>₹{pricing.total.toLocaleString('en-IN')}</strong>
                    </div>
                    <p className="pb-disclaimer">
                      * Live price based on today's Hyderabad gold rate.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── Spec chips ──────────────────────────── */}
          <div className="pd-specs" aria-label="Product specifications">
            {product.carat  && <div className="spec-chip"><span>Karat</span><strong>{product.carat}</strong></div>}
            {product.metal  && <div className="spec-chip"><span>Metal</span><strong>{product.metal}</strong></div>}
            {product.stone  && <div className="spec-chip"><span>Stone</span><strong>{product.stone}</strong></div>}
            {product.weight && (
              <div className="spec-chip">
                <span><FaWeight className="spec-icon" aria-hidden="true" />Weight</span>
                <strong>{product.weight}g</strong>
              </div>
            )}
          </div>

          {/* ── Quantity ────────────────────────────── */}
          <div className="pd-qty-row">
            <label className="pd-qty-label" htmlFor="pd-qty">Quantity</label>
            <div className="pd-qty" role="group" aria-label="Quantity selector">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <FaMinus aria-hidden="true" />
              </button>
              <span id="pd-qty" aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >
                <FaPlus aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ── Action buttons ───────────────────────── */}
          <div className="pd-actions">
            <button
              className={'btn btn-dark pd-add-cart' + (cartAdded ? ' added' : '')}
              onClick={handleAddToCart}
              aria-label={cartAdded ? 'Added to cart' : 'Add to cart'}
            >
              <FaShoppingCart aria-hidden="true" />
              {cartAdded ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(true)}
              aria-label="Buy now"
            >
              Buy Now
            </button>
          </div>

          <a
            href={`https://wa.me/447947134680?text=${encodeURIComponent(
              `Hi! I'm interested in ${product.name} (${product.carat} ${product.metal}) — can you share more details and availability?`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="pd-whatsapp-link"
            aria-label="Enquire about this product on WhatsApp"
          >
            <FaWhatsapp aria-hidden="true" /> Enquire on WhatsApp
          </a>

          <div className="pd-trust" aria-label="Quality certifications">
            <span>BIS Hallmarked</span>
            <span>Certificate Included</span>
            <span>Secure Delivery</span>
          </div>
        </div>
      </div>

      {/* ── Info Tabs ─────────────────────────────────── */}
      <div className="container pd-tabs-wrap">
        <div className="pd-tabs" role="tablist" aria-label="Product information">
          {['description', 'details', 'shipping'].map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={'pd-tab-btn' + (activeTab === tab ? ' active' : '')}
              onClick={() => setActiveTab(tab)}
              id={`tab-${tab}`}
              aria-controls={`tabpanel-${tab}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="pd-tab-content">
          {activeTab === 'description' && (
            <div
              role="tabpanel"
              id="tabpanel-description"
              aria-labelledby="tab-description"
            >
              <p>{product.description || 'A beautiful handcrafted jewellery piece from Visista Gold and Diamonds, Hyderabad.'}</p>
            </div>
          )}
          {activeTab === 'details' && (
            <div
              role="tabpanel"
              id="tabpanel-details"
              aria-labelledby="tab-details"
            >
              <table className="pd-details-table">
                <tbody>
                  <tr><td>Category</td><td>{product.category}</td></tr>
                  <tr><td>Collection</td><td>{product.collection}</td></tr>
                  <tr><td>Metal</td><td>{product.metal}</td></tr>
                  <tr><td>Karat</td><td>{product.carat}</td></tr>
                  <tr><td>Stone</td><td>{product.stone || 'None'}</td></tr>
                  <tr><td>Weight</td><td>{product.weight}g (approx.)</td></tr>
                  <tr><td>Making Charges</td><td>₹{(product.makingCharges || 0).toLocaleString('en-IN')}</td></tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div
              role="tabpanel"
              id="tabpanel-shipping"
              aria-labelledby="tab-shipping"
            >
              <div className="pd-shipping">
                <p><strong>Secure Delivery:</strong> All jewellery is insured and dispatched within 3–5 business days.</p>
                <p><strong>In-store Pickup:</strong> Available at our Jubilee Hills, Kothapet, and Secunderabad showrooms.</p>
                <p><strong>Returns:</strong> Exchange or return within 15 days of purchase with original receipt.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Related Products ──────────────────────────── */}
      {related.length > 0 && (
        <div className="pd-related">
          <div className="container">
            <h2 className="section-title">You May Also Like</h2>
            <div className="gold-divider" style={{ margin: '16px auto 32px' }} />
            <div className="related-grid">
              {related.map(rp => {
                const rPricing = calculateProductPrice(rp, rates);
                return (
                  <Link key={rp.id} to={'/product/' + rp.id} className="related-card">
                    <div className="rc-img">
                      <img
                        src={rp.image}
                        alt={`${rp.name} – ${rp.carat} ${rp.metal}`}
                        loading="lazy"
                        onError={e => { e.target.src = '/banner1.png'; }}
                      />
                    </div>
                    <div className="rc-body">
                      <span className="rc-cat">{rp.category}</span>
                      <h4>{rp.name}</h4>
                      <strong>₹{rPricing.total.toLocaleString('en-IN')}</strong>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <BuyNowModal
        product={{ ...product, price: { min: pricing.total } }}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ProductDetail;
