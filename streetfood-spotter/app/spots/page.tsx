import db from "@/lib/db";
import Link from "next/link";
import SearchInput from "@/app/components/SearchInput";
import SpotCard from "@/app/components/SpotCard";
import { SearchX, Plus } from "lucide-react";

export default async function SpotsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const spots = q
    ? db.prepare("SELECT * FROM spots WHERE naam LIKE ? OR locatie LIKE ?").all(`%${q}%`, `%${q}%`)
    : db.prepare("SELECT * FROM spots").all();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ─── Header ─── */}
      <div className="bg-emerald-950 relative overflow-hidden px-6 sm:px-12 lg:px-24 py-16">
        <div className="absolute -top-20 -left-20 w-100 h-100 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-87.5 h-87.5 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 mb-3">Overzicht</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Alle streetfood spots
            </h1>
            <p className="text-emerald-300/70 text-sm">
              {spots.length} spot{spots.length !== 1 ? "s" : ""} gevonden
              {q && <span className="ml-1 text-emerald-300">&quot;{q}&quot;</span>}
            </p>
          </div>
          <SearchInput defaultValue={q || ""} />
        </div>
      </div>

      {/* ─── Kaarten grid ─── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-24 py-12">
        {spots.length === 0 ? (
          <div className="py-24 text-center">
            <SearchX className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 text-sm mb-2">Geen resultaten voor</p>
            <p className="text-slate-900 text-2xl font-extrabold mb-8">&quot;{q}&quot;</p>
            <Link
              href="/add-spot"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-full hover:bg-emerald-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Spot toevoegen
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot: any) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
