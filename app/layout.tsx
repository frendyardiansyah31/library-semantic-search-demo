import "./globals.css";

export const metadata = { title: "Library Semantic Search Demo" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
