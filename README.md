# Organize PDF Pages

Local-first PDF toolkit with a public site and browser-based workspace for merge, split, rotate, reorder, and delete workflows under the Northline suite.

## Live Demo
[https://sbdkim.github.io/organize-pdf-pages/](https://sbdkim.github.io/organize-pdf-pages/)

## Key Features
- Browser-only PDF editing with no file uploads
- Dedicated public pages for app, FAQ, roadmap, privacy, and terms
- Merge, split, reorder, rotate, and delete workflows in the main workspace
- GitHub Pages-ready build with a configurable Pages base path
- Includes lint, typecheck, unit tests, and Playwright end-to-end coverage

## Tech Stack
- React 19
- TypeScript
- Vite
- `pdf-lib`, `pdfjs-dist`, and `jszip`
- ESLint, Vitest, and Playwright

## Setup / Run Locally
```bash
npm install
npm run dev
```

## Tests
```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deployment Notes
- For GitHub Pages builds, use:
  `PAGES_BASE=/organize-pdf-pages/ npm run build`
- The repo publishes multiple public HTML pages, so shared assets should remain base-safe and relative.

## Project Layout
- `index.html` public landing page
- `app.html` PDF workspace
- `faq.html`, `privacy.html`, `roadmap.html`, `terms.html` supporting pages
- `public/` shared static assets
- `src/` application code

## Privacy / Notes
- PDF workflows run locally in the browser.
- The public product name is `Organize PDF Pages`, and the repo slug target is `organize-pdf-pages`.
