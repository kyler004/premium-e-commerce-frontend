# Deployment Guide

This frontend is a Vite-built React SPA. All routes are handled client-side by React Router, so the static host must serve `index.html` for unknown paths.

## Build

```bash
npm ci
VITE_API_BASE_URL=https://api.example.com npm run build
```

Output directory: `dist/`

The API base URL is baked into the bundle at build time. Set `VITE_API_BASE_URL` in your CI or host environment before running `npm run build`. Do not include a trailing slash.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Yes (production) | Backend API origin, e.g. `https://api.example.com` |

Copy [`.env.example`](../.env.example) to `.env` for local development.

## CORS

The Django backend must allow the production frontend origin in CORS settings. Development typically uses `http://localhost:5173`; production must include your deployed URL (e.g. `https://shop.example.com`).

## Static host configuration

### Netlify / Cloudflare Pages

Publish the `dist` folder. SPA fallback is included via [`public/_redirects`](../public/_redirects):

```
/*    /index.html   200
```

**Netlify build settings:**
- Build command: `npm run build`
- Publish directory: `dist`

**Cloudflare Pages build settings:**
- Build command: `npm run build`
- Build output directory: `dist`

### Apache (shared hosting)

[`public/.htaccess`](../public/.htaccess) is copied into `dist/` on build and rewrites all non-file requests to `index.html`.

### nginx

```nginx
server {
    listen 80;
    server_name shop.example.com;
    root /var/www/premium-e-commerce/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### AWS S3 + CloudFront

1. Upload the contents of `dist/` to an S3 bucket.
2. Enable static website hosting or use CloudFront as origin.
3. Configure a custom error response: HTTP 403 and 404 → `/index.html` with response code **200**.

Alternatively, use CloudFront Functions or Lambda@Edge to rewrite paths to `index.html`.

## Post-deploy verification

1. Open the site root — product listing loads.
2. Deep-link to `/product/1`, `/account`, `/admin/products` — each loads without a server 404.
3. Visit `/does-not-exist` — in-app 404 page appears.
4. Register or log in — API requests go to the production `VITE_API_BASE_URL` (check browser Network tab).
