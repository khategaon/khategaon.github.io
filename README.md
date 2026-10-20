# Khategaon Local Guide

Responsive white-and-blue multi-page starter website.

## Run locally
Because reusable components are loaded with `fetch()`, run the folder using a local HTTP server rather than opening `index.html` directly.

With Python installed, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Structure
- `index.html` — homepage and category cards
- `components/header.html` — top information strip
- `components/navbar.html` — responsive navigation
- `components/footer.html` — shared footer
- `assets/css/style.css` — global styling
- `assets/js/main.js` — component loading, mobile menu and homepage category search
- `pages/` — starter pages for each category

Replace placeholder text with verified local information before publishing. The weather section needs a weather API if you want live forecasts.
