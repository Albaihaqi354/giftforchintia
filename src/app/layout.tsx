import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Day Made For You — Chintia Aprian",
  description: "A little birthday surprise, made with care by Bian.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "A Day Made For You — Chintia Aprian",
    description: "A little birthday surprise, made with care by Bian.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
