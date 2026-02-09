# Virtual Fashion Stylist

Next.js 13 + TailwindCSS demo app with Algolia InstantSearch.

Quick start:

1. Copy `.env.local.example` to `.env.local` and fill Algolia variables.
2. Install dependencies:

```bash
npm install
```

3. Run dev server:

```bash
npm run dev
```

Notes:
- Add Algolia records to the index named in `NEXT_PUBLIC_ALGOLIA_INDEX_NAME`.
- Images are in `public/images/*` and the app uses Next.js `Image`.
