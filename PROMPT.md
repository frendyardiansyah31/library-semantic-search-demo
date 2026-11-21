Bangun demo semantic search perpustakaan. Ikuti YAGNI, KISS, DRY.

Batasan keras:

- Frontend statis saja: Next.js (App Router, output: 'export'), TypeScript, Tailwind.
- TANPA database, backend, API route, vector DB, LLM, autentikasi.
- Semua gratis; deploy target Cloudflare Pages.

Struktur:
library-rag-demo/
data/books.json (50 buku dummy)
scripts/embed.mjs (jalan sekali lokal -> public/embeddings.json)
public/embeddings.json
lib/search.ts (keywordSearch + semanticSearch)
app/page.tsx (satu halaman)
README.md

Langkah, kerjakan berurutan dan berhenti setelah tiap langkah untuk saya cek:

1. Buat books.json: 50 buku dummy bahasa Indonesia dan Inggris. Field: id, title, author, ddc, subjects[], summary. Variasi topik, minimal 5 buku tentang katalogisasi/klasifikasi. Tanpa data nyata.
2. Tulis scripts/embed.mjs: pakai Transformers.js dengan model multilingual kecil (multilingual-e5-small). Embed "title + summary" tiap buku, dan embed juga 5 query contoh. Simpan semua ke public/embeddings.json.
3. Tulis lib/search.ts: keywordSearch (cocok kata, case-insensitive) dan semanticSearch (cosine similarity, top 5). Satu fungsi cosine, tidak ada duplikasi.
4. Tulis app/page.tsx: kolom pencarian, chip query contoh, dua kolom hasil berdampingan (ditumpuk di mobile), kartu hasil berisi judul, penulis, DDC, skor. Footer: "Demo with dummy data for portfolio purposes."
5. README: cara jalanin, cara deploy ke Cloudflare Pages, satu paragraf penjelasan.

Aturan kode:

- Satu komponen Card dipakai ulang untuk kedua kolom.
- Tidak ada library tambahan di luar yang disebut.
- Tanpa abstraksi "untuk nanti". Jika ragu, pilih yang paling sederhana.
- Query bebas (embedding di browser) TIDAK dikerjakan sekarang.
