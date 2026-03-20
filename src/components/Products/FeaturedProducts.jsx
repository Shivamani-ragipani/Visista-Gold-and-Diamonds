import React from 'react';
import { allProducts } from '../../data/products';
import ProductCardShared from './ProductCardShared';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  // Show a curated selection: 2 from each category
  const featured = [
    ...allProducts.filter(p => p.category === 'Necklaces').slice(0, 2),
    ...allProducts.filter(p => p.category === 'Earrings').slice(0, 2),
    ...allProducts.filter(p => p.category === 'Rings').slice(0, 2),
    ...allProducts.filter(p => p.category === 'Bracelets').slice(0, 2),
  ];

  return (
    <div className="featured-products-grid">
      {featured.map(p => <ProductCardShared key={p.id} product={p} />)}
    </div>
  );
};

export default FeaturedProducts;
