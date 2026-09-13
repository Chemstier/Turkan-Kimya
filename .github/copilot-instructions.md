# AI Coding Agent Instructions for Türkan Kimya Website

## Project Overview
This is a Turkish chemistry company's product catalog website built with React. The app displays food additives and chemicals across 11 categories, with a quote request form and contact information.

## Architecture
- **Single-page React application** with smooth-scrolling sections: Home, About, Products, Offer, Contact
- **Responsive design** with separate mobile and desktop components using `useScreenSize` hook
- **Data structure**: Products organized in `categories` array in `src/App.js`, each with id, name, image, and products array
- **Styling**: Tailwind CSS v4 + custom CSS in `src/App.css`
- **Internationalization**: i18next with Turkish (default) and English support in `src/i18n.js`

## Key Components
- `Navbar`: Fixed navigation with mobile toggle, transparent at top
- `HomeSection` / `MobileHomeSection`: Hero with background video and CTA button (smaller text on mobile)
- `ProductsSection` / `MobileProductsSection`: Category grid (desktop) or list (mobile) that opens `CategoryModal` on click
- `OfferForm`: Contact form with collapsible product selection by category
- `ContactSection`: Contact details with embedded Google Maps
- `useScreenSize`: Custom hook for detecting mobile/tablet/desktop screen sizes

## Development Workflow
- **Start dev server**: `npm start` (runs on localhost:3000)
- **Build for production**: `npm run build`
- **Form handling**: Quote form generates `mailto:` link with form data and selected products
- **Assets**: Images and videos stored in `public/` directory

## Code Patterns
- **Product data**: Hardcoded in `src/App.js` as `categories` array
- **State management**: Local component state with `useState`
- **Form validation**: Custom validation in `OfferForm` component
- **Modal patterns**: Overlay with click-outside-to-close, body scroll lock
- **Responsive rendering**: Conditional component rendering based on `isMobile` from `useScreenSize` hook
- **Mobile-specific styles**: Use `.mobile-*` classes for mobile-only styling

## Translation Usage
Use `i18n.t()` for all user-facing text. Keys follow structure like `nav.home`, `offer.name`, etc.

## File Organization
- `src/App.js`: Main app logic and all components (704 lines)
- `src/App.css`: Custom styles including mobile-specific classes (450+ lines)
- `src/useScreenSize.js`: Hook for screen size detection
- `src/i18n.js`: Translation resources and config
- `public/`: Static assets (images, video, logo)

## Common Tasks
- **Add new product**: Add to appropriate category in `categories` array
- **Update translations**: Modify `resources` object in `i18n.js`
- **Style changes**: Use Tailwind classes in JSX, custom CSS in `App.css`
- **Add mobile component**: Create `Mobile[ComponentName]` and conditionally render in App.js
- **Form enhancements**: Modify validation logic in `OfferForm` component

## Mobile Implementation
- **Separate components**: Desktop and mobile versions are separate components (e.g., `HomeSection` vs `MobileHomeSection`)
- **Screen detection**: Use `useScreenSize()` hook to get `isMobile`, `isTablet`, `isDesktop`
- **Mobile optimizations**: Smaller fonts, list layouts instead of grids, centered text, reduced padding
- **Same aesthetics**: Mobile maintains same color scheme and visual style as desktop

## Deployment Notes
- Built with Create React App, outputs to `build/` folder
- No backend integration - form uses client-side `mailto:`
- Ensure all images referenced in code exist in `public/`