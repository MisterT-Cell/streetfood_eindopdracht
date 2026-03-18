import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreetfoodSpotter",
  description: "Ontdek de beste streetfood spots bij jou in de buurt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${geistSans.variable} antialiased bg-gray-50 min-h-screen`}>

        {/* Navigatiebalk — zichtbaar op elke pagina */}
        <nav className="bg-orange-500 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold hover:opacity-80 transition">
              🍜 StreetfoodSpotter
            </Link>
            <div className="flex gap-6 font-medium">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/spots" className="hover:underline">Spots</Link>
              <Link href="/add-spot" className="bg-white text-orange-500 px-4 py-1 rounded-full hover:bg-orange-50 transition">
                + Toevoegen
              </Link>
            </div>
          </div>
        </nav>

        {/* Hier verschijnt de inhoud van elke pagina */}
        <main>{children}</main>

        <footer className="text-center text-sm text-gray-400 py-6 mt-10 border-t">
          © 2025 StreetfoodSpotter
        </footer>

      </body>
    </html>
  );
}
