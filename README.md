# Library Semantic Search Demo

A static demo that compares keyword search with semantic search over 50 dummy library books (Indonesian and English). Book descriptions and a few example queries are turned into vectors once, locally, with the multilingual-e5-small model through Transformers.js, and saved to `public/embeddings.json`. The browser then ranks books by cosine similarity between the query vector and each book vector, next to a plain case-insensitive keyword match, so you can see semantic search find relevant books even when the query shares no words with them. There is no database, backend, vector DB, or LLM. Because free-text queries are not embedded in the browser, semantic results only work for the example query chips.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:3000.

`public/embeddings.json` is already committed. Run `npm run embed` only if you change `data/books.json` or the example queries in `scripts/embed.mjs`. The first run downloads the model (about 100 MB).

## Deploy to Cloudflare Pages

1. Push this repository to GitHub or GitLab.
2. In the Cloudflare dashboard, go to Workers & Pages, then Create, then Pages, then Connect to Git, and select the repository.
3. Use these build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
4. Save and deploy.

If the project was created as a Worker instead of Pages, the committed `wrangler.jsonc` serves `out/` as static assets, and the default deploy command `npx wrangler deploy` works as is.

The build produces static files in `out/` (`output: 'export'`), so no server runtime is needed.
