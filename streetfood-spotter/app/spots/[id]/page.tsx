import db from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const spot = db.prepare(
    "SELECT * FROM spots WHERE id =?").get(id) as any;

  if (!spot) return notFound();

  const videoId = spot.tiktok_url ? extractVideoId(spot.tiktok_url): null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

          <Link href="/spots"
          className="text-orange-500 hover:underline text-sm mb-6 inline-block"
          >
          Terug naar alle spots
          </Link>

          {spot.afbeelding_url && (
            <img
              src={spot.afbeelding_url}
              alt={spot.naam}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md"
            />
          )}

          <h1 className="text-4xl font-extrabold text-gray-800 mb-1" >{spot.naam}</h1>
          <p className="text-orange-500 font-medium text-lg mb-2">{spot.soort_eten}</p>
          <p className="text-gray-500 mb-4"> {spot.locatie} </p>

          {spot.omschrijving && (
            <p className="text-gray-700 mb-6 leading-relaxed"> {spot.omschrijving} </p>
          )}

          {videoId ? (
            <iframe 
            src={`https://www.tiktok.com/embed/${videoId}`}
            className="w-full aspect-[9/16] rounded-xl mb-6"
            allow="autoplay; encrypted-media;"
            />
          ): spot.google_maps_url ? (
            <a 
              href={spot.google_maps_url}
              target="_blank"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
              >
                bekijk op Google Maps
              </a>
          ): null}

    </div>
  );
}