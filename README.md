# Organize PDF Pages

A local-first PDF toolkit with a public site and browser workspace for merge, split, rotate, reorder, and delete workflows.

## Live Demo
[https://sbdkim.github.io/organize-pdf-pages/](https://sbdkim.github.io/organize-pdf-pages/)

## Key Features
- Browser-only PDF editing with no file uploads
- Merge, split, reorder, rotate, and delete workflows in the main workspace
- Dedicated public pages for the app, FAQ, roadmap, privacy, and terms
- GitHub Pages-ready build with a configurable Pages base path
- Lint, typecheck, unit test, and Playwright end-to-end coverage

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
npm run test:e2e
npm run build
```

## Deployment Notes
- For GitHub Pages builds, use `PAGES_BASE=/organize-pdf-pages/ npm run build`.
- The repo publishes multiple public HTML pages, so shared assets should remain base-safe and relative.
- Use `npm run preview` to review the built static output locally.

## Project Layout
- `index.html` public landing page
- `app.html` PDF workspace
- `faq.html`, `privacy.html`, `roadmap.html`, and `terms.html` supporting pages
- `src/` React application code
- `tests/` Playwright and supporting test assets

## Notes
- PDF workflows run locally in the browser.
- No uploaded files are sent to a backend service.
- The public product name is `Organize PDF Pages`, and the repo slug target is `organize-pdf-pages`.
