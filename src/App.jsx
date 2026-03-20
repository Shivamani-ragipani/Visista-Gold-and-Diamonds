import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { GoldPriceProvider } from './context/GoldPriceContext';

// Pages
import HomePage    from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage   from './pages/AboutPage';
import CartPage    from './pages/CartPage';

// Components
import Header           from './components/Header/Header';
import Footer           from './components/Footer/Footer';
import ScrollToTop      from './components/ScrollToTop';
import Shop             from './components/Shop/Shop';
import ProductDetail    from './components/ProductDetail/ProductDetail';
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';

function App() {
  return (
    <GoldPriceProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main id="main-content" role="main">
            <Routes>
              <Route path="/"               element={<HomePage />} />
              <Route path="/shop"           element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:id"    element={<ProductDetail />} />
              <Route path="/contact"        element={<ContactPage />} />
              <Route path="/about"          element={<AboutPage />} />
              <Route path="/cart"           element={<CartPage />} />
              {/* Legacy redirect */}
              <Route path="/products"       element={<Shop />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </GoldPriceProvider>
  );
}

export default App;
