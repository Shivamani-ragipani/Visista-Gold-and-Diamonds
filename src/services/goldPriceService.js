/**
 * goldPriceService.js
 * Fetches live 22K gold price per gram for Hyderabad, India.
 *
 * Strategy:
 *  1. Check localStorage cache (valid for 4 hours)
 *  2. Try primary API  → data-asg.goldprice.org (free, no key)
 *  3. Try backup API   → api.exchangerate-api.com XAU→INR conversion
 *  4. Use realistic fallback if both fail
 *
 * Gold prices (INR/gram, Hyderabad market, approximate 2025):
 *  24K ≈ ₹7,400/g   22K ≈ ₹6,780/g   18K ≈ ₹5,550/g
 */

const CACHE_KEY   = 'visista_gold_price';
const CACHE_HOURS = 4;

// ── Fallback rates (updated periodically) ──────────────────────────────────
const FALLBACK_RATES = {
  '24K': 7400,
  '22K': 6780,
  '18K': 5550,
  updatedAt: null,
  source: 'fallback',
};

// ── Purity multipliers relative to 24K ────────────────────────────────────
export const PURITY = {
  '24K': 1.0000,
  '22K': 0.9167,
  '18K': 0.7500,
  '14K': 0.5833,
};

// ── Cache helpers ──────────────────────────────────────────────────────────
const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const ageMs = Date.now() - data.timestamp;
    if (ageMs < CACHE_HOURS * 60 * 60 * 1000) return data;
    return null;           // stale
  } catch {
    return null;
  }
};

const writeCache = (rates) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...rates, timestamp: Date.now() }));
  } catch { /* storage full – ignore */ }
};

// ── API 1 – goldprice.org public widget data ──────────────────────────────
const fetchFromGoldpriceOrg = async () => {
  const res = await fetch(
    'https://data-asg.goldprice.org/dbXRates/INR',
    { signal: AbortSignal.timeout(6000) }
  );
  if (!res.ok) throw new Error('goldprice.org non-200');
  const json = await res.json();
  // Returns price per troy oz in INR for XAU
  // 1 troy oz = 31.1035 g
  const pricePerOzINR = json.items?.[0]?.xauPrice;
  if (!pricePerOzINR) throw new Error('No XAU price in response');
  const per24KGram = pricePerOzINR / 31.1035;
  return {
    '24K': Math.round(per24KGram),
    '22K': Math.round(per24KGram * PURITY['22K']),
    '18K': Math.round(per24KGram * PURITY['18K']),
    source: 'goldprice.org',
    updatedAt: new Date().toISOString(),
  };
};

// ── API 2 – exchangerate-api (free tier, converts XAU→INR) ────────────────
const fetchFromExchangeRate = async () => {
  const res = await fetch(
    'https://open.er-api.com/v6/latest/XAU',
    { signal: AbortSignal.timeout(6000) }
  );
  if (!res.ok) throw new Error('exchangerate-api non-200');
  const json = await res.json();
  const xauToInr = json.rates?.INR;
  if (!xauToInr) throw new Error('No INR rate in response');
  // XAU rate is per troy oz → convert to per gram
  const per24KGram = xauToInr / 31.1035;
  return {
    '24K': Math.round(per24KGram),
    '22K': Math.round(per24KGram * PURITY['22K']),
    '18K': Math.round(per24KGram * PURITY['18K']),
    source: 'open.er-api.com',
    updatedAt: new Date().toISOString(),
  };
};

// ── Main export ────────────────────────────────────────────────────────────
export const getGoldRates = async () => {
  // 1. Cache hit
  const cached = readCache();
  if (cached) return cached;

  // 2. Try primary API
  try {
    const rates = await fetchFromGoldpriceOrg();
    writeCache(rates);
    return rates;
  } catch (e1) {
    console.warn('[GoldPriceService] Primary API failed:', e1.message);
  }

  // 3. Try backup API
  try {
    const rates = await fetchFromExchangeRate();
    writeCache(rates);
    return rates;
  } catch (e2) {
    console.warn('[GoldPriceService] Backup API failed:', e2.message);
  }

  // 4. Fallback
  console.info('[GoldPriceService] Using hardcoded fallback rates');
  return { ...FALLBACK_RATES, updatedAt: new Date().toISOString() };
};

// ── Price calculation helper ───────────────────────────────────────────────
/**
 * calculateProductPrice
 * @param {object} product  - { weight, carat, makingCharges }
 * @param {object} rates    - { '22K': number, '24K': number, ... }
 * @returns {object}        - { goldValue, makingCharges, subtotal, gst, total }
 */
export const calculateProductPrice = (product, rates) => {
  const karatKey  = product.carat?.replace('KT', 'K') || '22K';
  const ratePerGm = rates?.[karatKey] || FALLBACK_RATES[karatKey] || 6780;
  const weight    = product.weight || 0;

  const goldValue    = Math.round(ratePerGm * weight);
  const makingChg    = product.makingCharges || 0;
  const subtotal     = goldValue + makingChg;
  const gst          = Math.round(subtotal * 0.03);
  const total        = subtotal + gst;

  return { goldValue, makingCharges: makingChg, subtotal, gst, total, ratePerGm, weight, karatKey };
};
