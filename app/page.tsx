"use client";

import { useState } from "react";
import booksData from "../data/books.json";
import embeddingsData from "../public/embeddings.json";
import { keywordSearch, semanticSearch, type Book, type Embeddings, type Result } from "../lib/search";

const books: Book[] = booksData;
const embeddings: Embeddings = embeddingsData;

function Card({ book, score }: Result) {
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-slate-600">{book.author}</p>
      <p className="mt-2 flex justify-between text-xs text-slate-500">
        <span>DDC {book.ddc}</span>
        <span>Score {score.toFixed(2)}</span>
      </p>
    </li>
  );
}

function Column({ title, note, results }: { title: string; note?: string; results: Result[] }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {note ? (
        <p className="text-sm text-slate-500">{note}</p>
      ) : results.length === 0 ? (
        <p className="text-sm text-slate-500">No results.</p>
      ) : (
        <ul className="space-y-3">
          {results.map((r) => (
            <Card key={r.book.id} {...r} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Page() {
  const [query, setQuery] = useState("");
  const q = query.trim();
  const queryEmbedding = embeddings.queries.find((e) => e.text === q)?.embedding;

  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-8">
      <h1 className="mb-4 text-2xl font-bold">Library Semantic Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        className="w-full rounded-lg border border-slate-300 bg-white p-3"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {embeddings.queries.map(({ text }) => (
          <button
            key={text}
            onClick={() => setQuery(text)}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-100"
          >
            {text}
          </button>
        ))}
      </div>

      {q && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Column title="Keyword" results={keywordSearch(q, books)} />
          <Column
            title="Semantic"
            note={queryEmbedding ? undefined : "Semantic search is only available for the example queries."}
            results={queryEmbedding ? semanticSearch(queryEmbedding, books, embeddings) : []}
          />
        </div>
      )}

      <footer className="mt-12 text-center text-xs text-slate-500">
        Demo with dummy data for portfolio purposes.
      </footer>
    </main>
  );
}
