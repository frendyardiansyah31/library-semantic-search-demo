export type Book = {
  id: number;
  title: string;
  author: string;
  ddc: string;
  subjects: string[];
  summary: string;
};

export type Embeddings = {
  model: string;
  books: { id: number; embedding: number[] }[];
  queries: { text: string; embedding: number[] }[];
};

export type Result = { book: Book; score: number };

const TOP_K = 5;

const topK = (results: Result[]) =>
  results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);

// Score = fraction of query words found in the book's text.
export function keywordSearch(query: string, books: Book[]): Result[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return topK(
    books.map((book) => {
      const text = [book.title, book.summary, ...book.subjects].join(" ").toLowerCase();
      const hits = words.filter((w) => text.includes(w)).length;
      return { book, score: hits / words.length };
    }),
  );
}

export function cosine(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function semanticSearch(
  queryEmbedding: number[],
  books: Book[],
  embeddings: Embeddings,
): Result[] {
  const byId = new Map(embeddings.books.map((e) => [e.id, e.embedding]));
  return topK(
    books.map((book) => ({
      book,
      score: cosine(queryEmbedding, byId.get(book.id)!),
    })),
  );
}
