import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalf, FaShoppingCart, FaWeight, FaHeart } from 'react-icons/fa';
import { addToCart } from '../../utils/whatsapp';
import { useGoldPrice } from '../../context/GoldPriceContext';
import { calculateProductPrice } from '../../services/goldPriceService';
import BuyNowModal from '../BuyNowModal/BuyNowModal';
import './ProductCardShared.css';

/* ── Star Rating ────────────────────────────────────── */
export const StarRating = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {Array.from({ length: full }).map((_, i) => <FaStar key={i} />)}
      {half && <FaStarHalf />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <FaStar key={'e' + i} className="star-empty" />
      ))}
    </span>
  );
};

/* ── Collection colour map ──────────────────────────── */
const collectionStyles = {
  Bridal:  { bg: 'rgba(91,31,42,0.85)',   label: '♛ Bridal'   },
  Diamond: { bg: 'rgba(15,60,100,0.85)',  label: '◈ Diamond'  },
  Polki:   { bg: 'rgba(80,30,120,0.85)',  label: '❋ Polki'    },
  Gold:    { bg: 'rgba(100,65,10,0.85)',  label: '⬡ Gold'     },
};

/* ── Card Component ─────────────────────────────────── */
const ProductCardShared = ({ product, animDelay = 0 }) => {
  const { rates, loading: ratesLoading } = useGoldPrice();
  const [modalOpen, setModalOpen] = useState(false);
  const [added,     setAdded]     = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const pricing = calculateProductPrice(product, rates);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, price: { min: pricing.total, max: pricing.total } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const cStyle = collectionStyles[product.collection] || null;

  return (
    <>
      <div
        className="pcard"
        style={animDelay ? { animationDelay: `${animDelay}ms` } : undefined}
      >
        {/* ── Image ───────────────────────────────────── */}
        <Link to={'/product/' + product.id} className="pcard-img-wrap">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={e => { e.target.src = '/banner1.png'; }}
          />

          {/* New badge */}
          {product.isNew  && <span className="pcard-badge new">New</span>}
          {product.isSale && <span className="pcard-badge sale">Sale</span>}

          {/* Collection tag — only if no badge occupies top-right */}
          {cStyle && (
            <span
              className="pcard-collection"
              style={{ background: cStyle.bg }}
            >
              {cStyle.label}
            </span>
          )}

          {/* Hover overlay */}
          <div className="pcard-overlay">
            <span className="pcard-quick">View Details</span>
          </div>
        </Link>

        {/* ── Wishlist btn ─────────────────────────────── */}
        <button
          className="pcard-wish"
          onClick={() => setWishlisted(v => !v)}
          aria-label="Add to wishlist"
          style={wishlisted ? { opacity:1, background:'var(--maroon)', color:'white', transform:'scale(1)' } : {}}
        >
          <FaHeart />
        </button>

        {/* ── Body ────────────────────────────────────── */}
        <div className="pcard-body">
          <span className="pcard-cat">{product.category}</span>

          <Link to={'/product/' + product.id}>
            <h3 className="pcard-name">{product.name}</h3>
          </Link>

          <div className="pcard-specs">
            {product.carat  && <span>{product.carat}</span>}
            {product.weight && (
              <span>
                <FaWeight className="spec-icon" />
                {product.weight}g
              </span>
            )}
            {product.stone  && <span>{product.stone}</span>}
          </div>

          {product.rating > 0 && (
            <div className="pcard-rating">
              <StarRating rating={product.rating} />
              <span>({product.rating})</span>
            </div>
          )}

          <div className="pcard-price">
            {ratesLoading ? (
              <span className="price-loading">Calculating…</span>
            ) : (
              <>
                <span className="pcard-price-curr">
                  ₹{pricing.total.toLocaleString('en-IN')}
                </span>
                <span className="pcard-price-note">incl. GST</span>
              </>
            )}
          </div>

          <div className="pcard-actions">
            <button
              className={'btn btn-dark btn-sm pcard-cart' + (added ? ' added' : '')}
              onClick={handleAddToCart}
            >
              <FaShoppingCart style={{ fontSize: 10 }} />
              {added ? 'Added!' : 'Cart'}
            </button>
            <button
              className="btn btn-primary btn-sm pcard-buy"
              onClick={() => setModalOpen(true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <BuyNowModal
        product={{ ...product, price: { min: pricing.total } }}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProductCardShared;
