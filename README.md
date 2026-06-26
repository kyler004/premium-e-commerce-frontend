# Premium E-Commerce

React storefront integrated with the E-commerce Catalog API. Built with TypeScript, Vite, React Router, Zustand, and Tailwind CSS.

## Features

- Public catalog browsing with search, filters, sorting, and pagination
- JWT authentication (register, OTP verify, login, password reset)
- Server-side cart with promo codes
- Checkout, order history, payment stub, and order cancellation
- Wishlist with move-to-cart
- Product reviews (read, write, edit, delete)
- Account dashboard with spending charts and receipt archive
- Staff admin for promotions, categories, products, variants, and inventory

## Tech Stack

- React 19, TypeScript, Vite 7
- React Router DOM 7
- Zustand
- Tailwind CSS 4
- Lucide React
- Recharts

## Environment

Copy `.env.example` to `.env`:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Ensure the backend API is running and CORS allows your frontend origin:
- **Development:** `http://localhost:5173`
- **Production:** your deployed site URL (e.g. `https://shop.example.com`)

## Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Product listing |
| `/product/:id` | Public | Product detail + reviews |
| `/cart` | Verified | Server cart |
| `/checkout` | Verified | Shipping + checkout |
| `/orders` | Verified | Order history |
| `/orders/:id` | Verified | Order detail, pay, cancel |
| `/orders/:id/receipt` | Verified | Official HTML receipt |
| `/wishlist` | Verified | Wishlist |
| `/login`, `/register`, `/verify-email` | Public | Auth flows |
| `/forgot-password`, `/reset-password` | Public | Password reset |
| `/account` | Verified | Spending dashboard |
| `/account/receipts` | Verified | Receipt archive |
| `/account/profile` | Verified | Profile |
| `/admin/*` | Staff | Catalog + promotion admin |

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Deployment

Production builds require `VITE_API_BASE_URL` to be set to your API origin before running `npm run build`. The value is baked into the bundle at build time.

See [Documentation/deployment.md](Documentation/deployment.md) for static host setup (Netlify, Cloudflare Pages, nginx, S3/CloudFront, Apache) and post-deploy verification steps.

## Manual QA Checklist

- [ ] Register → verify email → login
- [ ] Refresh on verify-email page — email field still populated
- [ ] Disconnect network → submit register — network error toast shown
- [ ] Log in → visit `/login` — redirected home
- [ ] Browse products with filters and pagination
- [ ] Deep-link `/product/:id`, `/account`, `/admin/products` — pages load
- [ ] Visit unknown route — 404 page renders
- [ ] Add variant to cart (requires verified login)
- [ ] Apply/remove promo code
- [ ] Checkout with shipping form → confirm payment
- [ ] View order receipt at `/orders/:id/receipt`
- [ ] Account dashboard charts and KPIs load
- [ ] Receipt archive at `/account/receipts`
- [ ] Add/remove wishlist items, move to cart
- [ ] Write review on purchased product
- [ ] Staff: CRUD promotions, categories, products, variants, inventory
