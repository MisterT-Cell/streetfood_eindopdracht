import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { UtensilsCrossed, Plus } from "lucide-react";

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
      <body className={`${geistSans.variable} antialiased bg-slate-50 min-h-screen`}>

        {/* Navigatiebalk — glassmorphism effect, plakt aan de bovenkant */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-emerald-600 tracking-tight hover:opacity-80 transition text-xl"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>StreetfoodSpotter</span>
            </Link>

            <div className="flex items-center gap-6 font-medium text-slate-600 text-sm">
              <Link href="/" className="hover:text-emerald-600 transition-colors duration-200">
                Home
              </Link>
              <Link href="/spots" className="hover:text-emerald-600 transition-colors duration-200">
                Spots
              </Link>
              <Link
                href="/add-spot"
                className="flex items-center gap-1.5 bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 hover:shadow-md hover:-translate-y-px transition-all duration-200 font-semibold"
              >
                <Plus className="w-4 h-4" />
                Toevoegen
              </Link>
            </div>

          </div>
        </nav>

        <main>{children}</main>

        {/* Footer — donker met drie kolommen */}
        <footer className="bg-slate-900 text-white mt-0">
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div>
              <p className="flex items-center gap-2 text-sm font-extrabold text-emerald-400 mb-2">
                <UtensilsCrossed className="w-4 h-4" />
                StreetfoodSpotter
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                Ontdek en deel de beste streetfood spots bij jou in de buurt.
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-wider">Navigatie</p>
              <ul className="space-y-1.5 text-slate-500 text-xs">
                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link href="/spots" className="hover:text-emerald-400 transition-colors">Alle spots</Link></li>
                <li><Link href="/add-spot" className="hover:text-emerald-400 transition-colors">Spot toevoegen</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-slate-400 mb-3 text-xs uppercase tracking-wider">Project</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                Schoolopdracht gebouwd met Next.js, Tailwind CSS en SQLite.
              </p>
            </div>

          </div>

          <div className="border-t border-slate-800 py-3 text-center text-slate-600 text-xs">
            © 2025 StreetfoodSpotter — Schoolproject
          </div>
        </footer>

      </body>
    </html>
  );
}
