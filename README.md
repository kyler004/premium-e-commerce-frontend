# Premium E-Commerce

React storefront integrated with the E-commerce Catalog API. Built with TypeScript, Vite, React Router, Zustand, and Tailwind CSS.

## Features

- Public catalog browsing with search, filters, sorting, and pagination
- JWT authentication (register, OTP verify, login, password reset)
- Server-side cart with promo codes
- Checkout, order history, payment stub, and order cancellation
- Wishlist with move-to-cart
- Product reviews (read, write, edit, delete)
- Staff admin for promotions, categories, products, variants, and inventory

## Tech Stack

- React 19, TypeScript, Vite 7
- React Router DOM 7
- Zustand
- Tailwind CSS 4
- Lucide React

## Environment

Copy `.env.example` to `.env`:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Ensure the backend API is running and CORS allows `http://localhost:5173`.

## Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Product listing |
| `/product/:id` | Public | Product detail + reviews |
| `/cart` | Verified | Server cart |
| `/checkout` | Verified | Shipping + checkout |
| `/orders` | Verified | Order history |
| `/orders/:id` | Verified | Order detail, pay, cancel |
| `/wishlist` | Verified | Wishlist |
| `/login`, `/register`, `/verify-email` | Public | Auth flows |
| `/account` | Authenticated | Profile |
| `/admin/*` | Staff | Catalog + promotion admin |

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Manual QA Checklist

- [ ] Register → verify email → login
- [ ] Browse products with filters and pagination
- [ ] Add variant to cart (requires verified login)
- [ ] Apply/remove promo code
- [ ] Checkout with shipping form → confirm payment
- [ ] Add/remove wishlist items, move to cart
- [ ] Write review on purchased product
- [ ] Staff: CRUD promotions, categories, products, variants, inventory
