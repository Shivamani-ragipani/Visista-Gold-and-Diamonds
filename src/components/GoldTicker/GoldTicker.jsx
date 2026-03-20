import React from 'react';
import { FaSync } from 'react-icons/fa';
import { useGoldPrice } from '../../context/GoldPriceContext';
import './GoldTicker.css';

const GoldTicker = () => {
  const { rates, loading, error, lastFetched, refresh } = useGoldPrice();

  const fmt = (n) => n ? '₹' + Math.round(n).toLocaleString('en-IN') : '—';

  const timeStr = lastFetched
    ? lastFetched.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="gold-ticker">
      <div className="container gt-inner">
        <span className="gt-label">Today's Gold Rate — Hyderabad</span>
        <div className="gt-rates">
          {loading ? (
            <span className="gt-loading"><FaSync className="spin" /> Fetching live rates…</span>
          ) : error ? (
            <span className="gt-error">{error} — showing approximate rates</span>
          ) : (
            <>
              <div className="gt-rate">
                <span className="gt-karat">24K</span>
                <span className="gt-price">{fmt(rates?.['24K'])}/g</span>
              </div>
              <div className="gt-divider">|</div>
              <div className="gt-rate">
                <span className="gt-karat">22K</span>
                <span className="gt-price">{fmt(rates?.['22K'])}/g</span>
              </div>
              <div className="gt-divider">|</div>
              <div className="gt-rate">
                <span className="gt-karat">18K</span>
                <span className="gt-price">{fmt(rates?.['18K'])}/g</span>
              </div>
            </>
          )}
        </div>
        <div className="gt-meta">
          {timeStr && <span>Updated {timeStr}</span>}
          {rates?.source && <span className="gt-source">· {rates.source}</span>}
          <button className="gt-refresh" onClick={refresh} title="Refresh rates">
            <FaSync />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoldTicker;
