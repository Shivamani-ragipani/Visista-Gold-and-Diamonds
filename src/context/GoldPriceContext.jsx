import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGoldRates } from '../services/goldPriceService';

const GoldPriceContext = createContext(null);

export const GoldPriceProvider = ({ children }) => {
  const [rates, setRates]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGoldRates();
      setRates(data);
      setLastFetched(new Date());
    } catch (err) {
      setError('Could not load gold rates');
      // Keep previous rates if any
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <GoldPriceContext.Provider value={{ rates, loading, error, lastFetched, refresh: fetchRates }}>
      {children}
    </GoldPriceContext.Provider>
  );
};

export const useGoldPrice = () => {
  const ctx = useContext(GoldPriceContext);
  if (!ctx) throw new Error('useGoldPrice must be used inside GoldPriceProvider');
  return ctx;
};
