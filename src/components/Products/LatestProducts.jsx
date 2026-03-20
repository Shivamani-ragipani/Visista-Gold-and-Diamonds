import React from 'react';
import { allProducts } from '../../data/products';
import ProductCardShared from './ProductCardShared';

const LatestProducts = () => {
  const latest = allProducts.filter(p => p.isNew).slice(0, 4);
  return (
    <div className="featured-products-grid">
      {latest.map(p => <ProductCardShared key={p.id} product={p} />)}
    </div>
  );
};

export default LatestProducts;
