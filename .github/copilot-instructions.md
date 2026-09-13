# AI Coding Agent Instructions for Türkan Kimya Website

## Project Overview
Turkish food & chemistry company brochure site (React / Create React App). Product catalog, quote form, and contact info.

## Architecture
- Single-page sections: Home, About, Products, Offer, Contact
- One React tree; responsive layout via CSS media queries in `src/App.css`
- Catalog: `src/data/categories.js`
- Company/contact/social/Formspree: `src/data/company.js`
- UI components under `src/components/`; `src/App.js` composes them

## Quote form
- Posts JSON to Formspree (`company.formspreeEndpoint`)
- Notifications should go to `info@turkangidakimya.com.tr`
- Replace `YOUR_FORM_ID` in `company.js` after creating the form at https://formspree.io

## Workflow
- `npm start` — local preview
- `npm run build` — production `build/`
- `npm run deploy` — gh-pages

## Common tasks
- Add product: edit the right category in `src/data/categories.js`
- Change contact/social: `src/data/company.js`
- Style: `src/App.css` (no Tailwind)
