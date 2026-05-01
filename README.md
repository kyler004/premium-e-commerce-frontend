# Premium E-Commerce

`premium-e-commerce` is a small React storefront built with TypeScript and Vite. It focuses on a polished shopping flow with a product listing page, product detail view, cart management, and a persistent client-side cart powered by Zustand.

## What This Project Includes

- Product listing with category, price, rating, and stock filters
- Product detail pages with image gallery, variant selection, quantity controls, and reviews
- Cart page with quantity updates, removal, checkout simulation, and order summary
- Persistent cart state using Zustand `persist`
- Client-side routing with React Router
- Tailwind CSS styling with a dark editorial storefront aesthetic

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Zustand
- Tailwind CSS
- Lucide React

## Project Structure

```text
src/
  components/
    cart/        Cart item row and order summary
    layout/      Shared app layout and navbar
    product/     Product cards, filters, gallery, reviews, variants
    ui/          Reusable presentational primitives
  data/          Static product catalog data
  pages/         Route-level pages
  router/        Application router
  store/         Zustand stores for products and cart
  types/         Shared TypeScript types
```

## Routes

- `/` shows the product catalog and filters
- `/product/:id` shows an individual product detail page
- `/cart` shows the current cart and checkout summary

## State Management

The app uses two Zustand stores:

- `productStore` holds the catalog and active filter state
- `cartStore` manages cart items, quantity changes, totals, and persistence in local storage

Filtering is derived from stable store values in the UI rather than returning computed arrays directly from the store selector path. Cart totals are computed from the current cart state.

## Running The Project

Install dependencies and start the Vite dev server:

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run lint
npm run build
npm run preview
```

## Current Notes

- `npm run lint` passes
- `npm run build` currently fails because `Review.rating` is typed as `string` in `src/types/index.ts` while the review data and review UI use numeric ratings

## Purpose

This project is a front-end storefront exercise. It is useful as a reference for:

- building a small multi-page React commerce UI
- structuring route-level pages and reusable components
- using Zustand for local application state with persistence
- styling a product-focused interface with Tailwind CSS
