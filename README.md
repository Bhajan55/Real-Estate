# NestFind — Real Estate Portfolio

A modern, dark-themed real estate listing website built with React + Vite.

## Color Palette
- **Dark:** `#08080f`
- **Light:** `#e4e4e8`
- **Accent (Teal):** `#00d4aa`

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
nestfind/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── components/
        └── NestFind.jsx      # Main single-page component
```

## Sections
- **Hero** — Animated headline with stats
- **Listings** — Filterable property cards (All / Rent / Sale / PG)
- **Property Detail** — Modal with full details on card click
- **Contact** — Inquiry form with contact info

## Fonts
- **Outfit** — Headings & display
- **Sora** — Body text

Both loaded via Google Fonts CDN (inside the component).

## Tech Stack
- React 18
- Vite 5
- Pure inline styles (no external CSS framework)
