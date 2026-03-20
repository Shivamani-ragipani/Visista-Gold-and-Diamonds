// WhatsApp & Cart utility — Visista Gold and Diamonds
const BUSINESS_WHATSAPP = "447947134680";

export const buildWhatsAppMessage = ({ customer, cartItems, total }) => {
  const itemLines = cartItems.map((item, i) => {
    const price = item.price?.min || item.price || 0;
    return `  ${i + 1}. ${item.name} (${item.category}) × ${item.quantity} — ₹${(price * item.quantity).toLocaleString('en-IN')}`;
  }).join('\n');

  const gst  = Math.round(total * 0.03);
  const grand = total + gst;

  const message = [
    '🌟 *New Order — Visista Gold and Diamonds* 🌟',
    '',
    '👤 *Customer Details*',
    `• Name: ${customer.fullName}`,
    `• Phone: ${customer.phone}`,
    customer.email   ? `• Email: ${customer.email}`   : null,
    customer.address ? `• Address: ${customer.address}, ${customer.city}` : null,
    customer.branch  ? `• Branch: ${customer.branch}` : null,
    customer.notes   ? `• Notes: ${customer.notes}`   : null,
    '',
    '🛍️ *Order Items*',
    itemLines,
    '',
    '💰 *Price Summary*',
    `• Subtotal: ₹${total.toLocaleString('en-IN')}`,
    `• GST (3%): ₹${gst.toLocaleString('en-IN')}`,
    `• *Total: ₹${grand.toLocaleString('en-IN')}*`,
    '',
    '📍 Prices based on live gold rate at time of order.',
    'Please confirm availability. Thank you!',
  ].filter(line => line !== null).join('\n');

  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
};

// ── Cart helpers ──────────────────────────────────────────────────────────
export const getCart = () => {
  try { return JSON.parse(localStorage.getItem('visista_cart')) || []; }
  catch { return []; }
};

export const saveCart = (items) => {
  localStorage.setItem('visista_cart', JSON.stringify(items));
  localStorage.setItem('cartCount', String(items.reduce((s, i) => s + i.quantity, 0)));
  window.dispatchEvent(new Event('cartCountUpdated'));
};

export const addToCart = (product, qty = 1) => {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.quantity += qty;
  else cart.push({ ...product, quantity: qty });
  saveCart(cart);
};

export const removeFromCart = (productId) => {
  saveCart(getCart().filter(i => i.id !== productId));
};

export const updateCartQty = (productId, qty) => {
  saveCart(getCart().map(i => i.id === productId ? { ...i, quantity: Math.max(1, qty) } : i));
};

export const getCartTotal = (items) =>
  items.reduce((sum, item) => {
    const price = item.price?.min || item.price || 0;
    return sum + price * item.quantity;
  }, 0);
