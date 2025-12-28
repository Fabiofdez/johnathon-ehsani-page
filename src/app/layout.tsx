import { Personal } from "@/util/info";
import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-serif",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: Personal.title,
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonPro.variable} antialiased`}>
        <header className="page-banner">
          <h1 className="title">
            <a href="/">{Personal.title}</a>
          </h1>

          <div className="socials">{/* TODO */}</div>
        </header>

        <main className="page-content">{children}</main>
      </body>
    </html>
  );
}
