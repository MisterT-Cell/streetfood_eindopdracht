import db from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";

function extractVideoId(url: string): string | null {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const spot = db.prepare("SELECT * FROM spots WHERE id = ?").get(id) as any;

  if (!spot) return notFound();

  const videoId = spot.tiktok_url ? extractVideoId(spot.tiktok_url) : null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ─── Hero afbeelding ─── */}
      <div className="relative w-full h-72 sm:h-115 overflow-hidden">
        {spot.afbeelding_url ? (
          <img
            src={spot.afbeelding_url}
            alt={spot.naam}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-emerald-950" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <Link
          href="/spots"
          className="absolute top-6 left-6 flex items-center gap-2 border border-white/30 bg-black/30 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-black/50 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-24 pb-8">
          <span className="inline-block bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {spot.soort_eten}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {spot.naam}
          </h1>
        </div>
      </div>

      {/* ─── Inhoud ─── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 space-y-4">

        {/* Locatiekaart */}
        <a
          href={spot.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.locatie)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 bg-white rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md p-6 transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 ring-1 ring-emerald-100">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Locatie</p>
            <p className="text-lg font-bold text-slate-900">{spot.locatie}</p>
            <p className="text-xs text-emerald-600 mt-1 font-semibold">Bekijk op Google Maps →</p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors shrink-0" />
        </a>

        {/* Omschrijving */}
        {spot.omschrijving && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-4">
              Over deze spot
            </p>
            <p className="text-slate-600 leading-relaxed">{spot.omschrijving}</p>
          </div>
        )}

        {/* TikTok embed */}
        {videoId && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-4">
              TikTok video
            </p>
            <iframe
              src={`https://www.tiktok.com/embed/${videoId}`}
              className="w-full aspect-9/16 border-0 rounded-xl"
              allow="autoplay; encrypted-media"
            />
          </div>
        )}

      </div>
    </div>
  );
}
