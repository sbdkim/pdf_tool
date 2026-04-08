# Organize PDF Pages

A local-first PDF toolkit with a public site and browser workspace for merge, split, rotate, reorder, and delete workflows.

## Live Demo
[https://shinbum-organize-pdf-pages.vercel.app/](https://shinbum-organize-pdf-pages.vercel.app/)

## Key Features
- Browser-only PDF editing with no file uploads
- Merge, split, reorder, rotate, and delete workflows in the main workspace
- Dedicated public pages for the app, FAQ, roadmap, privacy, and terms
- Vercel-ready multi-page build with a configurable fallback Pages base path
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
- Production deploys run on Vercel from the repository root.
- Vite uses `/` on Vercel and keeps `PAGES_BASE=/organize-pdf-pages/` as a fallback for manual static-path builds.
- The repo publishes multiple public HTML pages, so shared assets should remain base-safe and relative.
- Pushes to `main` should trigger production deploys once the Vercel Git integration is connected.
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
- The public product name is `Organize PDF Pages`, and the Vercel alias target is `shinbum-organize-pdf-pages.vercel.app`.
