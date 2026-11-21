// Run once locally: npm run embed -> writes public/embeddings.json
import { pipeline } from "@huggingface/transformers";
import { readFileSync, writeFileSync } from "node:fs";

const MODEL = "Xenova/multilingual-e5-small";

const SAMPLE_QUERIES = [
  "cara mengorganisir buku di rak",
  "how to describe a book in a catalog record",
  "belajar kecerdasan buatan",
  "sejarah bangsa Indonesia",
  "protecting data from hackers",
];

const books = JSON.parse(readFileSync("data/books.json", "utf8"));
const extractor = await pipeline("feature-extraction", MODEL);

// e5 models expect "passage: " / "query: " prefixes.
const embed = async (text) => {
  const out = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(out.data, (x) => Number(x.toFixed(5)));
};

const result = {
  model: MODEL,
  books: [],
  queries: [],
};

for (const b of books) {
  result.books.push({
    id: b.id,
    embedding: await embed(`passage: ${b.title}. ${b.summary}`),
  });
}
for (const q of SAMPLE_QUERIES) {
  result.queries.push({ text: q, embedding: await embed(`query: ${q}`) });
}

writeFileSync("public/embeddings.json", JSON.stringify(result));
console.log(`Saved ${result.books.length} books, ${result.queries.length} queries`);
