/**
 * ProductCard — legacy page component
 * This page is preserved but now redirects to Shop.
 * The reusable product card is at: components/Products/ProductCardShared.jsx
 */
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProductCard = () => <Navigate to="/shop" replace />;

export default ProductCard;
