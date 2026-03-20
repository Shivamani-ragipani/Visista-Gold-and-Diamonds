# Visista Gold and Diamonds — Website

Premium jewellery store website for **Visista Gold and Diamonds**, Hyderabad.

## Tech Stack
- React.js (JavaScript)
- React Router v7
- External CSS files (no Tailwind, no TypeScript)
- LocalStorage for cart persistence
- WhatsApp click-to-chat for orders

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

| Feature | How it works |
|---|---|
| Cart | localStorage (`visista_cart`), persists on refresh |
| Add to Cart | `src/utils/whatsapp.js → addToCart()` |
| Buy Now | Opens `BuyNowModal` with customer form |
| WhatsApp Order | `buildWhatsAppMessage()` → wa.me redirect with full order |
| Branch Info | Edit `src/data/branches.js` to update addresses |

## Important Files

```
src/
├── data/
│   └── branches.js          ← ✏️  Edit branch addresses here
├── utils/
│   ├── whatsapp.js          ← WhatsApp message builder + cart helpers
│   └── calculatePrice.js    ← Gold price calculator
├── components/
│   ├── Header/              ← Visista branded header
│   ├── HeroSlider/          ← 4-slide bridal hero
│   ├── Footer/              ← Full footer with branch info
│   ├── Branches/            ← BranchSection component
│   ├── BuyNowModal/         ← Customer form + WhatsApp redirect
│   ├── Products/
│   │   └── ProductCardShared.jsx  ← Reusable card: Add to Cart + Buy Now
│   ├── Categories/          ← Category grid
│   ├── Testimonials/        ← Customer reviews slider
│   └── Shop/
│       └── data/            ← All product data (Rings, Necklaces, Earrings, Bracelets)
└── pages/
    ├── HomePage.jsx         ← Full homepage
    ├── CartPage.jsx         ← Cart with localStorage
    ├── ContactPage.jsx      ← Contact form + branch cards
    └── AboutPage.jsx        ← Brand story + values
```

## Branch Addresses
Edit `src/data/branches.js` if any address needs updating:
- Jubilee Hills, Hyderabad
- Kothapet, Hyderabad
- Secunderabad / R.P. Road, Hyderabad

## Business Info
- Phone: 07947 134 680
- WhatsApp: +44 7947 134 680 (wa.me/447947134680)
- Instagram: @visistagoldanddiamonds_

## Build for Production
```bash
npm run build
```
