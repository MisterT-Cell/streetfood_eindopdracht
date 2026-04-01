import Link from "next/link";
import { MapPin, ArrowRight, ExternalLink } from "lucide-react";

type Spot = {
  id: number;
  naam: string;
  soort_eten: string;
  locatie: string;
  omschrijving: string;
  afbeelding_url: string;
  tiktok_url: string | null;
  google_maps_url: string | null;
};

function extractVideoId(url: string): string | null {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

export default function SpotCard({ spot }: { spot: Spot }) {
  const videoId = spot.tiktok_url ? extractVideoId(spot.tiktok_url) : null;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {spot.afbeelding_url && (
        <div className="relative overflow-hidden h-52 shrink-0">
          <img
            src={spot.afbeelding_url}
            alt={spot.naam}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {spot.soort_eten}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">

        <h2 className="text-slate-900 text-lg font-bold leading-snug mb-1">
          {spot.naam}
        </h2>
        <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <MapPin className="w-3 h-3 shrink-0" />
          {spot.locatie}
        </p>

        {videoId ? (
          <iframe
            src={`https://www.tiktok.com/embed/${videoId}`}
            className="w-full aspect-9/16 mb-4 border-0 rounded-xl"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.locatie)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-slate-100 hover:border-emerald-300 bg-slate-50 hover:bg-emerald-50 p-4 mb-4 rounded-xl transition-colors duration-200 group/map"
          >
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">Locatie</p>
              <p className="text-sm font-semibold text-slate-700 truncate">{spot.locatie}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover/map:text-emerald-600 transition-colors shrink-0" />
          </a>
        )}

        <div className="mt-auto pt-3">
          <Link
            href={`/spots/${spot.id}`}
            className="flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors duration-200"
          >
            Meer info
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
