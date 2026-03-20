import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaFilter, FaSortAmountDown, FaSync } from 'react-icons/fa';
import { BsGrid3X3Gap, BsGrid } from 'react-icons/bs';

import { allProducts } from '../../data/products';
import { useGoldPrice } from '../../context/GoldPriceContext';
import { calculateProductPrice } from '../../services/goldPriceService';
import GoldTicker from '../GoldTicker/GoldTicker';
import ProductCardShared from '../Products/ProductCardShared';
import './Shop.css';

const COLLECTIONS = [
  { key: 'All',     label: 'All Pieces',   icon: '✦' },
  { key: 'Gold',    label: 'Gold',         icon: '⬡' },
  { key: 'Diamond', label: 'Diamond',      icon: '◈' },
  { key: 'Bridal',  label: 'Bridal',       icon: '♛' },
  { key: 'Polki',   label: 'Polki',        icon: '❋' },
];

const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'newest',     label: 'New Arrivals' },
];

const PER_PAGE = 12;

const Shop = () => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();
  const { rates, loading: ratesLoading } = useGoldPrice();

  const [search,      setSearch]      = useState('');
  const [collection,  setCollection]  = useState('All');
  const [category,    setCategory]    = useState(urlCategory || 'All');
  const [sortBy,      setSortBy]      = useState('default');
  const [page,        setPage]        = useState(1);
  const [gridCols,    setGridCols]    = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (urlCategory) setCategory(urlCategory);
    else setCategory('All');
    setPage(1);
  }, [urlCategory]);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.stone || '').toLowerCase().includes(q) ||
        (p.collection || '').toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (collection !== 'All') list = list.filter(p => p.collection === collection);
    if (category !== 'All')   list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());

    switch (sortBy) {
      case 'price-low':  list.sort((a, b) => calculateProductPrice(a, rates).total - calculateProductPrice(b, rates).total); break;
      case 'price-high': list.sort((a, b) => calculateProductPrice(b, rates).total - calculateProductPrice(a, rates).total); break;
      case 'rating':     list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'newest':     list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: break;
    }
    return list;
  }, [search, collection, category, sortBy, rates]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCategory = useCallback((cat) => {
    setCategory(cat);
    setPage(1);
    if (cat === 'All') navigate('/shop');
    else navigate('/shop/' + cat);
    setSidebarOpen(false);
  }, [navigate]);

  const clearAll = () => {
    setSearch(''); setCollection('All'); handleCategory('All'); setSortBy('default');
  };

  const activeFiltersCount = [collection !== 'All', category !== 'All', search.trim() !== ''].filter(Boolean).length;

  // Count per collection
  const collectionCounts = useMemo(() => {
    const counts = { All: allProducts.length };
    COLLECTIONS.slice(1).forEach(c => {
      counts[c.key] = allProducts.filter(p => p.collection === c.key).length;
    });
    return counts;
  }, []);

  // Hero title
  const heroTitle = category !== 'All'
    ? category
    : collection !== 'All'
      ? collection + ' Collection'
      : 'Our Collections';

  return (
    <div className="shop-page">
      {/* Shop Hero */}
      <div className="shop-hero">
        <div className="container shop-hero-inner">
          <div className="shop-hero-ornament">
            <span>Visista Gold &amp; Diamonds</span>
          </div>
          <h1>
            {category !== 'All' || collection !== 'All' ? (
              <>{heroTitle}</>
            ) : (
              <>Our <em>Collections</em></>
            )}
          </h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link>
            {' '}/{' '}
            <Link to="/shop">Shop</Link>
            {category !== 'All' && <> / <span>{category}</span></>}
            {collection !== 'All' && <> / <span>{collection}</span></>}
          </p>
        </div>
      </div>

      {/* Gold Ticker */}
      <GoldTicker />

      {/* Collection Strip */}
      <div className="collection-hero-strip">
        <div className="collection-strip-inner">
          {COLLECTIONS.map(c => (
            <button
              key={c.key}
              className={'cstrip-tab' + (collection === c.key ? ' active' : '')}
              onClick={() => { setCollection(c.key); setPage(1); }}
            >
              <span className="cstrip-tab-icon">{c.icon}</span>
              {c.label}
              <span className="cstrip-count">{collectionCounts[c.key] || filtered.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="shop-layout">

        {/* Sidebar */}
        <aside className={'shop-sidebar' + (sidebarOpen ? ' open' : '')}>
          <div className="sidebar-header">
            <strong>Refine</strong>
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              {activeFiltersCount > 0 && (
                <button className="sidebar-clear" onClick={clearAll}>Clear All</button>
              )}
              <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-block-head">
              <h4>Collection</h4>
            </div>
            <div className="filter-pills">
              {COLLECTIONS.map(c => (
                <button
                  key={c.key}
                  className={'fpill' + (collection === c.key ? ' active' : '')}
                  onClick={() => { setCollection(c.key); setPage(1); setSidebarOpen(false); }}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-block-head">
              <h4>Category</h4>
            </div>
            <div className="filter-pills vertical">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={'fpill fpill-vertical' + (category === c ? ' active' : '')}
                  onClick={() => handleCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-block-head">
              <h4>Karat</h4>
            </div>
            <div className="filter-pills">
              {['22K', '18K', '24K'].map(k => (
                <button
                  key={k}
                  className={'fpill' + (search === k ? ' active' : '')}
                  onClick={() => { setSearch(search === k ? '' : k); setPage(1); setSidebarOpen(false); }}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-block-head">
              <h4>Stone</h4>
            </div>
            <div className="filter-pills vertical">
              {['Diamond', 'Ruby', 'Emerald', 'Polki', 'Kemp', 'Pearl'].map(s => (
                <button
                  key={s}
                  className={'fpill fpill-vertical' + (search === s ? ' active' : '')}
                  onClick={() => { setSearch(search === s ? '' : s); setPage(1); setSidebarOpen(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA in sidebar */}
          <div style={{padding:'24px',borderTop:'1px solid var(--border)',marginTop:'8px'}}>
            <a
              href="https://wa.me/447947134680?text=Hi!%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collections."
              target="_blank" rel="noreferrer"
              style={{
                display:'flex', alignItems:'center', gap:8,
                background:'#25D366', color:'white',
                padding:'12px 16px', borderRadius:3,
                fontSize:10, fontWeight:700, letterSpacing:2,
                textTransform:'uppercase', textDecoration:'none',
                justifyContent:'center',
                fontFamily:'var(--font-body)'
              }}
            >
              💬 WhatsApp Enquiry
            </a>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="toolbar-left">
              <button className="filter-toggle-btn" onClick={() => setSidebarOpen(true)}>
                <FaFilter />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="filter-badge">{activeFiltersCount}</span>
                )}
              </button>
              <span className="result-count">
                {ratesLoading
                  ? 'Calculating live prices…'
                  : `${filtered.length} piece${filtered.length !== 1 ? 's' : ''} found`}
              </span>
            </div>
            <div className="toolbar-right">
              <div className="search-wrap">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search jewellery…"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="search-input"
                />
                {search && (
                  <button className="search-clear" onClick={() => { setSearch(''); setPage(1); }}>
                    <FaTimes />
                  </button>
                )}
              </div>
              <div className="sort-wrap">
                <FaSortAmountDown className="sort-icon" />
                <select
                  value={sortBy}
                  onChange={e => { setSortBy(e.target.value); setPage(1); }}
                  className="sort-select"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid-toggle">
                <button
                  className={gridCols === 3 ? 'active' : ''}
                  onClick={() => setGridCols(3)}
                  title="3 columns"
                >
                  <BsGrid3X3Gap />
                </button>
                <button
                  className={gridCols === 4 ? 'active' : ''}
                  onClick={() => setGridCols(4)}
                  title="4 columns"
                >
                  <BsGrid />
                </button>
              </div>
            </div>
          </div>

          {/* Live price loading */}
          {ratesLoading && (
            <div className="gold-loading-bar">
              <FaSync className="spin" />
              Fetching live gold rates for Hyderabad…
            </div>
          )}

          {/* Active filter chips */}
          {activeFiltersCount > 0 && (
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
              {collection !== 'All' && (
                <span style={{
                  background:'var(--charcoal)',color:'var(--gold-light)',
                  padding:'4px 12px',fontSize:10,fontWeight:700,letterSpacing:1.5,
                  textTransform:'uppercase',borderRadius:2,display:'flex',alignItems:'center',gap:6
                }}>
                  {collection}
                  <button onClick={() => setCollection('All')} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',fontSize:10}}>×</button>
                </span>
              )}
              {category !== 'All' && (
                <span style={{
                  background:'var(--charcoal)',color:'var(--gold-light)',
                  padding:'4px 12px',fontSize:10,fontWeight:700,letterSpacing:1.5,
                  textTransform:'uppercase',borderRadius:2,display:'flex',alignItems:'center',gap:6
                }}>
                  {category}
                  <button onClick={() => handleCategory('All')} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',fontSize:10}}>×</button>
                </span>
              )}
              {search && (
                <span style={{
                  background:'var(--charcoal)',color:'var(--gold-light)',
                  padding:'4px 12px',fontSize:10,fontWeight:700,letterSpacing:1.5,
                  textTransform:'uppercase',borderRadius:2,display:'flex',alignItems:'center',gap:6
                }}>
                  "{search}"
                  <button onClick={() => setSearch('')} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',fontSize:10}}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {paginated.length > 0 ? (
            <div className={'shop-grid cols-' + gridCols}>
              {paginated.map((product, idx) => (
                <ProductCardShared key={product.id} product={product} animDelay={idx * 50} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span className="no-results-icon">◈</span>
              <h3>No pieces found</h3>
              <p>Try a different search or adjust your filters</p>
              <button className="btn btn-dark btn-sm" onClick={clearAll} style={{marginTop:12}}>
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="pg-btn" disabled={page === 1} onClick={() => { setPage(p => p - 1); window.scrollTo(0,0); }}>
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={'pg-btn' + (n === page ? ' active' : '')}
                  onClick={() => { setPage(n); window.scrollTo(0,0); }}
                >
                  {n}
                </button>
              ))}
              <button className="pg-btn" disabled={page === totalPages} onClick={() => { setPage(p => p + 1); window.scrollTo(0,0); }}>
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
